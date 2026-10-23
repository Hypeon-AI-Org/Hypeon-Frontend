'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Flame, MousePointer2, ScanSearch, Sparkles } from 'lucide-react';
import LazyVideo from '@/components/LazyVideo';
import { Accent } from './ui';

/*
 * A looping "camera tour" over a node canvas: a title card, the whole flow,
 * then zooms and pans onto single nodes with a caption over each. The canvas
 * ("world") is laid out in px on a 1400x800 board; the camera is a transform.
 */

const WORLD = { w: 1400, h: 800 };
const FRAME = { w: 880, h: 500 };

type Scene = {
  /** world point the camera centres on, and zoom */
  cx: number;
  cy: number;
  zoom: number;
  ms: number;
  caption?: { a: string; b: string; side: 'left' | 'right' };
  cursors?: boolean;
  title?: boolean;
};

const SCENES: Scene[] = [
  { cx: 700, cy: 400, zoom: 0.62, ms: 1800, title: true },
  { cx: 700, cy: 400, zoom: 0.62, ms: 2800 },
  { cx: 1340, cy: 350, zoom: 1.35, ms: 3000, caption: { a: 'Automate', b: 'every step', side: 'right' } },
  { cx: 330, cy: 360, zoom: 1.2, ms: 3200, caption: { a: 'Work', b: 'together', side: 'left' }, cursors: true },
  { cx: 820, cy: 290, zoom: 1.9, ms: 2800 },
];

/* nodes, in world px */
const N = {
  brief: { x: 120, y: 250, w: 200, h: 120 },
  creative: { x: 400, y: 200, w: 180, h: 300 },
  score: { x: 730, y: 190, w: 180, h: 180 },
  product: { x: 730, y: 450, w: 180, h: 180 },
  ad: { x: 1060, y: 180, w: 200, h: 340 },
};

const mid = (n: { x: number; y: number; w: number; h: number }) => ({ l: n.x, r: n.x + n.w, cy: n.y + n.h / 2 });
const link = (a: typeof N.brief, b: typeof N.brief) => {
  const A = mid(a);
  const B = mid(b);
  const dx = (B.l - A.r) / 2;
  return `M${A.r} ${A.cy} C ${A.r + dx} ${A.cy}, ${B.l - dx} ${B.cy}, ${B.l} ${B.cy}`;
};
const LINKS = [link(N.brief, N.creative), link(N.creative, N.score), link(N.creative, N.product), link(N.score, N.ad), link(N.product, N.ad)];

function NodeBox({
  n,
  label,
  glow = false,
  children,
}: {
  n: typeof N.brief;
  label: string;
  glow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute" style={{ left: n.x, top: n.y, width: n.w, height: n.h }}>
      <p className="absolute -top-6 left-0 text-[13px] text-white/45">{label}</p>
      <div
        className={`h-full w-full overflow-hidden rounded-[18px] border bg-[linear-gradient(160deg,#2a2a2a,#0c0c0c_70%)] ${
          glow ? 'border-white/60 shadow-[0_0_24px_rgba(255,255,255,0.18)]' : 'border-white/15'
        }`}
      >
        {children}
      </div>
      {/* connector handles */}
      <span className="absolute -left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#3a3a3a] ring-1 ring-white/20" />
      <span className="absolute -right-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#3a3a3a] ring-1 ring-white/20" />
    </div>
  );
}

function Cursor({ name, color, path }: { name: string; color: string; path: { x: number[]; y: number[] } }) {
  return (
    <motion.div
      className="absolute left-0 top-0 z-20 flex items-start gap-1"
      initial={{ x: path.x[0], y: path.y[0], opacity: 0 }}
      animate={{ x: path.x, y: path.y, opacity: 1 }}
      transition={{ duration: 3, ease: 'easeInOut', opacity: { duration: 0.3 } }}
    >
      <MousePointer2 className="h-6 w-6" style={{ color, fill: color }} />
      <span className="mt-4 rounded-md px-2 py-0.5 text-[12px] font-medium text-white" style={{ background: color }}>
        {name}
      </span>
    </motion.div>
  );
}

export default function WorkflowTour() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? 1 : 0);

  // The board is drawn at 880px wide and scaled to the frame's real width.
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / FRAME.w));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % SCENES.length), SCENES[i].ms);
    return () => window.clearTimeout(id);
  }, [i, inView, reduce]);

  const s = SCENES[i];
  // camera: put world point (cx, cy) at the frame centre, at `zoom`
  const camera = {
    scale: s.zoom,
    x: FRAME.w / 2 - s.cx * s.zoom,
    y: FRAME.h / 2 - s.cy * s.zoom,
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[880/500] w-full overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0b0b0b]"
    >
      <div className="absolute left-0 top-0 h-[500px] w-[880px] origin-top-left" style={{ transform: `scale(${k})` }}>
        <motion.div
          className="absolute left-0 top-0 origin-top-left [background-image:radial-gradient(rgba(255,255,255,0.1)_1.2px,transparent_1.2px)] [background-size:22px_22px]"
          style={{ width: WORLD.w, height: WORLD.h }}
          animate={camera}
          transition={{ duration: reduce ? 0 : 1.4, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg aria-hidden className="absolute inset-0" width={WORLD.w} height={WORLD.h}>
            {LINKS.map((d) => (
              <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="5 6" className="animate-[flow_2.4s_linear_infinite]" />
            ))}
          </svg>

          <NodeBox n={N.brief} label="Brief">
            <div className="space-y-2 p-4">
              <p className="text-[13px] leading-snug text-white/85">Unboxing hook, product in hand, upbeat voice-over.</p>
              <span className="block h-1.5 w-3/4 rounded-full bg-white/15" />
              <span className="block h-1.5 w-1/2 rounded-full bg-white/15" />
            </div>
          </NodeBox>

          <NodeBox n={N.creative} label="Winning creative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/carousel/posters/b22cdc25095d2d23.jpg" alt="" className="h-full w-full object-cover" />
          </NodeBox>

          <NodeBox n={N.score} label="Hype Score" glow={i === 4}>
            <div className="flex h-full flex-col items-center justify-center gap-1">
              <Flame className="h-7 w-7 text-orange-400" />
              <span className="text-[34px] font-medium text-white">94</span>
            </div>
          </NodeBox>

          <NodeBox n={N.product} label="Competitor ad">
            <div className="flex h-full items-center justify-center">
              <ScanSearch className="h-10 w-10 text-white/35" strokeWidth={1.4} />
            </div>
          </NodeBox>

          <NodeBox n={N.ad} label="Your ad" glow={i === 2}>
            <LazyVideo src="/carousel/df79c081631cc38a.mp4" poster="/carousel/posters/df79c081631cc38a.jpg" className="h-full w-full object-cover" />
          </NodeBox>

          {s.cursors && (
            <>
              <Cursor name="Maya" color="#e0399f" path={{ x: [560, 520, 590], y: [520, 430, 380] }} />
              <Cursor name="Rohan" color="#c026d3" path={{ x: [250, 300, 340], y: [430, 470, 400] }} />
            </>
          )}
        </motion.div>

        {/* captions sit on the frame, not the board, over a soft scrim */}
        <AnimatePresence>
          {s.caption && (
            <motion.div
              key={`scrim-${s.caption.side}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`pointer-events-none absolute inset-y-0 z-20 w-[55%] ${
                s.caption.side === 'left'
                  ? 'left-0 bg-[linear-gradient(90deg,#0b0b0b_35%,rgba(11,11,11,0))]'
                  : 'right-0 bg-[linear-gradient(270deg,#0b0b0b_35%,rgba(11,11,11,0))]'
              }`}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {s.caption && (
            <motion.p
              key={s.caption.a}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`pointer-events-none absolute top-1/2 z-30 -translate-y-1/2 text-[48px] leading-[1.05] text-white ${
                s.caption.side === 'left' ? 'left-12' : 'right-12 text-right'
              }`}
            >
              <Accent>{s.caption.a}</Accent>
              <br />
              <span className="text-white/45">{s.caption.b}</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* title card */}
        <AnimatePresence>
          {s.title && (
            <motion.div
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-[#0b0b0b]"
            >
              <span className="relative rounded-full border border-white/25 bg-[linear-gradient(#1f1f1f,#0a0a0a)] px-10 py-4 text-[34px] uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_-12px_rgba(255,255,255,0.25)]">
                <Accent>Workflow</Accent>
                <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-white/70" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
