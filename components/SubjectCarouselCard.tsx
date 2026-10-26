'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Clock,
  TrendingUp,
  Briefcase,
  Calculator,
  Sigma,
  Languages,
  RotateCcw
} from 'lucide-react';
import { QuizPaper, SubjectConfig, SUBJECTS, SubjectID } from '@/types/quiz';
import { useAppTheme } from '@/lib/theme';
import { ExamAttempt } from '@/lib/storage';
import { loadQuizProgress } from '@/lib/localProgress';

interface SubjectCarouselCardProps {
  papers: QuizPaper[];
  examHistory: ExamAttempt[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onSelectSubject: (subjectId: SubjectID) => void;
  onStartPaper: (paper: QuizPaper, resume?: boolean) => void;
}

interface SubjectVisualMeta {
  image: string;
  curriculumKicker: string;
  topics: string[];
}

const SUBJECT_VISUAL_META: Record<string, SubjectVisualMeta> = {
  economics: {
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    curriculumKicker: 'DBE CURRICULUM · ECONOMICS P1 & P2',
    topics: ['Macroeconomics & Circular Flow', 'Business Cycles & Public Sector', 'Foreign Exchange & Trade'],
  },
  business_studies: {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    curriculumKicker: 'DBE CURRICULUM · BUSINESS STUDIES P1 & P2',
    topics: ['Business Environments & Legislation', 'Corporate Ventures & Management', 'King IV Governance & Ethics'],
  },
  accounting: {
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    curriculumKicker: 'DBE CURRICULUM · ACCOUNTING P1 & P2',
    topics: ['Financial Reporting & Balance Sheets', 'Cash Flow & Fixed Asset Registers', 'Inventory Valuation & Costing'],
  },
  maths_literacy: {
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    curriculumKicker: 'DBE CURRICULUM · MATHEMATICAL LITERACY',
    topics: ['Financial Math & Stepped Tariffs', 'Measurement & Metric Conversions', 'Maps, Scales & Data Handling'],
  },
  english_hg: {
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    curriculumKicker: 'DBE CURRICULUM · ENGLISH HOME LANGUAGE',
    topics: ['Critical Reading & Comprehension', 'Summary Writing & Editing Skills', 'Visual Cartoon & Ad Analysis'],
  },
  afrikaans_fal: {
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    curriculumKicker: 'DBE KURRIKULUM · AFRIKAANS FAL / TAT',
    topics: ['Leesbegrip & Opsommingstegnieke', 'STOMPI-woordorde & Tye', 'Taalkonvensies & Idiomatiese Taal'],
  },
};

function SubjectIconRender({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case 'economics':
      return <TrendingUp className={className} />;
    case 'business_studies':
      return <Briefcase className={className} />;
    case 'accounting':
      return <Calculator className={className} />;
    case 'maths_literacy':
      return <Sigma className={className} />;
    case 'english_hg':
      return <BookOpen className={className} />;
    case 'afrikaans_fal':
      return <Languages className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

export const SubjectCarouselCard: React.FC<SubjectCarouselCardProps> = ({
  papers,
  examHistory,
  currentIndex,
  onSelectIndex,
  onSelectSubject,
  onStartPaper,
}) => {
  const { isDark } = useAppTheme();
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Exactly 6 Subjects sorted consistently
  const subjectList: SubjectConfig[] = React.useMemo(() => {
    return [...SUBJECTS].sort((a, b) => (a.id === 'economics' ? -1 : b.id === 'economics' ? 1 : 0));
  }, []);

  const total = subjectList.length;
  const safeIndex = ((currentIndex % total) + total) % total;
  const currentSubject = subjectList[safeIndex] || subjectList[0];

  // Papers belonging to the current subject
  const currentSubPapers = React.useMemo(() => {
    return papers.filter((p) => p.subjectId === currentSubject.id);
  }, [papers, currentSubject.id]);

  // Attempt metrics for the current subject
  const subAttempts = React.useMemo(() => {
    return examHistory.filter((e) => currentSubPapers.some((p) => p.id === e.paperId));
  }, [examHistory, currentSubPapers]);

  const bestScore = subAttempts.length > 0 ? Math.max(...subAttempts.map((e) => e.percentage)) : null;
  const passedCount = subAttempts.filter((e) => e.passed).length;

  // Active session on any of the subject's papers
  const activeSessionPaper = React.useMemo(() => {
    return currentSubPapers.find((p) => {
      const sess = loadQuizProgress(p.id);
      return sess && Object.keys(sess.answers || {}).length > 0;
    }) || null;
  }, [currentSubPapers]);

  const featuredPaper = activeSessionPaper || currentSubPapers[0] || null;
  const visualMeta = SUBJECT_VISUAL_META[currentSubject.id] || SUBJECT_VISUAL_META.economics;

  const handlePrev = () => {
    setSlideDirection(-1);
    onSelectIndex((safeIndex - 1 + total) % total);
  };

  const handleNext = () => {
    setSlideDirection(1);
    onSelectIndex((safeIndex + 1) % total);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe if deltaX is significantly larger than vertical deltaY
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div 
      className="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl border select-none group shadow-lg transition-colors bg-white dark:bg-[#120709] border-rose-200/90 dark:border-rose-950/80"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Hero Image with Light Red Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src={visualMeta.image}
          alt={currentSubject.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-center filter brightness-[0.45] dark:brightness-[0.3] contrast-105 scale-105 transition-transform duration-700 group-hover:scale-100"
          referrerPolicy="no-referrer"
        />

        {/* Multi-layered academic lighting gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0406] via-[#120508]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#18060b]/90 via-[#18060b]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-rose-600" />
      </div>

      {/* Floating Arrow Navigation Buttons */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous Subject"
        className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-black/40 hover:bg-red-600/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next Subject"
        className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-black/40 hover:bg-red-600/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Slide Content Animation */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSubject.id}
          initial={{ opacity: 0, x: slideDirection * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: slideDirection * -60 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-7 text-white"
        >
          {/* Top Row: Subject Badges & Counters */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-600 text-white shadow-sm border border-red-500/60">
                SUBJECT {safeIndex + 1} OF 6
              </span>
              <span className="text-xs font-bold text-rose-200 tracking-wide hidden xs:inline">
                {visualMeta.curriculumKicker}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {bestScore !== null ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Best: {bestScore}%
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-rose-100">
                  {currentSubPapers.length} Tests Ready
                </span>
              )}
            </div>
          </div>

          {/* Center Info: Subject Title, Description & Topic Highlights */}
          <div className="max-w-2xl space-y-2.5 sm:space-y-3.5 my-auto py-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 border border-white/25 flex items-center justify-center text-white shadow-lg shrink-0">
                <SubjectIconRender id={currentSubject.id} className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-300">
                  {currentSubject.grade || 'Grade 12'} · Standardized Curriculum
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
                  {currentSubject.name}
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed max-w-xl">
              {currentSubject.description}
            </p>

            {/* Curriculum Focus Tags */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {visualMeta.topics.map((top, idx) => (
                <span 
                  key={idx} 
                  className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-rose-200"
                >
                  • {top}
                </span>
              ))}
            </div>

            {/* 3 Papers Preview Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              {currentSubPapers.slice(0, 3).map((paper, pIdx) => {
                const sess = loadQuizProgress(paper.id);
                const isSaved = sess && Object.keys(sess.answers || {}).length > 0;
                return (
                  <div
                    key={paper.id}
                    onClick={() => onSelectSubject(currentSubject.id)}
                    className="p-2.5 rounded-xl bg-black/35 hover:bg-black/50 border border-white/15 hover:border-red-400 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[9px] font-black text-rose-300 uppercase block">
                        {paper.code || `TEST #${pIdx + 1}`}
                      </span>
                      <p className="text-xs font-bold text-white truncate mt-0.5">
                        {paper.subtitle || paper.title}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-rose-200/80 pt-1.5 mt-1 border-t border-white/10">
                      <span>{paper.questions?.length || 50} Qs</span>
                      {isSaved ? (
                        <span className="text-amber-300 font-bold">Resume</span>
                      ) : (
                        <span className="text-rose-300">Ready</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Actions & Subject Indicators */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/15">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectSubject(currentSubject.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white text-xs sm:text-sm font-black shadow-lg shadow-rose-900/40 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore {currentSubject.shortName || currentSubject.name} (3 Papers)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {featuredPaper && (
                <button
                  type="button"
                  onClick={() => onStartPaper(featuredPaper, Boolean(activeSessionPaper))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-all cursor-pointer"
                  title="Directly launch active test"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
                  <span>{activeSessionPaper ? 'Resume' : 'Quick Start'}</span>
                </button>
              )}
            </div>

            {/* 6 Subject Indicator Dots */}
            <div className="flex items-center gap-1.5 self-center sm:self-auto">
              {subjectList.map((sub, dotIdx) => {
                const isActive = dotIdx === safeIndex;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setSlideDirection(dotIdx > safeIndex ? 1 : -1);
                      onSelectIndex(dotIdx);
                    }}
                    aria-label={`Jump to ${sub.name}`}
                    className={`transition-all cursor-pointer rounded-full ${
                      isActive
                        ? 'w-7 h-2.5 bg-gradient-to-r from-red-500 to-rose-400 shadow-sm'
                        : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
