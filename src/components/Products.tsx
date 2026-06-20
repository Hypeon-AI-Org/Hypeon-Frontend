"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart2,
    Bot,
    Sparkles,
    LayoutGrid,
    Search,
    Users,
    ChevronRight,
    TrendingUp,
    Globe,
    Zap,
    Play,
    User,
    Wand2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HypeOn_Logo from "../../assets/HypeOn_Logo.png";
import MediaCarousel from "./MediaCarousel";

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

// --- Helper Components ---
interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer min-h-[44px] ${active ? 'bg-white border border-slate-100 text-slate-900 font-semibold shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
        {icon} <span className="truncate">{label}</span>
    </div>
);

interface TrendRowProps {
    name: string;
    category: string;
    trendPath: string;
    imageSrc: string;
}

const TrendRow: React.FC<TrendRowProps> = ({ name, category, trendPath, imageSrc }) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex-shrink-0 overflow-hidden border border-slate-100 flex items-center justify-center p-1 shadow-sm">
                <img src={imageSrc} alt={name} className="w-full h-full object-contain" />
            </div>
            <div>
                <div className="text-[13px] font-bold text-slate-900 tracking-tight">{name}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{category}</div>
            </div>
        </div>
        <div className="w-24 h-8">
            <svg viewBox="0 0 100 30" className="w-full h-full">
                <path d={trendPath} fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
    </div>
);

interface KeywordRowProps {
    label: string;
    volume: string;
    clicks: string;
    cpc: string;
}

const KeywordRow: React.FC<KeywordRowProps> = ({ label, volume, clicks, cpc }) => (
    <div className="grid grid-cols-4 items-center text-[12px] py-4 border-b border-slate-50">
        <div className="font-bold text-slate-800">{label}</div>
        <div className="text-slate-500 font-medium text-center">{volume}</div>
        <div className="text-slate-500 font-medium text-center">{clicks}</div>
        <div className="text-pink-500 font-bold text-right">{cpc}</div>
    </div>
);

export default function Products() {
    return (
        <section className="relative py-3 sm:py-8 bg-[oklch(0.988_0.0041_91.45)]  overflow-hidden cursor-pointer  ">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Header Reveal */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-3 sm:mb-8"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black">
                        AI Ad Platform .<span className="text-brand-600">Built for Performance.</span>
                    </h2>
                </motion.div>
            </div>

            {/* Creative carousel — every image & video from /public/carousel,
                alternating image → video. Full-bleed. */}
            <MediaCarousel theme="light" />
        </section>
    );
}