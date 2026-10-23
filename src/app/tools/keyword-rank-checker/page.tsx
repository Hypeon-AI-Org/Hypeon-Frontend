import type { Metadata } from 'next';
import { Globe, ListOrdered, Search } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KeywordRankChecker from '@/components/tools/KeywordRankChecker';
import { HowItWorks, MoreTools, SectionHead, ToolCta, ToolFaq, ToolSection } from '@/components/tools/sections';
import { ToolTargetProvider } from '@/components/tools/ui';

export const metadata: Metadata = {
  title: 'Google Rank Finder: Free Keyword Rank Checker | HypeOn',
  description:
    'Free Google rank finder. See where any website ranks on Google for a keyword in your country, and who holds the top 20 today. Live results, no sign-up.',
  alternates: { canonical: '/tools/keyword-rank-checker' },
  openGraph: {
    title: 'Google Rank Finder | HypeOn',
    description: 'Check where any website ranks on Google for a keyword, in your country. Free, no sign-up.',
    url: '/tools/keyword-rank-checker',
  },
};

const STEPS = [
  {
    icon: Globe,
    title: 'Enter a website',
    body: 'Yours or a competitor’s. Subdomains count too, so a ranking blog page still belongs to the site.',
  },
  {
    icon: Search,
    title: 'Add the keyword',
    body: 'The exact search your customers type. Pick the country, because rankings differ from market to market.',
  },
  {
    icon: ListOrdered,
    title: 'See where you stand',
    body: 'We check the live Google results and show your position, the page that ranks, and everyone above you.',
  },
];

/* Rough share of clicks by position band: why the band you land in matters. */
const BANDS = [
  { band: '#1 – #3', label: 'Top 3', share: '~55%', body: 'Most searchers click one of the first three results. This is where the traffic is.' },
  { band: '#4 – #10', label: 'Page 1', share: '~25%', body: 'Visible and clickable, but the top three take most of the attention. Close the gap.' },
  { band: '#11+', label: 'Page 2 and beyond', share: '<5%', body: 'Few people ever reach page 2. For this search you are close to invisible today.' },
];

const FAQS = [
  {
    q: 'How does the Google Rank Finder work?',
    a: 'It fetches the live Google results for your keyword in the country you pick, then finds the first position where your domain, or any of its subdomains, appears in the top 30 organic results.',
  },
  {
    q: 'Why is my position different from what I see in my browser?',
    a: 'Google personalises results by city, device and search history, and rankings move during the day. We check a clean, non-personalised search for the whole country, so a difference of a place or two is normal.',
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
    <main className="relative bg-[#ededed]">
      <Navbar />
      <ToolTargetProvider>
        <KeywordRankChecker />
      </ToolTargetProvider>
      <HowItWorks steps={STEPS} sub="Your Google position in a few seconds." />

      <ToolSection className="!pt-0">
        <SectionHead title="Why your position" accent="matters." sub="Where you land decides how many searchers ever see you." center />
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {BANDS.map((b, i) => (
            <div key={b.band} className="rounded-2xl border border-[#e4e4e4] bg-white p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] font-medium text-[#8a8a8a]">{b.label}</span>
                <span className="rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[12px] font-medium tabular-nums text-[#545454]">{b.band}</span>
              </div>
              <p className={`mt-5 text-[48px] font-medium leading-none tracking-[-0.04em] ${i === 0 ? 'text-[#007a45]' : 'text-[#121212]'}`}>
                {b.share}
              </p>
              <p className="mt-1 text-[13px] text-[#8a8a8a]">of clicks, roughly</p>
              <p className="mt-4 text-[16px] leading-[26px] text-[#545454]">{b.body}</p>
            </div>
          ))}
        </div>
      </ToolSection>

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
