'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function WhoWeAreBuildingFor() {
  const ref = useRef<HTMLDivElement | null>(null);
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
    <section ref={ref} className="font-sans py-20 bg-[oklch(0.988_0.0041_91.45)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 lg:gap-10 items-center">

        {/* LEFT — Image */}
        <div
          className={`
            relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800
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

        {/* RIGHT */}
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

          <h2 className="mt-3 text-2xl md:text-3xl  text-black leading-tight tracking-tight">
            Make product-market fit predictable, not guessed.
          </h2>

          <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-lg md:max-w-none">
            We&apos;re building the most trusted AI copilot for product and marketing decisions —
            one that anticipates trends, shows what&apos;s actually working, and turns conviction
            into a competitive advantage.
          </p>
        </div>

      </div>
    </section>
  );
}