'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScanSearch, Wand2 } from 'lucide-react';
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
          <div
            role="tablist"
            aria-label="Product demos"
            className="flex gap-8 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:justify-center md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {DEMOS.map((d, i) => {
              const Icon = d.icon;
              const on = i === active;
              return (
                <button
                  key={d.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`flex h-[90px] w-[301px] shrink-0 items-center gap-5 rounded-2xl border border-white bg-white/70 p-5 text-left transition-opacity duration-200 ${
                    on ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e2e2e2]">
                    <Icon className="h-5 w-5 text-[#121212]" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-[16px] font-medium leading-6 text-black">{d.name}</span>
                    <span className="block text-[14px] leading-[21px] text-black/70">{d.role}</span>
                  </span>
                </button>
              );
            })}
          </div>
          {/* soft edge fades, as on the reference */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[100px] bg-[linear-gradient(90deg,#ededed,rgba(237,237,237,0.8)_43%,rgba(237,237,237,0))] md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[100px] bg-[linear-gradient(270deg,#ededed,rgba(237,237,237,0.8)_43%,rgba(237,237,237,0))] md:hidden" />
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
