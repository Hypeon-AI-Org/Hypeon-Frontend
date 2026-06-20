"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "hypeon_cookie_consent_v1";
const CONSENT_MAX_AGE_DAYS = 180;

type Consent = {
  essential: true;
  marketing: boolean;
  personalised: boolean;
  analytics: boolean;
  decidedAt: string; // ISO
};

type ConsentPrefs = Omit<Consent, "decidedAt">;

const defaultPrefs: ConsentPrefs = {
  essential: true,
  marketing: false,
  personalised: false,
  analytics: false,
};

function nowIso() {
  return new Date().toISOString();
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (!part) continue;
    const idx = part.indexOf("=");
    const k = idx >= 0 ? part.slice(0, idx) : part;
    if (k === name) return idx >= 0 ? part.slice(idx + 1) : "";
  }
  return null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const maxAge = Math.max(0, Math.floor(days * 24 * 60 * 60));
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = [
    `${name}=${value}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function readConsent(): Consent | null {
  const parse = (raw: string | null): Consent | null => {
    if (!raw) return null;
    try {
      const decoded = decodeURIComponent(raw);
      const parsed = JSON.parse(decoded) as Partial<Consent> | null;
      if (!parsed || typeof parsed !== "object") return null;
      return {
        essential: true,
        marketing: Boolean(parsed.marketing),
        personalised: Boolean(parsed.personalised),
        analytics: Boolean(parsed.analytics),
        decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : nowIso(),
      };
    } catch {
      return null;
    }
  };

  // Prefer browser cookie so it's visible in DevTools -> Application -> Cookies.
  const fromCookie = parse(getCookie(CONSENT_KEY));
  if (fromCookie) return fromCookie;

  // Back-compat: migrate previous localStorage consent into cookie once.
  try {
    const fromLocal = parse(localStorage.getItem(CONSENT_KEY));
    if (fromLocal) {
      setCookie(CONSENT_KEY, encodeURIComponent(JSON.stringify(fromLocal)), CONSENT_MAX_AGE_DAYS);
      return fromLocal;
    }
  } catch {
    // ignore
  }

  return null;
}

function writeConsent(prefs: ConsentPrefs) {
  const payload: Consent = { ...prefs, essential: true, decidedAt: nowIso() };
  const encoded = encodeURIComponent(JSON.stringify(payload));
  setCookie(CONSENT_KEY, encoded, CONSENT_MAX_AGE_DAYS);

  // Optional mirror for debugging/legacy paths.
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors (private mode, blocked storage, etc.)
  }

  // Let other parts of the app react immediately (e.g. load GTM after consent).
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("hypeon:cookie-consent", { detail: payload }));
  }
}

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={[
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        checked ? "bg-slate-900" : "bg-slate-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

export default function CookieBanner() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>(defaultPrefs);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setBannerOpen(true);
      setPrefs(defaultPrefs);
      return;
    }
    setBannerOpen(false);
    setPrefs({
      essential: true,
      marketing: existing.marketing,
      personalised: existing.personalised,
      analytics: existing.analytics,
    });
  }, []);

  useEffect(() => {
    const onOpenPrefs = () => {
      const existing = readConsent();
      if (existing) {
        setPrefs({
          essential: true,
          marketing: existing.marketing,
          personalised: existing.personalised,
          analytics: existing.analytics,
        });
      } else {
        setPrefs(defaultPrefs);
      }
      setBannerOpen(false);
      setPrefsOpen(true);
    };

    window.addEventListener("hypeon:open-cookie-prefs", onOpenPrefs);
    return () => window.removeEventListener("hypeon:open-cookie-prefs", onOpenPrefs);
  }, []);

  const allowAll = () => {
    const next = { essential: true, marketing: true, personalised: true, analytics: true } as const;
    writeConsent(next);
    setPrefs(next);
    setPrefsOpen(false);
    setBannerOpen(false);
  };

  const rejectAll = () => {
    const next: ConsentPrefs = { ...defaultPrefs };
    writeConsent(next);
    setPrefs(next);
    setPrefsOpen(false);
    setBannerOpen(false);
  };

  const savePrefs = () => {
    const next: ConsentPrefs = { ...prefs, essential: true };
    writeConsent(next);
    setPrefs(next);
    setPrefsOpen(false);
    setBannerOpen(false);
  };

  const description = useMemo(
    () =>
      "Not the tasty ones! These cookies help secure our site and enhance your visit. We'll only use them with your consent.",
    []
  );

  if (!bannerOpen && !prefsOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 transition-opacity duration-200 ${
          bannerOpen || prefsOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
        onClick={() => {
          // click-away closes prefs; banner stays until a choice is made
          if (prefsOpen) setPrefsOpen(false);
        }}
      />

      {/* Banner (bottom-right like reference) */}
      {bannerOpen && !prefsOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[min(100vw-3rem,26rem)]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-900">
                Cookies personalise your experience
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description} Learn more about our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-slate-900 underline underline-offset-2 hover:opacity-80"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={allowAll}
                  className="min-h-[44px] rounded-full bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:bg-slate-900"
                >
                  Allow All
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="min-h-[44px] rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 active:bg-slate-100"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => setPrefsOpen(true)}
                  className="col-span-2 min-h-[44px] rounded-full bg-slate-100 px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 active:bg-slate-200"
                >
                  Customise preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences modal */}
      {prefsOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[min(100vw-3rem,30rem)]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-900">Cookie preferences</p>
              <button
                type="button"
                onClick={() => setPrefsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close"
              >
                <span aria-hidden className="text-xl leading-none">
                  ×
                </span>
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-6 border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Essential</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      These are required for the site to function.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-slate-500">Always active</div>
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Marketing</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Used to deliver information that’s more relevant to you.
                    </p>
                  </div>
                  <Toggle
                    label="Marketing cookies"
                    checked={prefs.marketing}
                    onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                  />
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Personalised</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      These enhance our products by analysing usage data.
                    </p>
                  </div>
                  <Toggle
                    label="Personalised cookies"
                    checked={prefs.personalised}
                    onChange={(v) => setPrefs((p) => ({ ...p, personalised: v }))}
                  />
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Analytics</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Helps us understand usage to improve the site.
                    </p>
                  </div>
                  <Toggle
                    label="Analytics cookies"
                    checked={prefs.analytics}
                    onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={allowAll}
                  className="min-h-[44px] rounded-full bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:bg-slate-900"
                >
                  Allow All
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="min-h-[44px] rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 active:bg-slate-100"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={savePrefs}
                  className="col-span-2 min-h-[44px] rounded-full bg-slate-100 px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 active:bg-slate-200"
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

