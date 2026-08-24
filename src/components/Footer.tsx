"use client";

import { Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/HypeOn_Logo.png";

const linkClass =
  "inline-flex min-h-8 items-center text-[14.5px] font-semibold leading-snug text-white transition-colors hover:text-slate-300";

export default function Footer({ bgClassName = "bg-[#0a0a0c]" }: { bgClassName?: string }) {
  /* Order here is the MOBILE flow order, chosen so the two CSS columns come
     out even: Services (5 links) fills one, Product+Company+Legal (2+2+1) the
     other. `order` restores the desktop row, so nothing changes at >=640px. */
  const navColumns = [
    {
      title: "Services",
      order: "sm:order-2",
      links: [
        { label: "GEO", href: "/services#geo" },
        { label: "SEO", href: "/services#seo" },
        { label: "Website Design & Build", href: "/services#websites" },
        { label: "AI Automated Marketing", href: "/services#automation" },
        { label: "All services", href: "/services" },
      ],
    },
    {
      title: "Product",
      order: "sm:order-1",
      links: [
        { label: "HypeOn Intelligence", href: "/products" },
        { label: "HypeOn Studio", href: "/studio" },
      ],
    },
    {
      title: "Company",
      order: "sm:order-3",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "https://calendly.com/yash-hypeon/30min?month=2026-03" },
      ],
    },
    {
      title: "Legal",
      order: "sm:order-4",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ] as const;

  return (
    <footer className={`relative m-0 w-full overflow-hidden rounded-t-[32px] ${bgClassName} font-sans`}>
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8 lg:pb-14 lg:pt-20">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-5 lg:gap-x-8">
          {/* Brand - logo + name only, matching the reference's minimal left column */}
          <div className="sm:col-span-4 lg:col-span-1">
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

          {/* Mobile flows these as CSS columns so a short list never leaves a
              dead gap beside a long one. sm:contents hands them back to the grid. */}
          <div className="columns-2 gap-x-5 sm:contents">
            {navColumns.map((col) => (
              <div key={col.title} className={`mb-8 flex break-inside-avoid flex-col sm:mb-0 ${col.order}`}>
                <h4 className="mb-3 text-xs font-medium text-slate-500">
                  {col.title}
                </h4>
                <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
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
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:pt-8 lg:mt-14 lg:pt-8">
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
