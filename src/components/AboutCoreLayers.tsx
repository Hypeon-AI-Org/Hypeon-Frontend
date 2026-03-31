'use client';

import { useEffect, useRef, useState } from 'react';

const layers = [
  {
    tag: 'INTELLIGENCE',
    title: 'HypeOn Intelligence',
    description:
      'The trend engine. Surface rising products and keywords before your competitors notice the signal.',
    accent: 'green',
    features: [
      'Emerging product opportunity detection',
      'Trending keyword & buying-intent scoring',
      'Competitor ad & creative analysis',
      'Competitor social & Trustpilot intelligence',
      'Market entry & whitespace detection',
    ],
  },
  {
    tag: 'COPILOT',
    title: 'HypeOn Copilot',
    description:
      'Your AI decision partner. Validates ideas and tells you what to do next with confidence.',
    accent: 'blue',
    features: [
      'Idea validation against live demand',
      'Action prioritization & sequencing',
      'Inventory planning from forward demand',
      'Budget allocation recommendations',
      'Real-time opportunity alerts',
    ],
  },
  {
    tag: 'ANALYTICS',
    title: 'HypeOn Analytics',
    description:
      'The truth layer. See your real ROAS across every channel with zero platform bias.',
    accent: 'orange',
    features: [
      'Real ROAS across every channel, no duplication',
      'True CPA per channel, side by side',
      'Scale / Hold / Cut signals per campaign',
      'Cross-channel budget optimization',
      'Wasted spend identification',
    ],
  },
];

const accentStyles = {
  green: {
    border: 'border-t-[#22c55e]',
    tag: 'bg-emerald-100 text-emerald-700',
  },
  blue: {
    border: 'border-t-blue-400',
    tag: 'bg-blue-100 text-blue-700',
  },
  orange: {
    border: 'border-t-amber-400',
    tag: 'bg-amber-100 text-amber-700',
  },
};

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

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b bg-[oklch(0.988_0.0041_91.45)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div
          className={`max-w-2xl mx-auto text-center mb-10 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
          The Platform
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          Three engines. <span className="text-brand-600">One decision system.</span>
          </h2>

          <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          Intelligence for finding what's rising. Copilot for acting on it. Analytics for knowing what actually worked. Three layers that replace guesswork with evidence at every stage.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          {layers.map((layer, i) => {
            const style = accentStyles[layer.accent as keyof typeof accentStyles];

            return (
              <div
                key={layer.title}
                className={`
                  group relative rounded-2xl bg-white border border-slate-200 border-t-4 p-6
                  shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500
                  ${style.border}
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{ transitionDelay: `${i * 120}ms` }}
              >

                {/* glow hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-white/40 to-transparent rounded-2xl" />

                <span
                  className={`inline-block px-3 py-1 rounded-md text-xs font-semibold tracking-wide uppercase ${style.tag}`}
                >
                  {layer.tag}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {layer.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {layer.description}
                </p>

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
            );
          })}
        </div>

      </div>
    </section>
  );
}