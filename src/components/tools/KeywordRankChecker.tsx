'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Accent, Container, DEMO_URL } from '@/components/home/ui';
import { countryName } from '@/lib/tools/countries';
import { isSameSite } from '@/lib/tools/domain';
import type { OrganicResult } from '@/lib/tools/serper';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { CountrySelect, inputClass, submitClass, useToolTarget } from './ui';

type RankResponse = {
  domain: string;
  keyword: string;
  country: string;
  position: number | null;
  url: string | null;
  depth: number;
  top: OrganicResult[];
};

const ease = [0.22, 1, 0.36, 1] as const;

/** What visitors see before they run the tool. Fictional site, illustrative ranking. */
const EXAMPLE: RankResponse = {
  domain: 'stridefit.co',
  keyword: 'best running shoes for flat feet',
  country: 'United States',
  position: 4,
  url: 'https://stridefit.co/guides/running-shoes-flat-feet',
  depth: 10,
  top: [
    { position: 1, title: 'The best running shoes for flat feet, tested', domain: 'runnersworld.com', url: '' },
    { position: 2, title: 'Running shoes for flat feet: what podiatrists recommend', domain: 'healthline.com', url: '' },
    { position: 3, title: 'Shop stability running shoes', domain: 'brooksrunning.com', url: '' },
    { position: 4, title: 'Flat feet? How to choose a running shoe that works', domain: 'stridefit.co', url: '' },
    { position: 5, title: 'Best shoes for flat feet, according to experts', domain: 'nytimes.com', url: '' },
  ],
};

export default function KeywordRankChecker() {
  const { domain, setDomain, country, setCountry } = useToolTarget();
  const { ref: captchaRef, getToken } = useTurnstile();
  const resultRef = useRef<HTMLDivElement>(null);

  const [keyword, setKeyword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RankResponse | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!domain.trim()) return setError('Enter a domain, like example.com.');
    if (keyword.trim().length < 2) return setError('Type the keyword your customers search for.');
    if (!country) return setError('Choose the country to check.');
    setError(null);
    setBusy(true);
    trackTool('free_tool_run', { tool: 'keyword-rank-checker' });
    try {
      const data = await postTool<RankResponse>('/api/tools/rank-check', { domain, keyword, country }, await getToken());
      setResult(data);
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      setError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const shown = result ?? EXAMPLE;

  return (
    <section className="relative overflow-hidden pb-10 pt-[120px] md:pt-[160px]">
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">Free tool 02</p>
          <h1 className="mt-4 text-[40px] font-medium leading-[1.08] tracking-[-0.03em] text-white md:text-[64px]">
            Free keyword rank <Accent>checker.</Accent>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-[28px] text-white/55 md:text-[20px] md:leading-[30px]">
            Find where any website ranks on Google for a keyword in your country, and see exactly who holds the
            spots above it today.
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-9 flex max-w-[860px] flex-col gap-3 md:flex-row">
            <input
              aria-label="Domain"
              placeholder="Domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              autoComplete="url"
              inputMode="url"
              className={`${inputClass} md:w-[200px]`}
            />
            <input
              aria-label="Keyword"
              placeholder="Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              maxLength={100}
              className={`${inputClass} md:flex-1`}
            />
            <CountrySelect value={country} onChange={setCountry} className="md:w-[190px]" />
            <button type="submit" disabled={busy} className={submitClass}>
              {busy ? 'Checking…' : 'Check ranking'}
            </button>
          </form>
          <div ref={captchaRef} className="mt-4 flex justify-center empty:hidden" />
          <p className="mt-4 text-[14px] text-white/40">Free, no sign-up. Checks the live Google top 30.</p>
          {error && (
            <p
              role="alert"
              className="mx-auto mt-4 max-w-[620px] rounded-2xl border border-[#ff8f9c]/25 bg-[#ff8f9c]/10 px-4 py-3 text-[15px] text-[#ffb3bc]"
            >
              {error}
            </p>
          )}
        </motion.div>

        <motion.div
          ref={resultRef}
          key={result ? `${result.domain}-${result.keyword}` : 'example'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#161616]/90 backdrop-blur md:mt-20"
        >
          {/* window bar */}
          <div className="flex items-center gap-3 border-b border-[#2a2a2a] px-5 py-3.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </span>
            <p className="truncate text-[14px] text-white/50">
              Google · “{shown.keyword}” · {shown.country || countryName(country) || ''}
            </p>
            {!result && (
              <span className="ml-auto shrink-0 rounded-md border border-white/10 px-2 py-0.5 text-[12px] text-white/40">
                Example
              </span>
            )}
          </div>

          {/* headline */}
          <div className="flex flex-col gap-4 border-b border-[#2a2a2a] px-5 py-7 md:flex-row md:items-center md:gap-8 md:px-7">
            <p
              className={`shrink-0 text-[64px] font-medium leading-none tracking-[-0.04em] ${
                shown.position ? 'text-white' : 'text-[#ff8f9c]'
              }`}
            >
              {shown.position ? `#${shown.position}` : '—'}
            </p>
            <div className="min-w-0">
              <p className="text-[20px] font-medium leading-[1.3] text-white md:text-[24px]">
                {shown.position
                  ? `${shown.domain} ranks #${shown.position} for “${shown.keyword}”.`
                  : `${shown.domain} is not in the top ${shown.depth || 30} for “${shown.keyword}”.`}
              </p>
              {shown.url ? (
                <a
                  href={shown.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-2 block truncate text-[15px] text-white/45 hover:text-white/70"
                >
                  {shown.url}
                </a>
              ) : (
                <p className="mt-2 text-[15px] text-white/45">These sites hold the first page instead.</p>
              )}
            </div>
          </div>

          {/* top results */}
          <div className="px-5 pb-3 pt-5 md:px-7">
            <p className="text-[14px] text-white/45">
              Who ranks today: the top {shown.top.length} organic results in {shown.country}.
            </p>
            <ol className="mt-3">
              {shown.top.map((r) => {
                const you = isSameSite(r.domain, shown.domain);
                return (
                  <li
                    key={`${r.position}-${r.url || r.domain}`}
                    className="flex items-center gap-4 border-b border-[#2a2a2a] py-3.5 last:border-b-0"
                  >
                    <span className="w-6 shrink-0 text-[15px] tabular-nums text-white/35">{r.position}</span>
                    <span className={`min-w-0 flex-1 truncate text-[16px] ${you ? 'text-white' : 'text-white/85'}`}>
                      {r.title || r.domain}
                    </span>
                    {you && (
                      <span className="shrink-0 rounded-md border border-[#00da7f]/30 bg-[#00da7f]/10 px-2 py-0.5 text-[12px] font-medium text-[#00da7f]">
                        You
                      </span>
                    )}
                    <span className="hidden shrink-0 text-[14px] text-white/45 sm:block">{r.domain}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {result && (
            <div className="flex flex-col gap-4 border-t border-[#2a2a2a] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
              <p className="text-[16px] text-white/60">
                {result.position && result.position <= 3
                  ? 'You are in the top 3. Now make sure AI assistants cite you too.'
                  : 'Want to move up? HypeOn builds the pages that win these searches.'}
              </p>
              <a href={DEMO_URL} className={`${submitClass} h-[46px] text-[15px]`}>
                Rank higher <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
