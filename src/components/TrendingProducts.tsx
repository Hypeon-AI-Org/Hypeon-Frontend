/* ---------- ICONS ---------- */

const ProductIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 7h10M7 12h10M7 17h6" />
  </svg>
);

const HypeScoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 12l5-3" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const WeeklyGrowthIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l6-6 4 4 7-7" />
    <path d="M14 4h7v7" />
  </svg>
);

const MonthlyGrowthIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5" />
    <path d="M10 19V9" />
    <path d="M16 19V3" />
  </svg>
);

/* ---------- SECTION ---------- */

export default function TrendingProducts() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT — CONTENT */}
        <div className="reveal">
          <h2 className="text-3xl font-display">
            Trending <span className="text-brand-600">Products</span>
          </h2>

          <p className="mt-4 text-slate-600">
            Find winning products before they go viral.
          </p>

          <p className="mt-4 text-slate-600 leading-relaxed">
            HypeOn AI scans millions of data points across TikTok, Amazon,
            Shopify, and social platforms to detect early-stage demand.
            Launch before competitors — not after.
          </p>
        </div>

        {/* RIGHT — INSIGHT GRID */}
        <div className="grid grid-cols-2 gap-6 reveal-stagger">

          {/* Product */}
           <div className="glass-card p-6 rounded-3xl float-card ">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <ProductIcon />
              Product
            </p>
            <p className="mt-2 font-display text-sm">
              Product Title
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Identified early before peak demand
            </p>
          </div>

          {/* Hype Score */}
         <div className="glass-card p-6 rounded-3xl float-card delay-1">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <HypeScoreIcon />
              Hype Score 
            </p>
            <p className="mt-2 font-display text-2xl text-brand-600">
              82
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Strong upward momentum this week
            </p>
          </div>

          {/* Weekly Growth */}
           <div className="glass-card p-6 rounded-3xl float-card delay-1">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <WeeklyGrowthIcon />
              Weekly Growth
            </p>
            <p className="mt-2 font-display text-sm">
              +97%
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Rapid acceleration detected
            </p>
          </div>

          {/* Monthly Growth */}
           <div className="glass-card p-6 rounded-3xl float-card delay-1">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <MonthlyGrowthIcon />
              Monthly Growth
            </p>
            <p className="mt-2 font-display text-sm">
              +98%
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Sustained trend expansion
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
