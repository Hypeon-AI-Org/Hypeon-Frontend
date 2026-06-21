'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Section, { Cell } from './Section';


const cards = [
  {
    title: 'The Problem',
    description:
      "Teams guess at what their competitors are doing, bid on stale keywords, and ship creatives because someone 'had a feeling.'",
    icon: 'target',
  },
  {
    title: 'Our Solution',
    description:
      'Two engines working together — Hypeon Intelligence decodes competitor spend, reach and winning angles, while HypeOn Studio turns those insights into creative that converts.',
    icon: 'lightning',
  },
  {
    title: 'Decisions, Not Dashboards',
    description:
      "Instead of charts, we surface what matters: your competitor's playbook, wasted spend, and clear opportunities.",
    icon: 'message',
  },
  {
    title: 'Built to Scale',
    description:
      'Trained on 200M+ ads, built for teams who need to spend less, sell more, and keep what they earn.',
    icon: 'network',
  },
];

function StoryIcon({ name }: { name: string }) {
  switch (name) {
    case 'target':
      return (
        <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'lightning':
      return (
        <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'message':
      return (
        <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'network':
      return (
        <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AboutStory() {
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
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section cols={2} sectionRef={ref} className="font-sans">

      {/* LEFT IMAGE */}
      <Cell bleed className="flex items-center justify-center px-6 py-12 sm:px-10 sm:py-16">
        <div
          className={`w-full transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="relative max-w-md mx-auto rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/4]">
            <Image
              src="/about/story.webp"
              alt="Business analytics and market research"
              fill
              className="object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </Cell>

      {/* RIGHT CONTENT */}
      <Cell>
        <p
          className={`text-xs tracking-[0.2em] uppercase font-medium text-slate-600 mb-2 transition-all ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Why we exist
        </p>

        <h2
          className={`text-2xl md:text-4xl font-bold text-slate-900 leading-tight transition-all ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Every wasted dollar starts with a <span className="text-brand-600">bad decision.</span>
        </h2>

        <p
          className={`mt-3 text-slate-600 text-[15px] leading-relaxed transition-all ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Most e-commerce teams don't lose money because they can't execute —
          they lose money because they execute on the wrong thing.
        </p>

        {/* CARDS */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`bg-white rounded-lg border border-slate-200 shadow-sm p-4 transition-all hover:shadow-md ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <div className="mb-2">
                <StoryIcon name={card.icon} />
              </div>

              <h3 className="font-semibold text-slate-900 text-base">
                {card.title}
              </h3>

              <p className="mt-1 text-slate-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}

        </div>
      </Cell>
    </Section>
  );
}
