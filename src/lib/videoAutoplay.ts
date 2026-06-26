/* ============================================================
   iOS Safari inline-autoplay fix.

   On Android Chrome a React `<video muted autoPlay playsInline>` plays
   straight away. On iOS Safari it often freezes on the poster instead,
   because:

   • React assigns `muted` as a DOM *property*, but iOS decides whether to
     allow inline autoplay by reading the muted *attribute* at element
     creation. If the attribute is missing iOS treats the clip as having
     sound and blocks autoplay.
   • iOS will not start a clip whose `play()` was never explicitly called
     once it is actually on screen.

   `primeIOSVideo` re-asserts both (muted attribute + playsInline) and
   kicks off playback. It is a no-op anywhere autoplay already works, so
   desktop behaviour is unchanged.
============================================================ */
export function primeIOSVideo(v: HTMLVideoElement | null | undefined) {
  if (!v) return;
  v.muted = true;
  v.setAttribute('muted', '');
  v.playsInline = true;
  v.setAttribute('playsinline', '');
  const p = v.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}
