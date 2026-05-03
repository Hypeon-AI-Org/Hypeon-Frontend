'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  PanelLeft,
  TrendingDown,
  ArrowRight,
  Lock,
  Activity,
  Search,
  Calendar,
  Clock,
  Users,
  LayoutGrid,
  X,
  Maximize2,
  Crosshair,
  User as UserIcon,
  MessageCircle,
  Plus,
  Zap,
  ChevronDown,
  BadgeCheck,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';

const PLATFORM_LOGOS = [
  { name: 'Meta Ads', src: '/logos/meta.png' },
  { name: 'Google Ads', src: '/logos/google.png' },
  { name: 'Shopify', src: '/logos/shopify.png' },
  { name: 'Amazon', src: '/logos/amazon.png' },
  { name: 'TikTok Shop', src: '/logos/tiktok.webp' },
  { name: 'Instagram', src: '/logos/instagram.png' },
  { name: 'Pinterest', src: '/logos/pinterest.png' },
] as const;

const NikeSwoosh = ({ className }: { className?: string }) => (
  <Image
    src="/logos/nike_logo.jpg"
    alt="Nike"
    width={48}
    height={18}
    className={className}
   
    unoptimized
  />
);

type AdItem = {
  brand: string;
  status: 'Active' | 'Inactive';
  date: string;
  duration: string;
  productName: string;
  description: string;
  reach: string;
  spend: string;
  ageRange: string;
  gender: 'Male' | 'Female' | 'All';
  image: string;
  imageBg: string;
};

const TOP_ADS: AdItem[] = [
  
  {
    brand: 'Nike',
    status: 'Active',
    date: 'Apr 20, 2026',
    duration: '13 days',
    productName: 'Stay Light in Nike Ava X',
    description: 'Responsive cushioning meets everyday running comfort, mile after mile.',
    reach: '18.9K',
    spend: '€548',
    ageRange: '25-44',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
    imageBg: 'bg-neutral-100',
    
   
  },
  {
    brand: 'Nike',
    status: 'Inactive',
    date: 'Mar 30, 2026',
    duration: '8 days',
    productName: 'Nike Dri-FIT Move',
    description: 'Train through every layer of the season with breathable performance fabric.',
    reach: '14.6K',
    spend: '€421',
    ageRange: '18-34',
    gender: 'All',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=400&q=80',
    imageBg: 'bg-neutral-100',
  },
  {
    brand: 'Nike',
    status: 'Active',
    date: 'Apr 24, 2026',
    duration: '9 days',
    productName: 'Air Max Plus',
    description: 'Bold lines, all-day cushioning, unmistakably icon — the Air Max Plus is back.',
    reach: '12.3K',
    spend: '€388',
    ageRange: '18-34',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
    imageBg: 'bg-neutral-100',
  },
  {
    brand: 'Nike',
    status: 'Active',
    date: 'Apr 25, 2026',
    duration: '8 days',
    productName: 'SB Force 58',
    description: 'Built for skate, dressed for the streets — low-pro support meets street style.',
    reach: '9.8K',
    spend: '€311',
    ageRange: '18-34',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=400&q=80',
    imageBg: 'bg-neutral-100',
  },
];

type ArtifactTab =  'topAds' | 'gender' | 'age' ;

type BarDatum = { label: string; value: number; color: string };

const NIKE_GENDER: BarDatum[] = [
  { label: 'male', value: 145700, color: '#22C55E' },
  { label: 'female', value: 47200, color: '#3B82F6' },
  { label: 'unknown', value: 5800, color: '#A855F7' },
];

const NIKE_AGE: BarDatum[] = [
  { label: '35-44', value: 71500, color: '#22C55E' },
  { label: '25-34', value: 62500, color: '#3B82F6' },
  { label: '18-24', value: 32400, color: '#A855F7' },
  { label: '45-54', value: 18700, color: '#F97316' },
  { label: '55-64', value: 9200, color: '#EC4899' },
  { label: '65+', value: 3100, color: '#14B8A6' },
  { label: 'Unknown', value: 1300, color: '#94A3B8' },
];

const formatStat = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
};

function ChartArtifact({
  title,
  axisLabel,
  perLabel,
  data,
}: {
  title: string;
  axisLabel: string;
  perLabel: string;
  data: BarDatum[];
}) {
  const max = Math.max(...data.map((d) => d.value));
  const total = data.reduce((s, d) => s + d.value, 0);
  const avg = Math.round(total / data.length);
  const highest = data.reduce((p, c) => (c.value > p.value ? c : p));

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex-1 flex flex-col min-h-0"
    >
      <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3 bg-[#fafafa]">
        <div className="min-w-0">
          <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight truncate">{title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">(Assistant)</p>
        </div>
        <button type="button" className="flex-shrink-0 p-1.5 rounded-md border border-slate-200 bg-white text-slate-500 hover:text-slate-900 transition-colors">
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="relative h-56 flex pl-10 pr-1">
            <div className="absolute left-0 top-0 bottom-7 w-9 flex flex-col justify-between text-[10px] text-slate-400 text-right pr-1.5">
              <span>{formatStat(max)}</span>
              <span>{formatStat(Math.round(max / 2))}</span>
              <span>0</span>
            </div>
            <div className="flex-1 flex items-end justify-around gap-2 pb-7 border-l border-slate-100 pl-2">
              {data.map((d) => {
                const heightPct = max > 0 ? (d.value / max) * 100 : 0;
                return (
                  <div key={d.label} className="flex flex-col items-center justify-end h-full flex-1 max-w-[42px] relative">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full rounded-t-sm"
                      style={{ backgroundColor: d.color, minHeight: d.value > 0 ? 3 : 0 }}
                    />
                    <span className="absolute bottom-0 text-[10px] text-slate-600 truncate max-w-full translate-y-5">{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">{axisLabel}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5 px-1">
          <div>
            <p className="text-[10px] text-slate-500">Total</p>
            <p className="text-lg font-semibold text-slate-900 mt-0.5">{formatStat(total)}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Reach</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Average</p>
            <p className="text-lg font-semibold text-slate-900 mt-0.5">{formatStat(avg)}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{perLabel}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Highest</p>
            <p className="text-lg font-semibold text-slate-900 mt-0.5">{formatStat(highest.value)}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{highest.label}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [chatStep, setChatStep] = useState(0);
  const [setupPhase, setSetupPhase] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [hasContext, setHasContext] = useState(false);
  const [isLgUp, setIsLgUp] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<ArtifactTab>('topAds');
  const [chatCycle, setChatCycle] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLgUp(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const textToType = 'What are the top performing ads and audience demographics?';

  useEffect(() => {
    let isActive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, fn: () => void) => {
      const id = setTimeout(() => { if (isActive) fn(); }, ms);
      timers.push(id);
    };

    // Phase 1: open Add context popover
    // Delayed enough that the prior cycle's exit animations (messages,
    // artifacts panel, chat width) finish before the next cycle starts.
    after(1400, () => setSetupPhase(1));

    // Phase 1b: type "nike" into the search
    const searchWord = 'nike';
    let baseDelay = 2100;
    for (let i = 1; i <= searchWord.length; i++) {
      const slice = searchWord.slice(0, i);
      after(baseDelay, () => setSearchValue(slice));
      baseDelay += 90;
    }

    // Phase 2: show brand suggestions
    after(baseDelay + 300, () => setSetupPhase(2));

    // Phase 3: select Nike → chip appears, popover closes
    after(baseDelay + 1500, () => {
      setHasContext(true);
      setSetupPhase(3);
    });

    // Phase 4: start typing the question
    after(baseDelay + 2300, () => {
      let currentText = '';
      let idx = 0;
      const typeChar = () => {
        if (!isActive) return;
        if (idx < textToType.length) {
          currentText += textToType.charAt(idx);
          setInputValue(currentText);
          idx++;
          const id = setTimeout(typeChar, 35);
          timers.push(id);
        } else {
          if (isActive) setChatStep(1);
          const id = setTimeout(() => { if (isActive) setChatStep(2); }, 600);
          timers.push(id);
        }
      };
      typeChar();
    });

    return () => {
      isActive = false;
      timers.forEach(clearTimeout);
    };
  }, [textToType, chatCycle]);

  useEffect(() => {
    let isActive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, fn: () => void) => {
      const id = setTimeout(() => { if (isActive) fn(); }, ms);
      timers.push(id);
    };

    if (chatStep === 2) {
      setInputValue('');
      after(400, () => setChatStep(3));
    } else if (chatStep === 3) {
      after(1500, () => setChatStep(4));
    } else if (chatStep === 4) {
      after(1100, () => setChatStep(5));
    } else if (chatStep === 5) {
      after(5000, () => {
        setInputValue('');
        setSearchValue('');
        setHasContext(false);
        setSetupPhase(0);
        setActiveArtifact('topAds');
        setChatStep(0);
        setChatCycle((c) => c + 1);
      });
    }

    return () => {
      isActive = false;
      timers.forEach(clearTimeout);
    };
  }, [chatStep]);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const dashboard = dashboardRef.current;
    if (!heroSection || !dashboard) return;

    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!window.matchMedia('(min-width: 1024px)').matches) return;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
          const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
          const clampX = Math.max(-2, Math.min(2, xAxis));
          const clampY = Math.max(-2, Math.min(2, yAxis));
          if (Math.abs(clampX - lastX) > 0.1 || Math.abs(clampY - lastY) > 0.1) {
            dashboard.style.transform = `rotateY(${clampX}deg) rotateX(${clampY}deg)`;
            lastX = clampX;
            lastY = clampY;
          }
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      dashboard.style.transform = 'rotateY(0deg) rotateX(0deg)';
      lastX = 0; lastY = 0;
    };

    heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  const words = [
    "Wrong Product.",
    "Wrong Channel.",
    "Wrong Ads.",
    "Wrong Pricing.",
    "Wrong Markets.",
    "Wrong Audience.",
    "Wrong Campaign.",
    "Wrong Geo.",
    "Wrong Creative.",
    "Wrong Trend.",
    "Wrong Inventory.",
    "Wrong Customer."
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800); // slower cycle so each word is readable longer

    return () => clearInterval(interval);
  }, []);
  return (
    <section ref={heroSectionRef} className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pt-16 lg:pb-32 bg-[oklch(0.988_0.0041_91.45)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ── TOP: TEXT CONTENT (isolation + z-20 so CTA is always on top and clickable) ── */}
        <div className="relative z-20 isolation-isolate overflow-hidden">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 lg:px-12 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-24 lg:pb-32">

            <div className="max-w-5xl text-left pl-0 lg:pl-16 w-full">

              {/* Badge */}
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-black text-white flex-shrink-0">
                  <Activity className="w-3 h-3" />
                </span>
                <span className="text-slate-600 font-medium text-sm sm:text-base tracking-tight">
                  Built on millions of data signals
                </span>
              </div>

              {/* Headline: 36–40px mobile, 64–72px desktop; normal weight; animation scales with font */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tighter leading-[1.12] text-neutral-900 mb-6 sm:mb-10">
                Stop wasting budget <br className="sm:hidden" /> on the {" "}
                <span className="relative inline-block align-baseline h-[1.3em] min-w-[300px] sm:min-w-[340px] md:min-w-[440px] lg:min-w-[560px] xl:min-w-[680px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{
                        opacity: 0,
                        y: "0.4em",
                        filter: "blur(0.15em)"
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                      }}
                      exit={{
                        opacity: 0,
                        y: "-0.4em",
                        filter: "blur(0.15em)"
                      }}
                      transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="absolute left-0 top-0 whitespace-nowrap"
                      style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* CTA — hover slide animation only lg+ (avoids sticky/fake hover on touch) */}
              <a
  href="https://calendly.com/yash-hypeon/30min?month=2026-03"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative inline-flex items-center gap-1.5 pl-1 pr-3 py-1 sm:gap-3 sm:pl-2 sm:pr-5 sm:py-2 rounded-full bg-black text-white transition-all duration-300 shadow-lg cursor-pointer overflow-hidden min-h-[40px] sm:min-h-[48px]"
>
  {/* The Icon Container */}
  <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-black transition-all duration-500 ease-in-out lg:group-hover:translate-x-[130px]">
    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
  </div>

  {/* The Text Container */}
  <span className="text-sm font-medium transition-all duration-500 ease-in-out lg:group-hover:-translate-x-10 sm:text-lg">
    Get the demo
  </span>
</a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: MINIMAL UI MOCKUP (perspective only here so CTA hit-testing is not affected) ── */}
        <div className="w-full relative z-0 reveal lg:px-0 mx-auto max-w-5xl xl:max-w-8xl perspective-container">
          <div ref={dashboardRef} className="card-3d-wrap relative transform-gpu">

            {/* Float Element: Notification */}


            <div
              className="relative bg-white rounded-3xl overflow-hidden ring-1 ring-slate-200/40 flex flex-col items-center"
              style={{
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.10), 0 10px 30px -6px rgba(0,0,0,0.04)',
              }}
            >
              {/* Minimal Header */}
              <div className="w-full bg-white/80 backdrop-blur-sm border-b border-slate-100/80 px-6 py-3.5 flex items-center justify-between z-20">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-full h-[26px] w-[26px] flex items-center justify-center overflow-hidden">
                    <Image
                      src={logo}
                      alt="HypeOn AI Logo"
                      width={26}
                      height={26}
                    />
                  </div>
                  <span className="text-[13.5px] font-semibold text-slate-900 tracking-tight">HypeOn Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 rounded-full text-[10.5px] font-medium border border-slate-200/60 tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Synced with Meta Ads
                  </div>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                    <PanelLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="w-full h-[600px] flex flex-row relative bg-[#fcfcfc]">

                {/* ── LEFT: Chat column ── */}
                <motion.div
                  animate={{ width: chatStep >= 5 && isLgUp ? '50%' : '100%' }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="relative h-full flex flex-col min-w-0"
                >
                  <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-8 pb-36 w-full max-w-3xl mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* Empty state context / AI greeting */}
                    <AnimatePresence mode="wait">
                      {chatStep < 2 && (
                        <motion.div
                          key="empty-state"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="w-full text-center mt-20"
                        >
                          <div className="flex items-center justify-center mb-6">
                            <div className=" rounded-full h-[60px] w-[60px] flex items-center justify-center overflow-hidden">
                              <Image
                                src={logo}
                                alt="HypeOn AI Logo"
                                width={60}
                                height={60}
                              />
                            </div>
                          </div>
                          <h3 className="text-xl font-medium text-slate-900 mb-2">Your AI-powered ad insights</h3>
                          <p className="text-sm text-slate-500">Ask about creatives, spend, or positioning. Click “+ Add Context” to pull from our curated brand library powered by Explore.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* User sent message */}
                    <AnimatePresence>
                      {chatStep >= 2 && (
                        <motion.div
                          key="user-msg"
                          layout
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="flex w-full justify-end mb-8"
                        >
                          <div className="bg-[#f0f0f0] rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[88%] text-slate-900 text-[12px] font-medium leading-relaxed shadow-sm text-left">
                            {textToType}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AI Response Container */}
                    <AnimatePresence>
                      {chatStep >= 3 && (
                        <motion.div
                          key="ai-response"
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                          className="flex justify-start w-full mt-6"
                        >
                        <div className="rounded-full h-[28px] w-[28px] flex items-center justify-center overflow-hidden flex-shrink-0">
                          <Image
                            src={logo}
                            alt="HypeOn AI Logo"
                            width={28}
                            height={28}
                          />
                        </div>
                        <div className="ml-3 sm:ml-4 flex-1 min-w-0 text-left">

                          {/* Thinking Dots */}
                          {chatStep === 3 && (
                            <div className="bg-white border border-slate-100 px-5 py-4 rounded-2xl rounded-tl-sm w-max shadow-sm h-12 flex flex-col justify-center">
                              <div className="flex space-x-1.5 items-center">
                                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                              </div>
                            </div>
                          )}

                          {/* Complete Response */}
                          {chatStep >= 4 && (
                            <div className="animate-fade-up space-y-4 w-full text-[11.5px] leading-[1.65] tracking-[-0.005em] text-slate-600">

                              {/* Intro */}
                              <p>
                                I&apos;ve analyzed Nike&apos;s top-performing ads on Meta in Sweden and their audience demographics, based on the last 500 ads.
                              </p>

                              {/* Top Ad Analysis */}
                              <div className="space-y-1.5">
                                <p className="text-slate-900 font-medium text-[11.5px]">Top ad</p>
                                <p>
                                  &ldquo;Stay Light in Nike Ava X&rdquo; ran from April 22, 2026 and is still active. It reached an estimated 34,762 people — the highest in the current sample.
                                </p>
                                <ul className="space-y-1 mt-1.5">
                                  <li className="flex gap-2">
                                    <span className="text-slate-300 mt-px">·</span>
                                    <span>Visual centers on a stripped-down silhouette of the Nike Ava shoe.</span>
                                  </li>
                                  <li className="flex gap-2">
                                    <span className="text-slate-300 mt-px">·</span>
                                    <span>Messaging: &ldquo;The new stripped-down silhouette is the lightest expression of Nike Ava.&rdquo;</span>
                                  </li>
                                  <li className="flex gap-2">
                                    <span className="text-slate-300 mt-px">·</span>
                                    <span>Targeting: ages 18–44 in Sweden, no specific gender.</span>
                                  </li>
                                </ul>
                              </div>

                              {/* Audience Demographics */}
                              <div className="space-y-1.5">
                                <p className="text-slate-900 font-medium text-[11.5px]">Audience</p>
                                <p>
                                  Predominantly male (≈145,719). Highest reach among 35–44 year olds (71,508), then 25–34 (62,499).
                                </p>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] pt-0.5">
                                  <a className="text-slate-500 underline decoration-slate-200 underline-offset-2 hover:text-slate-900 cursor-pointer">Gender distribution</a>
                                  <a className="text-slate-500 underline decoration-slate-200 underline-offset-2 hover:text-slate-900 cursor-pointer">Age distribution</a>
                                </div>
                              </div>

                              {/* Campaign Context */}
                              <div className="space-y-1.5">
                                <p className="text-slate-900 font-medium text-[11.5px]">Campaigns</p>
                                <p>
                                  All top 10 ads launched in late April 2026. Other strong creatives include &ldquo;Nike Air Performance&rdquo;.
                                </p>
                              </div>

                              {/* Artifact chips */}
                              {chatStep >= 5 && (
                                <div className="relative z-10 flex flex-wrap gap-2 pt-2 animate-fade-up">
                                  {([
                                    { id: 'topAds', label: 'Top Ads', Icon: LayoutGrid },
                                    { id: 'gender', label: 'Gender', Icon: BarChart3 },
                                    { id: 'age', label: 'Age', Icon: BarChart3 },
                                    
                                  ] as const).map(({ id, label, Icon }) => {

                                    const active = activeArtifact === id;
                                    return (
                                      <button
                                        key={id}
                                        type="button"
                                        onClick={() => setActiveArtifact(id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white text-xs font-semibold transition-colors cursor-pointer ${
                                          active
                                            ? 'border-slate-900 text-slate-900 ring-1 ring-slate-900/5'
                                            : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                                        }`}
                                      >
                                        <Icon className="w-3 h-3" /> {label}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                            </div>
                          )}
                        </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* Input + Add-context Footer */}
                  <div className="absolute w-full bottom-0 left-0 px-5 sm:px-8 pt-8 pb-2 bg-gradient-to-t from-[#fcfcfc] via-[#fcfcfc] to-transparent">
                    <div className="max-w-3xl mx-auto relative">

                      {/* Add context popover */}
                      <AnimatePresence>
                        {(setupPhase === 1 || setupPhase === 2) && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute left-0 right-0 bottom-full mb-3 bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] p-4 z-30 origin-bottom"
                          >
                            {/* Popover header */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[14px] font-semibold text-slate-900">Add context</span>
                              <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-slate-200 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                  <span className="w-3.5 h-3.5 rounded-full overflow-hidden flex flex-col leading-none border border-slate-200">
                                    <span className="flex-1 bg-[#006AA7]" />
                                    <span className="h-[2px] bg-[#FECC00]" />
                                    <span className="flex-1 bg-[#006AA7]" />
                                  </span>
                                  SE
                                  <ChevronDown className="w-3 h-3 text-slate-400" />
                                </button>
                                <button className="text-slate-400 hover:text-slate-700 transition-colors">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Platform tabs */}
                            <div className="flex items-center gap-1 mb-3 overflow-x-auto">
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[12px] font-medium whitespace-nowrap">
                                <Image src="/logos/meta.png" alt="Meta" width={14} height={14} className="w-3.5 h-3.5 rounded-full object-contain" />
                                Meta
                              </button>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 text-[12px] font-medium hover:bg-slate-50 whitespace-nowrap">
                                <span className="w-3.5 h-3.5 rounded-full bg-white border border-slate-200 text-[9px] font-bold flex items-center justify-center text-[#4285F4]">G</span>
                                Google
                              </button>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 text-[12px] font-medium hover:bg-slate-50 whitespace-nowrap">
                                <span className="w-3.5 h-3.5 grid grid-cols-2 gap-px">
                                  <span className="bg-[#F25022]" />
                                  <span className="bg-[#7FBA00]" />
                                  <span className="bg-[#00A4EF]" />
                                  <span className="bg-[#FFB900]" />
                                </span>
                                Microsoft
                              </button>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 text-[12px] font-medium hover:bg-slate-50 whitespace-nowrap">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#E60023] text-white text-[9px] font-bold flex items-center justify-center">P</span>
                                Pinterest
                              </button>
                            </div>

                            {/* Search input */}
                            <div className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg border ${setupPhase === 2 ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200'} bg-white transition-all`}>
                              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="text-[13px] text-slate-900 flex-1 truncate">
                                {searchValue || <span className="text-slate-400">Search Meta brand or type a keyword...</span>}
                                {searchValue && setupPhase < 3 && (
                                  <span className="inline-block w-px h-3.5 bg-slate-700 ml-px align-middle animate-pulse" />
                                )}
                              </span>
                            </div>

                            {/* Suggestions list */}
                            <AnimatePresence>
                              {setupPhase === 2 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-2 -mx-1"
                                >
                                  <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-slate-50 text-left">
                                    <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                    <span className="text-[13px] text-slate-700">Search ads containing &ldquo;{searchValue}&rdquo;</span>
                                  </button>

                                  <div className="text-[10px] uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1 font-semibold">ADVERTISERS</div>

                                  {[
                                    { name: 'Nike', tag: 'Sportswear Store', fb: '39.6M', ig: '@nike (297.3M)', highlight: true },
                                    { name: 'Nike Football', tag: 'Product/service', fb: '40.3M', ig: '@nikefootball (46.0M)', highlight: false },
                                    { name: 'Nike Run Club', tag: 'Sports & Recreation Venue', fb: '15.4M', ig: '@nikerunning (6.3M)', highlight: false },
                                  ].map((b) => (
                                    <button
                                      key={b.name}
                                      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-colors ${b.highlight ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                                    >
                                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-black">
                                        <NikeSwoosh className="w-5 h-5 text-white" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-[13px] font-semibold text-slate-900">{b.name}</span>
                                          <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-100" strokeWidth={2.5} />
                                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{b.tag}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                                          <span className="flex items-center gap-1">
                                            <Image src="/logos/meta.png" alt="Meta" width={12} height={12} className="w-3 h-3 rounded-full object-contain" />
                                            {b.fb} followers
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <Image src="/logos/instagram.png" alt="Instagram" width={12} height={12} className="w-3 h-3 rounded-sm object-contain" />
                                            {b.ig}
                                          </span>
                                        </div>
                                      </div>
                                      <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-100 flex-shrink-0" strokeWidth={2.5} />
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Multi-row input box */}
                      <div className="bg-[#fcfcfc] rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-within:border-slate-300 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                        {/* Top row: input + chip */}
                        <div className="flex items-start gap-2 px-4 pt-3.5 pb-1">
                          <input
                            type="text"
                            readOnly
                            value={inputValue}
                            placeholder="Ask anything..."
                            className="flex-1 min-w-0 bg-transparent text-[14px] text-slate-900 font-medium placeholder-slate-400 outline-none"
                          />
                          <AnimatePresence>
                            {hasContext && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.85, x: 6 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                className="flex items-center gap-1.5 pl-1.5 pr-1 py-0.5 bg-white border border-slate-200 rounded-full text-[11px] font-medium text-slate-700 flex-shrink-0"
                              >
                                <Image src="/logos/meta.png" alt="Meta" width={14} height={14} className="w-3.5 h-3.5 rounded-full object-contain" />
                                Nike
                                <button className="w-3.5 h-3.5 flex items-center justify-center text-slate-400 hover:text-slate-700">
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Bottom row: controls + send */}
                        <div className="flex items-center justify-between px-2.5 pb-2 pt-1">
                          <div className="flex items-center gap-0.5 text-slate-600">
                            <button className="flex items-center gap-1 px-2 py-1 text-[12px] hover:bg-slate-50 rounded-md transition-colors">
                              <MessageCircle className="w-3.5 h-3.5" />
                              Chat
                              <ChevronDown className="w-3 h-3 text-slate-400" />
                            </button>
                            <span className="w-px h-3 bg-slate-200" />
                            <button className={`flex items-center gap-1 px-2 py-1 text-[12px] rounded-md transition-colors ${(setupPhase === 1 || setupPhase === 2) ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-50'}`}>
                              <Plus className="w-3.5 h-3.5" />
                              Add context
                            </button>
                          
                            
                          </div>
                          <button
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${inputValue.length > 0 || chatStep >= 2
                              ? 'bg-black text-white hover:bg-slate-800 scale-100'
                              : 'bg-[#e8e8e8] text-slate-400 scale-95'
                              }`}
                          >
                            <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>

                      {/* Secure badge */}
                      <div className="flex justify-center mt-1.5 text-[10px] font-semibold tracking-wide text-slate-400 space-x-1.5">
                 

                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ── RIGHT: Artifacts panel (slides in after response) ── */}
                <AnimatePresence>
                  {chatStep >= 5 && (
                    <motion.div
                      initial={{ x: '100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '100%', opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                      className="hidden lg:flex w-1/2 h-full flex-col border-l border-slate-200 bg-[#fafafa]"
                    >
                      {/* Tab strip */}
                      <div className="relative z-20 flex items-center justify-between px-3 pt-3 pb-0 border-b border-slate-200/70">
                        <div className="flex items-center gap-1">
                          {([
                                 { id: 'topAds', label: 'Top Ads', Icon: LayoutGrid },
                            { id: 'gender', label: 'Gender', Icon: BarChart3 },
                            { id: 'age', label: 'Age', Icon: BarChart3 },
                       
                          ] as const).map(({ id, label, Icon }) => {
                            const active = activeArtifact === id;
                            return (
                              <button
                                key={id}
                                type="button"
                                onClick={() => setActiveArtifact(id)}
                                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                                  active
                                    ? 'text-slate-900 border-b-2 border-slate-900 -mb-[1px]'
                                    : 'text-slate-500 hover:text-slate-900'
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {label}
                                <X className="w-3 h-3 ml-1 opacity-50" />
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-2 pr-1">
                          <span className="text-[11px] font-medium text-slate-500 px-2 py-1 rounded-md border border-slate-200 bg-white">All artifacts (3)</span>
                        </div>
                      </div>

                      {/* Tab content: Gender / Age */}
                      {activeArtifact !== 'topAds' && (
                        <ChartArtifact
                          key={activeArtifact}
                          title={activeArtifact === 'gender' ? 'Nike: Gender Distribution (SE)' : 'Nike: Age Distribution (SE)'}
                          axisLabel={activeArtifact === 'gender' ? 'Gender' : 'Age Group'}
                          perLabel={activeArtifact === 'gender' ? 'per gender' : 'per age group'}
                          data={activeArtifact === 'gender' ? NIKE_GENDER : NIKE_AGE}
                        />
                      )}

                      {activeArtifact === 'topAds' && (
                        <motion.div
                          key="topAds"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="flex-1 flex flex-col min-h-0"
                        >
                          {/* Header */}
                          <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3 bg-[#fafafa]">
                            <div className="min-w-0">
                              <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight truncate">
                                Top Performing Ads Gallery: Nike SE
                              </h4>
                            
                            </div>
                            <button className="flex-shrink-0 p-1.5 rounded-md border border-slate-200 bg-white text-slate-500 hover:text-slate-900 transition-colors">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Filter row */}
                          <div className="px-5 pb-3 flex items-center gap-2">
                            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200">
                              <Search className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-[12px] text-slate-400">Filter ads by keyword, brand, platform...</span>
                            </div>
                            <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">10 ads</span>
                          </div>

                          {/* Ad cards grid */}
                          <div className="flex-1 overflow-y-auto px-4 pb-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="grid grid-cols-2 gap-3">
                              {TOP_ADS.map((ad, i) => (
                            <motion.div
                              key={ad.productName}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                              className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)] transition-shadow"
                            >
                              {/* Card header */}
                              <div className="flex items-center justify-between px-2.5 pt-2 pb-1.5">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-black">
                                    <NikeSwoosh className="w-3.5 h-3.5 text-white" />
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-900 truncate">{ad.brand}</span>
                                </div>
                                <span className={`flex items-center gap-1 text-[9px] font-medium flex-shrink-0 ${ad.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                  <span className={`w-1 h-1 rounded-full ${ad.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                  {ad.status}
                                </span>
                              </div>

                              {/* Creative preview — real product photo */}
                              <div className={`relative aspect-square ${ad.imageBg} overflow-hidden`}>
                                <Image
                                  src={ad.image}
                                  alt={ad.productName}
                                  fill
                                  sizes="(min-width: 1024px) 180px, 50vw"
                                  className="object-cover"
                                />
                                <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm text-white text-[8px] font-semibold px-1.5 py-0.5 rounded">
                                  Meta <ArrowUp className="w-2 h-2 rotate-45" strokeWidth={2.5} />
                                </div>
                              </div>

                              {/* Date row */}
                              <div className="flex items-center gap-2 px-2.5 pt-2 text-[9px] text-slate-500">
                                <span className="flex items-center gap-0.5">
                                  <Calendar className="w-2 h-2" /> {ad.date}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <Clock className="w-2 h-2" /> {ad.duration}
                                </span>
                              </div>

                              {/* Title + description */}
                              <div className="px-2.5 pt-1 pb-1.5">
                                <p className="text-[11px] font-bold text-slate-900 leading-tight line-clamp-1">
                                  {ad.productName}
                                </p>
                                <p className="text-[10px] text-slate-600 leading-snug line-clamp-2 mt-0.5">
                                  {ad.description}
                                </p>
                              </div>

                              {/* Stats row */}
                              <div className="flex items-center justify-between gap-1 px-2.5 pb-1.5 text-[9px] text-slate-500">
                                <span className="flex items-center gap-0.5">
                                  <Users className="w-2 h-2" /> {ad.reach}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <span className="text-slate-400">€</span>{ad.spend}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <UserIcon className="w-2 h-2" /> {ad.ageRange}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <Crosshair className="w-2 h-2" /> {ad.gender}
                                </span>
                              </div>

                              {/* Platform footer */}
                              <div className="flex items-center justify-between px-2.5 py-1.5 border-t border-slate-100">
                                <div className="flex items-center gap-1">
                                  <Image src="/logos/meta.png" alt="Meta" width={12} height={12} className="w-3 h-3 rounded-full object-contain" />
                                  <Image src="/logos/instagram.png" alt="Instagram" width={12} height={12} className="w-3 h-3 rounded-sm object-contain" />
                                </div>
                                <span className="w-3.5 h-3.5 rounded-full overflow-hidden flex flex-col text-[6px] leading-none border border-slate-200">
                                  <span className="flex-1 bg-[#006AA7]" />
                                  <span className="h-[2px] bg-[#FECC00]" />
                                  <span className="flex-1 bg-[#006AA7]" />
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 lg:pt-10 reveal">
        <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6 lg:mb-8 text-center px-2">
          Trusted by founders scaling on
        </p>
        <div className="marquee-container overflow-x-hidden">
          <div className="marquee-content flex justify-center">
            {[...Array(5)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-8">
                {PLATFORM_LOGOS.map(({ name, src }) => (
                  <div
                    key={src}
                    className="flex items-center gap-2 font-semibold text-base sm:text-lg text-slate-700 whitespace-nowrap"
                  >
                    <span className="relative w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 rounded flex items-center justify-center bg-white border border-slate-100 overflow-hidden p-0.5">
                      <Image
                        src={src}
                        alt=""
                        width={28}
                        height={28}
                        className="object-contain w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </span>
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
