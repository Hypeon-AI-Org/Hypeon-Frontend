"use client";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


import Analytics from "../../components/Analytics";
import Connector from "../../components/connector";
import Futurework from "../../components/futurework";
import Integration from "../../components/Integration";
import TeamsSection from "../../components/TeamsSection";
import Attribution from "../../components/attribution";

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <Navbar />

      <main className="relative z-10">

        <Analytics />
        <Connector />
        <Futurework />
        <Integration />
        <TeamsSection />
        <Attribution />
      </main>

      <Footer />
    </div>
  );
}
