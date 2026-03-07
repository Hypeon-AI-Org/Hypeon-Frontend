import React from 'react';

const CopilotSection = () => {
  return (
    <section id="copilot" className="py-24 bg-white border-y border-gray-200 font-sans">
      <div className="max-w-[1300px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* --- Left Side: Chat UI – scroll reveal --- */}
          <div className="bg-white border border-gray-200 rounded-[20px] shadow-2xl overflow-hidden reveal-left">
            {/* Chat Titlebar */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-900">
                  <div className="w-[7px] height-[7px] rounded-full bg-emerald-600 shadow-[0_0_0_2.5px_rgba(5,150,105,0.2)] animate-pulse" />
                  HypeOn AI Copilot
                </div>
                <span className="text-[11px] bg-pink-50 text-white-600 px-2 py-0.5 rounded-full border border-pink-200">
                  Live Data
                </span>
              </div>
              <span className="text-[11px] text-gray-400">Today 10:34</span>
            </div>

            {/* Chat Body */}
            <div className="p-5 flex flex-col gap-3.5 max-h-[480px] overflow-hidden">
              <div className="text-center text-[11px] text-gray-400">
                Attribution data synced 2 minutes ago
              </div>

              {/* User Message */}
              <div className="flex gap-2.5 flex-row-reverse">
                <div className="w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
                  JD
                </div>
                <div className="max-w-[82%] p-3 rounded-[14px] rounded-tr-none bg-pink-600  text-white text-[13.5px] leading-relaxed">
                  Which channel should I put more money into this week?
                </div>
              </div>

              {/* AI Message */}
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="6.5" width="2" height="4" rx="0.75" fill="white" />
                    <rect x="5" y="4" width="2" height="6.5" rx="0.75" fill="white" />
                    <rect x="9" y="1.5" width="2" height="9" rx="0.75" fill="white" />
                  </svg>
                </div>
                <div className="max-w-[82%] p-3 rounded-[14px] rounded-tl-none bg-gray-50 border border-gray-200 text-gray-700 text-[13.5px] leading-relaxed">
                  <div className="mb-2.5">Here's your channel performance breakdown for the last 7 days:</div>

                  {/* Performance Cards */}
                  <div className="flex flex-col gap-1.5 mt-2.5">
                    <ChannelRow name="Google CPC" icon="G" color="#4285F4" roas="4.26×" width="85%" />
                    <ChannelRow name="Facebook" icon="f" color="#1877F2" roas="3.50×" width="70%" />
                    <ChannelRow name="TikTok" icon="T" color="#555" roas="2.91×" width="58%" />
                  </div>

                  {/* Recommendation Card */}
                  <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-blue-600 mb-1.5">⚡ Recommendation</div>
                    <div className="text-[13px] font-medium text-gray-900 mb-2">Move £3,200 from TikTok → Google CPC</div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 font-medium">Blended ROAS: 4.50×</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-bold text-emerald-600">4.82× expected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-4 flex items-center gap-2.5">
              <input
                className="flex-1 text-[13px] text-gray-500 bg-transparent outline-none"
                placeholder="Ask your attribution data anything..."
                type="text"
              />
              <button className="w-[30px] h-[30px] bg-pink-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 11.5L12 7 2.5 2.5v3.25L9 7 2.5 8.25V11.5z" fill="white" />
                </svg>
              </button>
            </div>
          </div>

          {/* --- Right Side: Text Content – scroll reveal --- */}
          <div className="pl-10 reveal-right">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-wide text-white-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full uppercase mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-white-600" />
              AI Copilot
            </div>
            <h2 className="text-[46px] leading-[1.12] font-bold tracking-tight text-gray-900 mb-4 font-display">
              The future of attribution is <span className='text-brand-600'>conversational</span>
            </h2>
            <p className="text-[17px] leading-relaxed text-gray-500 mb-10">
              Ask your marketing data anything in plain English. The Copilot analyzes your live attribution data and gives you clear answers and actionable budget decisions.
            </p>

            <div className="flex flex-col gap-8 reveal-stagger">
              <FeatureItem
                title="Live data, zero hallucination"
                desc="Every answer is grounded in your real attribution data — not guesswork or generic benchmarks."
                icon={<CheckIcon />}
              />
              <FeatureItem
                title="Plain English questions"
                desc="No SQL. No BI dashboards. Just ask what you want to know and get a decision-ready answer in seconds."
                icon={<TextIcon />}
              />
              <FeatureItem
                title="Budget recommendations"
                desc="Get clear scale / hold / cut signals for each channel, with projected ROAS impact before you move a penny."
                icon={<ArrowUpIcon />}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* --- Sub-components for cleaner code --- */

const ChannelRow = ({ name, icon, color, roas, width }: any) => (
  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-2 px-3">
    <div className="flex items-center gap-2 text-xs font-medium">
      <div className="w-[18px] h-[18px] rounded flex items-center justify-center text-[9px] text-white font-bold" style={{ backgroundColor: color }}>{icon}</div>
      {name}
    </div>
    <div className="w-[60px] h-1 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width, backgroundColor: color }} />
    </div>
    <div className="text-[12px] font-semibold text-emerald-600">{roas}</div>
  </div>
);

const FeatureItem = ({ title, desc, icon }: any) => (
  <div className="flex gap-4 items-start">
    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-1 font-display">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </div>
);

/* --- Icons --- */
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="stroke-blue-600">
    <circle cx="9" cy="9" r="6" strokeWidth="1.4" /><path d="M6 9l2.5 2.5 3.5-4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="stroke-blue-600">
    <path d="M3 9h12M3 5h12M3 13h8" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="stroke-blue-600">
    <path d="M9 3v12M4 8l5-5 5 5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CopilotSection;