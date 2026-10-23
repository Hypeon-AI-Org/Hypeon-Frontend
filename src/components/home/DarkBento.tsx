'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { SiGoogle, SiMeta, SiShopify, SiTiktok } from 'react-icons/si';
import logo from '../../../assets/HypeOn_Logo.png';
import { Accent, Container, DarkButton, DarkCard } from './ui';

const ugcPoster = (f: string) => encodeURI(`/ugc video/posters/${f}.jpg`);

const UGC = [
  ugcPoster('1_Product_in_hand'),
  ugcPoster('2_Product_showcase'),
  ugcPoster('3_Podcast'),
  ugcPoster('4_Unboxing'),
  ugcPoster('5_Before_and_after'),
  ugcPoster('6_How-to'),
];

/** Steps 0..n-1 on a timer while the element is visible. */
function useCycle(n: number, ms: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(id);
  }, [inView, reduce, n, ms]);
  return { ref, i };
}

/** Wide card: copy on the left, an isometric visual on the right. */
function WideCard({
  title,
  accent,
  body,
  visual,
  tall = false,
}: {
  title: string;
  accent: string;
  body: string;
  visual: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <DarkCard
      className={`grid items-center gap-6 px-6 pb-0 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:px-[61px] md:py-0 ${
        tall ? 'md:h-[542px]' : 'md:h-[470px]'
      }`}
    >
      <div className="relative z-10">
        <h3 className="text-[24px] font-normal leading-[32px] text-white md:text-[32px] md:leading-[38.4px]">
          {title}
          <br />
          <Accent>{accent}</Accent>
        </h3>
        <p className="mt-3 max-w-[423px] text-[16px] leading-6 md:text-[20px] md:leading-[30px] text-white/50">{body}</p>
        <DarkButton className="mt-8" />
      </div>
      <div className="relative h-[340px] md:h-full">{visual}</div>
    </DarkCard>
  );
}

/* Isometric stack of UGC template tiles (the "AI Actors" visual). */
function IsoTemplates() {
  return (
    <div className="absolute inset-0 [perspective:1400px]">
      {/* centring and the isometric tilt live on separate elements: both set `transform` */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
      <div className="grid w-[440px] grid-cols-3 gap-3 [transform:rotateX(52deg)_rotateZ(-38deg)] [transform-style:preserve-3d]">
        {UGC.map((src, i) => (
          <motion.div
            key={src}
            animate={{ z: [0, 14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_40px_rgba(0,0,0,0.6)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
}

/* Four thick 3D slabs in a 2x2 with a gap in the middle, and a raised frosted
   glass HypeOn slab floating over that gap (the "AI Agent" visual). Static,
   like the reference. */
const SLAB = 150;
const GAP = 50;
const GRID = SLAB * 2 + GAP; // 350
const SLABS = [
  { Icon: SiShopify, alt: 'Shopify', x: 0, y: 0 },
  { Icon: SiMeta, alt: 'Meta', x: SLAB + GAP, y: 0 },
  { Icon: SiTiktok, alt: 'TikTok', x: 0, y: SLAB + GAP },
  { Icon: SiGoogle, alt: 'Google', x: SLAB + GAP, y: SLAB + GAP },
];
const DEPTH = 22; // slab thickness, px

function Slab({
  x,
  y,
  z = 0,
  glass = false,
  lit = false,
  float = false,
  children,
}: {
  x: number;
  y: number;
  z?: number;
  glass?: boolean;
  lit?: boolean;
  float?: boolean;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  // The sides are many 1px slices with no borders, so they read as one smooth
  // edge (bordered slices showed up as stripes).
  const slices = Array.from({ length: DEPTH }, (_, k) => k);
  return (
    <motion.div
      className="absolute [transform-style:preserve-3d]"
      style={{ left: x, top: y, width: SLAB, height: SLAB }}
      initial={{ z }}
      animate={
        reduce
          ? { z }
          : float
            ? { z: [z, z + 8, z] } // the glass bobs slowly
            : { z: lit ? z + 8 : z } // a tile lifts while it is lit
      }
      transition={float ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {slices.map((d) => (
        <div
          key={d}
          className={`absolute inset-0 rounded-[34px] ${glass ? 'bg-[rgba(185,220,255,0.035)]' : 'bg-[#0b0b0b]'}`}
          style={{ transform: `translateZ(${d}px)` }}
        />
      ))}
      {/* top face */}
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-[34px] ${
          glass
            ? 'border border-white/70 bg-[linear-gradient(150deg,rgba(255,255,255,0.32),rgba(195,228,255,0.12)_45%,rgba(150,200,255,0.08))] shadow-[0_0_30px_rgba(120,200,255,0.35),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_0_16px_rgba(200,230,255,0.3)] backdrop-blur-[4px]'
            : `border bg-[linear-gradient(160deg,#2c2c2c,#121212_60%,#0a0a0a)] transition-[border-color,box-shadow] duration-500 ${
                lit ? 'border-white/45 shadow-[0_0_26px_rgba(140,200,255,0.25)]' : 'border-white/[0.14]'
              }`
        }`}
        style={{ transform: `translateZ(${DEPTH}px)` }}
      >
        {glass && !reduce && (
          // slow breathing glow under the glass
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-[34px] shadow-[0_0_46px_rgba(120,200,255,0.55)]"
            animate={{ opacity: [0.25, 0.9, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        {children}
      </div>
    </motion.div>
  );
}

function IsoStack() {
  const { ref, i } = useCycle(SLABS.length, 1100);
  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center [perspective:1200px]">
      {/* scale and tilt on separate elements: both set `transform` */}
      <div className="scale-[0.8] [transform-style:preserve-3d] md:scale-[1.02]">
        <div
          className="relative [transform-style:preserve-3d] [transform:rotateX(54deg)_rotateZ(-6deg)]"
          style={{ width: GRID, height: GRID }}
        >
          {/* drop shadow on the "floor" */}
          <div className="absolute inset-[-20px] rounded-[48px] bg-black/60 blur-2xl" />
          {SLABS.map(({ Icon, alt, x, y }, k) => (
            <Slab key={alt} x={x} y={y} lit={k === i}>
              <Icon
                aria-label={alt}
                className={`h-12 w-12 transition-[color,filter] duration-500 ${
                  k === i ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]' : 'text-white/75'
                }`}
              />
            </Slab>
          ))}
          {/* glass floats over the centre gap; nudged down so the lift keeps it off the top logos */}
          <Slab x={(GRID - SLAB) / 2} y={(GRID - SLAB) / 2 + 72} z={60} glass float>
            <span className="flex items-center gap-2 text-[26px] font-semibold tracking-tight text-white drop-shadow">
              <Image src={logo} alt="" className="h-8 w-8 object-contain" />
              HypeOn
            </span>
          </Slab>
        </div>
      </div>
    </div>
  );
}

/* ── 2x2 feature cards ── */

function SmallCard({ title, accent, body, children }: { title: string; accent: string; body: string; children: React.ReactNode }) {
  return (
    <DarkCard className="flex flex-col pb-6 md:h-[625px] md:pb-[45px]">
      <div className="relative mx-6 mt-6 h-[300px] flex-none md:mx-[45px] md:mt-[45px] md:h-auto md:flex-1">{children}</div>
      <div className="px-6 pt-6 md:px-[45px] md:pt-8">
        <h3 className="text-[24px] font-normal leading-[33.6px] text-white">
          {title} <Accent>{accent}</Accent>
        </h3>
        <p className="mt-1 text-[16px] leading-6 md:text-[20px] md:leading-[30px] text-white/50 md:mt-0.5">{body}</p>
      </div>
    </DarkCard>
  );
}

function FormatsCarousel() {
  const labels = ['Product in hand', 'Product showcase', 'Podcast', 'Unboxing', 'Before & after', 'How-to'];
  const { ref, i } = useCycle(UGC.length, 2200);
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-end">
      <div className="relative flex h-[200px] w-full items-center justify-center sm:h-[220px]">
        {[-1, 0, 1].map((off) => {
          const idx = (i + off + UGC.length) % UGC.length;
          return (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: off === 0 ? 1 : 0.5, x: off * 92, scale: off === 0 ? 1 : 0.86, zIndex: off === 0 ? 2 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute h-full w-[120px] overflow-hidden rounded-xl border border-white/10 sm:w-[132px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={UGC[idx]} alt="" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
          );
        })}
      </div>
      <p className="mt-3 text-xs font-medium text-white/80">{labels[i]}</p>
      <div className="mt-2 flex gap-1">
        {UGC.map((_, d) => (
          <span key={d} className={`h-1 w-1 rounded-full ${d === i ? 'bg-white' : 'bg-white/25'}`} />
        ))}
      </div>
    </div>
  );
}

function DeepDiveMock() {
  const rows = [
    { label: 'Active ads', a: 72, b: 48 },
    { label: 'Est. spend', a: 64, b: 81 },
    { label: 'New creatives / wk', a: 88, b: 39 },
    { label: 'Avg. ad lifespan', a: 51, b: 67 },
  ];
  const { ref, i } = useCycle(2, 2600);
  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white p-4 text-black shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 md:text-[10px]">Competitor deep-dive</p>
        <p className="mt-1 text-sm font-semibold">Your brand vs. top competitor</p>
        <div className="mt-3 space-y-2.5">
          {rows.map((r, k) => (
            <div key={r.label}>
              <p className="text-[11px] text-neutral-500">{r.label}</p>
              <div className="mt-1 space-y-1">
                <motion.span
                  className="block h-1.5 rounded-full bg-black"
                  animate={{ width: `${i ? r.a : r.a * 0.4}%` }}
                  transition={{ duration: 0.8, delay: k * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="block h-1.5 rounded-full bg-neutral-300"
                  animate={{ width: `${i ? r.b : r.b * 0.4}%` }}
                  transition={{ duration: 0.8, delay: k * 0.06 + 0.05, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticGrid() {
  const imgs = ['/carousel/eb2fa64fe309fd83.png', '/carousel/2861c283c6fe149b.png', '/carousel/9bb51c2e32b350f8.png', '/carousel/2cc5a6cac5e10415.jpeg'];
  const { ref, i } = useCycle(imgs.length, 1600);
  return (
    <div ref={ref} className="absolute inset-0 grid grid-cols-2 gap-2.5 px-2">
      {imgs.map((src, k) => (
        <motion.div
          key={src}
          animate={{ scale: k === i ? 1.03 : 1, opacity: k === i ? 1 : 0.65 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl border border-white/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          {k === i && (
            <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-0.5 rounded-full bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-white md:text-[10px]">
              <Flame className="h-2.5 w-2.5 text-orange-400" />
              Ready
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

const CHANNELS = [
  { src: '/logos/meta.webp', name: 'Meta' },
  { src: '/logos/tiktok.webp', name: 'TikTok' },
  { src: '/logos/google.webp', name: 'Google' },
  { src: '/logos/pinterest.webp', name: 'Pinterest' },
  { src: '/logos/snapchat.jpg', name: 'Snapchat' },
];

function ChannelsMock() {
  const { ref, i } = useCycle(CHANNELS.length, 1500);
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-end">
      <div className="relative h-[170px] w-[120px] overflow-hidden rounded-xl border border-white/10 sm:h-[190px] sm:w-[132px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ugcPoster('4_Unboxing')} alt="" loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute inset-x-2 bottom-2 rounded-md bg-white/90 py-1 text-center text-[11px] font-semibold text-black">
          Live on {CHANNELS[i].name}
        </span>
      </div>
      <p className="mt-3 text-xs font-medium text-white/80">{CHANNELS[i].name}</p>
      <div className="mt-2 flex gap-2">
        {CHANNELS.map((c, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={c.name}
            src={c.src}
            alt={c.name}
            className={`h-5 w-5 rounded object-contain transition-opacity duration-300 ${k === i ? 'opacity-100' : 'opacity-35'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function DarkBento() {
  return (
    <section className="bg-[#121212] py-16 md:py-[120px]">
      <Container className="space-y-6">
        <WideCard
          title="The most complete"
          accent="UGC template library"
          body="Product in hand, unboxing, podcast, before & after - proven formats, ready for your product."
          visual={<IsoTemplates />}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <SmallCard title="Your product," accent="in every format" body="Pick a format and HypeOn builds the video around your product, script included.">
            <FormatsCarousel />
          </SmallCard>
          <SmallCard title="Competitor" accent="deep-dives" body="Spend, reach, creative velocity and winning angles for any brand, side by side with yours.">
            <DeepDiveMock />
          </SmallCard>
          <SmallCard title="Static ads" accent="in seconds" body="Drop a product link and get scroll-stopping statics built from the angles already winning in your category.">
            <StaticGrid />
          </SmallCard>
          <SmallCard title="Launch on" accent="every channel" body="Push finished ads to Meta, TikTok, Google, Pinterest and Snapchat without leaving HypeOn.">
            <ChannelsMock />
          </SmallCard>
        </div>
        <WideCard
          title="Plug HypeOn into"
          accent="your stack"
          body="Shopify, Meta, Google &amp; TikTok, connected"
          visual={<IsoStack />}
          tall
        />
      </Container>
    </section>
  );
}
