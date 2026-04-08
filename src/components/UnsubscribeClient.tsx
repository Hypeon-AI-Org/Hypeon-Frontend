'use client';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Status = 'loading' | 'success' | 'error' | 'no-email';

export default function UnsubscribeClient() {
  const searchParams = useSearchParams();
  const email = useMemo(() => {
    const raw = searchParams.get('email');
    return typeof raw === 'string' ? raw.trim() : '';
  }, [searchParams]);

  const [status, setStatus] = useState<Status>(() => (email ? 'loading' : 'no-email'));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!email) {
      setStatus('no-email');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setErrorMessage('');

    const q = new URLSearchParams({ email });
    fetch(`/api/unsubscribe?${q.toString()}`)
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (cancelled) return;
        if (!res.ok) {
          setStatus('error');
          setErrorMessage(data.error || 'Something went wrong. Please try again.');
          return;
        }
        setStatus('success');
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error');
          setErrorMessage('Network error. Please try again.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [email]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      {status === 'loading' && (
        <>
          <Loader2 className="mb-4 h-10 w-10 animate-spin text-brand-500" aria-hidden />
          <p className="text-lg text-neutral-700">Processing your request…</p>
        </>
      )}

      {status === 'success' && (
        <p className="text-lg font-medium text-neutral-900">
          You have been unsubscribed successfully.
        </p>
      )}

      {status === 'no-email' && (
        <div className="space-y-3">
          <p className="text-lg text-neutral-800">
            This page needs a valid link from your email.
          </p>
          <p className="text-sm text-neutral-600">
            If you meant to unsubscribe, open the unsubscribe link from the message we sent you.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4">
          <p className="text-lg text-red-700">{errorMessage}</p>
          <Link
            href="/"
            className="inline-block text-sm font-medium text-brand-600 underline-offset-2 hover:underline"
          >
            Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
