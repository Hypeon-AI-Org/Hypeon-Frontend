"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HypeOn_Logo from "../../assets/HypeOn_Logo.png";
import { ArrowRight, Check, Sparkles } from "lucide-react";

/* ============================================================
   Two product sections recreated from the marketer.com layout,
   recolored to the HypeOn navy/slate theme:
   • "Stop tab hopping between five libraries" - Before vs With.
   • "Skip the dashboard. Just ask Copilot" - AI analyst chat.
============================================================ */

// staggered honeycomb layout (x/y in px within a 152×140 box)
const LOGO_TILES = [
    { logo: "/logos/meta.png", x: 54, y: 0 },
    { logo: "/logos/tiktok.webp", x: 104, y: 22 },
    { logo: "/logos/google-ads.png", x: 4, y: 44 },
    { logo: "/logos/instagram.png", x: 54, y: 50 },
    { logo: "/logos/linkedin.avif", x: 104, y: 74 },
];
const EMPTY_TILES = [{ x: 4, y: 0 }, { x: 54, y: 98 }];

const reveal = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function TabHoppingSection() {
    return (
        <section className="bg-white px-6 py-12 sm:px-10 sm:py-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={reveal}
                className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0a0a0c] px-6 py-10 sm:px-10 sm:py-14 lg:px-14"
            >
                {/* decorative concentric rings */}
                <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[460px] w-[460px] -translate-y-1/2 rounded-full border border-white/[0.06] lg:block">
                    <div className="absolute inset-12 rounded-full border border-white/[0.06]" />
                    <div className="absolute inset-24 rounded-full border border-white/[0.06]" />
                </div>

                <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                    {/* copy */}
                    <div>
                        <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/70">
                            Save 10+ hours a week
                        </span>
                        <h2 className="mt-5 text-2xl font-bold leading-[1.1] tracking-tighter text-white sm:text-4xl">
                            Stop tab hopping<br className="hidden sm:block text-white" /> between five libraries
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                            Meta, TikTok, Google, LinkedIn, Instagram - competitive analysis, aggregated
                            reach, and daily creative change tracking, all in one view.
                        </p>
                        <a
                            href="https://calendly.com/yash-hypeon/30min"
                            className="group relative mt-7 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)]"
                        >
                            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
                            <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get Started</span>
                                <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get Started</span>
                            </span>
                            <ArrowRight className="relative h-4 w-4" />
                        </a>
                    </div>

                    {/* comparison cards */}
                    <div className="relative">
                        {/* Before */}
                        <div className="relative z-10 rounded-2xl bg-white p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
                            <div className="flex items-start justify-between gap-2 sm:gap-4">
                                <div>
                                    <p className="text-[11px] font-semibold text-slate-400">Before</p>
                                    <p className="mt-1 text-lg font-bold leading-tight text-slate-900">
                                        Five tabs. Five logins.<br />Zero share-of-voice
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="whitespace-nowrap rounded-full border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500 sm:px-2.5 sm:text-[11px]">8–12 h per week</span>
                                        <span className="whitespace-nowrap rounded-full border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500 sm:px-2.5 sm:text-[11px]">Fragmented data</span>
                                    </div>
                                </div>
                                <div className="relative h-[142px] w-[150px] flex-shrink-0">
                                    {EMPTY_TILES.map((t, i) => (
                                        <div
                                            key={`e${i}`}
                                            style={{ left: t.x, top: t.y }}
                                            className="absolute h-11 w-11 rounded-xl border border-slate-100 bg-slate-100/70"
                                        />
                                    ))}
                                    {LOGO_TILES.map((t) => (
                                        <div
                                            key={t.logo}
                                            style={{ left: t.x, top: t.y }}
                                            className="absolute flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={t.logo} alt="" className="h-5 w-5 object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* VS badge - anchored to the Before card's bottom edge so it
                                sits exactly on the seam between the two cards (the cards
                                differ in height, so a container-50% would drift). */}
                            <div className="absolute bottom-0 left-8 z-20 flex h-12 w-12 translate-y-[calc(50%+6px)] items-center justify-center rounded-full bg-[#0a0a0c] text-xs font-bold text-white ring-4 ring-[#0a0a0c]">
                                VS
                            </div>
                        </div>

                        {/* With HypeOn */}
                        <div className="relative z-0 mt-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[#232326] to-[#0a0a0c] p-5 ring-1 ring-white/10">
                            {/* dashed concentric rings radiating from the node */}
                            <div className="pointer-events-none absolute right-[42px] top-1/2 -translate-y-1/2">
                                {[110, 190, 280, 380].map((s) => (
                                    <div
                                        key={s}
                                        style={{ width: s, height: s }}
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15"
                                    />
                                ))}
                            </div>

                            <div className="relative z-10 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[11px] font-semibold text-white/50">With HypeOn</p>
                                    <p className="mt-1 text-lg font-bold leading-tight text-white">
                                        One workspace.<br />One source of truth
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="whitespace-nowrap rounded-full border border-white/20 px-2 py-1 text-[10px] font-medium text-white/80 sm:px-2.5 sm:text-[11px]">Under 30 min per week</span>
                                        <span className="whitespace-nowrap rounded-full border border-white/20 px-2 py-1 text-[10px] font-medium text-white/80 sm:px-2.5 sm:text-[11px]">One source of truth</span>
                                    </div>
                                </div>
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                                    <Image src={HypeOn_Logo} alt="HypeOn" width={32} height={32} className="h-8 w-8 object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export function AskCopilotSection() {
    const ANSWERS = [
        <>Nike launched <span className="font-normal text-slate-800">14 new creatives</span> in May, 9 testing &apos;comfort&apos; angle</>,
        <><span className="font-normal text-slate-800">+32% spend shift</span> toward TikTok vs April</>,
        <>Top performing hook: <span className="font-normal text-slate-800">&quot;Run your way&quot;</span> (estimated 4.2M impressions)</>,
    ];

    return (
        <section className="bg-white px-6 py-12 sm:px-10 sm:py-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={reveal}
                className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.18)] sm:px-10 sm:py-14 lg:px-14"
            >
                {/* faint dot-grid texture */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.6] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_30%,black_30%,transparent_100%)]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(27,28,58,0.08) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                    }}
                />
                {/* soft ambient glow */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(79,142,247,0.14),rgba(79,142,247,0)_70%)] blur-2xl"
                />

                <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                    {/* copy */}
                    <div>
                        <span className="inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Your AI ad-intel analyst
                        </span>
                        <h2 className="mt-5 text-2xl font-bold leading-[1.1] tracking-tighter text-[#1B1C3A] sm:text-4xl">
                            Skip the dashboard.<br />Just ask Copilot
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
                            What new angles is Nike testing this month? Or where is Adidas shifting budget?
                            Copilot pulls real ad data across Meta, TikTok, Google, and LinkedIn and answers
                            in seconds.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a
                                href="https://calendly.com/yash-hypeon/30min"
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)]"
                            >
                                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
                                <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get Started</span>
                                    <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get Started</span>
                                </span>
                                <ArrowRight className="relative h-4 w-4" />
                            </a>
                            <a
                                href="https://calendly.com/yash-hypeon/30min"
                                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#1B1C3A] transition-colors hover:bg-slate-50"
                            >
                                See Copilot in action
                            </a>
                        </div>
                    </div>

                    {/* chat mock */}
                    <div className="relative">
                        {/* question */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-3">
                                <Sparkles className="h-4 w-4 flex-shrink-0 text-[#1B1C3A]" />
                                <span className="text-sm font-medium text-slate-700">What new angles is Nike testing this month?</span>
                            </div>
                        </div>

                        {/* answer */}
                        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                <Sparkles className="h-3 w-3" /> Copilot
                            </p>
                            <ul className="space-y-2.5 text-sm text-slate-600">
                                {ANSWERS.map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#1B1C3A]">
                                            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                                        </span>
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
