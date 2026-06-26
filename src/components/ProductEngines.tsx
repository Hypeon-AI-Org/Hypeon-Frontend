'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import Section, { Cell } from './Section';
import { MarqueeVideo } from './MediaCarousel';

/* ============================================================
   The two HypeOn "engines" — Ad Intelligence + Studio.
   Reference layout (marketer/ember): a 2-col grid that
   alternates visual ⇄ text down two rows, each engine framed
   by the page's hairline grid. Reuses existing /public assets.
============================================================ */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

type Engine = {
  badge: string;
  icon: React.ReactNode;
  iconBg: string; // tailwind bg color class for the badge chip
  eyebrow: string;
  question: string;
  body: React.ReactNode;
  cta: string;
  href: string;
  accent: string; // tailwind text color class for the heading accent + question
  heading: React.ReactNode;
};

const INTELLIGENCE: Engine = {
  badge: 'Hypeon Intelligence',
  icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />,
  iconBg: 'bg-[#383d49]',
  eyebrow: 'The Intelligence Engine',
  accent: 'text-[#696863]',
  heading: (
    <>
      Your competitor&apos;s playbook,{' '}
      <span className="text-[#696863]">decoded in seconds.</span>
    </>
  ),
  question: 'What happens when you never run blind again?',
  body: (
    <>
      Hypeon Intelligence is trained on 200M+ ads. It decodes every competitor&apos;s
      spend, reach and winning angles, surfaces breakout products before they peak, and
      hands you the exact data-backed blueprint for your next move.
    </>
  ),
  cta: 'Explore Ad Intelligence',
  href: '/products',
};

const STUDIO: Engine = {
  badge: 'HypeOn Studio',
  icon: <Wand2 className="h-3.5 w-3.5" strokeWidth={2.4} />,
  iconBg: 'bg-[#383d49]',
  eyebrow: 'The Creative Engine',
  accent: 'text-[#696863]',
  heading: (
    <>
      Beyond AI-powered.{' '}
      <span className="text-[#696863]">AI-first creative</span> built to convert.
    </>
  ),
  question: 'What happens when creative keeps up with the data?',
  body: (
    <>
      HypeOn Studio turns that intelligence into scroll-stopping static, video and UGC
      creatives in seconds — not weeks. Sharper briefs, fewer review rounds, on-brand
      every time, and visuals engineered to actually perform.
    </>
  ),
  cta: 'Explore HypeOn Studio',
  href: '/studio',
};

function EngineText({ e, className = '' }: { e: Engine; className?: string }) {
  return (
    <Cell className={`flex flex-col justify-center ${className}`}>
      <motion.div {...reveal}>
        {/* brand badge */}
        <div className="mb-8 inline-flex items-center gap-2">
          <span className={`flex h-6 w-6 items-center justify-center rounded-md text-white ${e.iconBg}`}>
            {e.icon}
          </span>
          <span className="text-sm font-semibold tracking-tight text-black">{e.badge}</span>
        </div>

        <h3 className="max-w-md text-2xl font-bold leading-[1.12] tracking-tighter text-black sm:text-3xl lg:text-[2.1rem]">
          {e.heading}
        </h3>

        <p className={`mt-5 text-sm font-medium ${e.accent}`}>{e.question}</p>

        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">{e.body}</p>

        <Link
          href={e.href}
          className="group mt-8 inline-flex min-h-[44px] items-center gap-3 self-start rounded-full bg-[#171923] py-2 pl-2 pr-5 text-sm font-semibold text-white shadow-[0_4px_14px_-4px_rgba(15,23,42,0.35)] transition-colors duration-200 hover:bg-[#1f2937]"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#171923] transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          {e.cta}
        </Link>
      </motion.div>
    </Cell>
  );
}

export default function ProductEngines() {
  return (
    <Section cols={2}>
      {/* Row 1 — Intelligence: visual left, text right */}
      <Cell bleed className="relative flex min-h-[360px] items-center justify-center overflow-hidden !border-b-0 bg-neutral-100 p-6 sm:p-10 lg:min-h-[460px]">
        <motion.div {...reveal} className="relative w-full max-w-[600px]">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-[0_18px_40px_-20px_rgba(15,23,42,0.10)]">
            <MarqueeVideo src="/hypeon-dem.mp4" fit="contain" rootMargin="1500px" eagerPoster />
          </div>
        </motion.div>
      </Cell>
      <EngineText e={INTELLIGENCE} />

      {/* Row 2 — Studio: text left, visual right on desktop.
          Video is FIRST in the DOM so it stacks ABOVE the text on mobile;
          md:order restores text-left / video-right once the grid is 2-col. */}
      <Cell bleed className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-neutral-100 p-6 sm:p-10 md:order-2 lg:min-h-[460px]">
        <motion.div {...reveal} className="relative w-full max-w-[600px]">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 shadow-[0_24px_50px_-18px_rgba(15,23,42,0.25)]">
            <MarqueeVideo src="/hypeon-studio.mp4" poster="/hypeon-studio-poster.jpg" />
          </div>
        </motion.div>
      </Cell>
      <EngineText e={STUDIO} className="md:order-1" />
    </Section>
  );
}
