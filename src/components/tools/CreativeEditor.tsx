'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  ArrowUp,
  Bold,
  Check,
  CircleHelp,
  Clapperboard,
  Contrast,
  Copy,
  Download,
  ImageIcon,
  ImagePlus,
  Loader2,
  Minus,
  MousePointerClick,
  Move,
  Plus,
  RectangleHorizontal,
  Maximize2,
  ScanText,
  Sparkles,
  Undo2,
  Stamp,
  Trash2,
  Type,
  X,
} from 'lucide-react';

import { Container, STUDIO_URL } from '@/components/home/ui';
import type { CopyOption } from '@/lib/tools/adCopy';
import type { FoundBlock } from '@/lib/tools/textErase';
import {
  AD_SIZES,
  BUTTON_H,
  contrastOn,
  DEFAULT_DESIGN,
  drawCreative,
  exportCreative,
  LAYER_LINE,
  styleRole,
  type AdSize,
  type AdSizeId,
  type Box,
  type Design,
  type Extension,
  type Layer,
  type LayerRect,
  type Role,
} from './creativeCanvas';
import { ToolHero } from './sections';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { ToolProgress } from './ToolProgress';
import { blobOf, loadWork, saveWork, type SavedWork } from './editorStore';
import { inputClass, submitClass } from './ui';

const ease = [0.22, 1, 0.36, 1] as const;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
/** Longest side of the big preview, in canvas pixels; crisp on retina screens. */
const PREVIEW_SIDE = 900;
const THUMB_SIDE = 220;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('decode'));
    img.src = src;
  });
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** The image as a JPEG data URL, at most 1600px on its longest side, for the AI steps. */
function toDataUrl(img: HTMLImageElement): string {
  const scale = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.fillStyle = '#ffffff'; // transparent PNGs become white, not black
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.9);
}

const uid = () => Math.random().toString(36).slice(2, 10);

/**
 * An extended background with `base` pasted over the middle, where the
 * original ad sits. AI only paints new space around the ad, so after "Edit
 * its text" the clean ad can replace the old one inside every fitted size:
 * no second round of fitting, and no extra cost.
 */
async function withBase(ext: { img: HTMLImageElement | HTMLCanvasElement; inner: { x: number; y: number; w: number; h: number } }, base: HTMLImageElement) {
  const src = ext.img;
  const W = src instanceof HTMLImageElement ? src.naturalWidth : src.width;
  const H = src instanceof HTMLImageElement ? src.naturalHeight : src.height;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return ext;
  ctx.drawImage(src, 0, 0, W, H);
  // The ad fades out over a thin strip on the extended sides, as the server does, so there is no hard line.
  const bw = Math.round(ext.inner.w * W);
  const bh = Math.round(ext.inner.h * H);
  const wide = ext.inner.x > 0.001;
  const strip = Math.max(4, Math.round((wide ? bw : bh) * 0.04));
  const layer = document.createElement('canvas');
  layer.width = bw;
  layer.height = bh;
  const lc = layer.getContext('2d');
  if (lc) {
    lc.drawImage(base, 0, 0, bw, bh);
    lc.globalCompositeOperation = 'destination-in';
    const g = wide ? lc.createLinearGradient(0, 0, bw, 0) : lc.createLinearGradient(0, 0, 0, bh);
    const f = strip / (wide ? bw : bh);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(f, 'rgba(0,0,0,1)');
    g.addColorStop(1 - f, 'rgba(0,0,0,1)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    lc.fillStyle = g;
    lc.fillRect(0, 0, bw, bh);
    ctx.drawImage(layer, Math.round(ext.inner.x * W), Math.round(ext.inner.y * H));
  } else ctx.drawImage(base, ext.inner.x * W, ext.inner.y * H, ext.inner.w * W, ext.inner.h * H);
  return { img: await loadImage(canvas.toDataURL('image/jpeg', 0.92)), inner: ext.inner };
}

/** Keeps a drag going outside the element; failing (a pointer the browser no longer tracks) is harmless. */
function capture(e: { currentTarget: Element; pointerId: number }) {
  try {
    e.currentTarget.setPointerCapture(e.pointerId);
  } catch {}
}

type AiAction = 'write' | 'grab' | 'extend';
type Corner = 'nw' | 'ne' | 'sw' | 'se';
const CORNERS: { id: Corner; className: string }[] = [
  { id: 'nw', className: '-left-[7px] -top-[7px] cursor-nwse-resize' },
  { id: 'ne', className: '-right-[7px] -top-[7px] cursor-nesw-resize' },
  { id: 'sw', className: '-bottom-[7px] -left-[7px] cursor-nesw-resize' },
  { id: 'se', className: '-bottom-[7px] -right-[7px] cursor-nwse-resize' },
];
type Tab = 'text' | 'ai' | 'image' | 'logo';

const AI_PROGRESS: Record<AiAction, { expected: number; steps: { at: number; label: string }[] }> = {
  write: { expected: 9, steps: [{ at: 0, label: 'Sending your image' }, { at: 2, label: 'Agent is writing new text' }, { at: 6, label: 'Polishing three options' }] },
  grab: {
    expected: 45,
    steps: [
      { at: 0, label: 'Sending your ad' },
      { at: 2, label: 'Agent is reading the text' },
      { at: 10, label: 'Removing it from the image' },
      { at: 26, label: 'Filling in the background' },
      { at: 40, label: 'Rebuilding it as editable text' },
    ],
  },
  extend: {
    expected: 28,
    steps: [
      { at: 0, label: 'Sending your ad' },
      { at: 3, label: 'Agent is extending the background' },
      { at: 20, label: 'Blending the new edges' },
    ],
  },
};

/**
 * Turns the text the agent found in a finished ad into layers pinned to the
 * image, in the same place, colour and weight. The agent's boxes are only
 * roughly the right height, so each line is sized to fill its box's width
 * (capped by the height): the headline spans the same width as before and no
 * line wraps where the original did not. Anything on a coloured shape (a
 * "NEW SEASON" pill, a "SHOP NOW" button) becomes a button in that colour.
 */
function blocksToLayers(blocks: FoundBlock[], img: HTMLImageElement, font: string, serif: string): Layer[] {
  const IW = img.naturalWidth;
  const IH = img.naturalHeight;
  const unit = Math.min(IW, IH);
  const ctx = document.createElement('canvas').getContext('2d');
  /** Width of the widest line at a 100px font. */
  const widest = (text: string, weight: number, face = font) => {
    if (!ctx) return 0;
    ctx.font = `${weight} 100px ${face}`;
    return Math.max(...text.split('\n').map((line) => ctx.measureText(line.trim()).width));
  };
  return blocks.map((b) => {
    const x = b.x / 1000;
    const y = b.y / 1000;
    const w = b.w / 1000;
    const wPx = w * IW;
    const hPx = (b.h / 1000) * IH;
    const weight = b.weight === 'black' ? 900 : b.weight === 'bold' ? 700 : 400;
    if (b.kind === 'button' || b.bg) {
      const text = b.text.replace(/\n+/g, ' ');
      const bw = Math.max(700, weight);
      const byWidth = wPx / (widest(text, bw) / 100 + 2.4);
      const fs = Math.min(byWidth || Infinity, hPx / BUTTON_H);
      return { id: uid(), anchor: 'image', type: 'button', text, x, y, w, size: fs / unit, color: b.bg || '#121212', weight: bw as Layer['weight'], align: 'center' };
    }
    const lines = Math.max(1, b.text.split('\n').length, b.lines);
    // A serif headline is rebuilt in the site's serif face, so it keeps its character.
    const isSerif = b.font === 'serif';
    const byWidth = (100 * wPx) / Math.max(1, widest(b.text, weight, isSerif ? serif : font));
    const byHeight = hPx / (LAYER_LINE * (lines - 1) + 0.85);
    const fs = Math.min(byWidth, byHeight);
    // A touch of slack so rounding never wraps a line.
    const wide = Math.min(1, w * 1.06);
    const shift = b.align === 'center' ? (wide - w) / 2 : b.align === 'right' ? wide - w : 0;
    return {
      id: uid(),
      anchor: 'image',
      type: 'text',
      text: b.text,
      x: Math.max(0, x - shift),
      y: y + Math.max(0, (hPx - fs * (LAYER_LINE * (lines - 1) + 1)) / 2) / IH,
      w: wide,
      size: fs / unit,
      color: b.color,
      weight,
      align: b.align,
      serif: isSerif || undefined,
    };
  });
}

/** The fraction of the frame the image can slide by, so a drag moves it under the pointer. */
function panRange(size: AdSize, img: HTMLImageElement, d: Design) {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const scale = (d.fit === 'fill' ? Math.max(size.w / w, size.h / h) : Math.min(size.w / w, size.h / h)) * d.zoom;
  return { x: size.w - w * scale, y: size.h - h * scale };
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[#545454]">{label}</span>
      {children}
    </label>
  );
}

/** Two to three mutually exclusive choices as a pill switch. */
function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: ReactNode }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-xl bg-[#f1f1f1] p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-[14px] transition-colors ${
            value === o.id ? 'bg-white font-medium text-[#121212] shadow-[0_1px_2px_rgba(16,24,40,0.1)]' : 'text-[#6b6b6b] hover:text-[#121212]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const SWATCHES = ['#ffffff', '#121212', '#ffe14d', '#ff5a5f', '#00b86b', '#3b82f6'];

/** Round colour dots for the common picks, plus a rainbow dot for any colour. */
function SwatchPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const custom = !SWATCHES.includes(value.toLowerCase());
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-[#545454]">{label}</span>
      <div className="flex flex-wrap items-center gap-2">
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`${label}: ${c}`}
            aria-pressed={value.toLowerCase() === c}
            onClick={() => onChange(c)}
            className={`h-8 w-8 rounded-full ring-1 ring-black/10 transition-transform hover:scale-110 ${
              value.toLowerCase() === c ? 'outline outline-2 outline-offset-2 outline-[#121212]' : ''
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
        <label
          className={`relative h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-[conic-gradient(#ff5a5f,#ffe14d,#00b86b,#3b82f6,#a855f7,#ff5a5f)] ring-1 ring-black/10 transition-transform hover:scale-110 ${
            custom ? 'outline outline-2 outline-offset-2 outline-[#121212]' : ''
          }`}
          title="Any colour"
        >
          <input type="color" aria-label={`${label}: any colour`} value={value || '#121212'} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
        </label>
      </div>
    </div>
  );
}

/** One-click looks: each sets position, colours and size together. */
const QUICK_STYLES: { name: string; tile: string; text: string; place: string; patch: Partial<Design> }[] = [
  {
    name: 'Bold',
    tile: 'bg-[linear-gradient(180deg,#e8892b,#3a2414)]',
    text: 'text-white font-bold',
    place: 'items-end justify-center',
    patch: { position: 'bottom', align: 'center', textColor: '#ffffff', ctaColor: '#ffffff', shade: true, textScale: 1.15 },
  },
  {
    name: 'Clean',
    tile: 'bg-[#f3efe8]',
    text: 'text-[#121212] font-medium',
    place: 'items-start justify-start',
    patch: { position: 'top', align: 'left', textColor: '#121212', ctaColor: '#121212', shade: false, textScale: 1 },
  },
  {
    name: 'Sale',
    tile: 'bg-[linear-gradient(180deg,#2b2b2b,#121212)]',
    text: 'text-[#ffe14d] font-black',
    place: 'items-center justify-center',
    patch: { position: 'center', align: 'center', textColor: '#ffe14d', ctaColor: '#ffe14d', shade: true, textScale: 1.3 },
  },
  {
    name: 'Elegant',
    tile: 'bg-[linear-gradient(180deg,#8a7a68,#2a231c)]',
    text: 'text-[#f6efe3] font-normal italic',
    place: 'items-end justify-start',
    patch: { position: 'bottom', align: 'left', textColor: '#ffffff', ctaColor: '#f2e6d0', shade: true, textScale: 0.9 },
  },
];

const GUIDE_KEY = 'hypeon-creative-editor-guide';

const GUIDE_STEPS = [
  { icon: ImagePlus, title: 'Upload your image', body: 'A product photo, or a finished ad you already have. Drag it in or click to upload.' },
  {
    icon: MousePointerClick,
    title: 'Edit it like a design app',
    body: 'Click the headline, subline, button or logo to select it, drag to move it, double-click to type. Pick a quick style, or let AI write the words.',
  },
  { icon: Download, title: 'Download every size', body: 'Instagram, Stories, Facebook, YouTube and Google: all six sizes in one click.' },
];

/** First-visit "how it works" popup; reopened from the ? button. */
function GuideModal({ open, onClose, onUpload }: { open: boolean; onClose: () => void; onUpload: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121212]/45 p-4 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-guide-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] md:p-8"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#8a8a8a] hover:bg-[#f3f3f3] hover:text-[#121212]"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]">How it works</p>
            <h2 id="editor-guide-title" className="mt-2 text-[28px] font-medium leading-tight tracking-[-0.02em] text-[#121212]">
              Your ad, every size, <span className="font-accent italic font-normal">in 3 steps.</span>
            </h2>
            <ol className="mt-6 space-y-3">
              {GUIDE_STEPS.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease }}
                  className="flex gap-4 rounded-2xl bg-[#f7f7f7] p-4"
                >
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#121212] text-white">
                    <s.icon className="h-5 w-5" strokeWidth={1.8} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#121212] ring-1 ring-[#e4e4e4]">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <p className="text-[16px] font-medium text-[#121212]">{s.title}</p>
                    <p className="mt-0.5 text-[14px] leading-[21px] text-[#6b6b6b]">{s.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onUpload();
                }}
                className={`${submitClass} h-[48px] w-full text-[15px]`}
              >
                <ImagePlus className="h-4 w-4" /> Upload my image
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Icon button for the floating toolbar. */
function ToolButton({
  active,
  label,
  onClick,
  children,
  danger,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-9 min-w-9 shrink-0 items-center justify-center gap-1 rounded-lg px-2 text-[13px] transition-colors ${
        active ? 'bg-[#121212] text-white' : danger ? 'text-[#b4232a] hover:bg-[#fdeaea]' : 'text-[#333333] hover:bg-[#f1f1f1]'
      }`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span aria-hidden className="mx-1 h-6 w-px shrink-0 bg-[#e6e6e6]" />;

/** The floating bar's shell, with a colour popover that closes on an outside click. */
function ToolbarShell({
  children,
  pop,
  setPop,
}: {
  children: ReactNode;
  pop: ReactNode | null;
  setPop: (v: null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!pop) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setPop(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [pop, setPop]);
  return (
    <div ref={ref} className="relative mx-auto w-fit max-w-full">
      <div className="editor-anim flex max-w-full animate-[editorPanelIn_0.25s_ease-out] items-center overflow-x-auto rounded-2xl bg-white p-1.5 shadow-[0_1px_2px_rgba(16,24,40,0.06),0_10px_30px_-12px_rgba(16,24,40,0.3)] ring-1 ring-[#e6e6e6] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      {pop && (
        <div className="editor-anim absolute left-1/2 top-full z-30 mt-2 w-[284px] -translate-x-1/2 animate-[editorPanelIn_0.2s_ease-out] rounded-2xl bg-white p-4 shadow-[0_20px_50px_-15px_rgba(16,24,40,0.4)] ring-1 ring-[#e6e6e6]">
          {pop}
        </div>
      )}
    </div>
  );
}

/**
 * When nothing is selected, the bar styles the headline, subline and button
 * together: where they stack, alignment, colours, size and the fade behind them.
 */
function AllTextToolbar({
  design,
  restyle,
  recolor,
  set,
}: {
  design: Design;
  restyle: (patch: Partial<Design>) => void;
  recolor: (patch: Pick<Partial<Design>, 'textColor' | 'ctaColor'>) => void;
  set: (patch: Partial<Design>) => void;
}) {
  const [pop, setPop] = useState<'text' | 'button' | null>(null);
  const scale = (delta: number) => restyle({ textScale: Math.min(1.5, Math.max(0.6, Math.round((design.textScale + delta) * 10) / 10)) });
  return (
    <ToolbarShell
      setPop={setPop}
      pop={
        pop === 'text' ? (
          <SwatchPicker label="Headline & subline colour" value={design.textColor} onChange={(textColor) => recolor({ textColor })} />
        ) : pop === 'button' ? (
          <SwatchPicker label="Button colour" value={design.ctaColor} onChange={(ctaColor) => recolor({ ctaColor })} />
        ) : null
      }
    >
      <span className="shrink-0 px-2 text-[13px] font-medium text-[#121212]">All text</span>
      <Divider />
      <ToolButton label="Stack at the top" active={design.position === 'top'} onClick={() => restyle({ position: 'top' })}>
        <AlignVerticalJustifyStart className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Stack in the middle" active={design.position === 'center'} onClick={() => restyle({ position: 'center' })}>
        <AlignVerticalJustifyCenter className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Stack at the bottom" active={design.position === 'bottom'} onClick={() => restyle({ position: 'bottom' })}>
        <AlignVerticalJustifyEnd className="h-4 w-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="Centre aligned" active={design.align === 'center'} onClick={() => restyle({ align: 'center' })}>
        <AlignCenter className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Left aligned" active={design.align === 'left'} onClick={() => restyle({ align: 'left' })}>
        <AlignLeft className="h-4 w-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="Headline & subline colour" active={pop === 'text'} onClick={() => setPop(pop === 'text' ? null : 'text')}>
        <span className="flex flex-col items-center leading-none">
          <span className="text-[15px] font-semibold">A</span>
          <span className="mt-0.5 h-[3px] w-4 rounded-full ring-1 ring-black/10" style={{ backgroundColor: design.textColor }} />
        </span>
      </ToolButton>
      <ToolButton label="Button colour" active={pop === 'button'} onClick={() => setPop(pop === 'button' ? null : 'button')}>
        <span className="h-4 w-6 rounded-full ring-1 ring-black/15" style={{ backgroundColor: design.ctaColor }} />
      </ToolButton>
      <Divider />
      <ToolButton label="Smaller text" onClick={() => scale(-0.1)}>
        <Minus className="h-4 w-4" />
      </ToolButton>
      <span className="w-10 shrink-0 text-center text-[13px] tabular-nums text-[#545454]">{Math.round(design.textScale * 100)}%</span>
      <ToolButton label="Bigger text" onClick={() => scale(0.1)}>
        <Plus className="h-4 w-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="Darken behind the text" active={design.shade} onClick={() => set({ shade: !design.shade })}>
        <Contrast className="h-4 w-4" />
      </ToolButton>
    </ToolbarShell>
  );
}

/** Styling for the selected layer: what it offers depends on whether it is text, a button or the logo. */
function LayerToolbar({
  layer,
  update,
  remove,
  duplicate,
}: {
  layer: Layer;
  update: (patch: Partial<Layer>) => void;
  remove: () => void;
  duplicate: () => void;
}) {
  const [pop, setPop] = useState<'color' | null>(null);
  const grow = (f: number) =>
    layer.type === 'logo' ? update({ w: Math.min(1, Math.max(0.04, layer.w * f)) }) : update({ size: Math.min(0.4, Math.max(0.01, layer.size * f)) });
  const bold = layer.weight >= 700;
  return (
    <ToolbarShell
      setPop={setPop}
      pop={
        pop === 'color' ? (
          <SwatchPicker label={layer.type === 'button' ? 'Button colour' : 'Text colour'} value={layer.color} onChange={(color) => update({ color })} />
        ) : null
      }
    >
      <span className="flex shrink-0 items-center gap-1.5 px-2 text-[13px] font-medium text-[#121212]">
        {layer.type === 'logo' ? <Stamp className="h-4 w-4" /> : layer.type === 'button' ? <RectangleHorizontal className="h-4 w-4" /> : <Type className="h-4 w-4" />}
        {layer.type === 'logo' ? 'Logo' : layer.role === 'headline' ? 'Headline' : layer.role === 'subline' ? 'Subline' : layer.type === 'button' ? 'Button' : 'Text'}
      </span>
      <Divider />
      {layer.type === 'text' && (
        <>
          <ToolButton label="Align left" active={layer.align === 'left'} onClick={() => update({ align: 'left' })}>
            <AlignLeft className="h-4 w-4" />
          </ToolButton>
          <ToolButton label="Align centre" active={layer.align === 'center'} onClick={() => update({ align: 'center' })}>
            <AlignCenter className="h-4 w-4" />
          </ToolButton>
          <ToolButton label="Align right" active={layer.align === 'right'} onClick={() => update({ align: 'right' })}>
            <AlignRight className="h-4 w-4" />
          </ToolButton>
          <Divider />
        </>
      )}
      {layer.type !== 'logo' && (
        <>
          <ToolButton label={layer.type === 'button' ? 'Button colour' : 'Text colour'} active={pop === 'color'} onClick={() => setPop(pop ? null : 'color')}>
            {layer.type === 'button' ? (
              <span className="h-4 w-6 rounded-full ring-1 ring-black/15" style={{ backgroundColor: layer.color }} />
            ) : (
              <span className="flex flex-col items-center leading-none">
                <span className="text-[15px] font-semibold">A</span>
                <span className="mt-0.5 h-[3px] w-4 rounded-full ring-1 ring-black/10" style={{ backgroundColor: layer.color }} />
              </span>
            )}
          </ToolButton>
          <ToolButton label="Bold" active={bold} onClick={() => update({ weight: bold ? 400 : 700 })}>
            <Bold className="h-4 w-4" />
          </ToolButton>
          <Divider />
        </>
      )}
      <ToolButton label="Smaller" onClick={() => grow(1 / 1.12)}>
        <Minus className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Bigger" onClick={() => grow(1.12)}>
        <Plus className="h-4 w-4" />
      </ToolButton>
      <Divider />
      {layer.type !== 'logo' && (
        <ToolButton label="Duplicate" onClick={duplicate}>
          <Copy className="h-4 w-4" />
        </ToolButton>
      )}
      <ToolButton label="Delete" danger onClick={remove}>
        <Trash2 className="h-4 w-4" />
      </ToolButton>
    </ToolbarShell>
  );
}

type PieceKind = 'headline' | 'subline' | 'button' | 'text';

const kindOf = (l: Layer): PieceKind =>
  l.role === 'headline' ? 'headline' : l.role === 'subline' ? 'subline' : l.type === 'button' ? 'button' : 'text';

/** One-tap requests for the rewrite popup; buttons get fewer, since they are only a few words. */
const PRESETS: Record<'text' | 'button', { label: string; ask: string }[]> = {
  text: [
    { label: 'Shorter', ask: 'Make it shorter' },
    { label: 'More urgent', ask: 'Make it more urgent' },
    { label: 'Add an offer', ask: 'Add a reason to buy now, such as an offer' },
    { label: 'More fun', ask: 'Make it more fun and playful' },
    { label: 'Professional', ask: 'Make it more professional' },
  ],
  button: [
    { label: 'Shorter', ask: 'Make it shorter' },
    { label: 'More urgent', ask: 'Make it more urgent' },
    { label: 'More specific', ask: 'Make it more specific about what happens next' },
  ],
};

type Rewrite = { open: boolean; busy: boolean; options: string[] | null; error: string | null; ask: string };
const REWRITE_IDLE: Rewrite = { open: false, busy: false, options: null, error: null, ask: '' };

/** Small "Rewrite with AI" popup beside the selected text: quick requests, a free-text ask, and three versions. */
function RewritePopup({
  layer,
  state,
  setAsk,
  onAsk,
  onPick,
  onClose,
  style,
}: {
  layer: Layer;
  state: Rewrite;
  setAsk: (v: string) => void;
  onAsk: (instruction: string) => void;
  onPick: (text: string) => void;
  onClose: () => void;
  /** Absolute position beside the ad; omitted when the popup is docked in the side panel. */
  style?: React.CSSProperties;
}) {
  const kind = kindOf(layer);
  const what = kind === 'button' ? 'button' : kind === 'text' ? 'text' : kind;
  return (
    <div
      role="dialog"
      aria-label={`Rewrite this ${what} with AI`}
      onPointerDown={(e) => e.stopPropagation()}
      className={`editor-anim animate-[editorPanelIn_0.22s_ease-out] rounded-2xl bg-white p-4 text-left leading-normal ring-1 ${
        style
          ? 'absolute z-30 w-[312px] max-w-[calc(100vw-48px)] shadow-[0_24px_60px_-20px_rgba(16,24,40,0.45)] ring-[#e6e6e6]'
          : 'relative w-full shadow-[0_10px_30px_-16px_rgba(91,63,214,0.45)] ring-[#d9cffb]'
      }`}
      style={style}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#7c5cf0,#3b82f6)] text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium leading-tight text-[#121212]">Rewrite this {what}</p>
          <p className="truncate text-[13px] text-[#8a8a8a]">&ldquo;{layer.text}&rdquo;</p>
        </div>
        <button type="button" aria-label="Close" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8a8a8a] hover:bg-[#f3f3f3] hover:text-[#121212]">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {PRESETS[kind === 'button' ? 'button' : 'text'].map((p) => (
          <button
            key={p.label}
            type="button"
            disabled={state.busy}
            onClick={() => onAsk(p.ask)}
            className="rounded-full bg-[#f3f0ff] px-3 py-1.5 text-[13px] font-medium text-[#5b3fd6] transition-colors hover:bg-[#e8e1ff] disabled:opacity-50"
          >
            {p.label}
          </button>
        ))}
      </div>

      <form
        className="mt-3 flex items-center gap-2 rounded-xl border border-[#dcdcdc] bg-white p-1 pl-3 focus-within:border-[#7c5cf0] focus-within:shadow-[0_0_0_3px_rgba(124,92,240,0.12)]"
        onSubmit={(e) => {
          e.preventDefault();
          onAsk(state.ask.trim() || 'Make it better');
        }}
      >
        <input
          autoFocus
          aria-label="Tell AI what to change"
          value={state.ask}
          onChange={(e) => setAsk(e.target.value)}
          maxLength={200}
          placeholder="Tell AI what to change…"
          className="h-8 min-w-0 flex-1 bg-transparent text-[14px] text-[#121212] outline-none placeholder:text-[#9a9a9a]"
        />
        <button
          type="submit"
          aria-label="Rewrite"
          disabled={state.busy}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#121212] text-white transition-[filter] hover:brightness-125 disabled:opacity-50"
        >
          {state.busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
        </button>
      </form>

      {state.busy && (
        <p className="mt-3 flex items-center gap-2 text-[13px] text-[#6b6b6b]">
          <Loader2 className="h-4 w-4 animate-spin text-[#7c5cf0]" /> Agent is writing three versions…
        </p>
      )}
      {state.error && <p className="mt-3 rounded-lg bg-[#fdeaea] px-3 py-2 text-[13px] text-[#b4232a]">{state.error}</p>}
      {state.options && !state.busy && (
        <ul className="mt-3 space-y-1.5">
          {state.options.map((o, i) => (
            <li key={o} className="editor-anim animate-[editorPanelIn_0.35s_ease-out_both]" style={{ animationDelay: `${i * 70}ms` }}>
              <button
                type="button"
                onClick={() => onPick(o)}
                className="w-full rounded-xl bg-[#f7f7f7] px-3 py-2.5 text-left text-[14px] font-medium leading-[20px] text-[#121212] ring-1 ring-transparent transition-shadow hover:bg-white hover:ring-2 hover:ring-[#7c5cf0]"
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CreativeEditor() {
  const fileRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLTextAreaElement>(null);
  const [dropping, setDropping] = useState(false);
  /** Phones and tablets: hints say "tap" instead of "click". */
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);
  const thumbRefs = useRef<Partial<Record<AdSizeId, HTMLCanvasElement | null>>>({});
  const pan = useRef<{ x: number; y: number; fx: number; fy: number } | null>(null);
  const move = useRef<{ id: string; sx: number; sy: number; rect: LayerRect; layer: Layer } | null>(null);
  const resize = useRef<{ corner: Corner; sx: number; sy: number; rect: LayerRect; layer: Layer } | null>(null);

  const [stage, setStage] = useState({ w: 0, h: 0 });
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [design, setDesign] = useState<Design>(DEFAULT_DESIGN);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [view, setView] = useState<{ box: Box; rects: LayerRect[]; canvasW: number; canvasH: number }>({
    box: { x: 0, y: 0, w: 0, h: 0 },
    rects: [],
    canvasW: 0,
    canvasH: 0,
  });
  const [sizeId, setSizeId] = useState<AdSizeId>('portrait');
  const [format, setFormat] = useState<'jpeg' | 'png'>('jpeg');
  const [font, setFont] = useState('sans-serif');
  const [serifFont, setSerifFont] = useState('serif');
  const [panning, setPanning] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('text');
  const [guide, setGuide] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // The security check runs invisibly here; Cloudflare shows it only if a visitor must click.
  const { ref: captchaRef, getToken, ready } = useTurnstile('light', { hidden: true });
  const readyRef = useRef(false);
  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);
  /** Waits for the background security check (it can take a while right after the page opens). */
  const whenReady = async (ms = 30_000) => {
    const t0 = Date.now();
    while (!readyRef.current && Date.now() - t0 < ms) await new Promise((r) => setTimeout(r, 250));
  };
  const [aiBusy, setAiBusy] = useState<AiAction | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [instruction, setInstruction] = useState('');
  const [options, setOptions] = useState<CopyOption[] | null>(null);
  const [rewrite, setRewrite] = useState<Rewrite>(REWRITE_IDLE);
  /** AI-extended backgrounds, per size, for the current image. */
  const [ext, setExt] = useState<Partial<Record<AdSizeId, Extension>>>({});
  /** Pictures for logos lifted off an ad, by layer id. */
  const [layerImgs, setLayerImgs] = useState<Record<string, HTMLImageElement>>({});
  const [tipClosed, setTipClosed] = useState(false);
  /** After a download: invite the visitor to make a UGC video version in HypeOn Studio. */
  const [studioNudge, setStudioNudge] = useState(false);
  /**
   * The editor just before "Edit its text", kept while the server says the
   * erase may show a patch, so one click can put everything back.
   */
  const [undoGrab, setUndoGrab] = useState<{
    img: HTMLImageElement;
    layers: Layer[];
    ext: Partial<Record<AdSizeId, Extension>>;
    layerImgs: Record<string, HTMLImageElement>;
  } | null>(null);
  useEffect(() => {
    if (!studioNudge) return;
    const id = setTimeout(() => setStudioNudge(false), 12_000);
    return () => clearTimeout(id);
  }, [studioNudge]);
  /** Sizes being fitted right now; the run id drops answers that belong to an image the visitor has since replaced. */
  const [fitting, setFitting] = useState<Partial<Record<AdSizeId, boolean>>>({});
  const fitRun = useRef(0);
  /** The ad the fitted sizes should show in their middle (the clean one after "Edit its text"). */
  const baseRef = useRef<HTMLImageElement | null>(null);
  const extRef = useRef<Partial<Record<AdSizeId, Extension>>>({});
  /** Removed text reached the left/right (h) or top/bottom (v) edge: the AI may have continued it into new space there. */
  const edgeRef = useRef({ h: false, v: false });
  const frameRef = useRef<HTMLDivElement>(null);

  /**
   * On desktop the editor is exactly one screen tall. Once the visitor starts
   * using it, the page scrolls it fully into view under the menu bar, so the
   * side panel scrolls on its own instead of the page scrolling underneath.
   */
  const bringIntoView = useCallback(() => {
    const el = frameRef.current;
    if (!el || !window.matchMedia('(min-width: 1024px)').matches) return;
    const r = el.getBoundingClientRect();
    const top = 76;
    if (Math.abs(r.top - top) > 8 && (r.top < top || r.bottom > window.innerHeight)) {
      window.scrollTo({ top: window.scrollY + r.top - top, behavior: 'smooth' });
    }
  }, []);
  const selectedRef = useRef<string | null>(null);

  const size = AD_SIZES.find((s) => s.id === sizeId) ?? AD_SIZES[0];
  const set = (patch: Partial<Design>) => setDesign((d) => ({ ...d, ...patch }));
  const updateLayer = (id: string, patch: Partial<Layer>) => setLayers((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const selectedLayer = layers.find((l) => l.id === selected) ?? null;

  // A new selection starts with the rewrite popup closed.
  useEffect(() => {
    selectedRef.current = selected;
    setRewrite(REWRITE_IDLE);
  }, [selected]);

  /** Rewrites only the selected piece; a reply that arrives after the selection changed is dropped. */
  async function rewriteSelected(instruction: string) {
    const layer = selectedLayer;
    if (!img || !layer || layer.type === 'logo') return;
    const context = layers
      .filter((l) => l.type !== 'logo' && l.id !== layer.id)
      .map((l) => l.text)
      .filter(Boolean)
      .join(' | ');
    setRewrite((r) => ({ ...r, busy: true, error: null }));
    trackTool('free_tool_ai', { tool: 'creative-editor', action: 'rewrite', kind: kindOf(layer) });
    try {
      const data = await postTool<{ options: string[] }>(
        '/api/tools/creative-ai',
        { action: 'rewrite', image: toDataUrl(img), piece: layer.text, kind: kindOf(layer), currentText: context, instruction },
        await getToken()
      );
      if (selectedRef.current === layer.id) setRewrite((r) => ({ ...r, busy: false, options: data.options }));
    } catch (err) {
      if (selectedRef.current === layer.id) {
        setRewrite((r) => ({ ...r, busy: false, error: err instanceof ToolError ? err.message : 'Something went wrong. Please try again.' }));
      }
    }
  }
  const roleText = (role: Role) => layers.find((l) => l.role === role)?.text ?? '';

  /** Quick styles, position, alignment and size: restyle the headline, subline and button and snap them back into the automatic layout. */
  function restyle(patch: Partial<Design>) {
    const next = { ...design, ...patch };
    setDesign(next);
    setLayers((ls) => ls.map((l) => (l.role ? styleRole(l.role, l.text, next, l.id) : l)));
  }

  /** Colours only: nothing moves. */
  function recolor(patch: Pick<Partial<Design>, 'textColor' | 'ctaColor'>) {
    set(patch);
    setLayers((ls) =>
      ls.map((l) =>
        l.role === 'cta' && patch.ctaColor ? { ...l, color: patch.ctaColor } : l.role && l.role !== 'cta' && patch.textColor ? { ...l, color: patch.textColor } : l
      )
    );
  }

  /** Typing in the side panel: edits that piece, creates it if needed, and removes it when emptied. */
  function setRoleText(role: Role, text: string) {
    setLayers((ls) => {
      const cur = ls.find((l) => l.role === role);
      if (cur) return text ? ls.map((l) => (l === cur ? { ...l, text } : l)) : ls.filter((l) => l !== cur);
      // A new piece joins the automatic layout; pieces the visitor moved stay where they are.
      return text ? [...ls, styleRole(role, text, design, uid())] : ls;
    });
  }

  // The how-it-works popup opens once per browser; storage can be blocked, so it fails quietly.
  useEffect(() => {
    try {
      if (!localStorage.getItem(GUIDE_KEY)) setGuide(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(id);
  }, [toast]);

  // The preview is sized to fit the free space around it, for every ad size and window.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setStage({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const closeGuide = useCallback(() => {
    setGuide(false);
    try {
      localStorage.setItem(GUIDE_KEY, '1');
    } catch {}
  }, []);

  // The page's own font once it has loaded, so canvas text matches the site.
  useEffect(() => {
    document.fonts?.ready.then(() => {
      setFont(getComputedStyle(document.body).fontFamily || 'sans-serif');
      // The serif accent used on the site's headings (a hidden probe, since no heading may be rendered yet).
      const probe = document.createElement('span');
      probe.className = 'font-accent';
      probe.style.display = 'none';
      document.body.appendChild(probe);
      setSerifFont(getComputedStyle(probe).fontFamily || 'serif');
      probe.remove();
    });
  }, []);

  /*
   * The visitor's work survives a refresh: it is restored from their own
   * browser on load, then saved again shortly after every change.
   */
  const restoredRef = useRef(false);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const work = await loadWork();
      if (work && !cancelled) {
        try {
          const toImg = (b: Blob) => loadImage(URL.createObjectURL(b));
          const image = await toImg(work.image);
          const logoImg = work.logo ? await toImg(work.logo) : null;
          const pics: Record<string, HTMLImageElement> = {};
          for (const [id, b] of Object.entries(work.layerImages)) pics[id] = await toImg(b);
          const exts: Partial<Record<AdSizeId, Extension>> = {};
          for (const [id, e] of Object.entries(work.extensions)) if (e) exts[id as AdSizeId] = { img: await toImg(e.image), inner: e.inner };
          if (!cancelled) {
            baseRef.current = image;
            setImg(image);
            setName(work.name);
            setDesign(work.design);
            setLayers(work.layers);
            setSizeId(work.sizeId);
            setFormat(work.format);
            setLogo(logoImg);
            setLayerImgs(pics);
            setExt(exts);
            setTipClosed(true);
            setToast('Restored your last ad');
          }
        } catch {}
      }
      restoredRef.current = true;
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!restoredRef.current || !img || !name) return;
    const id = setTimeout(async () => {
      try {
        const work: SavedWork = {
          v: 1,
          savedAt: Date.now(),
          name,
          design,
          layers,
          sizeId,
          format,
          image: await blobOf(img),
          logo: logo ? await blobOf(logo) : null,
          layerImages: Object.fromEntries(
            await Promise.all(
              Object.entries(layerImgs)
                .filter(([lid]) => layers.some((l) => l.id === lid))
                .map(async ([lid, pic]) => [lid, await blobOf(pic)] as const)
            )
          ),
          extensions: Object.fromEntries(
            await Promise.all(
              Object.entries(ext).map(async ([sid, e]) => [sid, { image: await blobOf(e!.img as HTMLImageElement), inner: e!.inner }] as const)
            )
          ),
        };
        await saveWork(work);
      } catch {}
    }, 700);
    return () => clearTimeout(id);
  }, [img, name, design, layers, logo, layerImgs, ext, sizeId, format]);

  useEffect(() => {
    extRef.current = ext;
  }, [ext]);

  // Redraw the preview and every size thumbnail on any change, once per frame.
  useEffect(() => {
    if (!img) return;
    const id = requestAnimationFrame(() => {
      const c = previewRef.current;
      if (c) {
        const res = drawCreative(c, size, img, design, { layers, logo, font, scale: PREVIEW_SIDE / Math.max(size.w, size.h), hidden: editing ?? undefined, ext: ext[size.id], images: layerImgs, serif: serifFont });
        setView({ ...res, canvasW: c.width, canvasH: c.height });
      }
      for (const s of AD_SIZES) {
        const t = thumbRefs.current[s.id];
        if (t) drawCreative(t, s, img, design, { layers, logo, font, scale: THUMB_SIDE / Math.max(s.w, s.h), ext: ext[s.id], images: layerImgs, serif: serifFont });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [img, logo, design, layers, size, font, serifFont, editing, ext, layerImgs]);

  const removeSelected = useCallback(() => {
    if (!selected) return;
    if (layers.find((l) => l.id === selected)?.type === 'logo') setLogo(null);
    setLayers((ls) => ls.filter((l) => l.id !== selected));
    setSelected(null);
  }, [selected, layers]);

  // Keyboard: Delete removes the selection, Escape deselects (never while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable="true"]') || editing) return;
      if ((e.key === 'Delete' || e.key === 'Backspace') && selected) {
        e.preventDefault();
        removeSelected();
      } else if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, editing, removeSelected]);

  async function pick(file: File | undefined, as: 'image' | 'logo') {
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) return setError('Upload a JPG, PNG or WebP image.');
    if (file.size > 25 * 1024 * 1024) return setError('That image is too large. Please use one under 25 MB.');
    setError(null);
    try {
      const loaded = await loadImage(URL.createObjectURL(file));
      if (as === 'logo') {
        setLogo(loaded);
        const existing = layers.find((l) => l.type === 'logo');
        const id = existing?.id ?? 'logo';
        if (!existing) setLayers((ls) => [...ls, { id, type: 'logo', text: '', x: 0.05, y: 0.05, w: 0.22, size: 0, color: '', weight: 400, align: 'left' }]);
        setSelected(id);
        return;
      }
      setImg(loaded);
      setOptions(null);
      setSelected(null);
      setEditing(null);
      // Show the whole upload in every size (finished ads must not lose their logo or button); Fill frame is one click away.
      const next: Design = { ...design, fit: 'fit', backdrop: 'blur', focusX: 0.5, focusY: 0.5, zoom: 1 };
      setDesign(next);
      setExt({});
      setTipClosed(false);
      baseRef.current = loaded;
      setUndoGrab(null);
      autoFit(loaded);
      bringIntoView();
      // Text pinned to the old image (made editable from a finished ad) goes with it; everything else stays.
      setLayers((ls) => ls.filter((l) => l.anchor !== 'image'));
      setName(file.name.replace(/\.[^.]+$/, ''));
      trackTool('free_tool_run', { tool: 'creative-editor' });
    } catch {
      setError('We could not read that image. Try saving it as a JPG.');
    }
  }

  function addLayer(type: 'text' | 'button') {
    const layer: Layer =
      type === 'text'
        ? { id: uid(), type, text: 'Your text', x: 0.15, y: 0.42, w: 0.7, size: 0.07, color: '#ffffff', weight: 700, align: 'center' }
        : { id: uid(), type, text: 'Shop now', x: 0.4, y: 0.62, w: 0, size: 0.036, color: '#ffffff', weight: 700, align: 'center' };
    setLayers((ls) => [...ls, layer]);
    setSelected(layer.id);
    setEditing(layer.id);
  }

  async function runAi<T>(action: AiAction, extra: Record<string, unknown> = {}): Promise<T | null> {
    if (!img) return null;
    setAiError(null);
    setAiBusy(action);
    trackTool('free_tool_ai', { tool: 'creative-editor', action });
    try {
      return await postTool<T>('/api/tools/creative-ai', { action, image: toDataUrl(img), ...extra }, await getToken());
    } catch (err) {
      setAiError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
      return null;
    } finally {
      setAiBusy(null);
    }
  }

  async function makeEditable() {
    setOptions(null);
    const before = img ? { img, layers, ext: extRef.current, layerImgs } : null;
    const data = await runAi<{
      image: string;
      blocks: FoundBlock[];
      logos?: { image: string; x: number; y: number; w: number; h: number }[];
      clean?: boolean;
    }>('grab');
    if (!data) return;
    let clean: HTMLImageElement;
    try {
      clean = await loadImage(data.image);
    } catch {
      return setAiError('We could not load the edited image. Please try again.');
    }
    setImg(clean);
    // Fitted sizes keep their AI-painted surroundings; only the middle is swapped for the clean ad.
    // But where the removed text ran close to an edge, the AI may have carried letters into the new space,
    // so those sizes are fitted again from the clean ad. Sizes still fitting are handled the same way (see autoFit).
    baseRef.current = clean;
    // Within 10% of an edge: on a test ad the AI copied a letter from text that ended 5% from the edge.
    const near = 100;
    const boxes = [
      ...data.blocks.map((b) => ({ x: b.x, y: b.y, w: b.w, h: b.h })),
      ...(data.logos ?? []).map((l) => ({ x: l.x * 1000, y: l.y * 1000, w: l.w * 1000, h: l.h * 1000 })),
    ];
    edgeRef.current = {
      h: boxes.some((b) => b.x < near || b.x + b.w > 1000 - near),
      v: boxes.some((b) => b.y < near || b.y + b.h > 1000 - near),
    };
    const redo: AdSizeId[] = [];
    const patched = await Promise.all(
      Object.entries(extRef.current).map(async ([sid, e]) => {
        if (!e) return [sid, e] as const;
        if (needsRefit(e.inner)) {
          redo.push(sid as AdSizeId);
          return [sid, undefined] as const;
        }
        return [sid, await withBase(e, clean)] as const;
      })
    );
    setExt(Object.fromEntries(patched.filter(([, e]) => e)));
    if (redo.length) void autoFit(clean, redo);
    // The brand logo comes back as its own cut-out, pinned where it was, so it can be moved and resized.
    const lifted = await Promise.all(
      (data.logos ?? []).map(async (l) => {
        try {
          return { l, pic: await loadImage(l.image), id: uid() };
        } catch {
          return null;
        }
      })
    );
    const logoLayers: Layer[] = [];
    const pics: Record<string, HTMLImageElement> = {};
    for (const item of lifted) {
      if (!item) continue;
      pics[item.id] = item.pic;
      logoLayers.push({ id: item.id, anchor: 'image', type: 'logo', text: '', x: item.l.x, y: item.l.y, w: item.l.w, size: 0, color: '', weight: 400, align: 'left' });
    }
    setLayerImgs((m) => ({ ...m, ...pics }));
    setLayers((ls) => [...ls, ...logoLayers, ...blocksToLayers(data.blocks, clean, font, serifFont)]);
    setSelected(null);
    setTipClosed(true);
    // The server checks every erased spot; when one may show a patch, offer to undo instead of hiding it.
    if (data.clean === false && before) setUndoGrab(before);
    else {
      setUndoGrab(null);
      setToast('Text is editable: click to select, double-click to type');
    }
  }

  /** A fitted size whose new space lies on a side the removed text reached. */
  function needsRefit(inner: Extension['inner']) {
    const wide = inner.x > 0.001;
    return wide ? edgeRef.current.h : edgeRef.current.v;
  }

  function undoMakeEditable() {
    if (!undoGrab) return;
    baseRef.current = undoGrab.img;
    setImg(undoGrab.img);
    setLayers(undoGrab.layers);
    setExt(undoGrab.ext);
    setLayerImgs(undoGrab.layerImgs);
    setSelected(null);
    setEditing(null);
    setUndoGrab(null);
    setToast('Back to your original ad');
  }

  /**
   * Fits the ad to every size by itself: AI extends the ad's own background
   * so the whole ad shows in each shape, with no crop, blur or colour bars.
   * Sizes already the ad's shape are skipped. The first request earns the
   * session the others reuse (a security token works once), then two run at a
   * time. A size that fails keeps the whole ad on a soft blurred background.
   */
  async function autoFit(source: HTMLImageElement, only?: AdSizeId[]) {
    // Fitting a few sizes again joins the current run, so sizes still on their way are not dropped.
    const run = only ? fitRun.current : ++fitRun.current;
    const ratio = source.naturalWidth / source.naturalHeight;
    const todo = AD_SIZES.filter((s) => (!only || only.includes(s.id)) && Math.abs(ratio - s.w / s.h) / (s.w / s.h) >= 0.03);
    const flags = Object.fromEntries(todo.map((s) => [s.id, true]));
    setFitting((f) => (only ? { ...f, ...flags } : flags));
    if (!todo.length) return;
    trackTool('free_tool_ai', { tool: 'creative-editor', action: 'auto-fit', sizes: todo.length });
    // An upload right after the page opens can beat the security check; fitting waits for it instead of failing.
    await whenReady();
    const image = toDataUrl(source);
    let failed = 0;
    const one = async (s: AdSize) => {
      let handedOff = false;
      try {
        const data = await postTool<{ image?: string; inner?: Extension['inner']; fits?: boolean }>(
          '/api/tools/creative-ai',
          { action: 'extend', image, ratio: s.w / s.h },
          await getToken()
        );
        if (fitRun.current !== run || !data.image || !data.inner) return;
        let fitted: Extension = { img: await loadImage(data.image), inner: data.inner };
        const base = baseRef.current;
        if (base && base !== source) {
          // The text was made editable while this size was fitting.
          if (needsRefit(data.inner)) {
            handedOff = true;
            void autoFit(base, [s.id]);
            return;
          }
          fitted = await withBase(fitted, base);
        }
        if (fitRun.current === run) setExt((e) => ({ ...e, [s.id]: fitted }));
      } catch {
        failed++;
      } finally {
        if (!handedOff && fitRun.current === run) setFitting((f) => ({ ...f, [s.id]: false }));
      }
    };
    await one(todo[0]);
    const rest = todo.slice(1);
    for (let i = 0; i < rest.length; i += 2) await Promise.all(rest.slice(i, i + 2).map(one));
    if (fitRun.current !== run || only) return;
    if (failed) {
      setAiError(`${failed} size${failed > 1 ? 's' : ''} could not be fitted right now and show${failed > 1 ? '' : 's'} the whole ad on a soft background. Use Extend in the Image panel to try again.`);
    } else setToast('Your ad is fitted to every size');
  }

  /** Extends the background for each size that does not have one yet; sizes already the image's shape are skipped, and said so. */
  async function extendSizes(sizes: readonly AdSize[]) {
    let done = 0;
    const fitting = sizes.filter((s) => fitsShape(s));
    for (const s of sizes) {
      if (ext[s.id] || fitsShape(s)) continue;
      const data = await runAi<{ image?: string; inner?: Extension['inner']; fits?: boolean }>('extend', { ratio: s.w / s.h });
      if (!data) break;
      if (data.fits || !data.image || !data.inner) {
        fitting.push(s);
        continue;
      }
      try {
        const extImg = await loadImage(data.image);
        const inner = data.inner;
        setExt((e) => ({ ...e, [s.id]: { img: extImg, inner } }));
        done++;
      } catch {
        setAiError('We could not load the extended image. Please try again.');
        break;
      }
    }
    // Always say what happened, so a size that needed nothing never looks like a broken button.
    if (sizes.length === 1 && fitting.length) setToast(`Your ad already fits ${sizes[0].name}: nothing to extend`);
    else if (done || fitting.length) {
      setToast([done && `Extended ${done} size${done > 1 ? 's' : ''}`, fitting.length && `${fitting.length} already fit`].filter(Boolean).join(' · '));
    }
  }

  /** True when the image is already this size's shape (within 3%), so extending would add nothing. */
  function fitsShape(s: AdSize) {
    if (!img) return false;
    const r = img.naturalWidth / img.naturalHeight;
    const t = s.w / s.h;
    return Math.abs(r - t) / t < 0.03;
  }

  async function writeText() {
    const currentText = layers
      .filter((l) => l.type !== 'logo')
      .map((l) => l.text)
      .filter(Boolean)
      .join(' | ');
    const data = await runAi<{ options: CopyOption[] }>('write', { currentText, instruction });
    if (data) setOptions(data.options);
  }

  function applyOption(o: CopyOption) {
    // A selected extra text box or button takes the new words; otherwise the headline, subline and button do.
    if (selectedLayer && selectedLayer.type !== 'logo' && !selectedLayer.role) {
      updateLayer(selectedLayer.id, { text: selectedLayer.type === 'button' ? o.cta || o.headline : o.headline });
    } else {
      setRoleText('headline', o.headline);
      setRoleText('subline', o.subline);
      setRoleText('cta', o.cta);
    }
  }

  // Panning the photo: drag on the canvas where there is no text, button or logo.
  function onCanvasDown(e: ReactPointerEvent<HTMLCanvasElement>) {
    setSelected(null);
    setEditing(null);
    capture(e);
    pan.current = { x: e.clientX, y: e.clientY, fx: design.focusX, fy: design.focusY };
    setPanning(true);
  }

  function onCanvasMove(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!pan.current || !img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const range = panRange(size, img, design);
    // Pointer movement in the ad's own pixels, divided by how far the image can slide.
    const dx = ((e.clientX - pan.current.x) * size.w) / rect.width;
    const dy = ((e.clientY - pan.current.y) * size.h) / rect.height;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    set({
      focusX: Math.abs(range.x) > 1 ? clamp(pan.current.fx + dx / range.x) : pan.current.fx,
      focusY: Math.abs(range.y) > 1 ? clamp(pan.current.fy + dy / range.y) : pan.current.fy,
    });
  }

  function onCanvasUp() {
    pan.current = null;
    setPanning(false);
  }

  // Moving a layer (or the auto layout): the pointer delta in canvas pixels, kept inside the frame.
  const cssScale = shownScale();
  function shownScale() {
    const fit = stage.w > 0 && stage.h > 0 ? Math.min(stage.w / size.w, stage.h / size.h) : 0;
    return fit && view.canvasW ? (size.w * fit) / view.canvasW : 0;
  }

  function onLayerDown(e: ReactPointerEvent<HTMLDivElement>, rect: LayerRect) {
    e.stopPropagation();
    setSelected(rect.id);
    if (editing && editing !== rect.id) setEditing(null);
    if (editing === rect.id) return;
    capture(e);
    const layer = layers.find((l) => l.id === rect.id);
    if (layer) move.current = { id: rect.id, sx: e.clientX, sy: e.clientY, rect, layer };
  }

  function onLayerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const m = move.current;
    if (!m || !cssScale) return;
    const W = view.canvasW;
    const H = Math.round(size.h * (PREVIEW_SIDE / Math.max(size.w, size.h)));
    const nx = Math.max(0, Math.min(W - m.rect.w, m.rect.x + (e.clientX - m.sx) / cssScale));
    const ny = Math.max(0, Math.min(H - m.rect.h, m.rect.y + (e.clientY - m.sy) / cssScale));
    // Anchored layers move within the ad's design; others within the frame.
    if (m.layer.anchor === 'image' && view.box.w) updateLayer(m.id, { x: (nx - view.box.x) / view.box.w, y: (ny - view.box.y) / view.box.h });
    else updateLayer(m.id, { x: nx / W, y: ny / H, free: true });
  }

  function onLayerUp() {
    move.current = null;
  }

  // Resizing from a corner: scales the layer evenly while the opposite corner stays where it is.
  function onHandleDown(e: ReactPointerEvent<HTMLSpanElement>, corner: Corner, rect: LayerRect) {
    e.stopPropagation();
    const layer = layers.find((l) => l.id === rect.id);
    if (!layer) return;
    capture(e);
    resize.current = { corner, sx: e.clientX, sy: e.clientY, rect, layer };
  }

  function onHandleMove(e: ReactPointerEvent<HTMLSpanElement>) {
    const r = resize.current;
    if (!r || !cssScale) return;
    const right = r.corner.endsWith('e');
    const bottom = r.corner.startsWith('s');
    const dx = (e.clientX - r.sx) / cssScale;
    const dy = (e.clientY - r.sy) / cssScale;
    // Whichever way the pointer moved more decides the scale, so diagonal and straight drags both feel natural.
    const byW = (r.rect.w + (right ? dx : -dx)) / r.rect.w;
    const byH = (r.rect.h + (bottom ? dy : -dy)) / r.rect.h;
    const f = Math.min(6, Math.max(0.15, Math.abs(byW - 1) > Math.abs(byH - 1) ? byW : byH));
    const l = r.layer;
    const patch: Partial<Layer> =
      l.type === 'logo' ? { w: l.w * f } : l.type === 'button' ? { size: l.size * f } : { size: l.size * f, w: Math.min(1, l.w * f) };
    // Keep the opposite corner fixed (not for a headline/subline/button still in the automatic layout).
    if (!l.role || l.free) {
      const nx = right ? r.rect.x : r.rect.x + r.rect.w - r.rect.w * f;
      const ny = bottom ? r.rect.y : r.rect.y + r.rect.h - r.rect.h * f;
      const H = view.canvasH;
      if (l.anchor === 'image' && view.box.w) Object.assign(patch, { x: (nx - view.box.x) / view.box.w, y: (ny - view.box.y) / view.box.h });
      else Object.assign(patch, { x: Math.max(0, nx) / view.canvasW, y: Math.max(0, ny) / H });
    }
    updateLayer(l.id, patch);
  }

  function onHandleUp() {
    resize.current = null;
  }

  function onLayerDouble(id: string) {
    if (layers.find((l) => l.id === id)?.type !== 'logo') setEditing(id);
  }

  function finishEditing() {
    // An emptied text box goes away, as in design apps.
    if (editing && !layers.find((l) => l.id === editing)?.text.trim()) setLayers((ls) => ls.filter((l) => l.id !== editing));
    setEditing(null);
  }

  async function exportSizes(sizes: readonly AdSize[]) {
    if (!img) return;
    setExporting(true);
    trackTool('free_tool_export', { tool: 'creative-editor', sizes: sizes.length, format });
    const base = (name || 'hypeon-ad').replace(/[^\w-]+/g, '-').slice(0, 40);
    for (const s of sizes) {
      const blob = await exportCreative(s, img, design, { layers, logo, font, serif: serifFont, format, ext: ext[s.id], images: layerImgs });
      if (blob) download(blob, `${base}-${s.w}x${s.h}.${format === 'jpeg' ? 'jpg' : 'png'}`);
      // Browsers block a burst of downloads; a short gap lets each one through.
      if (sizes.length > 1) await new Promise((r) => setTimeout(r, 350));
    }
    setExporting(false);
    setToast(sizes.length > 1 ? `Downloaded all ${sizes.length} sizes` : `Downloaded ${sizes[0].name}`);
    setStudioNudge(true);
  }

  const story = 'safe' in size;
  const fit = stage.w > 0 && stage.h > 0 ? Math.min(stage.w / size.w, stage.h / size.h) : 0;
  const shown = fit ? { width: Math.floor(size.w * fit), height: Math.floor(size.h * fit) } : undefined;
  const editingLayer = layers.find((l) => l.id === editing) ?? null;
  const editingRect = view.rects.find((r) => r.id === editing) ?? null;
  const selectedRect = view.rects.find((r) => r.id === selected) ?? null;
  const extraLayers = layers.filter((l) => l.type !== 'logo' && !l.role);
  // The rewrite popup opens beside the ad when the grey space fits it; otherwise in the side panel, so it never covers the ad.
  const popupBeside = !!shown && (stage.w - shown.width) / 2 >= 332;
  const rewriteTarget = rewrite.open && selectedLayer && selectedLayer.type !== 'logo' ? selectedLayer : null;
  const rewritePopup = (style?: React.CSSProperties) =>
    rewriteTarget && (
      <RewritePopup
        layer={rewriteTarget}
        state={rewrite}
        setAsk={(ask) => setRewrite((x) => ({ ...x, ask }))}
        onAsk={rewriteSelected}
        onPick={(text) => {
          updateLayer(rewriteTarget.id, { text });
          setRewrite(REWRITE_IDLE);
          setToast('Text updated');
        }}
        onClose={() => setRewrite(REWRITE_IDLE)}
        style={style}
      />
    );

  const tabs: { id: Tab; label: string; icon: typeof Type }[] = [
    { id: 'text', label: 'Text', icon: Type },
    { id: 'ai', label: 'AI magic', icon: Sparkles },
    { id: 'image', label: 'Image', icon: ImageIcon },
    { id: 'logo', label: 'Logo', icon: Stamp },
  ];
  const titles: Record<Tab, { title: string; sub: string }> = {
    text: { title: 'Text', sub: 'Headline, subline, button and extra text' },
    ai: { title: 'AI magic', sub: 'Let AI write your headline, subline and button' },
    image: { title: 'Image', sub: 'How your photo fills each size' },
    logo: { title: 'Logo', sub: 'Your brand, anywhere on the ad' },
  };
  // Inactive panels stay mounted (the security check lives in the AI panel) but take no space.
  const panel = (id: Tab) =>
    tab === id ? 'editor-anim space-y-5 animate-[editorPanelIn_0.3s_ease-out]' : 'invisible absolute inset-x-0 top-0 h-0 overflow-hidden';
  const darkButton =
    'flex h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#121212] text-[14px] font-medium text-white transition-[filter] hover:brightness-125 disabled:opacity-40';
  const lightButton =
    'flex h-[40px] w-full items-center justify-center gap-2 rounded-xl border border-[#dcdcdc] bg-white text-[14px] text-[#333333] transition-colors hover:bg-[#f5f5f5]';

  return (
    <section className="pb-6 pt-[112px] md:pt-[150px]">
      <Container>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <ToolHero
            slug="creative-editor"
            title="Edit any ad"
            accent="with AI."
            sub="Upload your ad. AI fits it to every size, makes its text editable and writes new headlines, ready for Instagram, Stories, Facebook, YouTube and Google."
            points={['AI fits every size', 'AI writes headlines', 'No watermark']}
          />
        </motion.div>
      </Container>

      {/* The workspace: wider than the page column, laid out like a design app. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="mx-auto mt-10 w-full max-w-[1320px] px-4 md:mt-12"
      >
        <div
          ref={frameRef}
          onPointerDownCapture={bringIntoView}
          className="flex scroll-mt-[76px] flex-col overflow-hidden rounded-[20px] border border-[#e1e1e1] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_30px_80px_-30px_rgba(16,24,40,0.35)] lg:h-[min(860px,calc(100vh-92px))] lg:min-h-[560px]"
        >
          {/* Top bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-[#ececec] px-4 py-3">
            <input
              ref={fileRef}
              type="file"
              accept={IMAGE_TYPES.join(',')}
              className="hidden"
              onChange={(e) => {
                pick(e.target.files?.[0], 'image');
                e.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-[40px] items-center gap-2 rounded-xl bg-[#f1f1f1] px-4 text-[14px] font-medium text-[#121212] transition-colors hover:bg-[#e6e6e6]"
            >
              <ImagePlus className="h-4 w-4" /> {name ? 'Change image' : 'Upload image'}
            </button>
            <span className="hidden min-w-0 max-w-[220px] truncate text-[14px] text-[#8a8a8a] sm:inline">{name ?? 'No image yet'}</span>

            <div className="ml-auto flex items-center gap-2">
              <a
                href={STUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackTool('free_tool_cta', { tool: 'creative-editor', cta: 'ugc-video-editor', place: 'top-bar' })}
                title="Make a UGC video ad in HypeOn Studio"
                aria-label="UGC Video Editor: make a UGC video ad in HypeOn Studio"
                className="inline-flex h-[40px] items-center gap-1.5 rounded-xl border border-[#464646] bg-gradient-to-b from-[#373737] to-[#121212] px-3 text-[14px] font-medium text-white shadow-[0_3.667px_11px_rgba(16,24,40,0.1)] transition-[filter] hover:brightness-125 sm:px-3.5"
              >
                <Clapperboard className="h-4 w-4" />
                <span className="hidden sm:inline">UGC Video Editor</span>
              </a>
              <button
                type="button"
                onClick={() => setGuide(true)}
                aria-label="How it works"
                title="How it works"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-xl text-[#6b6b6b] transition-colors hover:bg-[#f1f1f1] hover:text-[#121212]"
              >
                <CircleHelp className="h-[18px] w-[18px]" />
              </button>
              <div className="w-[112px]">
                <Segmented
                  label="File format"
                  value={format}
                  onChange={setFormat}
                  options={[
                    { id: 'jpeg', label: 'JPG' },
                    { id: 'png', label: 'PNG' },
                  ]}
                />
              </div>
              <button
                type="button"
                disabled={!img || exporting}
                onClick={() => exportSizes(AD_SIZES)}
                className="hidden h-[40px] items-center rounded-xl border border-[#dcdcdc] px-4 text-[14px] font-medium text-[#121212] transition-colors hover:bg-[#f5f5f5] disabled:opacity-50 sm:inline-flex"
              >
                {exporting ? 'Preparing…' : `All ${AD_SIZES.length} sizes`}
              </button>
              <button type="button" disabled={!img || exporting} onClick={() => exportSizes([size])} className={`${submitClass} h-[40px] rounded-xl px-4 text-[14px]`}>
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </div>
          {error && <p role="alert" className="border-b border-[#f6d5d5] bg-[#fdeaea] px-4 py-2.5 text-[14px] text-[#b4232a]">{error}</p>}

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Tool rail: icons down the side on desktop, tabs across on phones */}
            <div role="tablist" aria-label="Editor tools" className="order-2 flex border-b border-[#ececec] lg:order-none lg:w-[76px] lg:shrink-0 lg:flex-col lg:gap-1 lg:border-b-0 lg:border-r lg:py-3">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => {
                    setTab(t.id);
                    bringIntoView();
                  }}
                  className={`group flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[12px] transition-colors lg:flex-none lg:py-2 ${
                    tab === t.id ? 'font-medium text-[#121212]' : 'text-[#7a7a7a] hover:text-[#121212]'
                  }`}
                >
                  <span className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${tab === t.id ? 'text-white' : 'group-hover:bg-[#f1f1f1]'}`}>
                    {/* The black highlight slides from tool to tool. */}
                    {tab === t.id && (
                      <motion.span layoutId="editor-rail" className="absolute inset-0 rounded-xl bg-[#121212]" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />
                    )}
                    <t.icon className="relative h-[18px] w-[18px] transition-transform group-hover:scale-110" strokeWidth={1.8} />
                  </span>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Side panel for the selected tool */}
            <div className="order-3 flex min-h-0 flex-col border-[#ececec] lg:order-none lg:w-[312px] lg:shrink-0 lg:border-r">
              <div className="px-5 pt-5">
                <p className="text-[18px] font-medium text-[#121212]">{titles[tab].title}</p>
                <p className="mt-0.5 text-[13px] text-[#8a8a8a]">{titles[tab].sub}</p>
              </div>
              <div className="relative flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 pb-5 pt-4 editor-scroll">
                {!popupBeside && rewriteTarget && <div className="mb-5">{rewritePopup()}</div>}
                {undoGrab && (
                  <div role="alert" className="mb-5 rounded-2xl bg-[#fff7e8] p-4 ring-1 ring-[#f5d9a6]">
                    <p className="text-[14px] font-medium text-[#121212]">The background behind the text was hard to rebuild</p>
                    <p className="mt-1 text-[13px] leading-[19px] text-[#6b5a3a]">
                      Look closely at where the old text was. If you can see a patch, undo to get your original ad back exactly as it was.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" onClick={undoMakeEditable} className={`${darkButton} h-[40px]`}>
                        <Undo2 className="h-4 w-4" /> Undo
                      </button>
                      <button type="button" onClick={() => setUndoGrab(null)} className={lightButton}>
                        Keep it
                      </button>
                    </div>
                  </div>
                )}
                {(aiBusy || aiError) && (
                  <div className="mb-5 space-y-3">
                    {aiBusy && <ToolProgress active expected={AI_PROGRESS[aiBusy].expected} steps={AI_PROGRESS[aiBusy].steps} />}
                    {aiError && (
                      <p role="alert" className="rounded-xl bg-[#fdeaea] px-4 py-3 text-[14px] text-[#b4232a]">
                        {aiError}
                      </p>
                    )}
                  </div>
                )}
                {/* Text */}
                <div className={panel('text')} role="tabpanel" aria-label="Text">
                  {name && !tipClosed && !layers.some((l) => l.anchor === 'image') && (
                    <div className="relative rounded-2xl bg-[linear-gradient(135deg,#f4f0ff,#eef6ff)] p-4 ring-1 ring-[#e3defa]">
                      <button
                        type="button"
                        aria-label="Hide this tip"
                        onClick={() => setTipClosed(true)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg text-[#8a8a8a] hover:bg-white/70 hover:text-[#121212]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                      <p className="pr-6 text-[14px] font-medium text-[#121212]">Uploaded a finished ad?</p>
                      <p className="mt-0.5 text-[13px] leading-[19px] text-[#545454]">Make its text editable, and fill every size without cropping.</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          disabled={!!aiBusy || !ready}
                          onClick={() => {
                            setTab('ai');
                            makeEditable();
                          }}
                          className="flex h-[38px] items-center justify-center gap-1.5 rounded-xl bg-[#121212] text-[13px] font-medium text-white disabled:opacity-50"
                        >
                          <ScanText className="h-3.5 w-3.5" /> Edit its text
                        </button>
                        <button
                          type="button"
                          onClick={() => setTab('image')}
                          className="flex h-[38px] items-center justify-center gap-1.5 rounded-xl border border-[#d9cffb] bg-white text-[13px] font-medium text-[#121212]"
                        >
                          <Maximize2 className="h-3.5 w-3.5" /> Fill sizes
                        </button>
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="mb-1.5 block text-[13px] font-medium text-[#545454]">Quick styles</span>
                    <div className="grid grid-cols-4 gap-2">
                      {QUICK_STYLES.map((q) => (
                        <button key={q.name} type="button" onClick={() => restyle(q.patch)} className="group text-center">
                          <span
                            className={`flex h-[52px] w-full rounded-xl p-1.5 text-[13px] leading-none ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_18px_-8px_rgba(16,24,40,0.45)] ${q.tile} ${q.place}`}
                          >
                            <span className={q.text}>Aa</span>
                          </span>
                          <span className="mt-1 block text-[12px] text-[#545454] group-hover:text-[#121212]">{q.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="Headline">
                    <textarea
                      ref={headlineRef}
                      value={roleText('headline')}
                      maxLength={80}
                      rows={2}
                      onChange={(e) => setRoleText('headline', e.target.value)}
                      placeholder="Your main message"
                      className={`${inputClass} h-auto resize-none py-2.5 text-[15px] font-medium`}
                    />
                  </Field>
                  <Field label="Subline">
                    <input value={roleText('subline')} maxLength={120} onChange={(e) => setRoleText('subline', e.target.value)} placeholder="Offer, benefit or detail" className={`${inputClass} h-[44px] text-[15px]`} />
                  </Field>
                  <Field label="Button">
                    <input value={roleText('cta')} maxLength={24} onChange={(e) => setRoleText('cta', e.target.value)} placeholder="Shop now" className={`${inputClass} h-[44px] text-[15px]`} />
                  </Field>
                  <p className="flex items-start gap-2 rounded-xl bg-[#f7f7f7] p-3 text-[13px] leading-[19px] text-[#545454]">
                    <MousePointerClick className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Each one is separate: click it on the ad to move, recolour or resize just that piece.
                  </p>

                  <div>
                    <span className="mb-1.5 block text-[13px] font-medium text-[#545454]">Add more</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => addLayer('text')} className={lightButton}>
                        <Type className="h-4 w-4" /> Text
                      </button>
                      <button type="button" onClick={() => addLayer('button')} className={lightButton}>
                        <RectangleHorizontal className="h-4 w-4" /> Button
                      </button>
                    </div>
                  </div>

                  {extraLayers.length > 0 && (
                    <ul className="space-y-1">
                      {extraLayers.map((l) => (
                        <li key={l.id} className="group flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setSelected(l.id)}
                            onDoubleClick={() => setEditing(l.id)}
                            className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[14px] transition-colors ${
                              selected === l.id ? 'bg-[#f1ecff] text-[#121212] ring-1 ring-[#c9b8f7]' : 'text-[#333333] hover:bg-[#f5f5f5]'
                            }`}
                          >
                            {l.type === 'button' ? <RectangleHorizontal className="h-4 w-4 shrink-0 text-[#8a8a8a]" /> : <Type className="h-4 w-4 shrink-0 text-[#8a8a8a]" />}
                            <span className="truncate">{l.text || '(empty)'}</span>
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete “${l.text}”`}
                            onClick={() => setLayers((ls) => ls.filter((x) => x.id !== l.id))}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#9a9a9a] opacity-0 transition-opacity hover:bg-[#fdeaea] hover:text-[#b4232a] focus:opacity-100 group-hover:opacity-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* AI magic */}
                <div className={panel('ai')} role="tabpanel" aria-label="AI magic">
                  <div className="rounded-2xl border border-[#ececec] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#121212] text-white">
                        <ScanText className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[15px] font-medium text-[#121212]">Make text editable</p>
                        <p className="mt-0.5 text-[13px] leading-[19px] text-[#8a8a8a]">
                          For a finished ad: its headline, labels and buttons become text you can change and move. The logo and text on the products stay as they are.
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={makeEditable} disabled={!img || !name || !!aiBusy || !ready} className={`${darkButton} mt-4`}>
                      <ScanText className="h-4 w-4" /> Make text editable
                    </button>
                    <p className="mt-2 text-[12px] text-[#9a9a9a]">{name ? 'Takes about 45 seconds.' : 'Upload your ad first.'}</p>
                  </div>

                  <div className="rounded-2xl border border-[#ececec] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7c5cf0,#3b82f6)] text-white">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[15px] font-medium text-[#121212]">Write new text</p>
                        <p className="mt-0.5 text-[13px] leading-[19px] text-[#8a8a8a]">
                          {selectedLayer && selectedLayer.type !== 'logo' && !selectedLayer.role
                            ? 'Pick a version to replace the selected text box.'
                            : '3 versions of headline, subline and button for your image.'}
                        </p>
                      </div>
                    </div>
                    <input
                      aria-label="What the new text should say (optional)"
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                      maxLength={200}
                      placeholder="Optional: e.g. 40% off this week"
                      className={`${inputClass} mt-4 h-[44px] text-[14px]`}
                    />
                    <button type="button" onClick={writeText} disabled={!img || !!aiBusy || !ready} className={`${darkButton} mt-2`}>
                      <Sparkles className="h-4 w-4" /> Write 3 versions
                    </button>
                    {options && (
                      <ul className="mt-3 space-y-2">
                        {options.map((o, i) => (
                          <li key={o.headline} className="editor-anim animate-[editorPanelIn_0.4s_ease-out_both]" style={{ animationDelay: `${i * 90}ms` }}>
                            <button
                              type="button"
                              onClick={() => applyOption(o)}
                              className="w-full rounded-xl bg-[#f7f7f7] p-3 text-left ring-1 ring-transparent transition-shadow hover:ring-[#121212]"
                            >
                              <p className="text-[15px] font-medium leading-snug text-[#121212]">{o.headline}</p>
                              {o.subline && <p className="mt-0.5 text-[13px] text-[#545454]">{o.subline}</p>}
                              {o.cta && <span className="mt-2 inline-flex rounded-full bg-[#121212] px-2.5 py-1 text-[12px] font-medium text-white">{o.cta}</span>}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <div ref={captchaRef} className="w-[300px] origin-top-left scale-[0.88] empty:hidden" />
                  </div>
                </div>

                {/* Image */}
                <div className={panel('image')} role="tabpanel" aria-label="Image">
                  <div className="rounded-2xl border border-[#ececec] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7c5cf0,#3b82f6)] text-white">
                        <Maximize2 className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[15px] font-medium text-[#121212]">AI extend background</p>
                        <p className="mt-0.5 text-[13px] leading-[19px] text-[#8a8a8a]">
                          Done for you after each upload: every size shows your whole ad, with more of its own background. Redo a size here.
                        </p>
                      </div>
                    </div>
                    {name && fitsShape(size) ? (
                      <p className="mt-4 flex items-center gap-2 rounded-xl bg-[#f3f3f3] px-3 py-2.5 text-[13px] text-[#545454]">
                        <Check className="h-4 w-4 shrink-0 text-[#00b86b]" /> Your ad already fits {size.name}: nothing to extend.
                      </p>
                    ) : ext[size.id] ? (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="flex flex-1 items-center gap-2 rounded-xl bg-[#e3f9ee] px-3 py-2.5 text-[13px] font-medium text-[#007a45]">
                          <Check className="h-4 w-4" /> Extended for {size.name}
                        </span>
                        <button
                          type="button"
                          title="Undo"
                          aria-label={`Remove the extended background for ${size.name}`}
                          onClick={() =>
                            setExt((e) => {
                              const next = { ...e };
                              delete next[size.id];
                              return next;
                            })
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dcdcdc] text-[#545454] hover:bg-[#f5f5f5]"
                        >
                          <Undo2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => extendSizes([size])} disabled={!img || !name || !!aiBusy || !ready} className={`${darkButton} mt-4`}>
                        <Maximize2 className="h-4 w-4" /> Extend for {size.name}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => extendSizes(AD_SIZES)}
                      disabled={!img || !name || !!aiBusy || !ready || AD_SIZES.every((s) => ext[s.id] || fitsShape(s))}
                      className={`${lightButton} mt-2 disabled:opacity-50`}
                    >
                      Extend all sizes
                    </button>
                    <p className="mt-2 text-[12px] text-[#9a9a9a]">{name ? 'About 25 seconds per size. Sizes already the right shape are skipped.' : 'Upload your ad first.'}</p>
                  </div>
                  <Field label="Fit">
                    <Segmented
                      label="How the image fills the frame"
                      value={design.fit}
                      onChange={(f) => set({ fit: f, focusX: 0.5, focusY: 0.5, zoom: 1 })}
                      options={[
                        { id: 'fill', label: 'Fill frame' },
                        { id: 'fit', label: 'Whole image' },
                      ]}
                    />
                  </Field>
                  {design.fit === 'fit' && (
                    <Field label="Background">
                      <Segmented
                        label="Background"
                        value={design.backdrop}
                        onChange={(backdrop) => set({ backdrop })}
                        options={[
                          { id: 'blur', label: 'Blurred photo' },
                          { id: 'color', label: 'Colour' },
                        ]}
                      />
                    </Field>
                  )}
                  {design.fit === 'fit' && design.backdrop === 'color' && (
                    <SwatchPicker label="Background colour" value={design.backdropColor} onChange={(backdropColor) => set({ backdropColor })} />
                  )}
                  <label className="flex items-center gap-3 text-[13px] font-medium text-[#545454]">
                    Zoom
                    <input type="range" min={1} max={2.5} step={0.01} value={design.zoom} onChange={(e) => set({ zoom: Number(e.target.value) })} className="flex-1 accent-[#121212]" />
                  </label>
                  <button type="button" onClick={() => set({ focusX: 0.5, focusY: 0.5, zoom: 1 })} className={lightButton}>
                    Reset position
                  </button>
                  <p className="flex items-start gap-2 text-[13px] leading-[19px] text-[#8a8a8a]">
                    <Move className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Drag an empty part of the photo to choose what stays in frame{ext[size.id] ? ' (not for extended sizes)' : ''}.
                  </p>
                </div>

                {/* Logo */}
                <div className={panel('logo')} role="tabpanel" aria-label="Logo">
                  <input
                    ref={logoRef}
                    type="file"
                    accept={IMAGE_TYPES.join(',')}
                    className="hidden"
                    onChange={(e) => {
                      pick(e.target.files?.[0], 'logo');
                      e.target.value = '';
                    }}
                  />
                  {logo ? (
                    <>
                      <p className="flex items-start gap-2 rounded-xl bg-[#f7f7f7] p-3 text-[13px] leading-[19px] text-[#545454]">
                        <Move className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Drag your logo anywhere on the ad. Select it to resize or delete it.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => logoRef.current?.click()} className={lightButton}>
                          Change logo
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLogo(null);
                            setLayers((ls) => ls.filter((l) => l.type !== 'logo'));
                          }}
                          className={lightButton}
                        >
                          Remove logo
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => logoRef.current?.click()}
                        className="flex h-[96px] w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#dcdcdc] bg-[#fafafa] text-[14px] font-medium text-[#121212] hover:border-[#9a9a9a]"
                      >
                        <Stamp className="h-5 w-5" /> Add your logo
                      </button>
                      <p className="text-[13px] leading-[19px] text-[#8a8a8a]">A PNG with a transparent background looks best. You can drag it anywhere.</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="order-1 flex min-w-0 flex-1 flex-col bg-[#eef0f3] lg:order-none">
              <div className="relative z-20 px-4 pt-3">
                {selectedLayer ? (
                  <LayerToolbar
                    key={selectedLayer.id}
                    layer={selectedLayer}
                    update={(patch) => updateLayer(selectedLayer.id, patch)}
                    remove={removeSelected}
                    duplicate={() => {
                      const r = view.rects.find((x) => x.id === selectedLayer.id);
                      const H = Math.round(size.h * (PREVIEW_SIDE / Math.max(size.w, size.h)));
                      const copy: Layer = {
                        ...selectedLayer,
                        id: uid(),
                        role: undefined,
                        free: undefined,
                        ...(selectedLayer.anchor === 'image'
                          ? { x: selectedLayer.x + 0.03, y: selectedLayer.y + 0.03 }
                          : { x: r ? r.x / view.canvasW + 0.03 : 0.1, y: r ? r.y / H + 0.03 : 0.1 }),
                      };
                      setLayers((ls) => [...ls, copy]);
                      setSelected(copy.id);
                    }}
                  />
                ) : (
                  <AllTextToolbar design={design} restyle={restyle} recolor={recolor} set={set} />
                )}
              </div>
              <div className="flex min-h-[460px] flex-1 px-3 pb-3 pt-3 sm:min-h-[480px] sm:px-4 lg:min-h-0">
                <div
                  ref={stageRef}
                  className="relative flex min-h-0 flex-1 items-center justify-center"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDropping(true);
                  }}
                  onDragLeave={() => setDropping(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDropping(false);
                    pick(e.dataTransfer.files?.[0], 'image');
                  }}
                >
                  {img ? (
                    // Keyed by size, so the canvas settles in each time a new size is picked.
                    <div
                      key={sizeId}
                      className={`editor-anim absolute inset-0 m-auto animate-[editorCanvasIn_0.4s_ease-out] leading-[0] ${shown ? '' : 'invisible'}`}
                      style={shown}
                    >
                      <canvas
                        ref={previewRef}
                        onPointerDown={onCanvasDown}
                        onPointerMove={onCanvasMove}
                        onPointerUp={onCanvasUp}
                        onPointerCancel={onCanvasUp}
                        aria-label={`Preview of your ${size.name} ad`}
                        style={shown}
                        className={`block touch-none rounded-[2px] bg-white shadow-[0_2px_6px_rgba(16,24,40,0.08),0_24px_50px_-16px_rgba(16,24,40,0.35)] ${
                          panning ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                      />
                      {story && (
                        // The areas the Stories/Reels app covers, outlined so people keep text out of them.
                        <div aria-hidden className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-x-0 top-0 h-[14%] border-b border-dashed border-[#7c5cf0]/60 bg-[#7c5cf0]/[0.04]">
                            {/* Labels sit in the grey space beside the ad, next to their band, so they never cover the design. */}
                            <span className="absolute bottom-0 left-full ml-2 translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[11px] font-medium leading-[15px] text-[#5b3fd6] shadow-sm ring-1 ring-[#e3defa]">
                              ↑ Covered by app buttons
                            </span>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 h-[20%] border-t border-dashed border-[#7c5cf0]/60 bg-[#7c5cf0]/[0.04]">
                            <span className="absolute left-full top-0 ml-2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[11px] font-medium leading-[15px] text-[#5b3fd6] shadow-sm ring-1 ring-[#e3defa]">
                              ↓ Covered by caption &amp; buttons
                            </span>
                          </div>
                        </div>
                      )}

                      {fitting[size.id] && !ext[size.id] && (
                        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/75 text-center leading-normal backdrop-blur-[2px]">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7c5cf0,#3b82f6)] text-white">
                            <Loader2 className="h-5 w-5 animate-spin" />
                          </span>
                          <p className="px-4 text-[14px] font-medium text-[#121212]">Fitting your ad to {size.name}…</p>
                          <p className="px-4 text-[12px] text-[#6b6b6b]">AI is extending its background. About 25 seconds.</p>
                        </div>
                      )}

                      {/* Click targets for every layer and the auto layout: select, drag, double-click to type. */}
                      {cssScale > 0 &&
                        view.rects.map((r) =>
                          r.id === editing ? null : (
                            <div
                              key={r.id}
                              role="button"
                              tabIndex={-1}
                              aria-label={layers.find((l) => l.id === r.id)?.text || 'Logo'}
                              onPointerDown={(e) => onLayerDown(e, r)}
                              onPointerMove={onLayerMove}
                              onPointerUp={onLayerUp}
                              onPointerCancel={onLayerUp}
                              onDoubleClick={() => onLayerDouble(r.id)}
                              className={`group/layer absolute cursor-move touch-none rounded-[3px] transition-[outline-color] ${
                                selected === r.id
                                  ? 'outline outline-2 outline-offset-2 outline-[#7c5cf0]'
                                  : 'outline outline-1 outline-offset-2 outline-transparent hover:outline-[#7c5cf0]/70'
                              }`}
                              style={{ left: r.x * cssScale, top: r.y * cssScale, width: r.w * cssScale, height: r.h * cssScale }}
                            >
                              {selected === r.id && layers.find((l) => l.id === r.id)?.type !== 'logo' && (
                                <span className="pointer-events-none absolute -top-8 left-0 whitespace-nowrap rounded-md bg-[#7c5cf0] px-2 py-1 text-[12px] font-medium leading-[16px] text-white">
                                  {touch ? 'Double-tap to edit' : 'Double-click to edit'}
                                </span>
                              )}
                              {/* Corner handles: drag out to enlarge, in to shrink. */}
                              {selected === r.id &&
                                CORNERS.map((c) => (
                                  <span
                                    key={c.id}
                                    role="presentation"
                                    onPointerDown={(e) => onHandleDown(e, c.id, r)}
                                    onPointerMove={onHandleMove}
                                    onPointerUp={onHandleUp}
                                    onPointerCancel={onHandleUp}
                                    className={`absolute z-10 h-[14px] w-[14px] touch-none rounded-[4px] border-2 border-[#7c5cf0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform hover:scale-125 ${c.className}`}
                                  />
                                ))}
                            </div>
                          )
                        )}

                      {/* "Rewrite with AI": a chip on the selected text, opening a small popup beside it. */}
                      {selectedLayer && selectedLayer.type !== 'logo' && !editing && selectedRect && cssScale > 0 && shown && (() => {
                        const s = cssScale;
                        const r = selectedRect;
                        const roomRight = shown.width - (r.x + r.w) * s > 170;
                        const besideTop = Math.max(0, Math.min(r.y * s - 8, shown.height - 330));
                        if (rewrite.open) return popupBeside ? rewritePopup({ left: shown.width + 16, top: besideTop }) : null;
                        return (
                          <button
                            type="button"
                            disabled={!ready}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => setRewrite({ ...REWRITE_IDLE, open: true })}
                            className="absolute z-20 inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-[linear-gradient(135deg,#7c5cf0,#3b82f6)] px-3.5 text-[14px] font-medium leading-none text-white shadow-[0_10px_24px_-8px_rgba(91,63,214,0.75)] transition-transform hover:scale-105 disabled:opacity-60"
                            style={roomRight ? { left: (r.x + r.w) * s + 8, top: r.y * s } : { left: r.x * s, top: (r.y + r.h) * s + 8 }}
                          >
                            <Sparkles className="h-4 w-4" /> Rewrite with AI
                          </button>
                        );
                      })()}

                      {/* Typing on the ad: a transparent text box in the same place, font and colour. */}
                      {editingLayer && editingRect && cssScale > 0 && (() => {
                        const fs = editingRect.fs * cssScale;
                        const common = {
                          autoFocus: true,
                          value: editingLayer.text,
                          onBlur: finishEditing,
                          onFocus: (e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => e.currentTarget.select(),
                          onKeyDown: (e: { key: string; currentTarget: HTMLElement }) => e.key === 'Escape' && e.currentTarget.blur(),
                          'aria-label': 'Edit text',
                        };
                        return editingLayer.type === 'button' ? (
                          <input
                            {...common}
                            onChange={(e) => updateLayer(editingLayer.id, { text: e.target.value })}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === 'Escape') && e.currentTarget.blur()}
                            maxLength={30}
                            className="absolute rounded-full text-center outline outline-2 outline-offset-2 outline-[#7c5cf0]"
                            style={{
                              left: editingRect.x * cssScale,
                              top: editingRect.y * cssScale,
                              height: editingRect.h * cssScale,
                              width: Math.max(editingRect.w * cssScale, fs * 4),
                              fontSize: fs,
                              fontWeight: editingLayer.weight,
                              fontFamily: editingLayer.serif ? serifFont : font,
                              backgroundColor: editingLayer.color,
                              color: contrastOn(editingLayer.color),
                            }}
                          />
                        ) : (
                          <textarea
                            {...common}
                            onChange={(e) => updateLayer(editingLayer.id, { text: e.target.value })}
                            maxLength={200}
                            rows={Math.max(1, Math.round(editingRect.h / (editingRect.fs * LAYER_LINE)))}
                            className="absolute resize-none overflow-hidden bg-black/10 p-0 outline outline-2 outline-offset-2 outline-[#7c5cf0]"
                            style={{
                              left: editingRect.x * cssScale,
                              top: editingRect.y * cssScale,
                              width: editingRect.w * cssScale,
                              minHeight: editingRect.h * cssScale,
                              fontSize: fs,
                              lineHeight: LAYER_LINE,
                              fontWeight: editingLayer.weight,
                              fontFamily: editingLayer.serif ? serifFont : font,
                              color: editingLayer.color,
                              textAlign: editingLayer.align,
                            }}
                          />
                        );
                      })()}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className={`flex h-full max-h-[420px] w-full max-w-[460px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 text-center transition-colors ${
                        dropping ? 'border-[#7c5cf0] bg-[#f3f0ff]' : 'border-[#c9ccd3] bg-white/70 hover:border-[#7c5cf0] hover:bg-white'
                      }`}
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#121212] text-white">
                        <ImagePlus className="h-6 w-6" strokeWidth={1.8} />
                      </span>
                      <span className="text-[18px] font-medium text-[#121212]">Upload your image</span>
                      <span className="max-w-[300px] text-[14px] leading-[21px] text-[#6b6b6b]">
                        A product photo or a finished ad. Drag it here or click to choose. JPG, PNG or WebP.
                      </span>
                    </button>
                  )}
                </div>
              </div>
              {/* Every size at once, like pages; click one to edit it. */}
              <div className={`border-t border-[#e2e4e8] bg-white/60 px-4 py-1 ${img ? '' : 'hidden'}`}>
                {/* Inner padding: a sideways-scrolling row also clips vertically, which cut off the selected card's outline and the hover lift. */}
                <div className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {AD_SIZES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSizeId(s.id);
                        setEditing(null);
                      }}
                      aria-pressed={s.id === sizeId}
                      className={`flex w-[104px] shrink-0 flex-col items-center gap-0.5 rounded-xl p-1.5 text-center transition-all duration-200 ${
                        s.id === sizeId ? 'bg-white shadow-[0_0_0_2px_#121212]' : 'hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_18px_-10px_rgba(16,24,40,0.4)]'
                      }`}
                    >
                      <span className="flex h-[40px] w-full items-center justify-center">
                        <canvas
                          ref={(c) => {
                            thumbRefs.current[s.id] = c;
                          }}
                          className="h-auto max-h-full w-auto max-w-full rounded-[3px] shadow-[0_1px_3px_rgba(16,24,40,0.2)]"
                        />
                      </span>
                      <span className="whitespace-nowrap text-[12px] font-medium leading-tight text-[#121212]">{s.name}</span>
                      <span className="flex items-center gap-1 text-[11px] text-[#9a9a9a]">
                        {fitting[s.id] && !ext[s.id] && <Loader2 className="h-3 w-3 animate-spin text-[#7c5cf0]" aria-label="Fitting" />}
                        {ext[s.id] && <Sparkles className="h-3 w-3 text-[#7c5cf0]" aria-label="Extended background" />}
                        {s.ratio}
                      </span>
                    </button>
                  ))}
                </div>
                {story && <p className="mt-1 text-[12px] text-[#8a8a8a]">The marked bands are covered by Instagram&rsquo;s buttons and caption in Stories and Reels; keep text out of them.</p>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confirmation after a download or an AI edit */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease }}
            className="fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#121212] px-5 py-3 text-[14px] font-medium text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00b86b]">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* After a download: one well-timed invite to turn the ad into a UGC video. */}
      <AnimatePresence>
        {studioNudge && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease }}
            className="fixed bottom-20 left-1/2 z-[90] w-[calc(100vw-32px)] max-w-[380px] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-[0_24px_60px_-18px_rgba(16,24,40,0.45)] ring-1 ring-[#e6e6e6] sm:left-auto sm:right-6 sm:translate-x-0"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setStudioNudge(false)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg text-[#8a8a8a] hover:bg-[#f3f3f3] hover:text-[#121212]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-start gap-3 pr-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#121212] text-white">
                <Clapperboard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[15px] font-medium text-[#121212]">Want a UGC video version?</p>
                <p className="mt-0.5 text-[13px] leading-[19px] text-[#6b6b6b]">Turn this ad into a scroll-stopping UGC video with HypeOn Studio.</p>
              </div>
            </div>
            <a
              href={STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackTool('free_tool_cta', { tool: 'creative-editor', cta: 'ugc-video-editor', place: 'after-download' });
                setStudioNudge(false);
              }}
              className={`${submitClass} mt-3 h-[44px] w-full text-[14px]`}
            >
              <Clapperboard className="h-4 w-4" /> Open UGC Video Editor
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <GuideModal open={guide} onClose={closeGuide} onUpload={() => fileRef.current?.click()} />
    </section>
  );
}
