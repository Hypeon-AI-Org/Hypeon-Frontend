import Image from 'next/image';
import Section, { Cell } from './Section';
import googleStartups from '../../assets/Google_Startups.png';
import openAIBG from '../../assets/OpenAI_BG.png';
import awsStartups from '../../assets/AWS_STUPS.png';
import nividia from '../../assets/nvidia-logo.png';

export default function AboutIntro() {
  const partners = [
    { src: googleStartups, alt: 'Google Cloud for Startups', width: 80, height: 36 },
    { src: openAIBG, alt: 'OpenAI for Startups', width: 70, height: 36 },
    { src: awsStartups, alt: 'AWS for Startups', width: 70, height: 36 },
    { src: nividia, alt: 'NVIDIA', width: 70, height: 36 },
  ];

  return (
    <Section cols={1}>
      {/* intro / mission cell — extra top padding so it clears the fixed navbar */}
      <Cell className="text-center reveal pt-24 sm:pt-28">
        <p className="text-sm text-slate-400 mb-3">We build</p>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter leading-tight mb-4">
          Scale Smarter. <span className="text-[#696863]">Scale Faster.</span>
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto">
          HypeOn AI is the AI ad platform that decodes your competitors&apos; playbook{' '}
          <span className="font-medium text-base lg:text-lg text-gray-500">and turns it into scroll-stopping creative</span>
          <span className="font-medium text-base lg:text-lg text-gray-500"> so you spend less, sell more, and keep what you earn.</span>
        </p>
      </Cell>

      {/* partners cell — hairline separates it from the intro above */}
      <Cell className="text-center">
        <p className="text-sm text-slate-400 mb-4">Official partners</p>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {partners.map(({ src, alt, width, height }) => (
            <div key={alt} className="opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </Cell>
    </Section>
  );
}
