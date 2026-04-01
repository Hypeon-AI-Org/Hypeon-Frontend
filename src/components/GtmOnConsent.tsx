"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-N3J2S7LP";
const SCRIPT_ID = "hypeon-gtm-loader";

type ConsentDetail = {
  essential: true;
  marketing: boolean;
  personalised: boolean;
  analytics: boolean;
  decidedAt: string;
};

function shouldLoadGtm(detail: ConsentDetail | null | undefined) {
  if (!detail) return false;
  return Boolean(detail.marketing || detail.analytics);
}

function loadGtmOnce() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SCRIPT_ID)) return;

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}

export default function GtmOnConsent() {
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentDetail>).detail;
      if (shouldLoadGtm(detail)) loadGtmOnce();
    };

    window.addEventListener("hypeon:cookie-consent", handler as EventListener);
    return () => window.removeEventListener("hypeon:cookie-consent", handler as EventListener);
  }, []);

  return null;
}

