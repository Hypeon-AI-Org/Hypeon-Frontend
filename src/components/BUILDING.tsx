'use client';

import { useEffect, useRef, useState } from 'react';

export default function WhoWeAreBuildingFor() {
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
      { threshold: 0.35 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const audiences = [
    {
      title: 'D2C Brands',
      desc: 'Scaling across channels where every decision compounds over time.',
    },
    {
      title: 'Marketplaces',
      desc: 'Managing thousands of SKUs while balancing demand, competition, and pricing.',
    },
    {
      title: 'Agencies',
      desc: 'Accountable for performance outcomes, not promises or vanity metrics.',
    },
    {
      title: 'Enterprise Retail',
      desc: 'Teams balancing scale, margin, and speed in competitive global markets.',
    },
  ];

  return (
    <section ref={ref} className=" py-32
    relative
    overflow-hidden
    bg-gradient-to-br
    from-pink-50/40
    via-white
    to-indigo-50/40
  ">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h2 className="text-3xl md:text-4xl font-display text-slate-900">
            Who We’re <span className="text-pink-600">Building For</span>
          </h2>

          <p className="mt-4 text-slate-600">
            Hypeon AI is built for teams where decisions compound.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {audiences.map((item, i) => (
            <div
              key={item.title}
              className={`
                relative rounded-3xl bg-white
                border border-slate-200
                p-8
                shadow-[0_20px_60px_rgba(15,23,42,0.08)]
                transition-all duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(15,23,42,0.14)]
                ${visible ? 'opacity-100 translate-y-0 animate-float-slow' : 'opacity-0 translate-y-6'}
              `}
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              {/* Accent bar */}
              <span className="absolute left-0 top-6 h-[70%] w-[3px] rounded-full bg-pink-500/80" />

              <h3 className="text-lg font-medium text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float-slow {
          animation: floatSlow 9s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
