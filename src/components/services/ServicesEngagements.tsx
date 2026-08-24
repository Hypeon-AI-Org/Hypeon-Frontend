"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { CALENDLY_URL, reveal } from "./constants";

type Engagement = {
  name: string;
  best: string;
  desc: string;
  includes: string[];
  featured?: boolean;
};

const ENGAGEMENTS: Engagement[] = [
  {
    name: "Visibility Sprint",
    best: "For a baseline and quick wins",
    desc: "Four fixed weeks to find out exactly where you stand in AI answers and search, and to ship the highest-leverage fixes.",
    includes: [
      "GEO prompt-share audit",
      "Full technical SEO audit and fix list",
      "Entity, schema and llms.txt implementation",
      "Five citable content assets published",
      "Readout with the 90-day roadmap",
    ],
  },
  {
    name: "Growth Retainer",
    best: "For compounding month over month",
    desc: "The core programme. GEO and SEO run continuously, backed by an always-on content engine and pages built to convert.",
    includes: [
      "Everything in the Sprint, run monthly",
      "Editorial and programmatic content",
      "Digital PR and citation building",
      "Conversion-led landing pages",
      "Monthly prompt-share and pipeline reporting",
    ],
    featured: true,
  },
  {
    name: "Full Autopilot",
    best: "For the whole loop, operated",
    desc: "Growth run end to end: the site, the visibility work, and HypeOn wired in so creative and campaigns run themselves.",
    includes: [
      "Everything in the Retainer",
      "Website design and build",
      "HypeOn Intelligence and Studio deployed",
      "AI creative generation and testing",
      "Lifecycle automation and custom agents",
    ],
  },
];

export default function ServicesEngagements() {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[#fafafa] py-16 sm:rounded-[56px] sm:py-20 lg:py-24">
      {/* Neutral ambient shading behind the grid. On a near-white section the
          glass needs something slightly darker to refract, so these are soft
          slate pools rather than white. Static - a single paint. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[4%] top-[22%] h-[400px] w-[400px] rounded-full bg-slate-400/[0.16] blur-[120px]" />
        <div className="absolute right-[6%] top-[10%] h-[380px] w-[380px] rounded-full bg-slate-500/[0.12] blur-[130px]" />
        <div className="absolute bottom-[4%] left-[42%] h-[420px] w-[420px] rounded-full bg-slate-400/[0.14] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="mb-5 inline-flex items-center rounded-full border border-white/80 bg-gradient-to-b from-white/90 to-white/50 px-3 py-1 text-[11px] font-medium text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-md">
            Ways to work together
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
            Start with a sprint. Scale to the full loop.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            Scope is fixed; pricing is quoted per brand after the call — it
            depends on your market, your site, and how much ground there is to
            make up. No long lock-ins.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-3">
          {ENGAGEMENTS.map((e, i) => (
            <motion.div
              key={e.name}
              {...reveal}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
              className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[24px] p-6 pb-9 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-7 sm:pb-10 ${
                e.featured
                  ? // smoked glass - dark, but lit the same way as the light panes
                    "border border-white/[0.10] bg-gradient-to-b from-[#22222a]/95 to-[#0a0a0c]/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),inset_0_-1px_0_0_rgba(0,0,0,0.5),0_30px_70px_-30px_rgba(0,0,0,0.7)]"
                  : "border border-white/70 bg-gradient-to-b from-white/85 to-white/45 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_28px_60px_-34px_rgba(15,23,42,0.45)] hover:-translate-y-[3px] hover:border-white hover:from-white/95 hover:to-white/60 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_36px_72px_-32px_rgba(15,23,42,0.55)]"
              }`}
            >
              {/* specular sheen pooling at the top of the pane */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 -top-1/4 h-1/2 transition-opacity duration-500 group-hover:opacity-100 ${
                  e.featured
                    ? "bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.18),transparent_70%)] opacity-80"
                    : "bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.9),transparent_70%)] opacity-70"
                }`}
              />
              {/* bright rim along the top edge */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                  e.featured ? "via-white/50" : "via-white"
                }`}
              />

              <div className="relative z-[1] flex items-center justify-between gap-3">
                <h3
                  className={`text-xl font-bold tracking-tight ${
                    e.featured ? "text-white" : "text-[#111]"
                  }`}
                >
                  {e.name}
                </h3>
                {e.featured && (
                  <span className="rounded-full border border-white/[0.10] bg-gradient-to-b from-white/[0.16] to-white/[0.05] px-[10px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
                    Most picked
                  </span>
                )}
              </div>

              <p
                className={`relative z-[1] mt-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                  e.featured ? "text-white/40" : "text-[#aaa]"
                }`}
              >
                {e.best}
              </p>

              <p
                className={`relative z-[1] mt-4 text-[14px] leading-relaxed ${
                  e.featured ? "text-white/60" : "text-[#666]"
                }`}
              >
                {e.desc}
              </p>

              <div
                className={`relative z-[1] my-6 h-px w-full ${
                  e.featured ? "bg-white/10" : "bg-slate-900/[0.07]"
                }`}
              />

              <ul className="relative z-[1] space-y-2.5">
                {e.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className={`mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full ${
                        e.featured
                          ? "border border-white/[0.10] bg-gradient-to-b from-white/[0.16] to-white/[0.05] text-white/80"
                          : "border border-white/80 bg-gradient-to-b from-white to-white/60 text-[#666] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                      }`}
                    >
                      <Check className="h-[9px] w-[9px]" strokeWidth={3.5} />
                    </span>
                    <span
                      className={`text-[13px] leading-relaxed ${
                        e.featured ? "text-white/70" : "text-[#666]"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* mt-auto pins the button to the card's base so all three line
                  up; the wrapper's padding guarantees the gap above it, which
                  a margin on the button itself cannot (mt-auto would win). */}
              {/* no `relative` - the link's ::after must resolve against the
                  card so it covers it; z-[1] still applies to a flex item */}
              <div className="z-[1] mt-auto pt-12">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/cta flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full text-[14px] font-bold transition-all duration-200 after:absolute after:inset-0 after:z-[2] after:content-[''] ${
                    e.featured
                      ? "bg-white text-[#0a0a0c] hover:bg-white/90"
                      : "border border-[#111] bg-white text-[#111] hover:bg-[#111] hover:text-white"
                  }`}
                >
                  Book a call
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
