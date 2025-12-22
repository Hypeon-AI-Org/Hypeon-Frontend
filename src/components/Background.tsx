import { memo } from "react";

function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden will-change-transform">
      {/* Animated Gradient Blobs */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-200/55 rounded-full mix-blend-multiply blur-[80px] animate-blob parallax-slow will-change-transform" />

      <div className="absolute top-[10%] -right-[10%] w-[40%] h-[50%] bg-indigo-200/55 rounded-full mix-blend-multiply blur-[80px] animate-blob animation-delay-2000 parallax-slow will-change-transform" />

      <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-purple-200/55 rounded-full mix-blend-multiply blur-[80px] animate-blob animation-delay-4000 parallax-slow will-change-transform" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-light opacity-55 parallax-slow will-change-transform" />
    </div>
  );
}

export default memo(Background);
