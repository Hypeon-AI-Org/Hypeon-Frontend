export default function SolutionsIntro() {
  return (
    <section className="relative pt-24 pb-28 overflow-hidden">
      {/* Soft overlay to blend with global background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 text-center reveal">
        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tighter leading-tight">
          Growth with{" "}
          <span className="text-[#696863]">Profitability</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-3xl mx-auto text-base text-slate-600">
          Stop wasting months on research and budget on failed experiments. 
          HypeOn Intelligence delivers validated winners that drive real revenue.
        </p>
      </div>
    </section>
  );
}
