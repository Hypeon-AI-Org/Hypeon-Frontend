"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { isScrolling, subscribeScroll } from "@/lib/scrollActivity";

/* ============================================================
   MediaCarousel — seamless horizontal scroll of every creative
   in /public/carousel, alternating image → video → image → video.
   • The strip moves with a CSS keyframe animation (compositor
     thread) — NOT framer-motion JS — so it never competes with
     page scroll / Lenis and stays smooth.
   • videos lazy-load + auto-play (muted, looped) ONLY while on
     screen, so we never load or decode all ~30 clips at once.
   • click any card to open a vertical lightbox feed; in the feed
     only the centered video plays (not all of them at once).
   Used on both the homepage and the Studio page.
============================================================ */

const VIDEO_FILES = [
    "045e53458f4485d2.mp4", "23f0d4105b094537.mp4", "261138129033eb1f.mp4",
    "3b8e3a66515db4d9.mp4", "452d34244c08eaee.mp4", "4eea476d13528502.mp4",
    "50b18d1681e20f36.mp4", "51d8e138f293c225.mp4", "51ebaa4623434df4.mp4",
    "5f272eed280c0c30.mp4", "610e86c7e9808d60.mp4", "750b44dd8efb32ae.mp4",
    "763d35e0dc0bfaa4.mp4", "832a4ff8861195cd.mp4", "8933fd906cc15adb.mp4",
    "8fb3c5a47348d3aa.mp4", "9c0fb217f53a41d2.mp4", "a3b3be8e2817097f.mp4",
    "a9dba58607d89b8a.mp4", "b22cdc25095d2d23.mp4", "d1da89b3cf25b0f9.mp4",
    "d9e49ee54d004878.mp4", "df79c081631cc38a.mp4", "e9c8e66c7d39bcb3.mp4",
    "f733cbcf9fee94aa.mp4", "f8df79bf1542eda5.mp4", "ff8b2d7e3c65b031.mp4",
];

const IMAGE_FILES = [
    "2861c283c6fe149b.png", "2cc5a6cac5e10415.jpeg", "4089132ac7df0429.jpeg",
    "6255881ac909f146.png", "66d07db35df3b9ae.jpeg", "6981b73f2284f18c.jpeg",
    "717b88ce0c92a062.png", "9bb51c2e32b350f8.png", "a954e0d74ee27555.jpeg",
    "c3d90a8e65f75d5d.png", "d4ec3e83b2332402.png", "eb2fa64fe309fd83.png",
    "f1ecb119b51c7a58.jpeg",
];

export type Media = { type: "video" | "image"; src: string };

// alternate image → video → image → video …, trailing leftovers appended
function interleave(): Media[] {
    const imgs: Media[] = IMAGE_FILES.map((f) => ({ type: "image", src: `/carousel/${f}` }));
    const vids: Media[] = VIDEO_FILES.map((f) => ({ type: "video", src: `/carousel/${f}` }));
    const out: Media[] = [];
    for (let i = 0; i < Math.max(imgs.length, vids.length); i++) {
        if (i < imgs.length) out.push(imgs[i]);
        if (i < vids.length) out.push(vids[i]);
    }
    return out;
}

export const MEDIA: Media[] = interleave();

/* A marquee video that lazy-loads and only plays while within the viewport.
   `preload="none"` keeps it off the network until it is about to enter view
   (rootMargin), so we never fire ~50 metadata requests at once on page load. */
export function MarqueeVideo({ src }: { src: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    const inView = useRef(false);
    const loaded = useRef(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reconcile = () => {
            if (inView.current) {
                // First time it nears view: fetch just enough to paint the
                // first frame (#t=0.1) as a poster, so the tile is never empty.
                if (!loaded.current) {
                    loaded.current = true;
                    el.preload = "metadata";
                    el.load();
                }
                // Play only when the page is NOT actively scrolling, so video
                // decode never competes with the scroll → no stutter. While
                // scrolling the tile still shows its first-frame poster.
                if (!isScrolling()) el.play().catch(() => {});
                else el.pause();
            } else {
                el.pause();
            }
        };
        const io = new IntersectionObserver(
            ([entry]) => {
                inView.current = entry.isIntersecting;
                reconcile();
            },
            // start loading ~one card before it scrolls into view (any direction)
            { threshold: 0.01, rootMargin: "300px" }
        );
        io.observe(el);
        const unsubscribe = subscribeScroll(reconcile);
        return () => {
            io.disconnect();
            unsubscribe();
        };
    }, []);
    return (
        <video
            ref={ref}
            // #t=0.1 makes the browser paint the first frame as a poster, so the
            // tile shows an image even while paused / before it plays.
            src={`${src}#t=0.1`}
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
            className="pointer-events-none h-full w-full bg-black/40 object-cover"
        />
    );
}

/* Map a video src to its pre-generated poster image. */
function posterFor(src: string): string {
    return src.replace("/carousel/", "/carousel/posters/").replace(/\.mp4$/, ".jpg");
}

/* Lightbox media slot for a video. Always shows a cheap poster IMAGE; mounts a
   real <video> ONLY for the centered clip while the feed is idle. So while
   scrolling there are zero <video> elements in the feed (just images) → smooth,
   and the centered clip still autoplays the moment scrolling settles. */
function LightboxVideo({ src, scrolling }: { src: string; scrolling: boolean }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const inView = useRef(false);
    const [play, setPlay] = useState(false);
    const scrollingRef = useRef(scrolling);
    scrollingRef.current = scrolling;

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                inView.current = entry.isIntersecting;
                setPlay(inView.current && !scrollingRef.current);
            },
            { threshold: 0.6 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // stop showing the <video> while scrolling; bring it back once settled
    useEffect(() => {
        setPlay(inView.current && !scrolling);
    }, [scrolling]);

    return (
        <div ref={wrapRef} className="relative h-full w-full bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={posterFor(src)} alt="" loading="lazy" className="h-full w-full object-cover" />
            {play && (
                <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    disableRemotePlayback
                    controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
            )}
        </div>
    );
}

export default function MediaCarousel({ theme = "dark" }: { theme?: "dark" | "light" }) {
    const isLight = theme === "light";
    const bg = isLight ? "oklch(0.988 0.0041 91.45)" : "#050505";
    // duplicate the set so translating by -50% loops seamlessly
    const row = [...MEDIA, ...MEDIA];
    const [active, setActive] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [inView, setInView] = useState(true);
    const [feedScrolling, setFeedScrolling] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const feedScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => setMounted(true), []);

    // While the lightbox feed is being scrolled, pause its video (decode-free
    // scroll); resume the centered clip ~150ms after it settles.
    const onFeedScroll = () => {
        setFeedScrolling((s) => (s ? s : true));
        if (feedScrollTimer.current) clearTimeout(feedScrollTimer.current);
        feedScrollTimer.current = setTimeout(() => setFeedScrolling(false), 150);
    };

    // Pause the (compositor) marquee animation when the section is off-screen
    // so it isn't burning a layer the user can't see.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // lock page scroll + close on Esc, and jump the feed to the clicked card
    useEffect(() => {
        if (active === null) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActive(null);
        };
        window.addEventListener("keydown", onKey);
        itemRefs.current[active]?.scrollIntoView({ block: "center" });
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [active]);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-6 sm:py-8" style={{ backgroundColor: bg }}>
            {/* edge fade masks for a premium clipped look */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28" style={{ background: `linear-gradient(to right, ${bg}, transparent)` }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28" style={{ background: `linear-gradient(to left, ${bg}, transparent)` }} />

            {/* CSS-animated strip — runs on the compositor thread (off the main
                thread) so it never fights page scroll. Paused when off-screen
                or while the lightbox is open. */}
            <div
                className="flex w-max gap-3 will-change-transform sm:gap-4 animate-[marquee_90s_linear_infinite] motion-reduce:animate-none"
                style={{ animationPlayState: inView && active === null ? "running" : "paused" }}
            >
                {row.map((m, i) => (
                    <button
                        type="button"
                        key={i}
                        onClick={() => setActive(i % MEDIA.length)}
                        aria-label="View creative"
                        className="group aspect-[9/16] w-[150px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] sm:w-[190px]"
                    >
                        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                            {m.type === "video" ? (
                                <MarqueeVideo src={m.src} />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={m.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Lightbox — vertical scroll feed of every creative, in a portal on
                <body> so it sits above the navbar. */}
            {mounted && createPortal(
                <AnimatePresence>
                    {active !== null && (
                        <motion.div
                            className="fixed inset-0 z-[70]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {/* dimmed + blurred backdrop (click to close) */}
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActive(null)} />

                            {/* scrollable feed */}
                            <div
                                data-lenis-prevent
                                onScroll={onFeedScroll}
                                className="relative z-10 h-full w-full snap-y snap-mandatory overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                onClick={() => setActive(null)}
                            >
                                <div className="flex flex-col items-center gap-6 py-[7vh]">
                                    {MEDIA.map((m, idx) => (
                                        <motion.div
                                            ref={(el) => { itemRefs.current[idx] = el; }}
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="aspect-[9/16] w-[min(90vw,48vh)] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-white/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
                                        >
                                            {m.type === "video" ? (
                                                <LightboxVideo src={m.src} scrolling={feedScrolling} />
                                            ) : (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={m.src} alt="Creative preview" loading="lazy" className="h-full w-full object-cover" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* close button */}
                            <button
                                type="button"
                                onClick={() => setActive(null)}
                                aria-label="Close"
                                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}
