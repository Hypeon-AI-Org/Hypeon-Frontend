'use client';
import dynamic from 'next/dynamic';

const TeamGlobalMap = dynamic(() => import('./TeamGlobalMap'), { ssr: false });

export default function TeamGlobalMapClient() {
  return <TeamGlobalMap />;
}
