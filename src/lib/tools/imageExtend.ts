import sharp from 'sharp';

import { bedrockInvoke } from './bedrock';

/*
 * "AI extend background" for the Ad Creative Editor: Stability's Outpaint on
 * AWS Bedrock grows the image to a new aspect ratio by painting more of its own
 * background around it, so a finished ad fills a wider or taller size without
 * cropping or a blurred border. `inner` says where the original sits, so the
 * page can pin editable text to it.
 *
 * Outpaint keeps the pixels it is given and only paints outside them, which
 * left a hard line where the new area met the photo. So the image is sent
 * with a thin strip trimmed off each side being extended; the AI repaints that
 * strip too, and the original is then laid back over it, fading out across
 * the strip, so the two blend instead of meeting at a seam.
 */

const OUTPAINT_MODEL = 'us.stability.stable-outpaint-v1:0';
/** Working size: plenty for ad sizes up to 1280px, and keeps each side under Outpaint's 2000px limit. */
const MAX_SIDE = 1280;
/** The overlap strip, as a share of the extended dimension: wide enough to hide the join. */
const BLEND = 0.04;

export type Extended = { image: string; inner: { x: number; y: number; w: number; h: number } };

/** Extends `image` to `ratio` (width / height); 'fits' when it is already that shape. */
export async function extendTo(image: Buffer, ratio: number): Promise<Extended | 'fits'> {
  const resized = await sharp(image)
    .resize(MAX_SIDE, MAX_SIDE, { fit: 'inside', withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = resized.info;
  const current = w / h;
  if (Math.abs(current - ratio) / ratio < 0.03) return 'fits';

  const wide = ratio > current;
  let left = 0;
  let right = 0;
  let up = 0;
  let down = 0;
  if (wide) {
    const add = Math.round(h * ratio - w);
    left = Math.floor(add / 2);
    right = add - left;
  } else {
    const add = Math.round(w / ratio - h);
    up = Math.floor(add / 2);
    down = add - up;
  }

  // Trim the overlap strip off the sides being extended; the AI paints it back.
  const strip = Math.max(4, Math.round((wide ? w : h) * BLEND));
  const crop = wide ? { left: strip, top: 0, width: w - strip * 2, height: h } : { left: 0, top: strip, width: w, height: h - strip * 2 };
  const sent = await sharp(resized.data, { raw: { width: w, height: h, channels: 3 } }).extract(crop).png().toBuffer();

  const out = await bedrockInvoke<{ images?: string[]; finish_reasons?: (string | null)[] }>(
    OUTPAINT_MODEL,
    {
      image: sent.toString('base64'),
      left: wide ? left + strip : 0,
      right: wide ? right + strip : 0,
      up: wide ? 0 : up + strip,
      down: wide ? 0 : down + strip,
      // Low creativity keeps the new area plain: more of the same backdrop, not new faces, products or text.
      creativity: 0.2,
      prompt:
        'seamlessly continue the existing background only, same lighting, colour, texture and grain, plain empty space, no text, no letters, no new people, faces, eyes or objects',
      output_format: 'png',
    },
    90_000
  );
  if (!out.images?.[0] || out.finish_reasons?.[0]) throw new Error(`outpaint failed: ${out.finish_reasons?.[0] ?? 'no image'}`);

  const W = w + left + right;
  const H = h + up + down;
  const painted = await sharp(Buffer.from(out.images[0], 'base64')).resize(W, H, { fit: 'fill' }).removeAlpha().png().toBuffer();

  // The original, fully opaque in the middle and fading to transparent across the strip on the extended sides.
  const rgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const edge = wide ? Math.min(x, w - 1 - x) : Math.min(y, h - 1 - y);
      const a = Math.min(1, edge / strip);
      const i = (y * w + x) * 3;
      const o = (y * w + x) * 4;
      rgba[o] = resized.data[i];
      rgba[o + 1] = resized.data[i + 1];
      rgba[o + 2] = resized.data[i + 2];
      // Smoothstep, so the fade has no visible start or end.
      rgba[o + 3] = Math.round(255 * a * a * (3 - 2 * a));
    }
  }
  const overlay = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  const merged = await sharp(painted).composite([{ input: overlay, left, top: up }]).webp({ quality: 92 }).toBuffer();

  return { image: `data:image/webp;base64,${merged.toString('base64')}`, inner: { x: left / W, y: up / H, w: w / W, h: h / H } };
}
