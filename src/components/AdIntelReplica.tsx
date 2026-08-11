'use client';

import { Fragment, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Lock, TrendingUp } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
} as const;

const imageTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
};

const stats = [
  { value: '200M+', label: 'Ads analyzed' },
  { value: '1,000+', label: 'Brands tracked' },
  { value: 'Daily', label: 'Data refresh' },
] as const;

const tabs = [
  { id: 'insights', label: 'Insights' },
  { id: 'chatgpt', label: '"ChatGPT" for Ads' },
  { id: 'market', label: 'Market Share' },
  { id: 'explore', label: 'Explore Ads' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function AdIntelReplica() {
  const [active, setActive] = useState<TabId>('insights');

  // Subtle mouse-reactive 3D tilt on the mockup card - motion values updated
  // directly (no React state) so the tilt costs nothing on re-render.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
  };
  const handleTiltLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section className="relative overflow-hidden rounded-[56px] bg-[#0a0a0c] py-16 sm:py-24 lg:py-28">
      {/* Faint dot-grid texture - subtle depth instead of flat black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* Soft ambient glows - adds depth without a hard edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-2xl lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden h-[460px] w-[460px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-2xl lg:block"
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-xl">
            <motion.div
              {...reveal}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur-sm sm:mb-5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Ad Intelligence
              </span>
            </motion.div>

            <motion.h2
              {...reveal}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.04 }}
              className="text-white text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight"
            >
              Instantly decode
              <br />
              <span className="text-white/40">competitor ad strategy</span>
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
              className="mt-4 sm:mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Your advertising strategy agent that&apos;s trained on 200 million ads. The exact
              data-backed blueprint on how to build a successful marketing strategy.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.16 }}
              className="mt-6 sm:mt-8 flex flex-col items-start gap-4 sm:gap-5"
            >
              <motion.a
                href="https://app.hypeon.ai/studio/login"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex min-h-[44px] w-auto max-w-full items-center gap-2 self-start overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] py-1.5 pl-1.5 pr-5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/15 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c] sm:gap-3 sm:py-2 sm:pl-2 sm:pr-7 sm:text-base"
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
                <span
                  className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:translate-x-0.5 sm:h-8 sm:w-8"
                  aria-hidden
                >
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2.4} />
                </span>
                <span className="relative inline-block h-[1.2em] overflow-hidden pr-0.5 align-top">
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get Started for demo</span>
                  <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get Started for demo</span>
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.22 }}
              className="mt-8 flex items-center gap-6 border-t border-white/10 pt-6 sm:mt-10 sm:gap-10 sm:pt-8"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className={`flex flex-col ${i > 0 ? 'border-l border-white/10 pl-6 sm:pl-10' : ''}`}>
                  <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">{stat.value}</span>
                  <span className="mt-0.5 text-xs text-white/50 sm:text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full flex justify-center lg:justify-end"
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="relative w-full max-w-[620px]"
              style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-x-8 -top-3 h-full rounded-2xl border border-neutral-200/80 bg-white/70" />
              <div className="absolute inset-x-4 -top-1.5 h-full rounded-2xl border border-neutral-200/90 bg-white/80" />

              <div className="relative rounded-2xl bg-white border border-neutral-200 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] overflow-hidden">
                <div className="flex h-8 items-center gap-1.5 border-b border-neutral-200 bg-neutral-50/80 px-3 sm:h-9 sm:px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-white px-3 py-1.5 sm:px-4 sm:py-2">
                  <span className="flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-1 text-[10px] text-neutral-500 sm:text-[11px]">
                    <Lock className="h-2.5 w-2.5" strokeWidth={2.5} />
                    app.hypeon.ai/insights
                  </span>
                </div>
                <div className="h-12 sm:h-14 border-b border-neutral-200 px-3 sm:px-6 flex items-end gap-1 sm:gap-6 text-xs sm:text-sm overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {tabs.map((tab) => {
                    const isActive = tab.id === active;
                    return (
                      <motion.button
                        key={tab.id}
                        type="button"
                        onClick={() => setActive(tab.id)}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        className={`relative shrink-0 whitespace-nowrap rounded-t-md px-1.5 sm:-mx-0.5 pb-2.5 sm:pb-3 border-b-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-1 ${
                          isActive
                            ? 'text-black font-medium hover:bg-neutral-50/90'
                            : 'text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50/80'
                        }`}
                      >
                        {tab.label}
                        {isActive ? (
                          <motion.span
                            layoutId="ad-intel-tab-line"
                            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-black"
                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                          />
                        ) : null}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="relative aspect-[0.97/1] max-h-[min(72vh,640px)] sm:max-h-none bg-[#f8fafc] overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 14, scale: 1.02 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.99 }}
                      transition={imageTransition}
                      className="absolute inset-0"
                    >
                      {active === 'insights' ? <InsightsPanel /> : null}
                      {active === 'chatgpt' ? <SenseAiPanel /> : null}
                      {active === 'market' ? <MarketSharePanel /> : null}
                      {active === 'explore' ? <ExploreAdsPanel /> : null}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Floating stat badge - overlaps the mockup's bottom-left corner */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.18)] sm:-bottom-6 sm:-left-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <TrendingUp className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-black sm:text-base">+23% reach</p>
                  <p className="text-[11px] text-neutral-500 sm:text-xs">vs. last 30 days</p>
                </div>
              </motion.div>

              {/* Floating "live" badge - overlaps the mockup's top-right corner */}
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="absolute -top-4 right-6 flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] sm:-top-5 sm:right-10"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Live
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}

function InsightsPanel() {
  const metrics = [
    { label: 'New ads', value: '1,204', trend: '+23%', down: false },
    { label: 'Reach', value: '8.44M', trend: '-2%', down: true },
    { label: 'Avg. ads / day', value: '22', trend: '+23%', down: false },
    { label: 'Avg. spend', value: '7.8K', suffix: 'EUR', trend: '+23%', down: false },
  ] as const;

  return (
    <div className="h-full min-h-0 bg-white p-3.5 sm:p-5 text-[#0f172a] overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Competitor analysis</p>
          <h3 className="mt-1 text-lg sm:text-[20px] leading-tight sm:leading-none font-semibold tracking-tight text-slate-900">
            Louis Vuitton vs. Prada
          </h3>
        </div>
        <button
          type="button"
          className="self-start shrink-0 rounded-xl border border-slate-200 px-2.5 py-1.5 sm:px-3 text-[11px] sm:text-xs font-medium text-slate-700"
        >
          Last 30 Days
        </button>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2 sm:gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-slate-100 bg-white p-2 sm:p-2.5 shadow-sm">
            <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">{metric.label}</p>
            <div className="mt-1 flex flex-wrap items-end gap-1 sm:gap-2">
              <span className="text-base sm:text-[20px] leading-none font-semibold text-slate-900">{metric.value}</span>
              {'suffix' in metric ? (
                <span className="pb-0.5 text-xs font-medium uppercase text-slate-400">{metric.suffix}</span>
              ) : null}
            </div>
            <div className={`mt-1.5 inline-flex items-center text-xs ${metric.down ? 'text-red-500' : 'text-slate-600'}`}>
              <span className="font-semibold">{metric.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 rounded-xl border border-slate-100 p-3 sm:p-3.5">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-slate-500">Top insights</p>
        <ul className="mt-2.5 space-y-2 text-[12px] sm:text-[13px] sm:space-y-2.5 leading-snug sm:leading-5 text-slate-700">
          <li>
            <span className="font-semibold text-slate-900">Louis Vuitton:</span> Heavy investment in short-form
            storytelling and travel-season capsules, prioritizing brand equity over promotional discounting.
          </li>
          <li>
            <span className="font-semibold text-slate-900">Prada:</span> Shifted spend toward runway and archival
            drops in Q4, pairing high-production films with tighter retargeting on leather goods.
          </li>
        </ul>
      </div>
    </div>
  );
}

function SenseAiPanel() {
  return (
    <div className="h-full min-h-0 bg-white p-3.5 sm:p-5 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 sm:pb-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-slate-700" />
          <p className="truncate text-base sm:text-[18px] font-semibold tracking-tight text-slate-800">Intelligence AI</p>
        </div>
        <span className="shrink-0 text-xs sm:text-sm font-medium text-slate-300">v4.2</span>
      </div>

      <div className="mt-5 sm:mt-7 flex items-start gap-2 sm:gap-3">
        <span className="mt-1 inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 px-1.5 text-[11px] font-semibold text-slate-700">
          AI
        </span>
        <div className="min-w-0 max-w-[min(100%,22rem)] sm:max-w-[88%] rounded-2xl border border-slate-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3 shadow-sm">
          <p className="text-sm sm:text-[18px] leading-6 sm:leading-8 text-slate-600">
            Competitor A increased budget by 15% on Reels placements this week.
          </p>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 flex justify-end sm:pl-16 md:pl-24 lg:pl-40">
        <button
          type="button"
          className="w-full sm:w-auto rounded-2xl bg-[#0f1d3b] px-4 py-2.5 sm:px-7 sm:py-3 text-left text-sm sm:text-[15px] font-semibold text-white shadow-sm sm:text-center"
        >
          Show me their top creative formats.
        </button>
      </div>
    </div>
  );
}

function MarketSharePanel() {
  const rows = [
    { brand: 'Prada', values: [3, 549, 23] },
    { brand: 'Gucci', values: [32, 153, 203] },
    { brand: 'Louis Vuitton', values: [440, 269, 225] },
    { brand: 'Dior', values: [29, 6, 13] },
  ] as const;

  const bars = [
    { label: '54%', heightClass: 'h-12' },
    { label: '36%', heightClass: 'h-9' },
    { label: '7%', heightClass: 'h-3' },
    { label: '3%', heightClass: 'h-1.5' },
  ] as const;

  return (
    <div className="h-full min-h-0 bg-white p-3.5 sm:p-5 text-slate-900 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Dashboard</p>
          <h3 className="mt-1 text-lg sm:text-[20px] leading-tight sm:leading-none font-semibold tracking-tight">Overview</h3>
        </div>
        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-slate-500" />
      </div>

      <div className="mt-3 sm:mt-4 rounded-2xl border border-slate-100 p-2.5 sm:p-3.5">
        <p className="text-sm sm:text-[16px] font-semibold tracking-tight">Market share by reach</p>
        <div className="mt-2.5 flex h-20 sm:h-24 items-end gap-2 sm:gap-3 border-b border-slate-100 pb-2 sm:pb-3">
          {bars.map((bar) => (
            <div key={bar.label} className="min-w-0 flex-1">
              <p className="mb-1 text-center text-sm sm:text-[20px] leading-none font-semibold">{bar.label}</p>
              <div className={`w-full rounded-t-md bg-slate-700 ${bar.heightClass}`} />
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 -mx-1 overflow-x-auto overscroll-x-contain px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid min-w-[300px] grid-cols-[minmax(4.5rem,1.1fr)_1fr_1fr_1fr] gap-x-0.5 gap-y-0 text-[10px] sm:gap-1 sm:text-[12px]">
            <p />
            <p className="border-l border-dashed border-slate-300 px-0.5 py-1 sm:py-1.5 text-center font-semibold leading-tight">
              27.09 - 03.10
            </p>
            <p className="border-l border-dashed border-slate-300 px-0.5 py-1 sm:py-1.5 text-center font-semibold leading-tight">
              04.10 - 10.10
            </p>
            <p className="border-l border-dashed border-slate-300 px-0.5 py-1 sm:py-1.5 text-center font-semibold leading-tight">
              11.10 - 17.10
            </p>
            {rows.map((row) => (
              <Fragment key={row.brand}>
                <p className="py-1.5 pr-1 text-xs sm:text-[14px] font-medium text-slate-700">{row.brand}</p>
                {row.values.map((value, idx) => (
                  <p
                    key={`${row.brand}-${idx}`}
                    className="rounded-lg sm:rounded-xl border-l border-dashed border-slate-300 bg-slate-100 px-0.5 py-1.5 text-center text-xs sm:text-[14px] font-semibold text-slate-900"
                  >
                    {value}
                  </p>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreAdsPanel() {
  const cards = [
    {
      title: 'Discover leather goods and the latest runway pieces on LouisVuitton.com…',
      date: '24 Mar 2025',
      duration: '9 days',
      reach: '923K',
      brand: 'Louis Vuitton',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo_and_wordmark.svg',
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'Shop Re-Nylon, Galleria, and seasonal edits on Prada.com…',
      date: '24 Mar 2025',
      duration: '18 days',
      reach: '2.6M',
      brand: 'Prada',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Prada_Group_-_logo_%28Italy%29.svg',
      image:
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'Discover leather goods and the latest runway pieces on LouisVuitton.com…',
      date: '24 Mar 2025',
      duration: '9 days',
      reach: '923K',
      brand: 'Louis Vuitton',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo_and_wordmark.svg',
      image:
        'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'Shop Re-Nylon, Galleria, and seasonal edits on Prada.com…',
      date: '24 Mar 2025',
      duration: '18 days',
      reach: '2.6M',
      brand: 'Prada',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Prada_Group_-_logo_%28Italy%29.svg',
      image:
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1400&q=80',
    },
  ] as const;

  return (
    <div className="h-full min-h-0 bg-white p-3.5 sm:p-5 text-slate-900 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex min-w-0 items-center gap-2 text-lg sm:text-[20px] font-semibold tracking-tight">
          <span className="inline-flex size-5 shrink-0 items-center justify-center text-slate-800" aria-hidden>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path
                d="M12 3c2.3 2.2 3.6 5.4 3.6 9s-1.3 6.8-3.6 9c-2.3-2.2-3.6-5.4-3.6-9s1.3-6.8 3.6-9Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="truncate">Explore Ads</span>
        </h3>
        <span className="self-start shrink-0 rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 sm:px-3 sm:text-[15px]">
          13,771 items
        </span>
      </div>

      <div className="mt-3 sm:mt-4 grid grid-cols-1 min-[400px]:grid-cols-2 gap-2.5 sm:gap-3">
        {cards.map((card, idx) => (
          <article
            key={`${card.title}-${idx}`}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="inline-flex size-5 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                <img src={card.logo} alt={`${card.brand} logo`} className="size-3.5 object-contain" />
              </span>
              <p className="text-[14px] font-semibold leading-none text-slate-900">{card.brand}</p>
            </div>
            <img src={card.image} alt={card.title} className="h-24 min-[400px]:h-28 w-full object-cover" />
            <div className="p-2 sm:p-2.5">
              <div className="flex items-center justify-between gap-2 text-[10px] font-medium text-slate-500">
                <span>{card.date}</span>
                <span>{card.duration}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm min-[400px]:text-[15px] font-semibold leading-snug min-[400px]:leading-5">
                {card.title}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-slate-700">
                <span className="inline-flex size-4 items-center justify-center rounded-full bg-slate-500 text-white" aria-hidden>
                  <svg viewBox="0 0 24 24" className="size-2.5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10 9.5L7.5 12l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{card.reach}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
