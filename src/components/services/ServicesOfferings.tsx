"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  GeoIcon,
  SeoIcon,
  WebsiteIcon,
  AutomationIcon,
} from "./ServiceIcons";
import { CALENDLY_URL, reveal } from "./constants";

/* ---------- the four small in-card visuals ---------- */

/** GEO — prompt-share bars, your brand leading. */
function GeoPanel() {
  const rows = [
    { label: "your brand", value: 78, own: true },
    { label: "competitor a", value: 46 },
    { label: "competitor b", value: 29 },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-2.5">
          <span className="w-[86px] shrink-0 truncate text-[10.5px] text-white/45">
            {r.label}
          </span>
          <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full transition-[width] duration-700"
              style={{
                width: `${r.value}%`,
                background: r.own ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.26)",
              }}
            />
          </span>
          <span
            className={`w-[30px] shrink-0 text-right text-[10.5px] tabular-nums ${
              r.own ? "font-semibold text-white" : "text-white/35"
            }`}
          >
            {r.value}%
          </span>
        </div>
      ))}
    </div>
  );
}

/** SEO — keyword rows with position deltas. */
function SeoPanel() {
  const rows = [
    { kw: "ad intelligence tool", pos: 3, delta: "+6" },
    { kw: "competitor ad spend", pos: 5, delta: "+11" },
    { kw: "ugc ad generator", pos: 8, delta: "+4" },
  ];
  return (
    <div className="space-y-[6px]">
      {rows.map((r) => (
        <div
          key={r.kw}
          className="flex items-center gap-2 rounded-[9px] border border-white/[0.07] bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-[10px] py-[7px] shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
        >
          <span className="flex-1 truncate text-[10.5px] text-white/60">
            {r.kw}
          </span>
          <span className="rounded-[4px] bg-white/10 px-[6px] py-[2px] text-[10px] font-semibold text-white tabular-nums">
            #{r.pos}
          </span>
          <span className="w-[24px] text-right text-[10px] font-semibold text-white/70 tabular-nums">
            {r.delta}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Websites — a wireframe with its performance score. */
function WebsitePanel() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 space-y-[5px] rounded-[10px] border border-white/[0.07] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
        <span className="block h-[6px] w-1/2 rounded-full bg-white/20" />
        <span className="block h-[4px] w-full rounded-full bg-white/[0.12]" />
        <span className="block h-[4px] w-4/5 rounded-full bg-white/[0.12]" />
        <span className="mt-1 block h-[10px] w-[42px] rounded-full bg-white/80" />
      </div>
      <div className="flex h-[62px] w-[62px] shrink-0 flex-col items-center justify-center rounded-[10px] border border-white/[0.07] bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
        <span className="text-[17px] font-bold leading-none text-white tabular-nums">
          98
        </span>
        <span className="mt-1 text-[9px] uppercase tracking-wider text-white/35">
          Perf
        </span>
      </div>
    </div>
  );
}

/** Automation — the loop, as a run log. */
function AutomationPanel() {
  const steps = ["Brief from winning ads", "Generate 12 variants", "Launch & report"];
  return (
    <div className="space-y-[6px]">
      {steps.map((s, i) => (
        <div
          key={s}
          className="flex items-center gap-2.5 rounded-[9px] border border-white/[0.07] bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-[10px] py-[7px] shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
        >
          <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#0a0a0c] tabular-nums">
            {i + 1}
          </span>
          <span className="flex-1 truncate text-[10.5px] text-white/60">{s}</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
        </div>
      ))}
    </div>
  );
}

/* ---------- content ---------- */

type Service = {
  id: string;
  label: string;
  title: string;
  desc: string;
  Icon: (p: { className?: string }) => React.JSX.Element;
  Panel: () => React.JSX.Element;
  points: string[];
};

const SERVICES: Service[] = [
  {
    id: "geo",
    label: "GEO",
    title: "Get named inside AI answers",
    desc: "Buyers ask ChatGPT and Perplexity before they open Google. We make your brand the one those models cite — and prove it with tracked prompts.",
    Icon: GeoIcon,
    Panel: GeoPanel,
    points: [
      "Prompt-share audit",
      "Entity & claim mapping",
      "Citable content",
      "Schema & llms.txt",
    ],
  },
  {
    id: "seo",
    label: "SEO",
    title: "Own page one while it still pays",
    desc: "Classic search is not dead — it feeds the models. We build the technical base, the keyword map and the content engine that compounds.",
    Icon: SeoIcon,
    Panel: SeoPanel,
    points: [
      "Technical audit",
      "Intent-mapped keywords",
      "Content at pace",
      "Digital PR & links",
    ],
  },
  {
    id: "websites",
    label: "Websites",
    title: "Sites engineered to convert",
    desc: "A fast Next.js or Shopify build that loads instantly, reads perfectly to crawlers, and turns the traffic we send into pipeline.",
    Icon: WebsiteIcon,
    Panel: WebsitePanel,
    points: [
      "Conversion-led design",
      "Sub-second mobile",
      "GEO-ready markup",
      "Landing pages in days",
    ],
  },
  {
    id: "automation",
    label: "Automation",
    title: "Run the whole loop on autopilot",
    desc: "HypeOn wired into your stack so creative, campaigns and reporting run themselves — with a human in the loop only where judgement matters.",
    Icon: AutomationIcon,
    Panel: AutomationPanel,
    points: [
      "Briefs from live ads",
      "AI creative testing",
      "Lifecycle flows",
      "Alerting that matters",
    ],
  },
];

export default function ServicesOfferings() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden rounded-t-[28px] bg-[#0a0a0c] py-16 sm:rounded-t-[56px] sm:py-24 lg:py-28"
    >
      {/* Neutral ambient light behind the grid. Glass only reads as glass when
          there is something to refract - on flat black a blurred backdrop
          returns flat black. Static, so they cost a single paint. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[6%] top-[18%] h-[380px] w-[380px] rounded-full bg-white/[0.06] blur-[120px]" />
        <div className="absolute right-[4%] top-[8%] h-[420px] w-[420px] rounded-full bg-white/[0.05] blur-[130px]" />
        <div className="absolute bottom-[6%] left-[38%] h-[400px] w-[400px] rounded-full bg-white/[0.055] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="mb-5 inline-flex items-center rounded-full border border-white/[0.09] bg-gradient-to-b from-white/[0.10] to-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            Four services, one growth system
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Get found everywhere. Then convert what arrives.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            Most agencies sell one slice. Visibility without conversion is a
            vanity metric; conversion without visibility is a rounding error. We
            run both ends.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, i }: { service: Service; i: number }) {
  const { Icon, Panel } = service;

  return (
    <motion.article
      id={service.id}
      {...reveal}
      transition={{ duration: 0.6, ease: "easeOut", delay: (i % 2) * 0.08 }}
      className="
        group relative flex scroll-mt-28 cursor-pointer flex-col overflow-hidden rounded-[24px] p-6 sm:p-7
        border border-white/[0.09]
        bg-gradient-to-b from-white/[0.11] to-white/[0.03]
        backdrop-blur-2xl backdrop-saturate-[1.6]
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),inset_0_-1px_0_0_rgba(0,0,0,0.45),0_30px_70px_-32px_rgba(0,0,0,0.95)]
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-[3px] hover:border-white/[0.16]
        hover:from-white/[0.16] hover:to-white/[0.05]
        hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.24),inset_0_-1px_0_0_rgba(0,0,0,0.45),0_38px_80px_-30px_rgba(0,0,0,1)]
      "
    >
      {/* specular sheen - the soft highlight that pools at the top of a
          curved glass surface, brightening as you point at it */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1/4 h-1/2 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.18),transparent_70%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* the bright rim along the very top edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />

      <div className="relative z-[1] flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-white/[0.10] bg-gradient-to-b from-white/[0.14] to-white/[0.04] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition-all duration-300 group-hover:from-white/[0.20] group-hover:to-white/[0.06] group-hover:text-white">
          <Icon className="h-[20px] w-[20px]" />
        </span>
        <span className="rounded-full border border-white/[0.09] bg-gradient-to-b from-white/[0.10] to-white/[0.03] px-[10px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
          {service.label}
        </span>
      </div>

      <h3 className="relative z-[1] mt-5 text-xl font-bold tracking-tight text-white">
        {service.title}
      </h3>
      <p className="relative z-[1] mt-2.5 text-[14px] leading-relaxed text-white/55">
        {service.desc}
      </p>

      {/* the small live-looking panel, same idiom as the product page */}
      <div className="relative z-[1] mt-6 rounded-[14px] border border-white/[0.08] bg-white/[0.04] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
        <Panel />
      </div>

      <div className="relative z-[1] mt-5 flex flex-wrap gap-[6px]">
        {service.points.map((p) => (
          <span
            key={p}
            className="rounded-full border border-white/[0.08] bg-gradient-to-b from-white/[0.09] to-white/[0.02] px-[10px] py-[4px] text-[11px] text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 group-hover:from-white/[0.14] group-hover:text-white/80"
          >
            {p}
          </span>
        ))}
      </div>

      {/* No `relative` here on purpose: the ::after must resolve against the
          card, not this link, so it stretches over the whole card and makes it
          the click target. z-[1] still applies - this is a flex item. */}
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="z-[1] mt-auto inline-flex items-center gap-1.5 pt-6 text-[13.5px] font-semibold text-white transition-colors after:absolute after:inset-0 after:z-[2] after:content-[''] hover:text-white/60"
      >
        Discuss {service.label.toLowerCase()} for your brand
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.article>
  );
}
