"use client";

import { Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/HypeOn_Logo.png";

const linkClass =
  "flex min-h-10 w-full items-center text-sm font-normal leading-snug text-slate-400 transition-colors hover:text-white";

export default function Footer() {
  const navColumns = [
    {
      title: "Product",
      className: "lg:col-span-3 xl:col-span-3",
      links: [
        { label: "HypeOn Intelligence", href: "/products" },
        { label: "HypeOn Analytics", href: "/analytics" },
      ],
    },
    {
      title: "Company",
      className: "lg:col-span-3 xl:col-span-3",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "mailto:info@hypeon.ai" },
        { label: "Privacy", href: "/privacy-policy" },
      ],
    },
  ] as const;

  return (
    <footer className="relative mr-0 mt-0 ml-2 overflow-hidden rounded-t-3xl bg-[#0E1116] font-sans sm:ml-1 sm:rounded-t-[2rem] lg:ml-1.5 lg:rounded-t-[2.5rem]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
          {/* Brand — spans full width on mobile, both sm columns, then ~half on xl */}
          <div className="sm:col-span-2 lg:col-span-6 xl:col-span-6">
            <div className="mb-5 flex items-center gap-2.5">
              <Image
                src={logo}
                alt="HypeOn AI Logo"
                width={26}
                height={26}
                className="h-6 w-6 object-contain brightness-0 invert"
              />
              <span className="text-lg font-bold text-white">
                HypeOn <span className="text-slate-300">AI</span>
              </span>
            </div>
            <p className="max-w-md text-sm leading-loose text-slate-400">
              HypeOn AI helps e-commerce teams figure out what to sell next, how
              to sell it better, and where to put their budget for the highest
              return using real-time signals.
            </p>
            <div className="mt-8 flex gap-1">
              <a
                href="https://www.linkedin.com/company/hypeonai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/hypeon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {navColumns.map((col) => (
            <div
              key={col.title}
              className={`flex flex-col sm:col-span-1 ${col.className}`}
            >
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                {col.title}
              </h4>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ||
                    link.href.startsWith("#") ||
                    link.href.startsWith("mailto:") ? (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-slate-800/80 pt-12 sm:flex-row sm:justify-between sm:items-center lg:mt-20 lg:pt-14">
          <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
            © {new Date().getFullYear()} HypeOn AI Inc. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-xs text-slate-500 transition-colors hover:text-white sm:text-sm"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
