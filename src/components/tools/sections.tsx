import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Minus, Plus } from 'lucide-react';

import { Accent, Container, DEMO_URL, STUDIO_URL } from '@/components/home/ui';
import { TOOL_CATALOG, type ToolSlug } from '@/lib/tools/catalog';
import logo from '../../../assets/HypeOn_Logo.png';

/*
 * Page sections shared by every free tool page, in this order:
 * hero (per tool) → results → how it works → reading the results → live check
 * → FAQ → more free tools → closing CTA. All on the dark #121212 page.
 */

export const pillButton =
  'inline-flex h-[50px] items-center justify-center gap-2 rounded-2xl bg-white px-6 text-[16px] font-medium text-[#121212] transition-colors hover:bg-[#ececec]';

export function SectionHead({ title, accent, sub }: { title: string; accent: string; sub: string }) {
  return (
    <div>
      <h2 className="text-[32px] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[48px]">
        {title} <Accent>{accent}</Accent>
      </h2>
      <p className="mt-3 max-w-[520px] text-[17px] leading-[27px] text-white/50 md:text-[18px]">{sub}</p>
    </div>
  );
}

export function ToolSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-14 md:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export type Step = { icon: LucideIcon; title: string; body: string };

export function HowItWorks({ steps, sub }: { steps: Step[]; sub: string }) {
  return (
    <ToolSection>
      <SectionHead title="How it" accent="works." sub={sub} />
      <div className="mt-10 overflow-hidden rounded-2xl border border-[#2a2a2a]">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="grid gap-4 border-b border-[#2a2a2a] bg-[#121212] px-6 py-7 last:border-b-0 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-8 md:px-8"
          >
            <div className="flex items-center gap-4">
              <span className="text-[14px] tabular-nums text-white/40">0{i + 1}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] text-[#00da7f]">
                <s.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
            </div>
            <p className="text-[20px] font-medium text-white md:text-[22px]">{s.title}</p>
            <p className="text-[16px] leading-[26px] text-white/50 md:text-[17px]">{s.body}</p>
          </div>
        ))}
      </div>
    </ToolSection>
  );
}

export function ToolFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <ToolSection>
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)] md:gap-12">
        <h2 className="text-[32px] font-normal leading-[1.15] text-white md:text-[48px]">
          <Accent>FAQ</Accent>
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[#2a2a2a]">
          {items.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group border-b border-[#2a2a2a] bg-[#121212] last:border-b-0 open:bg-[#161616] [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-[17px] font-medium text-white md:text-[18px]">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80">
                  <Plus className="h-3.5 w-3.5 group-open:hidden" />
                  <Minus className="hidden h-3.5 w-3.5 group-open:block" />
                </span>
              </summary>
              <p className="px-5 pb-6 text-[16px] leading-[26px] text-white/55">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </ToolSection>
  );
}

export function MoreTools({ current }: { current: ToolSlug }) {
  const others = TOOL_CATALOG.filter((t) => t.slug !== current);
  return (
    <ToolSection className="!py-8">
      <div className="grid overflow-hidden rounded-2xl border border-[#2a2a2a] md:grid-cols-2">
        {others.map((t) => (
          <div
            key={t.slug}
            className="flex items-center justify-between gap-4 border-b border-[#2a2a2a] bg-[#121212] px-6 py-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/40">More free tools</p>
              <p className="mt-2 text-[20px] font-medium text-white">{t.title}</p>
            </div>
            {t.live ? (
              <Link href={`/tools/${t.slug}`} className={`${pillButton} h-[42px] px-5 text-[15px]`}>
                Open
              </Link>
            ) : (
              <span className="rounded-2xl border border-[#2a2a2a] px-4 py-2.5 text-[14px] text-white/45">Coming soon</span>
            )}
          </div>
        ))}
      </div>
    </ToolSection>
  );
}

export function ToolCta({ title, accent, body }: { title: string; accent: string; body: string }) {
  return (
    <section className="py-20 md:py-[120px]">
      <Container className="text-center">
        <Image src={logo} alt="" width={56} height={56} className="mx-auto h-14 w-14 object-contain" />
        <h2 className="mt-6 text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-white md:text-[56px]">
          {title} <Accent>{accent}</Accent>
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[18px] leading-[28px] text-white/50">{body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={DEMO_URL} className={pillButton}>
            Book a demo
          </a>
          <a
            href={STUDIO_URL}
            className="inline-flex h-[50px] items-center justify-center rounded-2xl border border-[#464646] bg-gradient-to-b from-[#373737] to-[#121212] px-6 text-[16px] font-medium text-white transition-[filter] hover:brightness-125"
          >
            Try HypeOn free
          </a>
        </div>
        <p className="mt-4 text-[14px] text-white/35">No credit card or sign-up required.</p>
      </Container>
    </section>
  );
}
