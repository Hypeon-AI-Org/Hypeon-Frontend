'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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
    <section ref={ref} className="relative overflow-hidden rounded-[28px] bg-[#0a0a0c] py-16 sm:rounded-[56px] sm:py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 hidden h-[460px] w-[460px] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-2xl lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div
            className={`text-center transition-all duration-700 lg:order-2 lg:text-left ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Our Mission</p>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-white">
              Make growth predictable<span className="text-white/40">not guessed.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/50 lg:max-w-none">
              We&apos;re building two engines that work as one - Hypeon Intelligence to decode
              your competitor&apos;s playbook, and HypeOn Studio to turn that insight into
              creative that converts. Spend less, sell more, and keep what you earn.
            </p>
          </div>

          <div
            className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-700 delay-150 lg:order-1 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            <Image src="/about/mission.webp" alt="Mission" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
