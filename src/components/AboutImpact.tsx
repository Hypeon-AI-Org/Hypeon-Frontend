'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, GraduationCap, Linkedin } from 'lucide-react';
import Section, { Cell } from './Section';

export default function AboutImpact() {
  const ref = useRef<HTMLElement | null>(null);
  // The parallax card we move directly via .style (no React re-render per frame).
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const section = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    // Cache the section's document offset ONCE; recompute only on resize.
    let baseTop = section.getBoundingClientRect().top + window.scrollY;
    let sectionHeight = section.offsetHeight;
    const recompute = () => {
      baseTop = section.getBoundingClientRect().top + window.scrollY;
      sectionHeight = section.offsetHeight;
    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        if (!cardRef.current) return;
        const scrollY = window.scrollY;
        // Only update while the section is roughly on-screen. Pure math, no layout read.
        const top = baseTop - scrollY;
        if (top < window.innerHeight && top + sectionHeight > 0) {
          const translateY = (scrollY - baseTop) * 0.1;
          cardRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', recompute, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', recompute);
    };
  }, []);

  return (
    <Section
      sectionRef={ref}
      gridClassName="md:grid-cols-[minmax(240px,300px)_1fr]"
    >
      {/* LEFT CARD */}
      <Cell>
        <div
          ref={cardRef}
          className="md:sticky md:top-20"
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        >
          <div
            className={`rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-700 hover:shadow-lg
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/team/yash1.jpg"
                alt="Yash Kumar"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900">Yash Kumar</h3>

              <p className="mt-1 text-xs font-semibold text-slate-500">
                Founder & CEO
              </p>

              <div className="mt-3 space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <p>Stockholm, Sweden</p>
                </div>

                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <p>Troy University</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href="#"
                  className="text-slate-500 hover:text-black transition"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Cell>

      {/* RIGHT CONTENT */}
      <Cell>
        <div className="space-y-6">
          <header
            className={`transition-all duration-700 delay-100
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-500">
              Built by
            </p>

            <h2 className="mt-2 text-2xl sm:text-4xl md:text-4xl text-slate-900 leading-tight">
              The founder who turns ad chaos into winning creative.
            </h2>
          </header>

          <div
            className={`space-y-4 text-slate-600 text-sm leading-relaxed
            transition-all duration-700 delay-200
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p>
              Yash Kumar is a global marketer who has spent years deep in the
              trenches of e-commerce growth - from ideation to execution, across
              Google, Meta, YouTube, TikTok, and Pinterest. He&apos;s built
              campaigns from scratch, handled everything from creatives
              production and ad copy to technical tracking and performance
              optimization, and worked hands-on with brands across markets and
              continents.
            </p>

            <p>
              The idea behind HypeOn wasn&apos;t born in a boardroom. It came
              from watching the same gap repeat: finding what works and building
              from it are two completely different jobs - and teams were stuck
              doing both by hand. Hours lost scrolling competitor ad libraries.
              Two-week waits on agencies for a single creative. Ads launched on
              gut feel, with no proof behind them.
            </p>

            <p>
              Yash founded HypeOn AI in 2025 to close that gap - one platform
              that finds the winning ads in any category and turns them into your
              own static, video, and UGC creatives in minutes. He was selected
              for the AI Founders Program at /function1 in Dubai, where HypeOn
              showcased its competitive intelligence and AI-first creative
              technology to builders, creators, and investors shaping the future
              of AI.
            </p>

            <blockquote
              className={`relative p-5 rounded-lg bg-white border border-slate-200 shadow-sm
              transition-all duration-700 delay-300
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-lg" />

              <p className="text-slate-800 italic text-base leading-relaxed">
                &quot;Most teams don&apos;t lose because they lack ideas. They
                lose because they start from a blank page. We built HypeOn so the
                winning angle is found - and built - before you spend.&quot;
              </p>

              <cite className="mt-3 block text-slate-700 font-semibold text-xs not-italic">
                - Yash Kumar, Founder & CEO
              </cite>
            </blockquote>
          </div>
        </div>
      </Cell>
    </Section>
  );
}
