export default function AboutIntro() {
  return (
    <section className="relative pt-36 pb-28 overflow-hidden">
      {/* Soft overlay to blend with global background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center reveal">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 mb-6 rounded-full border px-4 py-1 text-xs backdrop-blur-sm bg-white/60">
           About HypeOn AI
        </span>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-display leading-tight">
          Predict what’s next. <br />
          <span className="text-brand-600">Build what sells.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto">
          We help eCommerce teams answer one hard question:
        </p>

        <p className="mt-3 text-xl font-display">
          What to sell, how to sell it, and when.
        </p>
      </div>
    </section>
  );
}
