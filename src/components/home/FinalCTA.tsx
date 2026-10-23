import { ArrowRight } from 'lucide-react';
import { Accent, Container, DarkButton, DarkCard, DEMO_URL, H2, LightButton } from './ui';

const p = (id: string) => `/carousel/posters/${id}.jpg`;
const LEFT = [p('610e86c7e9808d60'), p('23f0d4105b094537'), p('750b44dd8efb32ae'), p('261138129033eb1f')];
const RIGHT = [p('045e53458f4485d2'), p('8fb3c5a47348d3aa'), p('d1da89b3cf25b0f9'), p('452d34244c08eaee')];

/** A tilted column of photos bleeding off one edge of the CTA card. */
function Collage({ images, side }: { images: string[]; side: 'left' | 'right' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden w-[230px] -translate-y-1/2 md:block ${
        side === 'left' ? '-left-16 -rotate-[24deg]' : '-right-16 rotate-[24deg]'
      }`}
    >
      <div className="grid grid-cols-2 gap-2.5">
        {images.map((src, i) => (
          <div key={src} className={`aspect-[3/4] overflow-hidden rounded-2xl ${i % 2 ? 'translate-y-8' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinalCTA() {
  return (
    <section className="bg-[linear-gradient(#121212,#191919)] py-16 md:py-[120px]">
      <Container>
        <DarkCard className="flex items-center justify-center px-6 py-12 text-center md:h-[431px] md:py-0">
          <Collage images={LEFT} side="left" />
          <Collage images={RIGHT} side="right" />
          <div className="relative z-10 mx-auto max-w-[480px]">
            <h2 className="text-[32px] font-normal leading-[38.4px] text-white">
              Stop guessing <Accent>what’s working.</Accent>
            </h2>
            <p className="mt-3 text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-white/50">
              HypeOn surfaces the winners and builds the brief. You launch from evidence, not a hunch.
            </p>
            <DarkButton className="mt-8">Try HypeOn Free</DarkButton>
          </div>
        </DarkCard>

        <div className="mt-16 text-center md:mt-[74px]">
          <H2 className="text-white">
            Talk to <Accent>the team</Accent>
          </H2>
          <p className="mx-auto mt-3 max-w-[448px] text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-white/50">
            Book a call and we&apos;ll walk you through HypeOn on your own brand and competitors.
          </p>
          <LightButton href={DEMO_URL} className="mt-8">
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </LightButton>
        </div>
      </Container>
    </section>
  );
}
