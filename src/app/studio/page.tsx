"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Studio from "@/components/Studio";

export default function StudioPage() {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0a]">
      <Navbar />

      <main className="relative z-10">
        <Studio />
      </main>

      <Footer bgClassName="bg-[#0a0a0a]" />
    </div>
  );
}
