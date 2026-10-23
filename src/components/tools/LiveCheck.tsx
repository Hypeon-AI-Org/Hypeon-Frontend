'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

import { Accent, Container } from '@/components/home/ui';
import { isSameSite, normalizeDomain } from '@/lib/tools/domain';
import { ENGINES, type EngineResult } from '@/lib/tools/engines';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { CountrySelect, inputClass, submitClass, useToolTarget, VerdictBadge } from './ui';
import { cleanAnswer, EngineMark, Highlight, TypingDots } from './visuals';

type CheckResponse = { domain: string; prompt: string; results: EngineResult[] };

const ease = [0.22, 1, 0.36, 1] as const;

/** Ask one question of your own and read every assistant's full answer and sources. */
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
    <section id="live-check" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <h2 className="text-[32px] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[48px]">
          Check one prompt <Accent>live.</Accent>
        </h2>
        <p className="mt-3 max-w-[460px] text-[17px] leading-[27px] text-white/50 md:text-[18px]">
          The question your customers ask AI, answered by four assistants in real time.
        </p>

        <form onSubmit={onSubmit} className="mt-10 rounded-2xl border border-[#2a2a2a] bg-[#121212] p-5 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              aria-label="Your question"
              placeholder="The question your customers ask AI"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={300}
              className={`${inputClass} md:flex-1`}
            />
            <button type="submit" disabled={loading || !ready} className={submitClass}>
              {loading ? 'Asking…' : ready ? 'Check AI citations live' : 'Verifying…'}
            </button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 md:max-w-[520px]">
            <input
              aria-label="Your domain"
              placeholder="Your domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              inputMode="url"
              className={`${inputClass} h-[46px] text-[15px]`}
            />
            <CountrySelect value={country} onChange={setCountry} className="[&_select]:h-[46px] [&_select]:text-[15px]" />
          </div>
          <div ref={captchaRef} className="mt-3 empty:hidden" />
          {(error || (failed && !ready)) && (
            <p role="alert" className="mt-4 rounded-2xl border border-[#ff8f9c]/25 bg-[#ff8f9c]/10 px-4 py-3 text-[15px] text-[#ffb3bc]">
              {error ?? 'The security check could not load. Please refresh the page.'}
            </p>
          )}
        </form>

        {(loading || result) && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
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
      className="flex flex-col rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5"
    >
      <div className="flex items-center gap-3">
        <EngineMark id={engine.id} size={32} />
        <p className="text-[17px] font-medium text-white">{engine.name}</p>
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
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#161616] to-transparent" />
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
            <div className="mt-5 border-t border-[#2a2a2a] pt-4">
              <p className="text-[12px] uppercase tracking-[0.14em] text-white/35">Sources</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {result.sources.slice(0, 6).map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      title={s.title || s.url}
                      className={`inline-block max-w-[220px] truncate rounded-md border px-2 py-1 text-[13px] ${
                        isSameSite(s.domain, domain)
                          ? 'border-[#00da7f]/30 bg-[#00da7f]/10 text-[#00da7f]'
                          : 'border-[#2a2a2a] text-white/60 hover:text-white'
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
    </motion.div>
  );
}
