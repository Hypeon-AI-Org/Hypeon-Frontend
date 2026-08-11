'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import logo from '../../assets/HypeOn_Logo.png';
import { primeIOSVideo } from '@/lib/videoAutoplay';

/* ============================================================
   "Made with HypeOn" - a masonry-style gallery of real output,
   straight from the engine. Mostly real creative stills (a few
   as autoplaying video where the source clip is available), with
   a couple of dark branded tiles dropped in among them.
============================================================ */

type Tile =
  | { kind: 'image'; src: string; aspect: string; ratio: number }
  | { kind: 'video'; src: string; poster?: string; aspect: string; ratio: number }
  | { kind: 'brand'; title: string; aspect: string; ratio: number };

// Tiles are listed in COLUMN-MAJOR order - all of column 1's tiles, then all
// of column 2's, etc. - so that on desktop (4 columns) they can be sliced
// straight into columns matching the reference layout exactly, tile for tile.
// Every tile shares the SAME aspect ratio, so rows line up evenly across all
// columns instead of the jagged/uneven look a mixed-ratio masonry gives.
const RATIO = 5 / 4; // height/width
const ASPECT = 'aspect-[4/5]';

// Real ad clips supplied in /public/ads - every plain image tile and dark
// "empty box" brand tile gets replaced by one of these, so the whole grid is
// live video.
const ADS_FILENAMES = [
  'From Klickpin.com- 23 Minimal bridal shower decor ideas that can help you create a more curated classy and Pinterest-worthy result for busy people.mp4',
  'From Klickpin.com- Cultural street market scenes that feel fresh and shareable on a budget with postcard energy-pin-id-1099511696554881422.mp4',
  'From Klickpin.com- Dreamy road trip vibes designed for beautiful Pinterest saves for daily inspiration for calm daily r-pin-id-1025624515141789740.mp4',
  'From Klickpin.com- From beginner to obsessed Love these cozy stretch routine ideas everyone will ask you about with aesthetic touches that photogr.mp4',
  'From Klickpin.com- Heartfelt love notes with charm and practical value for modern homes for romantic Pinterest boards-pin-id-1103593083716257463.mp4',
  'From Klickpin.com- Practical bridesmaid dress inspiration that make your next project look polished and expensive for ideas worth saving right now.mp4',
  'From Klickpin.com- Save these 26 Chic easy dinner recipe ideas that are trending right now and still timeless enough to save for later for creator.mp4',
  'From Klickpin.com- Style these viral ways to style your nursery decor that help you get the look without the stress that balance trend comfort and.mp4',
  'From Klickpin.com- Discover Trending glowy skin routine tips that are trending right now across Pinterest boards for your next inspiration board-p.mp4',
  'From Klickpin.com- Explore these 10 Aesthetic wedding hair ideas that make everyday moments look more intentional memorable and beautifully styled.mp4',
  'From Klickpin.com- See these 18 Aesthetic bathroom storage solutions that help you create a polished look with very simple and affordable details.mp4',
];

const adsVideo = (filename: string): Tile => ({
  kind: 'video',
  src: encodeURI(`/ads/${filename}`),
  aspect: ASPECT,
  ratio: RATIO,
});

const TILES: Tile[] = [
  // Column 1
  { kind: 'video', src: '/carousel/610e86c7e9808d60.mp4', poster: '/carousel/posters/610e86c7e9808d60.jpg', aspect: ASPECT, ratio: RATIO },
  { kind: 'video', src: '/carousel/045e53458f4485d2.mp4', poster: '/carousel/posters/045e53458f4485d2.jpg', aspect: ASPECT, ratio: RATIO },
  adsVideo(ADS_FILENAMES[0]),
  adsVideo(ADS_FILENAMES[1]),
  // Column 2
  adsVideo(ADS_FILENAMES[2]),
  adsVideo(ADS_FILENAMES[3]),
  { kind: 'video', src: '/carousel/23f0d4105b094537.mp4', poster: '/carousel/posters/23f0d4105b094537.jpg', aspect: ASPECT, ratio: RATIO },
  // Column 3
  { kind: 'video', src: '/carousel/750b44dd8efb32ae.mp4', poster: '/carousel/posters/750b44dd8efb32ae.jpg', aspect: ASPECT, ratio: RATIO },
  adsVideo(ADS_FILENAMES[4]),
  adsVideo(ADS_FILENAMES[5]),
  { kind: 'video', src: '/carousel/261138129033eb1f.mp4', poster: '/carousel/posters/261138129033eb1f.jpg', aspect: ASPECT, ratio: RATIO },
  // Column 4
  adsVideo(ADS_FILENAMES[6]),
  adsVideo(ADS_FILENAMES[7]),
  adsVideo(ADS_FILENAMES[8]),
  adsVideo(ADS_FILENAMES[9]),

  { kind: 'video', src: '/hero/ind-vid/food.mp4', poster: '/hero/ind-vid/posters/food.jpg', aspect: ASPECT, ratio: RATIO },
];

// Greedy "shortest column gets the next tile" packing, using each tile's real
// aspect ratio as its estimated height - used on smaller breakpoints (2/3
// cols) where the tiles no longer split evenly into fixed groups of 3.
function distributeIntoColumns(tiles: Tile[], cols: number): Tile[][] {
  const columns: Tile[][] = Array.from({ length: cols }, () => []);
  const heights = Array<number>(cols).fill(0);
  for (const tile of tiles) {
    let shortest = 0;
    for (let i = 1; i < cols; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(tile);
    heights[shortest] += tile.ratio;
  }
  return columns;
}

// On desktop (4 cols) the tiles are already grouped 3-per-column above, so
// slice them straight across - this reproduces the reference's exact column
// layout instead of an algorithm's approximation of it.
function chunkIntoColumns(tiles: Tile[], cols: number): Tile[][] {
  if (cols === 4) {
    const perCol = Math.ceil(tiles.length / cols);
    return Array.from({ length: cols }, (_, i) => tiles.slice(i * perCol, (i + 1) * perCol));
  }
  return distributeIntoColumns(tiles, cols);
}

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

// Manually-split flex columns instead of CSS `columns-N`: browser support for
// column-balancing + break-inside is inconsistent (Firefox/older WebKit can
// leave a wide gap on the right instead of stretching to fill the row), so we
// distribute tiles into N equal-width flex columns ourselves - guaranteed to
// always fill the full container width in every browser.
function useColumnCount() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const mqLg = window.matchMedia('(min-width: 1024px)');
    const mqSm = window.matchMedia('(min-width: 640px)');
    const update = () => setCols(mqLg.matches ? 4 : mqSm.matches ? 3 : 2);
    update();
    mqLg.addEventListener('change', update);
    mqSm.addEventListener('change', update);
    return () => {
      mqLg.removeEventListener('change', update);
      mqSm.removeEventListener('change', update);
    };
  }, []);
  return cols;
}

function GridTile({ tile }: { tile: Tile }) {
  return (
    <motion.div
      variants={reveal}
      className={`relative w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)] ${tile.aspect}`}
    >
      {tile.kind === 'image' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tile.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : tile.kind === 'video' ? (
        <video
          src={tile.src}
          poster={tile.poster}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="metadata"
          onLoadedData={(e) => primeIOSVideo(e.currentTarget)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#141416] to-[#0a0a0c] px-4 text-center">
          <span className="inline-flex items-center gap-1.5 text-white/50">
            <Image src={logo} alt="" width={16} height={16} className="h-4 w-4 object-contain invert" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">HypeOn</span>
          </span>
          <p className="text-lg font-bold leading-tight text-white sm:text-xl">{tile.title}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function BuiltForBrands() {
  const cols = useColumnCount();
  const columns = chunkIntoColumns(TILES, cols);

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl font-bold leading-tight tracking-tighter text-black sm:text-3xl lg:text-4xl">
              Made with HypeOn
            </h2>
            <p className="mt-2 text-sm text-neutral-500 sm:text-base">
              Real output, straight from the engine. No filming, no agency.
            </p>
          </motion.div>

          <motion.a
            href="https://app.hypeon.ai/studio/login"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Sparkles className="h-3.5 w-3.5 text-slate-500" strokeWidth={2.2} />
            Explore templates
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.05 }}
          className="mt-10 flex gap-1.5 sm:mt-14 sm:gap-2"
        >
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-1.5 sm:gap-2">
              {col.map((tile, i) => (
                <GridTile key={i} tile={tile} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
