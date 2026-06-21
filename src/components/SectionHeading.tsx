'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface SectionHeadingProps {
  /** Small uppercase label above the title — the editorial / magazine cue. Monochrome. */
  eyebrow?: string;
  /** Main heading. */
  title: React.ReactNode;
  /** Optional lead paragraph under the title */
  subtitle?: React.ReactNode;
  /** "center" (default) or "left" */
  align?: 'center' | 'left';
  className?: string;
}

/**
 * Shared, consistent section heading used across the homepage.
 * Every section gets the same rhythm: eyebrow → big title → lead.
 *
 * Monochrome only (neutral slate) — no accent/brand color, per design direction.
 * This is the single place to tune the homepage heading style.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-100px' }}
      className={`${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-2.5 mb-4 ${isCenter ? 'justify-center' : ''}`}>
          <span className="h-px w-6 bg-neutral-300" />
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black leading-[1.08]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
