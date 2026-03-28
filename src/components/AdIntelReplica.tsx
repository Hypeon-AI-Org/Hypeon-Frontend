'use client';

import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
} as const;

const imageTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
};

const tabs = [
  { id: 'insights', label: 'Insights' },
  { id: 'chatgpt', label: '"ChatGPT" for Ads' },
  { id: 'market', label: 'Market Share' },
  { id: 'explore', label: 'Explore Ads' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function AdIntelReplica() {
  const [active, setActive] = useState<TabId>('insights');

  return (
    <section className="relative bg-[oklch(0.988_0.0041_91.45)] py-10 sm:py-12 lg:py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-xl">
            <motion.h2
              {...reveal}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="text-black text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight"
            >
              Instantly decode
              <br />
              <span className="text-brand-600">competitor ad strategy</span>
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
              className="mt-4 sm:mt-6 text-neutral-500 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Your advertising strategy agent that&apos;s trained on 200 million ads. The exact
              data-backed blueprint on how to build a successful marketing strategy.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.16 }}
              className="mt-6 sm:mt-8 flex flex-col items-start"
            >
              <motion.a
                href="https://app.hypeon.ai/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] w-auto max-w-full items-center gap-3 self-start rounded-full bg-[#171923] py-2.5 pl-2.5 pr-6 text-sm font-semibold text-white shadow-[0_4px_14px_-4px_rgba(15,23,42,0.35)] transition-colors duration-200 hover:bg-[#1f2937] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171923]/40 focus-visible:ring-offset-2 sm:min-h-[46px] sm:gap-3.5 sm:pr-7 sm:text-base"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#171923]"
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
                </span>
                <span className="pr-0.5 leading-none">Get Started for demo</span>
              </motion.a>
             
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[620px]">
              <div className="absolute inset-x-8 -top-3 h-full rounded-2xl border border-neutral-200/80 bg-white/70" />
              <div className="absolute inset-x-4 -top-1.5 h-full rounded-2xl border border-neutral-200/90 bg-white/80" />

              <div className="relative rounded-2xl bg-white border border-neutral-200 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] overflow-hidden">
                <div className="h-14 border-b border-neutral-200 px-5 sm:px-6 flex items-end gap-5 sm:gap-6 text-sm">
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
                        className={`relative rounded-t-md px-1.5 -mx-0.5 pb-3 border-b-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-1 ${
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

                <div className="relative aspect-[0.97/1] bg-[#f8fafc] overflow-hidden">
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
            </div>
          </motion.div>
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
    <div className="h-full bg-white p-4 sm:p-5 text-[#0f172a]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Competitor analysis</p>
          <h3 className="mt-1 text-[20px] leading-none font-semibold tracking-tight text-slate-900">
            Nike vs. Adidas
          </h3>
        </div>
        <button className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700">
          Last 30 Days
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
            <p className="text-[10px] text-slate-500">{metric.label}</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-[20px] leading-none font-semibold text-slate-900">{metric.value}</span>
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

      <div className="mt-8 rounded-xl border border-slate-100 p-3.5">
        <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Top insights</p>
        <ul className="mt-2.5 space-y-2.5 text-[13px] leading-5 text-slate-700">
          <li>
            <span className="font-semibold text-slate-900">Nike:</span> Highly automated optimization focuses on
            real-time budget and reach over creative shifts.
          </li>
          <li>
            <span className="font-semibold text-slate-900">Adidas:</span> Pivoted from e-gift cards to a winter sale
            campaign in late December, shifting toward direct sales.
          </li>
        </ul>
      </div>
    </div>
  );
}

function SenseAiPanel() {
  return (
    <div className="h-full bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-slate-700" />
          <p className="text-[18px] font-semibold tracking-tight text-slate-800">Intelligence AI</p>
        </div>
        <span className="text-sm font-medium text-slate-300">v4.2</span>
      </div>

      <div className="mt-7 flex items-start gap-3">
        <span className="mt-1 inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-slate-100 px-1.5 text-[11px] font-semibold text-slate-700">
          AI
        </span>
        <div className="max-w-[88%] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-[18px] leading-8 text-slate-600">
            Competitor A increased budget by 15% on Reels placements this week.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3  pl-40">
        <button className="rounded-2xl bg-[#0f1d3b] px-7 py-3 text-[15px] font-semibold text-white shadow-sm">
          Show me their top creative formats.
        </button>

      </div>
    </div>
  );
}

function MarketSharePanel() {
  const rows = [
    { brand: 'adidas', values: [3, 549, 23] },
    { brand: 'lululemon', values: [32, 153, 203] },
    { brand: 'Nike', values: [440, 269, 225] },
    { brand: 'PUMA', values: [29, 6, 13] },
  ] as const;

  const bars = [
    { label: '54%', heightClass: 'h-12' },
    { label: '36%', heightClass: 'h-9' },
    { label: '7%', heightClass: 'h-3' },
    { label: '3%', heightClass: 'h-1.5' },
  ] as const;

  return (
    <div className="h-full bg-white p-4 sm:p-5 text-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Dashboard</p>
          <h3 className="mt-1 text-[20px] leading-none font-semibold tracking-tight">Overview</h3>
        </div>
        <span className="mt-1.5 size-2 rounded-full bg-slate-500" />
      </div>

      <div className="mt-4 rounded-2xl border border-slate-100 p-3.5">
        <p className="text-[16px] font-semibold tracking-tight">Market share by reach</p>
        <div className="mt-2.5 flex h-24 items-end gap-3 border-b border-slate-100 pb-3">
          {bars.map((bar) => (
            <div key={bar.label} className="flex-1">
              <p className="mb-1 text-center text-[20px] leading-none font-semibold">{bar.label}</p>
              <div className={`w-full rounded-t-md bg-slate-700 ${bar.heightClass}`} />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[1.1fr_1fr_1fr_1fr] gap-1 text-[12px]">
          <p />
          <p className="border-l border-dashed border-slate-300 py-1.5 text-center font-semibold">27.09 - 03.10</p>
          <p className="border-l border-dashed border-slate-300 py-1.5 text-center font-semibold">04.10 - 10.10</p>
          <p className="border-l border-dashed border-slate-300 py-1.5 text-center font-semibold">11.10 - 17.10</p>
          {rows.map((row) => (
            <Fragment key={row.brand}>
              <p key={`${row.brand}-name`} className="py-1.5 text-[14px] font-medium text-slate-700">
                {row.brand}
              </p>
              {row.values.map((value, idx) => (
                <p
                  key={`${row.brand}-${idx}`}
                  className="rounded-xl border-l border-dashed border-slate-300 bg-slate-100 py-1.5 text-center text-[14px] font-semibold text-slate-900"
                >
                  {value}
                </p>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExploreAdsPanel() {
  const cards = [
    {
      title: "Get up to 50% off the season's finest..",
      date: '24 Mar 2025',
      duration: '9 days',
      reach: '923K',
      brand: 'Nike',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'Find the latest styles on Nike.com...',
      date: '24 Mar 2025',
      duration: '18 days',
      reach: '2.6M',
      brand: 'Adidas',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      image:
        'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: "Get up to 50% off the season's finest..",
      date: '24 Mar 2025',
      duration: '9 days',
      reach: '923K',
      brand: 'Nike',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'Find the latest styles on Nike.com...',
      date: '24 Mar 2025',
      duration: '18 days',
      reach: '2.6M',
      brand: 'Adidas',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      image:
        'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1400&q=80',
    },
  ] as const;

  return (
    <div className="h-full bg-white p-4 sm:p-5 text-slate-900">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[20px] font-semibold tracking-tight">
          <span className="inline-flex size-5 items-center justify-center text-slate-800" aria-hidden>
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
          <span>Explore Ads</span>
        </h3>
        <span className="rounded-xl bg-slate-100 px-3 py-1 text-[15px] font-semibold text-slate-600">13,771 items</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
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
            <img src={card.image} alt={card.title} className="h-28 w-full object-cover" />
            <div className="p-2.5">
              <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                <span>{card.date}</span>
                <span>{card.duration}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-5">{card.title}</p>
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
