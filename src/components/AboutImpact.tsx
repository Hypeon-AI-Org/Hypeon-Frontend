'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, GraduationCap, Linkedin } from 'lucide-react';

export default function AboutImpact() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(240px,300px)_1fr] lg:gap-14">
          {/* bio card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-700 hover:shadow-lg ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image src="/team/yash1.jpg" alt="Yash Kumar" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">Yash Kumar</h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">Founder & CEO</p>

                <div className="mt-3 space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <p>Stockholm, Sweden</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-slate-400" />
                    <p>Troy University</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link href="#" className="text-slate-500 transition hover:text-black">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* narrative */}
          <div className="space-y-6">
            <header
              className={`transition-all duration-700 delay-100 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Built by</p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-slate-900">
                The founder who turns ad chaos into winning creative.
              </h2>
            </header>

            <div
              className={`space-y-4 text-sm leading-relaxed text-slate-600 transition-all duration-700 delay-200 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p>
                Yash Kumar is a global marketer who has spent years deep in the trenches of
                e-commerce growth - from ideation to execution, across Google, Meta, YouTube,
                TikTok, and Pinterest. He&apos;s built campaigns from scratch, handled everything
                from creatives production and ad copy to technical tracking and performance
                optimization, and worked hands-on with brands across markets and continents.
              </p>

              <p>
                The idea behind HypeOn wasn&apos;t born in a boardroom. It came from watching the
                same gap repeat: finding what works and building from it are two completely
                different jobs - and teams were stuck doing both by hand. Hours lost scrolling
                competitor ad libraries. Two-week waits on agencies for a single creative. Ads
                launched on gut feel, with no proof behind them.
              </p>

              <p>
                Yash founded HypeOn AI in 2025 to close that gap - one platform that finds the
                winning ads in any category and turns them into your own static, video, and UGC
                creatives in minutes. He was selected for the AI Founders Program at /function1
                in Dubai, where HypeOn showcased its competitive intelligence and AI-first
                creative technology to builders, creators, and investors shaping the future of AI.
              </p>

              <blockquote
                className={`relative rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all duration-700 delay-300 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-slate-900" />
                <p className="text-base italic leading-relaxed text-slate-800">
                  &quot;Most teams don&apos;t lose because they lack ideas. They lose because they
                  start from a blank page. We built HypeOn so the winning angle is found - and
                  built - before you spend.&quot;
                </p>
                <cite className="mt-3 block text-xs font-semibold not-italic text-slate-700">
                  - Yash Kumar, Founder &amp; CEO
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
