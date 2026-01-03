'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutWhatWeDo() {
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
    <section ref={ref} className="relative py-32 bg-white overflow-hidden">
      {/* Soft background */}
      <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_80%_20%,rgba(236,72,153,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-start">

        {/* LEFT — CONTENT */}
        <div
          className={`transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2 className="text-3xl md:text-4xl font-display leading-tight text-slate-900">
            What <span className="text-pink-600">Hypeon AI</span> Does
          </h2>

          <div className="mt-8 space-y-4 text-slate-600 leading-relaxed max-w-xl">
            <p>
              Hypeon AI is{" "}
              <span className="text-slate-900 font-medium">
                not another analytics dashboard
              </span>.
            </p>

            <p>
              It’s a{" "}
              <span className="text-slate-900 font-medium">
                decision system
              </span>{" "}
              designed to help e-commerce teams act with confidence
              before money is spent.
            </p>

            <p className="text-slate-900 font-medium">
              We focus on decisions that compound.
            </p>
          </div>
        </div>

        {/* RIGHT — BOXES */}
        <div className="flex flex-col gap-6">
          {[
            {
              title: 'Product selection & prioritization',
              desc: 'Identify which products are worth scaling before ads go live.',
            },
            {
              title: 'Keyword focus & demand validation',
              desc: 'Back keywords with real buying intent, not surface-level metrics.',
            },
            {
              title: 'Creative direction & performance signals',
              desc: 'Scale ad messages based on evidence, not opinion.',
            },
          
          ].map((item, i) => (
            <div
              key={item.title}
              className={`
                relative rounded-2xl
                border border-slate-200/60
                bg-white/80 backdrop-blur-md
                px-6 py-5 pl-9
                shadow-sm
                transition-all duration-700
                hover:-translate-y-1 hover:shadow-lg
                ${visible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'}
              `}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)', transitionDelay: `${i * 140}ms` }}
            >
              {/* LEFT ACCENT BAR */}
              <span className="absolute left-0 top-5 h-[55%] w-[4px] rounded-full bg-pink-500/80" />

              <h3 className="text-slate-900 font-medium">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
