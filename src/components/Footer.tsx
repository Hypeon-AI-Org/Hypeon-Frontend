"use client";

import { Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/HypeOn_Logo.png";
import { useContactModal } from "@/context/ContactModalContext";

export default function Footer() {
  const { openForm } = useContactModal();

  return (
    <footer className="relative bg-[#0E1116] rounded-t-3xl overflow-hidden mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Image
                src={logo}
                alt="HypeOn AI Logo"
                width={26}
                height={26}
                className="w-6 h-6 object-contain brightness-0 invert"
              />
              <span className="font-bold text-lg text-white">
                HypeOn <span className="text-slate-300">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The secret weapon for modern D2C founders. Stop guessing and start scaling with predictive data.
            </p>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.linkedin.com/company/hypeonai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/hypeon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {[
            {
              title: 'Product',
              links: [
                { label: 'HypeOn Intelligence', href: '/products' },
                { label: 'HypeOn Copilot', href: '/products' },
                { label: 'HypeOn Analytics', href: '/products#analytics' },
              ],
            },
            {
              title: 'Resources',
              links: [
                { label: 'Trend Report 2025', href: '#' },
                { label: 'Help Center', href: '#' },
                { label: 'Solutions', href: '/solutions' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About Us', href: '/about' },
                { label: null, href: null }, // Contact — handled by modal
                { label: 'Privacy', href: '/privacy-policy' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white mb-5 text-sm font-semibold tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {col.links.map((link, i) => {
                  if (link.label === null) {
                    return (
                      <li key={i}>
                        <button
                          onClick={() => openForm("beta")}
                          className="text-slate-400 hover:text-white transition-colors text-left"
                        >
                          Contact Us
                        </button>
                      </li>
                    );
                  }
                  return (
                    <li key={i}>
                      <a
                        href={link.href!}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 HypeOn AI Inc. All rights reserved.
          </p>
          <div className="flex gap-5 items-center text-sm text-slate-500">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
