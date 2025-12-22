import dynamic from "next/dynamic";

import Background from "@/components/Background";
import AboutIntro from "../../components/AboutIntro";
import AboutStory from "../../components/AboutStory";
import AboutDataSources from "../../components/AboutDataSources";
import AboutVision from "../../components/AboutVision";
import AboutCTA from "../../components/AboutCTA";
import AboutDecisionLayer from "../../components/AboutDecisionLayer";
import AboutWhatWeDo from "../../components/AboutWhatWeDo";
import AboutCoreLayers from "../../components/AboutCoreLayers";
import AboutImpact from "../../components/AboutImpact";
import GrowthTimeline from "../../components/GrowthTimeline";
import BUILDING from "../../components/BUILDING";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

//  FIX: dynamic import (SSR disabled)
const TeamGlobalMap = dynamic(
  () => import("../../components/TeamGlobalMap"),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      <Background />
      <Navbar />

      <AboutIntro />
      <AboutDecisionLayer />
      <AboutStory />
      <AboutWhatWeDo />
      <AboutDataSources />
      <AboutCoreLayers />
      <AboutVision />
      <AboutImpact />
      <GrowthTimeline />
      <BUILDING />

      
      <TeamGlobalMap />

      <AboutCTA />
      <Footer />
    </main>
  );
}
