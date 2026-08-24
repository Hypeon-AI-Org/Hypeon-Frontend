"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Globe } from "lucide-react";
import { CALENDLY_URL, PILL_BUTTON, GHOST_BUTTON, dotGridLayers } from "./constants";

/* Kept short so it never wraps or clips on a narrow card.
   If this changes, update steps() and --svc-ch in globals.css /
   below - both are tied to its character count (24). */
const PROMPT = "best D2C growth platform";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-24 sm:pt-32 sm:pb-32 lg:pt-36 lg:pb-40">
      {/* the product page's two-layer teal dot-grid backdrop */}
      {dotGridLayers.map((style, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={style}
        />
      ))}

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <span className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-500 backdrop-blur-sm">
            Search is now an answer, not a list
          </span>

          <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tighter text-[#1a1a1a] sm:text-4xl lg:text-[2.1rem]">
            Be the brand
            <br className="hidden sm:block" /> the AI names first.
          </h1>

          <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-gray-500 lg:mx-0">
            GEO, SEO, high-converting websites and AI-automated marketing, all
            run as one system by the team behind HypeOn. We make you the answer,
            then we make the answer pay.
          </p>

          <div className="mb-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={PILL_BUTTON}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent"
              />
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#0a0a0c]">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Book a strategy call
                </span>
                <span
                  aria-hidden
                  className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                >
                  Book a strategy call
                </span>
              </span>
            </a>

            <a href="#services" className={GHOST_BUTTON}>
              See what we do
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-slate-400 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> First deliverable in 14 days
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" /> ChatGPT, Perplexity &amp; Google
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> You own every asset
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative w-full"
        >
          <AnswerEngineMock />
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   Answer-engine mock, framed like the product page's dashboard
   screenshot: white card, grey hairline, deep soft shadow.

   Fully static markup - the typing and the staggered answer are
   driven by the shared 9s CSS cycle in globals.css, so this
   renders once and never re-renders or runs a timer.
   ============================================================ */

const ANSWER_LINES = [
  { text: "For scaling D2C brands, the platform most often named is", cls: "svc-line-1" },
  { text: "__BRAND__ — it pairs competitor ad intelligence with AI", cls: "svc-line-2" },
  { text: "creative, so teams brief from proof rather than guesswork.", cls: "svc-line-3" },
];

const SOURCES = ["yourbrand.com", "g2.com", "producthunt.com"];

function AnswerEngineMock() {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div className="overflow-hidden rounded-[16px] border border-gray-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
        {/* window chrome, matching the product page's app frames */}
        <div className="flex items-center gap-[6px] border-b border-[#f0f0f0] px-4 py-3">
          <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
          <div className="ml-auto flex items-center gap-[6px] rounded-[7px] border border-[#e2e2e2] px-[10px] py-[5px] text-[11px] text-[#bbb]">
            AI answer engine
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {/* the typed prompt - width is animated in steps, so the text
              is revealed a character at a time with no JS */}
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-[#e5e5e5] bg-[#fafafa] text-[10px] font-semibold text-[#999]">
              You
            </div>
            <p className="flex min-w-0 items-center text-[13px] leading-relaxed text-[#555]">
              <span
                className="svc-type"
                style={{ ["--svc-ch" as string]: "25ch" }}
              >
                {PROMPT}
              </span>
              <span
                aria-hidden
                className="svc-caret ml-[2px] inline-block h-[0.95em] w-[2px] shrink-0 bg-[#bbb]"
              />
            </p>
          </div>

          {/* the generated answer */}
          <div className="mt-3 rounded-[12px] border border-[#f0f0f0] bg-[#fafafa] p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#aaa]">
                Generated answer
              </span>
              <span className="svc-meta ml-auto flex items-center gap-1.5 rounded-[5px] bg-white px-[8px] py-[3px] text-[10px] font-medium text-[#666] opacity-0 ring-1 ring-[#e5e5e5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#999]" />
                Cited
              </span>
            </div>

            <div className="space-y-1.5">
              {ANSWER_LINES.map((line) => (
                <p
                  key={line.cls}
                  className={`${line.cls} text-[13px] leading-relaxed text-[#333] opacity-0`}
                >
                  {line.text.includes("__BRAND__") ? (
                    <>
                      {line.text.split("__BRAND__")[0]}
                      <span className="rounded-[4px] bg-slate-900/[0.07] px-1 font-semibold text-[#111]">
                        your brand
                      </span>
                      {line.text.split("__BRAND__")[1]}
                    </>
                  ) : (
                    line.text
                  )}
                </p>
              ))}
            </div>

            <div className="svc-meta mt-4 flex flex-wrap items-center gap-[6px] opacity-0">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#bbb]">
                Sources
              </span>
              {SOURCES.map((s) => (
                <span
                  key={s}
                  className="rounded-[5px] border border-[#e5e5e5] bg-white px-[8px] py-[3px] text-[10.5px] text-[#888]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center text-[11.5px] text-[#aaa]">
            The placement GEO buys you — decided before a single click.
          </p>
        </div>
      </div>
    </div>
  );
}
