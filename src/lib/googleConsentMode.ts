/**
 * Google Consent Mode v2 - maps HypeOn prefs to gtag consent types.
 * Configure GTM tags to require the matching consent types (Consent Overview / per-tag).
 */
export type ConsentPrefsLike = {
  marketing: boolean;
  analytics: boolean;
  personalised: boolean;
};

export type GtagConsentUpdate = {
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  functionality_storage: "granted" | "denied";
  personalization_storage: "granted" | "denied";
  security_storage: "granted" | "denied";
};

export function consentModeUpdateFromPrefs(p: ConsentPrefsLike): GtagConsentUpdate {
  const m = p.marketing;
  const a = p.analytics;
  const pers = p.personalised;
  return {
    ad_storage: m ? "granted" : "denied",
    ad_user_data: m ? "granted" : "denied",
    ad_personalization: m && pers ? "granted" : "denied",
    analytics_storage: a ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: pers ? "granted" : "denied",
    security_storage: "granted",
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureDataLayerAndGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
}

/** Call on every consent change so GTM / tags receive the latest v2 state. */
export function pushGoogleConsentUpdate(p: ConsentPrefsLike) {
  if (typeof window === "undefined") return;
  ensureDataLayerAndGtag();
  window.gtag!("consent", "update", consentModeUpdateFromPrefs(p));
}
