import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog · HypeOn AI",
  description:
    "Playbooks and field notes on GEO, attribution, competitor intelligence, trend discovery, and ad performance for D2C brands.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="flex min-h-screen flex-col bg-[#ffffff]">
      <Navbar />

      <main className="flex-1 pt-24 pb-14 sm:pt-32">
        <div className="mx-auto max-w-2xl px-5 sm:px-6">
          {/* Header */}
          <header>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Blog
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Latest posts from the HypeOn team
            </p>
          </header>

          {/* List */}
          <ul className="mt-12">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-slate-200">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-6 py-6"
                >
                  <span className="text-[0.95rem] font-medium leading-snug text-slate-800 transition-colors group-hover:text-black sm:text-base">
                    {post.title}
                  </span>
                  <time className="mt-0.5 shrink-0 whitespace-nowrap text-xs text-slate-400">
                    {post.date}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
