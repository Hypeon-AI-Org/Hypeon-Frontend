"use client";
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, DollarSign, ShieldCheck } from 'lucide-react';

export default function TrendalyticsSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
      {/* ambient dot-grid backdrop, matching the reference video - two parallax layers for a 3D depth feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(52,120,110,0.35) 1.5px, transparent 1.5px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, transparent 40%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, transparent 40%, black 100%)',
          animation: 'dotDrift 5s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(52,120,110,0.28) 2px, transparent 2px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, transparent 40%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, transparent 40%, black 100%)',
          animation: 'dotDriftSlow 7s ease-in-out infinite',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(340px,380px)_minmax(0,900px)] lg:gap-24 lg:pl-40 lg:pr-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <span className="mb-5 inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-500">
            Marketing is now software
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-[2.1rem] font-bold tracking-tighter leading-tight mb-4 text-[#1a1a1a]">
            All your Competitor ads<br />
            <span className="text-[#1a1a1a]">Across every platform</span>
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto lg:mx-0 mb-6">
           Access 200M ads with share of voice, reach, creative and estimated spend data.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5">
            <a
              href="https://calendly.com/yash-hypeon/30min"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] pl-2 pr-5 py-2 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)]"
            >
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#0a0a0c]">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get started</span>
                <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get started</span>
              </span>
            </a>
            <a
              href="https://calendly.com/yash-hypeon/30min"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-slate-50"
            >
              Talk to sales
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[12px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Set up in minutes
            </span>
      
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Data stays yours
            </span>
          </div>
        </motion.div>

        {/* Product screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative w-full lg:mt-20"
        >
          <div className="bg-white border border-gray-200 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.1)] overflow-hidden">
            <NextImage
              src="/dashboard_2.png"
              alt="HypeOn Ad Intelligence dashboard"
              width={1920}
              height={1080}
              priority
              className="block h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
