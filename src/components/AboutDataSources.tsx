'use client';

import {
  Facebook,
  TrendingUp,
  ShoppingBag,
  Package,
  Music2,
  Instagram,
  Pin,
} from 'lucide-react';

export default function AboutDataSources() {
  return (
    <section className="font-sans py-10 mb-20 bg-[oklch(0.988_0.0041_91.45)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center reveal">

        {/* Heading */}
        <h2 className="text-3xl font-display">
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
              <Platform icon={<Facebook />} label="Meta Ads" color="text-blue-600" />
              <Platform icon={<TrendingUp />} label="Google Trends" color="text-red-500" />
              <Platform icon={<ShoppingBag />} label="Shopify" color="text-green-600" />
              <Platform icon={<Package />} label="Amazon" color="text-yellow-500" />
              <Platform icon={<Music2 />} label="TikTok Shop" color="text-pink-500" />
              <Platform icon={<Instagram />} label="Instagram" color="text-purple-500" />
              <Platform icon={<Pin />} label="Pinterest" color="text-red-600" />
            </div>

            {/* DUPLICATE SET FOR LOOP */}
            <div className="flex items-center gap-14 px-8">
              <Platform icon={<Facebook />} label="Meta Ads" color="text-blue-600" />
              <Platform icon={<TrendingUp />} label="Google Trends" color="text-red-500" />
              <Platform icon={<ShoppingBag />} label="Shopify" color="text-green-600" />
              <Platform icon={<Package />} label="Amazon" color="text-yellow-500" />
              <Platform icon={<Music2 />} label="TikTok Shop" color="text-pink-500" />
              <Platform icon={<Instagram />} label="Instagram" color="text-purple-500" />
              <Platform icon={<Pin />} label="Pinterest" color="text-red-600" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* PLATFORM COMPONENT */
function Platform({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 font-semibold text-lg text-slate-700 whitespace-nowrap">
      <span className={`${color}`}>{icon}</span>
      {label}
    </div>
  );
}