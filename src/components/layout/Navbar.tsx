'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-gray-900 font-bold text-xl">Hypeon AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/features" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">
              Features
            </Link>
            <Link href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">
              Login
            </Link>
            <Link href="/login" className="px-6 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-semibold shadow-md hover:shadow-lg">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-violet-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md font-medium">
              Home
            </Link>
            <Link href="/features" className="block px-3 py-2 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md font-medium">
              Features
            </Link>
            <Link href="#" className="block px-3 py-2 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md font-medium">
              Pricing
            </Link>
            <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-md font-medium">
              Login
            </Link>
            <Link href="/login" className="block mx-3 my-2 px-3 py-2 bg-violet-600 text-white text-center rounded-md font-semibold hover:bg-violet-700">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
