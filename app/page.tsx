'use client';

import { useState, useEffect } from 'react';
import { QuizAppContent } from '@/components/QuizAppContent';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/20 animate-pulse">
            <span className="text-white text-2xl font-black tracking-wider">DBE</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
              Department of Basic Education
            </h2>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
              National Senior Certificate Examination Studio
            </p>
          </div>
          <div className="w-48 h-1.5 bg-rose-100 dark:bg-rose-950/60 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  return <QuizAppContent />;
}
