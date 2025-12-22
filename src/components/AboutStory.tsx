export default function AboutStory() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Soft ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/40 via-transparent to-indigo-50/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">

        {/* LEFT — STORY */}
        <div className="reveal-left">
          <h2 className="text-3xl md:text-4xl font-display leading-tight">
            Our <span className="text-brand-600">Story</span>
          </h2>

          <div className="mt-10 space-y-6 text-slate-600 leading-relaxed max-w-xl">
            <p>
              After <span className="font-display text-slate-900">5+ years in eCommerce</span>,
              we realized most ad tests fail — not because of creatives,
              but because the product was never meant to work.
            </p>

            <p>
              Existing tools look backward. We built HypeOn AI
              to show what’s coming next.
            </p>

            <p>
              Instead of dashboards, HypeOn starts with your niche
              and predicts what to launch.
            </p>
          </div>

          {/* Query chip */}
          <div className="mt-10 inline-flex items-center gap-2 rounded-2xl border bg-white/80 px-6 py-3 text-sm font-display backdrop-blur shadow-sm">
            “Pet accessories in Germany”
          </div>
        </div>

        {/* RIGHT — FLOATING OUTPUT CARD */}
        <div className="relative reveal-right">
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div
            className="
              glass-card
              p-10
              rounded-[32px]
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
              animate-float
            "
          >
            <p className="text-xs tracking-widest text-slate-500 mb-6">
              INSTANT OUTPUT
            </p>

            <ul className="space-y-4 text-slate-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-600" />
                Trending products
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-600" />
                Rising keywords
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-600" />
                Winning creative angles
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-600" />
                Launch Score (demand × competition)
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t text-sm font-display text-slate-900">
              Stop guessing. Start knowing what to launch.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
