/* ---------- ICONS ---------- */

const KeywordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="6" />
    <path d="M14.5 14.5L20 20" />
  </svg>
);

const VolumeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V9" />
    <path d="M10 19V5" />
    <path d="M16 19V12" />
  </svg>
);

const CpcIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

const ClickIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l7 17 2-7 7-2z" />
  </svg>
);

const KeywordScoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 12l4-2" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

/* ---------- SECTION ---------- */

export default function HighValueKeywords() {
  return (
    <section className="py-24 border-t">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT — CONTENT */}
        <div className="reveal">
          <h2 className="text-3xl font-display">
            High-Value <span className="text-brand-600">Keywords</span>
          </h2>

          <p className="mt-4 text-slate-600">
            Keywords your customers actually search — before everyone else finds them.
          </p>

          <p className="mt-4 text-slate-600 leading-relaxed">
            HypeOn AI scans trending searches across TikTok, Instagram, Google,
            Amazon, and top-performing ads to surface keywords with
            <strong> real buyer intent</strong>.
            You instantly know which keywords drive revenue — and which waste budget.
          </p>
        </div>

        {/* RIGHT — INSIGHT GRID */}
        <div className="grid grid-cols-2 gap-6 reveal-stagger">

          {/* Keyword */}
           <div className="glass-card p-6 rounded-3xl float-card ">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <KeywordIcon />
              Keyword
            </p>
            <p className="mt-2 font-display text-sm">
              “portable blender”
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Rising buyer-intent phrase
            </p>
          </div>

          {/* Search Volume */}
           <div className="glass-card p-6 rounded-3xl float-card delay-1">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <VolumeIcon />
              Search Volume
            </p>
            <p className="mt-2 font-display text-sm">
              48K / month
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Consistent upward demand
            </p>
          </div>

          {/* CPC */}
           <div className="glass-card p-6 rounded-3xl float-card delay-2">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <CpcIcon />
              CPC
            </p>
            <p className="mt-2 font-display text-sm">
              $0.74
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Low competition cost
            </p>
          </div>

          {/* Clicks */}
           <div className="glass-card p-6 rounded-3xl float-card delay-3">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <ClickIcon />
              Clicks
            </p>
            <p className="mt-2 font-display text-sm">
              12.6%
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Strong ad engagement
            </p>
          </div>

          {/* Hype Score */}
         

        </div>
      </div>
    </section>
  );
}
