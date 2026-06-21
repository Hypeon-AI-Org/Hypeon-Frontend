"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe, Mic, Paperclip, Phone, Play, Sparkles, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HypeOn_Logo from "../../assets/HypeOn_Logo.png";
import MediaCarousel, { MEDIA, MarqueeVideo } from "./MediaCarousel";
import Section, { Cell } from "./Section";

/* ============================================================
   Hypeon Studio — AI-powered ad creatives, curated by designers
   Recreates the reference motion: a field of creative thumbnails
   scattered around the headline, each drifting slowly + a soft
   mouse / scroll parallax on the whole field.
============================================================ */

// Real ad creatives from the marketer.com/ember hero, downloaded + optimized
// into /public/hero (webp, ~520px wide) so they serve from our own domain.
const CREATIVE_IMAGES = [
    "/hero/ember-01.webp",
    "/hero/ember-02.webp",
    "/hero/ember-03.webp",
    "/hero/ember-04.webp",
    "/hero/ember-05.webp",
    "/hero/ember-06.webp",
    "/hero/ember-07.webp",
    "/hero/ember-08.webp",
    "/hero/ember-09.webp",
    "/hero/ember-10.webp",
    "/hero/ember-11.webp",
    "/hero/ember-12.webp",
    "/hero/ember-13.webp",
    "/hero/ember-14.webp",
    "/hero/ember-15.webp",
    "/hero/ember-16.webp",
];

/* Scatter field — positions in % of the viewport, tuned to the reference:
   small dim tiles toward the edges, a few brighter ones, all avoiding the
   central headline box. `o` = resting opacity (depth), `w` = width in px,
   `ar` = aspect ratio, `feat` = eligible for the periodic spotlight pop. */
type Tile = {
    x: number; y: number; w: number; o: number; ar: string;
    depth: number; dur: number; img: number; feat?: boolean;
};
const TILES: Tile[] = [
    // left column
    { x: 12, y: 8, w: 64, o: 0.9, ar: "1/1", depth: 1.4, dur: 8, img: 1 },
    { x: 4, y: 24, w: 40, o: 0.3, ar: "3/4", depth: 2.0, dur: 9.5, img: 4 },
    { x: 16, y: 27, w: 34, o: 0.4, ar: "3/4", depth: 1.7, dur: 7.5, img: 9 },
    { x: 11, y: 45, w: 56, o: 0.85, ar: "3/4", depth: 1.2, dur: 10, img: 11 },
    { x: 3, y: 62, w: 36, o: 0.35, ar: "1/1", depth: 2.1, dur: 8.5, img: 5 },
    { x: 7, y: 78, w: 58, o: 0.9, ar: "3/4", depth: 1.5, dur: 7, img: 0 },
    { x: 19, y: 80, w: 44, o: 0.45, ar: "3/4", depth: 1.8, dur: 11, img: 13 },
    { x: 14, y: 95, w: 38, o: 0.3, ar: "1/1", depth: 2.5, dur: 9, img: 6 },
    { x: 26, y: 16, w: 30, o: 0.3, ar: "3/4", depth: 1.9, dur: 8, img: 15 },
    { x: 30, y: 55, w: 34, o: 0.4, ar: "3/4", depth: 1.6, dur: 10.5, img: 2 },
    { x: 33, y: 66, w: 40, o: 0.55, ar: "1/1", depth: 1.3, dur: 7.5, img: 7 },
    { x: 24, y: 64, w: 30, o: 0.3, ar: "3/4", depth: 2.0, dur: 9, img: 12 },
    // top center (the model shot sitting on the box edge)
    { x: 46, y: 9, w: 78, o: 0.95, ar: "3/4", depth: 0.8, dur: 9, img: 8, feat: true },
    { x: 35, y: 22, w: 30, o: 0.3, ar: "3/4", depth: 1.8, dur: 8, img: 3 },
    // right column
    { x: 70, y: 11, w: 64, o: 0.9, ar: "1/1", depth: 1.4, dur: 8.5, img: 14, feat: true },
    { x: 88, y: 8, w: 40, o: 0.35, ar: "3/4", depth: 2.0, dur: 7, img: 10 },
    { x: 78, y: 24, w: 34, o: 0.4, ar: "3/4", depth: 1.7, dur: 10, img: 1 },
    { x: 94, y: 30, w: 56, o: 0.9, ar: "3/4", depth: 1.1, dur: 9, img: 3, feat: true },
    { x: 73, y: 44, w: 30, o: 0.3, ar: "1/1", depth: 1.9, dur: 8, img: 6 },
    { x: 90, y: 52, w: 40, o: 0.5, ar: "3/4", depth: 1.5, dur: 11, img: 9 },
    { x: 95, y: 70, w: 58, o: 0.9, ar: "3/4", depth: 1.3, dur: 7.5, img: 2 },
    { x: 80, y: 74, w: 36, o: 0.4, ar: "1/1", depth: 1.8, dur: 9.5, img: 5 },
    { x: 70, y: 88, w: 44, o: 0.55, ar: "3/4", depth: 1.6, dur: 8, img: 11 },
    { x: 88, y: 92, w: 34, o: 0.3, ar: "3/4", depth: 2.5, dur: 10, img: 13 },
    { x: 64, y: 60, w: 30, o: 0.3, ar: "3/4", depth: 1.7, dur: 8.5, img: 4 },
    // bottom center (model shot below the CTAs)
    { x: 52, y: 92, w: 60, o: 0.9, ar: "3/4", depth: 1.2, dur: 9, img: 7, feat: true },
];

/* A single creative tile. Per the deep video analysis, tiles are STATIC at
   rest (no idle float/rotation) — depth is baked into fixed size + opacity.
   Layers:
     • anchor — static centering (top/left %)
     • mouse  — true 3D parallax on BOTH X and Y, depth-weighted (interactive)
     • reveal — one-shot fade + scale-in on load only
   The radial "rise from the background" zoom is at the field level. */
function FloatingTile({ t, index, mouse }: {
    t: Tile; index: number; mouse: { x: number; y: number };
}) {
    return (
        // anchor: static centering — no animated transform here
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${t.x}%`, top: `${t.y}%`, width: t.w }}
        >
            {/* 3D mouse-parallax layer (X + Y, depth-weighted, ×-40 per spec) */}
            <motion.div
                className="will-change-transform"
                animate={{ x: mouse.x * t.depth * -40, y: mouse.y * t.depth * -40 }}
                transition={{ type: "spring", stiffness: 40, damping: 20, mass: 0.6 }}
            >
                {/* one-shot load reveal only — no looping idle motion */}
                <motion.div
                    className="will-change-transform"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: t.o, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.05 + index * 0.025, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="overflow-hidden rounded-md border border-white/10 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={CREATIVE_IMAGES[t.img]}
                            alt=""
                            loading="lazy"
                            className="block h-auto w-full object-cover"
                            style={{ aspectRatio: t.ar }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

/* The whole field scales UP about screen-centre as you scroll (1.0 → 1.7,
   completing by ~60% scroll, then holding) — so every tile spreads outward and
   grows, "coming up from the background" exactly like the video. Scrubbed 1:1
   with scroll, lightly spring-smoothed. No separate translate — the page scroll
   carries it up. */
function FloatingField({ progress }: { progress: MotionValue<number> }) {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const fieldScale = useSpring(useTransform(progress, [0, 0.85], [1, 1.7]), {
        stiffness: 120, damping: 30, mass: 0.5,
    });
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
    };
    return (
        <motion.div
            className="absolute inset-0 hidden origin-center will-change-transform sm:block"
            style={{ scale: fieldScale }}
            onMouseMove={handleMove}
            onMouseLeave={() => setMouse({ x: 0, y: 0 })}
            aria-hidden
        >
            {TILES.map((t, i) => (
                <FloatingTile key={i} t={t} index={i} mouse={mouse} />
            ))}
        </motion.div>
    );
}

/* Mobile creative field — render the SAME full scatter as desktop so the hero
   reads as a dense field of creatives (not a sparse few), but statically: the
   scroll-zoom + mouse parallax are jittery / meaningless on touch, so on phones
   each tile just does a one-shot reveal + an endless gentle vertical float so
   the field feels alive without fighting scroll. Visible only below `sm`;
   desktop is untouched. The hero's overflow-hidden clips any edge bleed. */
function MobileTile({ t, index }: { t: Tile; index: number }) {
    const drift = index % 2 === 0 ? -9 : 9; // alternate up / down so it feels organic
    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${t.x}%`, top: `${t.y}%`, width: t.w }}
        >
            {/* one-shot reveal (opacity/scale) — pure CSS, runs once then settles */}
            <div
                className="will-change-transform"
                style={{
                    opacity: 0,
                    ["--tile-o" as string]: t.o,
                    animation: `studioTileReveal 0.7s cubic-bezier(0.22,1,0.36,1) ${(0.05 + index * 0.025).toFixed(3)}s forwards`,
                } as React.CSSProperties}
            >
                {/* endless gentle float — CSS keyframe on the compositor thread, so
                    it never runs JS per-frame and never blocks scrolling */}
                <div
                    className="studio-tile-float will-change-transform"
                    style={{
                        ["--tile-drift" as string]: `${drift}px`,
                        animation: `studioTileFloat ${t.dur}s ease-in-out ${(index * 0.12).toFixed(2)}s infinite`,
                    } as React.CSSProperties}
                >
                    <div className="overflow-hidden rounded-md border border-white/10 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={CREATIVE_IMAGES[t.img]}
                            alt=""
                            loading="lazy"
                            className="block h-auto w-full object-cover"
                            style={{ aspectRatio: t.ar }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
function MobileField() {
    // On a narrow phone the headline box fills most of the width, so any tile in
    // the central column lands directly on top of the text. Keep the dense scatter
    // around the edges but drop tiles inside the central headline / CTA zone so the
    // type stays clean and readable. Desktop (FloatingField) is unaffected.
    const clearsHeadline = (t: Tile) => !(t.x > 24 && t.x < 76 && t.y > 24 && t.y < 84);
    return (
        // pushed down from the top so the scatter clears the fixed navbar and the
        // header (logo / menu) stays clean and tappable.
        <div className="absolute inset-x-0 bottom-0 top-14 origin-center sm:hidden" aria-hidden>
            {TILES.filter(clearsHeadline).map((t, i) => (
                <MobileTile key={i} t={t} index={i} />
            ))}
        </div>
    );
}

/* Full-height hero (no pin, so no empty black gap). The field scales out from
   centre on scroll while the headline box / "+" / CTAs stay FIXED on top (they
   do NOT scale) — matching the reference. The next section follows right after. */
function StudioHero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

    return (
        // Normal-flow hero (no pin) — the field zooms out from centre as the
        // hero scrolls away, and the next section follows immediately, so there
        // is no empty black band to scroll through.
        <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050505] text-white">
                {/* Floating creative field (scales out from centre on scroll) */}
                <FloatingField progress={scrollYProgress} />
                {/* Mobile: same scatter, static + smooth (no scroll-zoom/parallax) */}
                <MobileField />

            {/* Soft darkening behind the headline box so type stays crisp */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_46%_48%_at_50%_50%,rgba(5,5,5,0.84)_45%,rgba(5,5,5,0.3)_72%,transparent_100%)]" />

            {/* Central headline box — fixed (does not scale with the field) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 mx-6 w-full max-w-lg"
            >
                <div className="relative rounded-none border border-white/30 px-6 py-8 sm:px-8 sm:py-9">
                    {/* centre 4-point star marker */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-[#E66245]"
                        aria-hidden
                    >
                        <path d="M12 1.5 L13.4 10.6 L22.5 12 L13.4 13.4 L12 22.5 L10.6 13.4 L1.5 12 L10.6 10.6 Z" />
                    </svg>

                    <h1 className="text-left font-sans text-2xl font-bold uppercase leading-[1.05] tracking-tighter sm:text-2xl md:text-3xl">
                        AI that<br />creates
                    </h1>
                    <h2 className="mt-5 text-right font-sans text-2xl font-bold uppercase leading-[1.05] tracking-tighter sm:text-2xl md:text-3xl">
                        runs your<br />winning ads
                    </h2>
                </div>

                {/* CTAs below the box */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href="https://app.hypeon.ai/hub/login"
                        className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#E66245] py-2 pl-2 pr-5 text-[14px] font-bold text-white shadow-lg shadow-[#E66245]/25 transition-colors hover:bg-[#d6543a]"
                    >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25">
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                        Book demo
                    </a>
                    <a
                        href="#formats"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                    >
                        <Play className="h-3 w-3 fill-white" /> See our creatives
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

/* ---------------- Paste → Generate → Ship (light, site UI) ---------------- */

const SCORE_CARDS = [
    { label: "Hook Loop", badge: "92", tag: "WIN", tone: "win", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=75" },
    { label: "Urban Run", badge: "84", tag: "WIN", tone: "win", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=75" },
    { label: "Product Pour", badge: "71", tag: "HYPE SCORE", tone: "score", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=75" },
    { label: "Founder POV", badge: "58", tag: "HYPE SCORE", tone: "muted", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=75" },
] as const;

const BADGE_TONE: Record<string, string> = {
    win: "bg-[#E66245] text-white",
    score: "bg-amber-500 text-white",
    muted: "bg-white/90 text-slate-700",
};

function StudioScoreboard() {
    return (
        <Section cols={1} className="text-white">
            {/* header row */}
            <Cell>
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#E66245]">
                            Paste <ArrowRight className="h-3 w-3" /> Generate <ArrowRight className="h-3 w-3" /> Ship
                        </p>
                        <h2 className="max-w-xl text-3xl font-bold leading-[1.02] tracking-tighter sm:text-5xl">
                            Real cuts. Real scores. Pick the winner.
                        </h2>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-70">
                        <Sparkles className="h-4 w-4 text-[#E66245]" /> Explore the gallery <ArrowRight className="h-4 w-4" />
                    </a>
                </motion.div>
            </Cell>

            {/* content grid */}
            <Cell bleed className="px-6 py-12 sm:px-10 sm:py-16">
                <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-center">
                    {/* product URL card */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
                    >
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/40">Product URL</p>
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                            <span className="flex-1 truncate text-sm text-white/50">paste-url.com/your-product</span>
                            <button type="button" aria-label="Generate" className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#E66245] text-white transition-colors hover:bg-[#d6543a]">
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-white/50">
                            We pull logo, palette, fonts and tone — then write the prompt for you.{" "}
                            <a href="https://app.hypeon.ai/hub/login" className="font-semibold text-white hover:underline">Get started →</a>
                        </p>
                    </motion.div>

                    {/* scored creative cards */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {SCORE_CARDS.map((c, i) => (
                            <motion.div
                                key={c.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={c.img} alt={c.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                                {/* score badge */}
                                <span className={`absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm ${BADGE_TONE[c.tone]}`}>
                                    <span className="text-[12px] leading-none">{c.badge}</span>
                                    <span className="opacity-80">{c.tag}</span>
                                </span>
                                {/* label */}
                                <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white">
                                    {c.label} · 9:16
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Cell>
        </Section>
    );
}

/* ---------------- One engine. Every industry. ---------------- */

const INDUSTRIES = ["Fashion", "Beauty", "Food & Beverage", "Home", "Wellness"] as const;

// Real per-industry ad creatives from the marketer.com/ember "One engine.
// Every industry." section, downloaded + optimized into /public/hero/ind
// (webp). Each category keeps its own creatives, placed in the same grid.
const INDUSTRY_IMAGES: Record<(typeof INDUSTRIES)[number], string[]> = {
    Fashion: [
        "/hero/ind/fashion-1.webp",
        "/hero/ind/fashion-2.webp",
        "/hero/ind/fashion-3.webp",
        "/hero/ind/fashion-4.webp",
        "/hero/ind/fashion-1.webp",
    ],
    Beauty: [
        "/hero/ind/beauty-1.webp",
        "/hero/ind/beauty-2.webp",
        "/hero/ind/beauty-3.webp",
        "/hero/ind/beauty-4.webp",
        "/hero/ind/beauty-1.webp",
    ],
    "Food & Beverage": [
        "/hero/ind/food-1.webp",
        "/hero/ind/food-2.webp",
        "/hero/ind/food-3.webp",
        "/hero/ind/food-4.webp",
        "/hero/ind/food-1.webp",
    ],
    Home: [
        "/hero/ind/home-1.webp",
        "/hero/ind/home-2.webp",
        "/hero/ind/home-3.webp",
        "/hero/ind/home-1.webp",
        "/hero/ind/home-2.webp",
    ],
    Wellness: [
        "/hero/ind/wellness-1.webp",
        "/hero/ind/wellness-2.webp",
        "/hero/ind/wellness-3.webp",
        "/hero/ind/wellness-4.webp",
        "/hero/ind/wellness-5.webp",
    ],
};

// Per-industry hero VIDEO (centre slot), pulled from the marketer.com/ember
// industry pages (Mux) and optimized into /public/hero/ind-vid.
const INDUSTRY_VIDEO: Record<(typeof INDUSTRIES)[number], string> = {
    Fashion: "/hero/ind-vid/fashion.mp4",
    Beauty: "/hero/ind-vid/beauty.mp4",
    "Food & Beverage": "/hero/ind-vid/food.mp4",
    Home: "/hero/ind-vid/home.mp4",
    Wellness: "/hero/ind-vid/wellness.mp4",
};

function StudioIndustries() {
    const [active, setActive] = useState<(typeof INDUSTRIES)[number]>("Fashion");

    return (
        <Section cols={1} className="text-white">
            <Cell>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                        One engine. Every industry.
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-white/55">
                        Statics and video from the Hypeon system. A taste of what your brand
                        could look like.
                    </p>
                </motion.div>
            </Cell>

            <Cell bleed className="overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
                {/* Category pills */}
                <div className="flex flex-wrap justify-center gap-2">
                    {INDUSTRIES.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setActive(c)}
                            className={`min-h-[40px] rounded-full px-4 text-[13px] font-semibold transition-colors ${
                                active === c
                                    ? "bg-white text-black"
                                    : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Featured grid — big centre image, 2 stacked left, 2 stacked right */}
                <div className="mt-12 grid grid-cols-3 grid-rows-2 gap-3 sm:gap-4">
                    {INDUSTRY_IMAGES[active].slice(0, 5).map((src, i) => {
                        const pos = [
                            "col-start-1 row-start-1",            // left top
                            "col-start-2 row-start-1 row-span-2", // centre (tall)
                            "col-start-3 row-start-1",            // right top
                            "col-start-1 row-start-2",            // left bottom
                            "col-start-3 row-start-2",            // right bottom
                        ][i];
                        const isCenter = i === 1;
                        return (
                            <motion.div
                                key={`${active}-${i}`}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                className={`group overflow-hidden rounded-2xl border border-white/10 ${pos} ${isCenter ? "" : "aspect-[3/4]"}`}
                            >
                                {isCenter ? (
                                    // centre slot = the industry video (lazy, pauses on scroll)
                                    <MarqueeVideo key={active} src={INDUSTRY_VIDEO[active]} />
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={src}
                                        alt={`${active} creative`}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-14 flex justify-center">
                    <Link
                        href="/products"
                        className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        Explore the full engine <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </Cell>
        </Section>
    );
}

/* ---------------- Studio production (text + image split) ---------------- */

function StudioProduction() {
    return (
        <Section cols={2} className="text-white">
            {/* copy */}
            <Cell>
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Hypeon Studio</h2>
                        <p className="mt-4 text-base text-white/80">
                            Original concepts, campaigns and full creative production.
                        </p>
                        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/50">
                            For when you need net-new AI generated creatives. Good for bulk concept
                            packs for testing, full campaign creative, AI-native video and motion,
                            and hero ads with craft.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href="https://app.hypeon.ai/hub/login"
                                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#E66245] px-6 text-sm font-bold text-white shadow-lg shadow-[#E66245]/25 transition-colors hover:bg-[#d6543a]"
                            >
                                Start a brief
                            </a>
                            <a
                                href="#"
                                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                            >
                                Book a demo
                            </a>
                    </div>
                </motion.div>
            </Cell>

            {/* image */}
            <Cell bleed className="overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
                >
                    {/* hypeon-studio showcase video (lazy, pauses on scroll) */}
                    <MarqueeVideo src="/hypeon-studio.mp4" poster="/hypeon-studio-poster.jpg" />
                </motion.div>
            </Cell>
        </Section>
    );
}

/* ---------------- One prompt. Done! (comparison) ---------------- */

const TRADITIONAL_STEPS = [
    "Research what competitors are running",
    "Write the copy and scripts manually",
    "Design or generate each creative",
    "Test against trends",
    "Edit and assemble everything together",
    "Add captions, copy and finishing touches",
    "Export, upload and repeat",
];

const AGENT_STEPS: { text: string; agent: boolean }[] = [
    { text: "Define what is needed", agent: false },
    { text: "Agent researches top ads in your niche", agent: true },
    { text: "Agent writes copy & scripts based on insights", agent: true },
    { text: "Agent produces full creatives", agent: true },
    { text: "Agent adds finishing touches & formats", agent: true },
    { text: "Agent resizes to all aspect ratios", agent: true },
    { text: "Export, upload and repeat", agent: false },
];

function StudioComparison() {
    return (
        <Section cols={2} className="text-white">
            {/* header */}
            <Cell className="md:col-span-2 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-md text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        One prompt. <span className="text-white/40">Done!</span>
                    </h2>
                    <p className="mx-auto mt-4 text-white/50">
                        Other tools make you do the work step by step. Hypeon works for you.
                    </p>
                </motion.div>
            </Cell>

            {/* traditional */}
            <Cell>
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
                >
                        <h3 className="text-lg font-semibold">Traditional Way</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/45">
                            Multiple tools, multiple steps, hours of manual work for every single ad.
                        </p>
                        <ul className="mt-7 space-y-4">
                            {TRADITIONAL_STEPS.map((t) => (
                                <li key={t} className="flex items-center gap-3 text-sm text-white/65">
                                    <User className="h-4 w-4 flex-shrink-0 text-white/30" />
                                    {t}
                                </li>
                            ))}
                        </ul>
                </motion.div>
            </Cell>

            {/* hypeon agent */}
            <Cell>
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-2xl border border-[#E66245]/40 bg-gradient-to-br from-[#161616] via-[#46251a] to-[#E66245] p-6 sm:p-8"
                >
                        <div className="flex items-center gap-2">
                            <Image src={HypeOn_Logo} alt="Hypeon" width={24} height={24} className="h-6 w-6 rounded" />
                            <h3 className="text-lg font-semibold">Hypeon Agent</h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-white/75">
                            One prompt and the agent researches, creates, and delivers
                            ready-to-publish ads.
                        </p>
                        <ul className="mt-7 space-y-4">
                            {AGENT_STEPS.map((a) => (
                                <li key={a.text} className="flex items-center gap-3 text-sm font-medium text-white">
                                    {a.agent ? (
                                        <Image src={HypeOn_Logo} alt="" width={16} height={16} className="h-4 w-4 flex-shrink-0" />
                                    ) : (
                                        <User className="h-4 w-4 flex-shrink-0 text-white/55" />
                                    )}
                                    {a.text}
                                </li>
                            ))}
                        </ul>
                </motion.div>
            </Cell>
        </Section>
    );
}

/* ---------------- 80/20 process (image + numbered steps) ---------------- */

const PROCESS_STEPS: { title: string; desc: string }[] = [
    {
        title: "Drop a brief",
        desc: "Paste a product URL or describe your campaign — we pull your logo, palette, fonts and tone automatically.",
    },
    {
        title: "Flat monthly fee",
        desc: "One predictable monthly price. No per-asset costs and no surprise overages — generate as much as you need.",
    },
    {
        title: "Hypeon drafts",
        desc: "Our AI + senior creatives produce ready-to-run ads across Meta, TikTok and Google — every ratio, every language.",
    },
    {
        title: "Performance reviews",
        desc: "We track what's winning and feed the results back in, so every new batch of creative is sharper than the last.",
    },
];

const PROCESS_PILLS = [
    { label: "Files", icon: Paperclip },
    { label: "Markets", icon: Globe },
    { label: "Call a strategist", icon: Phone },
];

function StudioProcess() {
    const [open, setOpen] = useState(-1);
    return (
        <Section cols={2} className="text-white">
            {/* heading */}
            <Cell className="md:col-span-2">
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-3xl text-center text-2xl font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]"
                >
                    <span className="text-white/35">Our AI does 80% of the work,</span> <span className="text-white">so you only pay 20% for our service</span>
                </motion.h2>
            </Cell>

            {/* image + chat overlay */}
            <Cell>
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
                >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=75"
                            alt="Drop a brief"
                            loading="lazy"
                            className="aspect-[4/3] w-full object-cover"
                        />
                        <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                            <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 shadow-lg">
                                <span className="flex-1 truncate text-sm text-slate-500">Describe your campaign, or drop a brand brief…</span>
                                <Mic className="h-4 w-4 flex-shrink-0 text-slate-400" />
                                <button type="button" aria-label="Send" className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {PROCESS_PILLS.map(({ label, icon: Icon }) => (
                                    <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-600 shadow-sm">
                                        <Icon className="h-3 w-3" /> {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                </motion.div>
            </Cell>

            {/* numbered steps */}
            <Cell>
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                        {PROCESS_STEPS.map((s, i) => {
                            const isOpen = open === i;
                            return (
                                <div key={s.title} className="border-t border-white/10 first:border-t-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(isOpen ? -1 : i)}
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-opacity hover:opacity-80"
                                    >
                                        <h3 className={`text-lg font-semibold transition-colors ${isOpen ? "text-white" : "text-white/70"}`}>
                                            {s.title}
                                        </h3>
                                        <span className="text-[11px] font-medium tabular-nums tracking-widest text-white/30">
                                            0{i + 1}
                                        </span>
                                    </button>
                                    {/* expand/collapse */}
                                    <div className={`grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                        <div className="min-h-0 overflow-hidden">
                                            <p className="max-w-sm pb-5 text-sm leading-relaxed text-white/50">{s.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <a
                            href="https://app.hypeon.ai/hub/login"
                            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0e1422] py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#141c30]"
                        >
                            Start a brief
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900">
                                <ArrowUpRight className="h-4 w-4" />
                            </span>
                        </a>
                </motion.div>
            </Cell>
        </Section>
    );
}

/* ---------------- Floating ad-card gallery (scroll parallax) ---------------- */

function StudioGallery() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    // ONE uniform translate for the whole cluster — no parallax. Flat segments
    // at both ends reproduce the measured scrub pauses.
    const y = useSpring(useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [-40, -70, -520, -560]), {
        stiffness: 90, damping: 26, mass: 0.5,
    });

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#0a0a0a] text-white">
            {/* clipped streaming window — single rigid cluster moving straight up */}
            <div className="relative h-[72vh] overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-x-0 top-0 will-change-transform">
                    {/* dense full-width wall of ad cards — fills the frame so no
                        black voids show on the dark theme. Duplicated for height. */}
                    <div className="mx-auto max-w-7xl columns-3 gap-3 px-3 sm:columns-4 sm:gap-4 lg:columns-6 [&>*]:mb-3 sm:[&>*]:mb-4">
                        {/* real carousel creatives — images + lazy-playing videos
                            from /public/carousel (duplicated to fill the height) */}
                        {[...MEDIA, ...MEDIA].map((m, i) => (
                            <div
                                key={i}
                                className="aspect-[9/16] break-inside-avoid overflow-hidden rounded-lg border border-white/10 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]"
                            >
                                {m.type === "video" ? (
                                    <MarqueeVideo src={m.src} />
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={m.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default function Studio() {
    return (
        <div className="bg-[#0a0a0a]" style={{ ["--grid-bg" as string]: "#0a0a0a", ["--grid-line" as string]: "rgba(255,255,255,0.12)", ["--grid-mark" as string]: "rgba(255,255,255,0.22)" } as React.CSSProperties}>
            <StudioHero />
            <MediaCarousel />
            <StudioIndustries />
            <StudioScoreboard />
            <StudioProduction />
            <StudioProcess />
            <StudioGallery />
            <StudioComparison />
        </div>
    );
}
