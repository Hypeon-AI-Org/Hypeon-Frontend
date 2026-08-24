import type { Metadata } from "next";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOfferings from "@/components/services/ServicesOfferings";
import ServicesGeoVsSeo from "@/components/services/ServicesGeoVsSeo";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesEngagements from "@/components/services/ServicesEngagements";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesCTA from "@/components/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Services - GEO, SEO, Websites & AI Automated Marketing | HypeOn AI",
  description:
    "HypeOn services: Generative Engine Optimization (GEO) to get cited in ChatGPT and Perplexity, SEO that compounds, conversion-led website builds, and AI-automated marketing run end to end.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "HypeOn Services - GEO, SEO, Websites & AI Automated Marketing",
    description:
      "Get named in AI answers, rank on Google, convert the traffic, and automate the loop. One team, four services.",
    url: "/services",
    type: "website",
  },
};

/* Structured data - the same entity clarity we sell, applied to our own page. */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "HypeOn Growth Services",
  provider: {
    "@type": "Organization",
    name: "HypeOn AI",
    url: "https://hypeon.ai",
  },
  serviceType: [
    "Generative Engine Optimization",
    "Search Engine Optimization",
    "Website Design and Development",
    "AI Marketing Automation",
  ],
  areaServed: "Worldwide",
  url: "https://hypeon.ai/services",
  description:
    "GEO, SEO, website design and build, and AI-automated marketing delivered as one growth system for D2C and B2B brands.",
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Background />
      <Navbar />

      <main className="relative z-10">
        <ServicesHero />
        <ServicesOfferings />
        <ServicesGeoVsSeo />
        <ServicesProcess />
        <ServicesEngagements />
        <ServicesFAQ />
        <ServicesCTA />
      </main>

      <Footer />
    </div>
  );
}
