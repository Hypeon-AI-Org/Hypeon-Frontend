'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutCoreLayers() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.3, rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ease-out mb-16
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="section-label mb-4">Architecture</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            Built on Two Core Layers
          </h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Hypeon AI is designed as a decision system — combining intelligence and execution into two tightly connected layers.
          </p>
        </div>

        {/* CARDS — two equal columns */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* HYPEON INTELLIGENCE */}
          <div
            className={`
              relative rounded-2xl bg-white border border-slate-200 p-10
              shadow-sm transition-all duration-700
              hover:-translate-y-2 hover:shadow-md
              ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
            `}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
          >
            <span className="absolute left-0 top-6 h-[80%] w-[4px] rounded-full bg-slate-900" />
            <h3 className="text-xl font-semibold text-slate-900">
              Hypeon Intelligence
            </h3>
            <p className="mt-4 text-slate-500 leading-relaxed">
              A decision engine that combines demand signals, competition data, pricing insights, and creative patterns to surface{' '}
              <span className="text-slate-900 font-medium">what actually works</span>.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-500">
              {[
                'Demand & momentum signals',
                'Competitive & pricing intelligence',
                'Creative & performance patterns',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* HYPEON COPILOT */}
          <div
            className={`
              relative rounded-2xl bg-white border border-slate-200 p-10
              shadow-sm transition-all duration-700
              hover:-translate-y-2 hover:shadow-md
              ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
            `}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)', transitionDelay: '120ms' }}
          >
            <span className="absolute left-0 top-6 h-[80%] w-[4px] rounded-full bg-slate-400" />
            <h3 className="text-xl font-semibold text-slate-900">
              Hypeon Copilot{' '}
              <span className="text-slate-500 text-base font-normal">(Basic & Pro)</span>
            </h3>
            <p className="mt-4 text-slate-500 leading-relaxed">
              An AI decision partner that helps teams validate ideas, prioritize actions, and move faster —{' '}
              <span className="text-slate-900 font-medium">without guessing</span>.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-500">
              {[
                'Idea validation & decision checks',
                'Action prioritization',
                'Faster execution with confidence',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
