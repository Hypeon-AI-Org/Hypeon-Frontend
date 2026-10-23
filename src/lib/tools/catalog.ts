/** Every free tool, in display order: live tools first. `live: false` shows as "Coming soon". */
export const TOOL_CATALOG = [
  {
    slug: 'ai-citation-checker',
    title: 'AI citation checker',
    body: 'See the questions buyers ask AI about your market, and whether ChatGPT, Claude, Gemini and Perplexity cite you in the answer.',
    live: true,
  },
  {
    slug: 'seo-competitor-analysis',
    title: 'SEO competitor analysis',
    body: 'Put your site next to any competitor and see their keywords, traffic and the searches they win that you don’t.',
    live: false,
  },
  {
    slug: 'keyword-rank-checker',
    title: 'Keyword rank checker',
    body: 'Find where any website ranks on Google for a keyword in your country, and who holds the spots above you.',
    live: false,
  },
] as const;

export type ToolSlug = (typeof TOOL_CATALOG)[number]['slug'];
