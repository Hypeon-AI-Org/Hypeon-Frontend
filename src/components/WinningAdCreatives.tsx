import { useRef, useState } from "react";

/* ---------- ICONS ---------- */

const PlayIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

const ScoreIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 12l4-2" />
  </svg>
);

/* ---------- SECTION ---------- */

export default function WinningAdCreatives() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-display">
            Winning <span className="text-brand-600">Ad Creatives</span>
          </h2>
          <p className="mt-3 text-slate-600">
            See which creatives are performing across platforms — before they saturate.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {[
            { video: "/images/wallpaper ad.mp4", score: 86 },
            { video: "/images/carpet ad.mp4", score: 79 },
            { video: "/images/curtains ad.mp4", score: 91 },
          ].map((item, i) => {
            const videoRef = useRef(null);
            const [isPlaying, setIsPlaying] = useState(false);

            const togglePlay = () => {
              if (!videoRef.current) return;

              if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
              } else {
                videoRef.current.muted = false; // 🔥 DEFAULT UNMUTED
                videoRef.current.play();
                setIsPlaying(true);
              }
            };

            return (
              <div
                key={i}
                className="group glass-card p-6 rounded-3xl
                           transition-all duration-500
                           hover:-translate-y-1
                           hover:shadow-2xl hover:shadow-pink-500/20"
              >
                {/* Video */}
                <div
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden
                             bg-slate-100 cursor-pointer"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    src={item.video}
                    playsInline
                    loop
                    className="absolute inset-0 w-full h-full object-cover
                               transition-transform duration-700
                               group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-black/0" />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isPlaying && (
                      <div className="flex items-center gap-2 text-white text-xs
                                      bg-black/40 px-3 py-1.5 rounded-full
                                      backdrop-blur-sm animate-soft-pulse">
                        <PlayIcon />
                        
                      </div>
                    )}
                  </div>

                  {/* Active */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full
                                   bg-emerald-500 text-white text-xs">
                    ● Active
                  </span>
                </div>

                {/* Score */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ScoreIcon />
                    Hype Score
                  </div>
                  <span className="font-display text-brand-600">
                    {item.score}
                  </span>
                </div>

                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
