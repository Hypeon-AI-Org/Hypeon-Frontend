'use client';

import { motion } from 'framer-motion';

import type { Grade } from '@/lib/tools/adRubric';

const ease = [0.22, 1, 0.36, 1] as const;

/** Pill styles for a check's grade, shared by the ad and hook scorecards. */
export const GRADE: Record<Grade, { label: string; badge: string }> = {
  good: { label: 'Strong', badge: 'bg-[#e3f9ee] text-[#007a45]' },
  ok: { label: 'Needs work', badge: 'bg-[#fdf2df] text-[#94600b]' },
  poor: { label: 'Weak', badge: 'bg-[#fdeaea] text-[#b4232a]' },
};

/** Ring colour for a 0-100 score: green from 70, amber from 45, red below. */
export function scoreColor(score: number): string {
  if (score >= 70) return '#00b86b';
  if (score >= 45) return '#f2a93b';
  return '#e5484d';
}

/** Animated ring for a 0-100 score. */
export function ScoreRing({ score }: { score: number }) {
  const size = 132;
  const stroke = 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f1f1" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={scoreColor(score)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * score) / 100 }}
          transition={{ duration: 1.1, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[38px] font-medium leading-none tracking-[-0.03em] text-[#121212]">{score}</span>
        <span className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#9a9a9a]">of 100</span>
      </div>
    </div>
  );
}
