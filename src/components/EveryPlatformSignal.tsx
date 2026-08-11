"use client";

import Image from "next/image";
import HypeOn_Logo from "../../assets/HypeOn_Logo.png";
import {
    Captions, Megaphone, Eye, DollarSign, Activity, RefreshCw, ImageIcon,
    Target, Users, Globe, Languages, Bookmark, Type, LayoutGrid,
} from "lucide-react";

/* ============================================================
   Every platform, every signal - "One source of truth".
   Recreated from the marketer.com/ember diagram:
   • Meta / Google / TikTok pills connected by curved lines with
     flowing green signal-dots into a central HypeOn node.
   • two rows of capability tags scrolling in opposite directions.
============================================================ */

const ROW1 = [
    { icon: Captions, label: "Video transcripts" },
    { icon: Megaphone, label: "Share of voice" },
    { icon: Eye, label: "Reach" },
    { icon: DollarSign, label: "Estimated spend" },
    { icon: Activity, label: "Activity timeline" },
    { icon: RefreshCw, label: "Daily changes" },
    { icon: ImageIcon, label: "Creative assets" },
];

const ROW2 = [
    { icon: Target, label: "Targeting" },
    { icon: Users, label: "Demographics" },
    { icon: Globe, label: "Geography" },
    { icon: Languages, label: "Languages" },
    { icon: Bookmark, label: "Saved searches" },
    { icon: Type, label: "Ad copy" },
    { icon: LayoutGrid, label: "Format & placement" },
];

function Tag({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <span className="flex flex-shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/70 backdrop-blur-sm">
            <Icon className="h-3 w-3 text-white/40" />
            {label}
        </span>
    );
}

function TagRow({ items, reverse }: { items: typeof ROW1; reverse?: boolean }) {
    const row = [...items, ...items, ...items];
    return (
        <div
            className="flex w-max gap-2.5 animate-[marquee_38s_linear_infinite] motion-reduce:animate-none"
            style={{ animationDirection: reverse ? "reverse" : "normal" }}
        >
            {row.map((t, i) => (
                <Tag key={i} icon={t.icon} label={t.label} />
            ))}
        </div>
    );
}

/* a platform pill, absolutely positioned at left/top % of the diagram box */
function PlatformPill({ logo, name, left }: { logo: string; name?: string; left: string }) {
    return (
        // Anchored by its BOTTOM edge at 31.25% (= the SVG paths' y=100 start),
        // so the connector line always meets the pill regardless of pill height /
        // screen size. (Centering on a fixed top drifted on mobile, where the
        // fixed-px pill is large relative to the scaled SVG.)
        <div style={{ left, top: "31.25%" }} className="absolute z-10 -translate-x-1/2 -translate-y-full">
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-2 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md sm:gap-2.5 sm:px-7 sm:py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt={name ?? ""} className="h-4 w-4 object-contain sm:h-7 sm:w-7" />
                {name && <span className="text-[11px] font-semibold text-white/85 sm:text-lg">{name}</span>}
            </div>
        </div>
    );
}

/* the curved connector + 2 flowing dots from a platform pill to the node */
function Connector({ d }: { d: string }) {
    return (
        <>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.4" />
            <circle r="3.6" fill="#96a8a1">
                <animateMotion dur="2.6s" repeatCount="indefinite" path={d} />
            </circle>
            <circle r="3.6" fill="#8b9592">
                <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path={d} />
            </circle>
        </>
    );
}

export default function EveryPlatformSignal() {
    // viewBox is 600×320; the HTML pills/node use the same coordinate system as %.
    const PATHS = [
        "M96,100 C96,150 130,205 286,218",   // Meta   (16%)
        "M225,100 C225,155 262,200 294,216", // Google (37.5%)
        "M375,100 C375,155 338,200 306,216", // TikTok (62.5%)
        "M504,100 C504,150 470,205 314,218", // Pinterest (84%)
    ];

    return (
        <section className="relative overflow-hidden rounded-[28px] bg-[#0a0a0c] pt-16 pb-10 sm:rounded-[56px] sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16">
            {/* Faint dot-grid texture */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }}
            />
            {/* Soft ambient glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 hidden h-[460px] w-[460px] -translate-y-1/3 translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-2xl lg:block"
            />
        <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
            {/* heading */}
            <div className="text-center">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                        Unified Data
                    </span>
                </span>
                <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                    Every platform, every signal
                </h2>
                <p className="mt-1 font-serif text-2xl  text-white/50 sm:text-3xl">
                    One source of truth
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
                    We track Meta, Google, and TikTok 24/7 extracting the signals that matter,
                    structured and searchable.
                </p>
            </div>

            {/* diagram */}
            <div className="overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
                <div className="relative mx-auto aspect-[600/320] w-[86%] max-w-3xl">
                    {/* curved connectors + flowing signal dots */}
                    <svg viewBox="0 0 600 320" className="absolute inset-0 h-full w-full" aria-hidden>
                        {PATHS.map((d, i) => (
                            <Connector key={i} d={d} />
                        ))}
                    </svg>

                    {/* platform pills */}
                    <PlatformPill logo="/logos/meta.png" name="Meta" left="16%" />
                    <PlatformPill logo="/logos/google-ads.png" name="Google" left="37.5%" />
                    <PlatformPill logo="/logos/tiktok.webp" name="TikTok" left="62.5%" />
                    <PlatformPill logo="/logos/pinterest.png" name="Pinterest" left="84%" />

                    {/* central HypeOn node */}
                    <div style={{ left: "50%", top: "78%" }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_12px_30px_-6px_rgba(0,0,0,0.4)] ring-4 ring-white/10 backdrop-blur-md sm:h-[72px] sm:w-[72px]">
                            <Image src={HypeOn_Logo} alt="HypeOn" width={44} height={44} className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
                        </div>
                    </div>
                </div>

                {/* tracking pill */}
                <div className="mt-4 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12px] font-semibold text-white/70 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Tracking 200M+ ads, 24/7
                    </span>
                </div>
            </div>
        </div>

            {/* two scrolling capability rows - full width bleed */}
            <div className="relative mt-10 space-y-3 overflow-hidden">
                <TagRow items={ROW1} />
                <TagRow items={ROW2} reverse />
            </div>
        </section>
    );
}
