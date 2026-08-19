import dynamic from 'next/dynamic';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutCTA from "../components/AboutCTA";
import FAQ from "../components/FAQ";
import TeamsAchieve from "../components/TeamsAchieve";
import FounderDecisionMap from '../components/FounderDecisionMap';
import AdIntelReplica from '@/components/AdIntelReplica';
import DashboardCTA from '@/components/DashboardCTA';
import ProductEngines from '@/components/ProductEngines';
import BuiltForBrands from '@/components/BuiltForBrands';
import OnePlaceEveryPlatform from '@/components/OnePlaceEveryPlatform';
import PricingSection from '@/components/PricingSection';
import MidnightCTA from '@/components/MidnightCTA';
import HowItWorks from '@/components/HowItWorks';

// Lazy load below-the-fold components
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
<AdIntelReplica />
      <FounderDecisionMap />
      <Partners />
         <HowItWorks />
      <OnePlaceEveryPlatform />
   
      <PricingSection />
      <MidnightCTA />

      <FAQ />
      <DashboardCTA />
      <Footer />
    </main>
  );
}
