"use client";

import React from 'react';
import { motion } from 'framer-motion';

/* ============================================================
   Closing CTA - dark rounded banner matching the homepage's
   MidnightCTA pattern: ambient glows, dot-grid texture, bold
   headline with a muted accent line, subtext, white pill CTA.
============================================================ */

export default function CTASection() {
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
            className="pointer-events-none absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(255,255,255,0)_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 h-[520px] w-[520px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-3xl"
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

          <h2 className="relative text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Stop researching with
            <br />
            <span className=" font-serif font-normal text-white/50">yesterday&apos;s data.</span>
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl text-sm text-white/50 sm:text-base">
            The day you connect HypeOn Intelligence, you start seeing the signals your
            competitors haven&apos;t found yet. That&apos;s the only edge that matters.
          </p>

          <motion.a
            href="https://app.hypeon.ai/studio/login"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)] sm:text-base"
          >
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
            <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get the demo</span>
              <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get the demo</span>
            </span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-6 flex flex-wrap justify-center gap-2 text-xs font-medium text-white/40 sm:text-sm"
          >
            <span>Free to start</span>
            <span className="text-white/20">·</span>
            <span>10 minute setup</span>
            <span className="text-white/20">·</span>
            <span>No credit card required</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
