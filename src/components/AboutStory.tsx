export default function AboutStory() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-100" />
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT — STORY */}
        <div className="reveal-left">
          <p className="section-label mb-4">Our Story</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            Built from frustration,{' '}
            <span className="text-slate-500">refined by data.</span>
          </h2>

          <div className="mt-8 space-y-5 text-slate-500 leading-relaxed">
            <p>
              After years in eCommerce and performance marketing, we kept seeing the same mistakes repeated.
            </p>
            <p>
              Months of research, expensive tools, endless testing — and still the wrong product, wrong price, wrong keyword, wrong message.
            </p>
            <p>
              Teams fight CPCs and CPAs instead of fixing the real problem. We built{' '}
              <span className="font-medium text-slate-800">HypeOn AI</span> to end that cycle.
            </p>
            <p>
              Our goal is simple:{' '}
              <span className="font-medium text-slate-800">profitable growth</span>.
            </p>
            <p>
              HypeOn helps you decide what to launch, how to price it, which keywords customers actually buy from, and which ad creatives already convert —{' '}
              <span className="font-medium text-slate-800">before you spend a dollar</span>.
            </p>
          </div>
        </div>

        {/* RIGHT — OUTPUT CARD */}
        <div className="relative reveal-right">
          <div
            className="bg-white rounded-2xl p-10 border border-slate-200 shadow-md animate-float"
          >
            <p className="text-xs tracking-widest text-slate-400 uppercase font-medium mb-6">
              Instant Output
            </p>
            <ul className="space-y-4 text-slate-700 text-sm">
              {[
                'Trending products',
                'Rising keywords',
                'Winning creative angles',
                'Launch Score (demand × competition)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-900 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-100 text-sm font-semibold text-slate-900">
              Stop guessing. Start knowing what to launch.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
