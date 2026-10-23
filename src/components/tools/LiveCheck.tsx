'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Globe } from 'lucide-react';

import { Accent, Container, GradientFrame } from '@/components/home/ui';
import { isSameSite, normalizeDomain } from '@/lib/tools/domain';
import { ENGINES, type EngineResult } from '@/lib/tools/engines';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { CountrySelect, inputClass, useToolTarget, VerdictBadge } from './ui';
import { cleanAnswer, EngineMark, Highlight, TypingDots } from './visuals';

type CheckResponse = { domain: string; prompt: string; results: EngineResult[] };

const ease = [0.22, 1, 0.36, 1] as const;

const SUGGESTIONS = ['best tool to track competitor ads', 'which skincare brand is best for oily skin', 'top crm for small business in india'];

/**
 * Ask one question of your own and read every assistant's full answer and
 * sources. Sits in a dark band, like the home page's showcase sections.
 */
export default function LiveCheck() {
  const { domain, setDomain, country, setCountry } = useToolTarget();
  const { ref: captchaRef, getToken, ready, failed } = useTurnstile();

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResponse | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (prompt.trim().length < 5) return setError('Type the question your customers ask AI.');
    if (!domain.trim()) return setError('Add your domain so we know whose citations to look for.');
    if (!country) return setError('Choose the country your customers are in.');
    setError(null);
    setLoading(true);
    setResult(null);
    trackTool('free_tool_run', { tool: 'ai-citation-live-check' });
    try {
      const brand = (normalizeDomain(domain) ?? domain).split('.')[0];
      setResult(
        await postTool<CheckResponse>('/api/tools/ai-citation-check', { domain, brand, country, prompt }, await getToken())
      );
    } catch (err) {
      setError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const terms = result ? [result.domain, result.domain.split('.')[0]] : [];

  return (
    <section id="live-check" className="scroll-mt-24 bg-[linear-gradient(#121212,#191919)] py-16 md:py-[110px]">
      <Container>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[13px] text-white/60 ring-1 ring-inset ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00da7f]" /> Live
          </span>
          <h2 className="mt-5 text-[32px] font-normal leading-[1.15] text-white md:text-[44px]">
            Ask all four <Accent>at once.</Accent>
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[18px] leading-[28px] text-white/50">
            Type the exact question your customers ask. Read every assistant&rsquo;s full answer and the sites it trusts.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-[820px] rounded-[20px] bg-white p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-end gap-2 rounded-2xl bg-[#f5f5f5] p-2">
            <textarea
              aria-label="Your question"
              placeholder="Ask what your customers would ask ChatGPT…"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              maxLength={300}
              rows={2}
              className="min-h-[56px] flex-1 resize-none bg-transparent px-3 py-2 text-[17px] text-[#121212] placeholder:text-[#9a9a9a] outline-none"
            />
            <button
              type="submit"
              disabled={loading || !ready}
              aria-label={ready ? 'Ask the assistants' : 'Verifying'}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#121212] text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.4} />
            </button>
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div className="relative">
              <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
              <input
                aria-label="Your domain"
                placeholder="yourbrand.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                inputMode="url"
                className={`${inputClass} h-[46px] pl-10 text-[15px]`}
              />
            </div>
            <CountrySelect value={country} onChange={setCountry} className="[&_select]:h-[46px] [&_select]:text-[15px]" />
          </div>
          <div ref={captchaRef} className="mt-3 flex justify-center empty:hidden" />
          {(error || (failed && !ready)) && (
            <p role="alert" className="mt-3 rounded-xl bg-[#fdeaea] px-4 py-3 text-[14px] text-[#b4232a]">
              {error ?? 'The security check could not load. Please refresh the page.'}
            </p>
          )}
          {loading && <p className="mt-3 text-center text-[14px] text-[#8a8a8a]">Asking four assistants…</p>}
        </form>
        <div className="mx-auto mt-4 flex max-w-[820px] flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setPrompt(s)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>

        {(loading || result) && (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ENGINES.map((e, i) => (
              <AnswerCard
                key={e.id}
                index={i}
                engine={e}
                result={result?.results.find((x) => x.engine === e.id) ?? null}
                domain={result?.domain ?? ''}
                terms={terms}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function AnswerCard({
  index,
  engine,
  result,
  domain,
  terms,
}: {
  index: number;
  engine: (typeof ENGINES)[number];
  result: EngineResult | null;
  domain: string;
  terms: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const answer = result ? cleanAnswer(result.answer) : '';
  const long = answer.length > 420;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
    >
      <GradientFrame className="h-full" inner="flex h-full flex-col p-5">
        <div className="flex items-center gap-3">
          <EngineMark id={engine.id} size={34} />
          <div>
            <p className="text-[17px] font-medium text-white">{engine.name}</p>
            <p className="text-[12px] text-white/35">with web search</p>
          </div>
          <span className="ml-auto">
            <VerdictBadge verdict={result ? result.verdict : 'pending'} />
          </span>
        </div>

        {!result ? (
          <div className="mt-5 flex items-center gap-3 text-[14px] text-white/40">
            <TypingDots /> Searching the web…
          </div>
        ) : result.verdict === 'error' ? (
          <p className="mt-5 text-[15px] text-white/45">{engine.name} did not answer in time. Try again in a minute.</p>
        ) : (
          <>
            <div className="relative mt-4">
              <p className={`whitespace-pre-line text-[15px] leading-[25px] text-white/65 ${expanded ? '' : 'max-h-[200px] overflow-hidden'}`}>
                {answer ? <Highlight text={answer} terms={terms} /> : 'No answer text returned.'}
              </p>
              {long && !expanded && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#121212] to-transparent" />
              )}
            </div>
            {long && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-2 self-start text-[14px] font-medium text-white underline underline-offset-4"
              >
                {expanded ? 'Show less' : 'Read full answer'}
              </button>
            )}
            {result.sources.length > 0 && (
              <div className="mt-auto border-t border-white/10 pt-4">
                <p className="text-[12px] uppercase tracking-[0.14em] text-white/35">Sources</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {result.sources.slice(0, 6).map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        title={s.title || s.url}
                        className={`inline-block max-w-[220px] truncate rounded-full px-2.5 py-1 text-[13px] ${
                          isSameSite(s.domain, domain)
                            ? 'bg-[#00da7f]/15 font-medium text-[#00da7f]'
                            : 'bg-white/[0.06] text-white/60 hover:text-white'
                        }`}
                      >
                        {s.domain}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </GradientFrame>
    </motion.div>
  );
}
