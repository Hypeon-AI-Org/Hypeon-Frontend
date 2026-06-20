"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

/* ============================================================
   Generate High-Performing Ad Creatives — light feature band.
   Right panel loops a generate cycle (~3s), measured from ads 2.mp4:
   - input cards + connectors + cursor are STATIC
   - Generate pill flips dark #15082A → pink #94a3b8 and grows ~1.1x,
     holding enlarged through the pink phase
   - the 3 creatives fill SIMULTANEOUSLY bottom-up (clip wipe ~0.2s)
   - "Conversion Score" badges pop in on the top edge AFTER the fill
   - reset is an INSTANT cut back to empty
============================================================ */

const INPUTS = [
    { label: "Brand", title: "HypeOn", sub: "" },
    { label: "Size", title: "Story Size", sub: "1080 × 1920" },
    { label: "Texts", title: "Unlock career…", sub: "Join now!" },
    { label: "Image", title: "Asset 01", sub: "" },
];

// blue / red / blue score-badge text per the reference
const ASSETS = [
    { score: 96, color: "#1E3AED", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=75" },
    { score: 94, color: "#E11D2A", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=75" },
    { score: 93, color: "#1E3AED", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=75" },
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
    const [armed, setArmed] = useState(false); // cursor risen to the button
    const [filled, setFilled] = useState(false);

    // cycle: cursor rises → clicks → fill+shimmer → hold → reset → cursor down (~3.2s)
    useEffect(() => {
        let clickT: ReturnType<typeof setTimeout>;
        let resetT: ReturnType<typeof setTimeout>;
        const run = () => {
            setArmed(true);                                                   // cursor comes up
            clickT = setTimeout(() => setFilled(true), 450);                  // click → generate
            resetT = setTimeout(() => { setFilled(false); setArmed(false); }, 2100); // reset + cursor down
        };
        const startT = setTimeout(run, 500);
        const loop = setInterval(run, 3200);
        return () => { clearTimeout(startT); clearTimeout(clickT); clearTimeout(resetT); clearInterval(loop); };
    }, []);

    return (
        <section className="bg-[oklch(0.988_0.0041_91.45)] px-4 py-16 sm:px-6 sm:py-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                className="mx-auto grid max-w-6xl items-stretch gap-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-[oklch(0.988_0.0041_91.45)] px-8 pb-0 pt-8 sm:px-12 sm:pt-12 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:pt-16"
            >
                {/* LEFT — copy (static) */}
                <motion.div variants={reveal}>
                    <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter text-[#1B1C3A] sm:text-4xl">
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

                {/* RIGHT — animated builder */}
                <motion.div variants={reveal} className="relative flex flex-col rounded-t-2xl bg-[#F4F5F7] px-5 pb-0 pt-5 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8">
                    {/* input cards (static, pre-checked) */}
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {INPUTS.map((inp) => (
                            <div key={inp.label} className="rounded-[10px] border border-[#E6E8EC] bg-white p-2.5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{inp.label}</span>
                                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E5E7EB]">
                                        <Check className="h-2 w-2 text-[#94a3b8]" strokeWidth={3} />
                                    </span>
                                </div>
                                <div className="mt-1.5 truncate text-[11px] font-bold leading-tight text-[#1B1C3A]">{inp.title}</div>
                                {inp.sub && <div className="truncate text-[9px] text-slate-400">{inp.sub}</div>}
                            </div>
                        ))}
                    </div>

                    {/* top connectors — rounded tree from the 4 cards into the pill */}
                    <svg className="pointer-events-none mx-auto block h-7 w-[78%]" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden>
                        <path d="M12.5 0 V9 Q12.5 13 16.5 13 M37.5 0 V13 M62.5 0 V13 M87.5 0 V9 Q87.5 13 83.5 13 M16.5 13 H83.5 M50 13 V28" fill="none" stroke="#D1D5DB" strokeWidth="0.7" />
                        <motion.path
                            d="M12.5 0 V9 Q12.5 13 16.5 13 M37.5 0 V13 M62.5 0 V13 M87.5 0 V9 Q87.5 13 83.5 13 M16.5 13 H83.5 M50 13 V28"
                            fill="none" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="1.5 9"
                            initial={false}
                            animate={{ stroke: armed ? "rgba(148,163,184,0.7)" : "rgba(148,163,184,0)", strokeDashoffset: armed ? [21, 0] : 0 }}
                            transition={{ stroke: { duration: 0.25 }, strokeDashoffset: { duration: 0.7, repeat: armed ? Infinity : 0, ease: "linear" } }}
                        />
                    </svg>

                    {/* generate pill (loops) + static cursor */}
                    <div className="relative -mt-1 mb-5 flex justify-center">
                        <motion.button
                            type="button"
                            animate={{ backgroundColor: filled ? "#94a3b8" : "#15082A", scale: filled ? 1.1 : 1 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="rounded-[10px] px-7 py-2 text-[13px] font-bold text-white shadow-md"
                        >
                            Generate
                        </motion.button>
                        {/* pink arrow cursor — rises from below to the pill, then clicks */}
                        <motion.svg
                            initial={false}
                            animate={{ y: armed ? 0 : 66, opacity: armed ? 1 : 0, scale: filled ? 0.82 : 1 }}
                            transition={{ y: { duration: 0.45, ease: "easeOut" }, opacity: { duration: 0.3 }, scale: { duration: 0.12, ease: "easeOut" } }}
                            className="absolute left-1/2 top-1/2 ml-7 mt-1 h-5 w-5 text-[#94a3b8] drop-shadow"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden
                        >
                            <path d="M4 2 L20 12 L13 13.5 L17 21 L13.5 22.5 L9.5 15 L4 19 Z" />
                        </motion.svg>
                    </div>

                    {/* bottom connectors — rounded tree from the pill out to the 3 assets */}
                    <svg className="pointer-events-none mx-auto -mt-3 mb-1 block h-6 w-[60%]" viewBox="0 0 100 22" preserveAspectRatio="none" aria-hidden>
                        <path d="M50 0 V8 M16.7 22 V12 Q16.7 8 20.7 8 M50 22 V8 M83.3 22 V12 Q83.3 8 79.3 8 M20.7 8 H79.3" fill="none" stroke="#D1D5DB" strokeWidth="0.7" />
                        <motion.path
                            d="M50 0 V8 M16.7 22 V12 Q16.7 8 20.7 8 M50 22 V8 M83.3 22 V12 Q83.3 8 79.3 8 M20.7 8 H79.3"
                            fill="none" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="1.5 9"
                            initial={false}
                            animate={{ stroke: filled ? "rgba(148,163,184,0.7)" : "rgba(148,163,184,0)", strokeDashoffset: filled ? [0, -21] : 0 }}
                            transition={{ stroke: { duration: 0.25 }, strokeDashoffset: { duration: 0.7, repeat: filled ? Infinity : 0, ease: "linear" } }}
                        />
                    </svg>

                    {/* generated assets */}
                    <div className="mt-auto rounded-t-xl bg-white p-4 shadow-sm">
                        <p className="mb-4 text-[12px] font-semibold text-[#1B1C3A]">All Generated Assets</p>
                        <div className="grid grid-cols-3 gap-2.5">
                            {ASSETS.map((a, i) => (
                                <div key={i} className="relative aspect-[9/16] overflow-hidden rounded-[10px] border border-[#E6E8EC] bg-[#F1F2F4]">
                                    {/* brief dark "loading" bar after the click, before the image */}
                                    <motion.div
                                        className="absolute left-1/2 top-1/2 z-[5] h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#1B1C3A]"
                                        initial={false}
                                        animate={{ opacity: filled ? [0, 1, 1, 0] : 0 }}
                                        transition={{ duration: filled ? 0.42 : 0, times: [0, 0.15, 0.7, 1], ease: "easeInOut" }}
                                    >
                                        <motion.div
                                            className="h-full w-1/2 bg-white/60"
                                            initial={false}
                                            animate={{ x: filled ? ["-110%", "210%"] : "-110%" }}
                                            transition={{ duration: 0.45, ease: "easeInOut" }}
                                        />
                                    </motion.div>

                                    {/* bottom-up wipe — all three fill simultaneously; reset is instant */}
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{ clipPath: filled ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
                                        transition={{ duration: filled ? 0.2 : 0, delay: filled ? 0.4 : 0, ease: "easeOut" }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={a.img} alt="" className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-[#D2202A]/30" />
                                        {/* shimmer sweep right after the fill */}
                                        <motion.div
                                            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                                            initial={false}
                                            animate={{ x: filled ? ["-130%", "130%"] : "-130%" }}
                                            transition={{ duration: 0.7, delay: filled ? 0.55 : 0, ease: "easeInOut" }}
                                        />
                                    </motion.div>

                                    {/* score badge — straddles the top edge, pops in after the fill */}
                                    <motion.span
                                        initial={false}
                                        animate={{ opacity: filled ? 1 : 0, scale: filled ? 1 : 0.8 }}
                                        transition={{ duration: filled ? 0.2 : 0, delay: filled ? 0.72 : 0, ease: "easeOut" }}
                                        style={{ color: a.color }}
                                        className="absolute -top-1.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-white px-1.5 py-0.5 text-[7px] font-bold shadow-[0_2px_6px_rgba(0,0,0,0.15)] sm:text-[8px]"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: a.color }} />
                                        Score {a.score}/100
                                    </motion.span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
