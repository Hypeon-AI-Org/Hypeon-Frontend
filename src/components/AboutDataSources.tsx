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

export default function AboutDataSources() {
  return (
    <section className="font-sans py-10 mb-20 bg-[oklch(0.988_0.0041_91.45)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center reveal">

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-4xl  font-display font-bold tracking-tighter">
          Millions of signals <span className="text-brand-600">Every day.</span>
        </h2>

        {/* Subheading */}
        <p className="mt-6 text-slate-600 max-w-3xl mx-auto">
          HypeOn analyzes millions of data points daily from the platforms where trends form and money actually moves.
        </p>

        {/* MARQUEE */}
        <div className="marquee-container1 mt-10">
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
        </div>

      </div>
    </section>
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