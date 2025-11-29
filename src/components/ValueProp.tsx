'use client';

import { ArrowRight, TrendingUp, Video, Clock, BarChart2, Frown, Zap, PenTool, XCircle, CheckCircle2, MessageSquare, Rocket } from 'lucide-react';

export default function ValueProp() {
  return (
    <>
      {/* Comparison Section */}
      <section className="py-24 bg-white relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
            <h2 className="text-3xl md:text-5xl font-display text-slate-900 mb-6">
              You're Looking in the <span className="text-brand-600">Rearview Mirror.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Traditional tools show you what sold <em>last month</em>. By the time you launch, the trend is dead. HypeOn AI uses predictive AI to show you what to sell, when to sell it, and how to market it..
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Old Way */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 opacity-70 hover:opacity-100 transition-opacity reveal-left flex flex-col">
              <div className="flex items-center gap-3 mb-6 text-red-500 font-bold">
                <XCircle className="w-5 h-5" /> Old Way
              </div>
              <ul className="space-y-4 text-slate-600 flex-grow">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 text-slate-400 flex-shrink-0" />
                  <span>
                    Manual research between multiple tools for products, keywords, and ad research.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart2 className="w-5 h-5 mt-1 text-slate-400 flex-shrink-0" />
                  <span>Relying on lagging sales data from 30 days ago.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Frown className="w-5 h-5 mt-1 text-slate-400 flex-shrink-0" />
                  <span>Guessing ad creatives and wasting budget on testing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 mt-1 text-slate-400 flex-shrink-0" />
                  <span>Using ChatGPT/Gemini for trends but with no real-time data or trend evidence.</span>
                </li>
              </ul>
            </div>

            {/* HypeOn Way */}
            <div className="relative reveal-right">
              {/* Badge - Outside the box */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-2.5 rounded-full text-base font-bold shadow-2xl shadow-brand-500/50 z-20 transform rotate-3 border-2 border-white/80 hover:scale-105 transition-transform">
                <span className="drop-shadow-sm">The HypeOn AI Advantage</span>
              </div>
              
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white via-brand-50/30 to-brand-100/20 border-2 border-brand-200 shadow-2xl shadow-brand-500/20 relative flex flex-col overflow-hidden group">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center gap-3 mb-6 text-brand-600 font-bold relative z-10">
                <div className="p-1.5 bg-brand-100 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-brand-600" />
                </div>
                <span className="text-lg">HypeOn Way</span>
              </div>
              
              <ul className="space-y-4 text-slate-800 font-medium flex-grow relative z-10">
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg text-white flex-shrink-0 shadow-md">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">One dashboard combining Trends + Keywords + Creatives.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg text-white flex-shrink-0 shadow-md">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Real-time velocity signals (72-hour lead time).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg text-white flex-shrink-0 shadow-md">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Launch-ready insights that replace guesswork with confident decisions.</span>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Steps Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Steps */}
            <div className="reveal-left">
              <h2 className="text-3xl md:text-4xl font-display text-slate-900 mb-6">
                From "I have no idea" to <br />
                <span className="text-brand-600">Market Leader in 5 minutes.</span>
              </h2>
              <div className="space-y-8 mt-10">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center font-bold text-white text-lg">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg text-slate-900">Select Your Niche</h4>
                    <p className="text-slate-600 mt-1">
                      Simply tell HypeOn AI your niche (e.g., 'Home Decor') and target region.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center font-bold text-white text-lg">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Get Validated Winners</h4>
                    <p className="text-slate-600 mt-1">
                      Receive a curated list of top products, keywords, and creatives..
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center font-bold text-white text-lg">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg text-slate-900">Launch with Confidence</h4>
                    <p className="text-slate-600 mt-1">
                      Add the winners to your store or campaigns and move faster than competitors.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Link */}
              <div className="mt-10">
                <a
                  href="#features"
                  className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-2 group"
                >
                  Explore all features{' '}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Trend Analysis Card */}
            <div className="relative reveal-rotate">
              {/* Background glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px] pointer-events-none parallax-slow"></div>
              
              {/* Card */}
              <div className="glass-card p-6 rounded-2xl border-slate-200 relative z-10 animate-float">
                {/* Header */}
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-200">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">
                      TREND ANALYSIS
                    </div>
                    <div className="text-xl text-slate-900">Sunset Projection Lamp</div>
                  </div>
                  <div className="text-right">
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold inline-flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Viral
                    </div>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="flex items-end gap-2 h-32 mb-6 px-2">
                  <div className="w-1/6 bg-brand-500/30 rounded-t h-[20%]"></div>
                  <div className="w-1/6 bg-brand-500/30 rounded-t h-[35%]"></div>
                  <div className="w-1/6 bg-brand-500/50 rounded-t h-[40%]"></div>
                  <div className="w-1/6 bg-brand-500/70 rounded-t h-[60%]"></div>
                  <div className="w-1/6 bg-brand-500 rounded-t h-[85%] shadow-[0_0_15px_rgba(236,72,153,0.3)]"></div>
                  <div className="w-1/6 bg-brand-500 rounded-t h-[100%] shadow-[0_0_15px_rgba(236,72,153,0.3)]"></div>
                </div>

                {/* Footer Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Keywords</div>
                    <div className="text-sm text-slate-900 font-medium">"aesthetic room decor"</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Top Platform</div>
                    <div className="text-sm text-slate-900 font-medium flex items-center gap-1">
                      <Video className="w-3 h-3" /> TikTok
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
