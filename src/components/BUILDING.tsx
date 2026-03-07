'use client';

import { useEffect, useRef, useState } from 'react';

export default function WhoWeAreBuildingFor() {
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

  const audiences = [
    { title: 'D2C Brands', desc: 'Scaling across channels where every decision compounds over time.' },
    { title: 'Marketplaces', desc: 'Managing thousands of SKUs while balancing demand, competition, and pricing.' },
    { title: 'Agencies', desc: 'Accountable for performance outcomes, not promises or vanity metrics.' },
    { title: 'Enterprise Retail', desc: 'Teams balancing scale, margin, and speed in competitive global markets.' },
  ];

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 mb-16
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="section-label mb-4">Who We Serve</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Who We're Building For
          </h2>
          <p className="mt-4 text-slate-500">
            Hypeon AI is built for teams where decisions compound.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, i) => (
            <div
              key={item.title}
              className={`
                relative rounded-2xl bg-white border border-slate-200 p-8 shadow-sm
                transition-all duration-700
                hover:-translate-y-2 hover:shadow-md
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)', transitionDelay: `${i * 80}ms` }}
            >
              {/* Neutral accent bar */}
              <span className="absolute left-0 top-6 h-[70%] w-[3px] rounded-full bg-slate-900" />
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
