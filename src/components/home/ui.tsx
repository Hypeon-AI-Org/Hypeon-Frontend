import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

export const STUDIO_URL = 'https://app.hypeon.ai/studio/login';
export const DEMO_URL = 'https://calendly.com/yash-hypeon/30min';

/*
 * Design tokens, measured off the reference layout:
 *   light bg #ededed · dark bg #121212 · body text #545454 · hairline #dddddd
 *   dark card border #2a2a2a · button border #464646 · accent green #00da7f
 *   content column 1000px · card radius 16px · grid gap 24px · section padding 120px
 */

/** Shared 1000px content column (+16px gutters on phones). */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1032px] px-4 ${className}`}>{children}</div>;
}

/** The serif accent used on one phrase per heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="font-accent italic font-normal tracking-normal whitespace-nowrap max-[359px]:whitespace-normal">{children}</span>;
}

/** Section heading: 44/52.8 on desktop, 32/38.4 on phones, regular weight. */
export function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[32px] font-normal leading-[1.2] tracking-[-0.01em] md:text-[44px] ${className}`}>
      {children}
    </h2>
  );
}

/** Dark gradient button: #373737 → #121212, 1px #464646 border, 16px radius. */
export function DarkButton({
  href = STUDIO_URL,
  children = 'Create Your AI Ad',
  size = 'md',
  className = '',
}: {
  href?: string;
  children?: ReactNode;
  size?: 'md' | 'lg';
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#464646] bg-gradient-to-b from-[#373737] to-[#121212] px-6 font-medium text-white shadow-[0_3.667px_11px_rgba(16,24,40,0.1),0_3.667px_7.333px_rgba(16,24,40,0.06)] transition-[filter] duration-200 hover:brightness-125 ${
        size === 'lg' ? 'text-[18px]' : 'text-[16px]'
      } ${className}`}
    >
      {children}
      <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" strokeWidth={1.8} />
    </a>
  );
}

/** White button (the hero's secondary action). */
export function LightButton({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex h-[50px] items-center justify-center gap-2 rounded-2xl bg-white px-6 text-[18px] font-medium text-[#121212] shadow-[0_3.667px_11px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#f6f6f6] ${className}`}
    >
      {children}
    </a>
  );
}

/** Dark panel: black with a white/10 sheen at the bottom and a #2a2a2a hairline. */
export function DarkCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#2a2a2a] bg-black bg-[linear-gradient(rgba(0,0,0,0),rgba(255,255,255,0.1)_98%)] ${className}`}
    >
      {children}
    </div>
  );
}

/** 1px gradient hairline frame used around the small ad cards and tabs. */
export function GradientFrame({
  children,
  className = '',
  inner = '',
}: {
  children: ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <div className={`rounded-2xl bg-[linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.08))] p-px ${className}`}>
      <div className={`h-full rounded-[15px] bg-[#121212] ${inner}`}>{children}</div>
    </div>
  );
}

/** Green status pill (#00da7f on a 7% tint). */
export function GreenPill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-[rgba(0,218,127,0.07)] px-1.5 py-0.5 text-[11px] font-medium uppercase md:text-[10px] tracking-wide text-[#00da7f] ${className}`}
    >
      {children}
    </span>
  );
}
