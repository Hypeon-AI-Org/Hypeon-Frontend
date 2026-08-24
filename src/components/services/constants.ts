/* ============================================================
   Theme lifted from the HypeOn Intelligence product page so this
   route reads as the same product: crisp white with fine grey
   hairlines, ink headings, big rounded #0a0a0c slabs for contrast,
   the teal dot-grid backdrop, and the signature gradient pill.
   ============================================================ */

export const C = {
  ink: "#0a0a0c", // dark slab background
  inkPanel: "#131316", // card inside a dark slab
  heading: "#1a1a1a", // light-section heading
  headingAlt: "#111", // dense UI ink
  body: "#555",
  muted: "#666",
  faint: "#999",
  hairline: "#E5E7EB", // card border on white
  hairlineSoft: "#f0f0f0",
  wash: "#fafafa", // near-white panel
  accent: "#d4d4d8", // neutral - positive signal (kept greyscale)
  accentBlue: "#4f8ef7", // data / sparkline blue
  dot: "rgba(52,120,110", // teal dot-grid, closed in the helpers below
} as const;

/** The product page's signature CTA pill (gradient + ring + soft shadow). */
export const PILL_BUTTON =
  "group relative inline-flex min-h-[46px] items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] py-2 pl-2 pr-5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)]";

/** Secondary button, as used beside the pill on the product hero. */
export const GHOST_BUTTON =
  "inline-flex min-h-[46px] items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-slate-50";

/** Shared in-view reveal, matching the product page's motion preset. */
export const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
} as const;

/** The two-layer teal dot-grid used behind the product hero. */
export const dotGridLayers = [
  {
    backgroundImage:
      "radial-gradient(circle, rgba(52,120,110,0.35) 1.5px, transparent 1.5px)",
    backgroundSize: "26px 26px",
    maskImage:
      "radial-gradient(ellipse 70% 60% at 50% 30%, transparent 40%, black 100%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 70% 60% at 50% 30%, transparent 40%, black 100%)",
    animation: "dotDrift 5s ease-in-out infinite",
  },
  {
    backgroundImage:
      "radial-gradient(circle, rgba(52,120,110,0.28) 2px, transparent 2px)",
    backgroundSize: "52px 52px",
    maskImage:
      "radial-gradient(ellipse 70% 60% at 50% 30%, transparent 40%, black 100%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 70% 60% at 50% 30%, transparent 40%, black 100%)",
    animation: "dotDriftSlow 7s ease-in-out infinite",
  },
] as const;

/** Single source of truth for the booking link used across the services page. */
export const CALENDLY_URL = "https://calendly.com/yash-hypeon/30min";

/** Calendly's embed view of the same 30-min slot, styled to the page. */
export const CALENDLY_EMBED_URL =
  "https://calendly.com/yash-hypeon/30min?hide_gdpr_banner=1&hide_event_type_details=0&background_color=ffffff&text_color=0f172a&primary_color=0f172a";
