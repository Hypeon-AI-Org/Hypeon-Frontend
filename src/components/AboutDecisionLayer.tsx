'use client';

import { useEffect, useRef, useState } from 'react';

function Counter({ value, visible }: { value: string; visible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const numeric = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 1200;
    let start = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      const current = Math.floor(progress * numeric);
      setCount(current);

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

export default function AboutDecisionLayer() {
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
      { threshold: 0.35, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cards = [
    
    { value: '+13', label: 'Team members' },
    { value: '+10', label: 'Data sources analyzed' },
    { value: '2025', label: 'Founded · San Francisco' },
  ];

  return (
    <section ref={ref} className="relative py-12 bg-[oklch(0.988_0.0041_91.45)] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
  key={card.label}
  className={`
    bg-[oklch(0.988_0.0041_91.45)]
    rounded-lg
    border border-slate-300
    shadow-sm
    px-8 py-6
    text-center
    w-full
    transition-all duration-700 ease-out
    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
  `}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <p className="text-2xl md:text-3xl text-black">
                <Counter value={card.value} visible={visible} />
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}