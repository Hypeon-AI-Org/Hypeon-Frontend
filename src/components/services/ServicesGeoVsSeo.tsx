"use client";

import { motion } from "framer-motion";
import { reveal } from "./constants";

const ROWS: [string, string, string][] = [
  ["The prize", "Rank on a results page", "Be named in a generated answer"],
  ["User behaviour", "Scans ten links, clicks one", "Reads one synthesized answer"],
  ["Slots available", "Page one has ten", "An answer names two to five"],
  ["Key signal", "Backlinks, keywords, authority", "Citations, clarity, consensus"],
  ["Optimization unit", "The page", "The claim and the entity"],
  ["Measurement", "Rankings and organic traffic", "Mentions in answers, AI referrals"],
];

const STATS = [
  { value: "2–5", label: "brands named in a typical AI answer" },
  { value: "0", label: "clicks needed before the shortlist is set" },
  { value: "14 days", label: "to your prompt-share baseline" },
];

/* Continues the dark region opened by the services slab above, so only the
   outer corners are rounded and the two sections read as one block. */
export default function ServicesGeoVsSeo() {
  return (
    <section className="relative overflow-hidden rounded-b-[28px] bg-[#0a0a0c] pb-16 pt-4 sm:rounded-b-[56px] sm:pb-24 sm:pt-6 lg:pb-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="mb-5 inline-flex items-center rounded-full border border-white/[0.09] bg-gradient-to-b from-white/[0.10] to-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            Why you need both
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            SEO wins you a ranking. GEO wins you the answer.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            They are not rivals — the same authority signals feed both. What
            changes is the unit of work: SEO optimizes pages, GEO optimizes the
            claims a model can corroborate about you.
          </p>
        </motion.div>

        {/* the comparison as a glass panel on the slab, matching the service cards */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative mt-10 overflow-hidden rounded-[24px] border border-white/[0.09] bg-gradient-to-b from-white/[0.11] to-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),inset_0_-1px_0_0_rgba(0,0,0,0.45),0_30px_70px_-32px_rgba(0,0,0,0.95)] sm:mt-12"
        >
          {/* the specular top edge that sells the glass */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />

          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-white text-[11px] font-extrabold tracking-tighter text-[#0a0a0c]">
              H
            </span>
            <span className="text-[12px] font-semibold text-white">
              Channel comparison
            </span>
            <span className="ml-auto rounded-[5px] border border-white/10 bg-white/[0.06] px-[8px] py-[3px] text-[10.5px] text-white/45">
              2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="w-[24%] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30">
                    &nbsp;
                  </th>
                  <th className="w-[38%] px-5 py-3 text-[11px] font-semibold text-white/50">
                    SEO
                  </th>
                  <th className="w-[38%] px-5 py-3 text-[11px] font-semibold text-white">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                      GEO
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, seo, geo], i) => (
                  <tr
                    key={label}
                    className={i === ROWS.length - 1 ? "" : "border-b border-white/[0.07]"}
                  >
                    <td className="px-5 py-3.5 align-top text-[11.5px] font-medium text-white/35">
                      {label}
                    </td>
                    <td className="px-5 py-3.5 align-top text-[13px] leading-relaxed text-white/55">
                      {seo}
                    </td>
                    <td className="bg-white/[0.035] px-5 py-3.5 align-top text-[13px] font-medium leading-relaxed text-white">
                      {geo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              {...reveal}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-gradient-to-b from-white/[0.11] to-white/[0.03] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),inset_0_-1px_0_0_rgba(0,0,0,0.45),0_30px_70px_-32px_rgba(0,0,0,0.95)] sm:p-6"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />
              <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
