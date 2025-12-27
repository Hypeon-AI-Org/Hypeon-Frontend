'use client';

import { useState, memo, useRef } from 'react';
import { Menu, X, Brain, Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/HypeOn_Logo.png';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  // hover delay ref
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearHoverTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const closeWithDelay = () => {
    hoverTimeout.current = setTimeout(() => {
      setProductsOpen(false);
    }, 120);
  };

  const scrollToCopilot = () => {
    clearHoverTimeout();
    setProductsOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('copilot');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
        <div className="glass-nav-pill h-14 rounded-full px-6 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="HypeOn AI Logo" width={32} height={32} />
            <span className="font-display font-bold text-lg text-slate-900">
              HypeOn<span className="text-brand-600"> AI</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">

            {/* PRODUCTS (LINK + HOVER DROPDOWN — FIXED) */}
            <div
              className="relative flex items-center gap-1"
              onMouseEnter={() => {
                clearHoverTimeout();
                setProductsOpen(true);
              }}
              onMouseLeave={closeWithDelay}
            >
              {/* Products link */}
              <Link
                href="/products"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Products
              </Link>

              {/* Dropdown arrow */}
              <svg
                className={`w-4 h-4 text-slate-400 transition ${
                  productsOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
              </svg>

              {/* DROPDOWN */}
              {productsOpen && (
                <div
                  className="absolute left-1/2 top-full mt-6 -translate-x-1/2 w-[340px] z-50
                             transition-all duration-200 ease-out"
                  onMouseEnter={clearHoverTimeout}
                  onMouseLeave={closeWithDelay}
                >
                  <div className="rounded-2xl bg-white border shadow-xl p-6">
                    <MegaItem
                      icon={<Brain />}
                      title="HypeOn Intelligence"
                      desc="Predict demand, niches, and winning products."
                      onClick={() => {
                        clearHoverTimeout();
                        setProductsOpen(false);
                        window.location.href = '/products';
                      }}
                    />
                    <MegaItem
                      icon={<Bot />}
                      title="HypeOn Copilot"
                      desc="AI-powered insights instantly."
                      onClick={scrollToCopilot}
                    />
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="text-sm font-medium text-slate-700">
              Company
            </Link>

            <button
              onClick={() => setShowPricing(true)}
              className="text-sm font-medium text-slate-700"
            >
              Pricing
            </button>
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://app.hypeon.ai/login"
              className="text-sm font-medium text-slate-700"
            >
              Log in
            </a>
            <a
              href="https://app.hypeon.ai/login"
              className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold"
            >
              Start Free Demo
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm rounded-2xl bg-white shadow-2xl p-6">
            <div className="flex flex-col gap-5">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>

              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                Company
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowPricing(true);
                }}
                className="text-left"
              >
                Pricing
              </button>

              <div className="h-px bg-slate-200" />

              <a href="https://app.hypeon.ai/login">Log in</a>

              <a
                href="https://app.hypeon.ai/login"
                className="bg-slate-900 text-white text-center px-5 py-2 rounded-full"
              >
                Start Free Demo
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRICING MODAL ================= */}
      {showPricing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          onClick={() => setShowPricing(false)}
        >
          <div
            className="relative max-w-md w-full mx-4 bg-white rounded-2xl p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPricing(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold">Pricing</h3>
            <p className="mt-3 text-slate-600">Flexible plans coming soon.</p>
            <div className="mt-6 inline-block rounded-full bg-brand-600/10 px-5 py-2 text-brand-600">
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
      onClick={onClick}
      className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 w-full text-left"
    >
      <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </button>
  );
}
