"use client";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ProductsIntro from "../../components/ProductsIntro";
import HypeScoreSection from "../../components/HypeScoreSection";
import TrendingProducts from "../../components/TrendingProducts";
import HighValueKeywords from "../../components/HighValueKeywords";
import WinningAdCreatives from "../../components/WinningAdCreatives";
import CopilotSection from "../../components/CopilotSection";
import ProductsCTA from "../../components/ProductsCTA";

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <Navbar />

      <main className="relative z-10">
        <ProductsIntro />
        <HypeScoreSection />
        <TrendingProducts />
        <HighValueKeywords />
        <WinningAdCreatives />
        <CopilotSection />
       
      </main>

      <Footer />
    </div>
  );
}
