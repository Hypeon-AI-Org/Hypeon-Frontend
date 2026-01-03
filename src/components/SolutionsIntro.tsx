export default function SolutionsIntro() {
  return (
    <section className="relative pt-36 pb-28 overflow-hidden">
      {/* Soft overlay to blend with global background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 text-center reveal">
        {/* Headline */}
        <h1 className="text-5xl md:text-5xl font-display leading-tight">
          Growth with{" "}
          <span className="text-brand-600">Profitability</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
          Stop wasting months on research and budget on failed experiments. 
          HypeOn Intelligence delivers validated winners that drive real revenue.
        </p>
      </div>
    </section>
  );
}
