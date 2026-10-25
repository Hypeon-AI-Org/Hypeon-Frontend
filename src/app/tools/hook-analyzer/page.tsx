import type { Metadata } from 'next';
import { ListChecks, Upload, Wand2 } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HookAnalyzer from '@/components/tools/HookAnalyzer';
import { HowItWorks, MoreTools, SectionHead, ToolCta, ToolFaq, ToolSection } from '@/components/tools/sections';
import { HOOK_CHECKS } from '@/lib/tools/hookRubric';

export const metadata: Metadata = {
  title: 'Hook Analyser: Free Reel & TikTok Hook Checker | HypeOn',
  description:
    'Free hook checker for TikTok, Instagram Reels and YouTube Shorts. Upload a video and AI grades its first 3 seconds out of 100, shows what makes people swipe, and writes better hook lines. No sign-up.',
  alternates: { canonical: '/tools/hook-analyzer' },
  openGraph: {
    title: 'Hook Analyser for Reels & TikTok | HypeOn',
    description: 'Upload a Reel or TikTok and get a hook score, the fixes to make and better hook lines. Free, no sign-up.',
    url: '/tools/hook-analyzer',
  },
};

const STEPS = [
  {
    icon: Upload,
    title: 'Upload your video',
    body: 'A Reel, TikTok or Short. Your browser reads only the first 3 seconds; the video file never leaves your device.',
  },
  {
    icon: ListChecks,
    title: 'Get your hook score',
    body: 'AI checks the six things that decide whether people keep watching, and scores your opening out of 100.',
  },
  {
    icon: Wand2,
    title: 'Fix it before you post',
    body: 'You get the three edits that matter most, plus three hook lines written for your video.',
  },
];

const FAQS = [
  {
    q: 'Why only the first 3 seconds?',
    a: 'That is where most viewers decide to stay or swipe. A strong opening is the biggest lever on watch time and reach, so this tool spends all its attention there.',
  },
  {
    q: 'How does the Hook Analyser work?',
    a: 'Your browser takes seven still frames from the first 3 seconds, one every half second. Our agent analyses them in order and grades six checks as strong, needs work or weak against fixed definitions. We turn those grades into a score out of 100 using fixed weights.',
  },
  {
    q: 'Do you store my video?',
    a: 'No. The video never leaves your browser, only seven small still frames do. They are sent to the AI for review and then discarded. We keep a fingerprint so the same video checked again within a week returns the same result.',
  },
  {
    q: 'Does it listen to the audio?',
    a: 'No. It judges what a muted viewer sees, which is how most people first meet your video. That is why on-screen hook text counts for so much.',
  },
  {
    q: 'Can a score predict views?',
    a: 'No score can promise views: the topic, timing and the rest of the video matter too. The hook score catches the opening mistakes that most often lose viewers in the first seconds.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. No sign-up and no card. There is a daily limit per visitor so the tool stays free for everyone.',
  },
];

export default function HookAnalyzerPage() {
  return (
    <main className="relative bg-[#ededed]">
      <Navbar />
      <HookAnalyzer />
      <HowItWorks steps={STEPS} sub="Your hook scorecard in under a minute." />

      <ToolSection className="!pt-0">
        <SectionHead
          title="How we"
          accent="score it."
          sub="Six checks on your first 3 seconds, weighted by how much each one keeps people watching."
          center
        />
        <div className="mx-auto mt-12 max-w-[760px] rounded-2xl border border-[#e4e4e4] bg-white p-6">
          <ul className="space-y-5">
            {HOOK_CHECKS.map((c) => (
              <li key={c.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[16px] font-medium text-[#121212]">{c.name}</p>
                  <span className="shrink-0 text-[13px] tabular-nums text-[#8a8a8a]">{c.weight} pts</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f1f1f1]">
                  <div className="h-full rounded-full bg-[#121212]" style={{ width: `${(c.weight / 25) * 100}%` }} />
                </div>
                <p className="mt-2 text-[14px] leading-[22px] text-[#545454]">{c.ask}</p>
              </li>
            ))}
          </ul>
        </div>
      </ToolSection>

      <ToolFaq items={FAQS} />
      <MoreTools current="hook-analyzer" />
      <ToolCta
        title="Openings that"
        accent="hold attention."
        body="HypeOn Studio turns what wins in your market into ready-to-post UGC videos with hooks built in."
      />
      <Footer />
    </main>
  );
}
