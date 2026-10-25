'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import type { IconType } from 'react-icons';
import { SiAmazon, SiAmul, SiGoogle, SiHp, SiTata, SiUdemy, SiUnacademy } from 'react-icons/si';

/*
 * "Our partners" strip under the hero: two rows of partner chips that drift in
 * opposite directions as the page scrolls (scroll-linked, not time-based).
 *
 * Logos: brands with an official mark in react-icons use it. For the rest, drop
 * a logo file at /public/logos/partners/<slug>.png (or .svg, set `file`) and it
 * shows automatically; until then the chip shows a lettered badge.
 */

type Partner = { name: string; slug: string; Icon?: IconType; file?: string };

const PARTNERS: Partner[] = [
  { name: 'Amazon', slug: 'amazon', Icon: SiAmazon },
  { name: 'Google', slug: 'google', Icon: SiGoogle },
  { name: 'HP', slug: 'hp', Icon: SiHp },
  { name: 'WPP', slug: 'wpp' },
  { name: 'Tata', slug: 'tata', Icon: SiTata },
  { name: 'Sejuna', slug: 'sejuna' },
  { name: 'Trustbadgely', slug: 'trustbadgely' },
  { name: 'Wallpassion', slug: 'wallpassion' },
  { name: 'Familjetapeter', slug: 'familjetapeter' },
  { name: 'Adroot', slug: 'adroot' },
  { name: 'Bl1xt', slug: 'bl1xt' },
  { name: '11Sight', slug: '11sight' },
  { name: 'PicGuide', slug: 'picguide' },
  { name: 'PureMarketing', slug: 'puremarketing' },
  { name: 'Altered', slug: 'altered' },
  { name: 'Amul', slug: 'amul', Icon: SiAmul },
  { name: 'Unacademy', slug: 'unacademy', Icon: SiUnacademy },
  { name: 'Udemy', slug: 'udemy', Icon: SiUdemy },
];

const ROW_A = PARTNERS.slice(0, 9);
const ROW_B = PARTNERS.slice(9);

function Logo({ p }: { p: Partner }) {
  // a missing logo file falls back to the lettered badge
  const [failed, setFailed] = useState(false);
  if (p.Icon) return <p.Icon className="h-[18px] w-[18px]" aria-hidden />;
  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={p.file ?? `/logos/partners/${p.slug}.png`}
        alt=""
        className="h-[18px] w-auto max-w-[72px] object-contain"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span aria-hidden className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#121212] text-[10px] font-semibold text-white">
      {p.name[0]}
    </span>
  );
}

function Chip({ p }: { p: Partner }) {
  return (
    <span className="inline-flex h-[50px] shrink-0 items-center gap-2 rounded-lg border border-[#c9c9c9] px-4 text-[14px] font-medium leading-none text-black">
      <Logo p={p} />
      {p.name}
    </span>
  );
}

function Row({ partners, x }: { partners: Partner[]; x: MotionValue<string> }) {
  // Three copies so the row never runs out of chips at either end of the drift.
  const items = [...partners, ...partners, ...partners];
  return (
    <motion.div style={{ x }} className="flex w-max gap-2 py-1 will-change-transform">
      {items.map((p, i) => (
        <Chip key={`${p.slug}-${i}`} p={p} />
      ))}
    </motion.div>
  );
}

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

  // Phones get five rows (the extra rows reuse the same partners, shifted).
  const ROW_C = [...PARTNERS.slice(5, 14)];
  const ROW_D = [...PARTNERS.slice(12), ...PARTNERS.slice(0, 3)];
  const ROW_E = [...PARTNERS.slice(3, 12)];

  return (
    <section ref={ref} aria-label="Our partners" className="relative bg-[#ededed] py-8">
      <p className="mb-4 text-center text-[14px] font-medium uppercase tracking-[0.14em] text-[#545454]">
        Our partners
      </p>
      <div className="flex flex-col gap-2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <Row partners={ROW_A} x={xA} />
        <Row partners={ROW_B} x={xB} />
        <div className="flex flex-col gap-2 md:hidden">
          <Row partners={ROW_C} x={xA} />
          <Row partners={ROW_D} x={xB} />
          <Row partners={ROW_E} x={xA} />
        </div>
      </div>
    </section>
  );
}
