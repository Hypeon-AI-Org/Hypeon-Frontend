export default function AboutIntro() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-[#F9F7F4]">
      <div className="relative max-w-5xl mx-auto px-6 reveal">
        {/* Hero pattern: badge → headline → subtitle */}
        <p className="section-label mb-5">About HypeOn AI</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
          Predict what's next.{' '}
          <span className="text-slate-500">Build what sells.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
          We help eCommerce teams answer one hard question: what to sell, how to sell it, and what price.
        </p>
      </div>
    </section>
  );
}
