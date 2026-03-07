'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  ArrowUp,
  PanelLeft,
  User,
  Zap,
  TrendingDown,
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
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';

export default function Hero() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [chatStep, setChatStep] = useState(0);

  const textToType = 'Give me the top 20 trending products in the Fashion category for India. ';

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
    }, 2000); // change every 2s

    return () => clearInterval(interval);
  }, []);
  return (
    <section ref={heroSectionRef} className="relative pt-24 pb-20 lg:pt-16 lg:pb-32 bg-[#FDFDFC] overflow-hidden perspective-container">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

        {/* ── TOP: TEXT CONTENT ── */}
        <div className="relative bg-[#FDFDFC] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-32">

            <div className="max-w-5xl text-left pl-0 lg:pl-16">

              {/* Badge */}
              <div className="flex items-center gap-3 mb-10">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-green-100 text-green-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-slate-600 font-medium text-sm tracking-tight">
              Built on millions of data signals
                </span>
              </div>

              {/* Headline */}
<h1 className="text-[20px] sm:text-[24px] md:text-[34px] lg:text-[42px] 
font-medium tracking-[-0.015em] leading-[1.08] text-neutral-900 mb-10">
                Stop wasting budget on the {" "} <br />
                <span className="relative inline-block align-baseline h-[1em] min-w-[240px] sm:min-w-[300px] md:min-w-[360px] lg:min-w-[400px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{
                        opacity: 0,
                        y: 30,
                        filter: "blur(8px)"
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                      }}
                      exit={{
                        opacity: 0,
                        y: -30,
                        filter: "blur(8px)"
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] // premium easing
                      }}
                      className="absolute left-0 top-0 whitespace-nowrap"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* CTA */}
              <a
  href="https://app.hypeon.ai/login"
  className="inline-flex items-center gap-2 pl-2 pr-5 py-2
  rounded-full text-[14px] font-medium
  text-white bg-black hover:bg-neutral-900
  transition-all duration-300 shadow-lg
  mt-6"
>
  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-black">
    <ArrowRight className="w-3 h-3" />
  </span>
  Get Early Access
</a>

            </div>
          </div>
        </div>

        {/* ── BOTTOM: MINIMAL UI MOCKUP ── */}
        <div className="w-full relative reveal lg:px-0 mx-auto max-w-5xl xl:max-w-8xl">
          <div ref={dashboardRef} className="card-3d-wrap relative transform-gpu">

            {/* Float Element: Notification */}
            <div
              className="hidden lg:flex absolute -right-12 top-10 z-20 bg-white p-4 rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] border border-slate-100 items-center gap-3 animate-float max-w-xs origin-bottom-left"
            >
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-[10px] flex items-center justify-center text-slate-900">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">ROAS ALERT</div>
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
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-pinks-50 text-pink-700 rounded-full text-xs font-semibold border border-green-100 tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
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
                                I've analyzed <span className="px-1.5 py-0.5 rounded bg-pink-50 text-pink-700 font-semibold border border-pink-100">
                                  12.4M live fashion ad creatives
                                </span> across Meta & TikTok India.
                                Here are the top 20 Fashion products ranked by projected profitability and ad velocity.
                              </p>
                            </div>

                            {/* Table Container */}
                            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 max-h-[380px] overflow-auto">

                              <table className="min-w-full text-left text-sm">
                                <thead>
                                  <tr className="border-b border-slate-100 text-slate-500 uppercase text-[11px] tracking-wider">
                                    <th className="py-3 pr-6">Product</th>
                                    <th className="py-3 pr-6">Brand</th>
                                    <th className="py-3 pr-6">Price</th>
                                    <th className="py-3 pr-6">HypeScore</th>
                                    <th className="py-3">Avg CPC</th>
                                  </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-50">

                                  {[
                                    ["Oversized Graphic Tee", "Urban Monkey", "₹1,299", "96", "₹8.40"],
                                    ["Cargo Utility Pants", "Snitch", "₹1,899", "94", "₹9.10"],
                                    ["Korean Co-ord Set", "Sassafras", "₹2,199", "92", "₹10.20"],
                                    ["Chunky Sneakers", "HRX", "₹3,499", "91", "₹11.50"],
                                    ["Y2K Shoulder Bag", "Mango", "₹2,799", "90", "₹7.90"],
                                    ["Minimal Silver Chains", "Giva", "₹1,499", "89", "₹6.30"],
                                    ["Linen Summer Shirt", "Rare Rabbit", "₹2,499", "88", "₹9.80"],
                                    ["Relaxed Fit Jeans", "Levi's", "₹3,299", "87", "₹12.40"],
                                    ["Platform Sandals", "H&M", "₹2,299", "86", "₹8.75"],
                                    ["Oversized Hoodie", "Bonkers Corner", "₹1,999", "85", "₹9.20"],
                                    ["Satin Slip Dress", "Forever New", "₹3,999", "84", "₹13.50"],
                                    ["Retro Sunglasses", "Fastrack", "₹1,599", "83", "₹7.40"],
                                    ["Athleisure Joggers", "Nike", "₹3,799", "82", "₹14.10"],
                                    ["Faux Leather Jacket", "Zara", "₹5,999", "81", "₹15.30"],
                                    ["Street Style Cap", "Adidas", "₹1,299", "80", "₹6.90"],
                                    ["Boho Maxi Dress", "AND", "₹3,499", "79", "₹11.20"],
                                    ["Structured Blazer", "Mango", "₹4,499", "78", "₹13.80"],
                                    ["Graphic Sweatshirt", "Bewakoof", "₹1,699", "77", "₹8.60"],
                                    ["Statement Earrings", "Zaveri Pearls", "₹999", "76", "₹5.40"],
                                    ["Knit Polo T-Shirt", "Uniqlo", "₹2,299", "75", "₹9.00"],
                                  ].map((item, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                      <td className="py-3 pr-6 font-medium text-slate-900">{item[0]}</td>
                                      <td className="py-3 pr-6 text-slate-600">{item[1]}</td>
                                      <td className="py-3 pr-6 text-slate-700">{item[2]}</td>
                                      <td className="py-3 pr-6">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-pink-50 text-pink-700 border border-pink-100">
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
                  <div className="flex justify-center mt-3 text-[11px] font-semibold tracking-wide text-slate-400 space-x-1.5">
                    <Lock className="w-3 h-3" />
                    <span>256-BIT SECURE CONNECTION TO STORE</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-20 pt-10  reveal">
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

    </section>
  );
}
