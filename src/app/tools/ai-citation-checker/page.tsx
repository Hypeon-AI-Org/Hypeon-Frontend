import type { Metadata } from 'next';
import { Globe, MessagesSquare, Radar } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiCitationChecker from '@/components/tools/AiCitationChecker';
import LiveCheck from '@/components/tools/LiveCheck';
import { HowItWorks, MoreTools, SectionHead, ToolCta, ToolFaq, ToolSection } from '@/components/tools/sections';
import { ToolTargetProvider, VerdictText } from '@/components/tools/ui';
import type { Verdict } from '@/lib/tools/engines';

export const metadata: Metadata = {
  title: 'AI Visibility Scanner: Free AI Citation Checker for ChatGPT & More | HypeOn',
  description:
    'Free AI visibility scanner. See the questions buyers ask ChatGPT, Claude, Gemini and Perplexity about your market, and whether each one recommends your website. No sign-up.',
  alternates: { canonical: '/tools/ai-citation-checker' },
  openGraph: {
    title: 'AI Visibility Scanner | HypeOn',
    description: 'Check live whether ChatGPT, Claude, Gemini and Perplexity recommend your brand. Free, no sign-up.',
    url: '/tools/ai-citation-checker',
  },
};

const STEPS = [
  {
    icon: Globe,
    title: 'Enter your website',
    body: 'We read your homepage to work out what you sell, who buys it and where.',
  },
  {
    icon: MessagesSquare,
    title: 'We find buyer questions',
    body: 'AI writes the questions a real customer in your country asks an assistant before buying, and checks each one.',
  },
  {
    icon: Radar,
    title: 'See who AI recommends',
    body: 'ChatGPT, Claude, Gemini and Perplexity answer live with web search on. You see where you appear and who wins instead.',
  },
];

/* Each outcome with a tiny illustrative answer, so the difference is obvious at a glance. */
const OUTCOMES: { verdict: Verdict; body: string; answer: string; sources: { name: string; you?: boolean }[] }[] = [
  {
    verdict: 'cited',
    body: 'AI names you and links to your site as a source. This is the win: trust, exposure and clicks.',
    answer: '“…Lumen Skin’s vitamin C serum is a top pick for dull skin…”',
    sources: [{ name: 'lumenskin.com', you: true }, { name: 'allure.com' }],
  },
  {
    verdict: 'mentioned',
    body: 'AI names your brand, but took its facts from other websites. Close, and easy to lose.',
    answer: '“…popular options include Lumen Skin, Glow Co and Dewlab…”',
    sources: [{ name: 'byrdie.com' }, { name: 'reddit.com' }],
  },
  {
    verdict: 'not_found',
    body: 'You are not in the answer. Whoever is named instead gets the customer you wanted.',
    answer: '“…the best serums for dull skin are Glow Co and Dewlab…”',
    sources: [{ name: 'glowco.com' }, { name: 'vogue.co.uk' }],
  },
];

const FAQS = [
  {
    q: 'Where do the buyer questions come from?',
    a: 'We read your homepage, work out your category and market, and use AI to write the questions a potential customer is most likely to ask an assistant. The results come from asking ChatGPT, Claude, Gemini and Perplexity live.',
  },
  {
    q: 'What is an AI citation?',
    a: 'When an AI assistant searches the web to answer a question, it lists the pages it used as sources. If your page is one of them, you are cited. Cited sites earn trust and clicks from people who never open Google.',
  },
  {
    q: 'Is this live data?',
    a: 'Yes. Every question is sent to the four assistants when you run the scan, with web search switched on. To keep the tool free, the same question asked again within 24 hours returns the saved answer.',
  },
  {
    q: 'Why is my result different from what I see in ChatGPT?',
    a: 'AI answers change between runs and depend on location, chat history and model version. We use the same models as the consumer apps with web search, so treat a result as a strong sample, and run important questions more than once.',
  },
  {
    q: 'How do I get AI assistants to recommend my brand?',
    a: 'Publish clear, specific pages that answer the exact questions buyers ask, get mentioned on the sites assistants already trust, and keep your facts consistent everywhere. This is generative engine optimisation (GEO), and HypeOn runs it for brands.',
  },
  {
    q: 'Which assistants and countries are covered?',
    a: 'ChatGPT, Claude, Gemini and Perplexity, in more than 40 countries. Pick your market and the assistants answer as they would for a user there.',
  },
];

export default function AiCitationCheckerPage() {
  return (
    <main className="relative bg-[#ededed]">
      <Navbar />
      <ToolTargetProvider>
        <AiCitationChecker />
        <HowItWorks steps={STEPS} sub="Your AI visibility report in about a minute." />

        <ToolSection className="!pt-0">
          <SectionHead title="What your results" accent="mean." sub="Every assistant gets one of three results for every question." center />
          <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {OUTCOMES.map((o) => (
              <div key={o.verdict} className="flex flex-col rounded-2xl border border-[#e4e4e4] bg-white p-6">
                <VerdictText verdict={o.verdict} />
                <p className="mt-4 text-[16px] leading-[26px] text-[#545454]">{o.body}</p>
                <div className="mt-6 rounded-xl bg-[#f5f5f5] p-4">
                  <p className="text-[14px] italic leading-[22px] text-[#333333]">{o.answer}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {o.sources.map((s) => (
                      <span
                        key={s.name}
                        className={`rounded-full px-2.5 py-1 text-[12px] ${
                          s.you ? 'bg-[#e3f9ee] font-medium text-[#007a45]' : 'bg-white text-[#545454] ring-1 ring-[#e4e4e4]'
                        }`}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ToolSection>

        <LiveCheck />
      </ToolTargetProvider>

      <ToolFaq items={FAQS} />
      <MoreTools current="ai-citation-checker" />
      <ToolCta
        title="Not recommended yet?"
        accent="Let’s change that."
        body="HypeOn builds the pages and the presence AI assistants pick up and cite, so buyers find you first."
      />
      <Footer />
    </main>
  );
}
