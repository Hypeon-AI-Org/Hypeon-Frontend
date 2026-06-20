'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Globe, Mail, Loader2, ArrowRight, X, Sparkles } from 'lucide-react';

const CONSENT_KEY = 'hypeon_cookie_consent_v1';
const POPUP_DELAY_MS = 1200;
const SUCCESS_AUTOHIDE_MS = 3500;

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const parts = document.cookie.split('; ');
  for (const part of parts) {
    if (!part) continue;
    const idx = part.indexOf('=');
    const k = idx >= 0 ? part.slice(0, idx) : part;
    if (k === name) return idx >= 0 ? part.slice(idx + 1) : '';
  }
  return null;
}

export default function CompetitorReportPopup() {
  const [open, setOpen] = useState(false);
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const reduceMotion = useReducedMotion();
  const closedRef = useRef(false);

  // Open after the user has decided cookie consent (or already had a saved decision).
  // Shows every page load — no "seen" memory.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: number | undefined;

    const scheduleOpen = () => {
      if (closedRef.current) return;
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        if (closedRef.current) return;
        setOpen(true);
      }, POPUP_DELAY_MS);
    };

    if (getCookie(CONSENT_KEY)) {
      scheduleOpen();
    }

    const onConsent = () => scheduleOpen();
    window.addEventListener('hypeon:cookie-consent', onConsent);
    return () => {
      window.removeEventListener('hypeon:cookie-consent', onConsent);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  // Body scroll lock + ESC to close.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-close shortly after success.
  useEffect(() => {
    if (submitState !== 'success') return;
    const id = window.setTimeout(() => {
      closePopup();
    }, SUCCESS_AUTOHIDE_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitState]);

  function closePopup() {
    closedRef.current = true;
    setOpen(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/competitor-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: website.trim(), email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSubmitState('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitState('success');
      setWebsite('');
      setEmail('');
    } catch {
      setSubmitState('error');
      setErrorMessage('Network error. Please try again.');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="competitor-popup"
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="competitor-popup-title"
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            aria-hidden
            onClick={closePopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-md sm:max-w-lg"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute -inset-[1px] rounded-[1.15rem] bg-gradient-to-br from-emerald-500/25 via-slate-300/20 to-violet-500/20 opacity-80 blur-[2px]"
              aria-hidden
            />
            <div className="relative rounded-2xl border border-neutral-200/90 bg-white px-5 pb-5 pt-5 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.35)] sm:px-7 sm:pb-7 sm:pt-7">
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>

              <div className="mb-4 inline-flex items-center gap-2">
                <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 shadow-sm">
                  <Sparkles className="h-3 w-3 text-brand-600" strokeWidth={2} aria-hidden />
                  Competitor report
                </span>
              </div>

              <h2
                id="competitor-popup-title"
                className="pr-6 text-[1.4rem] font-bold leading-[1.15] tracking-tight text-black sm:text-[1.6rem]"
              >
                Get a{' '}
                <span className="bg-gradient-to-r from-brand-600 to-brand-600/80 bg-clip-text text-transparent">
                  competitor report
                </span>{' '}
                in minutes
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                Paste a competitor website and we&apos;ll email a shareable deck — real ad data,
                creative angles, and timelines.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:gap-4">
                <label className="sr-only" htmlFor="popup-competitor-url">
                  Competitor website
                </label>
                <div className="group flex min-h-[48px] items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-neutral-300 focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-black/[0.07]">
                  <Globe
                    className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-focus-within:text-neutral-600"
                    strokeWidth={1.35}
                    aria-hidden
                  />
                  <input
                    id="popup-competitor-url"
                    type="url"
                    name="website"
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                      if (submitState !== 'idle' && submitState !== 'loading') {
                        setSubmitState('idle');
                        setErrorMessage('');
                      }
                    }}
                    placeholder="Paste your competitor website"
                    className="min-w-0 flex-1 bg-transparent text-[15px] leading-normal text-slate-900 placeholder:text-neutral-400 outline-none"
                    autoComplete="url"
                    required
                  />
                </div>

                <label className="sr-only" htmlFor="popup-company-email">
                  Company email
                </label>
                <div className="group flex min-h-[48px] items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-neutral-300 focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-black/[0.07]">
                  <Mail
                    className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-focus-within:text-neutral-600"
                    strokeWidth={1.35}
                    aria-hidden
                  />
                  <input
                    id="popup-company-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (submitState !== 'idle' && submitState !== 'loading') {
                        setSubmitState('idle');
                        setErrorMessage('');
                      }
                    }}
                    placeholder="Your company email"
                    className="min-w-0 flex-1 bg-transparent text-[15px] leading-normal text-slate-900 placeholder:text-neutral-400 outline-none"
                    autoComplete="email"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitState === 'loading'}
                  aria-busy={submitState === 'loading'}
                  whileHover={reduceMotion || submitState === 'loading' ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion || submitState === 'loading' ? undefined : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                  className="group relative mt-1 flex min-h-[48px] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-6 py-3 text-[15px] font-medium text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] disabled:cursor-not-allowed disabled:opacity-90"
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)',
                    }}
                  />
                  {submitState === 'loading' ? (
                    <>
                      <Loader2
                        className="relative h-5 w-5 shrink-0 motion-safe:animate-spin"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="relative">Generating report…</span>
                    </>
                  ) : (
                    <>
                      <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                      <span className="relative">Get Free Report</span>
                    </>
                  )}
                </motion.button>

                <p
                  className="min-h-[1.25rem] text-center text-sm"
                  aria-live="polite"
                  role="status"
                >
                  {submitState === 'success' && (
                    <span className="font-medium text-brand-600">
                      Check your inbox — we&apos;ve sent your report details.
                    </span>
                  )}
                  {submitState === 'error' && errorMessage && (
                    <span className="font-medium text-red-600">{errorMessage}</span>
                  )}
                  {submitState !== 'success' && submitState !== 'error' && (
                    <span className="text-neutral-500">
                      No spam. We&apos;ll never share your email.
                    </span>
                  )}
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
