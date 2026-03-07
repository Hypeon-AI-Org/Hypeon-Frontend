'use client';

import { useEffect, useRef, useState } from 'react';

export default function GrowthTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const milestones = [
    { year: '2025', title: 'Founded', desc: 'Hypeon AI is founded to solve real, repeated e-commerce decision failures.' },
    { year: '2026', title: 'Product Launch', desc: 'Hypeon Intelligence and Hypeon Copilot go live.' },
    { year: 'End 2026', title: '$1M ARR', desc: 'Growth driven by customer value, not shortcuts.' },
    { year: '2030', title: 'Go Public', desc: 'A long-term ambition to define how e-commerce decisions are made globally.' },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#F9F7F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 mb-16
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="section-label mb-4">Roadmap</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Growth Timeline
          </h2>
          <p className="mt-4 text-slate-500">
            We're building for durability, not shortcuts.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          {/* Horizontal line */}
          <div
            className={`absolute top-5 left-0 right-0 h-px bg-slate-200 transition-all duration-700 ${visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
            style={{ transformOrigin: 'left' }}
          />

          {/* POINTS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {milestones.map((m, i) => (
              <div
                key={m.title}
                className={`relative text-center px-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Dot — neutral */}
                <div className="relative z-10 flex justify-center">
                  <div className="h-4 w-4 rounded-full bg-slate-900 ring-4 ring-white" />
                </div>

                {/* Content */}
                <div className="mt-6">
                  <p className="text-sm font-medium text-slate-400">{m.year}</p>
                  <h3 className="mt-1 font-semibold text-slate-900">{m.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 text-center text-sm text-slate-400 max-w-2xl mx-auto">
          This roadmap is intentional, measurable, and focused on building long-term value.
        </p>
      </div>
    </section>
  );
}
