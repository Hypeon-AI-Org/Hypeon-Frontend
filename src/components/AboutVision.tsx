export default function AboutVision() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-transparent to-pink-50/40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">

        {/* LEFT – VISION TEXT */}
        <div className="reveal-left">
          <h2 className="text-3xl md:text-4xl font-display leading-tight">
            Our <span className="text-brand-600">Vision</span>
          </h2>

          <div className="mt-8 space-y-5 text-slate-600 leading-relaxed max-w-xl">
            <p>
              To build the most trusted AI Copilot for product and marketing
              decisions — not just to analyze trends, but to anticipate them
              before anyone else does.
            </p>

            <p>
              We believe product-market fit should be{" "}
              <span className="font-display text-slate-900">predictable</span>,
              not guessed.
            </p>
          </div>
        </div>

        {/* RIGHT – FLOATING OUTCOMES CARD */}
        <div className="relative reveal-right">
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div
            className="
              glass-card
              rounded-[32px]
              p-10
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
              animate-float
            "
          >
            {/* label */}
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-6">
              What this enables
            </p>

            <ul className="space-y-4 text-slate-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-600" />
                Marketers spot rising demand before the crowd
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-600" />
                Founders launch products with confidence
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-600" />
                Dropshippers avoid dead-on-arrival products
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-600" />
                Creators craft content that rides the wave
              </li>
            </ul>

            {/* divider */}
            <div className="my-8 h-px w-full bg-slate-200/70" />

            <p className="text-sm font-display text-slate-900 leading-relaxed">
              Helping every D2C brand know exactly what to sell,
              how to sell it, and when to launch.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
