'use client';

import { useEffect, useRef, useState } from 'react';
import Section, { Cell } from './Section';

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

  const cards = [
    
    { value: '+13', label: 'Team members' },
    { value: '+10', label: 'Data sources analyzed' },
    { value: '2025', label: 'Founded · San Francisco' },
  ];

  return (
    <Section cols={3} sectionRef={ref}>
      {cards.map((card, i) => (
        <Cell key={card.label} className="text-center">
          <div
            className={`
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
        </Cell>
      ))}
    </Section>
  );
}