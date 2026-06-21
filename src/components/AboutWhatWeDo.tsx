'use client';

import { useEffect, useRef, useState } from 'react';
import Section, { Cell } from './Section';

export default function AboutWhatWeDo() {
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

  return (
    <Section cols={1}>
      <Cell bleed className="px-6 py-12 sm:px-10 sm:py-16">
        <div
          ref={ref}
          className={`relative overflow-hidden max-w-5xl mx-auto rounded-[24px]
          min-h-[320px] flex items-center justify-center text-center
          transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* VIDEO BACKGROUND — lazy-loaded for fast initial render */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            {visible && <source src="/images/vide.mp4" type="video/mp4" />}
          </video>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* CONTENT */}
          <div className="relative z-10 px-6">
            <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white">
              30%
            </p>

            <p className="mt-4 text-gray-200 text-[15px] leading-relaxed max-w-lg mx-auto">
              The average e-commerce brand wastes 30% of their ad budget on channels
              that claim credit but deliver nothing. HypeOn shows you exactly where
              that money goes — and where to move it.
            </p>
          </div>
        </div>
      </Cell>
    </Section>
  );
}
