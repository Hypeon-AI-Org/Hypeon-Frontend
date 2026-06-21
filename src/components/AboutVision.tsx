'use client';

import { useEffect, useRef, useState } from 'react';
import Section, { Cell } from './Section';

const decisions = [
  {
    category: 'INTELLIGENCE',
    title: "Decode Your Competitor's Playbook",
    description:
      'See their spend, reach, and winning angles in seconds — trained on 200M+ ads.',
    icon: 'chart-up',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: 'Spot Breakout Products Early',
    description:
      "See what's breaking out across the market before it hits mainstream — weeks ahead of competitors.",
    icon: 'key',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: 'Track Every Platform 24/7',
    description:
      'Meta, Google, TikTok, LinkedIn, Pinterest, and Instagram — every signal, structured and searchable.',
    icon: 'leaf',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: "Find Competitors' Best Ads",
    description:
      'See which ads your competitors are running and which are actually working, before you spend testing.',
    icon: 'target',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: 'Competitor Social Analysis',
    description:
      'Know their winning angles, top products, and engagement spikes in real time.',
    icon: 'layers',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: 'Competitor Review Analysis',
    description:
      'Read what their customers hate. Turn competitor weaknesses into your biggest selling points.',
    icon: 'star',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: 'Ask Copilot, Your AI Analyst',
    description:
      'Find pockets of demand nobody is selling into — just ask, and get an answer backed by evidence.',
    icon: 'building',
    iconColor: 'text-slate-900',
  },
  {
    category: 'STUDIO',
    title: 'Generate Scroll-Stopping Creative',
    description:
      'Static, video, and UGC creatives in seconds — on-brand and built to convert.',
    icon: 'cube',
    iconColor: 'text-slate-900',
  },
  {
    category: 'STUDIO',
    title: 'Create From Real Performance Data',
    description:
      'Every creative is trained on what actually drives results — AI-first, not guesswork.',
    icon: 'budget',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: 'See Your Real ROAS',
    description:
      'Not what Google claims. Not what Meta reports. Actual return on every dollar — zero duplication.',
    icon: 'chart-bar',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: 'Know Your Real CPA Per Channel',
    description:
      'True cost of every sale on every channel, side by side, with zero platform bias.',
    icon: 'calculator',
    iconColor: 'text-slate-900',
  },
  {
    category: 'INTELLIGENCE',
    title: 'Know Which Campaign to Scale',
    description:
      'One clear Scale, Hold, or Cut signal per campaign — every single morning.',
    icon: 'lightning',
    iconColor: 'text-slate-900',
  },
];

function DecisionIcon({ name, className }: { name: string; className?: string }) {
  const c = className ?? '';
  switch (name) {
    case 'chart-up':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 4 5-9" />
        </svg>
      );
    case 'key':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7.5" cy="15.5" r="3.5" />
          <path d="M11 12l2.5-2.5L17 14l-1.5 1.5" />
          <path d="M14 9l3-3 4 4-6 6-2-2" />
        </svg>
      );
    case 'leaf':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 18 4c0 1.5.5 3.5 1 5.2A7 7 0 0 1 11 20z" />
          <path d="M2 22c1.5-1.5 4-2 6-2 2 0 4.5.5 6 2" />
        </svg>
      );
    case 'target':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'layers':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      );
    case 'star':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15 9 22 9 17 14 18 22 12 18 6 22 7 14 2 9 9 9" />
        </svg>
      );
    case 'building':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
          <path d="M18 9h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
          <path d="M10 14h4" />
        </svg>
      );
    case 'cube':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="m3.27 6.96 8.73 4.91 8.73-4.91" />
          <path d="M12 22.08V12" />
        </svg>
      );
    case 'budget':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12" />
          <path d="M12 12l4-3" />
          <path d="M12 12l-4 3" />
        </svg>
      );
    case 'chart-bar':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M7 16v-6" />
          <path d="M12 16v-4" />
          <path d="M17 16v-2" />
          <path d="M17 14h.01" />
        </svg>
      );
    case 'calculator':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M8 6h8" />
          <path d="M8 10h1" />
          <path d="M11 10h1" />
          <path d="M14 10h1" />
          <path d="M17 10h1" />
          <path d="M8 14h1" />
          <path d="M11 14h1" />
          <path d="M14 14h1" />
          <path d="M17 14h1" />
        </svg>
      );
    case 'lightning':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AboutVision() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section cols={3} sectionRef={ref} className="font-sans">
      {/* HEADER — spans the full grid row, hairline beneath separates it from the cards */}
      <Cell className="md:col-span-3">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xs tracking-[0.2em] uppercase font-medium text-gray-500 mb-2">
            What HypeOn Does
          </p>

          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            12 decisions. <span className="text-brand-600">Zero guesswork.</span>
          </h2>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Two engines, one workflow — every capability answers a question your team asks every week, with evidence, not opinion.
          </p>
        </div>
      </Cell>

      {/* CARDS — each decision in its own Cell for internal hairlines */}
      {decisions.map((item, i) => (
        <Cell
          key={item.title}
          className={`text-left transition-all duration-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
              transitionDelay: `${Math.min(i * 50, 400)}ms`,
            }}
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-700 mb-3">
              <DecisionIcon name={item.icon} className={`w-5 h-5 ${item.iconColor}`} />
            </div>

            <h3 className="font-semibold text-slate-900 text-base">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        </Cell>
      ))}
    </Section>
  );
}
