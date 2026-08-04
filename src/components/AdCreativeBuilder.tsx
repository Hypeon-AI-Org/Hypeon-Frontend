"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Section, { Cell } from "./Section";

/* ============================================================
   Generate High-Performing Ad Creatives - light feature band.
   Right panel showcases the generated ad creatives directly.
============================================================ */

// the generated ad creatives
const ASSETS = [
    { img: "/wallism/d4ec3e83b2332402.png" },
    { img: "/wallism/2cc5a6cac5e10415.jpeg" },
];

const CHECKS = [
    { text: "High-ROI ad creatives in seconds" },
    { text: "Any ad asset you need for any platform" },
    { text: "On-brand and customizable outputs" },
];

const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function AdCreativeBuilder() {
    return (
        <Section cols={2}>
            {/* LEFT - copy */}
            <Cell className="flex flex-col justify-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={reveal}>
                    <h2 className="text-2xl font-bold leading-[1.1] tracking-tighter text-[#1B1C3A] sm:text-4xl">
                        Generate High-Performing<br className="hidden sm:block" /> <span className="text-[#696863]">Ad Creatives</span>
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
                                <span>{c.text}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="https://calendly.com/yash-hypeon/30min" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-black px-5 text-[14px] font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-black/80">
                            Try For Free Now
                        </a>
                    </div>
                </motion.div>
            </Cell>

            {/* RIGHT - generated creatives showcase */}
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
