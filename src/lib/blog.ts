/* ============================================================
   Blog content model + data for the HypeOn blog.
   Article body + FAQ for each post live in ./blog-content/<slug>.json
   (so long-form copy stays out of this metadata file).
   ============================================================ */

import geoContent from "./blog-content/generative-engine-optimization-geo-2026-playbook.json";
import roasContent from "./blog-content/meta-roas-double-count-problem.json";
import competitorContent from "./blog-content/how-to-find-competitor-ad-spend.json";
import trendContent from "./blog-content/spot-trending-products-before-viral.json";
import fatigueContent from "./blog-content/ad-fatigue-spot-in-48-hours.json";

export type Block =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant?: "key" | "info" | "warning";
      title?: string;
      text: string;
    }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface FaqItem {
  q: string;
  a: string;
}

interface PostContent {
  blocks: Block[];
  faq: FaqItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  quickAnswer: string;
  date: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  cta: {
    heading: string;
    subtext: string;
    label: string;
    href: string;
  };
  blocks: Block[];
  faq: FaqItem[];
}

const DEMO_HREF = "https://calendly.com/yash-hypeon/30min";

type PostMeta = Omit<BlogPost, "blocks" | "faq"> & { content: PostContent };

/* Ordered newest-first - drives listing + featured slot. */
const POSTS: PostMeta[] = [
  {
    slug: "generative-engine-optimization-geo-2026-playbook",
    title:
      "Generative Engine Optimization (GEO): The 2026 Playbook for D2C Brands",
    category: "GEO & AI Search",
    excerpt:
      "A growing share of buyers research products by asking ChatGPT, Claude, Gemini, or Perplexity - and read an answer that names a few brands. The complete playbook to be one of them: what GEO is, how it differs from SEO, the five things AI engines reward, and a 30/60/90-day plan.",
    quickAnswer:
      "A growing share of your future customers will never see your website in a list of blue links. They'll ask ChatGPT, Claude, Gemini, or Perplexity a question - “what's the best attribution tool for a small D2C brand?” - and read an answer that names a few brands directly. If you're one of the brands named, you win the consideration. If you're not, you don't exist in that conversation, no matter how good your traditional SEO is.",
    date: "May 28, 2026",
    readTime: "12 min read",
    heroImage: "/images/Geo.webp",
    heroImageAlt:
      "HypeOn dashboard showing geographic product demand and market opportunity across an AI-driven world map",
    cta: {
      heading: "See where you show up across AI search engines",
      subtext:
        "HypeOn helps D2C brands track where they get cited across ChatGPT, Gemini, Perplexity and more - and exactly what to fix to get cited more often.",
      label: "Audit your AI visibility",
      href: DEMO_HREF,
    },
    content: geoContent as PostContent,
  },
  {
    slug: "meta-roas-double-count-problem",
    title: "Why Your Meta ROAS Is Lying to You: The 31% Double-Count Problem",
    category: "Attribution",
    excerpt:
      "When you add up the revenue Meta, Google, TikTok, and email each report, the total routinely exceeds the money in your bank - because ~31% of conversions get claimed by two or more channels at once. Here's how to get to a number you can trust.",
    quickAnswer:
      "Meta reports a higher ROAS than you actually earned because every ad platform claims credit for sales it merely touched, not sales it caused. When you add up the revenue Meta, Google, TikTok, and your email tool each report, the total routinely exceeds the money in your bank account - often because roughly a third of conversions get claimed by two or more channels at once. Your true ROAS is the version that reconciles to your actual revenue, not the one in any single dashboard.",
    date: "May 21, 2026",
    readTime: "8 min read",
    heroImage: "/images/dashboard.webp",
    heroImageAlt:
      "Marketing dashboard showing ROAS, ad spend and gross revenue trending across channels",
    cta: {
      heading: "Make your reported ROAS match your bank account",
      subtext:
        "HypeOn reconciles every marketing channel against the revenue that actually hit your account, so the ROAS you report is the ROAS you earned.",
      label: "See your true numbers",
      href: DEMO_HREF,
    },
    content: roasContent as PostContent,
  },
  {
    slug: "how-to-find-competitor-ad-spend",
    title:
      "How to Find Out How Much Any Competitor Spends on Ads (2026 Cross-Channel Playbook)",
    category: "Competitor Intelligence",
    excerpt:
      "No public tool shows a competitor's exact ad budget - but you can estimate it within a useful range by reading public ad archives and converting four observable signals into a spend tier. Here's the full method, channel by channel.",
    quickAnswer:
      "No public tool shows a competitor's exact ad budget - but you can estimate it within a useful range by reading public ad archives (Meta Ad Library, Google Ads Transparency Center, TikTok Creative Center), layering on traffic-estimate tools, and converting observable signals - ad volume, run duration, creative refresh rate, and reach proxies - into a spend estimate. This guide shows the full method, channel by channel.",
    date: "May 14, 2026",
    readTime: "8 min read",
    heroImage: "/images/competitoro.webp",
    heroImageAlt:
      "HypeOn competitor comparison dashboard ranking products and competitors by engagement",
    cta: {
      heading: "Track every competitor's ad activity in one dashboard",
      subtext:
        "HypeOn aggregates competitor ad activity across Meta, Google, TikTok and more into one view - with spend estimates and trend tracking built in.",
      label: "Track your competitors",
      href: DEMO_HREF,
    },
    content: competitorContent as PostContent,
  },
  {
    slug: "spot-trending-products-before-viral",
    title: "How to Spot a Trending Product 3 Weeks Before It Goes Viral",
    category: "Trend Discovery",
    excerpt:
      "By the time a product is obviously trending, the margin is gone. The winners got in three weeks earlier. Here are the four leading signals that let you anticipate trends instead of chasing them.",
    quickAnswer:
      "You can identify a trending product roughly three weeks before it peaks by reading four leading signals together - rising search velocity, accelerating TikTok engagement curves, low competitor saturation, and confirmed supply-chain availability. No single signal is reliable alone; the edge comes from finding products where all four align before the crowd arrives.",
    date: "May 7, 2026",
    readTime: "8 min read",
    heroImage: "/images/dash.webp",
    heroImageAlt:
      "HypeOn Trend Discovery dashboard showing products ranked by search velocity and rapid ascent",
    cta: {
      heading: "Catch accelerating products before they peak",
      subtext:
        "HypeOn surfaces accelerating products before they peak - combining search velocity, social engagement curves, and competitor saturation into one early-warning signal.",
      label: "Find your next winner",
      href: DEMO_HREF,
    },
    content: trendContent as PostContent,
  },
  {
    slug: "ad-fatigue-spot-in-48-hours",
    title: "Ad Fatigue: How to Spot It in 48 Hours Before It Kills Your ROAS",
    category: "Ad Performance",
    excerpt:
      "ROAS is a lagging indicator - by the time it falls, fatigue has been building for a week. Here are the four leading signals that move 48 hours into fatigue, with the thresholds that matter.",
    quickAnswer:
      "Ad fatigue is when your audience has seen a creative so often that it stops responding - and it shows up in the data days before it shows up in your ROAS. The four early signals to watch are: frequency climbing above ~2.5, week-over-week CTR dropping more than ~20%, CPM creeping up on a stable audience, and CVR softening. Catch two of these moving together and refresh the creative now, not after ROAS has already cratered.",
    date: "Apr 30, 2026",
    readTime: "7 min read",
    heroImage: "/images/creative.webp",
    heroImageAlt:
      "A single product ad creative for a wellness supplement brand",
    cta: {
      heading: "Catch ad fatigue inside the 48-hour window",
      subtext:
        "HypeOn watches your creative performance and flags fatigue inside the 48-hour window - before it ever shows up in your ROAS report.",
      label: "Catch fatigue early",
      href: DEMO_HREF,
    },
    content: fatigueContent as PostContent,
  },
];

function toPost(meta: PostMeta): BlogPost {
  const { content, ...rest } = meta;
  return { ...rest, blocks: content.blocks, faq: content.faq };
}

export function getAllPosts(): BlogPost[] {
  return POSTS.map(toPost);
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const meta = POSTS.find((p) => p.slug === slug);
  return meta ? toPost(meta) : undefined;
}

export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  return POSTS.filter((p) => p.slug !== slug)
    .slice(0, count)
    .map(toPost);
}

/* ---------- Table of contents ---------- */

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function getTocItems(post: BlogPost): TocItem[] {
  const items: TocItem[] = [
    { id: "quick-answer", text: "Quick answer", level: 2 },
  ];
  post.blocks.forEach((b) => {
    if (b.type === "heading") {
      items.push({ id: slugifyHeading(b.text), text: b.text, level: 2 });
    } else if (b.type === "subheading") {
      items.push({ id: slugifyHeading(b.text), text: b.text, level: 3 });
    }
  });
  if (post.faq.length > 0) {
    items.push({
      id: "faq",
      text: "Frequently asked questions",
      level: 2,
    });
  }
  return items;
}
