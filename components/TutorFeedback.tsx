'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, X, GraduationCap, RotateCcw, Lightbulb } from 'lucide-react';
import { useAppTheme } from '@/lib/theme';

interface TutorFeedbackProps {
  question: string;
  userAnswer?: string;
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

  const isHintRequest = !userAnswer || userAnswer === 'HINT_REQUEST';

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          userAnswer: isHintRequest ? 'HINT_REQUEST' : userAnswer,
          correctAnswer,
          explanation,
        }),
      });
      const data = await response.json();
      if (data.success && data.feedback) {
        setFeedback(data.feedback);
      } else if (data.error) {
        setError(data.error);
        setFeedback(`Official DBE Guidance: ${explanation || correctAnswer}`);
      } else {
        setFeedback(`Official DBE Memorandum: ${correctAnswer}. Method: ${explanation || 'Follow standard curriculum steps.'}`);
      }
    } catch {
      setError('Connection interrupted. Showing offline DBE memorandum:');
      setFeedback(`DBE Marking Guideline: ${correctAnswer}. Explanation: ${explanation}`);
    } finally {
      setLoading(false);
    }
  }, [question, userAnswer, correctAnswer, explanation, isHintRequest]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  // Helper to format response sections cleanly
  const renderFormattedFeedback = (text: string) => {
    const paragraphs = text.split('\n\n').filter((p) => p.trim().length > 0);
    return (
      <div className="space-y-2.5">
        {paragraphs.map((para, idx) => {
          // If paragraph has bold headings like **Key Concept**:
          const parts = para.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={idx} className="leading-relaxed text-xs sm:text-sm">
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  const boldText = part.slice(2, -2);
                  return (
                    <strong key={pIdx} className="font-extrabold text-red-600 dark:text-rose-400 mr-1 block sm:inline">
                      {boldText}
                    </strong>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className={`my-4 p-4 sm:p-5 rounded-2xl border shadow-xl relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-[#1e070c] via-[#150508] to-[#100306] border-rose-900/80 text-white shadow-[0_8px_30px_rgba(225,29,72,0.15)]' 
            : 'bg-gradient-to-br from-rose-50/95 via-white to-red-50/60 border-rose-300 text-slate-900 shadow-[0_8px_25px_rgba(225,29,72,0.10)]'
        }`}
      >
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-red-600/30 shrink-0">
              {isHintRequest ? (
                <Lightbulb className="w-5 h-5 text-amber-200" />
              ) : (
                <GraduationCap className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                  {isHintRequest ? 'AI EXAM COACH' : 'AI EXAM TUTOR'}
                </span>
                <span className="text-[10px] font-bold text-red-600 dark:text-rose-400">
                  {isHintRequest ? 'Concept Hint & Method Clues' : 'Step-by-Step DBE Analysis'}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                {isHintRequest ? 'Here is how to approach this question:' : "Let's review where the error occurred:"}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={fetchFeedback}
              disabled={loading}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-rose-950/60 border-rose-900 text-rose-300 hover:bg-rose-900' 
                  : 'bg-white border-rose-200 text-slate-600 hover:bg-rose-100'
              }`}
              title="Regenerate guidance"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-rose-400' : ''}`} />
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-rose-950/60 border-rose-900 text-rose-300 hover:bg-rose-900' 
                    : 'bg-white border-rose-200 text-slate-600 hover:bg-rose-100'
                }`}
                title="Dismiss Tutor"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2.5 py-4 px-3 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-white/50 dark:bg-black/20 rounded-xl border border-rose-100 dark:border-rose-950/60">
            <Loader2 className="w-4 h-4 animate-spin text-red-600 shrink-0" />
            <span>Consulting DBE curriculum memorandum & analyzing step-by-step logic...</span>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {error && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold px-1">
                {error}
              </p>
            )}

            <div className="text-slate-800 dark:text-rose-100 bg-white/80 dark:bg-black/40 p-3.5 sm:p-4 rounded-xl border border-rose-200/80 dark:border-rose-900/60 shadow-xs">
              {feedback ? renderFormattedFeedback(feedback) : null}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-rose-300/70 pt-0.5 px-1 flex-wrap gap-2">
              <span className="flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Department of Basic Education (DBE) Curriculum Standards</span>
              </span>
              <span className="font-bold text-red-600 dark:text-rose-400">
                {isHintRequest ? 'Apply the concept above!' : 'Review your working and re-submit!'}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
