"use client";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionsIntro from "../../components/SolutionsIntro";
import SolutionsProblems from "../../components/SolutionsProblems";
import SolutionsSolutions from "../../components/SolutionsSolutions";
import SolutionsFeatures from "../../components/SolutionsFeatures";
import SolutionsIntelligence from "../../components/SolutionsIntelligence";
import SolutionsAnalytics from "../../components/SolutionsAnalytics";

export default function SolutionsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <Navbar />

      <main className="relative z-10">
        <SolutionsIntro />
        <SolutionsProblems />
        <SolutionsIntelligence />
        <SolutionsSolutions />
        <SolutionsFeatures />
        <SolutionsAnalytics />
      </main>

      <Footer />
    </div>
  );
}
