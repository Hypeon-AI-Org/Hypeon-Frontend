'use client';

import { motion } from 'framer-motion';
import { Briefcase, Megaphone, Palette, Target } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
} as const;

const columns = [
  {
    icon: Target,
    title: 'Media buyers',
    description:
      'Strategic planning backed by real data, delivered instantly for you.',
  },
  {
    icon: Briefcase,
    title: 'Business owners',
    description:
      "Be ahead of competitors. Don't waste budget on tests others already paid for.",
  },
  {
    icon: Megaphone,
    title: 'Marketing agencies',
    description:
      'Serve clients at scale: shareable intel, competitive snapshots, and reporting that grows with your book of business.',
  },
  {
    icon: Palette,
    title: 'Growth & creative',
    description:
      'Find winning angles faster. Save, annotate, and share creative inspirations with your team.',
  },
] as const;

export default function TeamsAchieve() {
  return (
    <section className="relative bg-[#ffffff] py-10 sm:py-12 lg:py-16 font-sans text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          {...reveal}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black leading-tight mb-8 sm:mb-10 lg:mb-12"
        >
          See what teams achieve with{' '}
          <span className="text-[#696863]">HypeOn</span>
        </motion.h2>

        <motion.div
          {...reveal}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
          className="rounded-2xl bg-[#ffffff] border border-neutral-200 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {columns.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="py-6 sm:py-8 px-5 sm:px-6 border-b border-neutral-200 last:border-b-0 md:odd:border-e md:border-neutral-200 md:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:border-e lg:border-neutral-200 lg:[&:nth-child(4n)]:border-e-0"
              >
                <Icon
                  className="h-6 w-6 sm:h-7 sm:w-7 text-black mb-3 sm:mb-4"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="text-xl font-medium text-black tracking-tight mb-1.5 sm:mb-2">
                  {title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
