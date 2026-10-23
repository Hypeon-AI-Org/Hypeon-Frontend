import { VolumeX } from 'lucide-react';
import LazyVideo from '@/components/LazyVideo';
import { Accent, Container, GradientFrame, GreenPill } from './ui';

const ad = (file: string) => ({
  src: encodeURI(`/ads/${file}.mp4`),
  poster: encodeURI(`/ads/posters/${file}.jpg`),
});
const poster = (id: string) => ({ src: undefined, poster: `/carousel/posters/${id}.jpg` });

type Card = {
  src?: string;
  poster: string;
  niche: string;
  score: number;
  scoreUp: string;
  days: number;
  daysTag: string;
};

/*
 * Five columns of two cards. Column tops step down toward the middle
 * (0 / 32 / 56 / 32 / 0), the arch on the reference.
 */
const COLUMNS: Card[][] = [
  [
    { ...ad('From Klickpin.com- Dreamy road trip vibes designed for beautiful Pinterest saves for daily inspiration for calm daily r-pin-id-1025624515141789740'), niche: 'Fitness', score: 85, scoreUp: '+9', days: 21, daysTag: 'Testing' },
    { ...poster('23f0d4105b094537'), niche: 'Wellness', score: 89, scoreUp: '+14', days: 33, daysTag: 'Scaling' },
  ],
  [
    { ...ad('From Klickpin.com- Discover Trending glowy skin routine tips that are trending right now across Pinterest boards for your next inspiration board-p'), niche: 'Skincare', score: 96, scoreUp: '+22', days: 47, daysTag: 'Scaling' },
    { ...poster('50b18d1681e20f36'), niche: 'Beauty', score: 92, scoreUp: '+18', days: 29, daysTag: 'Scaling' },
  ],
  [
    { ...ad('From Klickpin.com- From beginner to obsessed Love these cozy stretch routine ideas everyone will ask you about with aesthetic touches that photogr'), niche: 'Supplements', score: 93, scoreUp: '+31', days: 52, daysTag: 'Scaling' },
    { ...poster('b22cdc25095d2d23'), niche: 'Beauty', score: 90, scoreUp: '+12', days: 18, daysTag: 'New' },
  ],
  [
    { ...ad('From Klickpin.com- See these 18 Aesthetic bathroom storage solutions that help you create a polished look with very simple and affordable details'), niche: 'Beauty', score: 88, scoreUp: '+11', days: 36, daysTag: 'Scaling' },
    { ...poster('51ebaa4623434df4'), niche: 'Food', score: 86, scoreUp: '+8', days: 24, daysTag: 'Testing' },
  ],
  [
    { ...ad('From Klickpin.com- Save these 26 Chic easy dinner recipe ideas that are trending right now and still timeless enough to save for later for creator'), niche: 'Skincare', score: 91, scoreUp: '+16', days: 40, daysTag: 'Scaling' },
    { ...poster('452d34244c08eaee'), niche: 'Fashion', score: 87, scoreUp: '+10', days: 15, daysTag: 'New' },
  ],
];
const COLUMN_TOP = [0, 32, 56, 32, 0];

function Stat({ label, value, tag }: { label: string; value: string | number; tag: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase leading-[14px] text-white/[0.32] md:text-[7px] md:leading-[11px]">{label}</p>
      <div className="flex items-center gap-[18px]">
        <span className="text-[18px] leading-[27px] text-white">{value}</span>
        <span className="rounded-md bg-[rgba(0,218,127,0.07)] px-1 py-1 text-[11px] leading-[15px] text-[#00da7f] md:text-[10px]">{tag}</span>
      </div>
    </div>
  );
}

function AdCard({ c }: { c: Card }) {
  return (
    <GradientFrame className="h-[468px] w-[248px] shrink-0" inner="p-3.5">
      <div className="flex items-start gap-1">
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 text-[11px] font-semibold text-white">
          {c.niche[0]}
        </span>
        <div className="ml-0.5 mt-0.5 min-w-0">
          <p className="text-[11px] leading-[14px] text-white/[0.32] md:text-[6px] md:leading-[9px]">@trending.{c.niche.toLowerCase()}</p>
          <p className="text-[12px] leading-[18px] text-white">{c.niche}</p>
        </div>
        <GreenPill className="ml-auto !gap-1 !px-1 !py-1 !text-[11px] !leading-[14px] md:!text-[6px] md:!leading-[9px]">
          Active <span className="h-1 w-1 rounded-full bg-[#00da7f]" />
        </GreenPill>
      </div>

      <div className="relative mt-[14px] h-[338px] w-[218px] overflow-hidden bg-white/5">
        {c.src ? (
          <LazyVideo src={c.src} poster={c.poster} className="h-full w-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
        )}
        <span className="absolute right-4 top-4 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
          <VolumeX className="h-4 w-4 text-white/80" strokeWidth={1.75} />
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Stat label="Hype Score" value={c.score} tag={c.scoreUp} />
        <Stat label="Days live" value={c.days} tag={c.daysTag} />
      </div>
    </GradientFrame>
  );
}

/** Huge embossed number over an arch of trending-ad columns, in a 1000x789 dark card. */
export default function BigNumber() {
  return (
    <section className="bg-[#ededed] py-16 md:py-[120px]">
      <Container>
        <div className="relative h-[660px] overflow-hidden md:h-[789px] rounded-2xl bg-[#121212] pt-11">
          {/* soft glow behind the lettering */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[560px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />
          <p
            aria-hidden
            className="relative select-none whitespace-nowrap bg-[linear-gradient(rgba(255,255,255,0.14),rgba(255,255,255,0.03))] bg-clip-text text-center text-[15vw] font-normal leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] md:h-[104px] md:text-[111px] md:leading-[104px]"
          >
            +200M ADS
          </p>
          <h2 className="relative mt-2 text-center text-[24px] font-normal leading-[32px] text-white md:text-[36px] md:leading-[54px]">
            decoded by <Accent>HypeOn Intelligence</Accent>
          </h2>

          {/* columns: 248px wide, 22px apart, centred and wider than the card */}
          <div className="absolute left-1/2 top-[232px] flex -translate-x-1/2 gap-[22px]">
            {COLUMNS.map((col, i) => (
              <div key={i} className="flex flex-col gap-[21px]" style={{ paddingTop: COLUMN_TOP[i] }}>
                {col.map((c) => (
                  <AdCard key={c.poster} c={c} />
                ))}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-[200px] bg-[linear-gradient(90deg,rgba(18,18,18,0.5)_31%,rgba(0,0,0,0)_97%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[200px] bg-[linear-gradient(270deg,rgba(18,18,18,0.5)_31%,rgba(0,0,0,0)_95%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] bg-[linear-gradient(rgba(18,18,18,0),#121212)]" />
        </div>
      </Container>
    </section>
  );
}
