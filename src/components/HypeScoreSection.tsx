'use client';

import { useState } from 'react';

const features = [
  {
    id: 'trend-spotter',
    title: 'Trend Spotter',
    description: 'Scan 20M+ daily signals to find products 3-8 weeks before they peak. Not after.',
  },
  {
    id: 'keyword-spy',
    title: 'Keyword Spy',
    description: 'Track buyer-intent keywords rising across TikTok, Google, Amazon and Instagram — before CPCs inflate.',
  },
  {
    id: 'creative-intelligence',
    title: 'Creative Intelligence',
    description: 'See which ad creatives are winning in your niche. Learn from top performers.',
  },
  {
    id: 'pricing-intelligence',
    title: 'Pricing Intelligence',
    description: 'Get optimal pricing recommendations based on competitor analysis and market trends.',
  },
];

export default function HypeScoreSection() {
  const [activeId, setActiveId] = useState('keyword-spy'); // Set to 'keyword-spy' to match image
  const activeFeature = features.find((f) => f.id === activeId) ?? features[0];

  return (
    <section className="py-16 bg-white font-sans pr-20">
      <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-[1fr_360px] gap-8 items-start">
        
        {/* LEFT – Text + feature list */}
        <div className="reveal-left">
          <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-medium mb-4">
            TECHNOLOGY
          </p>
          <h2 className="text-3xl md:text-4xl text-[#1a1a1a] leading-[1.15] mb-6 max-w-lg">
            The signals your current tools aren&apos;t showing you.
          </h2>
          <p className="text-[#757575] text-xs md:text-sm leading-relaxed max-w-md mb-10">
            Standard research tools show you what happened last month. 
            HypeOn Intelligence shows you what&apos;s happening this week — and what&apos;s about to happen next.
          </p>

          {/* Feature list */}
          <div className="border-t border-slate-100 reveal-stagger">
            {features.map((feature) => {
              const isActive = feature.id === activeId;
              return (
                <div 
                  key={feature.id}
                  className="border-b border-slate-100"
                >
                  <button
                    onClick={() => setActiveId(feature.id)}
                    className="w-full text-left py-4 transition-all group"
                  >
                    <span
                      className={`block text-base font-semibold transition-colors duration-300 ${
                        isActive ? 'text-[#1a1a1a]' : 'text-[#b0b0b0] group-hover:text-slate-600'
                      }`}
                    >
                      {feature.title}
                    </span>
                    
                    {/* Controlled height container for description */}
                    <div className={`grid transition-all duration-300 ease-in-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <p className="overflow-hidden text-[#757575] text-xs leading-relaxed max-w-sm">
                        {feature.description}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT – Visual card */}
        <div className="sticky top-20 mt-20 flex justify-end reveal-right">
          <div
            className="w-full h-[360px] rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-center relative overflow-hidden transition-all duration-700 shadow-sm"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          >
            <span
              key={activeFeature.id}
              className="font-serif italic text-3xl md:text-4xl text-[#b0b0b0] animate-in fade-in zoom-in-95 duration-500"
            >
              {activeFeature.title}
            </span>
            
            {/* Subtle Gradient Overlay to match the clean "tech" look */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}