import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Background from '@/components/Background';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import UnsubscribeClient from '@/components/UnsubscribeClient';

export const metadata: Metadata = {
  title: 'Unsubscribe | HypeOn AI',
  description: 'Manage your email preferences for HypeOn AI.',
};

function UnsubscribeFallback() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <Loader2 className="mb-4 h-10 w-10 animate-spin text-brand-500" aria-hidden />
      <p className="text-lg text-neutral-700">Loading…</p>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Background />
      <Navbar />
      <Suspense fallback={<UnsubscribeFallback />}>
        <UnsubscribeClient />
      </Suspense>
      <Footer />
    </main>
  );
}
