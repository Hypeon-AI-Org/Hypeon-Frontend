'use client';

import Image from 'next/image';
import Section, { Cell } from './Section';

const PLATFORM_LOGOS = [
  { name: 'Meta Ads', src: '/logos/meta.png' },
  { name: 'Google Ads', src: '/logos/google.png' },
  { name: 'Shopify', src: '/logos/shopify.png' },
  { name: 'Amazon', src: '/logos/amazon.png' },
  { name: 'TikTok Shop', src: '/logos/tiktok.webp' },
  { name: 'Instagram', src: '/logos/instagram.png' },
  { name: 'Pinterest', src: '/logos/pinterest.png' },
] as const;

export default function AboutDataSources() {
  return (
    <Section cols={1} className="font-sans">
      {/* Heading */}
      <Cell className="text-center reveal">
        <h2 className="text-2xl sm:text-4xl md:text-4xl font-display font-bold tracking-tighter">
          Millions of signals <span className="text-[#696863]">Every day.</span>
        </h2>

        <p className="mt-6 text-slate-600 max-w-3xl mx-auto">
          HypeOn Intelligence tracks the platforms where money actually moves - decoding 200M+ ads to surface every competitor&apos;s spend, reach and winning angles, 24/7.
        </p>
      </Cell>

      {/* MARQUEE - cut cleanly at the section's hairline rails (overflow-hidden, no fade mask) */}
      <Cell bleed className="overflow-hidden py-12 sm:py-16">
        <div className="marquee-content">
          {/* SET 1 */}
          <div className="flex items-center gap-14 px-8">
            {PLATFORM_LOGOS.map(({ name, src }) => (
              <Platform key={src} label={name} src={src} />
            ))}
          </div>

          {/* DUPLICATE SET FOR LOOP */}
          <div className="flex items-center gap-14 px-8">
            {PLATFORM_LOGOS.map(({ name, src }) => (
              <Platform key={`dup-${src}`} label={name} src={src} />
            ))}
          </div>
        </div>
      </Cell>
    </Section>
  );
}

/* PLATFORM COMPONENT - uses logo image from /logos */
function Platform({ label, src }: { label: string; src: string }) {
  return (
    <div className="flex items-center gap-3 font-semibold text-lg text-slate-700 whitespace-nowrap">
      <span className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-md flex items-center justify-center bg-white border border-slate-100 overflow-hidden p-0.5">
        <Image
          src={src}
          alt=""
          width={36}
          height={36}
          className="object-contain w-7 h-7 sm:w-8 sm:h-8"
        />
      </span>
      {label}
    </div>
  );
}
