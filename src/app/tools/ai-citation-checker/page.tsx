import type { Metadata } from 'next';
import { Globe, MessagesSquare, Radar } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiCitationChecker from '@/components/tools/AiCitationChecker';
import LiveCheck from '@/components/tools/LiveCheck';
import { HowItWorks, MoreTools, SectionHead, ToolCta, ToolFaq, ToolSection } from '@/components/tools/sections';
import { ToolTargetProvider } from '@/components/tools/ui';

export const metadata: Metadata = {
  title: 'Free AI Citation Checker: Does ChatGPT Recommend You? | HypeOn',
  description:
    'Free AI citation checker. See the questions buyers ask ChatGPT, Claude, Gemini and Perplexity about your market, and whether each one cites your website. No sign-up.',
  alternates: { canonical: '/tools/ai-citation-checker' },
  openGraph: {
    title: 'Free AI Citation Checker | HypeOn',
    description: 'Check live whether ChatGPT, Claude, Gemini and Perplexity cite your website. Free, no sign-up.',
    url: '/tools/ai-citation-checker',
  },
};

const STEPS = [
  {
    icon: Globe,
    title: 'Enter your domain',
    body: 'We read your homepage to work out what you sell, who you sell it to and where.',
  },
  {
    icon: MessagesSquare,
    title: 'Get the prompts buyers ask',
    body: 'AI writes the questions a real customer in your country would ask an assistant before buying, and checks each one.',
  },
  {
    icon: Radar,
    title: 'Check any prompt live',
    body: 'Type your own question. We ask ChatGPT, Claude, Gemini and Perplexity with web search on and show each answer with its sources.',
  },
];

const VERDICTS = [
  {
    label: 'Cited',
    className: 'border-[#00da7f]/30 bg-[#00da7f]/10 text-[#00da7f]',
    body: 'Your page is one of the sources the assistant used. This is the win: it carries trust, brand exposure and clicks.',
  },
  {
    label: 'Mentioned',
    className: 'border-white/15 bg-white/[0.06] text-white/80',
    body: 'Your brand is named in the answer, but the assistant took its facts from other websites. Close, and easy to lose.',
  },
  {
    label: 'Not mentioned',
    className: 'border-[#ff8f9c]/30 bg-[#ff8f9c]/10 text-[#ff8f9c]',
    body: 'You are absent from this answer. Whoever is cited instead is getting the customer you wanted.',
  },
];

const FAQS = [
  {
    q: 'Where do the suggested prompts come from?',
    a: 'We read your homepage, work out your category and market, and use AI to write the questions a potential customer is most likely to ask an assistant. The verdicts come from asking ChatGPT, Claude, Gemini and Perplexity live.',
  },
  {
    q: 'What is an AI citation?',
    a: 'When an AI assistant searches the web to answer a question, it lists the pages it used as sources. If your page is one of them, you are cited. Cited sites earn trust and clicks from people who never open Google.',
  },
  {
    q: 'Is the check live data or a stored database?',
    a: 'Live. Every question is sent to the four assistants when you run the check, with web search switched on. To keep the tool free, the same question asked again within 24 hours returns the saved answer.',
  },
  {
    q: 'Why does the answer differ from what I see in my own ChatGPT?',
    a: 'AI answers change between runs and depend on location, chat history and model version. We use each vendor’s standard API model with web search, so treat a result as a sample and run important questions more than once.',
  },
  {
    q: 'What does “mentioned” mean exactly?',
    a: 'Your brand or domain appears in the answer text, but your website was not one of the sources. Cited is stronger: the assistant links to you and relies on your content.',
  },
  {
    q: 'How do I get AI assistants to cite my site?',
    a: 'Publish clear, specific pages that answer the exact questions buyers ask, get mentioned on the sites assistants already trust, and keep your facts consistent everywhere. This is generative engine optimisation (GEO), and HypeOn runs it for brands.',
  },
  {
    q: 'Which assistants and countries are covered?',
    a: 'ChatGPT, Claude, Gemini and Perplexity, in more than 40 countries. Pick your market and the assistants answer as they would for a user there.',
  },
];

export default function AiCitationCheckerPage() {
  return (
    <main className="relative bg-[#121212]">
      <Navbar />
      <ToolTargetProvider>
        <AiCitationChecker />
        <HowItWorks steps={STEPS} sub="Three steps, about a minute, no account." />

        <ToolSection>
          <SectionHead title="How to read the" accent="results." sub="Three outcomes per assistant, per prompt." />
          <div className="mt-10 grid overflow-hidden rounded-2xl border border-[#2a2a2a] md:grid-cols-3">
            {VERDICTS.map((v) => (
              <div
                key={v.label}
                className="border-b border-[#2a2a2a] bg-[#121212] p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className={`inline-flex h-7 items-center rounded-md border px-2 text-[13px] font-medium ${v.className}`}>
                  {v.label}
                </span>
                <p className="mt-5 text-[17px] leading-[27px] text-white/55">{v.body}</p>
              </div>
            ))}
          </div>
        </ToolSection>

        <LiveCheck />
      </ToolTargetProvider>

      <ToolFaq items={FAQS} />
      <MoreTools current="ai-citation-checker" />
      <ToolCta
        title="Not cited yet?"
        accent="Let’s fix that."
        body="HypeOn builds the pages and the presence AI assistants pick up and cite, so buyers find you first."
      />
      <Footer />
    </main>
  );
}
