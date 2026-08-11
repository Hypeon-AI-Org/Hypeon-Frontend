'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import { MarqueeVideo } from './MediaCarousel';

/* ============================================================
   The two HypeOn "engines" - Ad Intelligence + Studio.
   Dark, full-bleed, numbered feature rows that alternate the
   visual left ⇄ right - no page grid hairlines here, just two
   big rounded panels stacked on a near-black background.
============================================================ */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

type Engine = {
  id: string;
  badge: string;
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  cta: string;
  href: string;
  video: string;
  poster?: string;
  fit?: 'cover' | 'contain';
};

const INTELLIGENCE: Engine = {
  id: '01',
  badge: 'Hypeon Intelligence',
  icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />,
  title: 'Decode your competitors’ playbook',
  body: 'Trained on 200M+ ads. Hypeon Intelligence decodes every competitor’s spend, reach and winning angles, surfaces breakout products before they peak, and hands you the exact data-backed blueprint for your next move.',
  cta: 'Explore Ad Intelligence',
  href: '/products',
  video: '/hypeon-dem.mp4',
  fit: 'contain',
};

const STUDIO: Engine = {
  id: '02',
  badge: 'HypeOn Studio',
  icon: <Wand2 className="h-3.5 w-3.5" strokeWidth={2.4} />,
  title: 'Build the creative that converts',
  body: 'HypeOn Studio turns that intelligence into scroll-stopping static, video and UGC creatives in seconds - not weeks. Sharper briefs, fewer review rounds, on-brand every time.',
  cta: 'Explore HypeOn Studio',
  href: '/studio',
  video: '/hypeon-studio.mp4',
  poster: '/hypeon-studio-poster.jpg',
  fit: 'cover',
};

function EngineRow({ e, reverse = false }: { e: Engine; reverse?: boolean }) {
  return (
    <motion.div
      {...reveal}
      className={`flex flex-col gap-8 rounded-[28px] border border-white/10 bg-[#131316] p-6 sm:p-8 lg:gap-12 lg:p-10 ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } lg:items-center`}
    >
      {/* Text column */}
      <div className="flex flex-col lg:w-[280px] lg:shrink-0">
        <span className="text-xs font-semibold tracking-[0.2em] text-white/30">{e.id}</span>

        <div className="mt-4 inline-flex items-center gap-2 self-start">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-white">
            {e.icon}
          </span>
          <span className="text-xs font-semibold tracking-tight text-white/70">{e.badge}</span>
        </div>

        <h3 className="mt-4 text-xl font-bold leading-[1.15] tracking-tight text-white sm:text-2xl">
          {e.title}
        </h3>

        <p className="mt-4 text-[14px] leading-relaxed text-white/50">{e.body}</p>

        <Link
          href={e.href}
          className="group relative mt-6 inline-flex min-h-[44px] items-center gap-3 self-start overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] py-1.5 pl-1.5 pr-5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)]"
        >
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
            <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{e.cta}</span>
            <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">{e.cta}</span>
          </span>
        </Link>
      </div>

      {/* Visual column - white "app screen" panel */}
      <div className="relative w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="relative aspect-video w-full">
          <MarqueeVideo src={e.video} poster={e.poster} fit={e.fit} rootMargin="1200px" eagerPoster={e.id === '01'} />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductEngines() {
  return (
    <section className="relative overflow-hidden rounded-[56px] bg-[#0a0a0c] py-16 sm:py-20 lg:py-28">
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
        <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Decode. <span className="text-white/40">Create.</span>
          </h2>
          <p className="mt-3 text-sm text-white/50 sm:text-base">
            Creative intelligence in two moves.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col gap-6 lg:mt-16 lg:gap-8">
          <EngineRow e={INTELLIGENCE} />
          <EngineRow e={STUDIO} reverse />
        </div>
      </div>
    </section>
  );
}
