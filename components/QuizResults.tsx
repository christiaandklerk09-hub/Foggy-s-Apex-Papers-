'use client';

import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';


import { 
  Trophy, 
  Check, 
  X, 
  AlertTriangle, 
  RotateCcw, 
  Layers, 
  Clock, 
  Award, 
  Filter, 
  Camera, 
  Bookmark, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  Home,
  Languages,
  Loader2,
  Calendar,
  Download,
  Sparkles,
  Cloud,
  ExternalLink
} from 'lucide-react';
import { QuizPaper, Question } from '@/lib/quiz-data';
import { ExamAttempt } from '@/types/quiz';
import { getPaperChapterBadge } from '@/lib/chapterParser';
import { TranslateControl } from './TranslateControl';
import { TranslationResult, SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/translate';
import { getSmartQuestionBlocks } from '@/lib/pagination';
import { useAppTheme } from '@/lib/theme';
import { getDriveAccessToken, googleSignInForDrive } from '@/lib/googleDriveAuth';
import { exportExamTranscriptToDrive } from '@/lib/googleDriveService';
import { evaluateQuestionAnswer } from '@/lib/evaluation';

interface QuizResultsProps {
  paper: QuizPaper;
  answers: Record<number, string>;
  flaggedQuestions: Set<number>;
  timeElapsed: number;
  candidateName: string;
  candidateClub?: string;
  attemptDate?: string;
  sectionScores?: Record<number, { score: number; total: number; title?: string }>;
  onRetake: () => void;
  onRetryMissed: (missedQuestionIds: number[]) => void;
  onSwitchPaper: () => void;
  onGoHome?: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  paper,
  answers,
  flaggedQuestions,
  timeElapsed,
  candidateName,
  candidateClub,
  attemptDate,
  sectionScores,
  onRetake,
  onRetryMissed,
  onSwitchPaper,
  onGoHome,
}) => {

  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct' | 'flagged'>('all');
  const [reviewTranslations, setReviewTranslations] = useState<Record<number, TranslationResult>>({});
  const [chosenLanguage, setChosenLanguage] = useState<SupportedLanguage | null>(null);

  useEffect(() => {
    try {
      const savedCode = localStorage.getItem('sho_preferred_lang_code');
      if (savedCode) {
        const found = SUPPORTED_LANGUAGES.find((l) => l.code === savedCode) || null;
        if (found) {
          const timer = setTimeout(() => setChosenLanguage(found), 0);
          return () => clearTimeout(timer);
        }
      }
    } catch {}
  }, []);
  const [showingTranslatedMap, setShowingTranslatedMap] = useState<Record<number, boolean>>({});

  // Extract first name for personalized score greeting (Requirement 5)
  const getFirstName = (name?: string) => {
    if (!name || name === 'Lifeguard Candidate') return 'Candidate';
    const clean = name.trim().split(/\s+/)[0];
    return clean || 'Candidate';
  };
  const firstName = getFirstName(candidateName);

  // Screen capture states & ref for capturing score card (Requirement 8)
  const scoreSummaryRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureSuccess, setCaptureSuccess] = useState(false);

  // Google Drive export state
  const [isExportingDrive, setIsExportingDrive] = useState(false);
  const [driveFileLink, setDriveFileLink] = useState<string | null>(null);
  const [driveStatusMsg, setDriveStatusMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Cumulative Section Score Calculation
  const effectiveSectionScores = React.useMemo(() => {
    if (sectionScores && Object.keys(sectionScores).length > 0) {
      return sectionScores;
    }
    const blocks = getSmartQuestionBlocks(paper.questions);
    const computed: Record<number, { score: number; total: number; title?: string }> = {};
    blocks.forEach((block) => {
      let sc = 0;
      block.questions.forEach((q) => {
        if (evaluateQuestionAnswer(answers[q.id], q).isCorrect) sc++;
      });
      computed[block.blockNumber] = {
        score: sc,
        total: block.questions.length,
        title: block.title,
      };
    });
    return computed;
  }, [sectionScores, paper.questions, answers]);

  const cumulativeTotalScore = Object.values(effectiveSectionScores).reduce((acc, curr) => acc + curr.score, 0);
  const cumulativeTotalPossible = Object.values(effectiveSectionScores).reduce((acc, curr) => acc + curr.total, 0);

  // Compute stats guaranteed to match cumulative section scores
  let correctCount = cumulativeTotalScore;
  const missedIds: number[] = [];
  const categoryStats: Record<string, { total: number; correct: number }> = {};

  paper.questions.forEach((q) => {
    const isCorrect = evaluateQuestionAnswer(answers[q.id], q).isCorrect;
    if (!isCorrect) {
      missedIds.push(q.id);
    }

    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { total: 0, correct: 0 };
    }
    categoryStats[q.category].total++;
    if (isCorrect) {
      categoryStats[q.category].correct++;
    }
  });

  const total = paper.questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const effectivePassMark = total === paper.questions.length ? (paper.passMark || Math.ceil(total * 0.8)) : Math.ceil(total * 0.8);
  const isPassed = correctCount >= effectivePassMark;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };


  const handleCaptureScore = async () => {
    if (!scoreSummaryRef.current) return;
    setIsCapturing(true);
    try {
      const cleanPaper = paper.id.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const cleanCandidate = candidateName ? candidateName.replace(/[^a-zA-Z0-9]/g, '_') : 'Candidate';
      const fileName = `Apex Papers-Score-${cleanPaper}-${cleanCandidate}.png`;

      let dataUrl: string | null = null;

      // 1. Primary: Use html2canvas for high-fidelity DOM rasterization
      try {
                const canvas = await html2canvas(scoreSummaryRef.current, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true,
          ignoreElements: (element) => {
            return element.classList?.contains('no-capture') || false;
          },
        });
        dataUrl = canvas.toDataURL('image/png');
      } catch (canvasErr) {
        console.warn('html2canvas failed, attempting html-to-image fallback:', canvasErr);
      }

      // 2. Fallback: Use html-to-image if html2canvas had an issue
      if (!dataUrl) {
        dataUrl = await toPng(scoreSummaryRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          filter: (node: HTMLElement) => !node.classList?.contains('no-capture'),
        });
      }

      if (dataUrl) {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setCaptureSuccess(true);
        setTimeout(() => setCaptureSuccess(false), 4500);
      }
    } catch (err) {
      console.error('Screen capture failed:', err);
      alert('Screen capture generation failed. Please use your device screenshot shortcut to capture the score card.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleExportToDrive = async () => {
    setIsExportingDrive(true);
    setDriveStatusMsg(null);
    setDriveFileLink(null);
    try {
      let token = await getDriveAccessToken();
      if (!token) {
        const authRes = await googleSignInForDrive();
        token = authRes?.accessToken || null;
      }

      if (!token) {
        throw new Error('Could not connect to Google Drive. Please authorize with your Google account.');
      }

      const mockAttempt: ExamAttempt = {
        id: `attempt_${Date.now()}`,
        paperId: paper.id,
        paperTitle: paper.title,
        paperSubtitle: paper.subtitle,
        paperCode: paper.code,
        score: correctCount,
        totalMarks: total,
        percentage,
        passed: isPassed,
        passMark: effectivePassMark,
        completedAt: new Date().toISOString(),
        timeElapsed: timeElapsed || 0,
        answers,
        missedIds,
        candidateName: candidateName || 'Candidate',
        accessCode: 'PRACTICE',
        clubName: candidateClub || 'Apex High School',
        categoryBreakdown: categoryStats,
      };

      const file = await exportExamTranscriptToDrive(token, mockAttempt, candidateName || 'Candidate');
      setDriveStatusMsg({ text: `Transcript successfully saved to Google Drive as "${file.name}"!` });
      if (file.webViewLink) {
        setDriveFileLink(file.webViewLink);
      }
    } catch (err: any) {
      console.error('Error exporting to Google Drive:', err);
      setDriveStatusMsg({ text: err.message || 'Failed to export to Google Drive', error: true });
    } finally {
      setIsExportingDrive(false);
    }
  };

  // Filter questions
  const filteredQuestions = paper.questions.filter((q) => {
    const isCorrect = answers[q.id] === q.correctAnswer;
    const isAnswered = answers[q.id] !== undefined;
    const isFlagged = flaggedQuestions.has(q.id);

    if (filter === 'incorrect') return !isCorrect;
    if (filter === 'correct') return isCorrect;
    if (filter === 'flagged') return isFlagged;
    return true;
  });

  const { isDark } = useAppTheme();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10">
      
      {/* Capturable Score Section */}
      <div
        ref={scoreSummaryRef}
        id="score-summary-capture-container"
        className={`rounded-3xl border shadow-xl p-6 sm:p-10 mb-6 relative overflow-hidden transition-colors ${
          isDark
            ? 'bg-[#120709]/95 border-rose-900/40 text-white'
            : 'bg-white border-rose-100 text-slate-900 sunlit-card'
        }`}
      >
        {/* Top Accent Strip: Radiant Light Red Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-rose-400 to-rose-600" />

        {/* Certificate Header Banner */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b ${
          isDark ? 'border-rose-950/70' : 'border-rose-100'
        }`}>
          
          {/* Left: Overall Outcome with Personalized Greeting */}
          <div className="flex-1 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-xs ${
              isDark
                ? 'bg-red-950/80 border border-red-500/40 text-[#FF6B6B]'
                : 'bg-rose-50 border border-rose-200 text-rose-700'
            }`}>
              <ShieldCheck className="w-4 h-4 text-[#FF4D4D]" />
              <span>Apex Papers · {getPaperChapterBadge(paper)?.topicLabel || 'Examination'} Score Card</span>
              <span className="ml-1 px-2 py-0.2 rounded-full text-[10px] font-black uppercase bg-rose-200/90 text-rose-900 dark:bg-rose-900 dark:text-rose-200">
                Grade 12 NSC Practice
              </span>
            </div>

            {/* Personalized Name Greeting */}
            <h2 id="personalized-score-heading" className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {firstName}, your score is: <span className="text-[#FF4D4D]">{percentage}% ({correctCount}/{total})</span>
            </h2>
            <p className={`text-sm font-semibold mt-1 ${
              isDark ? 'text-[#FF7A7A]' : 'text-rose-600'
            }`}>
              {paper.title} • {paper.subtitle}
            </p>

            <div className={`flex items-center gap-3 sm:gap-4 mt-2.5 text-xs flex-wrap justify-center md:justify-start ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {candidateName && (
                <span className={`px-2.5 py-1 rounded-lg border ${
                  isDark
                    ? 'bg-red-950/40 border-red-800/50 text-red-400'
                    : 'bg-rose-50 border-rose-200 text-red-800'
                }`}>
                  Candidate: <strong className={isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{candidateName}</strong>
                </span>
              )}
              {candidateClub && (
                <span className={`px-2.5 py-1 rounded-lg border ${
                  isDark
                    ? 'bg-[#15070a] border-rose-950/70 text-slate-300'
                    : 'bg-rose-50/60 border-rose-100 text-slate-700'
                }`}>
                  School: <strong className={isDark ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}>{candidateClub}</strong>
                </span>
              )}
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                isDark
                  ? 'bg-[#15070a] border-rose-950/70 text-slate-400'
                  : 'bg-rose-50/60 border-rose-100 text-slate-600'
              }`}>
                <Calendar className="w-3.5 h-3.5 text-[#FF4D4D]" />
                <span>Date: <strong className={isDark ? 'text-slate-200 font-medium' : 'text-slate-800 font-medium'}>
                  {attemptDate 
                    ? new Date(attemptDate).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    : new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })
                  }
                </strong></span>
              </span>
            </div>

            {/* Pass/Fail Status Banner */}
            <div className="mt-5">
              {isPassed ? (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm sm:text-base border ${
                  isDark
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                }`}>
                  <Check className="w-5 h-5 text-emerald-500 stroke-[3] shrink-0" />
                  <span>
                    PASSED CERTIFICATION ({percentage}% - Pass mark: {paper.passMark}/{total})
                  </span>
                </div>
              ) : (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm sm:text-base border ${
                  isDark
                    ? 'bg-red-950/80 border-red-500/50 text-[#FF7A7A] shadow-[0_0_15px_rgba(255,77,77,0.25)]'
                    : 'bg-rose-50 border-rose-300 text-rose-800 shadow-xs'
                }`}>
                  <AlertTriangle className="w-5 h-5 text-[#FF4D4D] shrink-0" />
                  <span>
                    DID NOT PASS ({percentage}% - Required: {paper.passMark}/{total})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Big Circular Score Display */}
          <div className="flex flex-col items-center">
            <div className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 flex flex-col items-center justify-center ${
              isDark
                ? 'bg-gradient-to-br from-[#1b080e] to-[#250d14] border-red-500/40 shadow-[0_0_25px_rgba(255,77,77,0.25)]'
                : 'bg-gradient-to-br from-rose-50 to-red-100 border-rose-300 shadow-md'
            }`}>
              <span className={`text-4xl sm:text-5xl font-black tracking-tighter ${
                isDark ? 'text-[#FF6B6B]' : 'text-red-600'
              }`}>
                {correctCount}
                <span className={`text-xl font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/{total}</span>
              </span>
              <span className={`text-xs font-extrabold uppercase tracking-widest mt-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {percentage}% Score
              </span>
            </div>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
          <div className={`p-4 rounded-2xl border flex flex-col ${
            isDark
              ? 'bg-emerald-950/40 border-emerald-500/30'
              : 'bg-emerald-50/70 border-emerald-200'
          }`}>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              <Check className="w-4 h-4 stroke-[3] text-emerald-500" />
              <span>Correct</span>
            </span>
            <span className={`text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{correctCount}</span>
            <span className={`text-[11px] font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{percentage}% accuracy</span>
          </div>

          <div className={`p-4 rounded-2xl border flex flex-col ${
            isDark
              ? 'bg-red-950/40 border-red-500/30'
              : 'bg-rose-50/70 border-rose-200'
          }`}>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${
              isDark ? 'text-[#FF7A7A]' : 'text-rose-700'
            }`}>
              <X className="w-4 h-4 stroke-[3] text-[#FF4D4D]" />
              <span>Incorrect</span>
            </span>
            <span className={`text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{total - correctCount}</span>
            <span className={`text-[11px] font-medium ${isDark ? 'text-[#FF7A7A]' : 'text-rose-700'}`}>
              {Math.round(((total - correctCount) / total) * 100)}% missed
            </span>
          </div>

          <div className={`p-4 rounded-2xl border flex flex-col ${
            isDark
              ? 'bg-[#180a0e] border-rose-900/50'
              : 'bg-rose-50/70 border-rose-200'
          }`}>
            <span className={`text-xs font-bold flex items-center gap-1 ${
              isDark ? 'text-rose-300' : 'text-rose-700'
            }`}>
              <Clock className="w-3.5 h-3.5 text-red-500" />
              Time Elapsed
            </span>
            <span className={`text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{formatTime(timeElapsed)}</span>
            <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              ~{Math.round(timeElapsed / total)}s / question
            </span>
          </div>

          <div className={`p-4 rounded-2xl border flex flex-col ${
            isDark
              ? 'bg-amber-950/40 border-amber-500/30'
              : 'bg-amber-50/70 border-amber-200'
          }`}>
            <span className={`text-xs font-bold flex items-center gap-1 ${
              isDark ? 'text-[#FBBF24]' : 'text-amber-700'
            }`}>
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              Flagged
            </span>
            <span className={`text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{flaggedQuestions.size}</span>
            <span className={`text-[11px] font-medium ${isDark ? 'text-[#FBBF24]' : 'text-amber-700'}`}>Marked for review</span>
          </div>
        </div>

        {/* Cumulative Section Scoring & Candidate Details Breakdown */}
        <div className={`mt-6 pt-6 border-t ${isDark ? 'border-rose-950/70' : 'border-rose-100'}`}>
          <div className={`p-5 sm:p-6 rounded-2xl border ${
            isDark ? 'bg-[#14080b] border-rose-950/60' : 'bg-rose-50/50 border-rose-100'
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b ${
              isDark ? 'border-rose-950/60' : 'border-rose-200/60'
            }`}>
              <div>
                <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Candidate: {candidateName}
                </h2>
                <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {candidateClub || 'Apex Papers Exam Center'} · Cumulative Assessment Progress
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-base sm:text-lg font-extrabold text-[#FF4D4D]">
                  Total Score: {cumulativeTotalScore} / {cumulativeTotalPossible}
                </p>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {cumulativeTotalPossible > 0 ? Math.round((cumulativeTotalScore / cumulativeTotalPossible) * 100) : 0}% Accumulated Total
                </p>
              </div>
            </div>

            {/* Breakdown per section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {Object.entries(effectiveSectionScores).map(([secId, data]) => {
                const secPct = data.total > 0 ? Math.round((data.score / data.total) * 100) : 0;
                return (
                  <div key={secId} className={`p-3 rounded-xl border flex flex-col justify-between ${
                    isDark ? 'bg-[#15070a] border-rose-950/70' : 'bg-rose-50/30 border-rose-100 shadow-xs'
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {data.title || `Section ${secId}`}
                      </span>
                      <span className={`text-xs font-extrabold ${secPct >= 80 ? 'text-emerald-500' : 'text-[#FF4D4D]'}`}>
                        {secPct}%
                      </span>
                    </div>
                    <div className={`text-xs flex items-center justify-between ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>Section {secId}:</span>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.score} / {data.total}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Competency Breakdown */}
        <div className={`mt-6 pt-6 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <h3 className={`text-base sm:text-lg font-bold mb-4 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Award className="w-5 h-5 text-[#FF4D4D]" />
            <span>Competency by Topic</span>
          </h3>

          <div className="space-y-3.5">
            {Object.entries(categoryStats).map(([cat, stat]) => {
              const catPct = Math.round((stat.correct / stat.total) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{cat}</span>
                    <span className={catPct >= 80 ? 'text-emerald-500 font-bold' : 'text-[#FF4D4D] font-bold'}>
                      {stat.correct} / {stat.total} ({catPct}%)
                    </span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden border ${
                    isDark ? 'bg-[#0e1f32] border-slate-800' : 'bg-slate-200 border-slate-300'
                  }`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        catPct >= 80 ? 'bg-emerald-500' : 'bg-gradient-to-r from-red-600 to-rose-500'
                      }`}
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Watermark / Verification Footer for Screen Capture */}
        <div className={`mt-8 pt-4 border-t border-dashed flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] ${
          isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <span className="font-semibold text-rose-600">
            Apex Papers Operations · Official Candidate Score Card
          </span>
          <span>
            Passing Grade: 80% · Verified Assessment Record (Answers Excluded)
          </span>
        </div>
      </div>

      {/* Action Buttons Bar with Screen Capture Button (Exempt from capture) */}
      <div className={`flex flex-wrap items-center gap-3 mb-8 p-4 sm:p-5 rounded-2xl border shadow-lg ${
        isDark ? 'bg-[#120709]/90 border-rose-900/40' : 'bg-white border-rose-100'
      }`}>
        {onGoHome && (
          <button
            id="results-go-home-btn"
            onClick={onGoHome}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border ${
              isDark
                ? 'bg-[#1f0b10] text-rose-300 hover:bg-[#2e1017] border-rose-900/60'
                : 'bg-rose-50 text-red-800 hover:bg-rose-100 border-rose-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Portal Dashboard</span>
          </button>
        )}

        {/* Restart Quiz / Retake Assessment Button */}
        <button
          id="results-restart-quiz-btn"
          onClick={onRetake}
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white font-extrabold text-sm shadow-[0_4px_16px_rgba(225,29,72,0.35)] active:scale-98 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="truncate">Restart Quiz</span>
        </button>

        {missedIds.length > 0 && (
          <button
            id="results-retry-missed-btn"
            onClick={() => onRetryMissed(missedIds)}
            className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl font-bold text-sm border active:scale-98 transition-all cursor-pointer ${
              isDark
                ? 'bg-red-950/80 text-[#FF7A7A] border-red-500/40 hover:bg-red-900/80'
                : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#FF4D4D]" />
            <span className="truncate">Practice Missed ({missedIds.length})</span>
          </button>
        )}

        <button
          id="results-switch-paper-btn"
          onClick={onSwitchPaper}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
            isDark
              ? 'bg-[#180a0e] text-rose-300 hover:bg-[#250e14] border-rose-900/60'
              : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border-rose-200'
          }`}
        >
          <Layers className="w-4 h-4 text-red-400" />
          <span>Choose Paper</span>
        </button>

        {/* Google Drive Export Transcript Button */}
        <button
          id="results-save-drive-btn"
          onClick={handleExportToDrive}
          disabled={isExportingDrive}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border shadow-xs ${
            driveFileLink
              ? 'bg-emerald-600 text-white border-emerald-600'
              : isDark
                ? 'bg-[#1e0a10] text-rose-200 border-rose-800/70 hover:bg-[#2e1017]'
                : 'bg-rose-50 text-red-900 border-rose-300 hover:bg-rose-100'
          }`}
          title="Save official practice exam transcript to your Google Drive"
        >
          {isExportingDrive ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
              <span>Saving to Drive...</span>
            </>
          ) : driveFileLink ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Saved to Drive!</span>
            </>
          ) : (
            <>
              <Cloud className="w-4 h-4 text-red-500" />
              <span>Save to Google Drive</span>
            </>
          )}
        </button>

        {/* Screen Capture / Save as Image Button */}
        <button
          id="results-save-image-btn"
          onClick={handleCaptureScore}
          disabled={isCapturing}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border shadow-xs ${
            captureSuccess
              ? 'bg-emerald-600 text-white border-emerald-600'
              : isDark
                ? 'bg-red-950/80 text-[#FF7A7A] border-red-500/40 hover:bg-red-900/80'
                : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
          }`}
          title="Capture and download an image of your score card (answers excluded)"
        >
          {isCapturing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#FF4D4D]" />
              <span>Saving Image...</span>
            </>
          ) : captureSuccess ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Image Saved!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-[#FF4D4D]" />
              <span>Save as Image</span>
            </>
          )}
        </button>
      </div>

      {/* Google Drive Status Notification Banner */}
      {driveStatusMsg && (
        <div
          className={`mb-6 p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 shadow-md ${
            driveStatusMsg.error
              ? 'bg-red-950/80 border-red-500/50 text-[#FF6B6B]'
              : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Cloud className={`w-5 h-5 shrink-0 ${driveStatusMsg.error ? 'text-red-400' : 'text-emerald-400'}`} />
            <span>{driveStatusMsg.text}</span>
          </div>

          {driveFileLink && (
            <a
              href={driveFileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shrink-0"
            >
              <span>View in Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      {/* Question Review Section with Filter tabs */}
      <div className={`rounded-3xl border shadow-xl p-6 sm:p-8 ${
        isDark ? 'bg-[#120709]/95 border-rose-900/40 text-white' : 'bg-white border-rose-100 text-slate-900 sunlit-card'
      }`}>
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b ${
          isDark ? 'border-rose-950/70' : 'border-rose-100'
        }`}>
          <div>
            <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <FileText className="w-5 h-5 text-[#FF4D4D]" />
              <span>Full Question Review & Official Rationale</span>
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Review every answer with official curriculum references.
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex items-center gap-1.5 p-1 rounded-xl border self-start sm:self-center flex-wrap ${
            isDark ? 'bg-[#050c14] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              id="filter-all-btn"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? isDark ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({total})
            </button>
            <button
              id="filter-incorrect-btn"
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                filter === 'incorrect'
                  ? 'bg-red-600 text-white shadow-xs'
                  : isDark ? 'text-[#FF7A7A] hover:text-white' : 'text-rose-700 hover:text-rose-900'
              }`}
            >
              <span>❌</span>
              <span>Missed ({missedIds.length})</span>
            </button>
            <button
              id="filter-correct-btn"
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isDark ? 'text-emerald-400 hover:text-white' : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <span>✅</span>
              <span>Correct ({correctCount})</span>
            </button>
            {flaggedQuestions.size > 0 && (
              <button
                id="filter-flagged-btn"
                onClick={() => setFilter('flagged')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  filter === 'flagged'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : isDark ? 'text-[#FBBF24] hover:text-white' : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                <span>🚩</span>
                <span>Flagged ({flaggedQuestions.size})</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Review Cards */}
        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const userAnswer = answers[q.id];
            const isCorrect = evaluateQuestionAnswer(userAnswer, q).isCorrect;
            const isFlagged = flaggedQuestions.has(q.id);
            const activeTrans = reviewTranslations[q.id] || null;
            const isDisplayingTrans = (showingTranslatedMap[q.id] ?? true) && !!activeTrans;

            return (
              <div
                key={q.id}
                id={`review-question-${q.id}`}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isCorrect
                    ? isDark
                      ? 'bg-[#101e16] border-emerald-500/30 shadow-xs'
                      : 'bg-emerald-50/40 border-emerald-200 shadow-xs'
                    : isDark
                      ? 'bg-[#150a0f] border-red-500/30 shadow-xs'
                      : 'bg-rose-50/40 border-rose-200 shadow-xs'
                }`}
              >
                {/* Badges and Actions: Header row above question */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isDark ? 'bg-red-950/80 border border-red-500/40 text-[#FF6B6B]' : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      Q{q.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      isDark ? 'bg-red-950/40 border-red-800/50 text-red-400' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      {q.category}
                    </span>
                    {isFlagged && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-bold ${
                        isDark ? 'bg-amber-950/80 border-amber-500/40 text-[#FBBF24]' : 'bg-amber-100 border-amber-200 text-amber-800'
                      }`}>
                        <Bookmark className="w-3 h-3 fill-amber-500 text-amber-500" />
                        Flagged
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <TranslateControl
                      question={q}
                      activeTranslation={activeTrans}
                      onTranslationChange={(res) => {
                        setReviewTranslations((prev) => {
                          const updated = { ...prev };
                          if (res) {
                            updated[q.id] = res;
                          } else {
                            delete updated[q.id];
                          }
                          return updated;
                        });
                      }}
                      chosenLanguage={chosenLanguage}
                      onSelectLanguage={(lang) => {
                        setChosenLanguage(lang);
                        if (lang && typeof window !== 'undefined') {
                          localStorage.setItem('sho_preferred_lang_code', lang.code);
                        }
                      }}
                      isShowingTranslated={showingTranslatedMap[q.id] ?? true}
                      onToggleShowingTranslated={(val) => {
                        setShowingTranslatedMap((prev) => ({ ...prev, [q.id]: val }));
                      }}
                      size="sm"
                    />

                    {isCorrect ? (
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border ${
                        isDark ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                      }`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border ${
                        isDark ? 'bg-red-950 text-[#FF6B6B] border-red-500/40' : 'bg-rose-100 text-rose-700 border-rose-300'
                      }`}>
                        <X className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="mb-4">
                  {activeTrans && (
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-1.5 rounded-full text-[10px] font-bold ${
                      isDark ? 'bg-red-950/80 border border-red-500/40 text-[#FF6B6B]' : 'bg-rose-100 border border-rose-200 text-rose-800'
                    }`}>
                      <Languages className="w-3 h-3 text-[#FF4D4D] shrink-0" />
                      <span>
                        {isDisplayingTrans
                          ? `Translated to ${activeTrans.targetLanguage}`
                          : 'Original (English)'}
                      </span>
                    </div>
                  )}
                  <h4 className={`text-base font-bold leading-snug ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {isDisplayingTrans ? activeTrans.translatedQuestion : q.question}
                  </h4>
                </div>

                {/* Options List */}
                <div className="space-y-2 mb-4">
                  {q.options?.map((opt) => {
                    const isUserChoice = userAnswer === opt.letter;
                    const isRightChoice = opt.letter === q.correctAnswer;
                    const transOpt = isDisplayingTrans ? activeTrans?.translatedOptions?.find(
                      (o) => o.letter.toUpperCase() === opt.letter.toUpperCase()
                    ) : null;
                    const optDisplayText = transOpt ? transOpt.text : opt.text;

                    let optClass = isDark ? 'bg-[#050b13] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800';
                    let letterClass = isDark ? 'bg-slate-900 text-slate-400 border-slate-700' : 'bg-white text-slate-600 border-slate-300';

                    if (isRightChoice) {
                      optClass = isDark
                        ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 font-semibold shadow-[0_0_8px_rgba(16,185,129,0.15)]'
                        : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                      letterClass = 'bg-emerald-600 text-white border-emerald-600';
                    } else if (isUserChoice && !isCorrect) {
                      optClass = isDark
                        ? 'bg-red-950/80 border-red-500/60 text-red-200 line-through opacity-85 shadow-[0_0_8px_rgba(255,77,77,0.15)]'
                        : 'bg-rose-50 border-rose-400 text-rose-900 line-through opacity-85';
                      letterClass = 'bg-red-600 text-white border-red-600';
                    }

                    return (
                      <div
                        key={opt.letter}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm ${optClass}`} style={{ boxSizing: "border-box" }}
                      >
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <span
                            className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 ${letterClass}`}
                          >
                            {opt.letter}
                          </span>
                          <span className="pt-0.5 break-words whitespace-pre-wrap w-full">{optDisplayText}</span>
                        </div>
                        {isRightChoice && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        {isUserChoice && !isCorrect && (
                          <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xs shrink-0">
                            <X className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Rationale */}
                <div className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                  isDark ? 'bg-[#050c14] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <span className="font-bold text-[#FF4D4D] block mb-1">
                    Official Curriculum Rationale:
                  </span>
                  {(isDisplayingTrans && activeTrans?.translatedExplanation) ? activeTrans.translatedExplanation : q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
