'use client';

import { useEffect, useRef, useState } from 'react';

const milestones = [
  {
    year: 'Phase 1 · Founded',
    title: 'The Problem & The Vision',
    desc: 'HypeOn AI was founded in 2025 after watching e-commerce teams start every campaign from a blank page - guessing at angles and launching on gut feel.',
  },
  {
    year: 'Phase 2 · Product',
    title: 'Find + Create',
    desc: 'Two connected engines launched - HypeOn Intelligence to find the ads already winning in any category, and HypeOn Studio to turn them into scroll-stopping static, video, and UGC creative.',
  },
  {
    year: 'Phase 3 · Now',
    title: 'Customer-Value-Driven Growth',
    desc: 'Scaling with the brands that depend on us. Every feature driven by real customer outcomes, not vanity roadmap items.',
  },
  {
    year: 'The Ambition',
    title: 'Define How Brands Win',
    desc: 'Become the global standard for how e-commerce brands find what works and build their next winning ad - before they spend, not after.',
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
    <section ref={ref} className="bg-white pt-16 pb-6 sm:pt-20 sm:pb-8 lg:pt-28 lg:pb-10">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">The Road Ahead</p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            From idea to industry <span className="text-slate-900">standard.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            We&apos;re building for durability, not shortcuts.
          </p>
        </div>

        <div className="relative mt-14 lg:mt-20">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-slate-200 lg:block" />
          <div
            ref={lineRef}
            className="absolute left-0 top-[7px] hidden h-px bg-slate-900 transition-all duration-1000 lg:block"
            style={{ width: `${lineWidth}%` }}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {milestones.map((m, i) => (
              <div
                key={m.title}
                className={`relative flex flex-col items-start text-left transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                <div
                  className={`relative z-10 mb-4 hidden h-[15px] w-[15px] items-center justify-center rounded-full bg-slate-900 ring-4 ring-white transition-all duration-500 lg:flex ${
                    visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                  style={{ transitionDelay: `${500 + i * 100}ms` }}
                />

                <div className="w-full flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{m.year}</p>
                  <h3 className="mt-1 text-base font-semibold text-slate-900">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p
          className={`mx-auto mt-10 max-w-xl text-center text-xs text-slate-400 transition-all duration-700 delay-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          This roadmap is intentional, measurable, and focused on building long-term value.
        </p>
      </div>
    </section>
  );
}
