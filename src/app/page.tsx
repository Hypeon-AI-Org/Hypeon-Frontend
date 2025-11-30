import dynamic from 'next/dynamic';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// Lazy load below-the-fold components
const ValueProp = dynamic(() => import('@/components/ValueProp'), {
  loading: () => <div className="min-h-screen" />,
});
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
      <ValueProp />
      <Partners />
      <Features />
      <Footer />
    </main>
  );
}
