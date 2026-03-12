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
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tighter leading-tight mb-4">
        Scale Smarter. Scale Faster.
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto mb-6">
        HypeOn AI helps e-commerce teams figure out what to sell next{' '}
          <span className="font-medium text-base lg:text-lg text-gray-500">how to sell it better</span>
          <span className="font-medium text-base lg:text-lg text-gray-500">and where to put their budget for the highest return using real-time signals.</span>.
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
