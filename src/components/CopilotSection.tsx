export default function CopilotSection() {
  return (
    <section id="copilot" className="relative py-32 overflow-hidden border-t border-slate-100">
      {/* Soft background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center reveal">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-display leading-tight">
          HypeOn <span className="text-brand-600">Copilot</span>
        </h2>

        {/* Subheading */}
        <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
          A conversational intelligence layer for insights, predictions,
          and confident decision-making.
        </p>

        {/* Cards */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-stretch">

  {/* BASIC */}
  <div className="glass-card rounded-[32px] p-10 text-left grid grid-rows-[auto_auto_1fr]">
    <div>
      <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
        HypeOn Basic
      </span>

      <h3 className="mt-2 text-2xl font-display text-slate-900">
        Generalised Chatbot Brain
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 max-w-md">
        A multi-model AI built for ideation, exploration,
        and high-level market understanding.
      </p>
    </div>

    <div className="mt-8">
      <p className="text-xs text-slate-500 mb-3">Powered by</p>
      <div className="flex gap-2 mb-6">
        <span className="pill">GPT</span>
        <span className="pill">Gemini</span>
        <span className="pill">Claude</span>
      </div>

      <ul className="space-y-3 text-sm text-slate-700">
        <li>• Brainstorming & ideation</li>
        <li>• General market questions</li>
        <li>• High-level insights</li>
        <li>• “What should I sell?” type queries</li>
      </ul>
    </div>
  </div>

  {/* PRO */}
  <div className="glass-card rounded-[32px] p-10 text-left grid grid-rows-[auto_auto_1fr] border border-brand-200 relative overflow-hidden">
    
    {/* Curved glow */}
    <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

    <div>
      <span className="text-xs font-semibold tracking-wide text-brand-600 uppercase">
        HypeOn Pro
      </span>

      <h3 className="mt-2 text-2xl font-display text-slate-900">
        E-Commerce Prediction Brain
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 max-w-md">
        A proprietary AI trained on real e-commerce ecosystems
        to predict what actually works.
      </p>
    </div>

    <div className="mt-8">
      <ul className="space-y-3 text-sm text-slate-700 mb-6">
        <li>• Top niche e-commerce sites</li>
        <li>• Amazon & Shopify stores</li>
        <li>• Pinterest trend signals</li>
        <li>• Walmart listings</li>
      </ul>

      <div className="grid grid-cols-2 gap-3 max-w-md">
        <span className="feature-pill">Niche prediction</span>
        <span className="feature-pill">Country insights</span>
        <span className="feature-pill">Keyword performance</span>
        <span className="feature-pill">Creative angles</span>
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
