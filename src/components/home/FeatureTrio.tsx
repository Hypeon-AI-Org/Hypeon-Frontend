'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Clapperboard, Flame, Image as ImageIcon, MousePointer2, Ratio, Search, Video } from 'lucide-react';
import { Accent, Container, H2 } from './ui';

/** Advances a looping step counter, but only while the card is on screen. */
function useLoop(steps: number, ms: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps), ms);
    return () => window.clearInterval(id);
  }, [inView, reduce, steps, ms]);
  return { ref, step };
}

/* ── 1. Find what's winning: a search that types, then scored results pop in ── */

const QUERIES = ['skincare', 'activewear', 'protein'];
const RESULTS = [
  { poster: '/carousel/posters/610e86c7e9808d60.jpg', score: 94 },
  { poster: '/carousel/posters/045e53458f4485d2.jpg', score: 88 },
  { poster: '/carousel/posters/23f0d4105b094537.jpg', score: 81 },
];

function SearchMock() {
  const { ref, step } = useLoop(QUERIES.length * 2, 1800);
  const query = QUERIES[Math.floor(step / 2)];
  const showResults = step % 2 === 1;
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-[#101010]">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 top-1 select-none text-[86px] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]"
      >
        Search
      </span>
      <div className="absolute inset-x-5 top-[38%] flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.08] px-3 text-[13px] text-white backdrop-blur-md">
        <Search className="h-3.5 w-3.5 text-white/60" />
        <AnimatePresence mode="wait">
          <motion.span
            key={query}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="whitespace-nowrap"
          >
            {query} ads
          </motion.span>
        </AnimatePresence>
        <span className="ml-auto rounded-md bg-white/10 px-1.5 py-0.5 text-[11px] text-white/70 md:text-[10px]">200M+ ads</span>
      </div>
      <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2">
        {RESULTS.map((r, i) => (
          <motion.div
            key={r.poster}
            initial={false}
            animate={showResults ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.45, delay: showResults ? i * 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-white/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
            <span className="absolute left-1 top-1 inline-flex items-center gap-0.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur md:text-[10px]">
              <Flame className="h-2.5 w-2.5 text-orange-400" />
              {r.score}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        aria-hidden
        animate={showResults ? { x: 150, y: 150 } : { x: 210, y: 92 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 text-white drop-shadow"
      >
        <MousePointer2 className="h-5 w-5 fill-white" />
      </motion.div>
    </div>
  );
}

/* ── 2. Shape your ad: a cursor hops between the creative actions ── */

const ACTIONS = [
  { label: 'Static', icon: ImageIcon },
  { label: 'Video', icon: Video },
  { label: 'UGC', icon: Clapperboard },
  { label: 'Resize', icon: Ratio },
];
// Cursor resting spots over each 2x2 button (percent of the card).
const CURSOR_SPOTS = [
  { left: '34%', top: '66%' },
  { left: '74%', top: '66%' },
  { left: '34%', top: '84%' },
  { left: '74%', top: '84%' },
];

function ShapeMock() {
  const { ref, step } = useLoop(ACTIONS.length, 1500);
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-[#101010]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={encodeURI('/ugc video/posters/1_Product_in_hand.jpg')}
        alt=""
        loading="lazy"
        className="absolute left-1/2 top-0 h-[78%] w-[62%] -translate-x-1/2 rounded-b-2xl object-cover opacity-90"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#101010] via-[#101010]/80 to-transparent" />
      <div className="absolute inset-x-6 bottom-5 grid grid-cols-2 gap-2">
        {ACTIONS.map((a, i) => {
          const Icon = a.icon;
          const active = i === step;
          return (
            <span
              key={a.label}
              className={`flex h-9 items-center justify-center gap-1.5 rounded-lg border text-[12px] font-medium transition-colors duration-300 ${
                active ? 'border-white/40 bg-white/20 text-white' : 'border-white/10 bg-white/[0.06] text-white/70'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {a.label}
            </span>
          );
        })}
      </div>
      <motion.div
        aria-hidden
        animate={CURSOR_SPOTS[step]}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute text-white drop-shadow"
      >
        <MousePointer2 className="h-5 w-5 fill-white" />
      </motion.div>
    </div>
  );
}

/* ── 3. Start from proven formats: a stack of format cards that rotates ── */

const FORMATS = ['Product in hand', 'Unboxing', 'Before & after', 'Podcast'];

function FormatsMock() {
  const { ref, step } = useLoop(FORMATS.length, 1700);
  // Back-to-front order, front card last; the stack cycles one card per step.
  const order = FORMATS.map((_, i) => FORMATS[(step + i) % FORMATS.length]).slice(0, 3).reverse();
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#8f8f8f] to-[#5f5f5f]">
      {order.map((label, depth) => {
        const fromFront = order.length - 1 - depth;
        return (
          <motion.div
            key={label}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, x: fromFront * 18, top: `${16 + depth * 24}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[8%] right-[-6%] h-[38%] rounded-xl border border-white/40 bg-white/25 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"
          >
            <Clapperboard className="h-4 w-4 text-white/80" />
            <p className="mt-2 text-lg font-medium leading-tight text-white">{label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

const CARDS = [
  {
    title: 'Find what’s winning',
    body: 'Search any brand or niche across 200M+ ads and see which creatives are actually scaling.',
    Mock: SearchMock,
  },
  {
    title: 'Shape your ad',
    body: 'Turn a winning angle into static, video or UGC ads, resized for every placement.',
    Mock: ShapeMock,
  },
  {
    title: 'Start from proven formats',
    body: 'Ready-made UGC templates built around the hooks performance marketers already trust.',
    Mock: FormatsMock,
  },
];

export default function FeatureTrio() {
  return (
    <section className="bg-[#ededed] pb-16 pt-8 md:py-20">
      <Container>
        <H2 className="text-black">
          Create better ads <Accent>with AI</Accent>
        </H2>
        <p className="mt-2 max-w-[800px] text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-black">
          Forget juggling spy tools, spreadsheets and agencies. HypeOn gives you everything you need to
          find, create and launch ads that win.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map(({ title, body, Mock }) => (
            <div key={title}>
              <div className="aspect-[317/320] overflow-hidden rounded-2xl">
                <Mock />
              </div>
              <h3 className="mt-4 text-[24px] font-normal leading-[32px] text-black md:text-[20px] md:leading-[30px]">
                <Accent>{title}</Accent>
              </h3>
              <p className="mt-2 text-[16px] font-light leading-6 text-black md:text-[14px] md:leading-[21px]">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
