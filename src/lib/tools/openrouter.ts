import { hostOf, isSameSite, normalizeDomain } from './domain';
import type { Engine, EngineResult, Source, Verdict } from './engines';

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

export function isOpenRouterConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY?.trim());
}

type Annotation = { type?: string; url_citation?: { url?: string; title?: string } };

type Completion = {
  choices?: { message?: { content?: string; annotations?: Annotation[] } }[];
  citations?: string[];
  error?: { message?: string };
};

export async function chat(
  model: string,
  messages: { role: 'system' | 'user'; content: string }[],
  opts: { webSearch?: 'plugin' | 'native'; maxTokens?: number; timeoutMs?: number } = {}
): Promise<Completion> {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) throw new Error('OPENROUTER_API_KEY is not set');

  const body: Record<string, unknown> = {
    model,
    messages,
    max_tokens: opts.maxTokens ?? 1200,
  };
  if (opts.webSearch === 'plugin') body.plugins = [{ id: 'web', max_results: 5 }];
  if (opts.webSearch === 'native') body.web_search_options = { search_context_size: 'low' };
  // Keep reasoning short where the model supports it; OpenRouter drops it elsewhere.
  if (opts.webSearch !== 'native') body.reasoning = { effort: 'low', exclude: true };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      'HTTP-Referer': 'https://hypeon.ai/tools',
      'X-Title': 'HypeOn Free Tools',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(opts.timeoutMs ?? 45_000),
  });
  const data = (await res.json().catch(() => ({}))) as Completion;
  if (!res.ok || data.error) {
    throw new Error(`OpenRouter ${model} ${res.status}: ${data.error?.message ?? 'request failed'}`);
  }
  return data;
}

function collectSources(data: Completion): Source[] {
  const seen = new Set<string>();
  const sources: Source[] = [];
  const add = (url: string | undefined, title = '') => {
    if (!url || seen.has(url)) return;
    let domain = hostOf(url);
    // Gemini links through Google's grounding redirect and puts the real site in the title.
    if (domain === 'vertexaisearch.cloud.google.com') domain = normalizeDomain(title) ?? '';
    if (!domain) return;
    seen.add(url);
    sources.push({ url, title: title.trim(), domain });
  };
  for (const a of data.choices?.[0]?.message?.annotations ?? []) {
    if (a.type === 'url_citation') add(a.url_citation?.url, a.url_citation?.title);
  }
  for (const url of data.citations ?? []) add(url);
  return sources;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Cited: the site is one of the answer's sources (or linked in it).
 * Mentioned: the brand or domain appears in the answer text only.
 */
export function judge(answer: string, sources: Source[], domain: string, brand: string): Verdict {
  if (sources.some((s) => isSameSite(s.domain, domain))) return 'cited';
  const linked = answer.match(/https?:\/\/[^\s)\]]+/g) ?? [];
  if (linked.some((u) => isSameSite(hostOf(u), domain))) return 'cited';

  const names = [domain, brand.trim()].filter((n) => n.length >= 3);
  const mentioned = names.some((n) => new RegExp(`(^|[^a-z0-9])${escapeRegExp(n)}([^a-z0-9]|$)`, 'i').test(answer));
  return mentioned ? 'mentioned' : 'not_found';
}

/** One engine's raw answer and sources for a prompt; cached per engine, prompt and country. */
export type RawAnswer = { answer: string; sources: Source[] };

/** Retries once when the first attempt fails fast (a provider hiccup), within the route's time budget. */
export async function askEngine(engine: Engine, prompt: string, country: string): Promise<RawAnswer> {
  const started = Date.now();
  try {
    return await askEngineOnce(engine, prompt, country);
  } catch (e) {
    if (Date.now() - started > 20_000) throw e;
    console.warn(`ai-citation retry ${engine.id}:`, e instanceof Error ? e.message : e);
    return askEngineOnce(engine, prompt, country);
  }
}

async function askEngineOnce(engine: Engine, prompt: string, country: string): Promise<RawAnswer> {
  const data = await chat(
    engine.model,
    [
      {
        role: 'system',
        // Only the location, as the consumer apps infer it. Anything more steers the
        // answer (asking for recommendations made models list more brands than the apps do).
        content: `The user is located in ${country}.`,
      },
      { role: 'user', content: prompt },
    ],
    // 20s first try + 35s retry stays inside the route's 60s limit.
    { webSearch: engine.nativeSearch ? 'native' : 'plugin', timeoutMs: 35_000 }
  );
  return {
    answer: (data.choices?.[0]?.message?.content ?? '').trim(),
    sources: collectSources(data),
  };
}

export function toResult(engine: Engine, raw: RawAnswer, domain: string, brand: string): EngineResult {
  return {
    engine: engine.id,
    verdict: judge(raw.answer, raw.sources, domain, brand),
    answer: raw.answer,
    sources: raw.sources.slice(0, 8),
  };
}
