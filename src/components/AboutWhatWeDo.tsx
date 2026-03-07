'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutWhatWeDo() {
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
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">

        {/* LEFT — CONTENT */}
        <div
          className={`transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="section-label mb-4">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            What HypeOn AI Does
          </h2>

          <div className="mt-8 space-y-4 text-slate-500 leading-relaxed">
            <p>
              Hypeon AI is{' '}
              <span className="text-slate-900 font-medium">not another analytics dashboard</span>.
            </p>
            <p>
              It's a{' '}
              <span className="text-slate-900 font-medium">decision system</span>{' '}
              designed to help e-commerce teams act with confidence before money is spent.
            </p>
            <p className="text-slate-900 font-medium">
              We focus on decisions that compound.
            </p>
          </div>
        </div>

        {/* RIGHT — BOXES */}
        <div className="flex flex-col gap-5">
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
              <span className="absolute left-0 top-5 h-[55%] w-[4px] rounded-full bg-slate-900" />
              <h3 className="text-slate-900 font-semibold text-sm">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
