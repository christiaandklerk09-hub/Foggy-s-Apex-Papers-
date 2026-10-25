'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0709] text-slate-800 dark:text-rose-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#1a0c10] border border-rose-200 dark:border-rose-900/50 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 dark:bg-[#250e14] border border-rose-200 dark:border-rose-900/60 flex items-center justify-center text-red-600 dark:text-[#FF6B6B]">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-rose-300/80 leading-relaxed">
            {error?.message || 'An unexpected error occurred while loading this page.'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-[#250e14] dark:hover:bg-[#34131b] text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 text-xs sm:text-sm font-bold cursor-pointer transition-all"
          >
            <Home className="w-4 h-4 text-red-600 dark:text-[#FF6B6B]" />
            <span>Portal Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
