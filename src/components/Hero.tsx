'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  PanelLeft,
  TrendingDown,
  ArrowRight,
  Lock,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';

const PLATFORM_LOGOS = [
  { name: 'Meta Ads', src: '/logos/meta.png' },
  { name: 'Google Trends', src: '/logos/google.png' },
  { name: 'Shopify', src: '/logos/shopify.png' },
  { name: 'Amazon', src: '/logos/amazon.png' },
  { name: 'TikTok Shop', src: '/logos/tiktok.webp' },
  { name: 'Instagram', src: '/logos/instagram.png' },
  { name: 'Pinterest', src: '/logos/pinterest.png' },
] as const;

export default function Hero() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [chatStep, setChatStep] = useState(0);

  const textToType = 'Give me the top 20 trending products in the Fashion category for US. ';

  useEffect(() => {
    let isActive = true;
    let currentText = '';
    let typingIndex = 0;

    function typeChar() {
      if (!isActive) return;
      if (typingIndex < textToType.length) {
        currentText += textToType.charAt(typingIndex);
        setInputValue(currentText);
        typingIndex++;
        setTimeout(typeChar, 35);
      } else {
        if (isActive) setChatStep(1);
        setTimeout(() => {
          if (isActive) setChatStep(2);
        }, 600);
      }
    }

    const timeout = setTimeout(typeChar, 1000);
    return () => { isActive = false; clearTimeout(timeout); };
  }, [textToType]);

  useEffect(() => {
    let isActive = true;
    if (chatStep === 2) {
      setInputValue('');
      setTimeout(() => { if (isActive) setChatStep(3); }, 400);
    } else if (chatStep === 3) {
      setTimeout(() => { if (isActive) setChatStep(4); }, 1500);
    }
    return () => { isActive = false; };
  }, [chatStep]);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const dashboard = dashboardRef.current;
    if (!heroSection || !dashboard) return;

    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!window.matchMedia('(min-width: 1024px)').matches) return;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
          const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
          const clampX = Math.max(-2, Math.min(2, xAxis));
          const clampY = Math.max(-2, Math.min(2, yAxis));
          if (Math.abs(clampX - lastX) > 0.1 || Math.abs(clampY - lastY) > 0.1) {
            dashboard.style.transform = `rotateY(${clampX}deg) rotateX(${clampY}deg)`;
            lastX = clampX;
            lastY = clampY;
          }
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      dashboard.style.transform = 'rotateY(0deg) rotateX(0deg)';
      lastX = 0; lastY = 0;
    };

    heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  const words = [
    "Wrong Product.",
    "Wrong Channel.",
    "Wrong Ads.",
    "Wrong Pricing.",
    "Wrong Markets.",
    "Wrong Audience.",
    "Wrong Campaign.",
    "Wrong Geo.",
    "Wrong Creative.",
    "Wrong Trend.",
    "Wrong Inventory.",
    "Wrong Customer."
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800); // slower cycle so each word is readable longer

    return () => clearInterval(interval);
  }, []);
  return (
    <section ref={heroSectionRef} className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pt-16 lg:pb-32 bg-[oklch(0.988_0.0041_91.45)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ── TOP: TEXT CONTENT (isolation + z-20 so CTA is always on top and clickable) ── */}
        <div className="relative z-20 isolation-isolate overflow-hidden">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 lg:px-12 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-24 lg:pb-32">

            <div className="max-w-5xl text-left pl-0 lg:pl-16 w-full">

              {/* Badge */}
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-black text-white flex-shrink-0">
                  <Activity className="w-3 h-3" />
                </span>
                <span className="text-slate-600 font-medium text-sm sm:text-base tracking-tight">
                  Built on millions of data signals
                </span>
              </div>

              {/* Headline: 36–40px mobile, 64–72px desktop; normal weight; animation scales with font */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tighter leading-[1.12] text-neutral-900 mb-6 sm:mb-10">
                Stop wasting budget <br className="sm:hidden" /> on the {" "}
                <span className="relative inline-block align-baseline h-[1.3em] min-w-[300px] sm:min-w-[340px] md:min-w-[440px] lg:min-w-[560px] xl:min-w-[680px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{
                        opacity: 0,
                        y: "0.4em",
                        filter: "blur(0.15em)"
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                      }}
                      exit={{
                        opacity: 0,
                        y: "-0.4em",
                        filter: "blur(0.15em)"
                      }}
                      transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="absolute left-0 top-0 whitespace-nowrap"
                      style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* CTA — pointer-events-auto + mobile fallback so tap always works */}
              <a
                href="https://calendly.com/yash-hypeon/30min?month=2026-03"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    e.preventDefault();
                    window.location.href = 'https://calendly.com/yash-hypeon/30min?month=2026-03';
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 pl-2 pr-4 sm:pr-5 py-1.5 sm:py-2 min-h-[44px] sm:min-h-0
  rounded-full text-base font-semibold
  text-white bg-black hover:bg-neutral-900
  transition-all duration-300 shadow-lg cursor-pointer pointer-events-auto
  mt-4 sm:mt-6 relative z-10 select-none touch-manipulation"
              >
                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black flex-shrink-0 cursor-pointer">
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </span>
                Get the demo
              </a>

            </div>
          </div>
        </div>

        {/* ── BOTTOM: MINIMAL UI MOCKUP (perspective only here so CTA hit-testing is not affected) ── */}
        <div className="w-full relative z-0 reveal lg:px-0 mx-auto max-w-5xl xl:max-w-8xl perspective-container">
          <div ref={dashboardRef} className="card-3d-wrap relative transform-gpu">

            {/* Float Element: Notification */}
            <div
              className="hidden lg:flex absolute -right-12 top-10 z-20 bg-white p-4 rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] border border-slate-100 items-center gap-3 animate-float max-w-xs origin-bottom-left"
            >
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-[10px] flex items-center justify-center text-slate-900">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-0.5">ROAS ALERT</div>
                <div className="text-sm font-medium text-slate-900">Ad spend inefficiency detected. Need me to adjust it?</div>
              </div>
            </div>

            <div
              className="relative bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200/50 flex flex-col items-center"
              style={{
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.12), 0 10px 30px -6px rgba(0,0,0,0.06)',
              }}
            >
              {/* Minimal Header */}
              <div className="w-full bg-[#fcfcfc] border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <div className=" rounded-full h-[28px] w-[28px] flex items-center justify-center overflow-hidden">
                    <Image
                      src={logo}
                      alt="HypeOn AI Logo"
                      width={28}
                      height={28}

                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-900 tracking-tight">HypeOn Assistant</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-pinks-50 text-black-700 rounded-full text-xs font-semibold border border-green-100 tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse"></div>
                    SYNCED WITH SHOPIFY
                  </div>
                  <button className="text-slate-400 hover:text-slate-900 transition-colors">
                    <PanelLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="w-full h-[600px] flex flex-col relative bg-[#fcfcfc]">

                <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-10 pb-40 w-full max-w-4xl mx-auto scrollbar-thin scrollbar-thumb-slate-300">

                  {/* Empty state context / AI greeting */}
                  {chatStep < 2 && (
                    <div className="w-full text-center mt-20 animate-fade-in opacity-80">
                      <div className="flex items-center justify-center mb-6">
                        <div className=" rounded-full h-[60px] w-[60px] flex items-center justify-center overflow-hidden">
                          <Image
                            src={logo}
                            alt="HypeOn AI Logo"
                            width={60}
                            height={60}

                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-medium text-slate-900 mb-2">How can I grow your store today?</h3>
                      <p className="text-sm text-slate-500">I have access to your Shopify data, TikTok Ads, and Meta Ads.</p>
                    </div>
                  )}

                  {/* User sent message */}
                  {chatStep >= 2 && (
                    <div className="flex w-full justify-end mb-10 animate-fade-up">
                      <div className="bg-[#f0f0f0] rounded-2xl rounded-tr-sm px-5 py-4 max-w-[85%] text-slate-900 text-[15px] font-medium leading-relaxed shadow-sm text-left">
                        {textToType}
                      </div>
                    </div>
                  )}

                  {/* AI Response Container */}
                  {chatStep >= 3 && (
                    <div className="flex justify-start w-full animate-fade-up mt-8">
                      <div className=" rounded-full h-[28px] w-[28px] flex items-center justify-center overflow-hidden">
                        <Image
                          src={logo}
                          alt="HypeOn AI Logo"
                          width={28}
                          height={28}

                        />
                      </div>
                      <div className="ml-5 flex-1 min-w-0 text-left">

                        {/* Thinking Dots */}
                        {chatStep === 3 && (
                          <div className="bg-white border border-slate-100 px-5 py-4 rounded-2xl rounded-tl-sm w-max shadow-sm h-12 flex flex-col justify-center">
                            <div className="flex space-x-1.5 items-center">
                              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                            </div>
                          </div>
                        )}

                        {/* Complete Response */}
                        {/* Complete Response */}
                        {chatStep >= 4 && (
                          <div className="animate-fade-up space-y-6 w-full">

                            {/* AI Intro Text */}
                            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-sm p-6 w-full">
                              <p className="text-[15px] text-slate-700 leading-relaxed font-medium">
                                I've analyzed <span className="px-1.5 py-0.5 rounded bg-gray-50 text-slate-900 font-semibold border border-black-100">
                                  12.4M live fashion ad creatives
                                </span> across Meta & TikTok India US.
                                Here are the top 20 Fashion products ranked by projected profitability and ad velocity.
                              </p>
                            </div>

                            {/* Table Container */}
                            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 max-h-[380px] overflow-auto">

                              <table className="min-w-full text-left text-sm">
                                <thead>
                                  <tr className="border-b border-slate-100 text-slate-500 uppercase text-xs tracking-wider">
                                    <th className="py-3 pr-6">Product</th>
                                    <th className="py-3 pr-6">Brand</th>
                                    <th className="py-3 pr-6">Price</th>
                                    <th className="py-3 pr-6">HypeScore</th>
                                    <th className="py-3">Avg CPC</th>
                                  </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-50">

                                  {[
                                    ["Oversized Graphic Tee", "Urban Monkey", "$15.65", "96", "$0.10"],
                                    ["Cargo Utility Pants", "Snitch", "$22.88", "94", "$0.11"],
                                    ["Korean Co-ord Set", "Sassafras", "$26.49", "92", "$0.12"],
                                    ["Chunky Sneakers", "HRX", "$42.16", "91", "$0.14"],
                                    ["Y2K Shoulder Bag", "Mango", "$33.72", "90", "$0.10"],
                                    ["Minimal Silver Chains", "Giva", "$18.06", "89", "$0.08"],
                                    ["Linen Summer Shirt", "Rare Rabbit", "$30.11", "88", "$0.12"],
                                    ["Relaxed Fit Jeans", "Levi's", "$39.75", "87", "$0.15"],
                                    ["Platform Sandals", "H&M", "$27.70", "86", "$0.11"],
                                    ["Oversized Hoodie", "Bonkers Corner", "$24.08", "85", "$0.11"],
                                    ["Satin Slip Dress", "Forever New", "$48.18", "84", "$0.16"],
                                    ["Retro Sunglasses", "Fastrack", "$19.27", "83", "$0.09"],
                                    ["Athleisure Joggers", "Nike", "$45.77", "82", "$0.17"],
                                    ["Faux Leather Jacket", "Zara", "$72.28", "81", "$0.18"],
                                    ["Street Style Cap", "Adidas", "$15.65", "80", "$0.08"],
                                    ["Boho Maxi Dress", "AND", "$42.16", "79", "$0.13"],
                                    ["Structured Blazer", "Mango", "$54.20", "78", "$0.17"],
                                    ["Graphic Sweatshirt", "Bewakoof", "$20.47", "77", "$0.10"],
                                    ["Statement Earrings", "Zaveri Pearls", "$12.04", "76", "$0.07"],
                                    ["Knit Polo T-Shirt", "Uniqlo", "$27.70", "75", "$0.11"]
                                  ].map((item, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                      <td className="py-3 pr-6 font-medium text-slate-900">{item[0]}</td>
                                      <td className="py-3 pr-6 text-slate-600">{item[1]}</td>
                                      <td className="py-3 pr-6 text-slate-700">{item[2]}</td>
                                      <td className="py-3 pr-6">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-black-50 text-black-700 border border-black-100">
                                          {item[3]}
                                        </span>
                                      </td>
                                      <td className="py-3 text-slate-700">{item[4]}</td>
                                    </tr>
                                  ))}

                                </tbody>
                              </table>

                            </div>

                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* Minimalist Input Footer */}
                <div className="absolute w-full bottom-0 left-0 px-6 sm:px-12 py-6 bg-gradient-to-t from-[#fcfcfc] via-[#fcfcfc] to-transparent pt-12">
                  <div className="max-w-3xl mx-auto relative group flex items-center bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-within:border-slate-300 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                    <input
                      type="text"
                      readOnly
                      value={inputValue}
                      placeholder="Ask HypeOn AI anything about your store..."
                      className="w-full bg-transparent py-4 pl-5 pr-14 text-[15px] text-slate-900 font-medium placeholder-slate-400 outline-none"
                    />
                    <button
                      className={`absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-xl transition-all ${inputValue.length > 0 || chatStep >= 2
                        ? 'bg-black text-white hover:bg-slate-800 scale-100'
                        : 'bg-[#f5f5f5] text-slate-400 scale-95'
                        }`}
                    >
                      <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="flex justify-center mt-3 text-xs font-semibold tracking-wide text-slate-400 space-x-1.5">
                    <Lock className="w-3 h-3" />
                    <span>256-BIT SECURE CONNECTION TO STORE</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 lg:pt-10 reveal">
        <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6 lg:mb-8 text-center px-2">
          Trusted by founders scaling on
        </p>
        <div className="marquee-container overflow-x-hidden">
          <div className="marquee-content flex justify-center">
            {[...Array(5)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-8">
                {PLATFORM_LOGOS.map(({ name, src }) => (
                  <div
                    key={src}
                    className="flex items-center gap-2 font-semibold text-base sm:text-lg text-slate-700 whitespace-nowrap"
                  >
                    <span className="relative w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 rounded flex items-center justify-center bg-white border border-slate-100 overflow-hidden p-0.5">
                      <Image
                        src={src}
                        alt=""
                        width={28}
                        height={28}
                        className="object-contain w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </span>
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
