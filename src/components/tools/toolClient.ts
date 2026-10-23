'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * Browser side of the free tools' bot check (see src/lib/tools/captcha.ts).
 * The first call sends a Turnstile token; the API answers with a tool session
 * that later calls from any tool on the page reuse until it expires.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    dataLayer?: unknown[];
  }
}

let session: string | null = null;
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error('Security check failed to load'));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

/** How long a click waits for Cloudflare before telling the visitor to retry. */
const TOKEN_WAIT_MS = 10_000;

/**
 * Mounts a Turnstile widget into the returned ref. `ready` is false while
 * Cloudflare is still verifying, so forms can disable their button instead of
 * letting a click wait silently. `getToken` resolves with a fresh token (null
 * when no token is needed) or throws a ToolError the form can show.
 */
export function useTurnstile(theme: 'light' | 'dark' = 'light') {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);
  const waiters = useRef<((t: string | null) => void)[]>([]);
  const [tokenReady, setTokenReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          // Always visible, so visitors see "Verifying… / Success!" instead of a silent wait.
          appearance: 'always',
          theme,
          // Stretches to the form's width instead of a fixed 300px box.
          size: 'flexible',
          'refresh-expired': 'auto',
          callback: (t: string) => {
            token.current = t;
            setTokenReady(true);
            setFailed(false);
            waiters.current.splice(0).forEach((w) => w(t));
          },
          'expired-callback': () => {
            token.current = null;
            setTokenReady(false);
          },
          // Without this a widget error left clicks waiting with no message.
          'error-callback': () => {
            token.current = null;
            setTokenReady(false);
            setFailed(true);
            waiters.current.splice(0).forEach((w) => w(null));
          },
        });
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
    // The widget is created once; the theme is fixed per form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getToken = useCallback(async (): Promise<string | null> => {
    if (!SITE_KEY || session) return null;
    const t =
      token.current ??
      (await new Promise<string | null>((resolve) => {
        waiters.current.push(resolve);
        setTimeout(() => resolve(null), TOKEN_WAIT_MS);
      }));
    if (!t) throw new ToolError('The security check did not finish. Please wait a moment and try again.');
    token.current = null;
    setTokenReady(false);
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    return t;
  }, []);

  /** A valid tool session from an earlier check on this page skips the captcha. */
  const ready = !SITE_KEY || Boolean(session) || tokenReady;
  return { ref, getToken, ready, failed };
}

export class ToolError extends Error {}

export async function postTool<T>(path: string, body: Record<string, unknown>, turnstileToken: string | null): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...body, session, turnstileToken }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) session = null;
  if (!res.ok) throw new ToolError(data.error || 'Something went wrong. Please try again.');
  if (typeof data.session === 'string') session = data.session;
  return data as T;
}

/** Pushes a usage event to GTM (only loaded after cookie consent). */
export function trackTool(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer?.push({ event, ...params });
}
