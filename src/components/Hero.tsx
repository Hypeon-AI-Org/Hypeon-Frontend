'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Zap,
  PlayCircle,
  TrendingUp,
  Bot,
  Sparkles,
  Search,
  Video,
  Instagram,
  ShoppingBag,
  Package,
  Music2,
  Facebook,
  Lock,
  BarChart3,
} from 'lucide-react';

export default function Hero() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const resultsAreaRef = useRef<HTMLDivElement>(null);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    // Dynamic Typewriter
    const textElement = typewriterRef.current;
    const resultsArea = resultsAreaRef.current;

    if (!textElement || !resultsArea) return;

    const textToType = "Find me trending pet accessories in Germany under €50...";
    let i = 0;

    function typeWriter() {
      if (i < textToType.length && textElement) {
        textElement.textContent = textToType.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // Typing finished, show results
        setTypingComplete(true);
        setTimeout(() => {
          if (resultsArea) {
            resultsArea.classList.remove('opacity-0');
          }
        }, 500);
      }
    }

    const timeout = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // 3D Tilt Effect for Hero Dashboard
    const heroSection = heroSectionRef.current;
    const dashboard = dashboardRef.current;

    if (!heroSection || !dashboard) return;

    // Only active on desktop for performance
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        // Limit rotation
        const clampX = Math.max(-10, Math.min(10, xAxis));
        const clampY = Math.max(-10, Math.min(10, yAxis));

        dashboard.style.transform = `rotateY(${clampX}deg) rotateX(${clampY}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (dashboard) {
        dashboard.style.transform = `rotateY(0deg) rotateX(0deg)`;
      }
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 z-10 perspective-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-medium mb-8 animate-fade-up hover:border-brand-400 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          New: Predictive Hype Score v2.0 is Live
        </div>

        {/* Headline */}
        <h1
          className="text-3xl md:text-5xl font-display tracking-tight mb-6 text-slate-900 leading-[1.1] animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          Your end-to-end <br className="hidden md:block" />
          AI Copilot for D2C Growth
        </h1>

        <p
          className="mt-6 max-w-2xl mx-auto text-xl text-slate-500 mb-10 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          Powered by our <span className="text-slate-900 font-semibold">Hype Score</span>, we analyze{' '}
          <span className="text-slate-900 font-semibold">20M+ signals</span> to uncover product trends, high-value keywords, and winning ad creatives before your competition even knows they exist.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 rounded-xl text-white font-bold text-lg shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group"
          >
            <Zap className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
            Find My Next Winner
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-slate-700 font-semibold text-lg transition-all flex items-center justify-center gap-2 hover:bg-slate-50"
          >
            <PlayCircle className="w-5 h-5 text-brand-600" />
            Watch 1-Min Demo
          </a>
        </div>

        {/* AI Interface Demo with Copilot Preview */}
        <div className="relative max-w-5xl mx-auto reveal" id="hero-dashboard">
          <div ref={dashboardRef} className="card-3d-wrap relative">
            {/* Floating Element: Success Notification (Top Right) */}
            <div className="hidden md:flex absolute -top-12 -right-12 z-20 bg-white p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 card-element-float items-center gap-3 animate-float">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold uppercase">Trend Detected</div>
                <div className="font-bold text-slate-900">Pet Grooming Vac +420%</div>
              </div>
            </div>

            {/* Floating Element: AI Chat (Bottom Left) */}
            <div className="hidden md:flex absolute -bottom-8 -left-12 z-20 bg-white p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 card-element-float items-start gap-3 animate-float-delayed max-w-xs text-left">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase mb-1">AI Copilot</div>
                <div className="text-sm font-medium text-slate-800">
                  "I found 3 untapped niches in Germany with low ad competition."
                </div>
              </div>
            </div>

            {/* Main Interface */}
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden card-element-base">
              {/* Mac Window Header */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> hypeon.ai/dashboard
                </div>
                <div className="w-16"></div>
              </div>

              {/* UI Body */}
              <div className="grid grid-cols-12 h-[500px]">
                {/* Sidebar */}
                <div className="col-span-3 bg-slate-50 border-r border-slate-100 p-6 hidden md:block text-left">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        DISCOVERY
                      </p>
                      <div className="flex items-center gap-3 px-3 py-2 bg-brand-50 text-brand-700 rounded-lg font-medium border border-brand-100">
                        <Sparkles className="w-4 h-4" /> Trend Spotter
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
                        <Search className="w-4 h-4" /> Keyword Spy
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
                        <Video className="w-4 h-4" /> Ad Creatives
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Saved Launches
                      </p>
                      <div className="flex items-center gap-3 px-3 py-2 text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div> Project Alpha
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Summer Drop
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main View */}
                <div className="col-span-12 md:col-span-9 p-8 bg-white text-left overflow-y-auto">
                  {/* Copilot Chat Area */}
                  <div className="mb-8">
                    <h3 className="text-2xl text-slate-900 mb-4">Ask HypeOn AI Copilot</h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-400 to-blue-500 flex-shrink-0 flex items-center justify-center shadow-sm">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-h-[24px]">
                        <span className="text-slate-600 text-sm font-mono" ref={typewriterRef}></span>
                        {typingComplete && (
                          <span className="cursor-blink inline-block w-0.5 h-4 bg-brand-500 align-middle ml-1"></span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Results Area - Hidden initially, revealed after typing */}
                  <div
                    ref={resultsAreaRef}
                    className="opacity-0 transition-opacity duration-1000 grid grid-cols-1 md:grid-cols-2 gap-4"
                    id="results-area"
                  >
                    {/* Result 1: Calming Pet Bed */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-brand-300 transition-colors group cursor-pointer relative">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xl border border-slate-200">
                            🐶
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Calming Pet Bed</h4>
                            <p className="text-xs text-slate-500">Niche: Pet Accessories</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-mono font-semibold">
                          +420% Vol
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Launch Score</span>
                          <span className="text-brand-600 font-bold">92/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-brand-400 to-brand-600 w-[92%]"></div>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 border border-slate-200">
                            TikTok Viral
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 border border-slate-200">
                            Low Competition
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Result 2: Hydrogen Water Bottle */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-brand-300 transition-colors group cursor-pointer relative">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xl border border-slate-200">
                            💧
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Hydrogen Water Bottle</h4>
                            <p className="text-xs text-slate-500">Niche: Wellness</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-mono font-semibold">
                          +185% Vol
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Launch Score</span>
                          <span className="text-brand-600 font-bold">88/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-brand-400 to-brand-600 w-[88%]"></div>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 border border-slate-200">
                            Google Trends
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 border border-slate-200">
                            High Margin
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logos Marquee */}
        <div className="mt-20 pt-10 border-t border-slate-200 reveal">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8 text-center">
            Trusted by founders scaling on
          </p>
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
      </div>
    </section>
  );
}
