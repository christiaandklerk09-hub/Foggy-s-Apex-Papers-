'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Bookmark, 
  HelpCircle, 
  LayoutGrid, 
  FastForward, 
  Layers, 
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { QuestionBlock } from '@/lib/pagination';
import { Question } from '@/lib/quiz-data';
import { useAppTheme } from '@/lib/theme';

interface ProgressTileProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  flaggedCount: number;
  activeBlock?: QuestionBlock;
  blocks?: QuestionBlock[];
  questions?: Question[];
  answers?: Record<number, 'A' | 'B' | 'C' | 'D'>;
  passMark?: number;
  totalBlocks?: number;
  completedSections?: number[];
  onOpenQuestionMap: () => void;
  onJumpToFirstUnanswered?: () => void;
  onSwitchSection?: (targetQuestionIndex: number) => void;
  className?: string;
  isCompact?: boolean;
}

export const ProgressTile: React.FC<ProgressTileProps> = ({
  currentIndex,
  totalQuestions,
  answeredCount,
  flaggedCount,
  activeBlock,
  blocks = [],
  questions = [],
  answers = {},
  onOpenQuestionMap,
  onJumpToFirstUnanswered,
  onSwitchSection,
  className = '',
}) => {
  const { isDark } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const percentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const remainingCount = Math.max(0, totalQuestions - answeredCount);

  // Calculate live total correct score across all answered questions
  const totalCorrect = React.useMemo(() => {
    if (!questions || questions.length === 0 || !answers) return 0;
    let count = 0;
    questions.forEach((q) => {
      if (q && answers[q.id] === q.correctAnswer) {
        count++;
      }
    });
    return count;
  }, [questions, answers]);

  // Compute stats per section/block
  const sectionStats = React.useMemo(() => {
    if (!blocks || blocks.length === 0) return [];

    return blocks.map((block) => {
      let answered = 0;
      let correct = 0;

      (block.questions || []).forEach((q) => {
        if (!q) return;
        const userAns = answers?.[q.id];
        if (userAns !== undefined) {
          answered++;
          if (userAns === q.correctAnswer) {
            correct++;
          }
        }
      });

      const isCurrent = activeBlock?.blockIndex === block.blockIndex ||
        (currentIndex >= block.startIndex && currentIndex <= block.endIndex);

      const totalInBlock = block.totalInBlock || (block.questions ? block.questions.length : 0);
      const scorePct = totalInBlock > 0 ? Math.round((correct / totalInBlock) * 100) : 0;
      const answeredPct = totalInBlock > 0 ? Math.round((answered / totalInBlock) * 100) : 0;

      return {
        block,
        totalInBlock,
        answered,
        correct,
        isCurrent,
        scorePct,
        answeredPct,
      };
    });
  }, [blocks, answers, activeBlock, currentIndex]);

  return (
    <div 
      id="quiz-progress-tile"
      className={`w-full border rounded-2xl p-2.5 sm:p-3 transition-all ${
        isDark
          ? 'bg-[#12070a]/95 border-rose-950/70 text-white shadow-md'
          : 'bg-white border-rose-100 text-slate-900 sunlit-card shadow-xs'
      } ${className}`}
    >
      {/* Streamlined Single-Row Header */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Question Counter & Section Tag */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className={`px-2 py-0.5 rounded-lg border text-xs font-black font-mono tracking-tight shrink-0 ${
            isDark 
              ? 'bg-red-950/80 border-red-500/40 text-[#FF6B6B]' 
              : 'bg-rose-50 border-rose-200 text-red-600'
          }`}>
            Q{currentIndex + 1}<span className="text-[10px] font-normal opacity-70">/{totalQuestions}</span>
          </div>

          {activeBlock && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] sm:text-[11px] font-bold min-w-0 max-w-[120px] xs:max-w-[180px] sm:max-w-xs ${
              isDark
                ? 'bg-[#1a0a0d] border-red-800/60 text-red-400'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <Layers className="w-3 h-3 text-red-500 shrink-0" />
              <span className="truncate flex-1">{activeBlock.title || `Section ${activeBlock.blockNumber}`}</span>
            </span>
          )}

          {flaggedCount > 0 && (
            <span className={`hidden xs:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
              isDark ? 'bg-amber-950/60 border border-amber-500/30 text-[#FBBF24]' : 'bg-amber-50 border border-amber-200 text-amber-800'
            }`}>
              <Bookmark className="w-2.5 h-2.5 fill-current" />
              <span>{flaggedCount}</span>
            </span>
          )}
        </div>

        {/* Center/Right: Mini Progress bar + Stats + Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Compact Mini Progress Bar */}
          <div className="flex items-center gap-2">
            <div className={`w-16 xs:w-24 sm:w-32 h-2 rounded-full overflow-hidden border p-0.5 ${
              isDark ? 'bg-[#1a0a0d] border-rose-950' : 'bg-rose-50 border-rose-200'
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-rose-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_6px_rgba(244,63,94,0.3)]"
                style={{ width: `${Math.max(percentage, 2)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono font-extrabold text-red-600 dark:text-[#FF6B6B]">
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          {/* Quick Jump to next missing */}
          {onJumpToFirstUnanswered && remainingCount > 0 && (
            <button
              id="progress-next-unanswered-btn"
              onClick={onJumpToFirstUnanswered}
              className={`hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                isDark
                  ? 'bg-[#1a0a0d] hover:bg-[#250f13] text-red-400 border-red-800/60'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
              }`}
              title="Jump to first unanswered question"
            >
              <FastForward className={`w-3 h-3 ${isDark ? 'text-red-400' : 'text-rose-600'}`} />
              <span>Next Missing</span>
            </button>
          )}

          {/* Map Modal Button */}
          <button
            id="progress-open-map-btn"
            onClick={onOpenQuestionMap}
            className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border shadow-xs ${
              isDark
                ? 'bg-[#1a0a0d] hover:bg-[#250f13] text-red-400 border-red-800/60'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
            }`}
            title="Open question map"
          >
            <LayoutGrid className={`w-3 h-3 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
            <span>Map</span>
          </button>

          {/* Optional Section Expand Toggle (Only if multiple sections exist) */}
          {sectionStats.length > 1 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title={isExpanded ? 'Collapse section details' : 'Expand section breakdown'}
              aria-label="Toggle section breakdown"
            >
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Section Switcher & Breakdown (Collapsed by default so it never blocks the question) */}
      {isExpanded && sectionStats.length > 1 && (
        <div 
          id="section-switcher-place"
          className={`mt-2.5 pt-2.5 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <Layers className="w-3 h-3 text-red-500 shrink-0" />
              <span>Section Switcher & Breakdown:</span>
            </span>
            <span className={`text-[10px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Live Score: <span className="text-red-600 dark:text-[#FF6B6B] font-mono font-black">{totalCorrect}/{totalQuestions}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {sectionStats.map((stat) => {
              const { block, totalInBlock, answered, correct, isCurrent, scorePct, answeredPct } = stat;
              return (
                <button
                  key={block.blockIndex}
                  id={`section-switch-tab-${block.blockNumber}`}
                  type="button"
                  onClick={() => onSwitchSection?.(block.startIndex)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isCurrent
                      ? isDark
                        ? 'bg-[#240e12]/90 border-red-500 shadow-xs ring-1 ring-red-500/50'
                        : 'bg-rose-50/90 border-red-400 shadow-xs ring-1 ring-red-300'
                      : isDark
                        ? 'bg-[#16080b] border-rose-950/60 hover:bg-[#220a10] hover:border-rose-800/60'
                        : 'bg-rose-50/40 border-rose-100 hover:bg-rose-50/80 hover:border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-xs font-black truncate ${
                      isCurrent
                        ? isDark ? 'text-[#FF7A7A]' : 'text-rose-700'
                        : isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {block.sectionLabel || `Section ${block.blockNumber}`}
                    </span>
                    {isCurrent ? (
                      <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-black uppercase shrink-0">
                        Active
                      </span>
                    ) : (
                      <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <span>Switch</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span>{answered}/{totalInBlock} done</span>
                    <span className="font-mono font-bold text-red-600 dark:text-[#FF6B6B]">{correct}/{totalInBlock} ({scorePct}%)</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
