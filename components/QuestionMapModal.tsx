'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bookmark, ArrowRight, Lock, Layers } from 'lucide-react';
import { Question } from '@/lib/quiz-data';
import { getSmartQuestionBlocks } from '@/lib/pagination';
import { useAppTheme } from '@/lib/theme';

interface QuestionMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentIndex: number;
  answers: Record<number, string>;
  flaggedQuestions: Set<number>;
  completedSections?: number[];
  onJumpToQuestion: (index: number) => void;
  onSubmitQuiz: () => void;
  canSubmit: boolean;
  requiredSubmitCount: number;
}

export const QuestionMapModal: React.FC<QuestionMapModalProps> = ({
  isOpen,
  onClose,
  questions,
  currentIndex,
  answers,
  flaggedQuestions,
  completedSections = [],
  onJumpToQuestion,
  onSubmitQuiz,
  canSubmit,
  requiredSubmitCount,
}) => {
  const { isDark } = useAppTheme();

  if (!isOpen) return null;

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flaggedQuestions.size;
  const unansweredCount = total - answeredCount;

  const blocks = getSmartQuestionBlocks(questions);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-neutral-900/60 backdrop-blur-xs">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`relative w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border overflow-hidden max-h-[85vh] flex flex-col z-10 ${
            isDark
              ? 'bg-[#120709] border-rose-900/40 text-white'
              : 'bg-white border-rose-100 text-slate-900 sunlit-card'
          }`}
        >
          {/* Header */}
          <div className={`px-5 py-4 sm:px-6 sm:py-5 border-b flex items-center justify-between ${
            isDark ? 'border-rose-950/70 bg-[#180a0e]' : 'border-rose-100 bg-rose-50/50'
          }`}>
            <div>
              <h3 className={`text-lg font-extrabold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span>Assessment Question Map</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${
                  isDark
                    ? 'bg-red-950/80 border-red-500/40 text-[#FF6B6B]'
                    : 'bg-rose-50 border-rose-200 text-rose-700'
                }`}>
                  {total} Questions • {blocks.length} {blocks.length === 1 ? 'Block' : 'Blocks'}
                </span>
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Questions organized into standardized 20-question blocks. Tap any number to jump directly.
              </p>
            </div>

            <button
              id="close-question-map-btn"
              onClick={onClose}
              className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800 border-transparent hover:border-slate-700'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Summary Pill Legend */}
          <div className={`px-5 py-3 border-b grid grid-cols-3 gap-2 text-center text-xs ${
            isDark ? 'border-rose-950/70 bg-[#14080b]' : 'border-rose-100 bg-white'
          }`}>
            <div className={`p-2 rounded-xl border flex flex-col items-center ${
              isDark
                ? 'bg-red-950/40 border-red-500/30'
                : 'bg-rose-50 border-rose-200'
            }`}>
              <span className={`font-extrabold text-base ${isDark ? 'text-[#FF6B6B]' : 'text-rose-600'}`}>{answeredCount}</span>
              <span className={`text-[11px] font-medium ${isDark ? 'text-[#FF7A7A]' : 'text-rose-700'}`}>Answered</span>
            </div>
            <div className={`p-2 rounded-xl border flex flex-col items-center ${
              isDark
                ? 'bg-amber-950/40 border-amber-500/30'
                : 'bg-amber-50 border-amber-200'
            }`}>
              <span className={`font-extrabold text-base ${isDark ? 'text-[#FBBF24]' : 'text-amber-700'}`}>{flaggedCount}</span>
              <span className={`text-[11px] font-medium ${isDark ? 'text-[#FBBF24]' : 'text-amber-800'}`}>Flagged</span>
            </div>
            <div className={`p-2 rounded-xl border flex flex-col items-center ${
              isDark
                ? 'bg-[#1c0c10] border-rose-900/50'
                : 'bg-rose-50/40 border-rose-200/70'
            }`}>
              <span className={`font-extrabold text-base ${isDark ? 'text-rose-300' : 'text-slate-700'}`}>{unansweredCount}</span>
              <span className={`text-[11px] font-medium ${isDark ? 'text-rose-400/80' : 'text-slate-500'}`}>Remaining</span>
            </div>
          </div>

          {/* Questions Grid Grouped by Blocks */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {blocks.map((block) => (
              <div key={block.blockIndex} className="space-y-2.5">
                <div className={`flex items-center justify-between pb-1 border-b ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <Layers className="w-3.5 h-3.5 text-red-500" />
                    <span>{block.title}</span>
                    {completedSections.includes(block.blockNumber) && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-[#FBBF24] text-[10px] font-bold">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {block.totalInBlock} questions
                  </span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
                  {block.questions.map((q, idxInBlock) => {
                    const idx = block.startIndex + idxInBlock;
                    const isCurrent = idx === currentIndex;
                    const isAnswered = answers[q.id] !== undefined;
                    const isFlagged = flaggedQuestions.has(q.id);
                    const selectedOption = answers[q.id];

                    let cellBg = isDark
                      ? 'bg-[#180a0e] border-rose-950/70 text-rose-300 hover:border-rose-800'
                      : 'bg-rose-50/40 border-rose-200 text-slate-700 hover:border-rose-300 hover:bg-rose-50';
                    
                    if (isAnswered) {
                      cellBg = isDark
                        ? 'bg-red-950/60 border-red-500/50 text-[#FF6B6B] font-bold shadow-xs'
                        : 'bg-rose-100/80 border-rose-300 text-red-700 font-bold shadow-xs';
                    }
                    if (isCurrent) {
                      cellBg = 'bg-gradient-to-r from-red-600 to-rose-500 border-red-500 text-white font-extrabold ring-3 ring-red-500/30 shadow-[0_0_12px_rgba(244,63,94,0.45)]';
                    }

                    return (
                      <button
                        key={q.id}
                        id={`map-jump-btn-${idx + 1}`}
                        onClick={() => {
                          onJumpToQuestion(idx);
                          onClose();
                        }}
                        className={`relative p-3 rounded-2xl border text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer group ${cellBg}`}
                      >
                        {/* Flag bookmark indicator */}
                        {isFlagged && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xs">
                            <Bookmark className="w-2.5 h-2.5 fill-white" />
                          </span>
                        )}

                        <span className="text-sm font-bold">{idx + 1}</span>

                        {/* Sub text indicating selected option */}
                        <span className={`text-[10px] uppercase font-semibold mt-0.5 ${
                          isCurrent
                            ? 'text-white/90'
                            : isAnswered
                              ? isDark ? 'text-[#FF6B6B]' : 'text-rose-600'
                              : isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          {selectedOption ? `[${selectedOption}]` : '•'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className={`px-5 py-4 sm:px-6 border-t flex items-center justify-between gap-3 ${
            isDark ? 'border-rose-950/70 bg-[#180a0e]' : 'border-rose-100 bg-rose-50/50'
          }`}>
            <button
              id="map-resume-btn"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#240e14] border-rose-900/60 text-rose-300'
                  : 'bg-white border-rose-200 text-rose-900 hover:bg-rose-100/60'
              }`}
            >
              Resume Question {currentIndex + 1}
            </button>

            {canSubmit ? (
              <button
                id="map-finish-exam-btn"
                onClick={() => {
                  onClose();
                  onSubmitQuiz();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white shadow-[0_0_12px_rgba(255,77,77,0.35)] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Submit Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="map-finish-exam-btn-locked"
                  disabled
                  className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-not-allowed inline-flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-[#0a1420] border-slate-800 text-slate-500'
                      : 'bg-slate-100 border-slate-300 text-slate-400'
                  }`}
                  title={`Answer at least ${requiredSubmitCount} questions to submit`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Submit Locked ({answeredCount}/{requiredSubmitCount})</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

