'use client';

import {
  Facebook,
  BarChart3,
  ShoppingBag,
  Package,
  Video,
  Instagram,
  Search,
} from 'lucide-react';

export default function AboutDataSources() {
  return (
    <section className="py-28 border-t overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center reveal">

        {/* Heading */}
        <h2 className="text-3xl font-display">
          Powered by <span className="text-brand-600">real-time signals</span>
        </h2>

        {/* Subheading */}
        <p className="mt-6 text-slate-600 max-w-3xl mx-auto">
          HypeOn connects millions of live signals across platforms
          and converts them into actionable insights.
        </p>

      
          {/* MARQUEE */}
          <div className="marquee-container1">
            <div className="marquee-content">

              {/* SET 1 */}
              <div className="flex items-center gap-14 px-8">
                <Platform icon={<Facebook />} label="Meta Ads" color="text-blue-600" />
                <Platform icon={<BarChart3 />} label="Google Trends" color="text-blue-500" />
                <Platform icon={<ShoppingBag />} label="Shopify" color="text-green-600" />
                <Platform icon={<Package />} label="Amazon" color="text-orange-500" />
                <Platform icon={<Video />} label="TikTok Shop" color="text-black" />
                <Platform icon={<Instagram />} label="Instagram" color="text-pink-600" />
                <Platform icon={<Search />} label="Pinterest" color="text-blue-500" />
              </div>

              {/* DUPLICATE SET FOR LOOP */}
              <div className="flex items-center gap-14 px-8">
                <Platform icon={<Facebook />} label="Meta Ads" color="text-blue-600" />
                <Platform icon={<BarChart3 />} label="Google Trends" color="text-blue-500" />
                <Platform icon={<ShoppingBag />} label="Shopify" color="text-green-600" />
                <Platform icon={<Package />} label="Amazon" color="text-orange-500" />
                <Platform icon={<Video />} label="TikTok Shop" color="text-black" />
                <Platform icon={<Instagram />} label="Instagram" color="text-pink-600" />
                <Platform icon={<Search />} label="Pinterest" color="text-blue-500" />
              </div>

            </div>
          </div>
        </div>

  
    </section>
  );
}

/* SMALL HELPER */
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
    <div className="flex items-center gap-2 font-semibold text-lg text-slate-700 whitespace-nowrap">
      <span className={`w-5 h-5 ${color}`}>{icon}</span>
      {label}
    </div>
  );
}
