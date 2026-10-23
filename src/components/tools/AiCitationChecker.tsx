'use client';

import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

import { Accent, Container, DEMO_URL } from '@/components/home/ui';
import { isSameSite } from '@/lib/tools/domain';
import { ENGINES, type EngineResult, type Verdict } from '@/lib/tools/engines';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { CountrySelect, inputClass, submitClass, useToolTarget, VerdictText } from './ui';

type PromptSet = { domain: string; brand: string; industry: string; prompts: string[] };
type CheckResponse = { results: EngineResult[] };
/** `queued` rows are being (or have been) checked; the rest wait for "check more". */
type Row = { prompt: string; results: EngineResult[] | null; queued: boolean };

/** Prompts checked at once; each check fans out to four engines. */
const CONCURRENCY = 2;
/** Prompts checked straight away; the others cost money only if the visitor asks. */
const AUTO_CHECK = 3;

const ease = [0.22, 1, 0.36, 1] as const;

/** What visitors see before they run the tool. Fictional brand, illustrative verdicts. */
const EXAMPLE = {
  title: 'Skincare · United Kingdom',
  rows: [
    { prompt: 'best vitamin c serum for dull skin', verdicts: ['cited', 'mentioned', 'cited', 'cited'] },
    { prompt: 'cruelty free skincare brands uk', verdicts: ['not_found', 'mentioned', 'not_found', 'not_found'] },
    { prompt: 'is lumen skin good for sensitive skin', verdicts: ['mentioned', 'mentioned', 'mentioned', 'mentioned'] },
    { prompt: 'affordable skincare routine for beginners', verdicts: ['cited', 'mentioned', 'cited', 'cited'] },
    { prompt: 'vegan moisturiser that actually works', verdicts: ['not_found', 'mentioned', 'not_found', 'not_found'] },
  ] as { prompt: string; verdicts: Verdict[] }[],
};

const GRID = 'md:grid-cols-[minmax(0,1fr)_repeat(4,120px)]';

export default function AiCitationChecker() {
  const { domain, setDomain, country, setCountry } = useToolTarget();
  const { ref: captchaRef, getToken } = useTurnstile();
  const tableRef = useRef<HTMLDivElement>(null);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [set, setSet] = useState<PromptSet | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  async function checkRows(found: PromptSet, indices: number[]) {
    setRows((r) => r.map((row, j) => (indices.includes(j) ? { ...row, queued: true } : row)));
    const queue = [...indices];
    const worker = async () => {
      for (let i = queue.shift(); i !== undefined; i = queue.shift()) {
        const index = i;
        try {
          const data = await postTool<CheckResponse>(
            '/api/tools/ai-citation-check',
            { domain: found.domain, brand: found.brand, country, prompt: found.prompts[index] },
            await getToken()
          );
          setRows((r) => r.map((row, j) => (j === index ? { ...row, results: data.results } : row)));
        } catch (e) {
          const failed = ENGINES.map((en) => ({ engine: en.id, verdict: 'error' as const, answer: '', sources: [] }));
          setRows((r) => r.map((row, j) => (j === index ? { ...row, results: failed } : row)));
          if (e instanceof ToolError) setError(e.message);
        }
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!domain.trim()) return setError('Enter your domain, like example.com.');
    if (!country) return setError('Choose the country your customers are in.');
    setError(null);
    setBusy(true);
    setOpen(null);
    trackTool('free_tool_run', { tool: 'ai-citation-checker' });
    try {
      const found = await postTool<PromptSet>('/api/tools/ai-prompts', { domain, country }, await getToken());
      setSet(found);
      setRows(found.prompts.map((prompt) => ({ prompt, results: null, queued: false })));
      tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await checkRows(found, found.prompts.map((_, i) => i).slice(0, AUTO_CHECK));
    } catch (err) {
      setError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function checkMore() {
    if (!set) return;
    setBusy(true);
    trackTool('free_tool_check_more', { tool: 'ai-citation-checker' });
    await checkRows(set, rows.flatMap((r, i) => (r.queued ? [] : [i])));
    setBusy(false);
  }

  const unchecked = rows.filter((r) => !r.queued).length;
  const done = set !== null && !busy && rows.every((r) => r.results || !r.queued);
  const all = rows.flatMap((r) => r.results ?? []);
  const cited = all.filter((r) => r.verdict === 'cited').length;
  const mentioned = all.filter((r) => r.verdict === 'mentioned').length;

  return (
    <section className="relative overflow-hidden pb-10 pt-[120px] md:pt-[160px]">
      {/* soft glow behind the results table */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[520px] h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,218,127,0.10),rgba(120,90,255,0.05)_60%,transparent)] blur-2xl"
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">Free tool 01</p>
          <h1 className="mt-4 text-[40px] font-medium leading-[1.08] tracking-[-0.03em] text-white md:text-[64px]">
            Free AI citation <Accent>checker.</Accent>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-[28px] text-white/55 md:text-[20px] md:leading-[30px]">
            Find the questions buyers ask AI about your market, then see whether ChatGPT, Claude, Gemini and
            Perplexity cite your website in the answer, and who they send people to instead.
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-9 flex max-w-[760px] flex-col gap-3 sm:flex-row">
            <input
              aria-label="Your domain"
              placeholder="Your domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              autoComplete="url"
              inputMode="url"
              className={`${inputClass} sm:flex-1`}
            />
            <CountrySelect value={country} onChange={setCountry} className="sm:w-[200px]" />
            <button type="submit" disabled={busy} className={submitClass}>
              {busy ? 'Checking…' : 'Find the prompts'}
            </button>
          </form>
          <div ref={captchaRef} className="mt-4 flex justify-center empty:hidden" />
          <p className="mt-4 text-[14px] text-white/40">Free, no sign-up. Every answer is checked live with web search on.</p>
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
          ref={tableRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
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
              Prompts people ask AI · {set ? `${set.brand}${set.industry ? ` · ${set.industry}` : ''}` : EXAMPLE.title}
            </p>
            {!set && (
              <span className="ml-auto shrink-0 rounded-md border border-white/10 px-2 py-0.5 text-[12px] text-white/40">
                Example
              </span>
            )}
          </div>

          <div className="px-2 pb-2 md:px-4">
            <div className={`hidden gap-4 border-b border-[#2a2a2a] px-3 py-4 text-[14px] text-white/45 md:grid ${GRID}`}>
              <span>Prompt</span>
              {ENGINES.map((e) => (
                <span key={e.id}>{e.name}</span>
              ))}
            </div>

            {set
              ? rows.map((row, i) => (
                  <ResultRow
                    key={row.prompt}
                    row={row}
                    domain={set.domain}
                    open={open === i}
                    onToggle={() => setOpen(open === i ? null : i)}
                  />
                ))
              : EXAMPLE.rows.map((row) => (
                  <div
                    key={row.prompt}
                    className={`grid gap-3 border-b border-[#2a2a2a] px-3 py-4 last:border-b-0 md:items-center md:gap-4 ${GRID}`}
                  >
                    <span className="text-[16px] text-white">“{row.prompt}”</span>
                    <Verdicts verdicts={row.verdicts} />
                  </div>
                ))}
          </div>

          {done && (
            <div className="flex flex-col gap-4 border-t border-[#2a2a2a] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
              <p className="text-[16px] text-white/60">
                <span className="text-white">{set?.brand}</span> is cited in{' '}
                <span className="text-[#00da7f]">
                  {cited} of {all.length}
                </span>{' '}
                answers and mentioned in {mentioned}. Open a prompt to see who AI cites instead.
              </p>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {unchecked > 0 && (
                  <button
                    type="button"
                    onClick={checkMore}
                    className="inline-flex h-[46px] items-center justify-center rounded-2xl border border-[#464646] px-5 text-[15px] font-medium text-white transition-colors hover:bg-white/[0.06]"
                  >
                    Check {unchecked} more
                  </button>
                )}
                <a href={DEMO_URL} className={`${submitClass} h-[46px] text-[15px]`}>
                  Get cited by AI <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

function Verdicts({ verdicts }: { verdicts: (Verdict | 'pending' | 'idle')[] }) {
  return (
    <span className="grid grid-cols-2 gap-x-4 gap-y-1.5 md:contents">
      {ENGINES.map((e, i) => (
        // Phones: engine name above its verdict, two engines per row; md+: one table column each.
        <span key={e.id} className="flex flex-col items-start gap-0.5 md:block">
          <span className="text-[12px] text-white/35 md:hidden">{e.name}</span>
          <VerdictText verdict={verdicts[i]} />
        </span>
      ))}
    </span>
  );
}

function ResultRow({ row, domain, open, onToggle }: { row: Row; domain: string; open: boolean; onToggle: () => void }) {
  const results = ENGINES.map((e) => row.results?.find((r) => r.engine === e.id));
  return (
    <div className="border-b border-[#2a2a2a] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        disabled={!row.results}
        aria-expanded={open}
        className={`grid w-full gap-3 rounded-xl px-3 py-4 text-left transition-colors hover:bg-white/[0.03] disabled:hover:bg-transparent md:items-center md:gap-4 ${GRID}`}
      >
        <span className="flex items-start gap-2 text-[16px] text-white">
          <ChevronDown
            className={`mt-1 h-4 w-4 shrink-0 text-white/30 transition-transform ${open ? 'rotate-180' : ''} ${
              row.results ? '' : 'opacity-0'
            }`}
          />
          “{row.prompt}”
        </span>
        <Verdicts verdicts={results.map((r) => r?.verdict ?? (row.queued ? 'pending' : 'idle'))} />
      </button>

      <AnimatePresence initial={false}>
        {open && row.results && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-2 px-3 pb-4 sm:grid-cols-2 md:grid-cols-4">
              {ENGINES.map((e, i) => {
                const others = [...new Set((results[i]?.sources ?? []).map((s) => s.domain))].filter(
                  (d) => !isSameSite(d, domain)
                );
                return (
                  <div key={e.id} className="rounded-xl border border-[#2a2a2a] bg-[#121212] p-3">
                    <p className="text-[12px] uppercase tracking-[0.14em] text-white/35">{e.name} cited</p>
                    <p className="mt-1.5 text-[14px] leading-[21px] text-white/70">
                      {others.length
                        ? others.slice(0, 4).join(' · ')
                        : results[i]?.verdict === 'cited'
                          ? 'Only your site'
                          : 'No sources returned'}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
