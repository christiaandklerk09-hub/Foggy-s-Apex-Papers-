'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Lock,
  Languages,
  Edit3,
  FastForward,
  Layers,
  CheckCircle2,
  Check,
  ShieldCheck,
  Calculator,
  BarChart3,
  TrendingUp,
  Briefcase,
  BookOpen,
  FileText
} from 'lucide-react';
import { MathRenderer } from './MathRenderer';
import { AnnexureModal } from './AnnexureModal';
import { Question } from '@/lib/quiz-data';
import { TranslateControl } from './TranslateControl';
import { TranslationResult, SUPPORTED_LANGUAGES, SupportedLanguage, fetchQuestionTranslation } from '@/lib/translate';
import { AdminEditQuestionModal } from './AdminEditQuestionModal';
import { getSmartQuestionBlocks, findBlockForQuestionIndex } from '@/lib/pagination';
import { useAppTheme } from '@/lib/theme';
import { TutorFeedback } from './TutorFeedback';
import { QuestionVisualAsset } from './QuestionVisualAsset';
import { StepByStepWorkStudio } from './StepByStepWorkStudio';
import { AccountingSpecialAnswerBook } from './AccountingSpecialAnswerBook';
import { BusinessStudiesAnswerBook } from './BusinessStudiesAnswerBook';
import { EconomicsAnswerStudio } from './EconomicsAnswerStudio';
import { EconomicsAnnexureViewer } from './EconomicsAnnexureViewer';
import { EnglishAnswerStudio } from './EnglishAnswerStudio';
import { AfrikaansAnswerStudio } from './AfrikaansAnswerStudio';
import { MathAnnexureViewer } from './MathAnnexureViewer';
import { DynamicAnswerStudio } from './DynamicAnswerStudio';
import { evaluateQuestionAnswer } from '@/lib/evaluation';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  allQuestions?: Question[];
  paperId?: string;
  selectedAnswer?: string;
  isFlagged: boolean;
  isAdmin?: boolean;
  activeSection?: number;
  completedSections?: number[];
  onCompleteSection?: (sectionId: number, score: number, total: number, nextStartIndex?: number) => void;
  onSelectOption: (answer: string) => void;
  onToggleFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmitQuiz: () => void;
  onAdminSkipToEnd?: () => void;
  onQuestionUpdated?: (updated: Question) => void;
  onQuestionDeleted?: (questionId: number) => void;
  onJumpToQuestion?: (index: number) => void;
  canSubmit: boolean;
  answeredCount: number;
  requiredSubmitCount: number;
  canSkip?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  allQuestions = [],
  paperId = 'ch9_emergency_care_1',
  selectedAnswer,
  isFlagged,
  isAdmin = false,
  canSkip = false,
  activeSection = 1,
  completedSections = [],
  onCompleteSection,
  onSelectOption,
  onToggleFlag,
  onPrev,
  onNext,
  onSubmitQuiz,
  onAdminSkipToEnd,
  onQuestionUpdated,
  onQuestionDeleted,
  onJumpToQuestion,
  canSubmit,
  answeredCount,
  requiredSubmitCount,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  // AI Tutor slide-out state
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);

  // Check if current answer is incorrect using universal dynamic evaluation
  const isAnswerIncorrect = Boolean(
    selectedAnswer && 
    !evaluateQuestionAnswer(selectedAnswer, question).isCorrect
  );

  useEffect(() => {
    if (isAnswerIncorrect) {
      console.log('AI Tutor should be opening. isAnswerIncorrect:', isAnswerIncorrect);
      setIsAiTutorOpen(true);
    } else {
      setIsAiTutorOpen(false);
    }
  }, [isAnswerIncorrect, selectedAnswer, question.id]);

  // Admin question edit modal state (Requirement 2)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAnnexureModal, setShowAnnexureModal] = useState(false);

  // Smart Pagination Blocks (Requirement 7)
  const blocks = React.useMemo(() => {
    return allQuestions.length > 0 
      ? getSmartQuestionBlocks(allQuestions) 
      : [];
  }, [allQuestions]);

  const activeBlock = React.useMemo(() => {
    return findBlockForQuestionIndex(blocks, currentIndex);
  }, [blocks, currentIndex]);

  const currentSectionId = activeBlock?.blockNumber || 1;
  const isSectionLocked = completedSections.includes(currentSectionId);


  // Track user-chosen language across the quiz session (initialized deterministically to prevent hydration mismatch)
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

  // Track toggle state: true = showing translated language, false = showing English
  const [isShowingTranslated, setIsShowingTranslated] = useState<boolean>(true);

  // Track translations per question so navigation retains translated versions
  const [translations, setTranslations] = useState<Record<number, TranslationResult>>({});

  const activeTranslation = translations[question.id] || null;
  const isDisplayingTranslated = isShowingTranslated && !!activeTranslation;

  const currentQId = question.id;
  const hasCurrentTranslation = !!translations[currentQId];
  const chosenLangCode = chosenLanguage?.code;
  const chosenLangName = chosenLanguage?.name;

  // Auto-fetch translation for current question if user has selected a language and has toggle on
  useEffect(() => {
    if (chosenLangName && isShowingTranslated && !hasCurrentTranslation) {
      let isCancelled = false;
      fetchQuestionTranslation(
        currentQId,
        question.question,
        question.options || [],
        chosenLangName,
        question.explanation
      )
        .then((res) => {
          if (!isCancelled && res) {
            setTranslations((prev) => ({ ...prev, [currentQId]: res }));
          }
        })
        .catch((err) => {
          console.warn('Auto translation prefetch warning:', err);
        });

      return () => {
        isCancelled = true;
      };
    }
  }, [currentQId, question.question, question.options, question.explanation, chosenLangCode, chosenLangName, isShowingTranslated, hasCurrentTranslation]);

  const handleTranslationChange = (result: TranslationResult | null) => {
    setTranslations((prev) => {
      const updated = { ...prev };
      if (result) {
        updated[question.id] = result;
      } else {
        delete updated[question.id];
      }
      return updated;
    });
  };

  const handleSelectLanguage = (lang: SupportedLanguage | null) => {
    setChosenLanguage(lang);
    if (lang) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('sho_preferred_lang_code', lang.code);
      }
      setIsShowingTranslated(true);
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sho_preferred_lang_code');
      }
      setIsShowingTranslated(false);
    }
  };

  const { isDark } = useAppTheme();

  const isLightRedTopic = true; // All academic topics feature signature light red accents

  return (
    <div className="w-full max-w-3xl mx-auto scroll-mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`rounded-2xl sm:rounded-3xl border shadow-xl p-4 sm:p-7 sm:p-8 relative overflow-hidden question-card-container transition-colors ${
            isDark
              ? 'bg-gradient-to-b from-[#18080c] via-[#120508] to-[#0c0305] border-rose-900/60 shadow-[0_8px_32px_rgba(244,63,94,0.12)] text-white'
              : 'bg-gradient-to-b from-white via-rose-50/25 to-red-50/20 border-rose-200/90 text-slate-900 shadow-[0_8px_30px_rgba(244,63,94,0.08)] sunlit-card'
          }`}
          style={{ boxSizing: 'border-box' }}
        >
          {/* Top Topic Accent Bar: Radiant Light Red Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-rose-600" />

          {/* Question Meta Badges & Top Controls (Above Question) */}
          <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5 pt-1">
            {/* Left: Question Number and Category */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
              {/* Question Number Pill */}
              <span 
                id="question-number-badge"
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl text-[11px] sm:text-xs font-black tracking-tight uppercase flex items-center gap-1.5 shadow-xs shrink-0 ${
                  isDark
                    ? 'bg-red-950/80 border border-red-500/40 text-[#FF6B6B]'
                    : 'bg-rose-50 border border-rose-200 text-red-600'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D] shadow-[0_0_6px_#FF4D4D]"></span>
                Q{currentIndex + 1} of {totalQuestions}
              </span>

              {/* Category Pill */}
              <span 
                id="question-category-badge"
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl text-[11px] sm:text-xs font-semibold truncate max-w-[140px] xs:max-w-[190px] sm:max-w-xs border ${
                  isDark
                    ? 'bg-red-950/70 border-red-800/60 text-red-300'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {question.category}
              </span>

              {/* Topic Ribbon Indicator */}
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xl text-[10px] font-extrabold uppercase shrink-0 border bg-red-100/90 text-red-700 border-red-300 dark:bg-red-950/90 dark:text-red-300 dark:border-red-800">
                {question.subjectId === 'accounting' || (paperId && paperId.includes('accounting')) || (question.paperId && question.paperId.includes('accounting')) ? (
                  <Calculator className="w-3 h-3 text-red-600 dark:text-red-400" />
                ) : question.subjectId === 'maths_literacy' || (paperId && paperId.includes('mathlit')) ? (
                  <Calculator className="w-3 h-3 text-red-600 dark:text-red-400" />
                ) : question.subjectId === 'economics' || (paperId && paperId.includes('econ')) ? (
                  <TrendingUp className="w-3 h-3 text-red-600 dark:text-red-400" />
                ) : question.subjectId === 'business_studies' || (paperId && paperId.includes('business')) ? (
                  <Briefcase className="w-3 h-3 text-red-600 dark:text-red-400" />
                ) : question.subjectId === 'english_hg' || (paperId && paperId.includes('eng')) ? (
                  <BookOpen className="w-3 h-3 text-red-600 dark:text-red-400" />
                ) : (
                  <Sparkles className="w-3 h-3 text-red-600 dark:text-red-400" />
                )}
                <span>{
                  question.paperId === 'accounting-mcq-test-1'
                    ? 'Grade 12 · ACCOUNTING MCQ TEST 1'
                    : question.paperId === 'accounting-mcq-test-2'
                    ? 'Grade 12 · ACCOUNTING MCQ TEST 2'
                    : question.paperId === 'maths-literacy-mcq-test-1'
                    ? 'Grade 12 · MATHEMATICAL LITERACY MCQ TEST 1'
                    : question.paperId === 'maths-literacy-mcq-test-2'
                    ? 'Grade 12 · MATHEMATICAL LITERACY MCQ TEST 2'
                    : question.paperId === 'economics-mcq-test-1'
                    ? 'Grade 12 · ECONOMICS MCQ TEST 1'
                    : question.paperId === 'economics-mcq-test-2'
                    ? 'Grade 12 · ECONOMICS MCQ TEST 2'
                    : question.paperId === 'business-studies-mcq-test-1'
                    ? 'Grade 12 · BUSINESS STUDIES MCQ TEST 1'
                    : question.paperId === 'business-studies-mcq-test-2'
                    ? 'Grade 12 · BUSINESS STUDIES MCQ TEST 2'
                    : question.paperId === 'afrikaans-mcq-test-1'
                    ? 'Graad 12 · AFRIKAANS MCQ TOETS 1'
                    : question.paperId === 'afrikaans-mcq-test-2'
                    ? 'Graad 12 · AFRIKAANS MCQ TOETS 2'
                    : question.paperId === 'english-mcq-test-1'
                    ? 'Grade 12 · ENGLISH HL MCQ TEST 1'
                    : question.paperId === 'english-mcq-test-2'
                    ? 'Grade 12 · ENGLISH HL MCQ TEST 2'
                    : question.subjectId === 'economics' || (paperId && paperId.includes('econ')) 
                    ? 'Grade 12 · ECONOMICS P1' 
                    : question.subjectId === 'english_hg' || (paperId && paperId.includes('eng'))
                    ? 'Grade 12 · ENGLISH FAL P1'
                    : question.subjectId === 'afrikaans_fal' || (paperId && paperId.includes('afr'))
                    ? 'Graad 12 · AFRIKAANS TAT V1'
                    : question.subjectId === 'maths_literacy' || (paperId && paperId.includes('mathlit'))
                    ? 'Grade 12 · MATHEMATICAL LITERACY P1'
                    : question.subjectId === 'business_studies' || (paperId && paperId.includes('business'))
                    ? 'Grade 12 · BUSINESS STUDIES P1'
                    : question.subjectId === 'accounting' || (paperId && paperId.includes('accounting'))
                    ? 'Grade 12 · ACCOUNTING P1'
                    : `Grade 12 · ${String((question as any).subjectId || 'Matric Prep').toUpperCase().replace('_', ' ')}`
                }</span>
              </span>
            </div>

            {/* Top Right Controls: Consistent Toolbar (Math Pad, Admin Edit, Translate, Flag) */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">


              {/* Official DBE Annexures / Addendum Modal Trigger */}
              {(question.subjectId === 'maths_literacy' || (question.category && question.category.toLowerCase().includes('math')) || (paperId && (paperId.includes('mathlit') || paperId.includes('maths-literacy')))) && (
                <button
                  id={`annexure-btn-${currentIndex + 1}`}
                  onClick={() => setShowAnnexureModal(true)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    isDark
                      ? 'bg-[#240c12] border-red-900/80 text-rose-300 hover:bg-[#34111a] hover:border-red-500'
                      : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300'
                  }`}
                  title="View Official DBE NSC Exam Addendum & Annexures"
                  aria-label="View Annexures"
                >
                  <FileText className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  <span className="hidden xs:inline">Addendum</span>
                </button>
              )}

              {/* Admin Inline Q&A Edit Trigger Button */}
              {isAdmin && (
                <button
                  id={`admin-edit-q-btn-${question.id}`}
                  onClick={() => setIsEditModalOpen(true)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                    isDark
                      ? 'bg-amber-950/80 text-[#FBBF24] border-amber-500/40 hover:bg-amber-900'
                      : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  }`}
                  title="Admin: Edit question prompt, choices, or rationale"
                  aria-label="Edit question"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#FBBF24]" />
                </button>
              )}

              {/* Translation Toggle Control */}
              <TranslateControl
                question={question}
                activeTranslation={activeTranslation}
                onTranslationChange={handleTranslationChange}
                chosenLanguage={chosenLanguage}
                onSelectLanguage={handleSelectLanguage}
                isShowingTranslated={isShowingTranslated}
                onToggleShowingTranslated={setIsShowingTranslated}
                size="sm"
              />

              {/* Flag Question Button */}
              <button
                id={`flag-question-btn-${currentIndex + 1}`}
                onClick={onToggleFlag}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                  isFlagged
                    ? isDark
                      ? 'bg-amber-950/80 text-[#FBBF24] border-amber-500/40'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                    : isDark
                      ? 'bg-[#16080b] text-rose-300 border-rose-950/60 hover:border-rose-700/60 hover:text-rose-100'
                      : 'bg-rose-50/60 text-slate-700 border-rose-200/80 hover:border-rose-300 hover:text-slate-900'
                }`}
                title={isFlagged ? "Flagged (click to unflag)" : "Flag this question to review later"}
                aria-label="Flag Question"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 transition-colors ${
                    isFlagged ? 'fill-[#FBBF24] text-[#FBBF24]' : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Section Lock & UI Guard Notice */}
          {isSectionLocked && (
            <div className={`p-3 text-sm font-semibold mb-4 rounded-xl flex items-center gap-2 shadow-xs border ${
              isDark
                ? 'bg-amber-950/80 border-amber-500/40 text-[#FBBF24]'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <Lock className="w-4 h-4 text-[#FBBF24] shrink-0" />
              <span>This section has been submitted and locked.</span>
            </div>
          )}

          {/* Question Text Area */}
          <div className={`mb-5 sm:mb-6 p-4 sm:p-5 rounded-2xl border transition-all ${
            isDark
              ? 'bg-[#1a070c]/80 border-rose-950/80 shadow-inner'
              : 'bg-gradient-to-r from-red-50/70 via-rose-50/40 to-white/95 border-red-200/80 shadow-xs'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400">
                VRAAG / QUESTION PROMPT
              </span>
            </div>
            {chosenLanguage && (
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-2 rounded-full text-[11px] font-bold ${
                isDark
                  ? 'bg-red-950/80 border border-red-500/40 text-[#FF6B6B]'
                  : 'bg-rose-50 border border-rose-200 text-rose-700'
              }`}>
                <Languages className="w-3.5 h-3.5 text-[#FF4D4D] shrink-0" />
                <span>
                  {isDisplayingTranslated
                    ? `Viewing in ${activeTranslation?.targetLanguage || chosenLanguage.name}`
                    : `Viewing Original (English)`}
                </span>
                <span className={`text-[10px] font-normal ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isDisplayingTranslated
                    ? '· Click EN toggle above to view English'
                    : `· Click ${chosenLanguage.name} toggle above to view translation`}
                </span>
              </div>
            )}

            <div className="flex items-start justify-between gap-3">
              <h2 
                id={`question-title-${currentIndex + 1}`}
                className={`text-lg sm:text-2xl font-bold leading-snug tracking-tight flex-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <MathRenderer text={isDisplayingTranslated ? activeTranslation.translatedQuestion : question.question} />
              </h2>
            </div>
          </div>

          {/* On-Screen Interactive Graph / Visual Asset (Only for non-Math subjects; Math Lit uses dedicated MathAnnexureViewer) */}
          {question.subjectId !== 'maths_literacy' && !paperId?.includes('mathlit') && !paperId?.includes('maths-literacy') && (
            <QuestionVisualAsset question={question} currentIndex={currentIndex} />
          )}

          {/* Specialized NSC Multi-Column Ledger Formats (for custom accounting exercises 101, 102, 103) */}
          {(question.subjectId === 'accounting' && [101, 102, 103].includes(question.id)) && (
            <AccountingSpecialAnswerBook 
              question={question} 
              currentIndex={currentIndex} 
              onAnswerCorrect={() => onSelectOption(String(question.correctAnswer))}
            />
          )}

          {/* Official South African NSC Annexures for Economics (Tables, Extracts, Graphs, Cartoons) */}
          {(question.subjectId === 'economics' || (question.category && question.category.toLowerCase().includes('economic')) || (paperId && paperId.includes('econ'))) && (
            <EconomicsAnnexureViewer 
              question={question} 
              currentIndex={currentIndex} 
            />
          )}

          {/* Official South African NSC Annexures for Mathematical Literacy (Annexure A, B, C) */}
          {(question.subjectId === 'maths_literacy' || (question.category && question.category.toLowerCase().includes('math')) || (paperId && paperId.includes('mathlit')) || (paperId && paperId.includes('maths-literacy'))) && (
            <MathAnnexureViewer 
              question={question} 
              currentIndex={currentIndex} 
            />
          )}

          {/* Universal Dynamic Answer Studio: Adapts dynamically based on the question itself (Multiple Choice, Steps, Numeric, Short Text, or Essay) */}
          {(!([101, 102, 103].includes(question.id) && question.subjectId === 'accounting')) && (
            <DynamicAnswerStudio
              question={question}
              currentIndex={currentIndex}
              selectedAnswer={selectedAnswer}
              isLocked={isSectionLocked}
              isDisplayingTranslated={isDisplayingTranslated}
              activeTranslation={activeTranslation}
              onSelectAnswer={(ans) => onSelectOption(ans)}
              onRequestTutor={() => setIsAiTutorOpen(true)}
            />
          )}

          {/* AI Tutor Slide-out Guidance */}
          {isAiTutorOpen && isAnswerIncorrect && (
            <TutorFeedback
              question={question.question}
              userAnswer={String(selectedAnswer)}
              correctAnswer={String(question.correctAnswer)}
              explanation={question.explanation || 'Refer to official DBE marking guidelines.'}
              onClose={() => setIsAiTutorOpen(false)}
            />
          )}
          
          {question.question.toLowerCase().includes('annexure') && (
            <button
              onClick={() => setShowAnnexureModal(true)}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 rounded-xl font-bold text-xs hover:bg-rose-200 dark:hover:bg-rose-900 transition-colors"
            >
              <FileText className="w-4 h-4" />
              View Annexure
            </button>
          )}

          <AnnexureModal
            isOpen={showAnnexureModal}
            onClose={() => setShowAnnexureModal(false)}
            initialAnnexureId="annexure_a"
          />

          {/* Bottom Card Navigation & Controls */}
          <div className={`pt-4 border-t flex items-center justify-between gap-2 sm:gap-3 flex-wrap ${
            isDark ? 'border-slate-800/80' : 'border-slate-200'
          }`}>
            {/* Previous Button */}
            <button
              id="quiz-prev-btn"
              onClick={onPrev}
              disabled={isFirst}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isFirst
                  ? isDark
                    ? 'bg-slate-900/40 text-slate-600 border-slate-800/50 cursor-not-allowed'
                    : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : isDark
                    ? 'bg-[#180a0e] text-rose-300 border-rose-900/50 hover:bg-[#250e14] hover:text-rose-200 cursor-pointer shadow-xs'
                    : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 hover:text-rose-900 cursor-pointer shadow-xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Middle Controls: Section Lock & Admin Skip */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Submit & Lock Section Button at end of block */}
              {activeBlock && currentIndex === activeBlock.endIndex && !isSectionLocked && onCompleteSection && !isLast && (
                <button
                  id={`submit-lock-section-btn-${currentSectionId}`}
                  onClick={() => {
                    const blockQuestions = activeBlock.questions;
                    onCompleteSection(currentSectionId, 0, blockQuestions.length, activeBlock.endIndex + 1);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white border border-amber-700 shadow-sm transition-all cursor-pointer"
                  title={`Submit Section ${currentSectionId} and lock answers`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Section {currentSectionId}</span>
                </button>
              )}

              {/* Admin Skip to End Shortcut */}
              {canSkip && onAdminSkipToEnd && (
                <button
                  id="admin-skip-to-end-btn"
                  onClick={onAdminSkipToEnd}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-400 shadow-sm transition-all cursor-pointer"
                  title="Admin Shortcut: Instantly complete remaining questions and view score breakdown"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Skip to End</span>
                </button>
              )}
            </div>

            {/* Next / Submit Button with Light Red Lifeguard Glow */}
            {isLast ? (
              canSubmit ? (
                <button
                  id="quiz-submit-btn"
                  onClick={onSubmitQuiz}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-red-600 to-rose-500 text-white hover:from-red-700 hover:to-rose-600 shadow-[0_4px_20px_rgba(225,29,72,0.35)] active:scale-98 transition-all cursor-pointer"
                >
                  <span>FINISH QUIZ</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="quiz-submit-btn-locked"
                  disabled
                  className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border cursor-not-allowed ${
                    isDark
                      ? 'bg-slate-900 text-slate-500 border-slate-800'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                  title={`Answer at least ${requiredSubmitCount} questions to submit (${answeredCount}/${requiredSubmitCount} answered)`}
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>SUBMIT ({answeredCount}/{requiredSubmitCount})</span>
                </button>
              )
            ) : (
              <button
                id="quiz-next-btn"
                onClick={onNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-red-600 to-rose-500 text-white hover:from-red-700 hover:to-rose-600 shadow-[0_4px_18px_rgba(225,29,72,0.35)] active:scale-98 transition-all cursor-pointer"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Locked Notice on Last Question if not enough answered */}
          {isLast && !canSubmit && (
            <div className={`mt-3.5 p-3 rounded-xl border text-xs flex items-center gap-2 ${
              isDark
                ? 'bg-amber-950/80 border-amber-500/40 text-[#FBBF24]'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <Lock className="w-4 h-4 text-[#FBBF24] shrink-0" />
              <span>
                You must answer at least <strong>{requiredSubmitCount} questions</strong> before submitting ({requiredSubmitCount - answeredCount} more required).
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Admin Inline Q&A Editing Modal (Requirement 2) */}
      {isAdmin && (
        <AdminEditQuestionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          question={question}
          paperId={paperId}
          onSave={(updated) => {
            if (onQuestionUpdated) {
              onQuestionUpdated(updated);
            }
          }}
          onDelete={(deletedId) => {
            if (onQuestionDeleted) {
              onQuestionDeleted(deletedId);
            }
          }}
        />
      )}

      {/* Official Exam Addendum Modal */}
      <AnnexureModal
        isOpen={showAnnexureModal}
        onClose={() => setShowAnnexureModal(false)}
        initialAnnexureId={
          question.id >= 722 && question.id <= 726 ? 'annexure_a' :
          question.id >= 734 && question.id <= 736 ? 'annexure_b' :
          question.id >= 744 && question.id <= 747 ? 'annexure_c' :
          question.id >= 701 && question.id <= 705 ? 'table_1' :
          question.id >= 706 && question.id <= 710 ? 'graph_1_2' :
          question.id >= 716 && question.id <= 721 ? 'table_2' :
          question.id >= 748 && question.id <= 751 ? 'table_7_8' : 'annexure_a'
        }
      />
    </div>
  );
};
