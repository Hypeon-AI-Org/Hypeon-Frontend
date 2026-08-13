'use client';

import { useEffect, useRef, useState } from 'react';

const layers = [
  {
    tag: 'INTELLIGENCE',
    title: 'Hypeon Intelligence',
    description:
      "The intelligence engine. Decode any competitor's playbook in seconds - their spend, reach and winning angles, laid bare.",
    features: [
      'Competitor spend, reach & winning-angle decoding',
      '200M+ ads across Meta, Google, TikTok, LinkedIn & Pinterest',
      'Breakout product detection before they peak',
      'Copilot - ask your ad data in plain English',
      'Real ROAS & wasted-spend analytics across channels',
    ],
  },
  {
    tag: 'STUDIO',
    title: 'HypeOn Studio',
    description:
      'The creative engine. AI-first ad creative built to convert - turning intelligence into scroll-stopping assets in seconds, not weeks.',
    features: [
      'Scroll-stopping static, video & UGC in seconds',
      'Trained on real performance data',
      'On-brand every time',
      'Fewer review rounds, faster briefs',
      'Any asset for any platform',
    ],
  },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.416 3.376a.75.75 0 01.208 1.04l-5.5 7.5a.75.75 0 01-1.154.114l-3.5-3.5a.75.75 0 111.06-1.06l2.894 2.893 4.966-6.77a.75.75 0 011.04-.207z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function AboutCoreLayers() {
  const ref = useRef<HTMLElement | null>(null);
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

  return (
    <section ref={ref} className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-3">The Platform</p>
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-slate-900">
            Two engines. <span className="text-slate-900">One growth system.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-500">
            Intelligence for finding and decoding what&apos;s actually working - every
            competitor&apos;s spend, reach and winning angles. Studio for turning those insights
            into creative that converts. Two engines that replace guesswork with evidence, then
            ship the work.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16">
          {layers.map((layer, i) => (
            <div
              key={layer.title}
              className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 sm:p-8 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="inline-block rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {layer.tag}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-slate-900">{layer.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{layer.description}</p>

              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {layer.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-[3px] text-slate-900">
                      <CheckIcon />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
