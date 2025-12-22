export default function HypeScoreSection() {
  return (
    <section className="py-24 bg-white relative z-10 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div className="reveal-left">
          <h2 className="text-3xl font-display">
            Powered by the <span className="text-brand-600">Hype Score</span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-md">
            A single intelligence metric designed to predict performance
            before trends become obvious.
          </p>

          {/* Dimension Boxes */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="glass-card p-6 rounded-3xl float-card">
              <p className="text-sm font-display">Demand Momentum (DM)</p>
              <p className="mt-1 text-xs text-slate-600">
                Measures how fast demand is rising or cooling.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl float-card delay-1">
              <p className="text-sm font-display">Seasonal Fit (SF)</p>
              <p className="mt-1 text-xs text-slate-600">
                Evaluates whether timing amplifies or limits demand.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl float-card delay-2">
              <p className="text-sm font-display">Margin Potential (MP)</p>
              <p className="mt-1 text-xs text-slate-600">
                Estimates profitability for the product or niche.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl float-card delay-3">
              <p className="text-sm font-display">Competition Pressure (CP)</p>
              <p className="mt-1 text-xs text-slate-600">
                Analyzes how crowded and competitive the market is.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT – FLOATING PREVIEW */}
        <div className="hypeon-glow-box p-8 reveal-right float-preview">
           <div className="preview-frame">
    <img
      src="/images/preview3.png"
      alt="Hype Score analytics preview"
      className="preview-img"
    />
  </div>
        </div>

      </div>
    </section>
  );
}
