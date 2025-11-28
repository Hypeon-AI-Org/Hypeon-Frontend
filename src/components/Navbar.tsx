'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4 sm:px-6 lg:px-8" id="navbar">
      <div className="glass-nav-pill rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src={logo}
            alt="HypeOn AI Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="font-display font-bold text-lg tracking-tight text-slate-900">
            HypeOn<span className="text-brand-600"> AI</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Methodology
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Pricing
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Log in
          </a>
          <a
            href="#"
            className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all"
          >
            Start Free Demo
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-nav-pill rounded-2xl shadow-xl border border-slate-200/50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a
              href="#features"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-white/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-white/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Methodology
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-white/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#"
              className="block w-full text-center mt-4 px-5 py-3 rounded-full font-semibold bg-slate-900 text-white hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Free Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
