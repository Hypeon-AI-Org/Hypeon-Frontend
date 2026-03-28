'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BarChart2, Briefcase, Search, Sparkles } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
} as const;

const SEARCH_PLACEHOLDER = 'Summer sale ads targeting Netherlands...';

function IconBox({
  children,
  variant = 'muted',
  className = '',
}: {
  children: ReactNode;
  variant?: 'muted' | 'white';
  className?: string;
}) {
  const base =
    variant === 'white'
      ? 'border-slate-200 bg-white text-slate-700'
      : 'border-slate-200/90 bg-slate-100/90 text-slate-700';
  return (
    <div
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border ${base} ${className}`}
    >
      {children}
    </div>
  );
}

function TypingSearchLine({
  replayKey,
  reducedMotion,
}: {
  replayKey: number;
  reducedMotion: boolean | null;
}) {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingTimeoutRef = useRef<number | null>(null);
  const typingFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typingTimeoutRef.current !== null) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (typingFrameRef.current !== null) {
      window.cancelAnimationFrame(typingFrameRef.current);
      typingFrameRef.current = null;
    }

    if (reducedMotion) {
      setText(SEARCH_PLACEHOLDER);
      return;
    }

    setText('');
    let i = 0;

    const typeNext = () => {
      i += 1;
      setText(SEARCH_PLACEHOLDER.slice(0, i));
      if (i >= SEARCH_PLACEHOLDER.length) return;

      typingFrameRef.current = window.requestAnimationFrame(() => {
        typingTimeoutRef.current = window.setTimeout(typeNext, 30);
      });
    };

    typingTimeoutRef.current = window.setTimeout(typeNext, 180);

    return () => {
      if (typingTimeoutRef.current !== null) {
        window.clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      if (typingFrameRef.current !== null) {
        window.cancelAnimationFrame(typingFrameRef.current);
        typingFrameRef.current = null;
      }
    };
  }, [replayKey, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setShowCursor((c) => !c), 530);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <span className="min-h-[1.25rem] text-left text-[14px] text-[#666]">
      <span className="text-[#666]">{text}</span>
      {!reducedMotion && (
        <span
          className={`inline-block ml-px h-[14px] w-px translate-y-[1px] align-middle bg-[#666] transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden
        />
      )}
    </span>
  );
}

function AnimatedSpendBar({
  widthPct,
  fillClass,
  trackClass,
  reducedMotion,
}: {
  widthPct: number;
  fillClass: string;
  trackClass: string;
  reducedMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div
      ref={ref}
      className={`mt-2 h-2 w-full overflow-hidden rounded-full ${trackClass}`}
    >
      <motion.div
        className={`h-full rounded-full ${fillClass}`}
        initial={
          reducedMotion ? { width: `${widthPct}%` } : { width: 0 }
        }
        animate={
          reducedMotion
            ? { width: `${widthPct}%` }
            : inView
              ? { width: `${widthPct}%` }
              : { width: 0 }
        }
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

const lightCardHover = {
  y: -4,
  boxShadow: '0 12px 40px -12px rgba(15, 23, 42, 0.12)',
  transition: { type: 'spring' as const, stiffness: 420, damping: 28 },
};

const darkCardHover = {
  y: -4,
  boxShadow: '0 16px 48px -12px rgba(0, 0, 0, 0.35)',
  transition: { type: 'spring' as const, stiffness: 420, damping: 28 },
};

export default function PrecisionScaleBento() {
  const reducedMotion = useReducedMotion();
  const [searchReplay, setSearchReplay] = useState(0);

  return (
    <section className="relative bg-[oklch(0.988_0.0041_91.45)] py-[60px] overflow-hidden font-sans text-[14px] text-[#111] antialiased">
      {/* Same container as TechnologySection (techonoly.tsx) so edges align */}
      <div className="max-w-[1100px] mx-auto px-[16px] lg:px-[40px]">
        <motion.div
          {...reveal}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 max-w-[640px]"
        >
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-[#111] leading-[1.15] mb-[18px]">
            Built for precision. <span className="text-brand-600">Designed for scale.</span>
          </h2>
          <p className="text-[14px] text-[#666] leading-[1.72] max-w-[520px]">
            We track your competitors&apos; Meta ads 24/7 and pull data on reach, estimated spend,
            demographics, ad copy, creatives, targeting, and overall strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          {/* Semantic Search — top left, 2 cols */}
          <motion.article
            {...reveal}
            whileHover={reducedMotion ? undefined : lightCardHover}
            style={{ boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)' }}
            onHoverStart={() => setSearchReplay((n) => n + 1)}
            className="group flex min-h-[260px] flex-col rounded-[14px] border border-[#E5E7EB] bg-[#F9FAFB] p-6 sm:p-7 lg:col-span-2 lg:row-start-1 lg:min-h-[320px]"
          >
            <div className="flex gap-4">
              <IconBox variant="muted">
                <Search className="h-[18px] w-[18px]" strokeWidth={2} />
              </IconBox>
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#111] leading-snug">
                  Semantic Search Engine
                </h3>
                <p className="mt-2 text-[14px] leading-[1.72] text-[#666]">
                  Search ads by concept, not just keywords. Find &quot;Summer sale discount ads that
                  reached at least 100k people&quot; in seconds across Facebook &amp; Instagram.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[12px] border border-slate-200/80 bg-white p-3 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] transition-shadow duration-300 group-hover:shadow-[0_8px_32px_-6px_rgba(15,23,42,0.1)]">
              <div className="flex items-center gap-2.5 rounded-[10px] border border-slate-100 bg-[#FAFAFA] px-3 py-2.5">
                <Search className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={2} />
                <div className="min-w-0 flex-1 overflow-hidden">
                  <TypingSearchLine replayKey={searchReplay} reducedMotion={reducedMotion} />
                </div>
                <kbd className="hidden shrink-0 items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2 py-0.5 font-sans text-[11px] font-medium text-slate-500 sm:inline-flex">
                  <span>⌘</span>
                  <span className="ml-0.5">K</span>
                </kbd>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-[52px] rounded-[10px] bg-[#ECEEF2]"
                    initial={reducedMotion ? false : { opacity: 0.6, scale: 0.98 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, duration: 0.35 }}
                  />
                ))}
              </div>
            </div>
          </motion.article>

          {/* Creative Analysis — bottom left */}
          <motion.article
            {...reveal}
            whileHover={reducedMotion ? undefined : lightCardHover}
            style={{ boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)' }}
            className="rounded-[14px] border border-[#E5E7EB] bg-white p-6 sm:p-7 lg:col-start-1 lg:row-start-2 lg:min-h-[200px]"
          >
            <div>
              <IconBox variant="white" className="h-9 w-9 rounded-[9px]">
                <BarChart2 className="h-[15px] w-[15px]" strokeWidth={2} />
              </IconBox>
              <h3 className="mt-4 text-[17px] font-semibold text-[#111] leading-snug">Creative Analysis</h3>
              <p className="mt-2 max-w-[260px] text-[13px] leading-[1.58] text-[#666]">
                Segmented images &amp; videos, with transcripts and text generated for deeper LLM
                analysis.
              </p>
            </div>
          </motion.article>

          {/* Team Sync — bottom middle */}
          <motion.article
            {...reveal}
            whileHover={reducedMotion ? undefined : lightCardHover}
            style={{ boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)' }}
            className="rounded-[16px] border border-[#E5E7EB] bg-white p-6 sm:p-7 lg:col-start-2 lg:row-start-2 lg:min-h-[200px] shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
          >
            <div>
              <IconBox variant="white" className="h-9 w-9 rounded-[9px]">
                <Briefcase className="h-[15px] w-[15px]" strokeWidth={2} />
              </IconBox>
              <h3 className="mt-4 text-[17px] font-semibold text-[#111] leading-snug">Team Sync</h3>
              <p className="mt-2 max-w-[260px] text-[13px] leading-[1.58] text-[#666]">
                Share collections with one click. Build your own segmented ad lists and analysis.
              </p>
            </div>
          </motion.article>

          {/* Estimated Spend — right, tall */}
          <motion.article
            {...reveal}
            whileHover={reducedMotion ? undefined : darkCardHover}
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)' }}
            className="order-last flex min-h-[360px] flex-col rounded-[16px] border border-slate-700/40 bg-[#0F172A] p-6 sm:p-7 text-white lg:order-none lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:min-h-[526px] shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
          >
            <div className="flex gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-white/20 bg-white/5 text-white">
                <Sparkles className="h-[18px] w-[18px]" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="text-xl sm:text-[22px] font-bold text-white leading-snug">Estimated Spend</h3>
                <p className="mt-2 text-[14px] leading-[1.72] text-slate-400">
                  Real-time estimation of spend per campaign and aggregated market share view.
                </p>
              </div>
            </div>

            <div className="mt-auto space-y-7 pt-10">
              <div>
                <div className="flex items-center justify-between gap-3 text-[14px] sm:text-[15px]">
                  <span className="font-medium text-white">Coca-cola Christmas</span>
                  <span className="shrink-0 font-semibold tabular-nums text-[#10B981]">+€12.4k</span>
                </div>
                <AnimatedSpendBar
                  widthPct={100}
                  fillClass="bg-white"
                  trackClass="bg-white/15"
                  reducedMotion={reducedMotion}
                />
              </div>
              <div>
                <div className="flex items-center justify-between gap-3 text-[14px] sm:text-[15px]">
                  <span className="font-medium text-slate-400">Prada Holiday Collection</span>
                  <span className="shrink-0 font-semibold tabular-nums text-[#10B981]">+€8.2k</span>
                </div>
                <AnimatedSpendBar
                  widthPct={30}
                  fillClass="bg-white/95"
                  trackClass="bg-slate-600/70"
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
