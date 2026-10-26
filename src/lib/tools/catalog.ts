/**
 * Every free tool, in display order: live tools first (the Ad Creative Editor leads). `live: false` shows as
 * "Coming soon". Slugs keep the plain search terms people type (they are the
 * URLs); `title` is the HypeOn product name shown on the pages.
 */
export const TOOL_CATALOG = [
  {
    slug: 'creative-editor',
    title: 'Ad Creative Editor',
    tagline: 'Ready for every platform?',
    body: 'Upload your ad and AI fits it to every size, makes its text editable and writes new headlines, ready for Instagram, Stories, Facebook, YouTube and Google.',
    live: true,
  },
  {
    slug: 'ad-analyser',
    title: 'AI Ad Analyser',
    tagline: 'Will this ad work?',
    body: 'Upload an image or UGC video ad and an AI strategist scores it, explains what works and what doesn’t, and tells you what to fix.',
    live: true,
  },
  {
    slug: 'hook-analyzer',
    title: 'Hook Analyser',
    tagline: 'Will they keep watching?',
    body: 'Upload a Reel, TikTok or Short and AI grades its first 3 seconds, the part that decides who swipes away, then writes you better hook lines.',
    live: true,
  },
  {
    slug: 'ai-citation-checker',
    title: 'AI Visibility Scanner',
    tagline: 'Is AI recommending you?',
    body: 'See the questions buyers ask AI about your market, and whether ChatGPT, Claude, Gemini and Perplexity send them to you or to a competitor.',
    live: true,
  },
  {
    slug: 'keyword-rank-checker',
    title: 'Google Rank Finder',
    tagline: 'Where do you rank?',
    body: 'Find where any website ranks on Google for a keyword in your country, and exactly who holds the spots above you.',
    live: true,
  },
  {
    slug: 'seo-competitor-analysis',
    title: 'Keyword Gap Finder',
    tagline: 'What do they win?',
    body: 'Put your site next to a competitor’s and see the searches they win that you don’t, with traffic and difficulty.',
    live: false,
  },
] as const;

export type ToolSlug = (typeof TOOL_CATALOG)[number]['slug'];
