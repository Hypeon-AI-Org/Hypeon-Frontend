'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    id: 'Market Gap Finder',
    title: 'Market Gap Finder',
    image: '/images/marketfinder.png',
    description:
      'AI reads millions of competitor reviews across Amazon, Trustpilot and Google — then ranks the unmet needs customers keep asking for.',
  },
  {
    id: 'Competitor Intelligence',
    title: 'Competitor Intelligence',
    image: '/images/competitoro.png',
    description:
      'Track product launches, pricing changes, creator partnerships and SKU additions in real time — across every channel they sell on.',
  },
  {
    id: 'Traffic Intelligence',
    title: 'Traffic Intelligence',
    image: '/images/Traffic.png',
    description:
      'See where competitor traffic actually comes from. Paid, organic, social, referral — updated weekly.',
  },
  {
    id: 'GEO Intelligence',
    title: 'GEO Intelligence',
    image: '/images/Geo.png',
    description:
      'Find countries where demand is rising fast, competition is near zero, and nobody is collecting that revenue yet.',
  },
];

export default function HypeScoreSection() {
  const [activeId, setActiveId] = useState('Market Gap Finder');
  const activeFeature = features.find((f) => f.id === activeId) ?? features[0];

  return (
    <section className="py-14 bg-white font-sans">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_420px] gap-12 items-start">

        {/* LEFT CONTENT – scroll reveal */}
        <div className="reveal-left">

          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-medium mb-4">
            USE CASES
          </p>

          <h2 className="text-3xl text-[#0f172a] leading-[1.1] mb-6 max-w-xl font-semibold">
            Know what they're doing. Know what they're missing.
          </h2>

          <p className="text-slate-500 text-[14px] leading-relaxed max-w-md mb-8">
            Track competitors, find market gaps, discover untapped countries,
            and understand where traffic is really coming from — all from one place.
          </p>

          {/* FEATURE LIST – staggered scroll reveal */}
          <div className="border-t border-slate-200 reveal-stagger">

            {features.map((feature) => {
              const isActive = feature.id === activeId;

              return (
                <motion.div
                  layout
                  key={feature.id}
                  className="border-b border-slate-200"
                >
                  <button
                    onClick={() => setActiveId(feature.id)}
                    className="w-full text-left py-4 group relative"
                  >

                    {/* Title */}
                    <span
                      className={`block text-[16px] font-semibold transition-colors duration-300 ${
                        isActive
                          ? 'text-slate-900'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    >
                      {feature.title}
                    </span>

                    {/* Active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 bottom-0 h-[2px] w-16 bg-black rounded"
                      />
                    )}

                    {/* Description animation */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                          className="text-slate-500 text-[13px] leading-relaxed mt-3 max-w-sm"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                  </button>
                </motion.div>
              );
            })}

          </div>
        </div>

        {/* RIGHT IMAGE – scroll reveal */}
        <div className="sticky top-28 flex justify-end reveal-right">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full md:h-[420px]"
            >
              <Image
                src={activeFeature.image || '/images/dashboard.png'}
                alt={activeFeature.title}
                fill
                priority
                className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.12)]"
              />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}