'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutDecisionLayer() {
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
      { threshold: 0.45, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT CONTENT */}
        <div
          className={`transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2 className="text-3xl md:text-4xl font-display text-slate-900 leading-tight">
            We’re Building the{" "}
            <span className="text-pink-600">Decision Layer</span>{" "}
            Behind $100B+ of E-commerce Ad Spend
          </h2>

          <p className="mt-6 text-slate-600 leading-relaxed">
            E-commerce doesn’t lose money because teams don’t work hard.
            It loses money because decisions are made too late, on the wrong
            signals, or by gut instinct instead of evidence.
          </p>

          <p className="mt-10 text-lg font-medium text-slate-900">
            The problem isn’t execution.
            <br />
            <span className="text-pink-600">It’s decision quality.</span>
          </p>
        </div>

        {/* RIGHT ROW (PREMIUM ANIMATION) */}
        <div className="flex flex-col gap-6">
          {[
            "Products are scaled without proven demand",
            "Keywords look promising in tools but don’t convert",
            "Ad creatives are chosen by opinion, not performance",
            "Pricing drifts while competitors win quietly",
          ].map((item, i) => (
            <div
              key={item}
              className={`
                group relative overflow-hidden rounded-2xl
                border border-slate-200/60
                bg-white/85 backdrop-blur-md
                px-6 py-5 pl-9
                shadow-[0_6px_20px_rgba(0,0,0,0.04)]
                transition-all duration-700
                hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
                ${visible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'}
              `}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)', transitionDelay: `${i * 140}ms` }}
            >
              {/* LEFT ACCENT BAR */}
              <span className="absolute left-0 top-4 h-[60%] w-[4px] rounded-full bg-pink-500/80" />

              {/* SUBTLE SHINE (PREMIUM) */}
              <span className="pointer-events-none absolute inset-0 opacity-0
                group-hover:opacity-100 transition-opacity duration-500
                bg-gradient-to-r from-transparent via-pink-500/10 to-transparent" />

              <p className="relative text-slate-700 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
