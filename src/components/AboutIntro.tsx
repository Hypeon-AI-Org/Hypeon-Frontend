import Image from 'next/image';
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
    <section className="font-sans relative pt-28 pb-12 overflow-hidden bg-[oklch(0.988_0.0041_91.45)]">
      <div className="relative max-w-4xl mx-auto px-6 text-center reveal">
        <p className="text-sm text-slate-400 mb-3">We build</p>
        <h1 className="text-2xl md:text-4xl  text-slate-900 tracking-tight leading-tight mb-4">
        Know what to sell before you.
          <br />
          spend a dollar.
        </h1>
        <p className="text-[17px] text-gray-500 max-w-xl mx-auto mb-6">
        HypeOn AI is the decision system for{' '}
          <span className="font-medium text-gray-500">e-commerce teams  predicting trending products</span>
          <span className="font-medium text-gray-500">, surfacing buying-intent keywords, exposing competitor strategies</span>.
          and revealing your real ROAS across every channel.
        </p>
        <p className="text-sm text-slate-400 mt-10 mb-4">Official partners</p>
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
      </div>
    </section>
  );
}
