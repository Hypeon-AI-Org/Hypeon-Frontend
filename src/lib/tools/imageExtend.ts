import sharp from 'sharp';

import { bedrockInvoke } from './bedrock';

/*
 * "AI extend background" for the Ad Creative Editor: Stability's Outpaint on
 * AWS Bedrock grows the image to a new aspect ratio by painting more of its own
 * background around it, so a finished ad fills a wider or taller size without
 * cropping or a blurred border. The original is kept pixel for pixel in the
 * middle; `inner` says where, so the page can pin editable text to it.
 */

const OUTPAINT_MODEL = 'us.stability.stable-outpaint-v1:0';
/** Working size: plenty for ad sizes up to 1280px, and keeps each side under Outpaint's 2000px limit. */
const MAX_SIDE = 1280;

export type Extended = { image: string; inner: { x: number; y: number; w: number; h: number } };

/** Extends `image` to `ratio` (width / height); 'fits' when it is already that shape. */
export async function extendTo(image: Buffer, ratio: number): Promise<Extended | 'fits'> {
  const resized = await sharp(image).resize(MAX_SIDE, MAX_SIDE, { fit: 'inside', withoutEnlargement: true }).png().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = resized.info;
  const current = w / h;
  if (Math.abs(current - ratio) / ratio < 0.03) return 'fits';

  let left = 0;
  let right = 0;
  let up = 0;
  let down = 0;
  if (ratio > current) {
    const add = Math.round(h * ratio - w);
    left = Math.floor(add / 2);
    right = add - left;
  } else {
    const add = Math.round(w / ratio - h);
    up = Math.floor(add / 2);
    down = add - up;
  }

  const out = await bedrockInvoke<{ images?: string[]; finish_reasons?: (string | null)[] }>(
    OUTPAINT_MODEL,
    {
      image: resized.data.toString('base64'),
      left,
      right,
      up,
      down,
      // Low creativity keeps the new area plain: more of the same backdrop, not new products or text.
      creativity: 0.3,
      prompt: 'seamlessly continue the existing background, same lighting, colour and texture, empty space, no text, no new objects',
      output_format: 'webp',
    },
    90_000
  );
  if (!out.images?.[0] || out.finish_reasons?.[0]) throw new Error(`outpaint failed: ${out.finish_reasons?.[0] ?? 'no image'}`);

  const W = w + left + right;
  const H = h + up + down;
  return { image: `data:image/webp;base64,${out.images[0]}`, inner: { x: left / W, y: up / H, w: w / W, h: h / H } };
}
