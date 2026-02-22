
'use client';

import { useState, memo, useEffect } from 'react';
import { Menu, X, Brain, Bot, BarChart3, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<'products' | null>(null);

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


  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
        <div className="glass-nav-pill h-14 rounded-full px-6 flex items-center justify-between">


          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer">
  <a
    href="/"
    onClick={(e) => {
      e.preventDefault();
      window.location.href = "/";
    }}
    className="flex items-center gap-2"
  >
    <Image
      src={logo}
      alt="HypeOn AI Logo"
      width={32}
      height={32}
    />
    <span className="font-display font-bold text-lg text-slate-900">
      HypeOn<span className="text-brand-600"> AI</span>
    </span>
  </a>
</div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center h-full gap-10">


            {/* PRODUCTS DROPDOWN */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                <a href="/products">Products</a>
                <svg
                  className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>

              {/* DROPDOWN */}
              <div
                className="
                  absolute left-1/2 top-full mt-6
                  -translate-x-1/2
                  w-[360px]
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  translate-y-2 group-hover:translate-y-0
                  transition-all duration-200
                  z-50
                "
              >
                <div className="rounded-2xl bg-white border border-slate-200 shadow-xl p-6">
                  <div className="flex flex-col gap-4">

                    <MegaItem
                      icon={<Brain />}
                      title="HypeOn Intelligence"
                      desc="Predict demand, niches, and winning products."
                      onClick={() => (window.location.href = '/products')}
                    />

                    <MegaItem
                      icon={<Bot />}
                      title="HypeOn Copilot"
                      desc="Ask questions and get instant AI-powered insights."
                      onClick={goToCopilot}
                    />

                    <MegaItem
                      icon={<BarChart3 />}
                      title="HypeOn Analytics"
                      desc="Cross-channel attribution, CAC, ROI, and actionable growth insights."
                      onClick={() => (window.location.href = '/products#analytics')}
                    />

                  </div>
                </div>
              </div>
            </div>

            <a
              href="/solutions"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Solutions
            </a>

            <a
              href="/about"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Company
            </a>

            {/* PRICING */}
            <button
              onClick={() => setShowPricing(true)}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Pricing
            </button>
          </div>

          {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
  <a
    href="https://app.hypeon.ai/login"
    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
  >
    Log in
  </a>

  <a
    href="https://app.hypeon.ai/login"
    className="relative inline-flex items-center justify-center
               px-7 py-2.5 rounded-full
               text-sm font-medium text-white
               bg-slate-900
               shadow-[0_6px_18px_rgba(0,0,0,0.25)]
               hover:shadow-[0_10px_26px_rgba(0,0,0,0.35)]
               transition-all overflow-visible"
  >
    Try HypeOn

    <span
      className="absolute -top-2 right-2
                 bg-white
                 text-[11px] font-semibold
                 px-2 py-0.1 rounded-full
                 shadow-sm"
    >
      <span
        className="bg-clip-text text-transparent
                   bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"
      >
        Beta
      </span>
    </span>
  </a>
</div>



          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU BACKDROP */}
      
      <div className="md:hidden fixed top-[76px] left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
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
          className="w-full flex items-center justify-between py-3 text-sm font-medium text-slate-700"
          onClick={() =>
            setMobileDropdown((d) =>
              d === "products" ? null : "products"
            )
          }
        >
          Products
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              mobileDropdown === "products" ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            mobileDropdown === "products"
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
        className="block py-3 text-sm font-medium text-slate-700"
      >
        Solutions
      </a>
      <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <a
        href="/about"
        onClick={closeMobile}
        className="block py-3 text-sm font-medium text-slate-700"
      >
        Company
      </a>
      <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <button
        onClick={() => {
          setShowPricing(true);
          closeMobile();
        }}
        className="block py-3 text-sm font-medium text-slate-700"
      >
        Pricing
      </button>
      <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* CTA */}
      <div className="pt-4 flex gap-3">
        <a
          href="https://app.hypeon.ai/login"
          className="flex-1 text-center py-2.5 rounded-full border border-slate-300 text-sm font-medium"
        >
          Log in
        </a>
        <a
          href="https://app.hypeon.ai/login"
          className="flex-1 text-center py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium"
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
      className="
        w-full text-left
        flex gap-4 p-4 rounded-xl
        hover:bg-slate-50
        transition
      "
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600 leading-snug">{desc}</p>
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