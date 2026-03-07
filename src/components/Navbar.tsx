
'use client';

import { useState, memo, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Brain, Bot, BarChart3, ChevronDown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<'products' | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const router = useRouter();


  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const goToCopilot = () => {
    window.location.href = "/products#copilot";
  };

  const closeMobile = () => setMobileMenuOpen(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
    fixed left-1/2 -translate-x-1/2 z-50 w-full
    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

    ${isScrolled
            ? "top-6 max-w-[95vw] lg:max-w-[980px] px-4"
            : "top-0 max-w-[95vw] xl:max-w-[1150px] px-4 sm:px-6 lg:px-8"
          }
  `}
      >

        <div
          className={`
    relative flex items-center justify-between
    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

    ${isScrolled
              ? "h-[52px] px-4 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-full"
              : "h-[64px] px-6 bg-transparent border-transparent shadow-none"
            }
  `}
        >

          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer pl-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
              className="flex items-center gap-3"
            >
              <div className=" rounded-full h-[26px] w-[26px] flex items-center justify-center overflow-hidden">
                <Image
                  src={logo}
                  alt="HypeOn AI Logo"
                  width={32}
                  height={32}
                
                />
              </div>
              <span className="font-semibold text-[15px] text-black tracking-tight flex items-start">
                HypeOn AI<span className="text-[12px] font-normal text-black/40 ml-0.5 mt-[1px]"></span>
              </span>
            </a>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center h-full gap-6 lg:gap-8">


            {/* PRODUCTS DROPDOWN */}
            <div className="group flex items-center h-full">
              <button className="flex items-center gap-1.5 text-[14px] font-medium text-black hover:opacity-70 transition-opacity">
                <a href="/products">Products</a>
                <ChevronDown className="w-3.5 h-3.5 text-black group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* DROPDOWN */}
              <div
                className="
                  absolute left-0 top-full
                  w-full
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  translate-y-2 group-hover:translate-y-0
                  transition-all duration-200
                  z-50
                "
              >
                <div className="rounded-3xl bg-white border border-slate-100 shadow-[0_12px_40px_rgb(0,0,0,0.08)] p-3 mt-3">
                  <div className="flex gap-3 h-[220px] hover:h-[380px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">

                    <MegaItem
                      icon={<Brain className="w-5 h-5" />}
                      title="HypeOn Intelligence"
                      desc="Predict demand, niches, and winning products."
                      onClick={() => (window.location.href = '/products')}
                      iconBg="bg-[#65D48C]"
                      iconColor="text-black"
                      illustration={<CopilotIllustration />}
                    />

                    

                    <MegaItem
                      icon={<BarChart3 className="w-5 h-5" />}
                      title="HypeOn Analytics"
                      desc="Cross-channel attribution, CAC, ROI, and actionable growth insights."
                      onClick={() => (window.location.href = '/analytics')}
                      iconBg="bg-[#241C1A]"
                      iconColor="text-[#E66245]"
                      illustration={<AnalyticsIllustration short />}
                    /></div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPricing(true)}
              className="text-[14px] font-medium text-black hover:opacity-70 transition-opacity"
            >
              Pricing
            </button>

            <a
              href="/about"
              className="text-[14px] font-medium text-black hover:opacity-70 transition-opacity"
            >
              Company
            </a>

            <a
              href="/success-stories"
              className="text-[14px] font-medium text-black hover:opacity-70 transition-opacity"
            >
              Success Stories
            </a>

          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-5 pr-1">
            <a
              href="https://app.hypeon.ai/login"
              className="text-[14px] font-medium text-black hover:opacity-70 transition-opacity"
            >
              Login
            </a>

            <a
              href="https://app.hypeon.ai/login"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[14px] font-semibold text-white bg-black hover:bg-black/80 transition-colors"
            >
              Get Early Access
            </a>
          </div>



          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-black pr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU BACKDROP */}

      <div className="md:hidden fixed top-[84px] left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
        <div
          className={`
      bg-white/60 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl
      transform origin-top
      transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${mobileMenuOpen
              ? "scale-y-100 opacity-100 translate-y-0"
              : "scale-y-95 opacity-0 -translate-y-2 pointer-events-none"}
    `}
        >
          <div className="px-5 py-5 space-y-3">
            {/* Products */}
            <div>
              <button
                className="w-full flex items-center justify-between py-3 text-base font-medium text-slate-700"
                onClick={() =>
                  setMobileDropdown((d) =>
                    d === "products" ? null : "products"
                  )
                }
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileDropdown === "products" ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${mobileDropdown === "products"
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
              >
                <div className="pl-3 pt-2 space-y-2">
                  <MobileProductLink
                    icon={<Brain />}
                    title="HypeOn Intelligence"
                    desc="Predict demand and winning products."
                    onClick={() => {
                      closeMobile();
                      window.location.href = "/products";
                    }}
                  />
                  <MobileProductLink
                    icon={<Bot />}
                    title="HypeOn Copilot"
                    desc="AI-powered insights instantly."
                    onClick={() => {
                      closeMobile();
                      goToCopilot();
                    }}
                  />
                  <MobileProductLink
                    icon={<BarChart3 />}
                    title="HypeOn Analytics"
                    desc="ROI, CAC and growth insights."
                    onClick={() => {
                      closeMobile();
                      window.location.href = "/products#analytics";
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Other Links */}
            <a
              href="/solutions"
              onClick={closeMobile}
              className="block py-3 text-base font-medium text-slate-700"
            >
              Solutions
            </a>
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <a
              href="/about"
              onClick={closeMobile}
              className="block py-3 text-base font-medium text-slate-700"
            >
              Company
            </a>
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <button
              onClick={() => {
                setShowPricing(true);
                closeMobile();
              }}
              className="block py-3 text-base font-medium text-slate-700"
            >
              Pricing
            </button>
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* CTA */}
            <div className="pt-4 flex gap-3">
              <a
                href="https://app.hypeon.ai/login"
                className="flex-1 text-center py-2.5 rounded-full border border-slate-300 text-base font-medium"
              >
                Log in
              </a>
              <a
                href="https://app.hypeon.ai/login"
                className="flex-1 text-center py-2.5 rounded-full bg-slate-900 text-white text-base font-medium"
              >
                Try HypeOn
              </a>
            </div>

          </div>
        </div>
      </div>
      {/* PRICING MODAL */}
      {showPricing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowPricing(false)}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-2xl bg-white p-8 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setShowPricing(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h3 className="text-2xl font-display font-semibold text-slate-900">
              Pricing
            </h3>

            <p className="mt-3 text-slate-600">
              pricing plans are on the way.
            </p>

            <div className="mt-6 inline-block rounded-full bg-brand-600/10 px-5 py-2 text-brand-600 font-medium">
              Coming Soon
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Navbar);

/* ================= MEGA ITEM ================= */

function MegaItem({
  icon,
  title,
  desc,
  onClick,
  iconBg,
  iconColor,
  illustration,
  expandedIllustration,
  isActive,
  isInactive,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
  iconBg?: string;
  iconColor?: string;
  illustration?: React.ReactNode;
  expandedIllustration?: React.ReactNode;
  isActive?: boolean;
  isInactive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group/card relative
        text-left
        flex flex-col
        p-4 rounded-2xl border border-slate-100/80
        hover:border-slate-300/60 hover:bg-slate-50/50 hover:shadow-sm
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        h-full
        flex-1 hover:flex-[1.1]
        overflow-hidden
        ${isActive ? 'min-w-[60%] ring-1 ring-slate-200 shadow-md bg-white' : 'bg-white'}
        ${isInactive ? 'opacity-40 hover:opacity-100' : ''}
      `}
    >
      <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-[12px] mb-auto transition-transform duration-500 ${isActive ? 'scale-90 origin-top-left' : ''} ${iconBg || 'bg-slate-900'} ${iconColor || 'text-white'}`}>
        {icon}
      </div>

      {/* Short Illustration (Hover) */}
      {!isActive && illustration && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-4 group-hover/card:-translate-y-[50%] pointer-events-none z-0 mt-4">
          {illustration}
        </div>
      )}

      {/* Expanded Illustration (Active) */}
      {isActive && expandedIllustration && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[50%] w-full h-full flex items-center justify-center pointer-events-none z-0 mt-[-20px] animate-in fade-in zoom-in duration-500">
          {expandedIllustration}
        </div>
      )}

      <div className={`mt-14 relative z-10 transition-transform duration-500 ${isActive ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <p className="font-semibold text-[13px] tracking-tight text-slate-900">{title}</p>
        <p className={`text-[13px] text-slate-500 leading-snug mt-1.5 transition-all duration-500 ${isActive ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>{desc}</p>
      </div>
    </button>
  );
}

/* ================= MOBILE PRODUCT LINK ================= */

function MobileProductLink({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left flex gap-3 p-3 rounded-xl hover:bg-white transition"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-medium text-slate-900 text-sm">{title}</p>
        <p className="text-xs text-slate-600 leading-snug">{desc}</p>
      </div>
    </button>
  );
}

/* ================= ILLUSTRATIONS ================= */

import { Search, History, ArrowUp, Paperclip, Plus as PlusIcon } from 'lucide-react';



const IntelligenceIllustration = ({ short }: { short?: boolean }) => {
  return (
    <div
      className={`
        relative
        rounded-2xl
        overflow-hidden
  
        border border-slate-200
        bg-white
        transition-all duration-500
        ${short ? "w-[260px]" : "w-[420px]"}
        mt-2
      `}
    >
      <Image
        src="/images/video.mp4"
        alt="HypeOn Intelligence Dashboard"
        width={800}
        height={600}
        className="w-full h-auto object-cover"
      />

      {/* Soft gradient fade bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
    </div>
  );
};

const COPILOT_PLACEHOLDER = 'Analyze which products are driving the most';

const CopilotIllustration = ({ short }: { short?: boolean }) => {
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTyping = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= COPILOT_PLACEHOLDER.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          restartTimeoutRef.current = setTimeout(() => {
            setCharIndex(0);
            startTyping();
          }, 1800);
          return prev;
        }
        return prev + 1;
      });
    }, 45);
  }, []);

  useEffect(() => {
    if (short) return;
    setCharIndex(0);
    const startDelay = setTimeout(startTyping, 200);
    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    };
  }, [short, startTyping]);

  if (short) {
    return (
      <div className="flex flex-col gap-3 w-[180px]">
        <div className="bg-white rounded-2xl rounded-tr-sm shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-slate-100 p-3 text-[12px] font-medium text-slate-600 self-end max-w-[85%]">
          Analyze my store
        </div>
        <div className="bg-[#121420] text-white rounded-2xl rounded-tl-sm shadow-[0_8px_20px_rgba(0,0,0,0.15)] p-3 text-[12px] font-medium self-start max-w-[95%] leading-relaxed">
          Your top selling product is up <span className="text-[#65D48C]">24%</span> this week.
        </div>
      </div>
    );
  }

  const visibleText = COPILOT_PLACEHOLDER.slice(0, charIndex);
  const isComplete = charIndex >= COPILOT_PLACEHOLDER.length;

  return (
    <div className="w-[340px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-100 p-1 flex flex-col">
      <div className="p-4 px-5 min-h-[52px]">
        <p className="text-[14px] text-slate-700 tracking-tight leading-relaxed flex items-center flex-wrap">
          {visibleText}
          <span
            className={`inline-block w-0.5 h-4 ml-0.5 bg-slate-400 align-middle ${
              isComplete ? 'animate-pulse' : ''
            }`}
            aria-hidden
          />
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 pb-3 pt-4 mt-auto">
        <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <Paperclip className="w-4 h-4" />
        </button>
        <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <PlusIcon className="w-4 h-4" />
        </button>
        <div className="flex-1"></div>
        <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-black text-white hover:bg-slate-800 transition-colors">
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const AnalyticsIllustration = ({ short }: { short?: boolean }) => (
  <div className={`bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 flex items-end justify-center gap-2 ${short ? 'w-[160px] h-[110px] p-4' : 'w-[240px] h-[140px] p-5 gap-3'}`}>
    <div className={`${short ? 'w-8' : 'w-10'} bg-[#241C1A]/10 rounded-t-md transition-all duration-500 ease-out h-[30%] ${!short && 'animate-[grow_1s_ease-out_forwards]'}`}></div>
    <div className={`${short ? 'w-8' : 'w-10'} bg-[#241C1A]/20 rounded-t-md transition-all duration-500 ease-out h-[50%] ${!short && 'animate-[grow_1s_ease-out_0.1s_forwards]'}`}></div>
    <div className={`${short ? 'w-8' : 'w-10'} bg-[#E66245] rounded-t-md transition-all duration-500 ease-out h-[80%] relative flex justify-center ${!short && 'animate-[grow_1s_ease-out_0.2s_forwards]'}`}>
      <div className={`absolute ${short ? '-top-6 text-[11px]' : '-top-7 text-[13px]'} font-bold text-[#E66245] ${!short && 'opacity-0 animate-[fade-in_0.5s_ease-out_0.8s_forwards]'}`}>{!short && '+48%'}</div>
    </div>
  </div>
);