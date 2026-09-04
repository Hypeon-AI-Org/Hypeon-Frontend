'use client';

import { useEffect, useRef, useState } from 'react';
import { primeIOSVideo } from '@/lib/videoAutoplay';
import { isScrolling, subscribeScroll } from '@/lib/scrollActivity';

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Margin around the viewport that counts as "in view" (default starts loading slightly early). */
  rootMargin?: string;
};

/**
 * Autoplay video that only downloads and plays once it scrolls into view, and
 * pauses when it scrolls back out. Keeps heavy MP4s off the initial render path
 * and avoids multiple clips decoding at once.
 */
export default function LazyVideo({
  src,
  poster,
  className,
  style,
  rootMargin = '200px 0px',
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  // Once the clip scrolls into view we set its `src` (and keep it set) so the
  // download/decode never happens until needed, then never tears back down.
  const [mounted, setMounted] = useState(false);
  const inView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Decoding video *while* the page is moving is the main cause of scroll
    // stutter on ordinary hardware, so a clip only ever runs when it is both
    // in view and the page has settled. MarqueeVideo already worked this way;
    // LazyVideo kept playing straight through a scroll.
    const apply = () => {
      if (!inView.current || isScrolling()) {
        el.pause();
        return;
      }
      setMounted(true);
      // If already mounted (scrolled back in), src is present → play now.
      // On the very FIRST intersection src isn't set yet; the effect below
      // primes playback once React commits the src.
      if (el.src) primeIOSVideo(el);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        apply();
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    const unsubscribe = subscribeScroll(apply);
    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [rootMargin]);

  // Once the src has been committed (first time the clip enters view), kick off
  // playback. Runs after React paints the src, so iOS actually has media to play.
  useEffect(() => {
    if (mounted && inView.current) primeIOSVideo(ref.current);
  }, [mounted]);

  return (
    <video
      ref={ref}
      // Set src directly (not a late-injected <source> child): iOS Safari only
      // loads a <source> added after creation if you also call video.load(),
      // whereas setting the src attribute auto-starts the fetch on every browser.
      src={mounted ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      style={style}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
      onLoadedData={(e) => primeIOSVideo(e.currentTarget)}
      onContextMenu={(e) => e.preventDefault()}
    />

  );
}
