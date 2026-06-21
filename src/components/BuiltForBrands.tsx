'use client';

import { motion } from 'framer-motion';
import Section, { Cell } from './Section';
import { MEDIA, MarqueeVideo, type Media } from './MediaCarousel';

/* ============================================================
   "Built for brands serious about growth" — two horizontally
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
      {/* inner frame — media sits inset inside the white matte */}
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-100">
        {media.type === 'video' ? (
          <MarqueeVideo src={media.src} />
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
   direction — top row drifts left, bottom row drifts right. Pauses on hover. */
function MarqueeRow({ items, reverse = false }: { items: Media[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <div
        className={`flex w-max gap-4 sm:gap-5 py-6 sm:py-8 will-change-transform animate-[marquee_70s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
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
          <span className="text-neutral-400">serious about growth.</span>
        </motion.h2>
      </Cell>

      {/* Row 1 — team / stage — drifts left */}
      <Cell bleed className="overflow-hidden">
        <MarqueeRow items={ROW_ONE} />
      </Cell>

      {/* Row 2 — industry — drifts right */}
      <Cell bleed className="overflow-hidden">
        <MarqueeRow items={ROW_TWO} reverse />
      </Cell>
    </Section>
  );
}
