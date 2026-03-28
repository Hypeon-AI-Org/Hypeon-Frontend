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
    User
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HypeOn_Logo from "../../assets/HypeOn_Logo.png";

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
        <section className="relative py-10 sm:py-12 lg:py-16 bg-[oklch(0.988_0.0041_91.45)]  overflow-hidden border-t border-slate-200 cursor-pointer  ">
            {/* Outside vertical lines */}
            <div className="absolute left-0 top-0 h-full w-px bg-slate-200"></div>
            <div className="absolute right-0 top-0 h-full w-px bg-slate-200"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Header Reveal */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 lg:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black">
                        One intelligent system.<span className="text-brand-600">Two products.</span>
                    </h2>
                </motion.div>

                {/* Staggered Feature Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-0 border-y border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200"
                >
                    {/* Hypeon Analytics */}
                    <motion.div variants={fadeInUp} className="p-5 sm:p-6 md:p-8 lg:p-12 group hover:bg-white transition-colors duration-300">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-8 shadow-sm">
                            <BarChart2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="text-[17px] font-semibold text-slate-900 mb-3">Hypeon Analytics</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed mb-8 h-20">
                            See your real ROAS across every channel — Meta, Google, TikTok. True CPA, zero double-counting, and a clear Scale, Hold, or Cut signal for every campaign.
                        </p>
                        <Link href="/analytics" className="inline-flex items-center text-[13px] font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer min-h-[44px] sm:min-h-0">
                            Explore Analytics <ChevronRight className="w-3 h-3 ml-1" />
                        </Link>
                    </motion.div>

                    {/* Hypeon Copilot */}
                    <motion.div variants={fadeInUp} className="p-5 sm:p-6 md:p-8 lg:p-12 group hover:bg-white transition-colors duration-300">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-8 shadow-sm">
                            <Sparkles className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="text-[17px] font-semibold text-slate-900 mb-3">Hypeon  Intelligence</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed mb-8 h-20">
                           Know trending products, keywords, and winning ad angles before your competitors do — powered by real-time signals.
                        </p>
                        <Link href="/products" className="inline-flex items-center text-[13px] font-semibold text-slate-900 hover:text-orange-700 cursor-pointer min-h-[44px] sm:min-h-0">
                            Explore Intelligence <ChevronRight className="w-3 h-3 ml-1" />
                        </Link>
                    </motion.div>

                </motion.div>

                {/* Intelligence Dashboard Reveal - Slow and Smooth */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 60 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mt-10 w-full hidden md:block"
                >
                    <div className="relative bg-white rounded-xl sm:rounded-[2rem] border border-slate-200 overflow-hidden flex min-h-[500px] sm:min-h-[600px] lg:h-[700px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] lg:scale-[0.9]  ">

                        {/* Sidebar */}
                        <div className="w-56 border-r border-slate-100 bg-[#FCFCFC] hidden lg:flex flex-col p-6 flex-shrink-0">
                            <div className="flex items-center gap-2 mb-10">
                                <Image src={HypeOn_Logo} alt="HypeOn AI" width={32} height={32} className="rounded-lg" />
                                <span className="font-bold text-slate-900 text-[17px]">HypeOn AI</span>
                            </div>

                            <div className="space-y-1 mb-auto">
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-4 px-3">Insights Explorer</div>
                                <NavItem icon={<TrendingUp className="w-4 h-4" />} label="Ad Campaign" />
                                <NavItem icon={<LayoutGrid className="w-4 h-4" />} label="Product Analysis" active />
                                <NavItem icon={<BarChart2 className="w-4 h-4" />} label="Trend Overview" />
                                <NavItem icon={<Globe className="w-4 h-4" />} label="Market Forecast" />
                                <NavItem icon={<Users className="w-4 h-4" />} label="Customer Study" />
                            </div>


                            <div className="pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-3 px-3 py-2 text-slate-400 text-xs font-semibold">

                                    {/* User Icon */}
                                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-200">
                                        <User className="w-4 h-4 text-slate-500" />
                                    </div>

                                    {/* Name */}
                                    <span>Alex</span>

                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col bg-[#FDFDFD] overflow-hidden">
                            <div className="p-3 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 bg-white px-4 sm:px-6 md:px-8">
                                <div className="flex flex-wrap gap-2">
                                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] sm:text-xs text-slate-600 flex items-center gap-1.5">
                                        <LayoutGrid className="w-3 h-3 flex-shrink-0" /> Fashion & Apparel
                                    </div>
                                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] sm:text-xs text-slate-600 flex items-center gap-1.5">
                                        <Globe className="w-3 h-3 flex-shrink-0" /> United States
                                    </div>
                                </div>
                                <button type="button" className="bg-black text-white px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all min-h-[44px] cursor-pointer">
                                    Send
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                                    {/* Trending Products */}
                                    <div className="sm:col-span-2 bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <h4 className=" text-slate-900 text-lg">Trending Products</h4>
                                                <p className="text-xs text-slate-400 font-medium">High velocity SKUs across platforms</p>
                                            </div>
                                            <span className="text-[10px] text-slate-400  uppercase tracking-widest cursor-pointer">Hype Score</span>
                                        </div>
                                        <div className="space-y-1">
                                            <TrendRow
                                                name="Black Travel Tote - Weekender"
                                                category="Accessories"
                                                trendPath="M0 24 C10 18 20 10 30 14 C40 18 50 8 60 12 C70 16 80 6 90 9 C95 10 98 7 100 6"
                                                imageSrc="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80"
                                            />
                                            <TrendRow
                                                name="Black Flat Top - Shield"
                                                category="Eyewear"
                                                trendPath="M0 20 Q20 28 40 15 T100 10"
                                                imageSrc="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80"
                                            />
                                            <TrendRow
                                                name="Black Vintage Strap - 24mm"
                                                category="Watches"
                                                trendPath="M0 25 Q30 20 60 25 T100 15"
                                                imageSrc="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&auto=format&fit=crop&q=80"
                                            />
                                        </div>
                                        <button className="w-full mt-8 py-3.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-xl uppercase tracking-[0.15em] border border-slate-100">
                                            View Marketplace Feed
                                        </button>
                                    </div>

                                    {/* Creative Feed */}
                                    <div className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className=" text-slate-900">Creative Feed</h4>
                                            <div className="px-2 py-0.5 bg-emerald-50 text-[9px] text-emerald-600  rounded flex items-center gap-1.5 border border-emerald-100">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> LIVE TRACKING
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="aspect-[7/16] bg-slate-100 rounded-xl overflow-hidden relative group shadow-inner">
                                                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" alt="Model" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                    <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center shadow-lg"><Play className="w-3 h-3 text-white fill-white" /></div>
                                                </div>
                                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[8px]  text-slate-800">Tommy John</div>
                                            </div>
                                            <div className="aspect-[7/16] bg-slate-100 rounded-xl overflow-hidden relative group shadow-inner">
                                                <img src="https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=600&q=80" alt="Model" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                    <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center shadow-lg"><Play className="w-3 h-3 text-white fill-white" /></div>
                                                </div>
                                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[8px]  text-slate-800">Fashion Nova</div>
                                            </div>
                                        </div>
                                        <button className="w-full mt-auto py-4 bg-black text-white text-[11px] rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-black/10">
                                            Analyze Ad Library <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>

                                    {/* Rising Keywords */}
                                    <div className="sm:col-span-2 bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm overflow-x-auto">
                                        <h4 className="text-slate-900 mb-4 sm:mb-6 text-sm sm:text-base">Rising Keywords</h4>
                                        <div className="grid grid-cols-4 min-w-[400px] sm:min-w-0 text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-widest pb-3 border-b border-slate-100">
                                            <div>Keyword</div>
                                            <div className="text-center">Volume</div>
                                            <div className="text-center">Clicks</div>
                                            <div className="text-right">CPC</div>
                                        </div>
                                        <KeywordRow label="wide leg jeans" volume="450k" clicks="210k" cpc="$2.20" />
                                        <KeywordRow label="y2k fashion" volume="301k" clicks="145k" cpc="$1.20" />
                                        <KeywordRow label="maxi skirt" volume="301k" clicks="135k" cpc="$1.50" />
                                        <KeywordRow label="linen shirt" volume="301k" clicks="140k" cpc="$1.35" />
                                        <KeywordRow label="cargo pants women" volume="278k" clicks="120k" cpc="$1.75" />
                                        <KeywordRow label="oversized blazer" volume="256k" clicks="110k" cpc="$1.90" />
                                        <KeywordRow label="summer co ord set" volume="232k" clicks="98k" cpc="$1.60" />
                                    </div>

                                    {/* Launch Readiness Gauge */}
                                    <div className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-sm flex flex-col items-center justify-center">
                                        <h4 className="text-slate-900 mb-8">Launch Readiness</h4>
                                        <div className="relative w-44 h-44 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="88" cy="88" r="78" stroke="#f1f5f9" strokeWidth="14" fill="transparent" />
                                                <circle cx="88" cy="88" r="78" stroke="#ec4899" strokeWidth="14" fill="transparent" strokeDasharray="490" strokeDashoffset="122.5" strokeLinecap="round" />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-5xl font-black text-slate-900">75</span>
                                                <span className="text-[10px]  text-slate-400 uppercase tracking-[0.2em]">Score</span>
                                            </div>
                                        </div>
                                        <div className="mt-8 text-center">
                                            <p className="text-[11px] font-black text-pink-500 uppercase tracking-[0.25em]">High Demand</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 w-full mt-10">
                                            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Velocity</div>
                                                <div className="text-[12px] font-black text-slate-900">Critical</div>
                                            </div>
                                            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Risk</div>
                                                <div className="text-[12px] font-black text-orange-500">Medium</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Strategy Action Bar */}
                                <div className="mt-4 sm:mt-6 lg:mt-8 flex justify-end">
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 bg-white border border-slate-200 p-2 sm:pl-4 md:pl-6 rounded-xl sm:rounded-2xl shadow-xl shadow-slate-200/50 w-full sm:w-auto">
                                        <div className="flex items-center gap-2 cursor-pointer group min-h-[44px] sm:min-h-0">
                                            <Zap className="w-4 h-4 text-slate-900 group-hover:fill-slate-900 transition-all flex-shrink-0" />
                                            <span className="text-xs sm:text-[13px] font-bold text-slate-900">Generate Strategy</span>
                                        </div>
                                        <div className="px-3 sm:px-5 py-2 sm:py-2.5 bg-emerald-50 text-emerald-600 text-[9px] sm:text-[10px] font-black rounded-xl border border-emerald-100 flex items-center gap-2 tracking-widest">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)] flex-shrink-0"></div> AI EXPERT ONLINE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}