import type { CSSProperties } from "react"

/**
 * Right-panel copy scale for feature-card workspace previews (FounderDecisionMap).
 * Keeps section titles and body text visually consistent across cards; metrics and accents can stay larger.
 */


/** Outer workspace preview shell — same as Pricing Intelligence (03) in FounderDecisionMap. */
export const WORKSPACE_PREVIEW_SHELL_STYLE: CSSProperties = {
  background: `
   radial-gradient(ellipse 130% 100% at 8% 12%, rgba(150, 205, 175, 0.58) 0%, transparent 52%),
            radial-gradient(ellipse 115% 95% at 92% 8%, rgba(155, 185, 230, 0.52) 0%, transparent 48%),
            radial-gradient(ellipse 100% 85% at 55% 95%, rgba(235, 215, 140, 0.48) 0%, transparent 46%),
            radial-gradient(ellipse 90% 70% at 35% 50%, rgba(190, 220, 200, 0.32) 0%, transparent 42%),
            linear-gradient(168deg, #9fc4b0 0%, #c2dcc8 24%, #d0dce8 50%, #e0d8b8 76%, #b8ccb8 100%)

  `,
}

/** Padding so soft radial / linear glow stays visible around the dashboard on all sides. */
export const WORKSPACE_PREVIEW_GLOW_GUTTER =
  "p-2.5 sm:p-4 md:p-5 lg:p-6" as const

/** Centers the main dashboard card inside the glow layer (top-aligned on small screens so nothing is clipped). */
export const WORKSPACE_PREVIEW_INNER_CENTER =
  "relative z-10 flex h-full min-h-0 w-full flex-1 flex-col items-center justify-start md:justify-center min-h-0 max-md:items-stretch max-md:pt-1" as const

/** Slightly smaller than the inset so gradient shows top, bottom, left, and right. */
export const WORKSPACE_PREVIEW_DASHBOARD_FRAME =
  "flex h-auto min-h-0 w-full max-w-full flex-col md:h-[96%] md:w-[96%] md:max-h-full" as const

/**
 * Used with fillHeight on feature-card previews: `min-h-0` avoids flex overflow bugs on desktop,
 * but on mobile it can collapse the preview; a floor keeps the mock UI readable.
 */
export const WORKSPACE_PREVIEW_FILL_HEIGHT_CLASS =
  "h-full min-h-0 max-md:min-h-[520px]" as const
