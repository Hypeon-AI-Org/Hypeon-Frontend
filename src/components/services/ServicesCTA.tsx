"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Check, Clock, Video, ArrowUpRight } from "lucide-react";
import { CALENDLY_URL, CALENDLY_EMBED_URL, reveal } from "./constants";

const AGENDA = [
  "Where you appear today in ChatGPT, Perplexity and Google",
  "The two or three fixes that would move it fastest",
  "What a realistic 90-day plan looks like for your category",
  "Scope and pricing, if it is a fit",
];

export default function ServicesCTA() {
  // The Calendly iframe is heavy, so it only mounts once the visitor asks for it.
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <section
      id="book"
      className="scroll-mt-24 bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          {...reveal}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="
            group relative overflow-hidden rounded-3xl px-6 py-12 sm:px-10 sm:py-14
            border border-white/[0.10]
            bg-gradient-to-b from-[#24242c] to-[#0a0a0c]
            shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),inset_0_-1px_0_0_rgba(0,0,0,0.5),0_30px_70px_-30px_rgba(0,0,0,0.6)]
          "
        >
          {/* specular sheen - the grey highlight pooling at the top of the pane */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-1/4 z-[1] h-1/2 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.16),transparent_70%)]"
          />
          {/* bright rim along the top edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />

          {/* Ambient glows + dot grid - the same treatment the other dark
              CTA boxes on the site use. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(255,255,255,0)_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 30%, transparent 80%)",
            }}
          />

          <div className="relative z-[2] grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14">
            <div>
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.10] bg-gradient-to-b from-white/[0.14] to-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.20)]">
                <CalendarDays className="h-3 w-3" />
                30 minutes, no deck
              </span>

              <h2 className="text-2xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl">
                Find out what the AI says
                <br className="hidden sm:block" /> about you right now.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
                Book a strategy call and we will run your brand through the
                prompts your buyers use, live on the call. You leave with the
                answer whether you work with us or not.
              </p>

              <ul className="mt-7 space-y-2.5">
                {AGENDA.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border border-white/[0.10] bg-gradient-to-b from-white/[0.16] to-white/[0.05] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.20)]">
                      <Check className="h-[9px] w-[9px]" strokeWidth={3.5} />
                    </span>
                    <span className="text-[13.5px] leading-relaxed text-white/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/40">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> 30 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5" /> Google Meet
                </span>
              </div>
            </div>

            {/* booking panel, framed as a white app card on the slab */}
            <div>
              {showCalendar ? (
                <div className="relative overflow-hidden rounded-[18px] border border-white/70 bg-gradient-to-b from-white to-white/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_20px_50px_-20px_rgba(0,0,0,0.6)]">
                  <iframe
                    src={CALENDLY_EMBED_URL}
                    title="Book a 30-minute strategy call with HypeOn"
                    loading="lazy"
                    className="h-[640px] w-full border-0 sm:h-[680px]"
                  />
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-[18px] border border-white/70 bg-gradient-to-b from-white to-white/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_20px_50px_-20px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2 border-b border-[#f0f0f0] px-5 py-3.5">
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-[#111] text-[11px] font-extrabold tracking-tighter text-white">
                      H
                    </span>
                    <span className="text-[12px] font-semibold text-[#111]">
                      Strategy call
                    </span>
                    <span className="ml-auto flex items-center gap-1.5 rounded-[5px] bg-[#f5f5f5] px-[8px] py-[3px] text-[10.5px] font-medium text-[#666]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#999]" />
                      Slots open
                    </span>
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="text-[15px] font-bold tracking-tight text-[#111]">
                      Pick a time that suits you
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#666]">
                      The calendar opens right here — no redirect, and no form
                      before you see the times.
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowCalendar(true)}
                      className="group mt-6 flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-5 text-[14px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)]"
                    >
                      Open the calendar
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex min-h-[40px] items-center justify-center text-[12.5px] text-[#999] transition-colors hover:text-[#111]"
                    >
                      Or open it in a new tab
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
