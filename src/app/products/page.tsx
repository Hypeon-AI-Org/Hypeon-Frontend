"use client";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsIntro from "../../components/ProductsIntro";
import EveryPlatformSignal from "../../components/EveryPlatformSignal";
import { TabHoppingSection, AskCopilotSection } from "../../components/CompareAndAsk";
import WinningAdCreatives from "../../components/WinningAdCreatives";
import PrecisionScaleBento from "../../components/PrecisionScaleBento";
import CopilotSection from "../../components/CopilotSection";
import MarketingDecisioning from "../../components/MarketingDecisioning";
import TechnologySection from "../../components/techonoly";

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <Navbar />

      <main className="relative z-10">
        <ProductsIntro />
        <EveryPlatformSignal />
        <TabHoppingSection />
        <AskCopilotSection />
        <WinningAdCreatives />
        <CopilotSection />
        <TechnologySection />
        <PrecisionScaleBento />
        <MarketingDecisioning />
      </main>

      <Footer />
    </div>
  );
}
