"use client";

import { useEffect } from "react";
import {
  getMetaPixelBootstrapScript,
  META_PIXEL_SCRIPT_ID,
} from "@/lib/metaPixel";

const CONSENT_KEY = "hypeon_cookie_consent_v1";

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

function hasMarketingConsent(): boolean {
  const raw = getCookie(CONSENT_KEY);
  if (!raw) return false;
  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as { marketing?: boolean } | null;
    return Boolean(parsed?.marketing);
  } catch {
    return false;
  }
}

function injectMetaPixelBootstrap() {
  if (typeof document === "undefined") return;
  if (document.getElementById(META_PIXEL_SCRIPT_ID)) return;
  if (typeof window !== "undefined" && window.fbq) return;

  const s = document.createElement("script");
  s.id = META_PIXEL_SCRIPT_ID;
  s.textContent = getMetaPixelBootstrapScript();
  document.head.appendChild(s);
}

export default function MetaPixelOnConsent() {
  useEffect(() => {
    if (hasMarketingConsent()) injectMetaPixelBootstrap();

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ marketing?: boolean }>).detail;
      if (detail?.marketing) injectMetaPixelBootstrap();
    };

    window.addEventListener("hypeon:cookie-consent", handler as EventListener);
    return () =>
      window.removeEventListener("hypeon:cookie-consent", handler as EventListener);
  }, []);

  return null;
}
