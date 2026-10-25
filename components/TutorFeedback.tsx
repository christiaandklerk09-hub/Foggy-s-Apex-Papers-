'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, X, GraduationCap, ChevronRight, BookOpen } from 'lucide-react';
import { useAppTheme } from '@/lib/theme';

interface TutorFeedbackProps {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  onClose?: () => void;
}

export const TutorFeedback: React.FC<TutorFeedbackProps> = ({
  question,
  userAnswer,
  correctAnswer,
  explanation,
  onClose,
}) => {
  const { isDark } = useAppTheme();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchFeedback = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/gemini/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, userAnswer, correctAnswer, explanation }),
        });
        const data = await response.json();
        if (!isCancelled) {
          if (data.success && data.feedback) {
            setFeedback(data.feedback);
          } else {
            setFeedback(`The official DBE answer is: ${correctAnswer}. Method: ${explanation}`);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setFeedback(`Official DBE marking guidelines: ${explanation || correctAnswer}`);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchFeedback();

    return () => {
      isCancelled = true;
    };
  }, [question, userAnswer, correctAnswer, explanation]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className={`my-4 p-4 sm:p-5 rounded-2xl border shadow-xl relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-r from-[#200810] via-[#16050b] to-[#120408] border-rose-900/80 text-white shadow-[0_8px_30px_rgba(225,29,72,0.15)]' 
            : 'bg-gradient-to-r from-rose-50 via-red-50/60 to-rose-100/50 border-rose-300 text-slate-900 shadow-[0_8px_25px_rgba(225,29,72,0.10)]'
        }`}
      >
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-red-600/30 shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                  AI EXAM TUTOR
                </span>
                <span className="text-[10px] font-bold text-red-600 dark:text-rose-400">
                  Step-by-Step Guidance
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                Let&apos;s understand where the mistake happened:
              </h4>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-rose-950/60 border-rose-900 text-rose-300 hover:bg-rose-900' 
                  : 'bg-white border-rose-200 text-slate-600 hover:bg-rose-100'
              }`}
              title="Close Tutor"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 py-3 text-xs font-semibold text-rose-600 dark:text-rose-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing your response against DBE marking criteria...</span>
          </div>
        ) : error ? (
          <p className="text-xs text-rose-600 font-medium py-1">{error}</p>
        ) : (
          <div className="space-y-2.5 pt-1">
            <div className="text-xs sm:text-sm leading-relaxed font-sans font-medium text-slate-800 dark:text-rose-100 bg-white/70 dark:bg-black/30 p-3 rounded-xl border border-rose-200/80 dark:border-rose-900/60">
              {feedback}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-rose-300/70 pt-0.5">
              <span>National Senior Certificate Standard</span>
              <span className="font-semibold text-red-600 dark:text-rose-400">Review your formula above and try again!</span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
