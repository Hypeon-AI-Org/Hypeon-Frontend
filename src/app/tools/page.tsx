import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accent, Container } from '@/components/home/ui';
import { pillButton, ToolCta } from '@/components/tools/sections';
import { TOOL_CATALOG, type ToolSlug } from '@/lib/tools/catalog';

export const metadata: Metadata = {
  title: 'Free SEO & AI Visibility Tools | HypeOn',
  description:
    'Free tools with live data on how Google and AI assistants see your brand: SEO competitor analysis, keyword rank checker and AI citation checker. No sign-up.',
  alternates: { canonical: '/tools' },
};

/* Preview mocks: fictional brands, illustrative numbers. */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#161616] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
      {children}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#161616] to-transparent" />
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="shrink-0 whitespace-nowrap rounded-md border border-white/10 px-2 py-0.5 text-[12px] text-white/60">{children}</span>;
}

function CompetitorPreview() {
  const gaps = ['organic coffee subscription', 'best decaf beans uk', 'coffee gift box delivery'];
  return (
    <Frame>
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span className="min-w-0 truncate text-white/80">
          brewhouse.co <span className="text-white/35">vs</span> beanroute.com
        </span>
        <Chip>United Kingdom</Chip>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[12px] text-white/40">Organic keywords</p>
          <p className="mt-1 text-[26px] font-medium text-white">
            1,426 <span className="text-[13px] text-[#00da7f]">▲ 184</span>
          </p>
        </div>
        <div>
          <p className="text-[12px] text-white/40">Competitor keywords</p>
          <p className="mt-1 text-[26px] font-medium text-white">
            2,318 <span className="text-[13px] text-[#ff8f9c]">gap 892</span>
          </p>
        </div>
      </div>
      <ul className="mt-3 divide-y divide-[#2a2a2a] text-[13px]">
        {gaps.map((g) => (
          <li key={g} className="flex justify-between gap-3 py-2">
            <span className="min-w-0 truncate text-white/80">“{g}”</span>
            <span className="shrink-0 whitespace-nowrap text-[#ff8f9c]">they rank · you don’t</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function RankPreview() {
  const rows = [
    ['wikipedia.org', 'Reference'],
    ['runnersworld.com', 'Publisher'],
    ['stridefit.co', 'You'],
    ['sportsdirect.com', 'Retailer'],
  ];
  return (
    <Frame>
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span className="min-w-0 truncate text-white/80">“best running shoes for flat feet”</span>
        <Chip>United States</Chip>
      </div>
      <p className="mt-3 text-[36px] font-medium leading-none text-white">
        #3 <span className="text-[13px] font-normal text-white/40">on Google today</span>
      </p>
      <ul className="mt-3 divide-y divide-[#2a2a2a] text-[13px]">
        {rows.map(([d, k], i) => (
          <li key={d} className="flex justify-between py-2">
            <span className={k === 'You' ? 'text-[#00da7f]' : 'text-white/80'}>
              <span className="mr-3 text-white/35">{i + 1}</span>
              {d}
            </span>
            <span className={k === 'You' ? 'text-[#00da7f]' : 'text-white/40'}>{k}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function CitationPreview() {
  const rows: [string, string, string][] = [
    ['ChatGPT', 'Cited', 'text-[#00da7f]'],
    ['Claude', 'Mentioned', 'text-white/55'],
    ['Gemini', 'Not mentioned', 'text-[#ff8f9c]'],
    ['Perplexity', 'Cited', 'text-[#00da7f]'],
  ];
  return (
    <Frame>
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span className="text-white/80">lumenskin.com</span>
        <Chip>Skincare · London</Chip>
      </div>
      <ul className="mt-3 divide-y divide-[#2a2a2a] text-[14px]">
        {rows.map(([e, v, c]) => (
          <li key={e} className="flex justify-between py-2.5">
            <span className="text-white/80">{e}</span>
            <span className={c}>{v}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

const PREVIEW: Record<ToolSlug, () => ReactNode> = {
  'seo-competitor-analysis': CompetitorPreview,
  'keyword-rank-checker': RankPreview,
  'ai-citation-checker': CitationPreview,
};

export default function ToolsPage() {
  return (
    <main className="relative bg-[#121212]">
      <Navbar />

      <section className="relative overflow-hidden pb-16 pt-[120px] md:pb-20 md:pt-[160px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[360px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,218,127,0.09),rgba(120,90,255,0.04)_60%,transparent)] blur-2xl"
        />
        <Container className="relative">
          <div className="text-center">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">Free tools</p>
            <h1 className="mt-4 text-[40px] font-medium leading-[1.08] tracking-[-0.03em] text-white md:text-[64px]">
              See where you <Accent>stand.</Accent>
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-[18px] leading-[28px] text-white/55 md:text-[20px] md:leading-[30px]">
              Free tools with live data, no sign-up. Find where Google and AI leave you out, then let HypeOn close
              the gap.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-2xl border border-[#2a2a2a] md:mt-20">
            {TOOL_CATALOG.map((t) => {
              const Preview = PREVIEW[t.slug];
              return (
                <div
                  key={t.slug}
                  className="grid items-center gap-8 border-b border-[#2a2a2a] bg-[#121212] px-6 py-10 last:border-b-0 md:grid-cols-2 md:gap-14 md:px-10 md:py-12"
                >
                  <div>
                    <h2 className="text-[26px] font-medium tracking-[-0.01em] text-white md:text-[32px]">{t.title}</h2>
                    <p className="mt-3 max-w-[440px] text-[17px] leading-[27px] text-white/55 md:text-[18px]">{t.body}</p>
                    {t.live ? (
                      <Link href={`/tools/${t.slug}`} className={`${pillButton} mt-7`}>
                        Open tool
                      </Link>
                    ) : (
                      <span className="mt-7 inline-flex h-[50px] items-center rounded-2xl border border-[#2a2a2a] px-6 text-[16px] text-white/45">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <Preview />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <ToolCta
        title="From insight to"
        accent="action."
        body="Finding the gap is step one. HypeOn helps you close it, on Google and in AI answers."
      />
      <Footer />
    </main>
  );
}
