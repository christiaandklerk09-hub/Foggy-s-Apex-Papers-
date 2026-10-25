'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '@/types/quiz';
import { useAppTheme } from '@/lib/theme';
import { MathRenderer } from './MathRenderer';
import { getActiveUserId } from '@/lib/storage';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  PenTool
} from 'lucide-react';

export interface EvaluationResult {
  formula_correct: boolean;
  final_answer_correct: boolean;
  feedback: string;
  marks_awarded: number;
}

export interface MathScratchpadProps {
  question: Question;
  currentIndex?: number;
  savedAnswer?: string;
  onStepComplete?: (stepIndex: number, userValue: string, isCorrect: boolean) => void;
  onAllStepsComplete?: (finalValue: string, totalMarksEarned: number) => void;
  onOpenMathScratchpad?: () => void;
}

async function saveAttemptToFirestore(questionId: number | string, input: string, evaluation: EvaluationResult) {
  try {
    const userId = getActiveUserId();
    if (!userId || !db) return;
    const colRef = collection(db, 'users', userId, 'math_attempts');
    await addDoc(colRef, {
      questionId,
      studentWorking: input,
      evaluation,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Could not save attempt to Firestore:', err);
  }
}

export function MathScratchpad({ 
  question, 
  currentIndex = 0,
  savedAnswer,
  onStepComplete,
  onAllStepsComplete,
  onOpenMathScratchpad 
}: MathScratchpadProps) {
  const { isDark } = useAppTheme();
  const [input, setInput] = useState(savedAnswer || '');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Synchronize and restore saved answer when question changes
  useEffect(() => {
    setInput(savedAnswer || '');
    setEvaluation(null);
    setIsGrading(false);
    setShowModelAnswer(false);
  }, [question.id, savedAnswer]);

  const handleEvaluate = async () => {
    if (!input.trim() || isGrading) return;
    setIsGrading(true);

    try {
      const res = await fetch('/api/evaluate-math', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          studentWorking: input, 
          questionData: {
            id: question.id,
            text: question.question,
            question: question.question,
            rubric_steps: question.steps || question.explanation,
            explanation: question.explanation,
            correctAnswer: question.correctAnswer
          } 
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data: EvaluationResult = await res.json();
      setEvaluation(data);

      // Save attempt to user's Firestore profile
      await saveAttemptToFirestore(question.id, input, data);

      if (onStepComplete) {
        onStepComplete(0, input, data.final_answer_correct);
      }
      if (data.final_answer_correct && onAllStepsComplete) {
        onAllStepsComplete(input, data.marks_awarded);
      }
    } catch (err) {
      console.error('Failed to evaluate math working:', err);
      setEvaluation({
        formula_correct: false,
        final_answer_correct: false,
        feedback: 'Unable to connect to evaluation engine. Please check your network or calculations.',
        marks_awarded: 0
      });
    } finally {
      setIsGrading(false);
    }
  };

  // Convert raw user input to styled mathematical preview string
  const previewMathString = useMemo(() => {
    if (!input.trim()) return '';
    return input
      .replace(/\*/g, ' × ')
      .replace(/\//g, ' ÷ ')
      .replace(/<=\s*/g, ' ≤ ')
      .replace(/>=\s*/g, ' ≥ ');
  }, [input]);

  return (
    <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 border shadow-sm transition-all relative overflow-hidden ${
      isDark 
        ? 'bg-[#150609] border-rose-900/60 shadow-[0_8px_24px_rgba(0,0,0,0.4)] text-white' 
        : 'bg-white border-rose-200/90 shadow-[0_8px_24px_rgba(244,63,94,0.05)] text-slate-900'
    }`}>
      {/* Decorative Light Red Gradient Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-400 to-rose-600" />

      {/* Header with Marks and Quick Actions */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1.5 shadow-xs">
              <PenTool className="w-3 h-3 text-red-600 dark:text-rose-400" />
              <span>Working &amp; Answer</span>
            </span>
            <span className="text-xs font-bold text-red-600 dark:text-rose-400">
              {question.marks ? `${question.marks} Marks` : '2 Marks'}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-bold mt-1 text-slate-700 dark:text-rose-200">
            Write your formula, calculation steps &amp; final answer:
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Live Preview Toggle */}
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 transition-all cursor-pointer"
            title="Toggle Formula Preview"
          >
            {showLivePreview ? <EyeOff className="w-3.5 h-3.5 text-red-600" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">Preview</span>
          </button>

          {/* Clear Button */}
          {input && (
            <button
              type="button"
              onClick={() => {
                setInput('');
                setEvaluation(null);
                if (onStepComplete) {
                  onStepComplete(0, '', false);
                }
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-900/60 text-slate-500 hover:text-red-600 dark:text-rose-400/80 transition-all cursor-pointer"
              title="Clear text"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Free-Form Answer Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          rows={3}
          className={`w-full rounded-xl sm:rounded-2xl p-3.5 border font-mono text-xs sm:text-sm leading-relaxed focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none resize-y transition-all shadow-inner ${
            isDark 
              ? 'bg-[#0f0406] text-white border-rose-950 placeholder-slate-600'
              : 'bg-rose-50/20 text-slate-900 border-rose-200 placeholder-slate-400'
          }`}
          placeholder="e.g. $1,258 - $0,80 = $0,458"
          value={input}
          onChange={(e) => {
            const newVal = e.target.value;
            setInput(newVal);
            if (evaluation) setEvaluation(null);
            if (onStepComplete) {
              onStepComplete(0, newVal, false);
            }
          }}
          disabled={isGrading}
        />
      </div>

      {/* Live Formatted Mathematical Preview */}
      <AnimatePresence>
        {showLivePreview && previewMathString && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-2 p-2.5 rounded-xl border transition-all ${
              isDark ? 'bg-[#150608] border-rose-950 text-rose-100' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
              Notation Preview
            </div>
            <div className="font-mono text-xs font-bold tracking-tight overflow-x-auto py-0.5">
              <MathRenderer text={previewMathString} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Evaluation Action Button */}
      <button
        type="button"
        onClick={handleEvaluate}
        disabled={isGrading || !input.trim()}
        className="w-full mt-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-2.5 sm:py-3 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide"
      >
        {isGrading ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
            <span>Checking Answer...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Check Answer &amp; Working</span>
          </>
        )}
      </button>

      {/* Revealed Evaluation Results & AI Marking */}
      <AnimatePresence>
        {evaluation && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`mt-3 p-3.5 rounded-xl border overflow-hidden ${
              evaluation.final_answer_correct 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-100' 
                : evaluation.formula_correct
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-100'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-100'
            }`}
          >
            <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-xs flex items-center gap-1">
                  Formula: {evaluation.formula_correct ? (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-extrabold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-rose-600 dark:text-rose-400 font-extrabold">
                      <XCircle className="w-3.5 h-3.5" /> Check
                    </span>
                  )}
                </span>
                <span className="font-bold text-xs flex items-center gap-1">
                  Answer: {evaluation.final_answer_correct ? (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-extrabold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-rose-600 dark:text-rose-400 font-extrabold">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black shadow-xs ${
                evaluation.marks_awarded > 0 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-700 text-slate-200'
              }`}>
                +{evaluation.marks_awarded} {evaluation.marks_awarded === 1 ? 'Mark' : 'Marks'}
              </span>
            </div>

            <div className="text-xs leading-relaxed opacity-95 pt-2 border-t border-black/10 dark:border-white/10">
              <MathRenderer text={evaluation.feedback} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Official Exam Marking Memo & Solution Accordion */}
      {question.explanation && (
        <div className={`mt-3 pt-2.5 border-t text-xs ${
          isDark ? 'border-rose-950/70' : 'border-rose-100'
        }`}>
          <button
            type="button"
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="w-full flex items-center justify-between font-bold text-slate-600 dark:text-rose-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-red-500" />
              <span>Official Examination Memo &amp; Model Answer</span>
            </div>
            {showModelAnswer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence>
            {showModelAnswer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 pt-2 border-t border-rose-200/60 dark:border-rose-950"
              >
                <div className={`p-3 rounded-xl font-mono text-xs leading-relaxed ${
                  isDark ? 'bg-[#0f0406] text-rose-100 border border-rose-950' : 'bg-rose-50/70 text-slate-800 border border-rose-200'
                }`}>
                  <MathRenderer text={question.explanation} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export { MathScratchpad as StepByStepWorkStudio };
export default MathScratchpad;
