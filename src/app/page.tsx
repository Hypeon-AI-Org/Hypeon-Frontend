import dynamic from 'next/dynamic';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutCTA from "../components/AboutCTA";
import FAQ from "../components/FAQ";
import TeamsAchieve from "../components/TeamsAchieve";
import CompetitorReportLead from "../components/CompetitorReportLead";
import FounderDecisionMap from '../components/FounderDecisionMap';
import MarketerSteps from '../components/steps';
import AdIntelReplica from '@/components/AdIntelReplica';
import AdCreativeBuilder from '@/components/AdCreativeBuilder';
import DashboardCTA from '@/components/DashboardCTA';
import AdsShowcase from '@/components/AdsShowcase';
import ProductEngines from '@/components/ProductEngines';
import BuiltForBrands from '@/components/BuiltForBrands';

import ImpactSection from '../components/ImpactSection';
// Lazy load below-the-fold components
const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="min-h-screen" />,
});
const Partners = dynamic(() => import('@/components/Partners'));
const Footer = dynamic(() => import('@/components/Footer'));


export default function Home() {
  return (
    <main className="relative">
      <Background />
      <Navbar />
      <Hero />
      <ProductEngines />
      <BuiltForBrands />
      <AdCreativeBuilder />
      <ImpactSection />
<AdIntelReplica />
      <FounderDecisionMap />
      <Partners />
      <Features />
      <AdsShowcase />
      <MarketerSteps />

      <FAQ />
     <CompetitorReportLead/>
      <DashboardCTA />
      <Footer />
    </main>
  );
}
