'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Flame, Gem, Home as HomeIcon, Leaf, Smartphone, Sparkles, UtensilsCrossed } from 'lucide-react';
import LazyVideo from '@/components/LazyVideo';
import googleStartups from '../../../assets/Google_Startups.png';
import openAIBG from '../../../assets/OpenAI_BG.png';
import awsStartups from '../../../assets/AWS_STUPS.png';
import nvidia from '../../../assets/nvidia-logo.png';
import { Accent, Container, DarkButton, GradientFrame, GreenPill, H2 } from './ui';
import WorkflowTour from './WorkflowTour';

/* ── Ads by industry: tabbed, staggered columns of ad cards ── */

type Ad = { poster: string; video?: string; caption: string; format: string; score: number };
type Industry = { key: string; icon: typeof Gem; blurb: string; ads: Ad[] };

const p = (id: string) => `/carousel/posters/${id}.jpg`;

const INDUSTRIES: Industry[] = [
  {
    key: 'Beauty',
    icon: Sparkles,
    blurb: 'Serums, skincare & cosmetics',
    ads: [
      { poster: p('50b18d1681e20f36'), caption: 'Honest review: the routine that fixed my skin', format: 'UGC', score: 92 },
      { poster: '/hero/ind-vid/posters/beauty.jpg', video: '/hero/ind-vid/beauty.mp4', caption: 'POV: your skin after 14 days of this serum', format: 'Video', score: 95 },
      { poster: p('9c0fb217f53a41d2'), caption: 'Why I switched serums after five years', format: 'UGC', score: 87 },
      { poster: p('b22cdc25095d2d23'), caption: 'Unboxing the glow kit everyone is talking about', format: 'UGC', score: 90 },
    ],
  },
  {
    key: 'Wellness',
    icon: Leaf,
    blurb: 'Supplements & daily rituals',
    ads: [
      { poster: p('23f0d4105b094537'), caption: 'Why I swapped my morning coffee for this', format: 'UGC', score: 89 },
      { poster: '/hero/ind-vid/posters/wellness.jpg', video: '/hero/ind-vid/wellness.mp4', caption: 'One capsule. All-day energy. No crash.', format: 'Video', score: 93 },
      { poster: p('8933fd906cc15adb'), caption: 'At 55, this changed my energy levels', format: 'UGC', score: 84 },
      { poster: p('51ebaa4623434df4'), caption: 'I tried it for 30 days - honest review', format: 'UGC', score: 88 },
    ],
  },
  {
    key: 'Fashion',
    icon: Gem,
    blurb: 'Apparel, jewelry & accessories',
    ads: [
      { poster: p('3b8e3a66515db4d9'), caption: 'The bag that goes with literally everything', format: 'Video', score: 86 },
      { poster: '/hero/ind-vid/posters/fashion.jpg', video: '/hero/ind-vid/fashion.mp4', caption: 'The everyday necklace you never take off', format: 'Video', score: 94 },
      { poster: p('51d8e138f293c225'), caption: 'Get ready with me: a 5-minute outfit', format: 'UGC', score: 85 },
      { poster: p('452d34244c08eaee'), caption: 'Rating my new everyday staples', format: 'UGC', score: 90 },
    ],
  },
  {
    key: 'Food',
    icon: UtensilsCrossed,
    blurb: 'Snacks, drinks & meal kits',
    ads: [
      { poster: p('832a4ff8861195cd'), caption: 'Dinner in 10 minutes, restaurant-level', format: 'Static', score: 83 },
      { poster: '/hero/ind-vid/posters/food.jpg', video: '/hero/ind-vid/food.mp4', caption: 'Zero sugar. Still tastes like a treat.', format: 'Video', score: 92 },
      { poster: p('4eea476d13528502'), caption: 'Ordering this week’s groceries took 30 seconds', format: 'UGC', score: 88 },
      { poster: p('8fb3c5a47348d3aa'), caption: 'Weekend brunch, sorted', format: 'Static', score: 86 },
    ],
  },
  {
    key: 'Home',
    icon: HomeIcon,
    blurb: 'Decor, kitchen & living',
    ads: [
      { poster: p('045e53458f4485d2'), caption: 'Small change, completely different table', format: 'Static', score: 84 },
      { poster: '/hero/ind-vid/posters/home.jpg', video: '/hero/ind-vid/home.mp4', caption: 'The 60-second living room refresh', format: 'Video', score: 91 },
      { poster: p('5f272eed280c0c30'), caption: 'The sofa every guest asks about', format: 'Video', score: 87 },
      { poster: p('763d35e0dc0bfaa4'), caption: 'The kitchen detail people notice first', format: 'Static', score: 85 },
    ],
  },
  {
    key: 'Apps',
    icon: Smartphone,
    blurb: 'Mobile apps & SaaS',
    ads: [
      { poster: p('d1da89b3cf25b0f9'), caption: 'How I plan my whole week in 5 minutes', format: 'UGC', score: 88 },
      { poster: p('610e86c7e9808d60'), video: '/carousel/610e86c7e9808d60.mp4', caption: 'The app that replaced three subscriptions', format: 'Video', score: 93 },
      { poster: p('f733cbcf9fee94aa'), caption: 'Discover something new near you, tonight', format: 'Static', score: 86 },
      { poster: p('ff8b2d7e3c65b031'), caption: 'My desk setup for deep-work days', format: 'UGC', score: 89 },
    ],
  },
];

function AdCard({ ad, play }: { ad: Ad; play: boolean }) {
  return (
    <GradientFrame className="w-[248px] shrink-0" inner="p-3.5">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 text-[11px] font-bold text-white md:text-[10px]">
          H
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[11px] text-white/[0.32] md:text-[8px]">Sponsored</p>
          <p className="text-[12px] text-white">Made with HypeOn</p>
        </div>
        <GreenPill className="ml-auto !px-1.5 !py-px !text-[11px] md:!text-[8px]">
          Active <span className="h-1 w-1 rounded-full bg-[#00da7f]" />
        </GreenPill>
      </div>
      <p className="mt-2.5 line-clamp-2 text-[12px] leading-[18px] text-white">{ad.caption}</p>
      <div className="mt-2.5 aspect-[218/240] overflow-hidden rounded-lg bg-white/5">
        {play && ad.video ? (
          <LazyVideo src={ad.video} poster={ad.poster} className="h-full w-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ad.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-white/[0.32] md:text-[8px]">Hype Score</p>
          <p className="mt-0.5 flex items-center gap-1 text-[16px] text-white">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            {ad.score}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-white/[0.32] md:text-[8px]">Format</p>
          <p className="mt-0.5 text-[16px] text-white">{ad.format}</p>
        </div>
      </div>
    </GradientFrame>
  );
}

const TAB_MS = 2000; // auto-advance interval

function IndustryShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // bumped on a manual pick, so the timer and progress bar restart from that tab
  const [pick, setPick] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;

  // Beauty -> Wellness -> ... -> Apps -> Beauty, one step every TAB_MS while on screen.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % INDUSTRIES.length), TAB_MS);
    return () => window.clearTimeout(id);
  }, [active, running, pick]);

  // Slide the active tab to the middle of the row (scrolls the row only, never the page).
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab) return;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [active, reduce]);

  const industry = INDUSTRIES[active];
  // Five staggered columns, wider than the panel; the outer ones are cut by the side fades.
  const columns = [3, 1, 0, 2, 1].map((k) => [industry.ads[k], industry.ads[(k + 2) % industry.ads.length]]);
  return (
    <>
      <div className="mt-16 text-center md:mt-[100px]">
        <H2 className="text-white">
          Built for <Accent>fast-growing brands</Accent>
        </H2>
        <p className="mt-2 text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-white md:mt-0">
          D2C founders, e-commerce teams and performance agencies
        </p>
      </div>

      <div ref={rootRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative mt-10">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Industries"
        className="flex gap-4 overflow-x-auto px-[100px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {INDUSTRIES.map((ind, i) => {
          const Icon = ind.icon;
          const on = i === active;
          return (
            <button
              key={ind.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setActive(i);
                setPick((n) => n + 1);
              }}
              className={`relative shrink-0 overflow-hidden rounded-[17px] bg-[linear-gradient(170deg,rgba(255,255,255,0.06)_39%,rgba(255,255,255,0.18))] p-px text-left transition-opacity duration-200 ${
                on ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
            >
              <span className="flex h-[88px] items-center gap-3 rounded-2xl bg-black/20 bg-[linear-gradient(rgba(255,255,255,0.12)_15%,rgba(255,255,255,0.04)_65%)] px-5 md:w-[301px]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[16px] leading-6 text-white">{ind.key}</span>
                  <span className="block whitespace-nowrap text-[14px] leading-[21px] text-white/70">{ind.blurb}</span>
                </span>
              </span>
              {on && running && (
                <motion.span
                  key={`${active}-${pick}`}
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] bg-white/70"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: TAB_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          );
        })}
      </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[100px] bg-[linear-gradient(90deg,#121212_32%,rgba(18,18,18,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[100px] bg-[linear-gradient(270deg,#121212_32%,rgba(18,18,18,0))]" />
      </div>

      <div className="relative mt-12 h-[624px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121212]">
        <p className="pt-8 text-center text-[24px] leading-[32px] text-white/30 md:pt-10 md:text-[32px] md:leading-[38px]">{industry.key}</p>
        {/* centring lives on this wrapper; the motion child owns its own transform */}
        <div className="absolute left-1/2 top-[131px] -translate-x-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={industry.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-6"
          >
            {columns.map((col, c) => (
              <div key={c} className={`flex flex-col gap-6 ${c % 2 === 1 ? 'pt-0' : 'pt-3'}`}>
                {col.map((ad, k) => (
                  <AdCard key={`${ad.poster}-${k}`} ad={ad} play={c === 2 && k === 0} />
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
        {/* side and bottom fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[200px] bg-[linear-gradient(90deg,#121212_32%,rgba(18,18,18,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[200px] bg-[linear-gradient(270deg,#121212_32%,rgba(18,18,18,0))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#121212] to-transparent" />
      </div>
      </div>
    </>
  );
}

/* ── Section ── */

export default function DarkShowcase() {
  return (
    <>
      <section className="overflow-x-clip bg-[#121212] pt-16 md:pt-[100px]">
        <Container className="flex flex-col items-center gap-8 text-center lg:flex-row lg:gap-4 lg:text-left">
          <div className="lg:ml-8 lg:w-[448px] lg:shrink-0">
            <H2 className="text-white">
              Two engines,
              <br />
              <Accent>one workflow.</Accent>
            </H2>
            <p className="mx-auto mt-3 max-w-[448px] text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-white lg:mx-0">
              HypeOn Intelligence decodes what your competitors are scaling. HypeOn Studio turns it into ads
              that are ready to launch.
            </p>
            <DarkButton href="/products" className="mt-8">
              See how it works
            </DarkButton>
          </div>
          <div className="w-full lg:w-[880px] lg:shrink-0">
            <WorkflowTour />
          </div>
        </Container>

        {/* the panel hangs 58px over the light band below */}
        <div className="bg-[linear-gradient(#121212_calc(100%-58px),#ededed_calc(100%-58px))]">
          <Container>
            <IndustryShowcase />
          </Container>
        </div>
      </section>

      <section className="bg-[#ededed] pb-16 pt-[26px] md:pb-[120px]">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50 [&_img]:brightness-0">
            {[
              { src: googleStartups, alt: 'Google for Startups' },
              { src: openAIBG, alt: 'OpenAI' },
              { src: awsStartups, alt: 'AWS Startups' },
              { src: nvidia, alt: 'NVIDIA Inception' },
            ].map((l) => (
              <Image key={l.alt} src={l.src} alt={l.alt} className="h-[37px] w-auto max-w-[128px] object-contain" />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
