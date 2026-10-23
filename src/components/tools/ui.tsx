'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

import { COUNTRIES } from '@/lib/tools/countries';
import type { Verdict } from '@/lib/tools/engines';

/*
 * Form controls and verdict styles shared by the free tools. The tool pages
 * are dark, using the home page's dark tokens:
 *   bg #121212 · card #161616 · hairline #2a2a2a · muted text white/50 · accent #00da7f
 */

export const inputClass =
  'h-[52px] w-full rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] px-5 text-[16px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40';

/** Hypeon's white button (the home hero's secondary action), used as the tools' primary action. */
export const submitClass =
  'inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-[16px] font-medium text-[#121212] transition-colors hover:bg-[#ececec] disabled:cursor-not-allowed disabled:opacity-60';

export function CountrySelect({
  value,
  onChange,
  className = '',
}: {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        aria-label="Country"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-10 [&>option]:bg-[#1a1a1a] [&>option]:text-white ${value ? '' : 'text-white/35'}`}
      >
        <option value="" disabled>
          Select country
        </option>
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
    </div>
  );
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  cited: 'Cited',
  mentioned: 'Mentioned',
  not_found: 'Not mentioned',
  error: 'Unavailable',
};

const VERDICT_TEXT: Record<Verdict, string> = {
  cited: 'text-[#00da7f]',
  mentioned: 'text-white/55',
  not_found: 'text-[#ff8f9c]',
  error: 'text-white/30',
};

/** Plain coloured verdict, as used in the results table. `idle` is a prompt not checked yet. */
export function VerdictText({ verdict }: { verdict: Verdict | 'pending' | 'idle' }) {
  if (verdict === 'idle') return <span className="text-[15px] text-white/25">—</span>;
  if (verdict === 'pending') return <Loader2 className="h-4 w-4 animate-spin text-white/30" aria-label="Checking" />;
  return <span className={`text-[15px] ${VERDICT_TEXT[verdict]}`}>{VERDICT_LABEL[verdict]}</span>;
}

const VERDICT_BADGE: Record<Verdict, string> = {
  cited: 'border-[#00da7f]/30 bg-[#00da7f]/10 text-[#00da7f]',
  mentioned: 'border-white/15 bg-white/[0.06] text-white/80',
  not_found: 'border-[#ff8f9c]/30 bg-[#ff8f9c]/10 text-[#ff8f9c]',
  error: 'border-white/10 bg-white/[0.04] text-white/40',
};

/** Small boxed verdict label, as used in the legend and the live answers. */
export function VerdictBadge({ verdict }: { verdict: Verdict | 'pending' }) {
  if (verdict === 'pending') {
    return (
      <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 px-2 text-[13px] text-white/40">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Asking
      </span>
    );
  }
  return (
    <span className={`inline-flex h-7 items-center rounded-md border px-2 text-[13px] font-medium ${VERDICT_BADGE[verdict]}`}>
      {VERDICT_LABEL[verdict]}
    </span>
  );
}

/** The domain and country the visitor last checked, shared by every tool form on a page. */
type ToolTarget = { domain: string; setDomain: (d: string) => void; country: string; setCountry: (c: string) => void };

const TargetContext = createContext<ToolTarget | null>(null);

export function ToolTargetProvider({ children }: { children: ReactNode }) {
  const [domain, setDomain] = useState('');
  const [country, setCountry] = useState('');
  return (
    <TargetContext.Provider value={{ domain, setDomain, country, setCountry }}>{children}</TargetContext.Provider>
  );
}

export function useToolTarget(): ToolTarget {
  const ctx = useContext(TargetContext);
  if (!ctx) throw new Error('useToolTarget must be used inside ToolTargetProvider');
  return ctx;
}
