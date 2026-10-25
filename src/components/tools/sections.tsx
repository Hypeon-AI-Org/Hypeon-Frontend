import type { ReactNode } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Check, Clapperboard, Minus, Plus, Radar, Search, Sparkles, Swords, Timer } from 'lucide-react';

import { Accent, Container, DarkButton, DarkCard, DEMO_URL, LightButton, STUDIO_URL } from '@/components/home/ui';
import { TOOL_CATALOG, type ToolSlug } from '@/lib/tools/catalog';

/*
 * Page sections shared by every free tool page, in the site's light theme:
 * hero (copy left, tool card right) → result card → how it works → tool-specific
 * sections → FAQ → more tools → the home page's dark closing band.
 */

/** Hypeon's dark gradient button, for links on the light sections. */
export const pillButton =
  'inline-flex h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#464646] bg-gradient-to-b from-[#373737] to-[#121212] px-5 text-[15px] font-medium text-white transition-[filter] duration-200 hover:brightness-125';

export const TOOL_ICON: Record<ToolSlug, LucideIcon> = {
  'ai-citation-checker': Sparkles,
  'keyword-rank-checker': Search,
  'ad-analyser': Clapperboard,
  'hook-analyzer': Timer,
  'seo-competitor-analysis': Swords,
};

function ToolEyebrow({ slug }: { slug: ToolSlug }) {
  const Icon = TOOL_ICON[slug];
  const tool = TOOL_CATALOG.find((t) => t.slug === slug);
  return (
    <div className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-3 text-[14px] text-[#121212] shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-[#e4e4e4]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#121212] text-white">
        <Icon className="h-3 w-3" strokeWidth={2} />
      </span>
      {tool?.title}
      <span className="rounded-full bg-[#e3f9ee] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[#007a45]">Free</span>
    </div>
  );
}

/**
 * Centred tool hero: the pitch on top, the tool itself in a full-width white
 * card underneath, lined up with the result card below it.
 */
export function ToolHero({
  slug,
  title,
  accent,
  sub,
  points,
  children,
}: {
  slug: ToolSlug;
  title: string;
  accent: string;
  sub: string;
  points: string[];
  children: ReactNode;
}) {
  return (
    <div className="text-center">
      <ToolEyebrow slug={slug} />
      {/* The accent phrase always starts its own line; balance keeps the first line from orphaning a word. */}
      <h1 className="mx-auto mt-5 max-w-[760px] text-[36px] font-medium leading-[1.05] tracking-[-0.03em] text-black [text-wrap:balance] sm:text-[44px] md:text-[56px]">
        {title}
        <br />
        <Accent>{accent}</Accent>
      </h1>
      <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-[27px] text-[#545454] md:text-[19px] md:leading-[29px]">{sub}</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {points.map((p) => (
          <li
            key={p}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[14px] text-[#333333] ring-1 ring-[#e4e4e4]"
          >
            <Check className="h-3.5 w-3.5 text-[#00b86b]" strokeWidth={3} />
            {p}
          </li>
        ))}
      </ul>

      <div className="relative mt-10 text-left md:mt-12">
        {/* Depth behind the tool card: a soft white glow and a fading dot grid. */}
        <div aria-hidden className="pointer-events-none absolute -inset-x-10 -inset-y-12 hidden sm:block">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.95),rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-[radial-gradient(#c9c9c9_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(closest-side,black,transparent)] opacity-60" />
        </div>
        <div className="relative rounded-[20px] border border-[#e4e4e4] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_60px_-20px_rgba(16,24,40,0.22)] md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Frame for a tool's result: a header strip (title, context chips, Example tag) over the content. */
export function ResultShell({
  icon: Icon,
  title,
  meta,
  example,
  children,
  footer,
}: {
  icon: LucideIcon;
  title: string;
  meta?: string;
  example?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#e4e4e4] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-16px_rgba(16,24,40,0.14)]">
      <div className="flex items-center gap-3 border-b border-[#ececec] bg-[#fafafa] px-5 py-3.5 md:px-6">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#121212] text-white">
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium text-[#121212]">{title}</p>
          {meta && <p className="truncate text-[13px] text-[#8a8a8a]">{meta}</p>}
        </div>
        {example && (
          <span className="ml-auto shrink-0 rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[12px] font-medium text-[#8a8a8a]">
            Example
          </span>
        )}
      </div>
      {children}
      {footer && (
        <div className="flex flex-col gap-4 border-t border-[#ececec] bg-[#fafafa] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          {footer}
        </div>
      )}
    </div>
  );
}

export function SectionHead({
  title,
  accent,
  sub,
  center = false,
}: {
  title: string;
  accent: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className="text-[32px] font-normal leading-[1.15] tracking-[-0.01em] text-black md:text-[44px]">
        {title} <Accent>{accent}</Accent>
      </h2>
      {sub && (
        <p className={`mt-3 max-w-[540px] text-[18px] leading-[28px] text-[#545454] ${center ? 'mx-auto' : ''}`}>{sub}</p>
      )}
    </div>
  );
}

export function ToolSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-14 md:py-[88px] ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export type Step = { icon: LucideIcon; title: string; body: string };

/** Three numbered step cards in a row, joined by a hairline on desktop. */
export function HowItWorks({ steps, sub }: { steps: Step[]; sub: string }) {
  return (
    <ToolSection>
      <SectionHead title="Three steps," accent="no account." sub={sub} center />
      <div className="relative mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
        <div aria-hidden className="absolute left-[16%] right-[16%] top-[44px] hidden h-px bg-[#d9d9d9] md:block" />
        {steps.map((s, i) => (
          <div key={s.title} className="relative rounded-2xl border border-[#e4e4e4] bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#121212] text-white">
                <s.icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="font-accent text-[40px] italic leading-none text-[#d4d4d4]">0{i + 1}</span>
            </div>
            <p className="mt-6 text-[20px] font-medium text-[#121212]">{s.title}</p>
            <p className="mt-2 text-[16px] leading-[26px] text-[#545454]">{s.body}</p>
          </div>
        ))}
      </div>
    </ToolSection>
  );
}

export function ToolFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <ToolSection>
      <SectionHead title="Good" accent="questions." center />
      <div className="mx-auto mt-10 max-w-[820px] divide-y divide-[#ececec] overflow-hidden rounded-2xl border border-[#e4e4e4] bg-white">
        {items.map((f, i) => (
          <details key={f.q} open={i === 0} className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[17px] font-medium text-[#121212] transition-colors hover:bg-[#fafafa]">
              {f.q}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f1f1] text-[#121212] transition-colors group-open:bg-[#121212] group-open:text-white">
                <Plus className="h-4 w-4 group-open:hidden" />
                <Minus className="hidden h-4 w-4 group-open:block" />
              </span>
            </summary>
            <p className="px-6 pb-6 text-[16px] leading-[26px] text-[#545454]">{f.a}</p>
          </details>
        ))}
      </div>
    </ToolSection>
  );
}

/** The other free tools as cards, live ones linked. */
export function MoreTools({ current }: { current: ToolSlug }) {
  const others = TOOL_CATALOG.filter((t) => t.slug !== current);
  return (
    <ToolSection className="!pt-0">
      <div className="flex items-end justify-between gap-4">
        <SectionHead title="More free" accent="tools." />
        <Link href="/tools" className="hidden shrink-0 items-center gap-1.5 text-[15px] font-medium text-[#121212] hover:opacity-70 sm:inline-flex">
          All tools <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((t) => {
          const Icon = TOOL_ICON[t.slug];
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121212] text-white">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </span>
                {t.live ? (
                  <ArrowRight className="h-5 w-5 text-[#121212] transition-transform group-hover:translate-x-1" />
                ) : (
                  <span className="rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[12px] font-medium text-[#8a8a8a]">Coming soon</span>
                )}
              </div>
              <p className="mt-5 text-[13px] text-[#8a8a8a]">{t.tagline}</p>
              <p className="mt-1 text-[19px] font-medium text-[#121212]">{t.title}</p>
              <p className="mt-2 text-[15px] leading-[24px] text-[#545454]">{t.body}</p>
            </>
          );
          const box = 'group flex h-full flex-col rounded-2xl border border-[#e4e4e4] bg-white p-6 transition-shadow';
          return t.live ? (
            <Link key={t.slug} href={`/tools/${t.slug}`} className={`${box} hover:shadow-[0_16px_40px_-16px_rgba(16,24,40,0.2)]`}>
              {inner}
            </Link>
          ) : (
            <div key={t.slug} className={`${box} opacity-80`}>
              {inner}
            </div>
          );
        })}
      </div>
    </ToolSection>
  );
}

/** The home page's dark closing band: a DarkCard with the pitch and two actions. */
export function ToolCta({ title, accent, body }: { title: string; accent: string; body: string }) {
  return (
    <section className="bg-[linear-gradient(#121212,#191919)] py-16 md:py-[110px]">
      <Container>
        <DarkCard className="px-6 py-14 text-center md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[420px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[13px] text-white/60 ring-1 ring-inset ring-white/10">
            <Radar className="h-3.5 w-3.5 text-[#00da7f]" /> Free insight, real growth
          </span>
          <h2 className="mt-5 text-[32px] font-normal leading-[1.15] text-white md:text-[48px]">
            {title} <Accent>{accent}</Accent>
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[18px] leading-[28px] text-white/50">{body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <DarkButton href={STUDIO_URL}>Try HypeOn free</DarkButton>
            <LightButton href={DEMO_URL}>
              Book a demo <ArrowRight className="h-4 w-4" />
            </LightButton>
          </div>
        </DarkCard>
      </Container>
    </section>
  );
}
