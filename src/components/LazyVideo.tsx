'use client';

import { useEffect, useRef, useState } from 'react';

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
  // Once mounted, keep the <source> in the DOM (don't tear down a loaded video).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          // play() can reject if not yet ready / autoplay blocked — ignore.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <video
      ref={ref}
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
      onContextMenu={(e) => e.preventDefault()}
    >
      {mounted && <source src={src} type="video/mp4" />}
    </video>
  );
}
