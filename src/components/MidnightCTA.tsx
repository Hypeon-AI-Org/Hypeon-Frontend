'use client';

import { motion } from 'framer-motion';

/* ============================================================
   "Stop guessing what's working." - a dark CTA banner right after
   pricing: bold headline, muted italic accent line, subtext, and a
   white pill button. Matches the dark-section language used
   elsewhere on the page (ProductEngines, AdIntelReplica, etc).
============================================================ */

export default function MidnightCTA() {
  return (
    <section className="rounded-b-[32px] bg-neutral-100 pb-16 sm:pb-24 lg:pb-28">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#0a0a0c] px-6 py-16 text-center sm:px-10 sm:py-20"
        >
          {/* Ambient glows - same treatment used across the other dark sections */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(255,255,255,0)_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
            }}
          />

          <h2 className="relative text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Stop guessing
            <br />
            <span className="font-serif font-normal text-white/50">what&apos;s working.</span>
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl text-sm text-white/50 sm:text-base">
            HypeOn scrolls for you. The winners get surfaced, the strategies get captured,
            the briefs get built. You launch from evidence, not a hunch.
          </p>

          <motion.a
            href="https://calendly.com/yash-hypeon/30min"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)] sm:text-base"
          >
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
            <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Try HypeOn Free</span>
              <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Try HypeOn Free</span>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
