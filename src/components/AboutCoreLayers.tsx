'use client';

import { useEffect, useRef, useState } from 'react';
import Section, { Cell } from './Section';

const layers = [
  {
    tag: 'INTELLIGENCE',
    title: 'Hypeon Intelligence',
    description:
      'The intelligence engine. Decode any competitor\'s playbook in seconds — their spend, reach and winning angles, laid bare.',
    accent: 'green',
    features: [
      'Competitor spend, reach & winning-angle decoding',
      '200M+ ads across Meta, Google, TikTok, LinkedIn & Pinterest',
      'Breakout product detection before they peak',
      'Copilot — ask your ad data in plain English',
      'Real ROAS & wasted-spend analytics across channels',
    ],
  },
  {
    tag: 'STUDIO',
    title: 'HypeOn Studio',
    description:
      'The creative engine. AI-first ad creative built to convert — turning intelligence into scroll-stopping assets in seconds, not weeks.',
    accent: 'orange',
    features: [
      'Scroll-stopping static, video & UGC in seconds',
      'Trained on real performance data',
      'On-brand every time',
      'Fewer review rounds, faster briefs',
      'Any asset for any platform',
    ],
  },
];

const accentStyles = {
  green: {
    border: 'border-t-[#22c55e]',
    tag: 'bg-emerald-100 text-emerald-700',
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
    <Section cols={2} sectionRef={ref}>
      {/* HEADER */}
      <Cell className="md:col-span-2 text-center">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
            The Platform
          </p>

          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
            Two engines. <span className="text-[#696863]">One growth system.</span>
          </h2>

          <p className="mt-4 text-sm text-slate-500 leading-relaxed">
            Intelligence for finding and decoding what&apos;s actually working — every competitor&apos;s spend, reach and winning angles. Studio for turning those insights into creative that converts. Two engines that replace guesswork with evidence, then ship the work.
          </p>
        </div>
      </Cell>

      {/* CARDS — each engine is its own grid cell; the section hairlines form the dividers */}
      {layers.map((layer, i) => {
        const style = accentStyles[layer.accent as keyof typeof accentStyles];

        return (
          <Cell key={layer.title}>
            <div
              className={`
                group relative border-t-4 pt-5
                transition-all duration-500
                ${style.border}
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
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
          </Cell>
        );
      })}
    </Section>
  );
}
