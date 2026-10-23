/**
 * The four AI assistants the citation checker asks, all reached through one
 * OpenRouter key. Each uses the model behind that vendor's consumer app, so the
 * answers (and which brands they name) match what people see there; the
 * cheapest models named noticeably more brands than the apps did.
 * Model ids come from https://openrouter.ai/api/v1/models.
 */
export type EngineId = 'chatgpt' | 'claude' | 'gemini' | 'perplexity';

export type Engine = {
  id: EngineId;
  name: string;
  model: string;
  /** Perplexity's Sonar models search natively; the rest need OpenRouter's web plugin. */
  nativeSearch: boolean;
};

export const ENGINES: Engine[] = [
  { id: 'chatgpt', name: 'ChatGPT', model: 'openai/gpt-chat-latest', nativeSearch: false },
  { id: 'claude', name: 'Claude', model: 'anthropic/claude-sonnet-5.5', nativeSearch: false },
  { id: 'gemini', name: 'Gemini', model: 'google/gemini-3.8-flash', nativeSearch: false },
  { id: 'perplexity', name: 'Perplexity', model: 'perplexity/sonar-pro', nativeSearch: true },
];

/** Writes the suggested prompts; no web search, so it is a fraction of a cent. */
export const PROMPT_WRITER_MODEL = 'openai/gpt-6-luna';

export type Verdict = 'cited' | 'mentioned' | 'not_found' | 'error';

export type Source = { url: string; title: string; domain: string };

export type EngineResult = {
  engine: EngineId;
  verdict: Verdict;
  answer: string;
  sources: Source[];
};
