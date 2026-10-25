'use client';

import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Globe, Sparkles } from 'lucide-react';

import { Container, DEMO_URL } from '@/components/home/ui';
import { isSameSite } from '@/lib/tools/domain';
import { ENGINES, type EngineResult, type Verdict } from '@/lib/tools/engines';
import { ResultShell, ToolHero } from './sections';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { ToolProgress } from './ToolProgress';
import { CountrySelect, inputClass, labelClass, submitClass, useToolTarget, VerdictText } from './ui';
import { EngineMark } from './visuals';

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
  brand: 'lumenskin.com',
  title: 'Skincare · United Kingdom',
  rows: [
    { prompt: 'best vitamin c serum for dull skin', verdicts: ['cited', 'mentioned', 'cited', 'cited'] },
    { prompt: 'cruelty free skincare brands uk', verdicts: ['not_found', 'mentioned', 'not_found', 'not_found'] },
    { prompt: 'is lumen skin good for sensitive skin', verdicts: ['mentioned', 'mentioned', 'mentioned', 'mentioned'] },
    { prompt: 'affordable skincare routine for beginners', verdicts: ['cited', 'mentioned', 'cited', 'cited'] },
    { prompt: 'vegan moisturiser that actually works', verdicts: ['not_found', 'mentioned', 'not_found', 'not_found'] },
  ] as { prompt: string; verdicts: Verdict[] }[],
};

const GRID = 'md:grid-cols-[minmax(0,1fr)_repeat(4,128px)]';

export default function AiCitationChecker() {
  const { domain, setDomain, country, setCountry } = useToolTarget();
  const { ref: captchaRef, getToken, ready, failed } = useTurnstile();
  const tableRef = useRef<HTMLDivElement>(null);

  const [busy, setBusy] = useState(false);
  /** True while the buyer questions are being found, before any engine is asked. */
  const [finding, setFinding] = useState(false);
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
    setFinding(true);
    try {
      const found = await postTool<PromptSet>('/api/tools/ai-prompts', { domain, country }, await getToken());
      setFinding(false);
      setSet(found);
      setRows(found.prompts.map((prompt) => ({ prompt, results: null, queued: false })));
      tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await checkRows(found, found.prompts.map((_, i) => i).slice(0, AUTO_CHECK));
    } catch (err) {
      setError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setFinding(false);
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
  // Real progress: finding the questions is the first ~10%, then each answered question.
  const queued = rows.filter((r) => r.queued);
  const answered = queued.filter((r) => r.results).length;
  const progress = finding || !queued.length ? 0 : 0.1 + 0.9 * (answered / queued.length);
  const done = set !== null && !busy && rows.every((r) => r.results || !r.queued);
  const all = rows.flatMap((r) => r.results ?? []);
  const cited = all.filter((r) => r.verdict === 'cited').length;
  const mentioned = all.filter((r) => r.verdict === 'mentioned').length;

  return (
    <section className="pb-6 pt-[112px] md:pt-[150px]">
      <Container>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <ToolHero
            slug="ai-citation-checker"
            title="Is AI recommending"
            accent="your brand?"
            sub="Buyers now ask ChatGPT before Google. We find the questions they ask about your market and check, live, whether AI sends them to you or to a competitor."
            points={['ChatGPT, Claude, Gemini & Perplexity', 'Live web answers', 'No sign-up']}
          >
            <form onSubmit={onSubmit}>
              <p className="text-[18px] font-medium text-[#121212]">Scan your brand</p>
              <p className="mt-1 text-[14px] text-[#8a8a8a]">Takes about a minute. We check your top 3 buyer questions.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_240px_auto]">
              <div className="relative">
                <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
                <input
                  aria-label="Your domain"
                  placeholder="yourbrand.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  autoComplete="url"
                  inputMode="url"
                  className={`${inputClass} pl-10`}
                />
              </div>
              <CountrySelect value={country} onChange={setCountry} />
              <button type="submit" disabled={busy || !ready} className={`${submitClass} w-full md:w-auto`}>
                {busy ? 'Scanning…' : ready ? 'Scan my AI visibility' : 'Verifying…'}
                {ready && !busy && <ArrowRight className="h-4 w-4" />}
              </button>
              </div>
              <ToolProgress
                active={busy}
                expected={queued.length > AUTO_CHECK ? 90 : 60}
                fraction={progress}
                steps={[
                  {
                    at: 0,
                    label: !finding && queued.length
                      ? `Asking ChatGPT, Claude, Gemini and Perplexity · ${answered} of ${queued.length} questions done`
                      : 'Finding the questions buyers ask about your market',
                  },
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
          ref={tableRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mt-14 scroll-mt-28 md:mt-20"
        >
          <ResultShell
            icon={Sparkles}
            title={set ? `AI visibility · ${set.brand}` : `AI visibility · ${EXAMPLE.brand}`}
            meta={set ? set.industry || set.domain : EXAMPLE.title}
            example={!set}
            footer={
              done ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="text-[36px] font-medium leading-none tracking-[-0.03em] text-[#121212]">
                      {cited}
                      <span className="text-[18px] text-[#9a9a9a]">/{all.length}</span>
                    </div>
                    <p className="text-[15px] leading-[22px] text-[#545454]">
                      answers cite <span className="font-medium text-[#121212]">{set?.brand}</span>
                      <br />
                      {mentioned} more mention it. Open a question to see who wins instead.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    {unchecked > 0 && (
                      <button
                        type="button"
                        onClick={checkMore}
                        className="inline-flex h-[46px] items-center justify-center rounded-2xl border border-[#d4d4d4] bg-white px-5 text-[15px] font-medium text-[#121212] transition-colors hover:bg-[#f5f5f5]"
                      >
                        Check {unchecked} more
                      </button>
                    )}
                    <a href={DEMO_URL} className={`${submitClass} h-[46px] text-[15px]`}>
                      Get cited by AI <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </>
              ) : undefined
            }
          >
            <div className="px-3 pb-2 md:px-4">
              <div className={`hidden items-center gap-4 border-b border-[#ececec] px-3 py-3.5 md:grid ${GRID}`}>
                <span className={labelClass}>Buyer question</span>
                {ENGINES.map((e) => (
                  <span key={e.id} className="flex items-center gap-2 text-[14px] font-medium text-[#333333]">
                    <EngineMark id={e.id} size={20} />
                    {e.name}
                  </span>
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
                      className={`grid gap-3 border-b border-[#f1f1f1] px-3 py-4 last:border-b-0 md:items-center md:gap-4 ${GRID}`}
                    >
                      <span className="text-[16px] text-[#121212]">“{row.prompt}”</span>
                      <Verdicts verdicts={row.verdicts} />
                    </div>
                  ))}
            </div>
          </ResultShell>
        </motion.div>
      </Container>
    </section>
  );
}

function Verdicts({ verdicts }: { verdicts: (Verdict | 'pending' | 'idle')[] }) {
  return (
    <span className="grid grid-cols-2 gap-x-4 gap-y-2 md:contents">
      {ENGINES.map((e, i) => (
        // Phones: engine name above its verdict, two engines per row; md+: one table column each.
        <span key={e.id} className="flex flex-col items-start gap-1 md:block">
          <span className="text-[12px] text-[#8a8a8a] md:hidden">{e.name}</span>
          <VerdictText verdict={verdicts[i]} />
        </span>
      ))}
    </span>
  );
}

function ResultRow({ row, domain, open, onToggle }: { row: Row; domain: string; open: boolean; onToggle: () => void }) {
  const results = ENGINES.map((e) => row.results?.find((r) => r.engine === e.id));
  return (
    <div className="border-b border-[#f1f1f1] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        disabled={!row.results}
        aria-expanded={open}
        className={`grid w-full gap-3 rounded-xl px-3 py-4 text-left transition-colors hover:bg-[#fafafa] disabled:hover:bg-transparent md:items-center md:gap-4 ${GRID}`}
      >
        <span className="flex items-start gap-2 text-[16px] text-[#121212]">
          <ChevronDown
            className={`mt-1 h-4 w-4 shrink-0 text-[#b0b0b0] transition-transform ${open ? 'rotate-180' : ''} ${
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
                  <div key={e.id} className="rounded-xl bg-[#f7f7f7] p-3">
                    <p className="flex items-center gap-2 text-[13px] font-medium text-[#121212]">
                      <EngineMark id={e.id} size={18} /> {e.name} cited
                    </p>
                    <p className="mt-1.5 text-[14px] leading-[21px] text-[#545454]">
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
