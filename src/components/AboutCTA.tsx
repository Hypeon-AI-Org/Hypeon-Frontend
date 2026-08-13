'use client';

import { motion } from 'framer-motion';

export default function StartToday() {
  return (
    <section className="bg-white pb-16 sm:pb-24 lg:pb-28">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#0a0a0c] px-6 py-16 text-center sm:px-10 sm:py-20"
        >
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

          <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Start Today</p>

          <h2 className="relative mt-4 text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white">
            Stop guessing.
            <br />
            <span className="italic font-serif font-normal text-white/50">Start knowing.</span>
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl text-sm sm:text-base text-white/50">
            Your competitors are making decisions based on{' '}
            <span className="font-medium text-white">3-month-old data</span> and platform lies.
            HypeOn gives you the edge that turns founders into market winners.
          </p>

          <motion.a
            href="https://calendly.com/yash-hypeon/30min"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] transition-colors duration-200 hover:bg-white/90 sm:text-base"
          >
            Get the demo
          </motion.a>

          <p className="relative mt-6 text-xs font-medium text-white/40 sm:text-sm">
            No credit card required · Setup in under 10 minutes · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
