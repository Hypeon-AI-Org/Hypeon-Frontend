import type { Metadata } from 'next';
import { Film, ImageIcon, ListChecks, Upload, Wand2 } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdAnalyser from '@/components/tools/AdAnalyser';
import { HowItWorks, MoreTools, SectionHead, ToolCta, ToolFaq, ToolSection } from '@/components/tools/sections';
import { CHECKS, VIDEO_CHECKS } from '@/lib/tools/adRubric';

export const metadata: Metadata = {
  title: 'AI Ad Analyser: Free Ad Scorer for Image & UGC Video Ads | HypeOn',
  description:
    'Free ad creative scorer. Upload a Meta, TikTok, Google or LinkedIn image or UGC video ad and get a score out of 100, a check of hook, message, CTA and design, and the fixes to make. No sign-up.',
  alternates: { canonical: '/tools/ad-analyser' },
  openGraph: {
    title: 'AI Ad Analyser | HypeOn',
    description: 'Upload an image or video ad and get a score and the exact fixes to make. Free, no sign-up.',
    url: '/tools/ad-analyser',
  },
};

const STEPS = [
  {
    icon: Upload,
    title: 'Upload your ad',
    body: 'An image ad or a UGC video. Pick where it will run, because a story and a feed post are judged differently.',
  },
  {
    icon: ListChecks,
    title: 'Get your scorecard',
    body: 'An AI creative strategist checks the six things that decide whether an ad works, and scores it out of 100.',
  },
  {
    icon: Wand2,
    title: 'Fix it before you spend',
    body: 'You get the three most valuable fixes, plus new headlines and a button to test.',
  },
];

const FAQS = [
  {
    q: 'How does the AI Ad Analyser work?',
    a: 'A vision AI model looks at your ad the way a performance-marketing strategist would. It grades six checks as strong, needs work or weak against fixed definitions, and we turn those grades into a score out of 100 using fixed weights.',
  },
  {
    q: 'Do you store my ad?',
    a: 'No. Your ad is sent to the AI for analysis and then discarded. For videos, only a few still frames leave your browser, never the video file. We keep a fingerprint so the same ad scored again within a week returns the same result.',
  },
  {
    q: 'Which ads can I upload?',
    a: 'Image ads in JPG, PNG or WebP, and video ads in MP4, MOV or WebM, for Meta feed, Stories and Reels, TikTok, Google Display and LinkedIn.',
  },
  {
    q: 'How do you score a video ad?',
    a: 'Your browser takes about ten still frames from the video: six from the first three seconds, where the hook decides everything, then the middle and the ending. The AI reviews them in order for the hook, product, captions, proof and call to action. It does not hear the sound, so it judges what a muted viewer sees, which is how most people watch.',
  },
  {
    q: 'Can a score predict how my ad will perform?',
    a: 'No score can promise results: audience, offer and budget matter too. The scorecard catches the creative problems that most often waste spend, so you launch a stronger version from day one.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. No sign-up and no card. There is a daily limit per visitor so the tool stays free for everyone.',
  },
];

const GROUPS = [
  { title: 'Image ads', icon: ImageIcon, checks: CHECKS },
  { title: 'Video & UGC ads', icon: Film, checks: VIDEO_CHECKS },
];

export default function AdAnalyserPage() {
  return (
    <main className="relative bg-[#ededed]">
      <Navbar />
      <AdAnalyser />
      <HowItWorks steps={STEPS} sub="Your ad scorecard in under a minute." />

      <ToolSection className="!pt-0">
        <SectionHead
          title="How we"
          accent="score it."
          sub="Six checks for each kind of ad, weighted by how much each one moves results."
          center
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          {GROUPS.map((g) => (
            <div key={g.title} className="rounded-2xl border border-[#e4e4e4] bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121212] text-white">
                  <g.icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </span>
                <p className="text-[19px] font-medium text-[#121212]">{g.title}</p>
              </div>
              <ul className="mt-6 space-y-5">
                {g.checks.map((c) => (
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
          ))}
        </div>
      </ToolSection>

      <ToolFaq items={FAQS} />
      <MoreTools current="ad-analyser" />
      <ToolCta
        title="Good ads are made,"
        accent="not guessed."
        body="HypeOn Studio turns what wins in your market into ready-to-run static, video and UGC ads."
      />
      <Footer />
    </main>
  );
}
