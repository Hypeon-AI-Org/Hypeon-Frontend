/* ============================================================
   Shared "is the user scrolling?" signal.

   Heavy media (autoplaying <video>) decoding *during* a scroll is the
   main cause of scroll stutter on normal / older hardware. We pause
   every managed video while the page is scrolling and resume the moment
   it settles - so scrolling stays smooth and videos play when you stop.

   Lenis scrolls the real document, so the native window "scroll" event
   fires for both Lenis (desktop) and native touch scroll (mobile).
============================================================ */

type Listener = (scrolling: boolean) => void;

let scrolling = false;
let timer: ReturnType<typeof setTimeout> | null = null;
let started = false;
const listeners = new Set<Listener>();

function emit() {
    for (const l of listeners) l(scrolling);
}

function onScroll() {
    if (!scrolling) {
        scrolling = true;
        emit();
    }
    if (timer) clearTimeout(timer);
    // settle delay - long enough to cover Lenis momentum glide
    timer = setTimeout(() => {
        scrolling = false;
        emit();
    }, 180);
}

function ensureStarted() {
    if (started || typeof window === "undefined") return;
    started = true;
    window.addEventListener("scroll", onScroll, { passive: true });
}

export function isScrolling(): boolean {
    return scrolling;
}

/** Subscribe to scroll start/stop. Returns an unsubscribe fn. */
export function subscribeScroll(cb: Listener): () => void {
    ensureStarted();
    listeners.add(cb);
    return () => {
        listeners.delete(cb);
    };
}
