import Image from 'next/image';
import googleStartups from '../../assets/Google_Startups.png';
import openAIBG from '../../assets/OpenAI_BG.png';
import awsStartups from '../../assets/AWS_STUPS.png';
import nividia from '../../assets/nvidia-logo.png';

const partners = [
  { src: googleStartups, alt: 'Google Cloud for Startups', width: 80, height: 36 },
  { src: openAIBG, alt: 'OpenAI for Startups', width: 70, height: 36 },
  { src: awsStartups, alt: 'AWS for Startups', width: 70, height: 36 },
  { src: nividia, alt: 'NVIDIA', width: 70, height: 36 },
];

export default function AboutIntro() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pb-24">
      {/* Soft ambient glows behind the headline - same dusty-glass language as the home hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 hidden h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse,rgba(180,170,160,0.16),rgba(180,170,160,0)_70%)] blur-3xl lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black_30%,transparent_100%)]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-[13px] text-slate-600 sm:text-sm">
            <span className="italic font-serif text-slate-900">HypeOn</span>
            <span>is who we build for you</span>
          </span>

          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] text-neutral-900">
            Scale Smarter. <span className=" font-normal text-neutral-900">Scale Faster.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-base sm:text-lg leading-relaxed text-slate-600">
            HypeOn AI is the AI ad platform that decodes your competitors&apos; playbook and
            turns it into scroll-stopping creative so you spend less, sell more, and keep
            what you earn.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://calendly.com/yash-hypeon/30min"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)]"
            >
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
              <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get the demo</span>
                <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get the demo</span>
              </span>
            </a>
          </div>
        </div>

        <div className="relative mt-20">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-6">
            Official partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {partners.map(({ src, alt, width, height }) => (
              <div key={alt} className="opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0">
                <Image src={src} alt={alt} width={width} height={height} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
