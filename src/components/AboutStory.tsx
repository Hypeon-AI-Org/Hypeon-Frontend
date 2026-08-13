'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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
      'Two engines working together - Hypeon Intelligence decodes competitor spend, reach and winning angles, while HypeOn Studio turns those insights into creative that converts.',
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
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'lightning':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'message':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'network':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <section ref={ref} className="relative overflow-hidden rounded-[28px] bg-[#0a0a0c] py-16 sm:rounded-[56px] sm:py-20 lg:py-28">
      {/* Faint dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* Soft ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden h-[460px] w-[460px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-2xl lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(340px,460px)_1fr] lg:items-stretch lg:gap-14">
          {/* image */}
          <div
            className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-700 lg:aspect-auto ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Image src="/about/story.webp" alt="Business analytics and market research" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* content */}
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2 transition-all ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Why we exist
            </p>

            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white transition-all ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Every wasted dollar starts with a <span className="text-white/40">bad decision.</span>
            </h2>

            <p
              className={`mt-3 text-[15px] leading-relaxed text-white/50 transition-all ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Most e-commerce teams don&apos;t lose money because they can&apos;t execute -
              they lose money because they execute on the wrong thing.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  className={`rounded-2xl border border-white/10 bg-[#131316] p-5 transition-all ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white">
                    <StoryIcon name={card.icon} />
                  </div>
                  <h3 className="text-base font-semibold text-white">{card.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
