/* ============================================================
   Blog content model + data for the HypeOn blog.
   Article body + FAQ for each post live in ./blog-content/<slug>.json
   (so long-form copy stays out of this metadata file).
   ============================================================ */

import awardContent from "./blog-content/yash-kumar-google-ads-impact-award-international-growth.json";

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
    slug: "yash-kumar-google-ads-impact-award-international-growth",
    title:
      "HypeOn AI Founder Yash Kumar Named 2026 Google Ads Impact Award Winner for International Growth",
    category: "Company News",
    excerpt:
      "Yash Kumar, Founder & CEO of HypeOn AI, has won the 2026 Google Ads Impact Award for International Growth in EMEA for an AI-led expansion into Finland that delivered a 9.75x return on ad spend with no local team on the ground.",
    quickAnswer:
      "Yash Kumar, Founder & CEO of HypeOn AI, has been named the 2026 Google Ads Impact Award winner for International Growth in EMEA. Google recognised his work leading growth at Swedish wallpaper brand Wallpassion, where an AI-led expansion into Finland delivered a 9.75x return on ad spend with no local team on the ground.",
    date: "Nov 23, 2026",
    readTime: "4 min read",
    heroImage: "/images/google-ads-impact-award-yash-kumar.webp",
    heroImageAlt:
      "Yash Kumar announced as the Google Ads Impact Awards winner for International Growth",
    cta: {
      heading: "Grow like an award winner",
      subtext:
        "HypeOn AI helps e-commerce and DTC brands scale profitably at home or test new countries without hiring locally.",
      label: "Book a call",
      href: DEMO_HREF,
    },
    content: awardContent as PostContent,
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
