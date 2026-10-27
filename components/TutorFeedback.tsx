'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Loader2, 
  X, 
  GraduationCap, 
  RotateCcw, 
  Lightbulb, 
  Send, 
  HelpCircle,
  Calculator,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';

interface TutorFeedbackProps {
  question: string;
  userAnswer?: string;
  correctAnswer: string;
  explanation: string;
  onClose?: () => void;
}

interface Message {
  role: 'tutor' | 'student';
  text: string;
  timestamp: number;
}

export const TutorFeedback: React.FC<TutorFeedbackProps> = ({
  question,
  userAnswer,
  correctAnswer,
  explanation,
  onClose,
}) => {
  const { isDark } = useAppTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputQuery, setInputQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastFetchedKeyRef = useRef<string>('');

  const isHintRequest = !userAnswer || userAnswer === 'HINT_REQUEST';

  // Scroll into view on mount so student immediately sees the tutor active
  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Request guidance from server-side Gemini tutor
  const requestGuidance = useCallback(async (query?: string) => {
    setLoading(true);
    setError(null);

    if (query) {
      setMessages((prev) => [
        ...prev,
        { role: 'student', text: query, timestamp: Date.now() },
      ]);
    }

    try {
      const response = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          userAnswer: isHintRequest ? 'HINT_REQUEST' : userAnswer,
          correctAnswer,
          explanation,
          userQuery: query || undefined,
        }),
      });

      const data = await response.json();

      if (data.success && data.feedback) {
        setMessages((prev) => [
          ...prev,
          { role: 'tutor', text: data.feedback, timestamp: Date.now() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'tutor',
            text: `### Official DBE Memorandum\n\n**Correct Answer**: **${correctAnswer}**\n\n**Curriculum Guidance**: ${explanation || 'Follow standard South African DBE syllabus steps.'}`,
            timestamp: Date.now(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'tutor',
          text: `### Official DBE Memorandum\n\n**Correct Answer**: **${correctAnswer}**\n\n**Guidance**: ${explanation || 'Refer to official DBE curriculum guidelines.'}`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [question, userAnswer, correctAnswer, explanation, isHintRequest]);

  // Initial load once per question / answer combination
  useEffect(() => {
    const key = `${question}__${userAnswer || 'HINT'}`;
    if (lastFetchedKeyRef.current !== key) {
      lastFetchedKeyRef.current = key;
      setMessages([]);
      requestGuidance();
    }
  }, [question, userAnswer, requestGuidance]);

  // Scroll to latest message
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || loading) return;
    const query = inputQuery.trim();
    setInputQuery('');
    requestGuidance(query);
  };

  // Helper to format markdown bold and sections cleanly
  const renderFormattedText = (text: string) => {
    const paragraphs = text.split('\n\n').filter((p) => p.trim().length > 0);
    return (
      <div className="space-y-2.5">
        {paragraphs.map((para, idx) => {
          const parts = para.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={idx} className="leading-relaxed text-xs sm:text-sm">
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  const boldText = part.slice(2, -2);
                  return (
                    <strong key={pIdx} className="font-black text-red-600 dark:text-rose-400 mr-1 block sm:inline">
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
        ref={containerRef}
        id="ai-tutor-container"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={`my-4 rounded-2xl border shadow-xl relative overflow-hidden flex flex-col ${
          isDark 
            ? 'bg-gradient-to-br from-[#1e070c] via-[#150508] to-[#100306] border-rose-900/80 text-white shadow-[0_8px_30px_rgba(225,29,72,0.15)]' 
            : 'bg-gradient-to-br from-rose-50/95 via-white to-red-50/60 border-rose-300 text-slate-900 shadow-[0_8px_25px_rgba(225,29,72,0.10)]'
        }`}
      >
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3 border-b border-rose-200/60 dark:border-rose-950/60">
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
                  AI EXAM TUTOR
                </span>
                <span className="text-[10px] font-bold text-red-600 dark:text-rose-400">
                  {isHintRequest ? 'Concept Guidance & Hints' : 'Step-by-Step DBE Analysis'}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                {isHintRequest ? 'Here is how to approach this problem:' : "Let's review where the error occurred:"}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => requestGuidance()}
              disabled={loading}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-rose-950/60 border-rose-900 text-rose-300 hover:bg-rose-900' 
                  : 'bg-white border-rose-200 text-slate-600 hover:bg-rose-100'
              }`}
              title="Regenerate initial explanation"
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

        {/* Conversation Stream */}
        <div className="p-4 sm:p-5 space-y-3.5 max-h-[380px] overflow-y-auto">
          {error && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold px-1">
              {error}
            </p>
          )}

          {messages.map((msg, index) => {
            const isTutor = msg.role === 'tutor';
            return (
              <div
                key={index}
                className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isTutor
                    ? isDark
                      ? 'bg-black/40 border-rose-900/60 text-rose-100'
                      : 'bg-white/90 border-rose-200/80 text-slate-800'
                    : isDark
                    ? 'bg-rose-950/50 border-rose-800/80 text-white ml-6'
                    : 'bg-red-50/80 border-red-200 text-slate-900 ml-6'
                }`}
              >
                {!isTutor && (
                  <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400 font-sans">
                    <span>YOUR QUESTION</span>
                  </div>
                )}
                {renderFormattedText(msg.text)}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2.5 py-3 px-3.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-white/50 dark:bg-black/20 rounded-xl border border-rose-100 dark:border-rose-950/60">
              <Loader2 className="w-4 h-4 animate-spin text-red-600 shrink-0" />
              <span>Analyzing against DBE curriculum memorandum & rubric codes...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 border-t border-rose-200/50 dark:border-rose-950/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap">
            Ask Tutor:
          </span>
          <button
            type="button"
            disabled={loading}
            onClick={() => requestGuidance('Give me a simple hint to start.')}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-black/30 border border-rose-200 dark:border-rose-900 hover:border-red-500 text-slate-700 dark:text-rose-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            💡 Quick Hint
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => requestGuidance('What formula or curriculum rule applies to this question?')}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-black/30 border border-rose-200 dark:border-rose-900 hover:border-red-500 text-slate-700 dark:text-rose-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            📐 Core Formula
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => requestGuidance('How do examiners award Method Marks (M) vs Accuracy Marks (A) here?')}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-black/30 border border-rose-200 dark:border-rose-900 hover:border-red-500 text-slate-700 dark:text-rose-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            📝 Rubric Marks
          </button>
        </div>

        {/* User Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white/70 dark:bg-black/40 border-t border-rose-200/60 dark:border-rose-950/60 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask your AI tutor anything about this question..."
            disabled={loading}
            className={`flex-1 p-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
              isDark 
                ? 'bg-black/40 border-rose-900/80 text-white placeholder-rose-400/40 focus:border-red-500' 
                : 'bg-white border-rose-200 text-slate-900 placeholder-slate-400 focus:border-red-500'
            }`}
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Ask</span>
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
