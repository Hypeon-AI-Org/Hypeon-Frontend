"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Layers } from "lucide-react";
import Section, { Cell } from "./Section";

/* Bottom-of-home CTA: a dashboard mockup with a glowing "Try For Free Now"
   button floating in the center. Drop your dashboard screenshot at
   /public/ad-dashboard.png (or change the src below). */

export default function DashboardCTA({ image = "/dashboard.png" }: { image?: string }) {
    return (
        <Section>
            <Cell bleed className="px-4 pb-0 pt-12 sm:px-6 sm:pt-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-6xl rounded-t-[1.6rem] border border-b-0 border-slate-200 bg-[oklch(0.988_0.0041_91.45)] px-2.5 pb-0 pt-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] sm:px-3 sm:pt-3"
            >
                {/* dashboard image - next/image serves AVIF/WebP + a sized srcset,
                    cutting the ~1.5MB PNG to a few hundred KB and lazy-loading it. */}
                <Image
                    src={image}
                    alt="Hypeon dashboard"
                    width={1279}
                    height={666}
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="block h-auto w-full select-none rounded-t-xl object-contain"
                />

                {/* soft scrim so the button pops */}
                <div className="pointer-events-none absolute inset-x-2.5 bottom-0 top-2.5 rounded-t-xl bg-white/20 sm:inset-x-3 sm:top-3" />

                {/* CTA - centered */}
                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="relative">
                        {/* faint outer glow */}
                        <div className="absolute -inset-4 rounded-[2.2rem] bg-slate-500/25 blur-xl" />
                        {/* translucent frosted highlight box - content shows through */}
                        <div className="absolute -inset-2.5 rounded-[1.5rem] bg-gradient-to-b from-slate-200/55 to-slate-300/25 ring-1 ring-white/50 backdrop-blur-[2px] sm:-inset-4" />
                        <motion.a
                            href="https://calendly.com/yash-hypeon/30min"
                            initial={{ scale: 0.92, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ scale: 1.04 }}
                            className="relative inline-flex min-h-[44px] items-center gap-2 overflow-hidden rounded-[0.8rem] bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0a] px-3.5 py-2 text-sm font-bold tracking-tight text-white shadow-[0_16px_38px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/15 sm:px-5 sm:py-2.5 sm:text-sm"
                        >
                            {/* top sheen */}
                            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                            <span className="relative">Try For Free Now</span>
                            <Layers className="relative h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
                        </motion.a>
                    </div>
                </div>
            </motion.div>
            </Cell>
        </Section>
    );
}
