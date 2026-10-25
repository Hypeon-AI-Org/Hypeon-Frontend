import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accent, Container } from '@/components/home/ui';
import { pillButton, TOOL_ICON, ToolCta } from '@/components/tools/sections';
import { VerdictText } from '@/components/tools/ui';
import { TOOL_CATALOG, type ToolSlug } from '@/lib/tools/catalog';
import type { Verdict } from '@/lib/tools/engines';

export const metadata: Metadata = {
  title: 'Free Growth Tools: AI Visibility, Google Rankings & Ad Scoring | HypeOn',
  description:
    'Free HypeOn tools with live data: AI Ad Analyser, Hook Analyser for Reels & TikTok, AI Visibility Scanner and Google Rank Finder. See how your ads, videos, AI answers and Google rankings perform. No sign-up.',
  alternates: { canonical: '/tools' },
};

/* Preview mocks inside each card: fictional brands, illustrative numbers. */

/** A floating mini app window, so each preview reads as a product shot. */
function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[360px] rounded-xl bg-white p-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.06),0_18px_40px_-14px_rgba(16,24,40,0.28)] ring-1 ring-[#e9e9e9]">
      {children}
    </div>
  );
}

function VisibilityPreview() {
  const rows: [string, Verdict][] = [
    ['ChatGPT', 'cited'],
    ['Claude', 'mentioned'],
    ['Gemini', 'not_found'],
    ['Perplexity', 'cited'],
  ];
  return (
    <Frame>
      <p className="text-[13px] text-[#8a8a8a]">“best vitamin c serum for dull skin”</p>
      <ul className="mt-2 space-y-1.5">
        {rows.map(([e, v]) => (
          <li key={e} className="flex items-center justify-between rounded-lg bg-[#f6f6f6] px-3 py-1.5 text-[13px] text-[#121212]">
            {e}
            <VerdictText verdict={v} />
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function RankPreview() {
  const rows = ['runnersworld.com', 'healthline.com', 'stridefit.co', 'nytimes.com'];
  return (
    <Frame>
      <div className="flex items-end gap-2">
        <span className="text-[34px] font-medium leading-none tracking-[-0.04em] text-[#121212]">#3</span>
        <span className="pb-1 text-[13px] text-[#8a8a8a]">“running shoes for flat feet”</span>
      </div>
      <ol className="mt-3 space-y-1.5">
        {rows.map((d, i) => (
          <li
            key={d}
            className={`flex items-center gap-3 rounded-lg px-3 py-1.5 text-[13px] ${
              d === 'stridefit.co' ? 'bg-[#e3f9ee] font-medium text-[#007a45]' : 'bg-[#f6f6f6] text-[#121212]'
            }`}
          >
            <span className="w-4 tabular-nums text-[#9a9a9a]">{i + 1}</span>
            {d}
            {d === 'stridefit.co' && <span className="ml-auto rounded-full bg-[#121212] px-2 py-0.5 text-[11px] text-white">You</span>}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function AdPreview() {
  const checks: [string, string, string][] = [
    ['Hook', 'Strong', 'bg-[#e3f9ee] text-[#007a45]'],
    ['Message', 'Needs work', 'bg-[#fdf2df] text-[#94600b]'],
    ['Call to action', 'Weak', 'bg-[#fdeaea] text-[#b4232a]'],
  ];
  return (
    <Frame>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90" aria-hidden>
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e4e4e4" strokeWidth="3.5" />
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#00b86b" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="97.4" strokeDashoffset="27.3" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[18px] font-medium text-[#121212]">72</span>
        </div>
        <ul className="min-w-0 flex-1 space-y-1.5">
          {checks.map(([k, v, c]) => (
            <li key={k} className="flex items-center justify-between gap-2 text-[14px] text-[#121212]">
              {k}
              <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[12px] font-medium ${c}`}>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

function HookPreview() {
  const marks: [string, string][] = [
    ['0s', 'bg-[#00b86b]'],
    ['1s', 'bg-[#00b86b]'],
    ['2s', 'bg-[#f2a93b]'],
    ['3s', 'bg-[#e5484d]'],
  ];
  return (
    <Frame>
      <div className="flex items-end justify-between">
        <p className="text-[13px] text-[#8a8a8a]">First 3 seconds</p>
        <p className="text-[13px] text-[#121212]">
          <span className="text-[22px] font-medium tracking-[-0.03em]">68</span>/100
        </p>
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {marks.map(([t, c]) => (
          <div key={t}>
            <div className="aspect-[9/14] rounded-md bg-[linear-gradient(160deg,#3a2a20,#121212_75%)]" />
            <div className="mt-1 flex items-center gap-1 text-[11px] text-[#8a8a8a]">
              <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
              {t}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 rounded-lg bg-[#f6f6f6] px-3 py-1.5 text-[13px] text-[#121212]">“I tried this for 7 days…”</p>
    </Frame>
  );
}

function GapPreview() {
  const gaps = ['organic coffee subscription', 'best decaf beans uk', 'coffee gift box delivery'];
  return (
    <Frame>
      <p className="text-[13px] text-[#8a8a8a]">brewhouse.co vs beanroute.com</p>
      <ul className="mt-2 space-y-1.5">
        {gaps.map((g) => (
          <li key={g} className="flex items-center justify-between gap-3 rounded-lg bg-[#f6f6f6] px-3 py-1.5 text-[13px] text-[#121212]">
            <span className="min-w-0 truncate">“{g}”</span>
            <span className="shrink-0 rounded-full bg-[#fdeaea] px-2 py-0.5 text-[12px] font-medium text-[#b4232a]">gap</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

const PREVIEW: Record<ToolSlug, () => ReactNode> = {
  'ai-citation-checker': VisibilityPreview,
  'keyword-rank-checker': RankPreview,
  'ad-analyser': AdPreview,
  'hook-analyzer': HookPreview,
  'seo-competitor-analysis': GapPreview,
};

export default function ToolsPage() {
  const live = TOOL_CATALOG.filter((t) => t.live).length;
  return (
    <main className="relative bg-[#ededed]">
      <Navbar />

      <section className="pb-16 pt-[112px] md:pb-[88px] md:pt-[150px]">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <div className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-3 text-[14px] text-[#121212] shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-[#e4e4e4]">
              <span className="font-accent italic">HypeOn</span> free tools
            </div>
            <h1 className="mt-5 text-[40px] font-medium leading-[1.06] tracking-[-0.03em] text-black md:text-[60px]">
              Growth tools <Accent>on the house.</Accent>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[18px] leading-[28px] text-[#545454] md:text-[20px] md:leading-[30px]">
              See how AI assistants, Google and your ads really perform, with live data and no sign-up. Then let HypeOn
              close the gap.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {[`${live} live tools`, 'Live data', 'No sign-up', 'Free forever'].map((s) => (
                <span key={s} className="rounded-full bg-white px-3 py-1.5 text-[14px] text-[#333333] ring-1 ring-[#e4e4e4]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
            {TOOL_CATALOG.map((t) => {
              const Icon = TOOL_ICON[t.slug];
              const Preview = PREVIEW[t.slug];
              const body = (
                <>
                  {/* Equal-height stage for every preview, on a faint dot grid */}
                  <div className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-t-[20px] border-b border-[#ececec] bg-[#f7f7f7] px-6 pt-6">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                    />
                    <div className={`relative w-full transition-transform duration-300 ${t.live ? 'group-hover:-translate-y-1' : ''} flex justify-center`}>
                      <Preview />
                    </div>
                    <span
                      className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[12px] font-medium ${
                        t.live ? 'bg-[#e3f9ee] text-[#007a45]' : 'bg-white text-[#8a8a8a] ring-1 ring-[#e4e4e4]'
                      }`}
                    >
                      {t.live ? 'Live' : 'Coming soon'}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#121212] text-white">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-[13px] text-[#8a8a8a]">{t.tagline}</p>
                        <h2 className="text-[22px] font-medium leading-tight tracking-[-0.01em] text-[#121212]">{t.title}</h2>
                      </div>
                    </div>
                    <p className="mt-4 text-[16px] leading-[26px] text-[#545454]">{t.body}</p>
                    <div className="mt-auto pt-6">
                      {t.live ? (
                        <span className={pillButton}>
                          Open {t.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      ) : (
                        <span className="inline-flex h-[48px] items-center rounded-2xl bg-[#f1f1f1] px-5 text-[15px] text-[#8a8a8a]">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );
              const card = 'group flex flex-col rounded-[20px] border border-[#e4e4e4] bg-white transition-shadow';
              return t.live ? (
                <Link key={t.slug} href={`/tools/${t.slug}`} className={`${card} hover:shadow-[0_24px_60px_-24px_rgba(16,24,40,0.28)]`}>
                  {body}
                </Link>
              ) : (
                <div key={t.slug} className={card}>
                  {body}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <ToolCta
        title="From insight to"
        accent="action."
        body="Finding the gap is step one. HypeOn helps you close it, on Google, in AI answers and in your ads."
      />
      <Footer />
    </main>
  );
}
