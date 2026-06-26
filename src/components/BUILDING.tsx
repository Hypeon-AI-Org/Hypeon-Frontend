'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Section, { Cell } from './Section';

export default function WhoWeAreBuildingFor() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section cols={2} sectionRef={ref} className="font-sans">

      {/* LEFT - Image (bleed: media fills the cell, hairline frames it) */}
      <Cell bleed className="flex items-center px-6 py-12 sm:px-10 sm:py-16">
        <div
          className={`
            relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-800
            transition-all duration-700
            ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
          `}
        >
          <Image
            src="/about/mission.webp"
            alt="Mission"
            fill
            className="object-cover"
            sizes="(max-width: 200px) 100vw, 50vw"
          />
        </div>
      </Cell>

      {/* RIGHT - text */}
      <Cell className="flex items-center">
        <div
          className={`
            text-center md:text-left
            transition-all duration-700 delay-150
            ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}
          `}
        >
          <p className="text-xs tracking-[0.25em] uppercase font-semibold text-gray-500">
            Our Mission
          </p>

          <h2 className="mt-3 text-2xl sm:text-4xl md:text-4xl text-black leading-tight tracking-tight">
            Make growth predictable, <span className="text-[#696863]">not guessed.</span>
          </h2>

          <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-lg md:max-w-none">
            We&apos;re building two engines that work as one - Hypeon Intelligence to decode your
            competitor&apos;s playbook, and HypeOn Studio to turn that insight into creative that
            converts. Spend less, sell more, and keep what you earn.
          </p>
        </div>
      </Cell>

    </Section>
  );
}