'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Play, 
  RotateCcw, 
  Plus, 
  ArrowRight,
  FileCheck,
  Check,
  HelpCircle,
  BarChart3,
  Flame,
  Award
} from 'lucide-react';
import { QuizPaper, SubjectID, SUBJECTS } from '@/lib/quiz-data';
import { useAppTheme } from '@/lib/theme';
import { loadQuizProgress } from '@/lib/localProgress';
import { ExamAttempt } from '@/lib/storage';

interface SubjectTestsViewProps {
  subjectId: SubjectID;
  papers: QuizPaper[];
  examHistory: ExamAttempt[];
  onBack: () => void;
  onStartPaper: (paper: QuizPaper, resume?: boolean) => void;
  onOpenIngestionModal?: (subjectId?: SubjectID) => void;
}

export const SubjectTestsView: React.FC<SubjectTestsViewProps> = ({
  subjectId,
  papers,
  examHistory,
  onBack,
  onStartPaper,
  onOpenIngestionModal,
}) => {
  const { isDark } = useAppTheme();

  const subject = useMemo(() => {
    return SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];
  }, [subjectId]);

  // All papers for this subject
  const subjectPapers = useMemo(() => {
    return papers.filter((p) => p.subjectId === subjectId);
  }, [papers, subjectId]);

  // Separate papers into Structured Practice Tests vs Official DBE Past Exam Papers
  const { structuredTests, officialExamPapers } = useMemo(() => {
    const tests: QuizPaper[] = [];
    const exams: QuizPaper[] = [];
    subjectPapers.forEach((p) => {
      if (!p || !p.id) return;
      if (p.id.includes('test') || p.code.includes('TEST') || p.title.toLowerCase().includes('test')) {
        tests.push(p);
      } else {
        exams.push(p);
      }
    });
    // Sort tests so Test 1 comes before Test 2
    tests.sort((a, b) => a.code.localeCompare(b.code));
    return { structuredTests: tests, officialExamPapers: exams };
  }, [subjectPapers]);

  // Subject Stats
  const subjectAttempts = useMemo(() => {
    return examHistory.filter((e) => subjectPapers.some((p) => p && p.id === e.paperId));
  }, [examHistory, subjectPapers]);

  const completedCount = subjectAttempts.length;
  const passedCount = subjectAttempts.filter((e) => e.passed).length;
  const bestScore = subjectAttempts.length > 0 
    ? Math.max(...subjectAttempts.map((e) => e.percentage))
    : null;

  const renderPaperCard = (paper: QuizPaper, idx: number, isTestBadge?: boolean) => {
    const session = loadQuizProgress(paper.id);
    const hasProgress = session && Object.keys(session.answers || {}).length > 0;
    const answeredCount = hasProgress ? Object.keys(session.answers || {}).length : 0;
    const attempts = examHistory.filter((e) => e.paperId === paper.id);
    const bestAttempt = attempts.sort((a, b) => b.percentage - a.percentage)[0];
    const isPassed = bestAttempt && bestAttempt.passed;

    return (
      <div
        key={paper.id}
        className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-5 transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-md group relative overflow-hidden ${
          isTestBadge
            ? isDark
              ? 'bg-gradient-to-br from-[#260b13] to-[#150609] border-red-900/80 hover:border-red-500 shadow-[0_4px_20px_rgba(239,68,68,0.15)]'
              : 'bg-gradient-to-br from-red-50/90 via-white to-rose-50/40 border-red-200 hover:border-red-400 sunlit-card'
            : isDark
            ? 'bg-[#18070b]/95 border-red-950 hover:border-red-600/80 hover:bg-[#200a10]'
            : 'bg-white border-red-100 hover:border-red-300 hover:bg-red-50/30 sunlit-card'
        }`}
      >
        {/* Light Red Top Accent Stripe */}
        <div className={`absolute top-0 left-0 right-0 ${isTestBadge ? 'h-1 bg-gradient-to-r from-red-500 via-rose-400 to-red-500' : 'h-0.5 bg-red-400/50'}`} />

        <div className="space-y-2.5">
          {/* Top Row Badges */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-black uppercase px-2.5 py-0.5 rounded-lg border text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20">
                {paper.code}
              </span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                isTestBadge
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-400 bg-black/5 dark:bg-white/5'
              }`}>
                {isTestBadge ? `PRACTICE TEST #${idx + 1}` : `PAST PAPER #${idx + 1}`}
              </span>
            </div>

            {attempts.length > 0 && bestAttempt ? (
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                isPassed
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/15 border-rose-500/30 text-red-600 dark:text-rose-400'
              }`}>
                {isPassed ? 'PASSED' : 'SCORE'}: {bestAttempt.percentage}% {isPassed ? '✓' : ''}
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase text-slate-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md">
                Not Started
              </span>
            )}
          </div>

          {/* Paper Title */}
          <h3 className={`text-base font-bold leading-snug group-hover:text-red-600 dark:group-hover:text-rose-300 transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {paper.subtitle}
          </h3>

          {/* Description */}
          <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {paper.description}
          </p>

          {/* Metadata Specs */}
          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 pt-1 flex-wrap">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-300">
              <FileCheck className="w-3.5 h-3.5 text-rose-500" />
              <span>{paper.questions.length} Questions</span>
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{paper.totalMarks} Total Marks</span>
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>{paper.timeLimitMinutes} Mins</span>
            </span>
          </div>

          {/* In-Progress Progress Bar */}
          {hasProgress && (
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>In Progress: {answeredCount}/{paper.questions.length} questions answered</span>
                <span className="text-red-500">{Math.round((answeredCount / paper.questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full transition-all"
                  style={{ width: `${(answeredCount / paper.questions.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {hasProgress ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onStartPaper(paper, true)}
                className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/30 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume Session</span>
              </button>
              <button
                type="button"
                onClick={() => onStartPaper(paper, false)}
                title="Restart from Question 1"
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isDark ? 'bg-[#150608] border-rose-950 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onStartPaper(paper, false)}
              className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/30 transition-all cursor-pointer group-hover:scale-[1.01] active:scale-[0.99]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isTestBadge ? 'Start Practice Test' : 'Start Exam Paper'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 pt-3 sm:pt-5 pb-24 space-y-6 relative overflow-hidden bg-paper-grid">
      <div className="relative z-10 space-y-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-xs ${
              isDark
                ? 'bg-[#1b080d] border-rose-950 text-rose-200 hover:text-white hover:border-rose-700 hover:bg-[#250b12]'
                : 'bg-white border-rose-200 text-slate-700 hover:text-red-700 hover:border-rose-300 hover:bg-rose-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" />
            <span>Back to All Subjects</span>
          </button>

          {onOpenIngestionModal && (
            <button
              type="button"
              onClick={() => onOpenIngestionModal(subjectId)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-rose-600/30 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>+ Upload More {subject.shortName} Tests</span>
            </button>
          )}
        </div>

        {/* Subject Header Banner */}
        <div className={`p-5 sm:p-7 rounded-3xl border transition-all shadow-md relative overflow-hidden ${
          isDark
            ? 'bg-gradient-to-br from-[#240a12] via-[#18060a] to-[#100305] border-red-900/60 shadow-[0_4px_30px_rgba(239,68,68,0.2)]'
            : 'bg-gradient-to-br from-red-50/90 via-white to-rose-50/60 border-red-200/90 sunlit-card'
        }`}>
          {/* Top Light Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-400 to-red-500" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-600 text-white shadow-xs">
                  {subject.shortName} · {subject.grade}
                </span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                  {subjectPapers.length} {subjectPapers.length === 1 ? 'Test Available' : 'Tests Available'}
                </span>
              </div>

              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {subject.name}
              </h1>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {subject.description}
              </p>
            </div>

            {/* Stat Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className={`p-3.5 rounded-2xl border text-center min-w-[90px] ${
                isDark ? 'bg-[#150608]/90 border-rose-950' : 'bg-white border-rose-100 shadow-xs'
              }`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TESTS</span>
                <span className="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400">{subjectPapers.length}</span>
              </div>

              <div className={`p-3.5 rounded-2xl border text-center min-w-[90px] ${
                isDark ? 'bg-[#150608]/90 border-rose-950' : 'bg-white border-rose-100 shadow-xs'
              }`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">COMPLETED</span>
                <span className="text-lg sm:text-xl font-black text-emerald-500">{completedCount}</span>
              </div>

              {bestScore !== null && (
                <div className={`p-3.5 rounded-2xl border text-center min-w-[90px] ${
                  isDark ? 'bg-[#150608]/90 border-rose-950' : 'bg-white border-rose-100 shadow-xs'
                }`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">BEST SCORE</span>
                  <span className="text-lg sm:text-xl font-black text-amber-500">{bestScore}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION: TESTS & EXAM PAPERS FOR THIS SUBJECT */}
        <div className="space-y-6">
          {/* 1. STRUCTURED PRACTICE TESTS & MCQ ASSESSMENTS (ALWAYS ON TOP) */}
          {structuredTests.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs">
                  STRUCTURED PRACTICE TESTS & MCQ ASSESSMENTS
                </span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  {structuredTests.length} MCQ Assessment{structuredTests.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {structuredTests.map((paper, idx) => renderPaperCard(paper, idx, true))}
              </div>
            </div>
          )}

          {/* 2. OFFICIAL DBE PAST EXAM PAPERS (BELOW) */}
          {officialExamPapers.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-200/90 text-rose-900 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                  OFFICIAL DBE PAST EXAM PAPERS
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {officialExamPapers.length} Standard Exam Paper{officialExamPapers.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officialExamPapers.map((paper, idx) => renderPaperCard(paper, idx, false))}
              </div>
            </div>
          )}

          {subjectPapers.length === 0 && (
            <div className={`p-10 rounded-3xl border border-dashed text-center space-y-3 ${
              isDark ? 'bg-[#150608]/60 border-rose-950 text-slate-400' : 'bg-rose-50/40 border-rose-200 text-slate-600'
            }`}>
              <BookOpen className="w-10 h-10 mx-auto text-rose-500 opacity-60" />
              <h3 className="text-base font-bold">No tests uploaded yet for {subject.name}</h3>
              <p className="text-xs max-w-md mx-auto text-slate-400">
                You can upload your past paper and marking memo PDF or paste the test questions to add tests for this subject.
              </p>
              {onOpenIngestionModal && (
                <button
                  type="button"
                  onClick={() => onOpenIngestionModal(subjectId)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-rose-600/30 cursor-pointer transition-all mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload First Test for {subject.shortName}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Ingestion Prompt */}
        {onOpenIngestionModal && (
          <div 
            onClick={() => onOpenIngestionModal(subjectId)}
            className={`p-5 rounded-3xl border border-dashed transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group ${
              isDark
                ? 'bg-[#18070b]/60 border-rose-900/60 hover:border-rose-500 hover:bg-[#200a10]'
                : 'bg-rose-50/40 border-rose-200 hover:border-red-400 hover:bg-rose-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shrink-0 shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Have another past paper or test for {subject.name}?
                </h4>
                <p className="text-xs text-slate-400">
                  Upload the Question Paper & Memo PDF. Gemini extracts questions, LaTeX, and scoring steps automatically.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 group-hover:bg-red-500 text-white text-xs font-bold shrink-0 transition-all shadow-xs">
              <span>Upload Paper</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
