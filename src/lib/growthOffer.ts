/**
 * The Growth launch offer — one source of truth for the whole site.
 *
 * `offerPrice` buys the first month of the Growth plan, and the offer stands
 * until `endsAt` (UTC). The app enforces the same deadline server-side; the
 * site only announces it, and withdraws it on its own once the clock passes.
 * Kept in step with apps/studio-api/app/services/billing/plans.py in the
 * product repo: a price changed there must change here the same day.
 *
 * Read by the announcement banner (src/components/AnnouncementBanner.tsx),
 * the home pricing section and /pricing.
 */
export const STUDIO_PLANS_URL = "https://app.hypeon.ai/studio/plans";

export const GROWTH_OFFER = {
  planName: "Growth",
  offerPrice: 7.9,
  /** What Growth costs once the first month is over. */
  listPrice: 79,
  endsAt: "2026-09-06T11:00:00Z",
};

export function usd(n: number): string {
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;
}
