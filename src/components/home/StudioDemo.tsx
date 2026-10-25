'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Clapperboard, Image as ImageIcon, Link2, Palette, Video, Wand2 } from 'lucide-react';
import { SiGoogle, SiMeta, SiTiktok } from 'react-icons/si';
import { Accent } from './ui';

/*
 * HypeOn Studio demo, in the same dark "camera tour" language as the workflow
 * canvas and the Ad Intelligence demo: brief → brand kit → creatives → launch.
 * Board is drawn in px and scaled to the frame's width.
 */

const FRAME = { w: 1000, h: 563 };
const WORLD = { w: 1700, h: 1000 };

type Scene = {
  cx: number;
  cy: number;
  zoom: number;
  ms: number;
  caption?: { a: string; b: string; side: 'left' | 'right' };
};

const SCENES: Scene[] = [
  { cx: 850, cy: 500, zoom: 0.56, ms: 2600 },
  { cx: 575, cy: 470, zoom: 1.0, ms: 3800, caption: { a: 'Drop', b: 'a product link', side: 'right' } },
  { cx: 1120, cy: 330, zoom: 0.95, ms: 3600 },
  { cx: 1160, cy: 770, zoom: 1.05, ms: 3800, caption: { a: 'Launch', b: 'everywhere', side: 'left' } },
];

/* panels, in world px */
const P = {
  brief: { x: 90, y: 300, w: 520, h: 170 },
  brand: { x: 90, y: 540, w: 520, h: 190 },
  creatives: { x: 690, y: 110, w: 900, h: 440 },
  launch: { x: 1130, y: 640, w: 460, h: 260 },
};

const LINK = 'yourbrand.com/products/vitamin-c-serum';

const CREATIVES = [
  { src: '/carousel/eb2fa64fe309fd83.png', kind: 'Static' },
  { src: encodeURI('/ugc video/posters/1_Product_in_hand.jpg'), kind: 'UGC' },
  { src: '/carousel/2861c283c6fe149b.png', kind: 'Static' },
  { src: encodeURI('/ugc video/posters/4_Unboxing.jpg'), kind: 'UGC' },
  { src: '/carousel/9bb51c2e32b350f8.png', kind: 'Static' },
  { src: encodeURI('/ugc video/posters/5_Before_and_after.jpg'), kind: 'Video' },
];

const SWATCHES = ['#121212', '#f5f3ef', '#e66245', '#00da7f'];

const CHANNELS = [
  { Icon: SiMeta, name: 'Meta' },
  { Icon: SiTiktok, name: 'TikTok' },
  { Icon: SiGoogle, name: 'Google' },
];

const mid = (p: typeof P.brief) => ({ l: p.x, r: p.x + p.w, cy: p.y + p.h / 2, cx: p.x + p.w / 2, b: p.y + p.h, t: p.y });
const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = (x2 - x1) / 2;
  return `M${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};
const LINKS = [
  curve(mid(P.brief).r, mid(P.brief).cy, mid(P.creatives).l, mid(P.creatives).cy),
  `M${mid(P.brief).cx} ${mid(P.brief).b} L ${mid(P.brand).cx} ${mid(P.brand).t}`,
  curve(mid(P.brand).r, mid(P.brand).cy, mid(P.creatives).l, mid(P.creatives).cy + 120),
  `M${mid(P.launch).cx} ${mid(P.creatives).b} L ${mid(P.launch).cx} ${mid(P.launch).t}`,
];

function Panel({ p, label, glow, children }: { p: typeof P.brief; label: string; glow?: boolean; children: React.ReactNode }) {
  return (
    <div className="absolute" style={{ left: p.x, top: p.y, width: p.w, height: p.h }}>
      <p className="absolute -top-7 left-1 text-[14px] text-white/45">{label}</p>
      <div
        className={`h-full w-full overflow-hidden rounded-[22px] border bg-[linear-gradient(160deg,#202020,#0d0d0d_65%)] transition-[border-color,box-shadow] duration-700 ${
          glow ? 'border-white/50 shadow-[0_0_34px_rgba(255,255,255,0.14)]' : 'border-white/[0.12]'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Typed({ text, play }: { text: string; play: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!play) {
      setN(0);
      return;
    }
    let t: number;
    const step = (c: number) => {
      if (c > text.length) return;
      setN(c);
      t = window.setTimeout(() => step(c + 1), 22 + ((c * 37) % 26));
    };
    t = window.setTimeout(() => step(1), 700);
    return () => window.clearTimeout(t);
  }, [play, text]);
  return (
    <>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block h-[20px] w-[2px] translate-y-[4px] animate-pulse bg-white" />
    </>
  );
}

export default function StudioDemo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? 3 : 0);
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
  // each panel fills once the camera reaches it, and stays filled until the loop restarts
  const briefing = i >= 1;
  const creating = i >= 2;
  const launching = i >= 3;
  const camera = { scale: s.zoom, x: FRAME.w / 2 - s.cx * s.zoom, y: FRAME.h / 2 - s.cy * s.zoom };

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-[#0b0b0b]">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: FRAME.w, height: FRAME.h, transform: `scale(${k})` }}>
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

          {/* brief */}
          <Panel p={P.brief} label="Brief" glow={i === 1}>
            <div className="flex h-full flex-col justify-center gap-4 px-7">
              <p className="flex items-center gap-2 text-[15px] text-white/60">
                <Wand2 className="h-4 w-4 text-white" />
                What are we making today?
              </p>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5">
                <Link2 className="h-5 w-5 shrink-0 text-white/50" />
                <p className="flex-1 truncate text-[18px] text-white">
                  <Typed text={LINK} play={briefing} />
                </p>
              </div>
            </div>
          </Panel>

          {/* brand kit */}
          <Panel p={P.brand} label="Brand kit" glow={i === 1}>
            <div className="grid h-full grid-cols-3 gap-5 p-6">
              <div>
                <p className="flex items-center gap-1.5 text-[13px] text-white/45">
                  <Palette className="h-3.5 w-3.5" />
                  Colours
                </p>
                <div className="mt-3 flex gap-2">
                  {SWATCHES.map((c, n) => (
                    <motion.span
                      key={c}
                      initial={false}
                      animate={briefing ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0.15 }}
                      transition={{ delay: briefing ? 1.9 + n * 0.12 : 0, duration: 0.35 }}
                      className="h-9 w-9 rounded-full ring-1 ring-white/20"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
              <motion.div
                initial={false}
                animate={briefing ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 6 }}
                transition={{ delay: briefing ? 2.4 : 0, duration: 0.4 }}
              >
                <p className="text-[13px] text-white/45">Font</p>
                <p className="mt-2 text-[40px] leading-none text-white">
                  <Accent>Aa</Accent>
                </p>
              </motion.div>
              <motion.div
                initial={false}
                animate={briefing ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 6 }}
                transition={{ delay: briefing ? 2.7 : 0, duration: 0.4 }}
              >
                <p className="text-[13px] text-white/45">Logo</p>
                <span className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[18px] font-semibold text-[#0b0b0b]">
                  Y
                </span>
              </motion.div>
            </div>
          </Panel>

          {/* creatives */}
          <Panel p={P.creatives} label="Creatives · generated from your brief" glow={i === 2}>
            <div className="grid h-full grid-cols-6 gap-3 p-5">
              {CREATIVES.map((c, n) => {
                const KindIcon = c.kind === 'Static' ? ImageIcon : c.kind === 'UGC' ? Clapperboard : Video;
                return (
                  <motion.div
                    key={c.src}
                    initial={false}
                    animate={creating ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0.1, y: 14, scale: 0.96, filter: 'blur(6px)' }}
                    transition={{ delay: creating ? 0.35 + n * 0.14 : 0, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161616]"
                  >
                    <div className="relative flex-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-2">
                      <span className="inline-flex items-center gap-1 text-[12px] text-white/60">
                        <KindIcon className="h-3.5 w-3.5" />
                        {c.kind}
                      </span>
                      <span className="rounded-full bg-[rgba(0,218,127,0.12)] px-1.5 py-0.5 text-[11px] text-[#00da7f]">Ready</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Panel>

          {/* launch */}
          <Panel p={P.launch} label="Launch" glow={i === 3}>
            <div className="flex h-full flex-col justify-center gap-4 p-6">
              {CHANNELS.map(({ Icon, name }, n) => (
                <div key={name} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <span className="flex-1 text-[18px] text-white">{name}</span>
                  {/* toggle flips on, one channel after another */}
                  <span className={`relative h-7 w-12 rounded-full transition-colors duration-500 ${launching ? 'bg-[#00da7f]' : 'bg-white/15'}`} style={{ transitionDelay: launching ? `${0.6 + n * 0.45}s` : '0s' }}>
                    <motion.span
                      className="absolute top-1 h-5 w-5 rounded-full bg-white"
                      initial={false}
                      animate={{ left: launching ? 24 : 4 }}
                      transition={{ delay: launching ? 0.6 + n * 0.45 : 0, duration: 0.3 }}
                    />
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ opacity: launching ? 1 : 0 }}
                    transition={{ delay: launching ? 0.8 + n * 0.45 : 0, duration: 0.3 }}
                    className="w-10 text-[13px] text-[#00da7f]"
                  >
                    Live
                  </motion.span>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>

        {/* caption scrim + caption, on the frame */}
        <AnimatePresence>
          {s.caption && (
            <motion.div
              key={`scrim-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`pointer-events-none absolute inset-y-0 z-20 w-[50%] ${
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
              key={`cap-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className={`pointer-events-none absolute top-1/2 z-30 -translate-y-1/2 text-[54px] leading-[1.02] text-white ${
                s.caption.side === 'left' ? 'left-12' : 'right-12 text-right'
              }`}
            >
              <Accent>{s.caption.a}</Accent>
              <br />
              <span className="text-white/45">{s.caption.b}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
