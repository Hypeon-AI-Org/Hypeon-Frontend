'use client';

import { Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                alt="HypeOn AI Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
              <span className="font-display font-bold text-lg text-slate-900">
                HypeOn<span className="text-brand-600"> AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The secret weapon for modern D2C founders. Stop guessing and start scaling with
              predictive data.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="/products" className="hover:text-brand-600 transition-colors">
                  HypeOn Intelligence
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-brand-600 transition-colors">
                  HypeOn Copilot
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Trend Report 2025
                </a>
              </li>
              
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="/about" className="hover:text-brand-600 transition-colors">
                  About Us
                </a>
              </li>
           
              <li>
                <a href="/privacy-policy" className="hover:text-brand-600 transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2025 HypeOn AI Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/hypeonai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/hypeon.ai?igsh=MWtzc2FuYW42Ynhyeg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
