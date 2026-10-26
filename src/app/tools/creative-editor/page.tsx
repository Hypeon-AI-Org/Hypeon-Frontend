import type { Metadata } from 'next';
import { Download, ImagePlus, Type } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CreativeEditor from '@/components/tools/CreativeEditor';
import { AD_SIZES } from '@/components/tools/creativeCanvas';
import { HowItWorks, MoreTools, SectionHead, ToolCta, ToolFaq, ToolSection } from '@/components/tools/sections';

export const metadata: Metadata = {
  title: 'Ad Creative Editor: Free Ad Resizer for Instagram, Stories & Facebook | HypeOn',
  description:
    'Free ad creative editor. Turn one image into ads for Instagram, Stories, Reels, Facebook, YouTube and Google Display: add a headline and button, then download every size. Runs in your browser, no sign-up.',
  alternates: { canonical: '/tools/creative-editor' },
  openGraph: {
    title: 'Ad Creative Editor | HypeOn',
    description: 'One image, every ad size. Add your headline and button and download ads for every placement. Free, no sign-up.',
    url: '/tools/creative-editor',
  },
};

const STEPS = [
  {
    icon: ImagePlus,
    title: 'Upload one image',
    body: 'A product photo or an existing ad. It stays in your browser; nothing is uploaded to us.',
  },
  {
    icon: Type,
    title: 'Add your message',
    body: 'Headline, offer and button, plus your logo. Drag the image to frame it, and check each size as you go.',
  },
  {
    icon: Download,
    title: 'Download every size',
    body: 'One click exports all six sizes as JPG or PNG, ready to upload to Meta, TikTok, YouTube or Google.',
  },
];

const FAQS = [
  {
    q: 'Which ad sizes does it make?',
    a: 'Instagram post (1080×1080), feed portrait (1080×1350), Stories and Reels (1080×1920), Facebook link (1200×628), YouTube (1280×720) and Google display (300×250).',
  },
  {
    q: 'Do you store my images?',
    a: 'No. Resizing, text and downloads run entirely in your browser, so your image never leaves your device. Only when you use Write new text is the image sent to our AI, so it can write words that fit it; it is not stored, apart from a fingerprint so the same request within a week returns the same result.',
  },
  {
    q: 'Can I move the headline, subline and button separately?',
    a: 'Yes. Each one is its own piece: click it on the ad to select it, drag it anywhere, and change its colour, size or alignment without touching the others. Add extra text boxes or buttons with Add more, and drag your logo anywhere too. Quick styles restyle all three at once.',
  },
  {
    q: 'Can AI write the ad text for me?',
    a: 'Yes. Click Write new text and you get three versions, each with a headline, a subline and a button, written for your image. Add a request such as "40% off this week" to steer it. Click a version to use it, or select a text box first to replace just that one.',
  },
  {
    q: 'What are the shaded bands on the Stories size?',
    a: 'Instagram and Facebook cover the top 14% and bottom 20% of Stories and Reels with the profile name, captions and buttons. The editor keeps your text and logo out of those areas automatically.',
  },
  {
    q: 'Can I use the ads commercially?',
    a: 'Yes. The files are yours, with no watermark. Make sure you have the rights to the image and logo you upload.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. No sign-up and no watermark. Editing and downloads are unlimited; the AI tools have a daily limit per visitor so they stay free for everyone.',
  },
];

export default function CreativeEditorPage() {
  return (
    <main className="relative bg-[#ededed]">
      <Navbar />
      <CreativeEditor />
      <HowItWorks steps={STEPS} sub="Every ad size from one image, in a couple of minutes." />

      <ToolSection className="!pt-0">
        <SectionHead title="Every size" accent="you need." sub="The placements that run most ads, at the sizes each platform recommends." center />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AD_SIZES.map((s) => (
            <div key={s.id} className="flex items-center gap-4 rounded-2xl border border-[#e4e4e4] bg-white p-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center">
                <span
                  className="block max-h-full max-w-full rounded-[4px] bg-[#121212]"
                  style={{ aspectRatio: `${s.w} / ${s.h}`, [s.w >= s.h ? 'width' : 'height']: '100%' }}
                />
              </span>
              <div>
                <p className="text-[16px] font-medium text-[#121212]">{s.name}</p>
                <p className="text-[14px] text-[#8a8a8a]">
                  {s.w} × {s.h}px · {s.ratio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ToolSection>

      <ToolFaq items={FAQS} />
      <MoreTools current="creative-editor" />
      <ToolCta
        title="Need more than"
        accent="a resize?"
        body="HypeOn Studio creates brand-new static, video and UGC ads from what wins in your market."
      />
      <Footer />
    </main>
  );
}
