import type { Metadata } from 'next';
import { Globe, ListOrdered, Search } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KeywordRankChecker from '@/components/tools/KeywordRankChecker';
import { HowItWorks, MoreTools, ToolCta, ToolFaq } from '@/components/tools/sections';
import { ToolTargetProvider } from '@/components/tools/ui';

export const metadata: Metadata = {
  title: 'Free Keyword Rank Checker: Where Do You Rank on Google? | HypeOn',
  description:
    'Free keyword rank checker. See where any website ranks on Google for a keyword in your country, and who holds the top 20 today. Live results, no sign-up.',
  alternates: { canonical: '/tools/keyword-rank-checker' },
  openGraph: {
    title: 'Free Keyword Rank Checker | HypeOn',
    description: 'Check where any website ranks on Google for a keyword, in your country. Free, no sign-up.',
    url: '/tools/keyword-rank-checker',
  },
};

const STEPS = [
  {
    icon: Globe,
    title: 'Enter a domain',
    body: 'Yours or a competitor’s. Subdomains count too, so a ranking blog page still belongs to the site.',
  },
  {
    icon: Search,
    title: 'Add the keyword',
    body: 'The exact search your customers type. Pick the country, because rankings differ from market to market.',
  },
  {
    icon: ListOrdered,
    title: 'See the position',
    body: 'We check the live Google results and show your position, the page that ranks, and who holds the first page.',
  },
];

const FAQS = [
  {
    q: 'How does the rank checker work?',
    a: 'It fetches the live Google results for your keyword in the country you pick, then finds the first position where your domain, or any of its subdomains, appears in the top 30 organic results.',
  },
  {
    q: 'Why is my position different from what I see in my browser?',
    a: 'Google personalises results by location, device and search history, and rankings move during the day. We check a clean, non-personalised search for the whole country, so a difference of a place or two is normal.',
  },
  {
    q: 'What does it mean if my site is not in the top 30?',
    a: 'Almost nobody clicks past the third page of Google, so for that search you are effectively invisible. The list shows who wins it instead, which tells you what kind of page Google wants for that keyword.',
  },
  {
    q: 'Do ads count as rankings?',
    a: 'No. We only count organic results, the ones you cannot pay for. Ads, maps and other boxes are left out.',
  },
  {
    q: 'Which countries can I check?',
    a: 'More than 40 countries, each checked on that country’s own Google.',
  },
  {
    q: 'How do I improve a ranking?',
    a: 'Publish a page that answers the search better than the pages above you, make it fast and clear, and earn links from relevant sites. HypeOn builds and optimises those pages for brands.',
  },
];

export default function KeywordRankCheckerPage() {
  return (
    <main className="relative bg-[#121212]">
      <Navbar />
      <ToolTargetProvider>
        <KeywordRankChecker />
      </ToolTargetProvider>
      <HowItWorks steps={STEPS} sub="Three steps, a few seconds, no account." />
      <ToolFaq items={FAQS} />
      <MoreTools current="keyword-rank-checker" />
      <ToolCta
        title="Checking rankings doesn’t move them."
        accent="Pages do."
        body="HypeOn builds the pages that win the searches your customers make, on Google and in AI answers."
      />
      <Footer />
    </main>
  );
}
