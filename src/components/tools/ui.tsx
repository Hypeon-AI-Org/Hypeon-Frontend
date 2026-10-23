'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

import { COUNTRIES } from '@/lib/tools/countries';
import type { Verdict } from '@/lib/tools/engines';

/*
 * Form controls, cards and verdict styles shared by the free tools, in the
 * site's light theme (see components/home/ui.tsx):
 *   page #ededed · white cards · hairline #e4e4e4 · ink #121212 · body #545454 · accent #00da7f
 */

export const inputClass =
  'h-[52px] w-full rounded-xl border border-[#dcdcdc] bg-white px-4 text-[16px] text-[#121212] placeholder:text-[#9a9a9a] outline-none transition-[border-color,box-shadow] focus:border-[#121212] focus:shadow-[0_0_0_4px_rgba(18,18,18,0.06)]';

/** Hypeon's dark gradient button (the home hero's primary action). */
export const submitClass =
  'inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-[#464646] bg-gradient-to-b from-[#373737] to-[#121212] px-6 text-[16px] font-medium text-white shadow-[0_3.667px_11px_rgba(16,24,40,0.1)] transition-[filter] duration-200 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100';

/** Small uppercase label used above lists inside cards. */
export const labelClass = 'text-[12px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]';

/** Input for forms on the dark bands (the live check). */
export const darkInputClass =
  'h-[52px] w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-[16px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40';

export function CountrySelect({
  value,
  onChange,
  className = '',
  dark = false,
}: {
  value: string;
  onChange: (code: string) => void;
  className?: string;
  dark?: boolean;
}) {
  const field = dark ? `${darkInputClass} [&>option]:bg-[#1a1a1a] [&>option]:text-white` : inputClass;
  const empty = dark ? 'text-white/35' : 'text-[#9a9a9a]';
  return (
    <div className={`relative ${className}`}>
      <select
        aria-label="Country"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} appearance-none pr-10 ${value ? '' : empty}`}
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
      <ChevronDown
        className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 ${dark ? 'text-white/45' : 'text-[#8a8a8a]'}`}
      />
    </div>
  );
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  cited: 'Cited',
  mentioned: 'Mentioned',
  not_found: 'Not mentioned',
  error: 'Unavailable',
};

const VERDICT_STYLE: Record<Verdict, { dot: string; badge: string }> = {
  cited: { dot: 'bg-[#00da7f]', badge: 'bg-[#e3f9ee] text-[#007a45]' },
  mentioned: { dot: 'bg-[#f2a93b]', badge: 'bg-[#fdf2df] text-[#94600b]' },
  not_found: { dot: 'bg-[#e5484d]', badge: 'bg-[#fdeaea] text-[#b4232a]' },
  error: { dot: 'bg-[#c4c4c4]', badge: 'bg-[#f1f1f1] text-[#8a8a8a]' },
};

/** Compact verdict pill with a status dot, as used in results tables. `idle` is a prompt not checked yet. */
export function VerdictText({ verdict }: { verdict: Verdict | 'pending' | 'idle' }) {
  if (verdict === 'idle') return <span className="text-[15px] text-[#c4c4c4]">—</span>;
  if (verdict === 'pending') return <Loader2 className="h-4 w-4 animate-spin text-[#b0b0b0]" aria-label="Checking" />;
  const s = VERDICT_STYLE[verdict];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] font-medium ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {VERDICT_LABEL[verdict]}
    </span>
  );
}

/** Verdict pill for answer cards; shows a spinner while the assistant is still answering. */
export function VerdictBadge({ verdict }: { verdict: Verdict | 'pending' }) {
  if (verdict === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[13px] text-[#8a8a8a]">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Asking
      </span>
    );
  }
  return <VerdictText verdict={verdict} />;
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
