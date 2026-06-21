"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Section, { Cell } from "./Section";

/* ============================================================
   Generate High-Performing Ad Creatives — light feature band.
   Right panel showcases the generated ad creatives directly.
============================================================ */

// the generated ad creatives
const ASSETS = [
    { img: "/wallism/image_35.png" },
    { img: "/wallism/image_38.png" },
];

const CHECKS = [
    { text: "High-ROI ad creatives in seconds", link: "(ROI Calculator here)" },
    { text: "Any ad asset you need for any platform" },
    { text: "On-brand and customizable outputs" },
];

function GoogleG({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.1 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.8 6.1C12.2 13.2 17.6 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-4 6.9-9.9 6.9-17.4z" />
            <path fill="#FBBC05" d="M10.3 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.8-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.5 10.7l7.8-6.1z" />
            <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.3-5.7c-2 1.4-4.6 2.2-7.7 2.2-6.4 0-11.8-3.7-13.7-9.9l-7.8 6.1C6.4 42.6 14.6 48 24 48z" />
        </svg>
    );
}

const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function AdCreativeBuilder() {
    return (
        <Section cols={2}>
            {/* LEFT — copy */}
            <Cell className="flex flex-col justify-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={reveal}>
                    <div className="mb-4 flex items-center gap-2.5">
                        <span className="h-px w-6 bg-neutral-300" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            The Creative Engine
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold leading-[1.1] tracking-tighter text-[#1B1C3A] sm:text-4xl">
                        Generate High-Performing<br className="hidden sm:block" /> Ad Creatives
                    </h2>
                    <p className="mt-4 max-w-md text-[14px] leading-relaxed text-slate-500">
                        Generate high-converting AI ad creatives in seconds using proprietary AI
                        models trained on real performance data. Produce AI images and AI videos
                        designed to maximize conversions and engagement.
                    </p>
                    <ul className="mt-6 space-y-3">
                        {CHECKS.map((c) => (
                            <li key={c.text} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                                <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
                                    <Check className="h-2.5 w-2.5 text-slate-500" strokeWidth={3} />
                                </span>
                                <span>
                                    {c.text}{" "}
                                    {c.link && <a href="/" className="font-semibold text-slate-500 underline">{c.link}</a>}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="https://app.hypeon.ai/hub/login" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-[14px] font-semibold text-[#1B1C3A] shadow-sm transition-colors hover:bg-slate-50">
                            <GoogleG className="h-4 w-4" /> Start Free With Google
                        </a>
                        <a href="https://app.hypeon.ai/hub/login" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-black px-5 text-[14px] font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-black/80">
                            Try For Free Now
                        </a>
                    </div>
                </motion.div>
            </Cell>

            {/* RIGHT — generated creatives showcase */}
            <Cell bleed className="flex">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={reveal} className="relative flex w-full flex-col rounded-t-2xl bg-[#F4F5F7] px-5 pb-0 pt-5 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8">
                    <div className="flex flex-1 flex-col rounded-t-xl bg-white p-4 shadow-sm">
                        <p className="mb-4 text-[12px] font-semibold text-[#1B1C3A]">All Generated Assets</p>
                        <div className="grid flex-1 grid-cols-2 gap-2.5">
                            {ASSETS.map((a, i) => (
                                <div key={i} className="relative min-h-[260px] overflow-hidden rounded-[10px] border border-[#E6E8EC] bg-[#F1F2F4]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={a.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Cell>
        </Section>
    );
}
