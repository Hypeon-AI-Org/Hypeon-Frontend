'use client';

import { useEffect, useRef, useState } from 'react';

function Counter({ value, visible }: { value: string; visible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const numeric = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 1200;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * numeric));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible, value]);

  const prefix = value.includes('$') ? '$' : value.includes('+') ? '+' : '';
  const suffix = value.includes('K') ? 'K' : '';

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const cards = [
  { value: '+13', label: 'Team members' },
  { value: '+10', label: 'Data sources analyzed' },
  { value: '2025', label: 'Founded · San Francisco' },
];

export default function AboutDecisionLayer() {
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
      { threshold: 0.35, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className={`rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-700 ease-out sm:p-8 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                <Counter value={card.value} visible={visible} />
              </p>
              <p className="mt-1.5 text-sm text-slate-500">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
