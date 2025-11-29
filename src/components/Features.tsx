'use client';

import { Radar, BrainCircuit, Wand2 } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-blur">
          <h2 className="text-3xl md:text-5xl font-display text-slate-900 mb-6">
            Stop Guessing. <span className="text-brand-600">Start Predicting.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Hypeon unifies real-time trend data and predictive intelligence so you can launch with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 reveal-stagger">
          {/* Feature 1: Real-Time Trend Radar */}
          <div className="glass-card p-8 rounded-2xl reveal-scale">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
              <Radar className="w-7 h-7 text-blue-500" />
            </div>
            <h3 className="text-xl text-slate-900 mb-3">Real-Time Trend Radar</h3>
            <p className="text-slate-600 leading-relaxed">
              We analyse hundreds of top sites, Amazon & Shopify stores, TikTok, Pinterest, Google Trends and more to spot products, keywords and creatives breaking out right now.

You see the market as it moves, not weeks later.
            </p>
          </div>

          {/* Feature 2: Hype Score */}
          <div className="glass-card p-8 rounded-2xl reveal-scale border-brand-200 bg-white shadow-xl shadow-brand-100/20">
            <div className="w-14 h-14 bg-brand-500/10 rounded-xl flex items-center justify-center mb-6 border border-brand-500/20">
              <BrainCircuit className="w-7 h-7 text-brand-500" />
            </div>
            <h3 className="text-xl text-slate-900 mb-3">Hype Score</h3>
            <p className="text-slate-600 leading-relaxed">
              Don't waste money testing bad ideas. Our predictive algorithm ranks products by{' '}
              <span className="font-bold text-slate-900">demand, competition and velocity</span> to give you a
              single validation score.
            </p>
          </div>

          {/* Feature 3: Creative Intelligence */}
          <div className="glass-card p-8 rounded-2xl reveal-scale">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20">
              <Wand2 className="w-7 h-7 text-purple-500" />
            </div>
            <h3 className="text-xl text-slate-900 mb-3">Creative Intelligence</h3>
            <p className="text-slate-600 leading-relaxed">
              Knowing <em>what</em> to sell is half the battle. HypeOn AI analyzes top-performing ads to help you generate high-converting ads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
