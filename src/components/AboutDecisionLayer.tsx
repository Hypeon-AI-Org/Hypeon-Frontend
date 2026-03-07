'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutDecisionLayer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.35, rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 bg-[#F9F7F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT CONTENT */}
        <div
          className={`transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="section-label mb-4">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            Building the Decision Layer{' '}
            <span className="text-slate-500">Behind $100B+ of E-commerce Ad Spend</span>
          </h2>

          <p className="mt-6 text-slate-500 leading-relaxed">
            E-commerce doesn't lose money because teams don't work hard. It loses money because decisions are made too late, on the wrong signals, or by gut instinct instead of evidence.
          </p>

          <p className="mt-8 text-lg font-semibold text-slate-900">
            The problem isn't execution.
            <br />
            <span className="text-slate-500 font-normal">It's decision quality.</span>
          </p>
        </div>

        {/* RIGHT — PROBLEM LIST */}
        <div className="flex flex-col gap-4 pt-4">
          {[
            "Products are scaled without proven demand",
            "Keywords look promising in tools but don't convert",
            "Ad creatives are chosen by opinion, not performance",
            "Pricing drifts while competitors win quietly",
          ].map((item, i) => (
            <div
              key={item}
              className={`
                relative overflow-hidden rounded-2xl
                border border-slate-200
                bg-white
                px-6 py-5 pl-9
                shadow-sm
                transition-all duration-700
                hover:-translate-y-1 hover:shadow-md
                ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
              `}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)', transitionDelay: `${i * 140}ms` }}
            >
              {/* Neutral left accent bar */}
              <span className="absolute left-0 top-4 h-[60%] w-[4px] rounded-full bg-slate-900" />
              <p className="text-slate-700 leading-relaxed text-sm">{item}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
