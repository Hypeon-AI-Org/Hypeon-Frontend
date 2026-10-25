'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { VolumeX } from 'lucide-react';
import { primeIOSVideo } from '@/lib/videoAutoplay';
import { onIntroDone } from '@/lib/introSignal';
import { DarkButton, LightButton, STUDIO_URL } from '@/components/home/ui';

/*
 * Desktop field, laid out on an 880px-tall stage. `dx` is the card's left edge
 * relative to the horizontal centre; every value is a measured px offset.
 */
type Card = { src: string; poster: string; dx: number; top: number; w: number; h: number; rot: number };

// Every card is 156x277; positions are the untilted box, worked back from each
// card's measured centre (a tilted card's on-screen box is larger than the card).
const CARDS: Card[] = [
  { src: '/hero/ind-vid/wellness.mp4', poster: '/hero/ind-vid/posters/wellness.jpg', dx: -628, top: 66, w: 156, h: 277, rot: -2 },
  { src: '/hero/ind-vid/beauty.mp4', poster: '/hero/ind-vid/posters/beauty.jpg', dx: -98, top: -126, w: 156, h: 277, rot: -1 },
  { src: '/hero/ind-vid/fashion.mp4', poster: '/hero/ind-vid/posters/fashion.jpg', dx: 452, top: 40, w: 156, h: 277, rot: 6 },
  { src: '/hero/ind-vid/food.mp4', poster: '/hero/ind-vid/posters/food.jpg', dx: -514, top: 477, w: 156, h: 277, rot: 2 },
  { src: '/hero/ind-vid/home.mp4', poster: '/hero/ind-vid/posters/home.jpg', dx: -77, top: 574, w: 156, h: 277, rot: 0 },
  { src: '/carousel/045e53458f4485d2.mp4', poster: '/carousel/posters/045e53458f4485d2.jpg', dx: 328, top: 478, w: 156, h: 277, rot: -1 },
];

// Out-of-focus cards behind the field: faint (30-40% opacity), heavily blurred faces.
const BLURRED = [
  { poster: '/carousel/posters/50b18d1681e20f36.jpg', dx: -399, top: -51, w: 128, h: 192, opacity: 0.4, blur: 30 },
  { poster: '/carousel/posters/51ebaa4623434df4.jpg', dx: 285, top: 64, w: 96, h: 143, opacity: 0.3, blur: 30 },
  { poster: '/carousel/posters/23f0d4105b094537.jpg', dx: 205, top: 398, w: 96, h: 143, opacity: 0.3, blur: 20 },
  { poster: '/carousel/posters/b22cdc25095d2d23.jpg', dx: -819, top: 401, w: 160, h: 240, opacity: 0.3, blur: 30 },
];

// Where the stack sits before it bursts: a 156x277 card, centred, 205px down.
const STACK = { w: 156, h: 277, top: 205 };
const EASE = [0.22, 1, 0.36, 1] as const;

// Intro timeline, matched frame by frame to the reference:
//   0     first card fades in alone, centred, at 1.8x
//   0.48  the other cards land on the stack one after another (the image flips)
//   0.9   the stack has shrunk to 1x
//   1.0   cards burst out to their spots (0.9s); headline + copy fade in with it
const T = { firstFade: 0.45, stackIn: 0.48, stackStep: 0.06, shrink: 0.9, burst: 1.0, burstDur: 0.9 };
// The first card is the one that appears alone; the rest stack on top of it in this order.
const STACK_ORDER = [4, 0, 5, 2, 3, 1];

const HEADLINE = 'Find & create winning ads';
const ACCENT = 'with AI';

/** Deterministic 0..1 noise so server and client agree on the letter order. */
const noise = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function SplitLetters({ text, start, play, offset = 0 }: { text: string; start: number; play: boolean; offset?: number }) {
  // Letters are grouped per word so a wrapping line never breaks mid-word.
  let n = offset;
  return (
    <>
      {text.split(' ').map((word, w, words) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split('').map((ch) => {
            const i = n++;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={play ? { opacity: 1 } : { opacity: 0 }}
                // each letter fades on its own, in a scattered (not left-to-right) order
                transition={{ duration: 0.3, delay: start + noise(i) * 0.8, ease: 'easeOut' }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            );
          })}
          {w < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}

function Video({ src, poster }: { src: string; poster: string }) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
      onLoadedData={(e) => primeIOSVideo(e.currentTarget)}
      className="h-full w-full object-cover"
    />
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  // Hold everything until the site-wide black curtain (<SiteIntro/>) lifts.
  const [ready, setReady] = useState(false);
  useEffect(() => onIntroDone(() => setReady(true)), []);
  const play = ready || Boolean(reduce);

  // Only mount the breakpoint's own videos.
  const [isLg, setIsLg] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const textStart = reduce ? 0 : isLg ? T.burst : 0.15;

  const headline = useMemo(
    () => (
      <>
        <SplitLetters text={HEADLINE} start={textStart} play={play} />{' '}
        <span className="font-accent italic tracking-normal">
          <SplitLetters text={ACCENT} start={textStart} play={play} offset={HEADLINE.length + 1} />
        </span>
      </>
    ),
    [play, textStart]
  );

  const blockFade = {
    initial: { opacity: 0 },
    animate: play ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : textStart + 0.05, ease: 'easeInOut' as const },
  };

  return (
    <section className="relative overflow-hidden bg-[#ededed] lg:h-[880px]">
      {/* ── desktop card field ── */}
      {isLg && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* soft white haze at the top centre, behind the top card */}
          <div className="absolute left-[calc(50%-207px)] top-[-201px] h-[404px] w-[414px] rounded-full blur-2xl bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.5)_50%,rgba(255,255,255,0))]" />
          {BLURRED.map((b) => (
            <motion.div
              key={b.poster}
              initial={{ opacity: 0 }}
              animate={play ? { opacity: b.opacity } : { opacity: 0 }}
              transition={{ duration: T.burstDur, delay: reduce ? 0 : T.burst }}
              className="absolute overflow-hidden rounded-2xl"
              style={{ left: `calc(50% + ${b.dx}px)`, top: b.top, width: b.w, height: b.h, filter: `blur(${b.blur}px)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.poster} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}

          {CARDS.map((c, i) => {
            // offset from the card's final spot back to the shared centre stack
            const sx = -STACK.w / 2 - c.dx + (STACK.w - c.w) / 2;
            const sy = STACK.top - c.top + (STACK.h - c.h) / 2;
            // Every card is held at exactly the stack's 156x277 while stacked, so none
            // peeks out from behind another; each grows to its own size only in the burst.
            const fx = STACK.w / c.w;
            const fy = STACK.h / c.h;
            const total = T.burst + T.burstDur;
            const times = [0, T.shrink / total, T.burst / total, 1];
            const sizeEase = [[0.6, 0, 0.4, 0.9], 'linear', EASE] as const;
            const order = STACK_ORDER.indexOf(i);
            const first = order === 0;
            return (
              <motion.div
                key={c.src}
                initial={reduce ? false : { x: sx, y: sy, scaleX: 1.8 * fx, scaleY: 1.8 * fy, rotate: 0, opacity: 0 }}
                animate={
                  play
                    ? {
                        x: 0,
                        y: 0,
                        rotate: c.rot,
                        opacity: 1,
                        // 1.8x stack -> 1x stack (shrink) -> hold -> own size (burst)
                        scaleX: [1.8 * fx, fx, fx, 1],
                        scaleY: [1.8 * fy, fy, fy, 1],
                      }
                    : undefined
                }
                transition={{
                  // first card fades in; the rest hard-cut onto the stack one by one
                  opacity: first
                    ? { duration: T.firstFade, ease: 'linear' }
                    : { duration: 0, delay: T.stackIn + (order - 1) * T.stackStep },
                  scaleX: { duration: total, times, ease: [...sizeEase] },
                  scaleY: { duration: total, times, ease: [...sizeEase] },
                  default: { duration: T.burstDur, delay: T.burst, ease: EASE },
                }}
                className="absolute overflow-hidden rounded-[10px] bg-[#dcdcdc]"
                style={{ left: `calc(50% + ${c.dx}px)`, top: c.top, width: c.w, height: c.h, zIndex: order + 1 }}
              >
                <Video src={c.src} poster={c.poster} />
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── copy ── */}
      <div className="relative z-10 mx-auto flex max-w-[1032px] flex-col items-center px-4 pt-[112px] text-center lg:absolute lg:inset-x-0 lg:top-[262px] lg:pt-0">
        <motion.div
          {...blockFade}
          className="inline-flex h-9 items-center rounded-full bg-[#e2e2e2] px-3 text-[16px] leading-6 text-[#121212]"
        >
          Trusted by&nbsp;<span className="font-accent italic">2k+</span>&nbsp;ecommerce brands
        </motion.div>

        <h1 className="mt-2 max-w-[320px] text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-black sm:max-w-none lg:text-[56px]">
          {headline}
        </h1>

        <motion.p
          {...blockFade}
          className="mt-2 max-w-[320px] text-[18px] leading-[28px] text-[#545454] md:mt-0 md:text-[20px] md:leading-[30px] sm:max-w-none lg:whitespace-nowrap"
        >
          Spy on any brand&apos;s ads, then create winning static, video &amp; UGC ads
        </motion.p>

        <motion.div
          {...blockFade}
          className="mt-6 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-8 lg:mt-[62px]"
        >
          <DarkButton href={STUDIO_URL} size="lg" className="w-full sm:w-auto">
            Create Your AI Ad
          </DarkButton>
          <LightButton href="/studio" className="w-full sm:w-auto">
            See it in action
          </LightButton>
        </motion.div>
      </div>

      {/* ── phones/tablets: a sideways row of the same clips ── */}
      <motion.div
        {...blockFade}
        className="mt-12 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-8 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {isLg === false &&
          CARDS.map((c) => (
            <div key={c.src} className="relative h-[277px] w-[156px] shrink-0 snap-start overflow-hidden rounded-[10px] bg-[#dcdcdc]">
              <Video src={c.src} poster={c.poster} />
              <span className="absolute right-2.5 top-2.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/30">
                <VolumeX className="h-4 w-4 text-white" strokeWidth={1.75} />
              </span>
            </div>
          ))}
      </motion.div>
    </section>
  );
}
