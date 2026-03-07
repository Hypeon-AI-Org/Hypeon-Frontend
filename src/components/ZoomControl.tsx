"use client";

import { useScale, SCALE_OPTIONS, type ScaleValue } from "@/context/ScaleContext";
import { useState, useRef, useEffect } from "react";

const LABELS: Record<ScaleValue, string> = {
  0.8: "80%",
  0.9: "90%",
  1: "100%",
  1.1: "110%",
};

export default function ZoomControl() {
  const { scale, setScale } = useScale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-ink shadow-lg ring-1 ring-black/5 backdrop-blur-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Zoom"
        aria-expanded={open}
      >
        <span className="text-base" aria-hidden>
          {LABELS[scale]}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 flex flex-col rounded-xl bg-white/95 py-1 shadow-xl ring-1 ring-black/10 backdrop-blur-sm">
          {SCALE_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setScale(s);
                setOpen(false);
              }}
              className={`px-4 py-2 text-left text-sm transition-colors ${
                scale === s
                  ? "bg-brand-500/15 font-medium text-brand-600"
                  : "text-ink hover:bg-black/5"
              }`}
            >
              {LABELS[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
