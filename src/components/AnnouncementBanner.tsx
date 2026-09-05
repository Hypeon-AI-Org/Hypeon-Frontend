"use client";

import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { GROWTH_OFFER, STUDIO_PLANS_URL, usd } from "@/lib/growthOffer";
import { msLeft } from "@/components/PromoCountdown";

/* ============================================================
   Site-wide announcement bar for the Growth launch offer: a black
   glass strip pinned above the navbar that carries the same copy
   as the pricing cards (first month at GROWTH_OFFER.offerPrice,
   then the list price), a segmented countdown, and one CTA.

   It slides out of the way as soon as the visitor scrolls down and
   slides back on the first scroll up, and it takes itself down for
   good once the deadline passes. Its measured height is published
   as `--promo-h` so the fixed navbar rides with it.
============================================================ */

/** Scroll past this before hiding, so a stray wheel nudge does not flicker it. */
const HIDE_AFTER = 72;

export default function AnnouncementBanner() {
  // Mounted-only: the countdown lives in the browser, so there is nothing worth
  // pre-rendering, and nothing to hydrate against.
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (msLeft(GROWTH_OFFER.endsAt, Date.now()) === 0) return;

    setVisible(true);
    const tick = () => {
      const remaining = msLeft(GROWTH_OFFER.endsAt, Date.now());
      setLeft(remaining);
      if (remaining === 0) setVisible(false);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Out of the way on the way down, back on the first scroll up — the usual
  // bargain for a bar that owns the top of every page.
  useEffect(() => {
    if (!visible) return;
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY + 4 && y > HIDE_AFTER) setHidden(true);
        else if (y < lastY - 4 || y <= 8) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  // `--promo-h` is what the fixed navbar reads, so it goes to zero as the bar
  // leaves and the navbar glides up with it. The body offset stays at the full
  // height throughout: retracting it would scroll the page under the reader.
  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;
    if (!visible || !el) {
      root.style.removeProperty("--promo-h");
      document.body.style.removeProperty("padding-top");
      return;
    }
    // Measured, not hard-coded: the bar wraps to two lines on narrow phones.
    const measure = () => {
      const h = el.offsetHeight;
      document.body.style.paddingTop = `${h}px`;
      root.style.setProperty("--promo-h", hidden ? "0px" : `${h}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--promo-h");
      document.body.style.removeProperty("padding-top");
    };
  }, [visible, hidden]);

  if (!visible) return null;

  const total = left === null ? null : Math.floor(left / 1000);
  const units =
    total === null
      ? [null, null, null]
      : [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60];
  const [hh, mm, ss] = units.map((n) => (n === null ? "--" : String(n).padStart(2, "0")));
  const offerPrice = usd(GROWTH_OFFER.offerPrice);
  const listPrice = usd(GROWTH_OFFER.listPrice);

  return (
    <motion.div
      ref={barRef}
      role="region"
      aria-label="Launch offer"
      initial={reduceMotion ? false : { y: "-100%" }}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[41] border-b border-white/[0.08] bg-black/90 backdrop-blur-2xl backdrop-saturate-150"
    >
      {/* Glass, monochrome: light pooling behind the blur, a lit top edge, and a
          sheen that crosses the bar every few seconds. All decorative. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-black/0 to-black/40" />
        <div className="absolute left-1/2 top-1/2 h-[260px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[70px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {!reduceMotion && (
          <motion.div
            initial={{ x: "-40%" }}
            animate={{ x: "140%" }}
            transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          />
        )}
      </div>

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-nowrap items-center justify-center gap-x-2.5 whitespace-nowrap px-2.5 py-2 sm:gap-x-5 sm:px-6 sm:py-3">
        <span
          aria-label="Launch offer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-1.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:px-2.5"
        >
          <Zap className="h-3 w-3 fill-white/90 text-white/90" aria-hidden />
          <span className="hidden sm:inline">Launch offer</span>
        </span>

        <p className="min-w-0 shrink truncate text-[11.5px] font-medium text-white/60 sm:text-[14px]">
          <span className="font-semibold text-white">{GROWTH_OFFER.planName}</span>
          <span className="hidden sm:inline"> is</span>{" "}
          <span className="font-bold text-white">{offerPrice}</span>
          <span className="text-white/90 sm:hidden"> first month</span>
          <span className="hidden text-white/90 sm:inline"> for your first month</span>
          <span className="hidden md:inline"> — then {listPrice}/mo, cancel anytime</span>
        </p>

        {/* The clock as three tiles: a glanceable shape, and the digits stop
            jittering because each tile is a fixed box of tabular numerals. */}
        <span
          role="timer"
          aria-live="off"
          aria-label={`Launch offer ends in ${hh} hours ${mm} minutes ${ss} seconds`}
          className="inline-flex shrink-0 items-center gap-1"
        >
          <span aria-hidden className="relative hidden h-1.5 w-1.5 sm:mr-1.5 sm:flex">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-50 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span
            aria-hidden
            className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-semibold tabular-nums tracking-tight text-white sm:hidden"
          >
            {`${hh}:${mm}:${ss}`}
          </span>
          {[hh, mm, ss].map((value, i) => (
            <span key={i} aria-hidden className="hidden items-center sm:flex">
              {i > 0 && <span className="px-0.5 text-[11px] text-white/25">:</span>}
              <span className="min-w-[27px] rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-center text-[12px] font-semibold tabular-nums tracking-tight text-white">
                {value}
              </span>
            </span>
          ))}
        </span>

        {/* Glass, like the bar it sits in: a lit top edge over a translucent
            pane, brightening on hover rather than switching to a solid fill. */}
        <a
          href={STUDIO_PLANS_URL}
          className="relative inline-flex shrink-0 items-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11.5px] font-semibold text-white backdrop-blur-md sm:px-4 sm:py-1.5 transition-colors duration-200 ease-out hover:border-white/35 hover:bg-white/[0.18] sm:text-[13px]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"
          />
          <span className="relative">
            Claim<span className="hidden sm:inline"> offer</span>
          </span>
        </a>
      </div>
    </motion.div>
  );
}
