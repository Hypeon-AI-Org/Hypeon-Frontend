'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutImpact() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      value: '90%',
      title: 'Lower wasted ad spend',
      desc: 'By eliminating decisions made on weak or late signals.',
    },
    {
      value: '79%',
      title: 'Higher conversion rates',
      desc: 'By focusing spend on what actually converts.',
    },
    {
      value: '↑',
      title: 'Higher profitability',
      desc: 'Through smarter allocation of budget and focus.',
    },
    {
      value: '24/7',
      title: 'Pricing intelligence',
      desc: 'Always-on competitor pricing insights across markets.',
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="section-label mb-4">Impact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Built around outcomes, not opinions.
          </h2>
        </div>

        {/* GRID */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`
                relative rounded-2xl bg-white
                border border-slate-200
                p-8
                transition-all duration-700
                hover:-translate-y-2 hover:shadow-md
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Accent line — neutral */}
              <span className="absolute left-0 top-6 h-10 w-[3px] bg-slate-900 rounded-full" />

              {/* Metric */}
              <div className="text-3xl font-bold text-slate-900">
                {item.value}
              </div>

              {/* Title */}
              <h3 className="mt-3 font-semibold text-slate-900 text-sm">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
