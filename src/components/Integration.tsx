"use client";
import React from 'react';
import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,

  BarChart3,
  FileSpreadsheet,
  Cloud,
  Database,
  LayoutGrid,
  MessagesSquare,
  Search,
  Video,
  ShoppingBag,
  Package,
} from 'lucide-react';

const Integrations = () => {
  const logos = [
    { icon: Instagram, name: 'Instagram', color: '#E4405F' },
    { icon: MessagesSquare, name: 'Snapchat', color: '#FFFC00' },
    { icon: Linkedin, name: 'LinkedIn', color: '#0A66C2' },
    { icon: BarChart3, name: 'Google Analytics', color: '#F9AB00' },
    { icon: Cloud, name: 'Google Cloud', color: '#4285F4' },
    { icon: LayoutGrid, name: 'Google Ads', color: '#34A853' },
    { icon: FileSpreadsheet, name: 'Google Sheets', color: '#1D8045' },
    { icon: Database, name: 'Azure', color: '#0089D6' },
    { icon: Facebook, name: 'Facebook', color: '#1877F2' },
    { icon: ShoppingBag, name: 'Shopify', color: '#95BF47' },
    { icon: Package, name: 'Amazon', color: '#FF9900' },
    { icon: Video, name: 'TikTok', color: '#000000' },
  ];

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
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-gray-900 leading-[1.1]">
              Connect every channel.<span className="text-brand-600">Miss nothing</span>
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

        {/* Logo Marquee */}
        <div className="relative mt-12 pt-8 overflow-hidden">
          <div className="marquee-container no-fade">
            <div className="marquee-content flex items-center gap-10 md:gap-14">
              {/* First set of logos */}
              {logos.map((logo, i) => (
                <div key={`logo-1-${i}`} className="flex items-center justify-center flex-shrink-0 group">
                  <logo.icon
                    className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: logo.color }}
                    strokeWidth={1.5}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {logos.map((logo, i) => (
                <div key={`logo-2-${i}`} className="flex items-center justify-center flex-shrink-0 group">
                  <logo.icon
                    className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: logo.color }}
                    strokeWidth={1.5}
                  />
                </div>
              ))}
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