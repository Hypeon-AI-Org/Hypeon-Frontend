"use client";

import { Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/HypeOn_Logo.png";

const linkClass =
  "inline-flex min-h-9 items-center text-[15px] font-semibold text-white transition-colors hover:text-slate-300";

export default function Footer({ bgClassName = "bg-[#0a0a0c]" }: { bgClassName?: string }) {
  const navColumns = [
    {
      title: "Product",
      links: [
        { label: "HypeOn Intelligence", href: "/products" },
        { label: "HypeOn Studio", href: "/studio" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "https://calendly.com/yash-hypeon/30min?month=2026-03" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ] as const;

  return (
    <footer className={`relative m-0 w-full overflow-hidden rounded-t-[32px] ${bgClassName} font-sans`}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
          {/* Brand - logo + name only, matching the reference's minimal left column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src={logo}
                alt="HypeOn AI Logo"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
              <span className="text-lg font-bold text-white">
                HypeOn <span className="text-slate-400"></span>
              </span>
            </div>

            <div className="mt-6 flex gap-1">
              <a
                href="https://www.linkedin.com/company/hypeonai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.instagram.com/hypeon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {navColumns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h4 className="mb-4 text-xs font-medium text-slate-500">
                {col.title}
              </h4>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ||
                    link.href.startsWith("#") ||
                    link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className={linkClass}
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
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

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-20 lg:pt-12">
          <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
            Copyright © {new Date().getFullYear()} HypeOn AI Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("hypeon:open-cookie-prefs"))}
              className="min-h-9 inline-flex items-center text-xs text-slate-500 transition-colors hover:text-white sm:text-sm"
            >
              Manage cookies
            </button>
            <Link
              href="/privacy-policy"
              className="min-h-9 inline-flex items-center text-xs text-slate-500 transition-colors hover:text-white sm:text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
