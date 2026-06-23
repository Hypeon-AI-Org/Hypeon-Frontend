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
import Section, { Cell } from './Section';

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
    <Section sectionRef={heroSectionRef}>
      <Cell bleed className="relative pt-20 sm:pt-24 pb-6 sm:pb-8 lg:pt-16 lg:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ── TOP: TEXT CONTENT (isolation + z-20 so CTA is always on top and clickable) ── */}
        <div className="relative z-20 isolation-isolate overflow-hidden">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 lg:px-12 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-10 lg:pb-12">

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
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tighter leading-[1.12] text-neutral-900 mb-9 sm:mb-10">
                Stop wasting budget <br className="sm:hidden" /> on the {" "}
                <span className="relative inline-grid align-baseline min-w-[230px] sm:min-w-[340px] md:min-w-[440px] lg:min-w-[560px] xl:min-w-[680px] overflow-hidden pb-[0.18em] -mb-[0.18em]">
                  {/* invisible copy in the same grid cell sets the baseline/size;
                      the animated word stacks on top of it sharing that baseline */}
                  <span aria-hidden className="invisible whitespace-nowrap col-start-1 row-start-1">{words[index]}</span>
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
                      className="col-start-1 row-start-1 whitespace-nowrap"
                      style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* CTA — hover slide animation only lg+ (avoids sticky/fake hover on touch) */}
              <a
  href="https://app.hypeon.ai/login"
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


      </div>

      </Cell>

      {/* Trusted-by strip — its own thin grid band, hairline-separated like the partner row */}
      <Cell className="reveal py-7 sm:py-9">
        <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6 text-center px-2">
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

      </Cell>
    </Section>
  );
}
