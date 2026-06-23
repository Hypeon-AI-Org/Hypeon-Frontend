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
import { motion, AnimatePresence, useReducedMotion, useInView, useMotionValue, useTransform, animate, type MotionValue } from "framer-motion";
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

// One creative card in the fanned arc — travels continuously ALONG the arc
// (driven by a shared `flow` value, so positions update off the React render).
function ArcCard({
  item,
  i,
  n,
  reduce,
  flow,
  active,
  isMobile,
}: {
  item: { src: string; poster?: string; video?: boolean };
  i: number;
  n: number;
  reduce: boolean | null;
  flow: MotionValue<number>;
  active: boolean;
  isMobile: boolean;
}) {
  const f0 = i / n;                                  // this card's base slot on the loop
  const frac = (v: number) => (((f0 + v) % 1) + 1) % 1; // wrapped position 0..1
  const u = (v: number) => (frac(v) - 0.5) * 2;          // -1 (left) … 1 (right)

  // Shallow, wide parabolic "smile" bowl matching the Spyglass reference:
  //  • flat upright base across the centre (cards barely tilt in the middle),
  //  • tilt + lift grow toward the ends, which curl up to ~A° with tops pointing outward,
  //  • horizontal spread fills the full width, denser toward the curling ends.
  // Mobile uses a flatter, wider, gentler fan (fewer + less-tilted cards) so the
  // narrow screen reads as a clean deck instead of a cramped overlapping V.
  const A = isMobile ? 38 : 68;                      // max tilt at the arc ends (deg)
  const SPREAD = isMobile ? 44 : 49;                 // horizontal half-width of the fan (%)
  const LIFT = isMobile ? 34 : 52;                   // how high the ends sweep up (%)
  const BASE = isMobile ? 8 : 4;                     // resting top offset at the centre (%)
  const SCALE_DROP = isMobile ? 0.03 : 0.06;         // how much the ends shrink

  const left = useTransform(flow, (v) => `${50 + u(v) * SPREAD}%`);
  // deep, wide parabola: lowest (largest top%) at centre, sweeping high up at the ends
  const top = useTransform(flow, (v) => `${BASE + (1 - u(v) * u(v)) * LIFT}%`);
  // tilt grows evenly across the arc (linear) so neighbours never open wedge gaps
  const rotate = useTransform(flow, (v) => `${u(v) * A}deg`);
  const edge = 0.045;                                // only the extreme ends fade; gradient masks hide the seam
  // how far INTO the arc a card is: 0 right at the seam, 1 once fully settled
  const settle = (v: number) => Math.max(0, Math.min(1, Math.min(frac(v), 1 - frac(v)) / edge));
  // ends sit a touch smaller; no big pop — they just fade in/out at the same size
  const scale = useTransform(flow, (v) => 1 - Math.abs(u(v)) * SCALE_DROP);
  const zIndex = useTransform(flow, (v) => Math.round(40 - Math.abs(u(v)) * 30));
  const opacity = useTransform(flow, (v) => {
    if (reduce) return 1;
    return settle(v);                                // soft fade in/out at the entry & exit edges
  });

  // Perf: every card paints a lightweight static poster instantly. Only the few
  // cards in a NARROW central band ever mount + decode an actual <video>; the rest
  // stay as plain images. So the browser decodes ~5-6 clips at once instead of all
  // N → no freeze on load / navigation and a smooth, jank-free scroll.
  const [decode, setDecode] = useState(false);
  useEffect(() => {
    if (!item.video) return;
    const PLAY_BAND = 0.13;                           // |u| < 0.13 → only the centre ~5-6 cards decode
    const apply = (vf: number) => {
      const should = active && Math.abs(u(vf)) < PLAY_BAND && settle(vf) > 0.05;
      // guarded setState: React bails when the value is unchanged, so this only
      // fires twice per card per loop (entering / leaving the band) — no render storm.
      setDecode((prev) => (prev === should ? prev : should));
    };
    apply(flow.get());
    const unsub = flow.on('change', apply);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow, item.video, active]);

  return (
    <motion.div
      className="absolute w-[14%] sm:w-[6.8%] lg:w-[5.2%] rounded-md sm:rounded-lg overflow-hidden shadow-[0_8px_22px_rgba(15,23,42,0.14)] will-change-transform"
      style={{
        left,
        top,
        rotate,
        scale,
        zIndex,
        opacity,
        x: '-50%',
        transformOrigin: 'bottom center',
      }}
    >
      {/* Base layer — static poster, always painted, zero decode cost */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.poster ?? item.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="block w-full aspect-[9/16] rounded-[6px] object-cover"
      />
      {/* Video overlay — mounted only while this card sits in the central band */}
      {item.video && decode && (
        <video
          src={item.src}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback noplaybackrate"
          preload="auto"
          className="absolute inset-0 w-full h-full rounded-[6px] object-cover pointer-events-none"
        />
      )}
    </motion.div>
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<ArtifactTab>('topAds');
  const [chatCycle, setChatCycle] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLgUp(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(mq.matches);
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

  // Auto-typing example queries in the search bar (Spyglass-style)
  const queries = [
    "Give me the top-performing ads of Nike in Sweden",
    "Generate 3 video ads from Nike's winning angle",
    "How much is Nike spending on Meta right now?",
    "What hooks is Nike using in its scaling ads?",
    "Which Nike creatives have run the longest?",
    "Create a static ads for Nike's Jordan",
  ];
  const [typed, setTyped] = useState('');
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (reduce) { setTyped(queries[0]); return; }
    let qi = 0, ci = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const q = queries[qi];
      if (!deleting) {
        ci++;
        setTyped(q.slice(0, ci));
        if (ci >= q.length) { deleting = true; timer = setTimeout(tick, 1900); return; }
        timer = setTimeout(tick, 45);
      } else {
        ci--;
        setTyped(q.slice(0, ci));
        if (ci <= 0) { deleting = false; qi = (qi + 1) % queries.length; timer = setTimeout(tick, 350); return; }
        timer = setTimeout(tick, 22);
      }
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  // Fanned arc of real ad creatives — fewer clips keeps decode + compositing light.
  // Each card carries a poster (static first frame) so it paints instantly with no
  // decode-on-load, and only the central cards ever play the actual video.
  const posterFor = (src: string) => {
    if (src.startsWith('/carousel/')) return src.replace('/carousel/', '/carousel/posters/').replace('.mp4', '.jpg');
    if (src.includes('/ind-vid/')) {
      const name = src.split('/').pop()!.replace('.mp4', '');
      return `/hero/ind/${name}-1.webp`;
    }
    return undefined;
  };
  const arcCards: { src: string; poster?: string; video?: boolean }[] = [
    '/hero/ind-vid/beauty.mp4',
    '/carousel/045e53458f4485d2.mp4',
    '/carousel/23f0d4105b094537.mp4',
    '/hero/ind-vid/fashion.mp4',
    '/carousel/261138129033eb1f.mp4',
    '/carousel/3b8e3a66515db4d9.mp4',
    '/hero/ind-vid/food.mp4',
    '/carousel/452d34244c08eaee.mp4',
    '/carousel/4eea476d13528502.mp4',
    '/hero/ind-vid/home.mp4',
    '/carousel/50b18d1681e20f36.mp4',
    '/carousel/51d8e138f293c225.mp4',
    '/hero/ind-vid/wellness.mp4',
    '/carousel/51ebaa4623434df4.mp4',
    '/carousel/5f272eed280c0c30.mp4',
    '/carousel/750b44dd8efb32ae.mp4',
    '/carousel/763d35e0dc0bfaa4.mp4',
    '/carousel/832a4ff8861195cd.mp4',
    '/carousel/8933fd906cc15adb.mp4',
    '/carousel/8fb3c5a47348d3aa.mp4',
    '/carousel/a3b3be8e2817097f.mp4',
    '/carousel/b22cdc25095d2d23.mp4',
    // Arc renders static poster frames only — these tiny, constantly-moving cards
    // gain nothing from live video, but decoding ~20 MP4s froze load + scroll.
  ].map((src) => ({ src, poster: posterFor(src), video: false }));

  // Continuous flow that carries the cards along the arc — only runs while the hero
  // is actually on-screen, so scrolling past costs nothing (no per-frame work).
  const flow = useMotionValue(0);
  const arcWrapRef = useRef<HTMLDivElement>(null);
  const [arcActive, setArcActive] = useState(false);
  useEffect(() => {
    const el = arcWrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setArcActive(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduce || !arcActive) return;
    const controls = animate(flow, 1, { duration: 22, ease: 'linear', repeat: Infinity });
    return () => controls.stop();
  }, [reduce, flow, arcActive]);
  return (
    <Section sectionRef={heroSectionRef} dots={false} gridClassName="!border-transparent">
      <Cell bleed className="relative !border-transparent pt-20 sm:pt-24 pb-2 sm:pb-2 lg:pt-16 lg:pb-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ── TOP: TEXT CONTENT (isolation + z-20 so CTA is always on top and clickable) ── */}
        <div className="relative z-20 isolation-isolate overflow-hidden">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-0">

            <motion.div
              className="max-w-3xl mx-auto text-center w-full flex flex-col items-center"
              variants={reduce ? undefined : heroParentVariants}
              initial={reduce ? false : 'hidden'}
              animate={reduce ? undefined : 'show'}
            >

              {/* Eyebrow — real, verifiable metric (not a fake "trusted by") */}
              <motion.div variants={reduce ? undefined : heroChildVariants} className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-black text-white flex-shrink-0">
                  <Activity className="w-3 h-3" />
                </span>
                <span className="text-slate-600 font-medium text-xs sm:text-sm tracking-tight">
                  Trained on 200M+ ads · 47M+ competitor ads analyzed
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={reduce ? undefined : heroChildVariants}
                className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tighter leading-[1.12] text-neutral-900"
              >
                Find &amp; create <br className="sm:hidden" /> the winning ads
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={reduce ? undefined : heroChildVariants}
                className="max-w-[620px] mx-auto mt-6 text-base sm:text-lg text-slate-600 leading-relaxed"
              >
                Spy on any brand&apos;s ads, find what&apos;s working, and create your own
                launch-ready static, video &amp; UGC ads — all in one place.
              </motion.p>

              {/* Search bar — auto-types example queries; the arrow is the CTA into the app */}
              <motion.div variants={reduce ? undefined : heroChildVariants} className="w-full max-w-2xl mx-auto mt-8 sm:mt-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = 'https://app.hypeon.ai/login';
                  }}
                  className="group flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 backdrop-blur px-5 py-3.5 sm:px-6 sm:py-4 shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md"
                >
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={typed || "Ask anything about any brand's ads…"}
                    aria-label="Search any brand's ads"
                    className="flex-1 min-w-0 bg-transparent text-left text-sm sm:text-base text-slate-700 placeholder:text-slate-500 outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>

              {/* Caption under the search bar */}
              <motion.p
                variants={reduce ? undefined : heroChildVariants}
                className="mt-4 text-[11px] sm:text-xs font-medium tracking-wide text-slate-400"
              >
                Join hundreds of founders + brands scaling with HypeOn
              </motion.p>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Creative arc — fanned wall of real ad creatives flowing along the curve.
          Pulled OUT of the max-w-7xl wrapper so it spans the full Cell width with no
          left/right gap. Cards are sized in % of the container, so spacing and card
          size scale together → the arc never breaks apart on zoom / resize. */}
      <div ref={arcWrapRef} className="pointer-events-none relative z-30 mt-4 sm:-mt-16 lg:-mt-24 left-1/2 -translate-x-1/2 w-[1750px] max-w-[100vw] overflow-x-clip">
        <div className="relative mx-auto w-full h-[300px] sm:h-[370px] lg:h-[420px]">
          {(() => {
            // Mobile shows ~half the cards (evenly sampled) so the narrow fan stays
            // spaced and clean; desktop renders the full arc unchanged.
            const cards = isMobile ? arcCards.filter((_, idx) => idx % 2 === 0) : arcCards;
            return cards.map((item, i) => (
              <ArcCard key={i} item={item} i={i} n={cards.length} reduce={reduce} flow={flow} active={arcActive} isMobile={isMobile} />
            ));
          })()}
          {/* Edge fades — soft gradient masks so cards melt into the background at the left/right edges instead of cutting off hard */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-40 w-24 sm:w-40 lg:w-56 bg-gradient-to-r from-[var(--grid-bg)] to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-40 w-24 sm:w-40 lg:w-56 bg-gradient-to-l from-[var(--grid-bg)] to-transparent" />
        </div>
      </div>

      </Cell>

      {/* Trusted-by strip — grid-free, clean band under the hero */}
      <Cell className="reveal !border-transparent pt-10 pb-7 sm:pt-14 sm:pb-9 sm:mt-2 lg:mt-4">
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
