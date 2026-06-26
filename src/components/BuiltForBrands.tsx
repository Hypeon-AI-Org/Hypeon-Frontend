'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Section, { Cell } from './Section';
import { MEDIA, MarqueeVideo, type Media } from './MediaCarousel';
import { isScrolling, subscribeScroll } from '@/lib/scrollActivity';

/* ============================================================
   "Built for brands serious about growth" - two horizontally
   scrollable rows of tall cards, each tagged in the bottom-left
   corner. Card media is every creative from the "AI Ad Platform
   Built for Performance" carousel (/carousel videos + images,
   exported as MEDIA). Videos lazy-load + autoplay in view.
   Cards overflow the grid cell and scroll horizontally, cutting
   off cleanly at the section's hairline edge (cut-edge look).
============================================================ */

// Split all carousel media into two rows.
const MID = Math.ceil(MEDIA.length / 2);
const ROW_ONE = MEDIA.slice(0, MID);
const ROW_TWO = MEDIA.slice(MID);

function Card({ media }: { media: Media }) {
  return (
    <div className="relative aspect-[9/16] w-[160px] shrink-0 snap-start rounded-2xl bg-white p-1.5 shadow-[0_12px_30px_-10px_rgba(40,20,60,0.18)] sm:w-[200px] lg:w-[230px]">
      {/* inner frame - media sits inset inside the white matte */}
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-100">
        {media.type === 'video' ? (
          // Only the cards in the centre ~40% of the screen actually decode/play;
          // the rest stay as cheap posters. Caps concurrent video decodes to a
          // handful so the marquee stays 100% smooth at full speed.
          <MarqueeVideo src={media.src} rootMargin="0px -30%" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>
    </div>
  );
}

/* Auto-scrolling marquee row. The card set is duplicated so translating the
   strip by -50% (the `marquee` keyframe) loops seamlessly. `reverse` flips the
   direction - top row drifts left, bottom row drifts right.

   The animation is PAUSED while the page is actively scrolling and while the row
   is off-screen. Pausing during scroll is the key to smoothness: a moving strip
   keeps sweeping cards across the IntersectionObserver boundary, which fires
   mount/unmount React renders on the main thread mid-scroll → stutter. Frozen
   during scroll, scrolling stays buttery and the marquee resumes the instant the
   scroll settles. Also pauses on hover. */
function MarqueeRow({ items, reverse = false }: { items: Media[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  const rowRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Pause when the row scrolls off-screen (don't burn a compositor layer the
  // user can't see).
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Freeze the strip while the page is being scrolled.
  useEffect(() => {
    setScrolling(isScrolling());
    return subscribeScroll(setScrolling);
  }, []);

  const running = inView && !scrolling && !hovered;

  return (
    <div ref={rowRef} className="overflow-hidden">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`flex w-max gap-4 sm:gap-5 py-6 sm:py-8 will-change-transform animate-[marquee_35s_linear_infinite] motion-reduce:animate-none ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
        style={{ animationPlayState: running ? 'running' : 'paused' }}
      >
        {loop.map((media, i) => (
          <Card key={i} media={media} />
        ))}
      </div>
    </div>
  );
}

export default function BuiltForBrands() {
  return (
    <Section>
      <Cell>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-bold leading-tight tracking-tighter text-black sm:text-3xl lg:text-4xl"
        >
          Built for brands
          <br />
          <span className="text-[#696863]">serious about growth.</span>
        </motion.h2>
      </Cell>

      {/* Row 1 - team / stage - drifts left */}
      <Cell bleed className="overflow-hidden">
        <MarqueeRow items={ROW_ONE} />
      </Cell>

      {/* Row 2 - industry - drifts right */}
      <Cell bleed className="overflow-hidden">
        <MarqueeRow items={ROW_TWO} reverse />
      </Cell>
    </Section>
  );
}
