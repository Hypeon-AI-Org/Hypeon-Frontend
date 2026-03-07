import React from 'react';
import { ArrowRight, CheckCircle2, BarChart3, Link, Lightbulb, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#F9FAFB] py-24 lg:py-32 ">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 right-[25%] h-[50%] w-[60%] -translate-y-1/2 rounded-full bg-pink-600/5 blur-[120px]" />
        <div className="absolute top-1/4 left-[20%] h-[40%] w-[40%] rounded-full bg-pink-600/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* Left Column: Content – scroll reveal */}
          <div className="flex flex-col space-y-8 reveal-left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pr-4 shadow-sm reveal">
                <span className="rounded-full bg-pink-600 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">New</span>
                <span className="text-sm text-gray-500 font-medium">AI Copilot is now live for all plans</span>
              </div>
            </div>

            <h1 className="font-display text-5xl font-extrabold tracking-tighter text-gray-900 sm:text-6xl lg:text-5xl leading-[1.05]">
              The most honest <br />
              <span className="text-brand-600">attribution</span> <br />
              platform for e-commerce
            </h1>

            <p className="max-w-md text-md leading-relaxed text-gray-500">
              No more inflated ROAS from platforms marking their own homework. HypeOn cleans, unifies and attributes every sale — giving you one clear, unbiased truth across every channel.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-black">
                Get a demo
                <ArrowRight size={15} />
              </button>

            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-gray-400">
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Setup in 10 minutes</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Zero code</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> 2,400+ brands</span>
            </div>
          </div>

          {/* Right Column: Dashboard UI – scroll reveal */}
          <div className="relative reveal-right pl-10">
            {/* Main Dashboard Card */}
            <div className="relative z-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <span className="ml-2 text-xs text-gray-400">HypeOn Analytics — Overview</span>
              </div>

              <div className="p-5">
                {/* Metric Grid – staggered scroll reveal */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4 reveal-stagger">
                  {[
                    { label: 'Revenue', val: '£284K', delta: '↑ 18.4%', up: true },
                    { label: 'Blended ROAS', val: '3.71×', delta: '↑ +0.42', up: true },
                    { label: 'CAC', val: '£24.8', delta: '↓ 6.1%', up: false },
                    { label: 'Ad Spend', val: '£76.5K', delta: '↑ 4.2%', up: true },
                  ].map((m, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                      <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">{m.label}</p>
                      <p className="font-display text-xl font-bold text-gray-900">{m.val}</p>
                      <p className={`text-[10px] mt-1 font-medium ${m.up ? 'text-green-600' : 'text-red-500'}`}>{m.delta}</p>
                    </div>
                  ))}
                </div>

                {/* Table Mockup */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden mb-4">
                  <div className="grid grid-cols-4 border-b border-gray-100 px-4 py-2 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    <span>Channel</span>
                    <span className="text-right">Spend</span>
                    <span className="text-right">Rev</span>
                    <span className="text-right">ROAS</span>
                  </div>
                  {[
                    { name: 'Google CPC', s: '£34.2K', r: '£145.6K', roas: '4.26×', color: 'bg-blue-500' },
                    { name: 'Facebook', s: '£22.0K', r: '£77.0K', roas: '3.50×', color: 'bg-blue-600' },
                    { name: 'TikTok', s: '£11.4K', r: '£33.2K', roas: '2.91×', color: 'bg-black' },
                  ].map((ch, i) => (
                    <div key={i} className="grid grid-cols-4 items-center border-b border-gray-100 last:border-0 px-4 py-2.5 text-xs">
                      <div className="flex items-center gap-2 font-semibold">
                        <div className={`h-5 w-5 rounded-md ${ch.color} flex items-center justify-center text-[10px] text-white`}>{ch.name[0]}</div>
                        {ch.name}
                      </div>
                      <span className="text-right text-gray-500">{ch.s}</span>
                      <span className="text-right text-gray-500">{ch.r}</span>
                      <span className="text-right font-bold text-green-600">{ch.roas}</span>
                    </div>
                  ))}
                </div>

                {/* SVG Sparkline */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">Attribution trend</p>
                  <svg className="h-12 w-full" viewBox="0 0 280 48" preserveAspectRatio="none">
                    <path d="M0 40 L40 38 L80 28 L120 26 L160 16 L200 10 L240 6 L280 2 L280 48 L0 48 Z" fill="rgba(37,99,235,0.08)" />
                    <path d="M0 40 L40 38 L80 28 L120 26 L160 16 L200 10 L240 6 L280 2" fill="none" stroke="#2563EB" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Overlays – scroll reveal */}
            <div className="absolute -top-6 -right-12 z-20 hidden animate-bounce-slow lg:block reveal-scale">
              <div className="flex min-w-[180px] items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Link size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold">Connect</h4>
                  <p className="text-[10px] text-gray-500">All 8 channels. One view.</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-12 z-20 hidden animate-bounce-slow lg:block [animation-delay:1s] reveal-scale">
              <div className="flex min-w-[180px] items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600"><Lightbulb size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold">Decide</h4>
                  <p className="text-[10px] text-gray-500">AI Copilot. Live data.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-12 z-20 hidden animate-bounce-slow lg:block [animation-delay:1s] reveal-scale">
            <div className="flex min-w-[180px] items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600"><Lightbulb size={20} /></div>
              <div>
                <h4 className="text-sm font-bold">Attribute</h4>
                <p className="text-[10px] text-gray-500">Every sale. One channel. No overlap.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;