"use client";

import { Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

/*
 * Light footer: 1000px column, four link columns, a hairline, a copyright row,
 * and a giant faint wordmark underneath.
 *   bg #e7e7e7 · 120px top/bottom padding · 20px column titles · 16px links · 14px bottom row
 */

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "HypeOn Intelligence", href: "/products" },
      { label: "HypeOn Studio", href: "/studio" },
      { label: "HypeOn Analytics", href: "/analytics" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "GEO", href: "/services#geo" },
      { label: "SEO", href: "/services#seo" },
      { label: "Website Design & Build", href: "/services#websites" },
      { label: "AI Automated Marketing", href: "/services#automation" },
      { label: "Free tools", href: "/tools" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Solutions", href: "/solutions" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "https://calendly.com/yash-hypeon/30min" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy Policy", href: "/privacy-policy" }],
  },
] as const;

function FooterLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (/^(https?:|mailto:|#)/.test(href)) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const link = "text-[16px] leading-6 text-[#121212] transition-opacity hover:opacity-60";
const small = "text-[14px] leading-[21px] text-[#121212] transition-opacity hover:opacity-60";

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-[#e7e7e7] py-16 font-sans md:py-[120px]">
      <div className="mx-auto w-full max-w-[1032px] px-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[20px] font-normal leading-[30px] text-black">{col.title}</h4>
              <ul className="mt-5 flex flex-col gap-[7px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href} className={link}>
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-black/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] leading-[21px] text-black">
            Copyright © {new Date().getFullYear()} HypeOn AI Inc.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("hypeon:open-cookie-prefs"))}
              className={small}
            >
              Manage cookies
            </button>
            <FooterLink href="/privacy-policy" className={small}>
              Privacy Policy
            </FooterLink>
            <span className="flex items-center gap-1">
              <a
                href="https://www.linkedin.com/company/hypeonai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#121212] transition-opacity hover:opacity-60"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/hypeon.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#121212] transition-opacity hover:opacity-60"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </span>
          </div>
        </div>

        {/* giant faint wordmark, stretched to the column's full width */}
        <svg aria-hidden viewBox="0 0 1000 259" className="mt-16 block h-auto w-full select-none md:mt-[149px]">
          <text
            x="0"
            y="212"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-[#d4d4d4]"
            style={{ font: "700 270px var(--font-inter), Inter, sans-serif", letterSpacing: "-0.04em" }}
          >
            HypeOn
          </text>
        </svg>
      </div>
    </footer>
  );
}
