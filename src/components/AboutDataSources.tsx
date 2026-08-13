'use client';

import Image from 'next/image';

const PLATFORM_LOGOS = [
  { name: 'Meta Ads', src: '/logos/meta.png' },
  { name: 'Google Ads', src: '/logos/google.png' },
  { name: 'Shopify', src: '/logos/shopify.png' },
  { name: 'Amazon', src: '/logos/amazon.png' },
  { name: 'TikTok Shop', src: '/logos/tiktok.webp' },
  { name: 'Instagram', src: '/logos/instagram.png' },
  { name: 'Pinterest', src: '/logos/pinterest.png' },
] as const;

function Platform({ label, src }: { label: string; src: string }) {
  return (
    <div className="flex items-center gap-3 whitespace-nowrap text-lg font-semibold text-white/70">
      <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center sm:h-9 sm:w-9">
        <Image
          src={src}
          alt=""
          width={36}
          height={36}
          className="h-full w-full object-contain opacity-80 grayscale invert transition-opacity duration-300 hover:opacity-100"
        />
      </span>
      {label}
    </div>
  );
}

export default function AboutDataSources() {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[#0a0a0c] py-16 sm:rounded-[56px] sm:py-20 lg:py-24">
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
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[460px] w-[460px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-2xl lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 text-center sm:px-6 lg:px-10">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tighter text-white">
          Millions of signals <span className="text-white/40">Every day.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/50">
          HypeOn Intelligence tracks the platforms where money actually moves - decoding 200M+
          ads to surface every competitor&apos;s spend, reach and winning angles, 24/7.
        </p>
      </div>

      <div
        className="relative mt-12 overflow-hidden sm:mt-16"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-14 motion-reduce:animate-none">
          {[...PLATFORM_LOGOS, ...PLATFORM_LOGOS].map(({ name, src }, i) => (
            <Platform key={`${src}-${i}`} label={name} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}
