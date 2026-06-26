'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, X } from 'lucide-react';
import Section, { Cell } from './Section';

// Import your assets
import googleStartups from '../../assets/Google_Startups.png';
import openAIBG from '../../assets/OpenAI_BG.png';
import awsStartups from '../../assets/AWS_STUPS.png';
import nividia from '../../assets/nvidia-logo.png';

export default function CombinedLayout() {
  const [viewState, setViewState] = useState('idle'); // 'idle' | 'hovered' | 'expanded'
  const isExpanded = viewState === 'expanded';

  // Prevent scrolling when the letter is "pulled out"
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isExpanded]);

  return (
    <main>
      {/* 1. PARTNERS SECTION - built from real grid Cells so every divider is
          a gap-px hairline that aligns with the rest of the page grid.
          Mobile: label full-width, logos 2x2. Desktop: one tabular row. */}
      <Section gridClassName="grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <Cell className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start py-5 md:py-6 min-h-[72px] md:min-h-[88px]">
          <p className="text-slate-700 font-medium text-sm sm:text-base">
            Official partners
          </p>
        </Cell>

        <Cell className="flex items-center justify-center py-5 md:py-6 min-h-[72px] sm:min-h-[80px] md:min-h-[88px]">
          <Image
            src={googleStartups}
            alt="Google Cloud for Startups"
            width={110}
            height={50}
            className="w-[90px] sm:w-[110px] h-auto object-contain"
          />
        </Cell>

        <Cell className="flex items-center justify-center py-5 md:py-6 min-h-[72px] sm:min-h-[80px] md:min-h-[88px]">
          <Image
            src={openAIBG}
            alt="OpenAI for Startups"
            width={95}
            height={50}
            className="w-[80px] sm:w-[95px] h-auto object-contain"
          />
        </Cell>

        <Cell className="flex items-center justify-center py-5 md:py-6 min-h-[72px] sm:min-h-[80px] md:min-h-[88px]">
          <Image
            src={awsStartups}
            alt="AWS for Startups"
            width={95}
            height={50}
            className="w-[80px] sm:w-[95px] h-auto object-contain"
          />
        </Cell>

        <Cell className="flex items-center justify-center py-5 md:py-6 min-h-[72px] sm:min-h-[80px] md:min-h-[88px]">
          <Image
            src={nividia}
            alt="NVIDIA"
            width={95}
            height={50}
            className="w-[80px] sm:w-[95px] h-auto object-contain"
          />
        </Cell>
      </Section>
      {/* 2. FOUNDER SECTION (NOW BELOW) - wrapped in the grid so the hairline
          frame + corner marks run continuously down the page. */}
      <Section>
        <Cell bleed>
      <section className="relative min-h-[200px] flex items-center justify-center overflow-hidden bg-[var(--grid-bg)] py-16">

        {/* Very Light Grid Background */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${isExpanded ? 'blur-md opacity-[0.2]' : 'opacity-[0.4]'}`}
          style={{
            backgroundImage: `
              linear-gradient(to right, #E5E5E1 1px, transparent 1px),
              linear-gradient(to bottom, #E5E5E1 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          }}
        />

        {/* Backdrop Overlay - button for reliable mobile tap */}
        <button
          type="button"
          aria-label="Close overlay"
          className={`fixed inset-0 z-20 w-full h-full bg-[#FBFBF9]/40 backdrop-blur-sm transition-opacity duration-500 cursor-pointer border-0 p-0 appearance-none ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setViewState('idle')}
        />

        {/* The Card Container */}
        <div className={`
         relative z-30 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isExpanded ? 'fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-8' : 'w-full max-w-[480px] px-3 sm:px-4'}
        `}>

          <div
            {...(isExpanded ? { 'data-lenis-prevent': '' } : {})}
            role={isExpanded ? undefined : 'button'}
            tabIndex={isExpanded ? undefined : 0}
            onMouseEnter={() => !isExpanded && setViewState('hovered')}
            onMouseLeave={() => !isExpanded && setViewState('idle')}
            onClick={() => !isExpanded && setViewState('expanded')}
            onKeyDown={(e) => { if (!isExpanded && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setViewState('expanded'); } }}
            className={`
              relative bg-white border border-[#E8E8E3] transition-all duration-700
              ${isExpanded
                ? 'w-full max-w-[700px] max-h-[90vh] overflow-y-auto p-5 sm:p-8 md:p-10 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.06)] rotate-0'
                : 'p-5 sm:p-7 md:p-9 shadow-[0_10px_40px_rgba(0,0,0,0.02)] cursor-pointer min-h-[44px]'
              }
              ${viewState === 'idle' && !isExpanded ? '-rotate-1 translate-y-2' : ''}
              ${viewState === 'hovered' && !isExpanded ? 'rotate-0 translate-y-0 shadow-lg border-[#D1D1CC]' : ''}
            `}
            style={{
              maskImage: isExpanded ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 98%)',
              WebkitMaskImage: isExpanded ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 98%)',
            }}
          >
            {/* Close Button */}
            {isExpanded && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setViewState('idle'); }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 p-2 rounded-full hover:bg-[#F5F5F0] transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <X size={20} className="text-[#A1A19A] group-hover:text-black" />
              </button>
            )}

            {/* Letter Content */}
            <div className="text-left font-mono ">
              <h2 className={`
                tracking-tight text-[#1A1A1A] font-medium leading-tight transition-all duration-500
                ${isExpanded ? 'text-[28px] md:text-[36px] mb-16' : 'text-[20px] mb-10'}
              `}>
                The growth stack is broken.
              </h2>

              <div className={`
                text-[#5E5E5C] transition-all duration-500
                ${isExpanded ? 'text-[15px] md:text-[16px] leading-[1.8] space-y-10' : 'text-sm leading-[1.7] space-y-6'}
              `}>
                <p>
                  Every e-commerce founder I know has the same morning routine. Open five tabs to see what their competitors are doing. Screenshot a few ads. Guess which ones are actually working. Then sit down to brief a creative they won't see for two weeks. None of it is based on truth.
                </p>
                <p>
                  A competitor goes viral and you scramble to reverse-engineer it. Was it the hook? The format? The targeting? By the time you've pieced it together, they've moved on to the next winner. You're always one step behind, not because you're slower, but because you're working blind.
                </p>
                {isExpanded && (
                  <>
                    <p>
                      Meanwhile, your agency takes three days to turn around a single ad. Your designer is backed up. And the trending product you spent months researching? Someone else launched it first. They saw the signal early. You didn't, because you were using the same tools as everyone else.
                    </p>
                    <p>
                      This is the problem I kept running into. Not the lack of tools. The lack of an unfair advantage. No one could show me which competitor ads were truly scaling. No one could turn that intelligence into a ready-to-launch ad in minutes. No one could tell me what was about to trend before it peaked.
                    </p>
                    <p>So we built HypeOn.</p>
                    <p>It decodes every competitor ad - spend, reach, the winning angles - so you start from what already works. It turns that intelligence into static, video, and UGC creatives in seconds, not weeks. And it spots breakout products and pricing gaps before the market catches on - so your next move is always the right one.

                    </p>
                    <div className="pt-12 border-t border-[#F0F0EB]">
                      <p className="font-semibold text-black text-[20px]">Yash Kumar</p>
                      <p className="text-sm opacity-50">founder</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Hover Hint */}
            {!isExpanded && (
              <div className={`
                absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 
                transition-all duration-300 pointer-events-none
                ${viewState === 'hovered' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}>
                <Mail size={16} className="text-black" />
                <span className="text-sm font-medium text-black whitespace-nowrap">Read our founder letter</span>
              </div>
            )}
          </div>
        </div>
      </section>
        </Cell>
      </Section>
    </main>
  );
}
