"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/** All integration logos from /logos (renamed from logo_real) */
const INTEGRATION_ITEMS = [
  { name: 'Instagram', src: '/logos/instagram.png' },
  { name: 'Snapchat', src: '/logos/snapchat.jpg' },
  { name: 'LinkedIn', src: '/logos/linkedin.avif' },
  { name: 'Google', src: '/logos/google.png' },
  { name: 'Google Cloud', src: '/logos/google-cloud.png' },
  { name: 'Google Ads', src: '/logos/google-ads.png' },
  { name: 'Google Sheets', src: '/logos/google-sheets.webp' },
  { name: 'Azure', src: '/logos/azure.png' },
  { name: 'Meta', src: '/logos/meta.png' },
  { name: 'Shopify', src: '/logos/shopify.png' },
  { name: 'Amazon', src: '/logos/amazon.png' },
  { name: 'TikTok', src: '/logos/tiktok.webp' },
];

const Integrations = () => {

  return (
    <section id="integrations" className="py-16 bg-[oklch(0.988_0.0041_91.45)] border-t border-gray-100 font-sans">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-12">

        {/* Top Label & Line */}
        <div className="flex items-center gap-8 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-900 whitespace-nowrap">
            Powerful Integrations
          </span>
          <div className="h-[1px] flex-1 bg-gray-100" />
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-4xl tracking-tight text-gray-900 leading-[1.1]">
              Connect every channel.<span className="text-[#696863]">Miss nothing</span>
            </h2>
            <p className="text-[15px] md:text-lg text-gray-500 leading-relaxed max-w-[550px]">
              Every platform your brand runs on — ad channels, your store, email, marketplaces. HypeOn connects all of them in one click and keeps everything synced automatically.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 lg:justify-end lg:pt-8">
            <Link
              href=""
              className="px-6 py-3 bg-black text-white text-sm font-bold rounded-sm hover:bg-gray-800 transition-colors uppercase tracking-tight"
            >
              Browse connectors
            </Link>
            <Link
              href=""
              className="px-6 py-3 bg-black text-white text-sm font-bold rounded-sm hover:bg-gray-800 transition-colors uppercase tracking-tight"
            >
              Browse destinations
            </Link>
          </div>
        </div>

        {/* Logo Marquee: real logos from /logos where available, Lucide icons for the rest */}
        <div className="relative mt-12 pt-8 overflow-hidden">
          <div className="marquee-container no-fade">
            <div className="marquee-content flex items-center gap-10 md:gap-14">
              {[1, 2].map((set) =>
                INTEGRATION_ITEMS.map((item, i) => (
                  <div key={`${set}-${i}`} className="flex items-center justify-center flex-shrink-0 group">
                    <span className="relative w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center bg-white border border-gray-100 overflow-hidden p-0.5 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={item.src}
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain w-7 h-7 md:w-8 md:h-8"
                      />
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-content {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 40s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Integrations;