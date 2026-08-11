// Small cross-component signal: <SiteIntro/> calls markIntroDone() once its
// entrance flash has fully finished, and any section (e.g. <Hero/>) can wait
// on onIntroDone() before starting its own timers/animations, so nothing
// animates hidden underneath the intro overlay.

const EVENT_NAME = 'hypeon:intro-done';

export function markIntroDone() {
  if (typeof window === 'undefined') return;
  (window as unknown as { __hypeonIntroDone?: boolean }).__hypeonIntroDone = true;
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function isIntroDone(): boolean {
  if (typeof window === 'undefined') return true;
  return Boolean((window as unknown as { __hypeonIntroDone?: boolean }).__hypeonIntroDone);
}

// Calls cb immediately if the intro has already finished; otherwise calls it
// the moment markIntroDone() fires. Returns an unsubscribe function.
export function onIntroDone(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  if (isIntroDone()) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(EVENT_NAME, handler, { once: true });
  return () => window.removeEventListener(EVENT_NAME, handler);
}
