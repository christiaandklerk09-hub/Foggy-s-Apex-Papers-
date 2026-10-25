'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Sparkles,
} from 'lucide-react';
import { QuizPaper } from '@/lib/quiz-data';
import { getPaperChapterNumber } from '@/lib/chapterParser';
import { useAppTheme } from '@/lib/theme';

interface ChapterCarouselCardProps {
  papers: QuizPaper[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onStartAssessment: (paper: QuizPaper, resume?: boolean) => void;
  onOpenIngestionModal?: () => void;
  onOpenPaperSelector?: (subjectId?: string) => void;
  savedSession?: {
    currentIndex?: number;
    answers?: Record<number, string>;
  } | null;
  hasPassed?: boolean;
  bestScore?: number | null;
}

interface ChapterVisualConfig {
  image: string;
  topicTag: string;
  fallbackDesc: string;
  rescueAccent: string;
}

const CHAPTER_VISUALS: Record<number, ChapterVisualConfig> = {
  1: {
    // Accounting
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    topicTag: 'GRADE 12 · ACCOUNTING (PAPER 1)',
    fallbackDesc: 'Financial reporting, Balance Sheet, Cash Flow Statements, GAAP/IFRS principles, and ratio analysis.',
    rescueAccent: '#EF4444',
  },
  2: {
    // Business Studies
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    topicTag: 'GRADE 12 · BUSINESS STUDIES (PAPER 1)',
    fallbackDesc: 'Macro & market environments, corporate strategies, Porter\'s Five Forces, B-BBEE, and King IV governance.',
    rescueAccent: '#F43F5E',
  },
  3: {
    // Economics
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    topicTag: 'GRADE 12 · ECONOMICS (PAPER 1)',
    fallbackDesc: 'Circular flow model, business cycles, public sector economics, SARB monetary policy, and balance of payments.',
    rescueAccent: '#FB7185',
  },
  4: {
    // Mathematical Literacy
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    topicTag: 'GRADE 12 · MATHEMATICAL LITERACY (PAPER 1)',
    fallbackDesc: 'Personal income tax calculations, stepped municipal tariffs, compound interest, exchange rates, and data handling.',
    rescueAccent: '#E11D48',
  },
  5: {
    // English Home Language
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    topicTag: 'GRADE 12 · ENGLISH HOME LANGUAGE (PAPER 1)',
    fallbackDesc: 'Critical comprehension passages, visual cartoon analysis, advertising techniques, summary writing, and grammar editing.',
    rescueAccent: '#FDA4AF',
  },
  6: {
    // Afrikaans EAT
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    topicTag: 'GRAAD 12 · AFRIKAANS FAL (VRAESTEL 1)',
    fallbackDesc: 'Leesbegrip, opsommingstegnieke, STOMPI-woordorde, voegwoorde, lydende vorm, en idiome.',
    rescueAccent: '#F87171',
  },
};

export const ChapterCarouselCard: React.FC<ChapterCarouselCardProps> = ({
  papers,
  currentIndex,
  onSelectIndex,
  onStartAssessment,
  onOpenIngestionModal,
  onOpenPaperSelector,
  savedSession,
  hasPassed,
  bestScore,
}) => {
  const { isDark } = useAppTheme();
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = papers?.length || 0;
  const paper = papers && papers.length > 0 ? (papers[currentIndex] || papers[0]) : null;

  if (!paper || total === 0) {
    return (
      <section 
        className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-xl h-full flex-1 flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 ${
          isDark
            ? 'border-rose-900/50 bg-gradient-to-br from-[#1b080d] via-[#140508] to-[#0c0305] text-white'
            : 'border-rose-200 bg-gradient-to-br from-rose-50/90 via-white to-red-50/60 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-xs">
            APEX PAPERS · GRADE 12
          </span>
          <span className="text-xs font-bold text-rose-500">
            0 Tests Loaded
          </span>
        </div>

        <div className="space-y-3 my-auto py-6 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-red-600 via-rose-600 to-rose-500 mx-auto flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
            <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Ingest Your Exam Papers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            All past tests have been deleted. You can now upload your Question Paper & Marking Memo PDFs to add tests 1 by 1.
          </p>

          {onOpenIngestionModal && (
            <button
              type="button"
              onClick={onOpenIngestionModal}
              className="mt-4 px-6 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white shadow-md shadow-rose-600/30 inline-flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>+ Ingest First DBE Exam & Memo</span>
            </button>
          )}
        </div>

        <div className="text-center text-[11px] font-semibold text-slate-400">
          Supports Accounting, Business Studies, Economics, Mathematical Literacy, English HL, and Afrikaans FAL
        </div>
      </section>
    );
  }

  const chapterNumber = getPaperChapterNumber(paper);
  const visualConfig = CHAPTER_VISUALS[chapterNumber] || CHAPTER_VISUALS[1];

  const handleNext = () => {
    setSlideDirection(1);
    const nextIdx = (currentIndex + 1) % total;
    onSelectIndex(nextIdx);
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    const prevIdx = (currentIndex - 1 + total) % total;
    onSelectIndex(prevIdx);
  };

  // Mobile touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - (touchStartY.current || 0);

    // Only trigger if horizontal swipe is dominant and over threshold (35px)
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const hasProgress = savedSession && Object.keys(savedSession.answers || {}).length > 0;
  const answeredCount = hasProgress ? Object.keys(savedSession.answers || {}).length : 0;

  // Clean title: operational module name style
  let cleanedTitle = (paper.subtitle || '')
    .replace(/^Chapter \d+:\s*/i, '')
    .replace(/^Chapter \d+\s*-\s*/i, '')
    .replace(/^Ch\.\s*\d+:\s*/i, '')
    .replace(/^Apex Papers Operations:\s*/i, '')
    .replace(/^Apex Papers Operations\s*-\s*/i, '')
    .replace(/^Apex Papers Module \d+:\s*/i, '')
    .replace(/^Apex Papers Module \d+\s*-\s*/i, '')
    .replace(/^Apex Papers Operations:\s*/i, '')
    .replace(/^Apex Papers Operations\s*-\s*/i, '')
    .replace(/\s*Assessment$/i, '')
    .trim();

  // If cleaning resulted in an empty string (e.g. if the module name is exactly the protocol name), preserve the full subtitle
  if (!cleanedTitle) {
    cleanedTitle = paper.subtitle || 'Apex Papers Operations';
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section 
      id="home-chapter-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-between transition-all duration-300 select-none ${
        paper.subjectId === 'accounting' || paper.id.includes('accounting')
          ? isDark
            ? 'border-rose-800/80 bg-gradient-to-br from-[#20080f] to-[#120709] glow-red-card'
            : 'border-rose-300 bg-gradient-to-br from-red-50/90 via-white to-rose-50/70 sunlit-card'
          : isDark
          ? 'border-rose-800/80 bg-gradient-to-br from-[#20080f] to-[#120709] glow-red-card'
          : 'border-rose-300 bg-gradient-to-br from-rose-50/90 via-white to-red-50/70 sunlit-card'
      }`}
    >
      {/* Light Red Top Accent Stripe for Topic */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-rose-600 z-30" />

      {/* FULL-BLEED BACKGROUND PICTURE THAT FILLS THE TILE */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={paper.id}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The web image completely fills the tile */}
            <Image 
              src={visualConfig.image} 
              alt={paper.subtitle}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              referrerPolicy="no-referrer"
              className="object-cover object-center transform scale-100 transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-Stage Gradients for Flawless Readability with Light Red Warmth */}
        {isDark ? (
          <>
            {/* Dark garnet vignette from bottom up where typography and CTA sit */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140608] via-[#140608]/85 via-45% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#140608]/80 via-transparent via-25% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[#351218]/25 pointer-events-none" />
          </>
        ) : (
          <>
            {/* Sunlit light mode gradient overlay with delicate rose tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 via-50% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent via-20% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[#fff5f5]/30 pointer-events-none" />
          </>
        )}
      </div>

      {/* TOP AREA: Status Badges in Light/Dark mode */}
      <div className="relative z-20 pt-3 sm:pt-4 px-3.5 sm:px-5 flex items-center justify-between gap-2">
        <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide shadow-xs shrink-0 ${
          isDark 
            ? 'badge-blur bg-[#16080b]/85 border border-rose-500/40 text-rose-300'
            : 'badge-blur-light bg-white/90 border border-rose-200 text-rose-700'
        }`}>
          {currentIndex + 1} / {papers.length} ACTIVE
        </span>

        {/* Quick Ingest Button */}
        {onOpenIngestionModal && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenIngestionModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white shadow-md shadow-rose-600/30 cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Ingest DBE Exam Paper & Marking Memo"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            <span>Ingest DBE Paper & Memo</span>
          </button>
        )}

        <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold flex items-center gap-1.5 shadow-xs tracking-wider shrink-0 ${
          isDark
            ? 'badge-blur bg-red-950/80 border border-red-500/40 text-[#FF6B6B]'
            : 'badge-blur-light bg-white/90 border border-red-200 text-red-600'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)] animate-pulse"></span>
          LIVE
        </span>
      </div>

      {/* BOTTOM CONTENT AREA OVERLAID ON PICTURE */}
      <div className="relative z-20 p-3.5 sm:p-5 pt-0 flex flex-col justify-end space-y-1.5 sm:space-y-2">
        {/* Topic Tag & Navigation Buttons */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] shadow-xs backdrop-blur-sm ${
              paper.subjectId === 'accounting' || paper.id.includes('accounting')
                ? isDark
                  ? 'bg-red-950/90 border border-red-500/60 text-red-300 ring-1 ring-red-500/30'
                  : 'bg-red-100/95 border border-red-300 text-red-700 shadow-xs'
                : isDark
                ? 'bg-red-950/90 border border-red-500/50 text-[#FF6B6B]'
                : 'bg-rose-100/90 border border-rose-300 text-red-700'
            }`}>
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_rgba(239,68,68,0.7)] animate-pulse" />
              {paper.id === 'accounting-mcq-test-1'
                ? 'ACCOUNTING · MCQ TEST 1 (50 Qs)'
                : paper.id === 'accounting-mcq-test-2'
                ? 'ACCOUNTING · MCQ TEST 2 (50 Qs)'
                : paper.id === 'maths-lit-mcq-test-1'
                ? 'MATHS LIT · MCQ TEST 1 (50 Qs)'
                : paper.id === 'maths-lit-mcq-test-2'
                ? 'MATHS LIT · MCQ TEST 2 (50 Qs)'
                : paper.subjectId === 'economics'
                ? 'ECONOMICS · P1 (NOV 2021)'
                : paper.subjectId === 'business_studies'
                ? 'BUSINESS STUDIES · P1 (2021)'
                : paper.subjectId === 'accounting'
                ? 'ACCOUNTING · P1 (NOV 2021)'
                : paper.subjectId === 'maths_literacy'
                ? 'MATHEMATICAL LITERACY · P1 (NOV 2021)'
                : paper.subjectId === 'english_hg'
                ? 'ENGLISH FAL · P1 (NOV 2021)'
                : paper.subjectId === 'afrikaans_fal'
                ? 'AFRIKAANS TAT · V1 (NOV 2021)'
                : visualConfig.topicTag}
            </span>

            {hasPassed && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold backdrop-blur-sm ${
                isDark
                  ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-300'
                  : 'bg-emerald-50 border border-emerald-300 text-emerald-800 shadow-xs'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                PASSED ({bestScore}%)
              </span>
            )}
          </div>

          {/* Quick Carousel Prev/Next Buttons */}
          {total > 1 && (
            <div className="flex items-center gap-1.5 z-30">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                  isDark ? 'bg-[#200a10] hover:bg-[#301018] border-rose-900/80 text-rose-200' : 'bg-white hover:bg-rose-50 border-rose-200 text-slate-700 shadow-xs'
                }`}
                title="Previous Exam Paper"
                aria-label="Previous paper"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                  isDark ? 'bg-[#200a10] hover:bg-[#301018] border-rose-900/80 text-rose-200' : 'bg-white hover:bg-rose-50 border-rose-200 text-slate-700 shadow-xs'
                }`}
                title="Next Exam Paper"
                aria-label="Next paper"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className={`text-lg xs:text-xl sm:text-2xl font-black tracking-tight leading-tight drop-shadow-xs ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {cleanedTitle}
        </h2>

        {/* Subtitle / Description */}
        <p className={`text-[11px] sm:text-xs leading-snug font-normal line-clamp-2 max-w-xl ${
          isDark ? 'text-slate-200/95' : 'text-slate-600'
        }`}>
          {paper.description || visualConfig.fallbackDesc}
        </p>

        {/* Meta Stats Row */}
        <div className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold pt-0.5 ${
          isDark ? 'text-slate-300' : 'text-slate-500'
        }`}>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{paper.questions.length} Qs</span>
          <span className={isDark ? 'text-slate-500' : 'text-slate-300'}>·</span>
          <span>{Math.max(15, Math.round(paper.questions.length * 1.5))} Min</span>
          <span className={isDark ? 'text-slate-500' : 'text-slate-300'}>·</span>
          <span className={`font-bold ${isDark ? 'text-rose-400' : 'text-red-600'}`}>Official DBE Memo</span>
          <span className={isDark ? 'text-slate-500' : 'text-slate-300'}>·</span>
          <span>Pass {paper.passMark}/{paper.questions.length} (80%)</span>
        </div>

        {/* 13-Segment Progress Indicator */}
        <div className="flex items-center gap-1 w-full py-0.5">
          {papers.map((p, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSlideDirection(idx > currentIndex ? 1 : -1);
                  onSelectIndex(idx);
                }}
                aria-label={`Jump to Module ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isCurrent 
                    ? isDark 
                      ? 'flex-1 bg-red-500 shadow-[0_0_10px_#ef4444]' 
                      : 'flex-1 bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.4)]'
                    : isDark 
                      ? 'w-1.5 xs:w-2 bg-slate-700/60 hover:bg-slate-500'
                      : 'w-1.5 xs:w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            );
          })}
        </div>

        {/* Action Button: Glowing CTA button */}
        {hasProgress ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
            <button
              onClick={() => onStartAssessment(paper, true)}
              className={`w-full active:scale-[0.99] font-extrabold text-xs sm:text-sm py-2.5 sm:py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isDark
                  ? 'glow-btn-red bg-gradient-to-r from-red-600 via-rose-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.45)]'
                  : 'glow-btn-red bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white shadow-[0_4px_25px_rgba(225,29,72,0.35)]'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Q{(savedSession?.currentIndex || 0) + 1} ({answeredCount}/{paper.questions.length})</span>
            </button>
            <button
              onClick={() => onStartAssessment(paper, false)}
              className={`w-full font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all backdrop-blur-sm ${
                isDark
                  ? 'bg-[#1c0a0e]/80 hover:bg-[#2a1015] border border-rose-900/60 text-rose-200 hover:text-white'
                  : 'bg-white hover:bg-rose-50 border border-rose-200 text-slate-700 hover:text-rose-900 shadow-xs'
              }`}
            >
              <span>Start Fresh</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            id={`hero-start-assessment-btn-${paper.id}`}
            onClick={() => onStartAssessment(paper, false)}
            className={`w-full active:scale-[0.99] font-extrabold text-xs sm:text-sm py-2.5 sm:py-3 px-5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
              isDark
                ? 'glow-btn-red bg-gradient-to-r from-red-600 via-rose-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.45)]'
                : 'glow-btn-red bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white shadow-[0_4px_20px_rgba(225,29,72,0.3)]'
            }`}
          >
            <span>Start Assessment</span>
            <span className="text-sm font-bold">→</span>
          </button>
        )}
      </div>
    </section>
  );
};
