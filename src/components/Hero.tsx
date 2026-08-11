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
import { motion, AnimatePresence, useReducedMotion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import Image from 'next/image';
import { primeIOSVideo } from '@/lib/videoAutoplay';
import { onIntroDone } from '@/lib/introSignal';

type ShowcaseCard = {
  src: string;
  poster: string;
  caption: string;
  left: string;
  top: string;
  width: number;
};

// Scattered showcase cards behind the hero copy - real AI-actor ad clips,
// positioned loosely around the text like a wall of UGC creatives.
// Left/right cards flank the (max-w-2xl, ~21%-79% of the 1180px container) text
// column, so they never fight it horizontally. Only the two center cards sit
// directly above/below the copy, so THEY are the ones tuned to clear it vertically.
const CARD_WIDTH = 140;

const SHOWCASE_CARDS: ShowcaseCard[] = [
  { src: '/hero/ind-vid/wellness.mp4', poster: '/hero/ind-vid/posters/wellness.jpg', caption: '', left: '2%', top: '7%', width: CARD_WIDTH },
  { src: '/hero/ind-vid/beauty.mp4', poster: '/hero/ind-vid/posters/beauty.jpg', caption: '', left: '40%', top: '-6%', width: CARD_WIDTH },
  { src: '/hero/ind-vid/fashion.mp4', poster: '/hero/ind-vid/posters/fashion.jpg', caption: '', left: '84%', top: '3%', width: CARD_WIDTH },
  { src: '/hero/ind-vid/food.mp4', poster: '/hero/ind-vid/posters/food.jpg', caption: '', left: '4%', top: '58%', width: CARD_WIDTH },
  { src: '/hero/ind-vid/home.mp4', poster: '/hero/ind-vid/posters/home.jpg', caption: '', left: '42%', top: '78%', width: CARD_WIDTH },
  { src: '/carousel/045e53458f4485d2.mp4', poster: '/carousel/posters/045e53458f4485d2.jpg', caption: '', left: '80%', top: '54%', width: CARD_WIDTH },
];

// Where each card starts before it "deals out" - clustered/overlapping near the
// center with a slight messy jitter + rotation, like a fanned stack of cards.
const CLUSTER_START = [
  { left: '40%', top: '32%', rotate: -8 },
  { left: '46%', top: '28%', rotate: 5 },
  { left: '52%', top: '34%', rotate: -5 },
  { left: '38%', top: '46%', rotate: 6 },
  { left: '47%', top: '50%', rotate: -6 },
  { left: '54%', top: '44%', rotate: 4 },
] as const;

// Extra dusty-glass smudges spread across the FULL viewport width (percentages
// here are relative to the 100vw wrapper, not the 1180px content column), so the
// frosted haze reaches the far left/right edges of the hero, not just the cards.
const FULL_BLEED_BLOBS = [
  { left: '2%', top: '22%', size: 260 },
  { left: '10%', top: '58%', size: 220 },
  { left: '22%', top: '42%', size: 200 },
  { left: '90%', top: '20%', size: 240 },
  { left: '95%', top: '54%', size: 260 },
  { left: '80%', top: '70%', size: 200 },
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
    description: 'Bold lines, all-day cushioning, unmistakably icon - the Air Max Plus is back.',
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
    description: 'Built for skate, dressed for the streets - low-pro support meets street style.',
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

// Shared entrance motion for the hero copy cluster
const heroParentVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const heroChildVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

// Real metric that counts up once when scrolled into view
function CountUpStat({
  value,
  prefix = '',
  suffix = '',
  label,
  reduce,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (inView) {
      const controls = animate(mv, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, reduce, value, mv]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1.5 text-slate-500">
      <span className="text-slate-900 font-semibold tabular-nums">
        {prefix}
        {reduce ? value : display}
        {suffix}
      </span>
      {label}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
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

  // Nothing below should animate while <SiteIntro/>'s black curtain is still
  // covering the screen - wait for its "done" signal before starting.
  const [siteIntroDone, setSiteIntroDone] = useState(false);
  useEffect(() => onIntroDone(() => setSiteIntroDone(true)), []);

  // Entrance sequence: single card flickers through the library → all 6 pop
  // in clustered at center → they deal outward into place. (The black
  // curtain → logo beat now plays once, site-wide, in <SiteIntro />.)
  const [introPhase, setIntroPhase] = useState<1 | 2>(1);
  useEffect(() => {
    if (reduce) { setIntroPhase(2); return; }
    if (!siteIntroDone) return;
    const t2 = setTimeout(() => setIntroPhase(2), 1300);
    return () => clearTimeout(t2);
  }, [reduce, siteIntroDone]);

  // Rapid flicker through the showcase posters while phase 1 is on screen -
  // the "slot machine" flash right before the cards deal out.
  const [shuffleIndex, setShuffleIndex] = useState(0);
  useEffect(() => {
    if (introPhase !== 1 || reduce || !siteIntroDone) return;
    const id = setInterval(() => {
      setShuffleIndex((i) => (i + 1) % SHOWCASE_CARDS.length);
    }, 130);
    return () => clearInterval(id);
  }, [introPhase, reduce, siteIntroDone]);

  const textToType = 'What are the top performing ads and audience demographics?';

  useEffect(() => {
    if (!siteIntroDone && !reduce) return;
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
  }, [textToType, chatCycle, siteIntroDone, reduce]);

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

  return (
    <section ref={heroSectionRef} className="relative bg-white pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-24">
        <div className="relative mx-auto w-full max-w-[1180px] min-h-[420px] lg:min-h-[900px] overflow-hidden lg:overflow-visible">

          {/* Full-bleed dusty-glass wash - spans the entire viewport width (not just
              the 1180px content column) so the frosted-glass haze fills the whole
              hero background, left edge to right edge. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen hidden lg:block overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            }}
          >
            {FULL_BLEED_BLOBS.map((b, i) => (
              <motion.div
                key={`edge-blob-${i}`}
                initial={{ opacity: 0 }}
                animate={
                  reduce
                    ? { opacity: 0.2 }
                    : introPhase >= 2
                      ? { opacity: [0, 0.24, 0.2], y: [0, -12, 0] }
                      : { opacity: 0 }
                }
                transition={{
                  opacity: { duration: 1.3, delay: 0.5 + i * 0.07 },
                  y: { duration: 9 + i, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
                }}
                className="absolute rounded-[40%] blur-3xl bg-[#b7ada2]"
                style={{
                  left: b.left,
                  top: b.top,
                  width: b.size,
                  height: b.size * 1.3,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>

          {/* Ambient dusty-glass blur behind each card - soft, low-contrast, neutral
              taupe smudges (not a color glow) so it reads like frosted glass. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
            {SHOWCASE_CARDS.map((c, i) => (
              <motion.div
                key={`blob-${c.src}`}
                initial={{ opacity: 0 }}
                animate={
                  reduce
                    ? { opacity: 0.18 }
                    : introPhase >= 2
                      ? { opacity: [0, 0.22, 0.18], y: [0, -8, 0] }
                      : { opacity: 0 }
                }
                transition={{
                  opacity: { duration: 1.2, delay: 0.5 + i * 0.08 },
                  y: { duration: 8 + i, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
                }}
                className="absolute rounded-[38%] blur-3xl bg-[#b7ada2]"
                style={{
                  left: c.left,
                  top: c.top,
                  width: c.width * 1.4,
                  height: c.width * 1.4 * (16 / 9),
                  transform: 'translate(-14%, -10%)',
                }}
              />
            ))}
          </div>

          {/* Showcase cards - pop in clustered/overlapping at center like a dealt
              deck, then fan outward into their final scattered spots. */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {SHOWCASE_CARDS.map((c, i) => {
              const start = CLUSTER_START[i];
              const revealed = introPhase >= 2 || reduce;
              return (
                <motion.div
                  key={c.src}
                  initial={
                    reduce
                      ? undefined
                      : { opacity: 0, scale: 1.15, left: start.left, top: start.top, rotate: start.rotate }
                  }
                  animate={
                    revealed
                      ? { opacity: 1, scale: 1, left: c.left, top: c.top, rotate: 0 }
                      : { opacity: 0, scale: 1.15, left: start.left, top: start.top, rotate: start.rotate }
                  }
                  transition={{
                    opacity: { duration: 0.15, delay: i * 0.03 },
                    default: { duration: 0.85, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="absolute rounded-2xl overflow-hidden shadow-[0_18px_40px_rgba(15,23,42,0.18)] ring-1 ring-black/5 bg-neutral-200"
                  style={{ width: c.width }}
                >
                  <div className="relative w-full aspect-[9/16]">
                    <video
                      src={c.src}
                      poster={c.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      disablePictureInPicture
                      disableRemotePlayback
                      preload="metadata"
                      onLoadedData={(e) => primeIOSVideo(e.currentTarget)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                      <p className="text-white text-[11px] font-medium leading-snug text-center drop-shadow">
                        {c.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center copy */}
          <div className="relative z-20 flex items-center justify-center min-h-[420px] lg:min-h-[900px] px-3">
            <motion.div
              className="max-w-2xl mx-auto text-center w-full flex flex-col items-center px-2"
              variants={reduce ? undefined : heroParentVariants}
              initial={reduce ? false : 'hidden'}
              animate={reduce || introPhase >= 2 ? 'show' : 'hidden'}
            >
              {/* Badge */}
              <motion.div
                variants={reduce ? undefined : heroChildVariants}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 mb-6 sm:mb-8 text-[13px] sm:text-sm text-slate-600"
              >
                <span className="italic font-serif text-slate-900">HypeOn</span>
                <span>is live</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={reduce ? undefined : heroChildVariants}
                className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] text-neutral-900"
              >
                Find &amp; create winning ads{' '}
                <span className=" font-serif font-normal">with AI</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={reduce ? undefined : heroChildVariants}
                className="max-w-[560px] mx-auto mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed"
              >
                Spy on any brand's ads, find what's working, and create your own
                launch-ready static, video & UGC ads - all in one place.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={reduce ? undefined : heroChildVariants}
                className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3"
              >
                <a
                  href="https://calendly.com/yash-hypeon/30min"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)] sm:text-base"
                >
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
                  <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Create Your AI Ad</span>
                    <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Create Your AI Ad</span>
                  </span>
                  <Zap className="relative w-4 h-4" />
                </a>
                <a
                  href="/studio"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 px-6 py-3.5 text-sm sm:text-base font-semibold transition-colors"
                >
                  <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">See it in action</span>
                    <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">See it in action</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Intro sequence - a single card flickers through the library, then
              fades out the instant the cluster pops in behind it. (The black
              curtain → logo beat now plays once, site-wide, before this.) */}
          <AnimatePresence>
            {introPhase < 2 && !reduce && (
              <motion.div
                key="hero-intro-overlay"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                className="absolute inset-0 z-30 flex items-center justify-center bg-white"
              >
                <motion.div
                  key="intro-shuffle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-[220px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200"
                >
                  {/* Hard-cut key swap (no crossfade) - matches the fast slot-machine flicker */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={shuffleIndex}
                    src={SHOWCASE_CARDS[shuffleIndex].poster}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </section>
  );
}
