'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUp, BarChart3, Flame, Search, Sparkles, TrendingUp } from 'lucide-react';
import { Accent } from './ui';

/*
 * Ad Intelligence demo, in the same dark "camera tour" language as the workflow
 * canvas: a dotted board of panels joined by flowing connectors, a camera that
 * zooms and pans between them, and serif captions. Each panel animates when the
 * camera arrives. Board is drawn in px and scaled to the frame's width.
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
  { cx: 505, cy: 430, zoom: 1.1, ms: 3600, caption: { a: 'Ask', b: 'anything', side: 'right' } },
  { cx: 1170, cy: 330, zoom: 0.95, ms: 3600 },
  { cx: 1250, cy: 765, zoom: 1.15, ms: 3800, caption: { a: 'Decode', b: 'the market', side: 'left' } },
];

/* panels, in world px */
const P = {
  ask: { x: 90, y: 330, w: 560, h: 200 },
  results: { x: 720, y: 110, w: 900, h: 440 },
  answer: { x: 720, y: 610, w: 420, h: 300 },
  insights: { x: 1180, y: 610, w: 440, h: 300 },
};

const QUESTION = 'Which skincare ads are scaling right now?';

const ADS = [
  { poster: '/carousel/posters/50b18d1681e20f36.jpg', score: 96, format: 'UGC' },
  { poster: '/carousel/posters/b22cdc25095d2d23.jpg', score: 93, format: 'Unboxing' },
  { poster: '/carousel/posters/9c0fb217f53a41d2.jpg', score: 91, format: 'UGC' },
  { poster: '/carousel/posters/23f0d4105b094537.jpg', score: 89, format: 'Video' },
  { poster: '/carousel/posters/51ebaa4623434df4.jpg', score: 87, format: 'Podcast' },
  { poster: '/carousel/posters/452d34244c08eaee.jpg', score: 85, format: 'Review' },
];

const ANSWER = [
  'Creator-led UGC wins: 4 of the top 6 ads.',
  'Skin close-up hooks hold viewers 2× longer.',
  'Every ad running 30+ days is under 20s.',
  'Brief: unboxing hook, product in hand.',
];

const FORMATS = [
  { label: 'UGC', pct: 54 },
  { label: 'Video', pct: 27 },
  { label: 'Static', pct: 19 },
];

const mid = (p: typeof P.ask) => ({ l: p.x, r: p.x + p.w, t: p.y, b: p.y + p.h, cx: p.x + p.w / 2, cy: p.y + p.h / 2 });
const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = (x2 - x1) / 2;
  return `M${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};
const LINKS = [
  curve(mid(P.ask).r, mid(P.ask).cy, mid(P.results).l, mid(P.results).cy),
  curve(mid(P.ask).r, mid(P.ask).cy, mid(P.answer).l, mid(P.answer).cy),
  `M${mid(P.answer).r} ${mid(P.answer).cy} L ${mid(P.insights).l} ${mid(P.insights).cy}`,
];

function Panel({ p, label, glow, children }: { p: typeof P.ask; label: string; glow?: boolean; children: React.ReactNode }) {
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
      <span className="absolute -left-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#3a3a3a] ring-1 ring-white/25" />
      <span className="absolute -right-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#3a3a3a] ring-1 ring-white/25" />
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
      t = window.setTimeout(() => step(c + 1), text[c - 1] === ' ' ? 85 : 26 + ((c * 37) % 28));
    };
    t = window.setTimeout(() => step(1), 700);
    return () => window.clearTimeout(t);
  }, [play, text]);
  return (
    <>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block h-[22px] w-[2px] translate-y-[4px] animate-pulse bg-white" />
    </>
  );
}

function CountUp({ to, play }: { to: number; play: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!play) {
      setV(0);
      return;
    }
    const c = animate(0, to, { duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [to, play]);
  return <>{v.toLocaleString('en-US')}</>;
}

export default function AdIntelDemo() {
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
  // each panel "fires" once the camera has reached it, and stays filled for the rest of the loop
  const asking = i >= 1;
  const results = i >= 2;
  const insights = i >= 3;
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

          {/* ask */}
          <Panel p={P.ask} label="Prompt" glow={i === 1}>
            <div className="flex h-full flex-col justify-center gap-4 px-7">
              <p className="flex items-center gap-2 text-[15px] text-white/60">
                <Sparkles className="h-4 w-4 text-white" />
                Your AI-powered ad insights
              </p>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5">
                <Search className="h-5 w-5 shrink-0 text-white/50" />
                <p className="flex-1 text-[20px] text-white">
                  <Typed text={QUESTION} play={asking} />
                </p>
                <motion.span
                  animate={asking ? { scale: [1, 1, 1.18, 1] } : { scale: 1 }}
                  transition={{ duration: 3.2, times: [0, 0.78, 0.86, 1] }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b0b0b]"
                >
                  <ArrowUp className="h-5 w-5" />
                </motion.span>
              </div>
            </div>
          </Panel>

          {/* results */}
          <Panel p={P.results} label="Top scaling ads · Skincare · last 30 days" glow={i === 2}>
            <div className="grid h-full grid-cols-6 gap-3 p-5">
              {ADS.map((ad, n) => (
                <motion.div
                  key={ad.poster}
                  initial={false}
                  animate={results ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.12, y: 14, scale: 0.96 }}
                  transition={{ delay: results ? 0.35 + n * 0.12 : 0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161616]"
                >
                  <div className="relative flex-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ad.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[13px] font-semibold text-white backdrop-blur">
                      <Flame className="h-3.5 w-3.5 text-orange-400" />
                      {ad.score}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-2">
                    <span className="text-[12px] text-white/60">{ad.format}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(0,218,127,0.12)] px-1.5 py-0.5 text-[11px] text-[#00da7f]">
                      <TrendingUp className="h-3 w-3" />
                      Scaling
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Panel>

          {/* answer */}
          <Panel p={P.answer} label="HypeOn Intelligence" glow={i === 3}>
            <ul className="space-y-4 p-6">
              {ANSWER.map((line, n) => (
                <motion.li
                  key={line}
                  initial={false}
                  animate={results ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0.15, x: -6, filter: 'blur(3px)' }}
                  transition={{ delay: results ? 1 + n * 0.45 : 0, duration: 0.45 }}
                  className="flex gap-3 text-[17px] leading-snug text-white"
                >
                  <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#00da7f]" />
                  {line}
                </motion.li>
              ))}
            </ul>
          </Panel>

          {/* insights */}
          <Panel p={P.insights} label="Market insights" glow={i === 3}>
            <div className="flex h-full flex-col p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[13px] text-white/45">Active ads</p>
                  <p className="text-[34px] font-medium tracking-tight text-white">
                    <CountUp to={1204} play={insights} />
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-white/45">Scaling now</p>
                  <p className="text-[34px] font-medium tracking-tight text-[#00da7f]">
                    <CountUp to={186} play={insights} />
                  </p>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-[13px] text-white/45">
                <BarChart3 className="h-3.5 w-3.5" />
                Spend by format
              </p>
              <div className="mt-2 space-y-2.5">
                {FORMATS.map((f, n) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <span className="w-12 text-[13px] text-white/70">{f.label}</span>
                    <div className="h-2.5 flex-1 rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-white"
                        initial={false}
                        animate={{ width: insights ? `${f.pct}%` : '0%' }}
                        transition={{ delay: insights ? 0.7 + n * 0.15 : 0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="w-9 text-right text-[13px] text-white/70">{f.pct}%</span>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 380 50" className="mt-auto h-[50px] w-full overflow-visible">
                <motion.path
                  d="M0 44 C 40 42, 60 36, 95 34 S 160 26, 190 22 S 250 18, 285 11 S 345 5, 380 3"
                  fill="none"
                  stroke="#00da7f"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: insights ? 1 : 0 }}
                  transition={{ delay: insights ? 1.2 : 0, duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>
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
