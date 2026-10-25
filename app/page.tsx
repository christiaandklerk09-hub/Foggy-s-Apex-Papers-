'use client';

import dynamic from 'next/dynamic';

const QuizAppContent = dynamic(
  () => import('@/components/QuizAppContent').then((mod) => mod.QuizAppContent),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0709] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900/50 flex items-center justify-center animate-pulse mb-4 text-red-600">
          <svg className="w-6 h-6 animate-spin text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-sm font-bold text-rose-950 dark:text-rose-100">Loading Apex Papers...</p>
        <p className="text-xs text-rose-700/80 dark:text-rose-300/60 mt-1">Grade 12 Mathematical Literacy Engine</p>
      </div>
    ),
  }
);

export default function Page() {
  return <QuizAppContent />;
}
