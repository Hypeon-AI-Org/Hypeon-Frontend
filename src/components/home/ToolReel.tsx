'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import {
  BarChart3, Bell, Brain, Clapperboard, FileSearch, Flame, Gauge, Image as ImageIcon, KeyRound,
  Layers, LineChart, Megaphone, MessageSquare, Package, Rocket, ScanSearch, ShoppingBag, Sparkles,
  Tag, Target, TrendingUp, Users, Video, Wand2,
} from 'lucide-react';

type Tool = { label: string; icon: typeof Sparkles };

const ROW_A: Tool[] = [
  { label: 'Competitor ad search', icon: ScanSearch },
  { label: 'Hype Score', icon: Flame },
  { label: 'Static ads', icon: ImageIcon },
  { label: 'Video ads', icon: Video },
  { label: 'UGC videos', icon: Clapperboard },
  { label: 'Brand setup', icon: Layers },
  { label: 'Deep-dive reports', icon: FileSearch },
  { label: 'Trend spotter', icon: TrendingUp },
  { label: 'Ad Copilot', icon: MessageSquare },
  { label: 'Auto-launch', icon: Rocket },
  { label: 'Winning hooks', icon: Megaphone },
  { label: 'Product research', icon: Package },
];

const ROW_B: Tool[] = [
  { label: 'True ROAS', icon: LineChart },
  { label: 'Budget optimizer', icon: Gauge },
  { label: 'Keyword research', icon: KeyRound },
  { label: 'Pricing intelligence', icon: Tag },
  { label: 'Audience insights', icon: Users },
  { label: 'Spend tracking', icon: BarChart3 },
  { label: 'Shopify sync', icon: ShoppingBag },
  { label: 'Creative briefs', icon: Wand2 },
  { label: 'Targeting & themes', icon: Target },
  { label: 'Market share', icon: Brain },
  { label: 'Slack alerts', icon: Bell },
  { label: 'Ad library', icon: Sparkles },
];

function Chip({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <span className="inline-flex h-[50px] shrink-0 items-center gap-1 rounded-lg border border-[#c9c9c9] px-4 text-[14px] font-medium leading-none text-black">
      <Icon className="h-4 w-4" strokeWidth={1.75} />
      {tool.label}
    </span>
  );
}

function Row({ tools, x }: { tools: Tool[]; x: MotionValue<string> }) {
  // Three copies so the row never runs out of chips at either end of the drift.
  const items = [...tools, ...tools, ...tools];
  return (
    <motion.div style={{ x }} className="flex w-max gap-2 py-1 will-change-transform">
      {items.map((t, i) => (
        <Chip key={`${t.label}-${i}`} tool={t} />
      ))}
    </motion.div>
  );
}

/**
 * Two rows of feature chips that drift in opposite directions as the page
 * scrolls (scroll-linked, not time-based), the strip right under the hero.
 */
export default function ToolReel() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Percent of the (triple-length) row; a spring smooths the scroll-linked drift.
  const rawA = useTransform(scrollYProgress, [0, 1], reduce ? [-20, -20] : [-14, -26]);
  const rawB = useTransform(scrollYProgress, [0, 1], reduce ? [-40, -40] : [-46, -34]);
  const springA = useSpring(rawA, { stiffness: 120, damping: 30, mass: 0.4 });
  const springB = useSpring(rawB, { stiffness: 120, damping: 30, mass: 0.4 });
  const xA = useTransform(springA, (v) => `${v}%`);
  const xB = useTransform(springB, (v) => `${v}%`);

  // Phones get five rows (two extra pairs reuse the same lists, shifted).
  const ROW_C = [...ROW_A.slice(6), ...ROW_A.slice(0, 6)];
  const ROW_D = [...ROW_B.slice(6), ...ROW_B.slice(0, 6)];
  const ROW_E = [...ROW_A.slice(3), ...ROW_A.slice(0, 3)];

  return (
    <section
      ref={ref}
      aria-label="Everything HypeOn does"
      className="relative overflow-hidden bg-[#ededed] py-8 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
    >
      <div className="flex flex-col gap-2">
        <Row tools={ROW_A} x={xA} />
        <Row tools={ROW_B} x={xB} />
        <div className="flex flex-col gap-2 md:hidden">
          <Row tools={ROW_C} x={xA} />
          <Row tools={ROW_D} x={xB} />
          <Row tools={ROW_E} x={xA} />
        </div>
      </div>
    </section>
  );
}
