'use client';

import { useEffect, useState } from 'react';

/**
 * TEMPORARY diagnostic — shows JS errors on screen (so an iPhone with no Mac
 * can surface the real error that blanks the page). Remove once diagnosed.
 */
export default function IosErrorOverlay() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      setErrors((prev) => [
        ...prev,
        `${e.message} @ ${e.filename}:${e.lineno}:${e.colno}`,
      ]);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      setErrors((prev) => [...prev, `Unhandled rejection: ${String(e.reason)}`]);
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  if (errors.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(120,0,0,0.95)',
        color: '#fff',
        font: '12px/1.4 monospace',
        padding: 16,
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <strong>JS ERROR(S) — screenshot this:</strong>
      {errors.map((msg, i) => (
        <div key={i} style={{ marginTop: 8 }}>
          {i + 1}. {msg}
        </div>
      ))}
    </div>
  );
}
