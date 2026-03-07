import React from 'react';
import Link from 'next/link';

import {
  Bot,
  ArrowUp,
  PanelLeft,
  User,
  Zap,
  TrendingDown,
  LucideTrendingUp as Trendingup,
  ChevronRight,
  ArrowRight,
  Lock,
  PlayCircle,
  TrendingUp,
  Sparkles,
  Search,
  Video,
  Instagram,
  ShoppingBag,
  Package,
  Music2,
    DollarSign,
  Users,
  Briefcase,
  Facebook,
  BarChart3,
} from 'lucide-react';

const Integrations = () => {
  return (
    <section id="integrations" className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1160px] mx-auto px-8">
        
        {/* Header Area – scroll reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-[580px] reveal-left">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-wide text-pink-600 bg-pink50 border border-pink-200 px-3 py-1 rounded-full uppercase mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
              Integrations
            </div>
            <h2 className="text-[46px] leading-[1.12] font-bold tracking-tight text-gray-900 mb-4 font-display">
              Connect every channel. <br />
              <span className="text-brand-600">Miss nothing.</span>
            </h2>
            <p className="text-[17px] leading-relaxed text-gray-500">
              Every platform your brand runs on — ad channels, your store, email, marketplaces. 
              HypeOn connects all of them in one click and keeps everything synced automatically.
            </p>
          </div>

          <div className="flex gap-4 reveal-right">
            <Link href="/integrations" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Browse all integrations
            </Link>
            <Link href="/destinations" className="text-sm font-medium text-pink-600 flex items-center gap-1 hover:gap-2 transition-all">
              See destinations <span>→</span>
            </Link>
          </div>
        </div>

        {/* Integration Grid */}
        <div className="mt-20 pt-10 border-t border-slate-200 reveal">
         
          <div className="marquee-container">
            <div className="marquee-content">
              {/* First set of logos */}
              <div className="flex items-center gap-12 px-8">
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Facebook className="w-5 h-5 text-blue-600" /> Meta Ads
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <BarChart3 className="w-5 h-5 text-blue-500" /> Google Trends
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <ShoppingBag className="w-5 h-5 text-green-600" /> Shopify
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Package className="w-5 h-5 text-orange-500" /> Amazon
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Video className="w-5 h-5 text-black" /> TikTok Shop
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Instagram className="w-5 h-5 text-pink-600" /> Instagram
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Search className="w-5 h-5 text-blue-500" /> Pinterest
                </div>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-12 px-8">
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Facebook className="w-5 h-5 text-blue-600" /> Meta Ads
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <BarChart3 className="w-5 h-5 text-blue-500" /> Google Trends
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <ShoppingBag className="w-5 h-5 text-green-600" /> Shopify
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Package className="w-5 h-5 text-orange-500" /> Amazon
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Video className="w-5 h-5 text-black" /> TikTok Shop
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Instagram className="w-5 h-5 text-pink-600" /> Instagram
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
                  <Search className="w-5 h-5 text-blue-500" /> Pinterest
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer label – scroll reveal */}
        <div className="mt-12 pt-8 border-t border-gray-200/60 text-center reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
            Trusted by 2,000+ scaling direct-to-consumer brands
          </p>
        </div>

      </div>
    </section>
  );
};

export default Integrations;