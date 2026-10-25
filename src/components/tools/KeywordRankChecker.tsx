'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Search } from 'lucide-react';

import { Container, DEMO_URL } from '@/components/home/ui';
import { isSameSite } from '@/lib/tools/domain';
import type { OrganicResult } from '@/lib/tools/serper';
import { ResultShell, ToolHero } from './sections';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { ToolProgress } from './ToolProgress';
import { CountrySelect, inputClass, labelClass, submitClass, useToolTarget } from './ui';

type RankResponse = {
  domain: string;
  keyword: string;
  country: string;
  position: number | null;
  url: string | null;
  title: string | null;
  depth: number;
  top: OrganicResult[];
};

const ease = [0.22, 1, 0.36, 1] as const;
/** The rank meter runs over the depth the tool searches. */
const METER_MAX = 30;
const COLLAPSED = 10;

/** What visitors see before they run the tool. Fictional site, illustrative ranking. */
const EXAMPLE: RankResponse = {
  domain: 'stridefit.co',
  keyword: 'best running shoes for flat feet',
  country: 'United States',
  position: 4,
  url: 'https://stridefit.co/guides/running-shoes-flat-feet',
  title: null,
  depth: 10,
  top: [
    { position: 1, title: 'The best running shoes for flat feet, tested', domain: 'runnersworld.com', url: '' },
    { position: 2, title: 'Running shoes for flat feet: what podiatrists recommend', domain: 'healthline.com', url: '' },
    { position: 3, title: 'Shop stability running shoes', domain: 'brooksrunning.com', url: '' },
    { position: 4, title: 'Flat feet? How to choose a running shoe that works', domain: 'stridefit.co', url: '' },
    { position: 5, title: 'Best shoes for flat feet, according to experts', domain: 'nytimes.com', url: '' },
  ],
};

function Favicon({ domain }: { domain: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      className="h-4 w-4 shrink-0 rounded-sm"
    />
  );
}

/**
 * A 1-30 track split into Google's three pages, with a marker at the domain's
 * position; a domain outside the top 30 gets a red marker past the end.
 */
function RankMeter({ position }: { position: number | null }) {
  const pct = position ? ((Math.min(position, METER_MAX) - 0.5) / METER_MAX) * 100 : 100;
  return (
    <div className="w-full pr-2">
      <div className="relative h-2.5 rounded-full bg-[#f1f1f1]">
        <div className="absolute inset-y-0 left-0 w-1/3 rounded-l-full bg-[#00da7f]/25" />
        <motion.span
          initial={{ left: '0%', opacity: 0 }}
          animate={{ left: `${pct}%`, opacity: 1 }}
          transition={{ duration: 0.9, ease }}
          className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.25)] ${
            position ? 'bg-[#121212]' : 'bg-[#e5484d]'
          }`}
        />
      </div>
      <div className="mt-2 grid grid-cols-3 text-[12px] text-[#8a8a8a]">
        <span>Page 1</span>
        <span className="text-center">Page 2</span>
        <span className={`text-right ${position ? '' : 'font-medium text-[#b4232a]'}`}>{position ? 'Page 3' : 'Beyond page 3'}</span>
      </div>
    </div>
  );
}

function ResultLine({ r, you }: { r: { position: number; title: string; domain: string }; you: boolean }) {
  return (
    <li className={`flex items-center gap-4 rounded-xl px-3 py-3 ${you ? 'bg-[#e3f9ee]' : ''}`}>
      <span className={`w-6 shrink-0 text-[15px] tabular-nums ${you ? 'font-medium text-[#007a45]' : 'text-[#9a9a9a]'}`}>
        {r.position}
      </span>
      <Favicon domain={r.domain} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px] text-[#121212]">{r.title || r.domain}</span>
        <span className="mt-0.5 block truncate text-[13px] text-[#8a8a8a]">{r.domain}</span>
      </span>
      {you && (
        <span className="shrink-0 rounded-full bg-[#121212] px-2.5 py-1 text-[12px] font-medium text-white">You</span>
      )}
    </li>
  );
}

export default function KeywordRankChecker() {
  const { domain, setDomain, country, setCountry } = useToolTarget();
  const { ref: captchaRef, getToken, ready, failed } = useTurnstile();
  const resultRef = useRef<HTMLDivElement>(null);

  const [keyword, setKeyword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RankResponse | null>(null);
  const [showAll, setShowAll] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!domain.trim()) return setError('Enter a domain, like example.com.');
    if (keyword.trim().length < 2) return setError('Type the keyword your customers search for.');
    if (!country) return setError('Choose the country to check.');
    setError(null);
    setBusy(true);
    setShowAll(false);
    trackTool('free_tool_run', { tool: 'keyword-rank-checker' });
    try {
      const data = await postTool<RankResponse>('/api/tools/rank-check', { domain, keyword, country }, await getToken());
      setResult(data);
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      setError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const shown = result ?? EXAMPLE;
  const page = shown.position ? Math.ceil(shown.position / 10) : null;
  /** Ten rows first; the rest on request, so a long list does not swamp the summary. */
  const visible = showAll ? shown.top : shown.top.slice(0, COLLAPSED);
  const own = shown.top.find((r) => isSameSite(r.domain, shown.domain));
  const toBeat = shown.top.filter((r) => !isSameSite(r.domain, shown.domain)).slice(0, 3);

  return (
    <section className="pb-6 pt-[112px] md:pt-[150px]">
      <Container>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <ToolHero
            slug="keyword-rank-checker"
            title="Where do you"
            accent="rank on Google?"
            sub="Check any website’s live Google position for a keyword in your country, and see exactly who holds the spots above you today."
            points={['Live Google results', '40+ countries', 'Top 30 checked']}
          >
            <form onSubmit={onSubmit}>
              <p className="text-[18px] font-medium text-[#121212]">Find a ranking</p>
              <p className="mt-1 text-[14px] text-[#8a8a8a]">Results in a few seconds.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_200px_auto]">
              <div className="relative">
                <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
                <input
                  aria-label="Domain"
                  placeholder="yourbrand.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  autoComplete="url"
                  inputMode="url"
                  className={`${inputClass} pl-10`}
                />
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
                <input
                  aria-label="Keyword"
                  placeholder="best running shoes"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  maxLength={100}
                  className={`${inputClass} pl-10`}
                />
              </div>
              <CountrySelect value={country} onChange={setCountry} />
              <button type="submit" disabled={busy || !ready} className={`${submitClass} w-full lg:w-auto`}>
                {busy ? 'Searching Google…' : ready ? 'Find my ranking' : 'Verifying…'}
                {ready && !busy && <ArrowRight className="h-4 w-4" />}
              </button>
              </div>
              <ToolProgress
                active={busy}
                expected={6}
                steps={[
                  { at: 0, label: 'Searching Google live' },
                  { at: 2, label: 'Reading the top 30 results' },
                  { at: 4, label: 'Finding your position' },
                ]}
              />
              <div ref={captchaRef} className="mt-4 empty:hidden" />
              {(error || (failed && !ready)) && (
                <p role="alert" className="mt-4 rounded-xl bg-[#fdeaea] px-4 py-3 text-[14px] text-[#b4232a]">
                  {error ?? 'The security check could not load. Please refresh the page.'}
                </p>
              )}
            </form>
          </ToolHero>
        </motion.div>

        <motion.div
          ref={resultRef}
          key={result ? `${result.domain}-${result.keyword}` : 'example'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 scroll-mt-28 md:mt-20"
        >
          <ResultShell
            icon={Search}
            title={`“${shown.keyword}”`}
            meta={`Google · ${shown.country}`}
            example={!result}
            footer={
              result ? (
                <>
                  <p className="text-[15px] text-[#545454]">
                    {result.position && result.position <= 3
                      ? 'You are in the top 3. Now make sure AI assistants recommend you too.'
                      : 'Want to move up? HypeOn builds the pages that win these searches.'}
                  </p>
                  <a href={DEMO_URL} className={`${submitClass} h-[46px] text-[15px]`}>
                    Rank higher <ArrowRight className="h-4 w-4" />
                  </a>
                </>
              ) : undefined
            }
          >
            <div className="grid gap-8 p-5 md:grid-cols-[300px_minmax(0,1fr)] md:p-6">
              {/* position summary: stays in view beside the long results list */}
              <div className="md:sticky md:top-28 md:self-start">
                <p className={labelClass}>Your position</p>
                {shown.position ? (
                  <>
                    <div className="mt-3 flex items-end gap-3">
                      <span className="text-[72px] font-medium leading-none tracking-[-0.05em] text-[#121212]">
                        #{shown.position}
                      </span>
                      {page && <span className="pb-2 text-[15px] text-[#8a8a8a]">page {page}</span>}
                    </div>
                    <p className="mt-3 text-[16px] leading-[24px] text-[#333333]">
                      <span className="font-medium text-[#121212]">{shown.domain}</span> ranks #{shown.position} for
                      this search.
                    </p>
                  </>
                ) : (
                  <>
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#fdeaea] px-3 py-1 text-[13px] font-medium text-[#b4232a]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e5484d]" />
                      Not in the top {shown.depth || METER_MAX}
                    </span>
                    <p className="mt-3 text-[30px] font-medium leading-[1.15] tracking-[-0.02em] text-[#121212]">Not ranking yet</p>
                    <p className="mt-2 text-[15px] leading-[24px] text-[#545454]">
                      Searchers in {shown.country} won&rsquo;t find{' '}
                      <span className="font-medium text-[#121212]">{shown.domain}</span> for this keyword. The sites on
                      the right win it instead.
                    </p>
                  </>
                )}
                <div className="mt-6">
                  <RankMeter position={shown.position} />
                </div>
                {shown.url && (
                  <a
                    href={shown.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-6 block truncate rounded-xl bg-[#f5f5f5] px-3 py-2.5 text-[13px] text-[#545454] hover:text-[#121212]"
                    title={shown.url}
                  >
                    Ranking page: {shown.url.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {(!shown.position || shown.position > 3) && toBeat.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-[#ececec] p-4">
                    <p className={labelClass}>Top 3 to beat</p>
                    <ul className="mt-3 space-y-2.5">
                      {toBeat.map((r) => (
                        <li key={`${r.position}-${r.domain}`} className="flex items-center gap-2.5 text-[14px] text-[#121212]">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#121212] text-[12px] font-medium text-white">
                            {r.position}
                          </span>
                          <Favicon domain={r.domain} />
                          <span className="truncate">{r.domain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* who ranks */}
              <div className="min-w-0">
                <p className={labelClass}>Who ranks on Google today</p>
                <ol className="mt-2 space-y-0.5">
                  {visible.map((r) => (
                    <ResultLine key={`${r.position}-${r.url || r.domain}`} r={r} you={isSameSite(r.domain, shown.domain)} />
                  ))}
                  {/* Ranked below the rows on screen: show the visitor's own row after a gap. */}
                  {shown.position && shown.position > visible.length && (
                    <>
                      <li aria-hidden className="py-1 text-center text-[15px] tracking-[0.3em] text-[#c4c4c4]">
                        ⋯
                      </li>
                      <ResultLine
                        r={{ position: shown.position, title: own?.title || shown.title || '', domain: shown.domain }}
                        you
                      />
                    </>
                  )}
                </ol>
                {shown.top.length > COLLAPSED && (
                  <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="mt-3 w-full rounded-xl border border-[#e4e4e4] py-2.5 text-[14px] font-medium text-[#121212] transition-colors hover:bg-[#f7f7f7]"
                  >
                    {showAll ? 'Show top 10 only' : `Show positions ${COLLAPSED + 1}–${shown.top.length}`}
                  </button>
                )}
              </div>
            </div>
          </ResultShell>
        </motion.div>
      </Container>
    </section>
  );
}
