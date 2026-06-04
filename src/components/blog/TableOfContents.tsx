"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { TocItem } from "@/lib/blog";

interface Props {
  items: TocItem[];
  cta: { heading: string; label: string; href: string };
}

export default function TableOfContents({ items, cta }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const ids = items.map((i) => i.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-5">
      <p className="mb-4 text-sm font-semibold tracking-tight text-slate-900">
        Table of Contents
      </p>

      <nav>
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={[
                    "block py-1 text-[0.82rem] leading-snug transition-colors",
                    item.level === 3 ? "pl-4" : "",
                    isActive
                      ? "font-medium text-slate-900"
                      : "text-slate-500 hover:text-slate-900",
                  ].join(" ")}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar CTA */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
        <p className="text-[0.8rem] font-medium leading-snug text-slate-700">
          {cta.heading}
        </p>
        <a
          href={cta.href}
          className="group mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-slate-900 px-4 py-2.5 text-[0.82rem] font-bold text-white transition-colors hover:bg-slate-800"
        >
          {cta.label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
