"use client";

import Image from "next/image";
import HypeOn_Logo from "../../assets/HypeOn_Logo.png";
import {
    Captions, Megaphone, Eye, DollarSign, Activity, RefreshCw, ImageIcon,
    Target, Users, Globe, Languages, Bookmark, Type, LayoutGrid,
} from "lucide-react";

/* ============================================================
   Every platform, every signal — "One source of truth".
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
        <span className="flex flex-shrink-0 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 shadow-sm">
            <Icon className="h-3 w-3 text-slate-400" />
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
        <div style={{ left, top: "22%" }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-3 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.14)] sm:px-7 sm:py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt={name ?? ""} className="h-6 w-6 object-contain sm:h-7 sm:w-7" />
                {name && <span className="text-base font-semibold text-slate-800 sm:text-lg">{name}</span>}
            </div>
        </div>
    );
}

/* the curved connector + 2 flowing dots from a platform pill to the node */
function Connector({ d }: { d: string }) {
    return (
        <>
            <path d={d} fill="none" stroke="#d6dbd8" strokeWidth="1.4" />
            <circle r="3.6" fill="#475569">
                <animateMotion dur="2.6s" repeatCount="indefinite" path={d} />
            </circle>
            <circle r="3.6" fill="#475569">
                <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path={d} />
            </circle>
        </>
    );
}

export default function EveryPlatformSignal() {
    // viewBox is 600×320; the HTML pills/node use the same coordinate system as %.
    const PATHS = [
        "M75,100 C75,150 120,205 286,218",   // Meta
        "M225,100 C225,155 262,200 294,216", // Google
        "M375,100 C375,155 338,200 306,216", // TikTok
        "M525,100 C525,150 480,205 314,218", // Pinterest
    ];

    return (
        <section className="overflow-hidden bg-[oklch(0.988_0.0041_91.45)] py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 text-center">
                {/* heading */}
                <h2 className="text-3xl font-bold tracking-tighter text-[#1B1C3A] sm:text-4xl md:text-5xl">
                    Every platform, every signal
                </h2>
                <p className="mt-1 font-serif text-2xl italic text-slate-500 sm:text-3xl">
                    One source of truth
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500">
                    We track Meta, Google, and TikTok 24/7 extracting the signals that matter,
                    structured and searchable.
                </p>

                {/* diagram */}
                <div className="relative mx-auto mt-12 aspect-[600/320] w-full max-w-3xl">
                    {/* curved connectors + flowing signal dots */}
                    <svg viewBox="0 0 600 320" className="absolute inset-0 h-full w-full" aria-hidden>
                        {PATHS.map((d, i) => (
                            <Connector key={i} d={d} />
                        ))}
                    </svg>

                    {/* platform pills */}
                    <PlatformPill logo="/logos/meta.png" name="Meta" left="12.5%" />
                    <PlatformPill logo="/logos/google-ads.png" name="Google" left="37.5%" />
                    <PlatformPill logo="/logos/tiktok.webp" name="TikTok" left="62.5%" />
                    <PlatformPill logo="/logos/pinterest.png" name="Pinterest" left="87.5%" />

                    {/* central HypeOn node */}
                    <div style={{ left: "50%", top: "78%" }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-6px_rgba(0,0,0,0.18)] ring-4 ring-white sm:h-[72px] sm:w-[72px]">
                            <Image src={HypeOn_Logo} alt="HypeOn" width={44} height={44} className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
                        </div>
                    </div>
                </div>

                {/* tracking pill */}
                <div className="-mt-2 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-[12px] font-semibold text-slate-600 shadow-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                        Tracking 200M+ ads, 24/7
                    </span>
                </div>

                {/* two scrolling capability rows */}
                <div className="relative mt-10 space-y-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                    <TagRow items={ROW1} />
                    <TagRow items={ROW2} reverse />
                </div>
            </div>
        </section>
    );
}
