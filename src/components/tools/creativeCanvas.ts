/*
 * Draws one ad creative onto a canvas at any size. The editor's preview, the
 * size thumbnails and the downloads all call this, so what you see is exactly
 * what you export. Everything runs in the browser; nothing is uploaded.
 *
 * Everything on the ad is a layer (text, button or logo) that can be selected,
 * moved and styled on its own. Sizes are relative to each frame's shorter side,
 * so a layer looks the same in a square post, a tall Story or a wide banner.
 *
 * The headline, subline and button (layers with a role) lay themselves out in
 * every frame, stacked at the chosen position and kept out of the Stories safe
 * zones, until the visitor drags one; from then on it is `free` and sits at the
 * same relative spot in every size. Quick styles snap them back to the layout.
 *
 * Text recreated from a finished ad ("Make text editable") is anchored to the
 * image instead, so it stays on its spot in the ad's design and scales with
 * the ad in every size. A size can also have an AI-extended background: a
 * wider or taller copy of the image, with the original sitting at `inner`.
 */

export const AD_SIZES = [
  { id: 'square', name: 'Instagram post', ratio: '1:1', w: 1080, h: 1080 },
  { id: 'portrait', name: 'Feed portrait', ratio: '4:5', w: 1080, h: 1350 },
  // Stories / Reels: the app covers the top 14% and bottom 20%, so text and logos stay out of them.
  { id: 'story', name: 'Stories & Reels', ratio: '9:16', w: 1080, h: 1920, safe: { top: 0.14, bottom: 0.2 } },
  { id: 'link', name: 'Facebook link', ratio: '1.91:1', w: 1200, h: 628 },
  { id: 'youtube', name: 'YouTube', ratio: '16:9', w: 1280, h: 720 },
  { id: 'display', name: 'Google display', ratio: '300×250', w: 300, h: 250 },
] as const;

export type AdSize = (typeof AD_SIZES)[number];
export type AdSizeId = AdSize['id'];

export type Design = {
  /** fill: crop to cover the frame. fit: show the whole image on a background. */
  fit: 'fill' | 'fit';
  /** Background behind a fitted image: a blurred copy of it, or a flat colour. */
  backdrop: 'blur' | 'color';
  backdropColor: string;
  /** Which part of the image stays in frame when cropping (0-1), and how far to zoom in. */
  focusX: number;
  focusY: number;
  zoom: number;
  textColor: string;
  ctaColor: string;
  position: 'top' | 'center' | 'bottom';
  align: 'center' | 'left';
  /** Darkens the image behind the text so it stays readable. */
  shade: boolean;
  textScale: number;
};

export const DEFAULT_DESIGN: Design = {
  fit: 'fill',
  backdrop: 'blur',
  backdropColor: '#f2efe9',
  focusX: 0.5,
  focusY: 0.5,
  zoom: 1,
  textColor: '#ffffff',
  ctaColor: '#ffffff',
  position: 'bottom',
  align: 'center',
  shade: true,
  textScale: 1,
};

/**
 * An element on the ad. Positions are fractions of the frame: x and w of its
 * width, y of its height. `size` (the font size) and a logo's `w` are fractions
 * of the frame's shorter side. For a button, `color` is the fill; its text
 * picks black or white for contrast.
 */
export type Layer = {
  id: string;
  type: 'text' | 'button' | 'logo';
  text: string;
  x: number;
  y: number;
  w: number;
  size: number;
  color: string;
  weight: 400 | 700 | 900;
  align: 'left' | 'center' | 'right';
  /** Set on the headline, subline and button the side panel edits. */
  role?: Role;
  /** A role layer the visitor has dragged: placed by x/y instead of the automatic stack. */
  free?: boolean;
  /**
   * 'image': x, y and w are fractions of the drawn image and size a fraction of
   * its shorter side, so the layer moves and scales with the ad's design.
   */
  anchor?: 'image';
  /** Drawn in the serif font (recreated from a serif headline); otherwise the sans font. */
  serif?: boolean;
};

/** An AI-extended background for one size, with where the original image sits inside it (fractions). */
export type Extension = { img: HTMLImageElement | HTMLCanvasElement; inner: { x: number; y: number; w: number; h: number } };

export type Role = 'headline' | 'subline' | 'cta';
export const ROLES: Role[] = ['headline', 'subline', 'cta'];

/** Where a layer ended up on the canvas, in canvas pixels; the editor puts its click targets here. */
export type LayerRect = { id: string; x: number; y: number; w: number; h: number; fs: number };
export type Box = { x: number; y: number; w: number; h: number };

type Source = HTMLImageElement | HTMLCanvasElement;

const sizeOf = (s: Source) =>
  s instanceof HTMLImageElement ? { w: s.naturalWidth, h: s.naturalHeight } : { w: s.width, h: s.height };

/** Where the image is drawn in a W×H frame for this design. */
export function imageBox(img: Source, W: number, H: number, d: Pick<Design, 'fit' | 'focusX' | 'focusY' | 'zoom'>): Box {
  const { w, h } = sizeOf(img);
  const scale = (d.fit === 'fill' ? Math.max(W / w, H / h) : Math.min(W / w, H / h)) * d.zoom;
  const dw = w * scale;
  const dh = h * scale;
  return { x: (W - dw) * d.focusX, y: (H - dh) * d.focusY, w: dw, h: dh };
}

/** Draws `img` to cover W×H, keeping the focus point in frame. */
function drawCover(ctx: CanvasRenderingContext2D, img: Source, W: number, H: number, fx: number, fy: number, zoom: number) {
  const b = imageBox(img, W, H, { fit: 'fill', focusX: fx, focusY: fy, zoom });
  ctx.drawImage(img, b.x, b.y, b.w, b.h);
}

/** A soft blur that works in every browser: draw tiny, then scale back up. */
function drawBlurred(ctx: CanvasRenderingContext2D, img: Source, W: number, H: number) {
  const small = document.createElement('canvas');
  small.width = Math.max(8, Math.round(W / 28));
  small.height = Math.max(8, Math.round(H / 28));
  const s = small.getContext('2d');
  if (!s) return;
  drawCover(s, img, small.width, small.height, 0.5, 0.5, 1.1);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(small, 0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(0, 0, W, H);
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const para of text.split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > maxWidth) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    lines.push(line);
  }
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Black or white, whichever reads better on `hex`. */
export function contrastOn(hex: string): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum > 160 ? '#121212' : '#ffffff';
}

/** Line height used for layers; the editor's inline text box uses the same so typing lines up. */
export const LAYER_LINE = 1.15;
/** A button's height and side padding, as multiples of its font size. */
export const BUTTON_H = 2.3;
const BUTTON_PAD = 1.2;

const clampInto = (v: number, size: number, max: number) => Math.max(0, Math.min(v, max - size));

type Measured = { w: number; h: number; lines?: string[]; fs: number };

/** What a layer's fractions are measured against: the frame, or the drawn image for anchored layers. */
type Ref = { x: number; y: number; W: number; H: number; unit: number; maxW: number };

function refFor(l: Layer, box: Box, W: number, H: number): Ref {
  return l.anchor === 'image'
    ? { x: box.x, y: box.y, W: box.w, H: box.h, unit: Math.min(box.w, box.h), maxW: W }
    : { x: 0, y: 0, W, H, unit: Math.min(W, H), maxW: W };
}

/** A layer's size in this frame, before it is placed. */
function measure(ctx: CanvasRenderingContext2D, l: Layer, ref: Ref, font: string, logo: Source | null | undefined): Measured | null {
  const { W, unit } = ref;
  const fs = Math.max(4, l.size * unit);
  if (l.type === 'logo') {
    if (!logo) return null;
    const { w, h } = sizeOf(logo);
    const lw = Math.max(8, l.w * (l.anchor === 'image' ? W : unit));
    return { w: lw, h: (lw * h) / w, fs };
  }
  ctx.font = `${l.weight} ${fs}px ${font}`;
  if (l.type === 'button') {
    const text = l.text.trim() || ' ';
    return { w: Math.min(ref.maxW, ctx.measureText(text).width + fs * BUTTON_PAD * 2), h: fs * BUTTON_H, fs };
  }
  const lw = Math.min(ref.maxW, Math.max(fs, l.w * W));
  const lines = wrap(ctx, l.text, lw);
  return { w: lw, h: Math.max(1, lines.length) * fs * LAYER_LINE, lines, fs };
}

/**
 * Where the headline, subline and button go in this frame when they have not
 * been dragged: stacked at the chosen position, inside the margins and the
 * Stories safe zones.
 */
function autoStack(
  ctx: CanvasRenderingContext2D,
  layers: Layer[],
  d: Design,
  size: AdSize,
  W: number,
  H: number,
  font: string
): Map<string, { x: number; y: number }> {
  const unit = Math.min(W, H);
  const pad = unit * 0.07;
  const safe = 'safe' in size ? size.safe : { top: 0, bottom: 0 };
  const top = Math.max(pad, H * safe.top);
  const bottom = Math.max(pad, H * safe.bottom);
  const gap = unit * 0.025;
  const stack = ROLES.map((r) => layers.find((l) => l.role === r && !l.free && l.text.trim()))
    .filter((l): l is Layer => !!l)
    .map((l) => ({ l, m: measure(ctx, l, { x: 0, y: 0, W, H, unit, maxW: W }, font, null)! }));
  const total = stack.reduce((sum, s, i) => sum + s.m.h + (i ? gap * (s.l.type === 'button' ? 1.6 : 1) : 0), 0);
  let y = d.position === 'top' ? top : d.position === 'center' ? (H - total) / 2 : H - bottom - total;
  const out = new Map<string, { x: number; y: number }>();
  stack.forEach(({ l, m }, i) => {
    if (i) y += gap * (l.type === 'button' ? 1.6 : 1);
    const x = l.type === 'button' ? (d.align === 'center' ? (W - m.w) / 2 : pad) : (W - m.w) / 2;
    out.set(l.id, { x, y });
    y += m.h;
  });
  return out;
}

function drawLayers(
  ctx: CanvasRenderingContext2D,
  layers: Layer[],
  auto: Map<string, { x: number; y: number }>,
  box: Box,
  W: number,
  H: number,
  font: string,
  logo: Source | null | undefined,
  hidden: string | undefined,
  paint = true,
  images: Record<string, Source> = {},
  serif?: string
): LayerRect[] {
  const rects: LayerRect[] = [];
  for (const l of layers) {
    const ref = refFor(l, box, W, H);
    // A logo lifted off the ad brings its own picture; the uploaded logo uses `logo`.
    const pic = l.type === 'logo' ? (images[l.id] ?? logo) : null;
    const face = l.serif && serif ? serif : font;
    const m = measure(ctx, l, ref, face, pic);
    if (!m) continue;
    const at = auto.get(l.id);
    // Placed layers are kept fully inside the frame.
    const x = clampInto(at ? at.x : ref.x + l.x * ref.W, m.w, W);
    const y = clampInto(at ? at.y : ref.y + l.y * ref.H, m.h, H);
    rects.push({ id: l.id, x, y, w: m.w, h: m.h, fs: m.fs });
    if (!paint || l.id === hidden) continue;

    if (l.type === 'logo') {
      if (pic) ctx.drawImage(pic, x, y, m.w, m.h);
      continue;
    }
    ctx.font = `${l.weight} ${m.fs}px ${face}`;
    ctx.textBaseline = 'top';
    if (l.type === 'button') {
      ctx.fillStyle = l.color;
      roundRect(ctx, x, y, m.w, m.h, m.h / 2);
      ctx.fill();
      ctx.fillStyle = contrastOn(l.color);
      ctx.textAlign = 'center';
      ctx.fillText(l.text.trim(), x + m.w / 2, y + (m.h - m.fs) / 2 - m.fs * 0.04, m.w - m.fs);
      continue;
    }
    const lh = m.fs * LAYER_LINE;
    ctx.fillStyle = l.color;
    ctx.textAlign = l.align;
    const ax = l.align === 'left' ? x : l.align === 'center' ? x + m.w / 2 : x + m.w;
    (m.lines ?? []).forEach((line, i) => ctx.fillText(line, ax, y + i * lh + (lh - m.fs) / 2));
  }
  return rects;
}

export function drawCreative(
  canvas: HTMLCanvasElement,
  size: AdSize,
  img: Source,
  d: Design,
  opts: {
    layers?: Layer[];
    logo?: Source | null;
    /** Pictures for logo layers lifted off an ad, by layer id. */
    images?: Record<string, Source>;
    font: string;
    scale?: number;
    hidden?: string;
    /** Font family for layers marked serif. */
    serif?: string;
    ext?: Extension | null;
  }
): { box: Box; rects: LayerRect[] } {
  const k = opts.scale ?? 1;
  const W = Math.round(size.w * k);
  const H = Math.round(size.h * k);
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  // With an AI-extended background the whole frame is that image; the original sits at `inner`.
  const ext = opts.ext ?? null;
  const extBox = ext ? imageBox(ext.img, W, H, { fit: 'fill', focusX: 0.5, focusY: 0.5, zoom: 1 }) : null;
  const box = extBox && ext
    ? { x: extBox.x + ext.inner.x * extBox.w, y: extBox.y + ext.inner.y * extBox.h, w: ext.inner.w * extBox.w, h: ext.inner.h * extBox.h }
    : imageBox(img, W, H, d);
  if (!ctx) return { box, rects: [] };
  ctx.clearRect(0, 0, W, H);

  // Image
  if (ext && extBox) {
    ctx.drawImage(ext.img, extBox.x, extBox.y, extBox.w, extBox.h);
  } else {
    if (d.fit === 'fit') {
      if (d.backdrop === 'blur') drawBlurred(ctx, img, W, H);
      else {
        ctx.fillStyle = d.backdropColor;
        ctx.fillRect(0, 0, W, H);
      }
    }
    ctx.drawImage(img, box.x, box.y, box.w, box.h);
  }

  // Lay out, measure (so the fade can follow the text), then paint.
  const layers = opts.layers ?? [];
  const auto = autoStack(ctx, layers, d, size, W, H, opts.font);
  const rects = drawLayers(ctx, layers, auto, box, W, H, opts.font, opts.logo, opts.hidden, false, opts.images, opts.serif);
  if (d.shade) {
    const roleIds = new Set(layers.filter((l) => l.role).map((l) => l.id));
    drawShade(ctx, rects.filter((r) => roleIds.has(r.id)), d.position, W, H);
  }
  drawLayers(ctx, layers, auto, box, W, H, opts.font, opts.logo, opts.hidden, true, opts.images, opts.serif);
  return { box, rects };
}

/** Darkens the photo behind the text so it stays readable: a fade from the text's edge to the frame's edge. */
function drawShade(ctx: CanvasRenderingContext2D, rects: LayerRect[], position: Design['position'], W: number, H: number) {
  if (!rects.length) return;
  const pad = Math.min(W, H) * 0.07;
  if (position === 'center') {
    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    ctx.fillRect(0, 0, W, H);
    return;
  }
  const top = Math.min(...rects.map((r) => r.y));
  const bottom = Math.max(...rects.map((r) => r.y + r.h));
  const from = position === 'top' ? Math.min(H, bottom + pad * 2.5) : Math.max(0, top - pad * 2.5);
  const to = position === 'top' ? 0 : H;
  const g = ctx.createLinearGradient(0, from, 0, to);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.62)');
  ctx.fillStyle = g;
  ctx.fillRect(0, Math.min(from, to), W, Math.abs(to - from));
}

/** The headline, subline or button in the current style, back in the automatic layout; id and words are kept. */
export function styleRole(role: Role, text: string, d: Design, id: string): Layer {
  if (role === 'cta') return { id, role, type: 'button', text, x: 0, y: 0, w: 0, size: 0.036 * d.textScale, color: d.ctaColor, weight: 700, align: 'center' };
  return {
    id,
    role,
    type: 'text',
    text,
    x: 0.07,
    y: 0,
    w: 0.86,
    size: (role === 'headline' ? 0.08 : 0.044) * d.textScale,
    color: d.textColor,
    weight: role === 'headline' ? 700 : 400,
    align: d.align,
  };
}

/** Renders one size at full resolution and returns it as a file. */
export function exportCreative(
  size: AdSize,
  img: Source,
  d: Design,
  opts: { layers?: Layer[]; logo?: Source | null; images?: Record<string, Source>; font: string; serif?: string; format: 'jpeg' | 'png'; ext?: Extension | null }
): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  drawCreative(canvas, size, img, d, { layers: opts.layers, logo: opts.logo, images: opts.images, font: opts.font, serif: opts.serif, ext: opts.ext });
  return new Promise((resolve) => canvas.toBlob(resolve, `image/${opts.format}`, 0.92));
}
