'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import type { IconType } from 'react-icons';
import { SiAmazon, SiAmul, SiHp, SiTata, SiUdemy, SiUnacademy } from 'react-icons/si';

/*
 * "Our partners" strip under the hero: two rows of partner chips that drift in
 * opposite directions as the page scrolls (scroll-linked, not time-based).
 *
 * Logos: brands with an official mark in react-icons use it. For the rest, drop
 * a logo file at /public/logos/partners/<slug>.png (or .svg, set `file`) and it
 * shows automatically; until then the chip shows a lettered badge.
 */

type Partner = { name: string; slug: string; Icon?: IconType; color?: string; file?: string };

/** Google's four-colour "G". */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

const PARTNERS: Partner[] = [
  { name: 'Amazon', slug: 'amazon', Icon: SiAmazon, color: '#FF9900' },
  { name: 'Google', slug: 'google' }, // drawn by GoogleG
  { name: 'HP', slug: 'hp', Icon: SiHp, color: '#0096D6' },
  { name: 'WPP', slug: 'wpp' },
  { name: 'Tata', slug: 'tata', Icon: SiTata, color: '#486AAE' },
  { name: 'Sejuna', slug: 'sejuna' },
  { name: 'Trustbadgely', slug: 'trustbadgely', file: '/logos/partners/trustbadgely.svg' },
  { name: 'Wallpassion', slug: 'wallpassion' },
  { name: 'Familjetapeter', slug: 'familjetapeter', file: '/logos/partners/familjetapeter.svg' },
  { name: 'Adroot', slug: 'adroot' },
  { name: 'Bl1xt', slug: 'bl1xt' },
  { name: '11Sight', slug: '11sight' },
  { name: 'PureMarketing', slug: 'puremarketing' },
  { name: 'Altered', slug: 'altered', file: '/logos/partners/altered.ico' },
  { name: 'Amul', slug: 'amul', Icon: SiAmul, color: '#ED1D24' },
  { name: 'Unacademy', slug: 'unacademy', Icon: SiUnacademy, color: '#08BD80' },
  { name: 'Udemy', slug: 'udemy', Icon: SiUdemy, color: '#A435F0' },
];

const ROW_A = PARTNERS.slice(0, 9);
const ROW_B = PARTNERS.slice(9);

function Logo({ p }: { p: Partner }) {
  // a missing logo file falls back to the lettered badge
  const [failed, setFailed] = useState(false);
  if (p.slug === 'google') return <GoogleG className="h-[18px] w-[18px]" />;
  if (p.Icon) return <p.Icon className="h-[18px] w-[18px]" style={{ color: p.color }} aria-hidden />;
  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={p.file ?? `/logos/partners/${p.slug}.png`}
        alt=""
        className="h-5 w-5 rounded-[5px] object-contain"
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
