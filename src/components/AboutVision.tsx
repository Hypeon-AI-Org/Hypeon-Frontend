export default function AboutVision() {
  return (
    <section className="py-24 bg-[#F9F7F4] relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT – VISION TEXT */}
        <div className="reveal-left">
          <p className="section-label mb-4">Our Vision</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            The most trusted AI Copilot{' '}
            <span className="text-slate-500">for product decisions.</span>
          </h2>

          <div className="mt-8 space-y-5 text-slate-500 leading-relaxed">
            <p>
              To build the most trusted AI Copilot for product and marketing decisions — not just to analyze trends, but to anticipate them before anyone else does.
            </p>
            <p>
              We believe product-market fit should be{' '}
              <span className="font-semibold text-slate-900">predictable</span>, not guessed.
            </p>
          </div>
        </div>

        {/* RIGHT – OUTCOMES CARD */}
        <div className="relative reveal-right">
          <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-md animate-float">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-6">
              What this enables
            </p>
            <ul className="space-y-4 text-slate-700 text-sm">
              {[
                'Marketers spot rising demand before the crowd',
                'Founders launch products with confidence',
                'Dropshippers avoid dead-on-arrival products',
                'Creators craft content that rides the wave',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-slate-900 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-100 text-sm font-semibold text-slate-900 leading-relaxed">
              Helping every D2C brand know exactly what to sell, how to sell it, and when to launch.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
