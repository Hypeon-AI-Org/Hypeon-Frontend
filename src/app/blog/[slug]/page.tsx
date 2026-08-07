import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleBody from "@/components/blog/ArticleBody";
import BlogFaq from "@/components/blog/BlogFaq";
import TableOfContents from "@/components/blog/TableOfContents";
import { getAllSlugs, getPostBySlug, getTocItems } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Blog · HypeOn AI" };
  return {
    title: `${post.title} · HypeOn AI`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.heroImage }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = getTocItems(post);
  const blocks = post.blocks.filter((b) => b.type !== "image");

  return (
    <div className="flex min-h-screen flex-col bg-[#ffffff]">
      <Navbar />

      <main className="flex-1 pt-24 pb-24 sm:pt-28">
        {/* ---------- Header ---------- */}
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-slate-400"
          >
            <Link href="/" className="transition-colors hover:text-slate-700">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="transition-colors hover:text-slate-700">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="line-clamp-1 max-w-[60vw] text-slate-600">
              {post.title}
            </span>
          </nav>

          <h1 className="mt-5 max-w-3xl text-[2rem] font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-[2.5rem]">
            {post.title}
          </h1>

          <p className="mt-4 text-sm text-slate-400">{post.date}</p>
        </div>

        {/* ---------- Two-column body ---------- */}
        <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-6 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
          {/* Sticky TOC (desktop) */}
          <aside className="hidden lg:block">
            <div data-lenis-prevent className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pb-4">
              <TableOfContents
                items={toc}
                cta={{
                  heading: "Try HypeOn out for free",
                  label: "Free trial",
                  href: post.cta.href,
                }}
              />
            </div>
          </aside>

          {/* Article */}
          <article className="min-w-0 max-w-3xl">
            {/* Title (repeated, as in reference) */}
            <h2 className="text-[1.9rem] font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-[2.3rem]">
              {post.title}
            </h2>

            {/* Intro / quick answer (plain lead paragraph) */}
            <p
              id="quick-answer"
              className="scroll-mt-28 mt-6 text-[1.05rem] leading-[1.85] text-slate-600"
            >
              {post.quickAnswer}
            </p>

            {/* Body */}
            <div className="mt-8">
              <ArticleBody blocks={blocks} />
            </div>

            {/* FAQ */}
            {post.faq.length > 0 && (
              <section id="faq" className="scroll-mt-28 mt-14">
                <h2 className="text-[1.6rem] font-semibold tracking-tight text-slate-900 sm:text-[1.85rem]">
                  Frequently asked questions
                </h2>
                <div className="mt-6">
                  <BlogFaq items={post.faq} />
                </div>
              </section>
            )}

            {/* Back to blog */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-slate-600"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to Blog
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
