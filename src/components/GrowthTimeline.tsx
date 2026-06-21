'use client';

import { useEffect, useRef, useState } from 'react';
import Section, { Cell } from './Section';

const milestones = [
  {
    year: 'Phase 1 · Founded',
    title: 'The Problem & The Vision',
    desc: 'HypeOn AI was founded in 2025 after watching e-commerce teams repeatedly make expensive decisions with lagging data and platform-inflated attribution.',
  },
  {
    year: 'Phase 2 · Product',
    title: 'Intelligence + Studio',
    desc: 'Two connected engines launched — Hypeon Intelligence to decode competitors across every platform, and HypeOn Studio to turn those signals into scroll-stopping creative.',
  },
  {
    year: 'Phase 3 · Now',
    title: 'Customer-Value-Driven Growth',
    desc: 'Scaling with the brands that depend on us. Every feature driven by real customer outcomes, not vanity roadmap items.',
  },
  {
    year: 'The Ambition',
    title: 'Define How E-Commerce Decides',
    desc: 'Become the global standard for product and marketing decisions — the system teams open before they spend, not after.',
  },
];

export default function GrowthTimeline() {
  const ref = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !lineRef.current) return;
    const timer = setTimeout(() => setLineWidth(100), 100);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <Section cols={1} sectionRef={ref} className="font-sans">
      {/* HEADER */}
      <Cell
        className={`text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2">
          The Road Ahead
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-4xl text-slate-900 tracking-tight">
          From idea to industry <span className="text-brand-600">standard.</span>
        </h2>

        <p className="mt-3 text-sm text-slate-600">
          We&apos;re building for durability, not shortcuts.
        </p>
      </Cell>

      {/* TIMELINE */}
      <Cell bleed className="overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
        <div className="relative">
          {/* background line */}
          <div className="absolute top-4 left-0 right-0 h-[1px] bg-slate-200 rounded-full" />

          {/* animated line */}
          <div
            ref={lineRef}
            className="absolute top-4 left-0 h-[1px] bg-gradient-to-r from-brand-600 to-brand-500 rounded-full transition-all duration-1000"
            style={{ width: `${lineWidth}%` }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
            {milestones.map((m, i) => (
              <div
                key={m.title}
                className={`
                  relative flex flex-col items-center text-center
                  transition-all duration-700
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                {/* dot */}
                <div className="relative z-10 flex justify-center pt-2 mb-4">
                  <div
                    className={`
                      h-3 w-3 rounded-full bg-brand-600 ring-2 ring-white shadow
                      transition-all duration-500
                      ${visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                    `}
                    style={{ transitionDelay: `${500 + i * 100}ms` }}
                  />
                </div>

                {/* card */}
                <div
                  className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-left
                  hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                    {m.year}
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-slate-900">
                    {m.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <p
          className={`
            mt-6 text-center text-xs text-slate-500 max-w-xl mx-auto
            transition-all duration-700 delay-700
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          This roadmap is intentional, measurable, and focused on building long-term value.
        </p>
      </Cell>
    </Section>
  );
}
