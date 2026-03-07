import { memo } from "react";

function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden will-change-transform">
      {/* Very subtle neutral blobs — no pink/indigo */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-multiply blur-[100px] animate-blob parallax-slow will-change-transform"
        style={{ background: 'rgba(203, 213, 225, 0.18)' }}
      />
      <div
        className="absolute top-[10%] -right-[10%] w-[40%] h-[50%] rounded-full mix-blend-multiply blur-[100px] animate-blob animation-delay-2000 parallax-slow will-change-transform"
        style={{ background: 'rgba(226, 232, 240, 0.14)', animationDelay: '2s' }}
      />
      <div
        className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-multiply blur-[100px] animate-blob animation-delay-4000 parallax-slow will-change-transform"
        style={{ background: 'rgba(241, 245, 249, 0.2)', animationDelay: '4s' }}
      />
    </div>
  );
}

export default memo(Background);
