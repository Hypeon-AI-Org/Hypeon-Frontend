'use client';

import Image from 'next/image';
import googleStartups from '../../assets/Google_Startups.png';
import openAIBG from '../../assets/OpenAI_BG.png';
import awsStartups from '../../assets/AWS_STUPS.png';
import nividia from '../../assets/nvidia-logo.png'

export default function Partners() {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8 text-center">
          Partners:
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Google Cloud for Startups */}
          <div className="flex items-center justify-center">
            <Image
              src={googleStartups}
              alt="Google Cloud for Startups"
              width={250}
              height={80}
              className="h-auto max-w-full object-contain"
            />
          </div>

          {/* OpenAI for Startups */}
          <div className="flex items-center justify-center">
            <Image
              src={openAIBG}
              alt="OpenAI for Startups"
              width={250}
              height={80}
              className="h-auto max-w-full object-contain"
            />
          </div>

          {/* AWS */}
          <div className="flex items-center justify-center">
            <Image
              src={awsStartups}
              alt="AWS for Startups"
              width={250}
              height={80}
              className="h-auto max-w-full object-contain"
            />
          </div>
           <div className="flex items-center justify-center">
            <Image
              src={nividia}
              alt="Nvidiafor Startups"
              width={200}
              height={80}
              className="h-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
