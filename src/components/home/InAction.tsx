'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ScanSearch, Wand2 } from 'lucide-react';
import AdIntelDemo from './AdIntelDemo';
import StudioDemo from './StudioDemo';
import { Accent, Container, H2 } from './ui';

const DEMOS = [
  {
    key: 'intel',
    name: 'Ad Intelligence',
    role: 'Decode any competitor',
    icon: ScanSearch,
    Demo: AdIntelDemo,
  },
  {
    key: 'studio',
    name: 'HypeOn Studio',
    role: 'Create ads in seconds',
    icon: Wand2,
    Demo: StudioDemo,
  },
];

/** Tabs above one large video, in the light band after the dark showcase. */
export default function InAction() {
  const [active, setActive] = useState(0);
  const demo = DEMOS[active];
  return (
    <section className="bg-[#ededed] pb-16 md:pb-[120px]">
      <Container>
        <div className="text-center">
          <H2 className="text-black">
            See HypeOn <Accent>in action</Accent>
          </H2>
          <p className="mt-2 text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-black/[0.72] md:mt-0">
            Ad intelligence and creative studio, in one platform
          </p>
        </div>

        <div className="relative mt-10">
          <div role="tablist" aria-label="Product demos" className="flex gap-3 md:justify-center md:gap-6">
            {DEMOS.map((d, i) => {
              const Icon = d.icon;
              const on = i === active;
              return (
                <motion.button
                  key={d.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  whileHover={on ? undefined : { y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className={`group relative flex h-[84px] min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border px-3 text-center outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#121212] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ededed] md:h-[90px] md:w-[301px] md:flex-none md:flex-row md:justify-start md:gap-4 md:px-5 md:text-left ${
                    on
                      ? 'border-[#121212] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)]'
                      : 'border-black/15 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:border-black/40 hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.25)]'
                  }`}
                >
                  {/* dark highlight that slides between the tabs */}
                  {on && (
                    <motion.span
                      layoutId="demo-tab-highlight"
                      aria-hidden
                      className="absolute inset-0 rounded-[15px] bg-gradient-to-b from-[#2b2b2b] to-[#121212]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 md:h-12 md:w-12 ${
                      on ? 'bg-white/15 text-white' : 'bg-[#ededed] text-[#121212] group-hover:bg-[#e2e2e2]'
                    }`}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} />
                  </span>
                  <span className="relative min-w-0 md:flex-1">
                    <span className={`block whitespace-nowrap text-[14px] font-semibold leading-5 md:truncate md:leading-6 transition-colors duration-300 md:text-[16px] ${on ? 'text-white' : 'text-[#121212]'}`}>
                      {d.name}
                    </span>
                    <span className={`hidden truncate text-[14px] leading-[21px] transition-colors duration-300 md:block ${on ? 'text-white/65' : 'text-[#545454]'}`}>
                      {d.role}
                    </span>
                  </span>
                  {/* arrow nudges in on hover for the tab you can switch to */}
                  {!on && (
                    <ArrowRight
                      aria-hidden
                      className="relative hidden h-4 w-4 shrink-0 -translate-x-1 text-[#121212] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-6 h-px md:mt-[46px] max-w-[480px] bg-[linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0.12),rgba(0,0,0,0))]" />

        <div className="mt-6 rounded-2xl md:mt-[61px] bg-[linear-gradient(rgba(255,255,255,0.3),#fff)] p-px shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
          <div className="relative aspect-[1000/563] overflow-hidden rounded-[15px] bg-[#ededed]">
            <AnimatePresence mode="wait">
              <motion.div
                key={demo.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <demo.Demo />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
