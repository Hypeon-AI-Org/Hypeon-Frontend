
'use client';

import { useState, memo, useEffect, useRef, useCallback } from 'react';
import { Menu, X, BarChart3, ChevronDown, Sparkles, Wand2 } from 'lucide-react';
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<'products' | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  // Dark navbar variant — only on the Studio page (dark background).
  const isDark = pathname === "/studio";

  const closeMobile = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  }, []);

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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, closeMobile]);

  const goToCopilot = () => {
    closeMobile();
    router.push("/products#copilot");
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled((prev) => {
          const next = window.scrollY > 60;
          return prev === next ? prev : next;
        });
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
    fixed left-1/2 -translate-x-1/2 z-50 w-full
    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

    ${isScrolled
            ? "top-3 sm:top-4 md:top-6 max-w-[95vw] lg:max-w-[980px] pl-[max(0px,env(safe-area-inset-left))] pr-[max(0.25rem,env(safe-area-inset-right))] sm:pl-2 sm:pr-4 lg:px-3"
            : "top-0 max-w-[95vw] xl:max-w-[1150px] pl-[max(0px,env(safe-area-inset-left))] pr-[max(0.25rem,env(safe-area-inset-right))] sm:pl-2 sm:pr-5 md:pl-3 md:pr-6 lg:px-8"
          }
  `}
      >

        <div
          className={`
    relative flex items-center justify-between
    
    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

    ${isScrolled
              ? `h-[66px] sm:h-[58px] md:h-[58px] lg:h-[52px] pl-0 pr-1 sm:pr-4 lg:px-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-full border ${isDark ? "bg-[#150f0d] border-white/10" : "bg-[oklch(0.988_0.0041_91.45)] border-slate-200"}`
              : "h-[80px] sm:h-[68px] md:h-[70px] lg:h-[64px] pl-0 pr-1 sm:pr-5 md:pr-6 lg:px-6 bg-transparent border-transparent shadow-none"
            }
  `}
        >

          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer mr-4 sm:mr-6 md:mr-5 lg:mr-8 max-md:-ml-0.5 md:pl-1">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-3 lg:gap-1.5"
            >
              <div className="rounded-full h-[34px] w-[34px] sm:h-[32px] sm:w-[32px] md:h-9 md:w-9 lg:h-8 lg:w-8 flex items-center justify-center overflow-hidden">
                <Image
                  src={logo}
                  alt="HypeOn AI Logo"
                  width={48}
                  height={48}
                  className="h-[34px] w-[34px] sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 object-contain"
                />
              </div>
              <span className={`font-semibold text-base sm:text-lg md:text-lg lg:text-base tracking-tight leading-none flex items-center min-h-[34px] sm:min-h-8 md:min-h-9 lg:min-h-10 ${isDark ? "text-white" : "text-black"}`}>
                HypeOn AI
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV (md+; phone uses mobile menu) */}
          <div className="hidden md:flex items-center h-full shrink-0 gap-4 md:gap-5 lg:gap-8 md:mr-4 lg:mr-10">


            {/* PRODUCTS DROPDOWN */}
            <div className="group flex items-center h-full">
              <Link href="/products" className={`flex items-center gap-1.5 text-sm sm:text-base font-medium hover:opacity-70 transition-opacity cursor-pointer ${isDark ? "text-white" : "text-black"}`}>
                Products
                <ChevronDown className={`w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200 ${isDark ? "text-white" : "text-black"}`} />
              </Link>

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
                <div className={`rounded-3xl border shadow-[0_12px_40px_rgb(0,0,0,0.08)] p-3 mt-3 ${isDark ? "bg-[#150f0d] border-white/10" : "bg-[oklch(0.988_0.0041_91.45)] border-slate-100"}`}>
                  <div className="flex gap-3 h-[220px] hover:h-[400px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">

                    <MegaItem
                      dark={isDark}
                      icon={<Sparkles className="w-5 h-5" />}
                      title="HypeOn Intelligence"
                      desc="Predict demand, niches, and winning products."
                      href="/products"
                      iconBg="bg-[#65D48C]"
                      iconColor="text-black"
                      illustration={<CopilotIllustration dark={isDark} />}
                    />




                    <MegaItem
                      dark={isDark}
                      icon={<Wand2 className="w-5 h-5" />}
                      title="HypeOn Studio"
                      desc="AI-powered ad creatives, curated by designers."
                      href="/studio"
                      iconBg="bg-[#E66245]"
                      iconColor="text-white"
                      illustration={<StudioIllustration short />}
                    /></div>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className={`text-sm sm:text-base font-medium hover:opacity-70 transition-opacity cursor-pointer ${isDark ? "text-white" : "text-black"}`}
            >
              Company
            </Link>



          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center shrink-0 gap-3 md:gap-4 lg:gap-5 pr-1">
            <a
              href="https://app.hypeon.ai/login"
              className={`text-sm md:text-base font-semibold hover:opacity-70 transition-opacity cursor-pointer whitespace-nowrap ${isDark ? "text-white" : "text-black"}`}
            >
              Login
            </a>

            <a
              href="https://app.hypeon.ai/hub/login"
              className={`inline-flex items-center justify-center px-3 py-1.5 md:px-4 rounded-full text-sm md:text-base font-bold text-white transition-colors cursor-pointer whitespace-nowrap ${isDark ? "bg-[#E66245] hover:bg-[#d6543a]" : "bg-black hover:bg-black/80"}`}
            >
              Get the demo
            </a>
          </div>



          {/* MOBILE TOGGLE (< md) */}
          <button
            type="button"
            className={`md:hidden min-w-[48px] min-h-[48px] sm:min-w-[46px] sm:min-h-[46px] flex items-center justify-center rounded-full max-sm:-mr-2 -mr-1 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isDark ? "text-white hover:bg-white/10 active:bg-white/15 focus-visible:ring-white/30" : "text-black hover:bg-black/[0.06] active:bg-black/[0.08] focus-visible:ring-black/20"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* MOBILE: dim + panel (< md) */}
      <div
        className={`md:hidden fixed inset-0 z-[42] bg-[oklch(0.988_0.0041_91.45)] transition-opacity duration-300 ease-out ${mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden
        onClick={closeMobile}
      />

      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal={mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
        aria-label="Main menu"
        className={[
          "md:hidden fixed left-1/2 top-0 z-[43] w-full max-w-[95vw] -translate-x-1/2 pl-[max(0.25rem,env(safe-area-inset-left))] pr-[max(0.25rem,env(safe-area-inset-right))]",
          isScrolled ? "sm:pl-4 sm:pr-4 md:pl-4 md:pr-4" : "sm:pl-5 sm:pr-5 md:pl-6 md:pr-6",
          "pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(5.25rem+env(safe-area-inset-top))] md:pt-[calc(5.375rem+env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] max-h-[min(85dvh,calc(100dvh-4rem))]",
          !mobileMenuOpen ? "pointer-events-none" : "",
        ].join(" ")}
      >
        <div
          className={`
            flex w-full max-h-[min(85dvh,calc(100dvh-5.5rem))] flex-col overflow-hidden rounded-[1.25rem] border border-slate-200 bg-[oklch(0.988_0.0041_91.45)] shadow-[0_20px_50px_rgba(15,23,42,0.08)]
            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${mobileMenuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.98] opacity-0"}
          `}
        >
          <div data-lenis-prevent className="overflow-y-auto overscroll-contain px-3 py-3 sm:px-4 sm:py-4">
            <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Menu
            </p>

            {/* Products accordion */}
            <div className="rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                id="mobile-products-trigger"
                className="flex w-full min-h-[48px] items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-slate-900 transition-colors hover:bg-slate-50 active:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-inset"
                aria-expanded={mobileDropdown === "products"}
                aria-controls="mobile-products-panel"
                onClick={() =>
                  setMobileDropdown((d) => (d === "products" ? null : "products"))
                }
              >
                <span>Products</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ease-out ${mobileDropdown === "products" ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </span>
              </button>

              <div
                id="mobile-products-panel"
                role="region"
                aria-labelledby="mobile-products-trigger"
                className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileDropdown === "products" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="space-y-1 border-t border-slate-200 bg-[oklch(0.988_0.0041_91.45)] px-2 pb-2 pt-2">
                    <MobileProductLink
                      icon={<Sparkles className="h-[18px] w-[18px]" />}
                      title="HypeOn Intelligence"
                      desc="Predict demand, niches, and winning products."
                      iconWrapClass="bg-[#65D48C] text-black"
                      onClick={() => {
                        closeMobile();
                        router.push("/products");
                      }}
                    />
                    <MobileProductLink
                      icon={<Wand2 className="h-[18px] w-[18px]" />}
                      title="HypeOn Studio"
                      desc="AI-powered ad creatives, curated by designers."
                      iconWrapClass="bg-[#E66245] text-white"
                      onClick={() => {
                        closeMobile();
                        router.push("/studio");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <nav className="mt-3 space-y-0.5" aria-label="Primary">
              <Link
                href="/about"
                onClick={closeMobile}
                className="flex min-h-[48px] items-center rounded-xl px-3 text-[15px] font-semibold text-slate-900 transition-colors hover:bg-slate-100 active:bg-slate-200/80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
              >
                Company
              </Link>
            </nav>

            <div className="my-4 h-px w-full bg-slate-200" />

            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <a
                href="https://app.hypeon.ai/login"
                className="flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-[15px] font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 hover:border-slate-400 active:scale-[0.99] cursor-pointer"
              >
                Log in
              </a>
              <a
                href="https://app.hypeon.ai/hub/login"
                className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-black px-4 text-[15px] font-bold text-white shadow-md transition-colors hover:bg-black/90 active:scale-[0.99] cursor-pointer"
              >
                Get the demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Navbar);

/* ================= MEGA ITEM ================= */

function MegaItem({
  icon,
  title,
  desc,
  href,
  iconBg,
  iconColor,
  illustration,
  expandedIllustration,
  isActive,
  isInactive,
  dark,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  iconBg?: string;
  iconColor?: string;
  illustration?: React.ReactNode;
  expandedIllustration?: React.ReactNode;
  isActive?: boolean;
  isInactive?: boolean;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        group/card relative cursor-pointer
        text-left
        flex flex-col
        p-4 rounded-2xl border
        hover:shadow-sm
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        h-full
        flex-1 hover:flex-[1.1]
        overflow-hidden
        ${dark
          ? 'border-white/10 bg-[#1c1512] hover:border-white/20 hover:bg-white/[0.06]'
          : 'border-slate-100/80 bg-[oklch(0.988_0.0041_91.45)] hover:border-slate-300/60 hover:bg-slate-50/50'}
        ${isActive ? (dark ? 'min-w-[60%] ring-1 ring-white/15 shadow-md' : 'min-w-[60%] ring-1 ring-slate-200 shadow-md') : ''}
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
        <p className={`font-semibold text-sm tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</p>
        <p className={`text-sm leading-snug mt-1.5 transition-all duration-500 ${dark ? 'text-white/55' : 'text-slate-500'} ${isActive ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>{desc}</p>
      </div>
    </Link>
  );
}

/* ================= MOBILE PRODUCT LINK ================= */

function MobileProductLink({
  icon,
  title,
  desc,
  iconWrapClass,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  iconWrapClass: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full min-h-[52px] cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-white active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/12"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] shadow-sm ring-1 ring-black/[0.04] ${iconWrapClass}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold tracking-tight text-slate-900">{title}</p>
        <p className="mt-0.5 text-[13px] leading-snug text-slate-600">{desc}</p>
      </div>
      <span className="shrink-0 text-slate-400 transition-transform group-active:translate-x-0.5" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>
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
      <video
        src="/images/video.mp4"
        title="HypeOn Intelligence Dashboard"
        width={800}
        height={600}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto object-cover"
      />

      {/* Soft gradient fade bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
    </div>
  );
};

const COPILOT_PLACEHOLDER = 'Which products are winning?';

const CopilotIllustration = ({ short, dark }: { short?: boolean; dark?: boolean }) => {
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
    <div className={`w-[260px] rounded-2xl border p-1 flex flex-col ${dark ? 'bg-[#2c2420] border-white/15 shadow-[0_16px_44px_rgba(0,0,0,0.6)]' : 'bg-white border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)]'}`}>
      <div className="p-4 px-5 min-h-[52px]">
        <p className={`text-[14px] tracking-tight leading-relaxed flex items-center flex-wrap ${dark ? 'text-white/80' : 'text-slate-700'}`}>
          {visibleText}
          <span
            className={`inline-block w-0.5 h-4 ml-0.5 align-middle ${dark ? 'bg-white/50' : 'bg-slate-400'} ${isComplete ? 'animate-pulse' : ''
              }`}
            aria-hidden
          />
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 pb-3 pt-4 mt-auto">
        <div className={`h-9 w-9 flex items-center justify-center rounded-xl border transition-colors ${dark ? 'bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/10' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
          <Paperclip className="w-4 h-4" />
        </div>
        <div className={`h-9 w-9 flex items-center justify-center rounded-xl border transition-colors ${dark ? 'bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/10' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
          <PlusIcon className="w-4 h-4" />
        </div>
        <div className="flex-1"></div>
        <div className={`h-9 w-9 flex items-center justify-center rounded-xl transition-colors ${dark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-slate-800'}`}>
          <ArrowUp className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

const STUDIO_THUMBS = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?w=200&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&auto=format&fit=crop&q=70",
];

// loose 3×2 scatter with clear gaps — no two overlap or line up
const STUDIO_SPOTS = [
  { left: "1%", top: "6%", w: 64 },
  { left: "37%", top: "3%", w: 62 },
  { left: "72%", top: "8%", w: 64 },
  { left: "13%", top: "52%", w: 64 },
  { left: "48%", top: "55%", w: 62 },
  { left: "80%", top: "50%", w: 60 },
];

// bigger creative thumbnails, well-spaced, each rising gently from below and
// fading in/out in its own spot — slow & smooth, no scale, no tilt.
const StudioIllustration = ({ short }: { short?: boolean }) => (
  <div
    className={`relative ${short ? "h-[180px] w-[250px]" : "h-[230px] w-[350px]"}`}
  >
    {STUDIO_THUMBS.map((src, i) => (
      <motion.img
        // eslint-disable-next-line @next/next/no-img-element
        key={i}
        src={src}
        alt=""
        style={{ position: "absolute", left: STUDIO_SPOTS[i].left, top: STUDIO_SPOTS[i].top, width: STUDIO_SPOTS[i].w, aspectRatio: "3 / 4", zIndex: i }}
        className="rounded-[10px] object-cover shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
        animate={{ opacity: [0, 1, 1, 0], y: [42, 6, -6, -42] }}
        transition={{ duration: 2.8, times: [0, 0.24, 0.76, 1], ease: "easeInOut", repeat: Infinity, delay: i * 0.42 }}
      />
    ))}
  </div>
);

const AnalyticsIllustration = ({ short, dark }: { short?: boolean; dark?: boolean }) => (
  <div className={`rounded-xl border flex items-end justify-center gap-2 ${dark ? 'bg-[#2c2420] border-white/15 shadow-[0_16px_44px_rgba(0,0,0,0.6)]' : 'bg-white border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'} ${short ? 'w-[160px] h-[110px] p-4' : 'w-[240px] h-[140px] p-5 gap-3'}`}>
    <div className={`${short ? 'w-8' : 'w-10'} ${dark ? 'bg-white/10' : 'bg-[#241C1A]/10'} rounded-t-md transition-all duration-500 ease-out h-[30%] ${!short && 'animate-[grow_1s_ease-out_forwards]'}`}></div>
    <div className={`${short ? 'w-8' : 'w-10'} ${dark ? 'bg-white/20' : 'bg-[#241C1A]/20'} rounded-t-md transition-all duration-500 ease-out h-[50%] ${!short && 'animate-[grow_1s_ease-out_0.1s_forwards]'}`}></div>
    <div className={`${short ? 'w-8' : 'w-10'} bg-[#E66245] rounded-t-md transition-all duration-500 ease-out h-[80%] relative flex justify-center ${!short && 'animate-[grow_1s_ease-out_0.2s_forwards]'}`}>
      <div className={`absolute ${short ? '-top-6 text-xs' : '-top-7 text-sm'} font-bold text-[#E66245] ${!short && 'opacity-0 animate-[fade-in_0.5s_ease-out_0.8s_forwards]'}`}>{!short && '+48%'}</div>
    </div>
  </div>
);