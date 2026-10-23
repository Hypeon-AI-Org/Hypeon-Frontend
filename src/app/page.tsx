import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ToolReel from '@/components/home/ToolReel';
import FeatureTrio from '@/components/home/FeatureTrio';
import DarkShowcase from '@/components/home/DarkShowcase';
import InAction from '@/components/home/InAction';
import DarkBento from '@/components/home/DarkBento';
import BigNumber from '@/components/home/BigNumber';
import FinalCTA from '@/components/home/FinalCTA';

// Lazy load below-the-fold components
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="relative bg-[#ededed]">
      <Navbar />
      <Hero />
      <ToolReel />
      <FeatureTrio />
      <DarkShowcase />
      <InAction />
      <DarkBento />
      <BigNumber />
      <FinalCTA />
      <Footer />
    </main>
  );
}
