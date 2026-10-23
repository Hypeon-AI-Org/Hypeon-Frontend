import type { Metadata } from 'next';
import { ListChecks, Upload, Wand2 } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdAnalyser from '@/components/tools/AdAnalyser';
import { HowItWorks, MoreTools, SectionHead, ToolCta, ToolFaq, ToolSection } from '@/components/tools/sections';
import { CHECKS, VIDEO_CHECKS } from '@/lib/tools/adRubric';

export const metadata: Metadata = {
  title: 'Free AI Ad Analyser: Score Your Ad Before You Spend | HypeOn',
  description:
    'Free AI ad analyser for image and UGC video ads. Upload a Meta, TikTok, Google or LinkedIn ad and get a score, a check of hook, message, CTA and design, and the fixes to make. No sign-up.',
  alternates: { canonical: '/tools/ad-analyser' },
  openGraph: {
    title: 'Free AI Ad Analyser | HypeOn',
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
    title: 'Get a scored review',
    body: 'An AI agent checks the six things that decide whether an ad works, and scores it out of 100.',
  },
  {
    icon: Wand2,
    title: 'Fix it before you spend',
    body: 'You get the three most valuable fixes, plus new headline and button ideas to test.',
  },
];

const FAQS = [
  {
    q: 'How does the ad analyser work?',
    a: 'A vision AI model looks at your ad the way a performance-marketing strategist would. It grades six checks as strong, needs work or weak, and we turn those grades into a score out of 100 using fixed weights, so the same review always gives the same score.',
  },
  {
    q: 'Do you store my ad?',
    a: 'No. Your ad is sent to the AI for analysis and then discarded. For videos, only a few still frames leave your browser, never the video file. We keep a fingerprint so the same ad analysed again within a week returns the same result.',
  },
  {
    q: 'Which ads can I upload?',
    a: 'Image ads in JPG, PNG or WebP, and video ads in MP4, MOV or WebM, for Meta feed, Stories and Reels, TikTok, Google Display and LinkedIn.',
  },
  {
    q: 'How do you analyse a video ad?',
    a: 'Your browser takes about ten still frames from the video: six from the first three seconds, where the hook decides everything, then the middle and the ending. The AI reviews them in order for the hook, product, captions, proof and call to action. It does not hear the sound, so it judges what a muted viewer sees, which is how most people watch.',
  },
  {
    q: 'Can a score predict how my ad will perform?',
    a: 'No score can promise results: audience, offer and budget matter too. The review catches the creative problems that most often waste spend, so you launch a stronger version from day one.',
  },
  {
    q: 'Why add the ad copy?',
    a: 'Most ads pair the image with primary text and a headline. Adding them lets the review judge the message and call to action as a whole, not just the picture.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. No sign-up and no card. There is a daily limit per visitor so the tool stays free for everyone.',
  },
];

export default function AdAnalyserPage() {
  return (
    <main className="relative bg-[#121212]">
      <Navbar />
      <AdAnalyser />
      <HowItWorks steps={STEPS} sub="Three steps, under a minute, no account." />

      <ToolSection>
        <SectionHead
          title="How we"
          accent="score it."
          sub="Six checks for each kind of ad, weighted by how much each one moves results."
        />
        {[
          { title: 'Image ads', checks: CHECKS },
          { title: 'Video & UGC ads', checks: VIDEO_CHECKS },
        ].map((group) => (
          <div key={group.title} className="mt-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/40">{group.title}</p>
            <div className="mt-3 grid overflow-hidden rounded-2xl border border-[#2a2a2a] sm:grid-cols-2 md:grid-cols-3">
              {group.checks.map((c) => (
                <div key={c.id} className="border-b border-r border-[#2a2a2a] bg-[#121212] p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[18px] font-medium text-white">{c.name}</p>
                    <span className="shrink-0 text-[13px] tabular-nums text-white/40">{c.weight} pts</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-[24px] text-white/55">{c.ask}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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
