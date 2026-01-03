'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutCoreLayers() {
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
      { threshold: 0.4, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-28 bg-white overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2 className="text-3xl md:text-4xl font-display leading-tight text-slate-900">
            Built on{" "}
            <span className="text-pink-600">Two Core Layers</span>
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Hypeon AI is designed as a decision system—combining intelligence
            and execution into two tightly connected layers.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">

          {/* HYPEON INTELLIGENCE (PRIMARY) */}
          <div
            className={`
              relative rounded-[32px]
              bg-white/90 backdrop-blur-xl
              border border-slate-200
              p-14
              shadow-[0_20px_50px_rgba(15,23,42,0.08)]
              transition-all duration-700
              hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]
              ${visible ? 'opacity-100 translate-x-0 animate-float-slow' : 'opacity-0 -translate-x-12'}
            `}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
          >
            <span className="absolute left-0 top-6 h-[85%] w-[4px] rounded-full bg-pink-500/80" />

            <h3 className="text-xl font-display font-semibold text-slate-900">
              Hypeon Intelligence
            </h3>

            <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
              A decision engine that combines demand signals, competition data,
              pricing insights, and creative patterns to surface
              <span className="text-slate-900 font-medium"> what actually works</span>.
            </p>

            <ul className="mt-10 space-y-4 text-sm text-slate-600">
              {[
                'Demand & momentum signals',
                'Competitive & pricing intelligence',
                'Creative & performance patterns',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-pink-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* HYPEON COPILOT */}
          <div
            className={`
              relative rounded-[32px]
              bg-white/90 backdrop-blur-xl
              border border-slate-200
              p-12
              shadow-[0_20px_50px_rgba(15,23,42,0.08)]
              transition-all duration-700
              hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]
              ${visible ? 'opacity-100 translate-x-0 animate-float-slower' : 'opacity-0 translate-x-12'}
            `}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)', transitionDelay: '120ms' }}
          >
            <span className="absolute left-0 top-6 h-[85%] w-[4px] rounded-full bg-pink-500/80" />

            <h3 className="text-xl font-display text-slate-900">
              Hypeon Copilot{" "}
              <span className="text-slate-500 text-base">(Basic & Pro)</span>
            </h3>

            <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
              An AI decision partner that helps teams validate ideas,
              prioritize actions, and move faster—
              <span className="text-slate-900 font-medium"> without guessing</span>.
            </p>

            <ul className="mt-10 space-y-4 text-sm text-slate-600">
              {[
                'Idea validation & decision checks',
                'Action prioritization',
                'Faster execution with confidence',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-pink-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* FLOATING ANIMATION */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatSlower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-slow {
          animation: floatSlow 2s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: floatSlower 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
