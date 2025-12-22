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
    <section ref={ref} className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h2 className="text-3xl md:text-4xl font-display text-brand-600">
            Impact
          </h2>
          <p className="mt-3 text-slate-600">
            Hypeon AI is built around outcomes, not opinions.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {items.map((item, i) => (
            <div
              key={item.title}
              className={`
                relative rounded-2xl bg-white
                border border-slate-200
                p-8
                transition-all duration-700
                hover:-translate-y-2 hover:shadow-md
                ${visible ? 'opacity-100 translate-y-0 animate-impact-float' : 'opacity-0 translate-y-6'}
              `}
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              {/* Accent line */}
              <span className="absolute left-0 top-6 h-10 w-[3px] bg-pink-500 rounded-full" />

              {/* Metric */}
              <div className="text-3xl font-display font-semibold text-slate-900">
                {item.value}
              </div>

              {/* Title */}
              <h3 className="mt-3 font-medium text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* FLOATING */}
      <style jsx global>{`
        @keyframes impactFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-impact-float {
          animation: impactFloat 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
