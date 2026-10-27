'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  CheckCircle2, 
  Calculator, 
  Send, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  PenTool, 
  FileText, 
  RotateCcw,
  AlertCircle,
  Hash,
  Type as TypeIcon
} from 'lucide-react';
import { Question } from '@/types/quiz';
import { useAppTheme } from '@/lib/theme';
import { MathRenderer } from './MathRenderer';
import { 
  detectQuestionInputType, 
  detectQuestionUnit, 
  evaluateQuestionAnswer, 
  normalizeNumeric 
} from '@/lib/evaluation';

interface DynamicAnswerStudioProps {
  question: Question;
  currentIndex: number;
  selectedAnswer?: string;
  isLocked?: boolean;
  isDisplayingTranslated?: boolean;
  activeTranslation?: any;
  onSelectAnswer: (answer: string) => void;
  onRequestTutor?: () => void;
}

export const DynamicAnswerStudio: React.FC<DynamicAnswerStudioProps> = ({
  question,
  currentIndex,
  selectedAnswer = '',
  isLocked = false,
  isDisplayingTranslated = false,
  activeTranslation = null,
  onSelectAnswer,
  onRequestTutor,
}) => {
  const { isDark } = useAppTheme();
  const inputType = detectQuestionInputType(question);
  const detectedUnit = detectQuestionUnit(question);

  // Local state for interactive text and numeric inputs
  const [localText, setLocalText] = useState<string>(selectedAnswer || '');
  const [stepInputs, setStepInputs] = useState<Record<number, string>>({});
  const [stepStatuses, setStepStatuses] = useState<Record<number, boolean>>({});
  const [showWorkings, setShowWorkings] = useState<boolean>(false);
  const [workingText, setWorkingText] = useState<string>('');
  const [isSavedFeedback, setIsSavedFeedback] = useState<boolean>(false);

  // Sync with incoming selectedAnswer on question change
  useEffect(() => {
    setLocalText(selectedAnswer || '');
    setIsSavedFeedback(false);

    // Initialize step inputs if available
    if (question.steps && question.steps.length > 0) {
      const initialSteps: Record<number, string> = {};
      const initialStatuses: Record<number, boolean> = {};

      question.steps.forEach((step, idx) => {
        // If selectedAnswer matches, populate step
        const savedVal = selectedAnswer || '';
        initialSteps[idx] = savedVal;
        const evalStep = evaluateQuestionAnswer(savedVal, {
          ...question,
          correctAnswer: step.expectedAnswer,
          acceptableAnswers: step.acceptableAnswers,
        });
        initialStatuses[idx] = evalStep.isCorrect;
      });

      setStepInputs(initialSteps);
      setStepStatuses(initialStatuses);
    }
  }, [question, selectedAnswer]);

  const handleTextCommit = (valueToCommit: string) => {
    const trimmed = valueToCommit.trim();
    if (!trimmed) return;
    onSelectAnswer(trimmed);
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);

    // If answer is incorrect and tutor callback exists, prompt guidance
    const evalRes = evaluateQuestionAnswer(trimmed, question);
    if (!evalRes.isCorrect && onRequestTutor) {
      onRequestTutor();
    }
  };

  const handleStepChange = (stepIdx: number, val: string) => {
    const updated = { ...stepInputs, [stepIdx]: val };
    setStepInputs(updated);

    const stepDef = question.steps?.[stepIdx];
    if (stepDef) {
      const evalStep = evaluateQuestionAnswer(val, {
        ...question,
        correctAnswer: stepDef.expectedAnswer,
        acceptableAnswers: stepDef.acceptableAnswers,
      });
      setStepStatuses((prev) => ({ ...prev, [stepIdx]: evalStep.isCorrect }));
    }

    // If this is the last step or single step, commit final answer
    const totalSteps = question.steps?.length || 1;
    if (stepIdx === totalSteps - 1 || totalSteps === 1) {
      onSelectAnswer(val.trim());
    }
  };

  // =========================================================================
  // 1. MULTIPLE CHOICE MODE
  // =========================================================================
  if (inputType === 'multiple-choice' && question.options && question.options.length > 0) {
    return (
      <div className={`mb-6 sm:mb-8 ${isLocked ? 'opacity-75 pointer-events-none select-none' : ''}`} role="radiogroup" aria-label="Answer options">
        <div className="flex items-center justify-between gap-2 px-1 mb-2.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
            <span>KIES DIE REGTE OPSIE / SELECT MULTIPLE CHOICE (A – D)</span>
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            Click an option or press keys 1–4 / A–D
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {question.options.map((option) => {
            const isSelected = String(selectedAnswer).toUpperCase() === String(option.letter).toUpperCase();
            const translatedOptionText = isDisplayingTranslated
              ? activeTranslation?.translatedOptions?.find((o: any) => o.letter === option.letter)?.text || option.text
              : option.text;

            return (
              <button
                key={option.letter}
                id={`option-${option.letter}-${currentIndex + 1}`}
                type="button"
                disabled={isLocked}
                onClick={() => onSelectAnswer(option.letter)}
                className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-200 cursor-pointer text-xs sm:text-sm font-medium group ${
                  isSelected
                    ? isDark
                      ? 'bg-gradient-to-r from-red-950/90 via-[#2c0b13] to-[#1c060b] border-red-500 shadow-md shadow-red-950/60 text-white ring-2 ring-red-500/50 scale-[1.01]'
                      : 'bg-gradient-to-r from-red-50 via-rose-50 to-red-100/60 border-red-500 text-slate-900 shadow-md shadow-rose-900/10 ring-2 ring-red-400/50 scale-[1.01]'
                    : isDark
                    ? 'bg-[#150608]/80 hover:bg-[#200a0e] border-rose-950/70 hover:border-red-600/70 text-slate-200 hover:shadow-xs'
                    : 'bg-white hover:bg-red-50/50 border-rose-200/90 hover:border-red-300 text-slate-800 shadow-xs hover:shadow-sm'
                } ${isLocked ? 'cursor-not-allowed opacity-75' : ''}`}
              >
                {/* Letter Badge */}
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-transform duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-sm scale-105'
                      : isDark
                      ? 'bg-[#250d12] border border-rose-900/60 text-rose-300 group-hover:border-red-500/60 group-hover:text-red-300'
                      : 'bg-rose-100 border border-rose-200 text-rose-800 group-hover:bg-red-100 group-hover:border-red-300 group-hover:text-red-700'
                  }`}
                >
                  {option.letter}
                </span>

                {/* Text */}
                <div className="flex-1 pt-0.5 leading-relaxed font-sans">
                  <MathRenderer text={translatedOptionText} />
                </div>

                {/* Selection Checkmark */}
                <div className="shrink-0 pt-0.5">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-red-500 bg-red-600 text-white shadow-xs'
                        : isDark
                        ? 'border-rose-900/80 bg-transparent group-hover:border-rose-600'
                        : 'border-slate-300 bg-transparent group-hover:border-red-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {onRequestTutor && (
          <div className="mt-2.5 flex items-center justify-between px-1">
            <button
              type="button"
              onClick={onRequestTutor}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-rose-400 hover:text-red-700 dark:hover:text-rose-300 transition-colors cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span>Not sure? Ask AI Tutor for a hint or DBE rubric breakdown</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 2. STEP-BY-STEP CALCULATION MODE
  // =========================================================================
  if (inputType === 'steps' && question.steps && question.steps.length > 0) {
    return (
      <div className={`mb-6 sm:mb-8 space-y-4 ${isLocked ? 'opacity-75 pointer-events-none select-none' : ''}`}>
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-red-500" />
            <span>STAP-VIR-STAP BEREKENING / STEP-BY-STEP WORK STUDIO</span>
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
            Total {question.marks || 2} Marks
          </span>
        </div>

        <div className="space-y-3">
          {question.steps.map((step, idx) => {
            const isCorrect = stepStatuses[idx] || false;
            const currentVal = stepInputs[idx] || '';

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#150608]/90 border-rose-950/80 shadow-xs'
                    : 'bg-white border-rose-200/90 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60">
                      STEP {step.stepNumber || idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-rose-100">
                      {step.title}
                    </span>
                  </div>
                  {step.rubricCode && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                      [{step.rubricCode} · {step.marks}M]
                    </span>
                  )}
                </div>

                {step.instruction && (
                  <p className="text-xs text-slate-600 dark:text-rose-300/80 mb-2 leading-relaxed">
                    {step.instruction}
                  </p>
                )}

                {step.formula && (
                  <div className="mb-2 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-[#1a080c] border border-slate-200 dark:border-rose-950 text-xs font-mono text-slate-700 dark:text-rose-300">
                    <MathRenderer text={step.formula} />
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  {step.unit && (
                    <span className="px-2.5 py-2 rounded-xl text-xs font-bold bg-rose-50 dark:bg-[#250d12] text-red-600 dark:text-red-300 border border-rose-200 dark:border-rose-900/60 shrink-0">
                      {step.unit}
                    </span>
                  )}
                  <input
                    type="text"
                    disabled={isLocked}
                    value={currentVal}
                    onChange={(e) => handleStepChange(idx, e.target.value)}
                    placeholder={step.inputPlaceholder || 'Enter your calculated answer...'}
                    className={`flex-1 p-2.5 rounded-xl border text-xs sm:text-sm font-semibold outline-hidden transition-all ${
                      isDark
                        ? 'bg-[#1a070c] border-rose-900/70 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'bg-white border-rose-200 text-slate-900 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    }`}
                  />
                  {currentVal.trim() && (
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40'
                      }`}
                      title={isCorrect ? 'Step verified with marking guideline' : 'Step recorded'}
                    >
                      {isCorrect ? <Check className="w-4 h-4 stroke-[3]" /> : <Check className="w-3.5 h-3.5" />}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. NUMERIC & CALCULATION SINGLE-STEP MODE
  // =========================================================================
  if (inputType === 'numeric') {
    const isAnswerEvaluated = Boolean(localText && localText.trim());
    const evalResult = evaluateQuestionAnswer(localText, question);

    return (
      <div className={`mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl border transition-all ${
        isDark
          ? 'bg-[#150608]/90 border-rose-950/80 shadow-xs'
          : 'bg-white border-rose-200/90 shadow-xs'
      } ${isLocked ? 'opacity-75 pointer-events-none select-none' : ''}`}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-red-500" />
            <span>BEREKENDE WAARDE / CALCULATED NUMERIC RESPONSE</span>
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            {question.marks || 2} Marks Allocated
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-rose-300/80 mb-3">
          Type your final calculated figure or answer value below. Commas or periods for decimals (e.g. 0,458 or 0.458) are accepted:
        </p>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          {detectedUnit && (
            <span className="px-3 py-2.5 rounded-xl text-xs font-black bg-rose-50 dark:bg-[#250d12] text-red-600 dark:text-red-300 border border-rose-200 dark:border-rose-900/60 shrink-0">
              {detectedUnit}
            </span>
          )}

          <input
            type="text"
            disabled={isLocked}
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleTextCommit(localText);
              }
            }}
            placeholder={detectedUnit ? `e.g. 450 or ${detectedUnit}450...` : 'Enter calculated value...'}
            className={`flex-1 p-3 rounded-xl border text-sm font-bold outline-hidden transition-all ${
              isDark
                ? 'bg-[#1c080e] border-rose-900/70 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'bg-slate-50/60 border-rose-200 text-slate-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:bg-white'
            }`}
          />

          <button
            type="button"
            disabled={isLocked || !localText.trim()}
            onClick={() => handleTextCommit(localText)}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Save</span>
          </button>
        </div>

        {/* Saved confirmation feedback */}
        {isSavedFeedback && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Answer recorded successfully!</span>
          </div>
        )}

        {/* Optional Workings Toggle */}
        <div className="mt-4 pt-3 border-t border-rose-100 dark:border-rose-950/60">
          <button
            type="button"
            onClick={() => setShowWorkings(!showWorkings)}
            className="text-xs font-semibold text-slate-500 dark:text-rose-300/80 hover:text-red-600 flex items-center gap-1.5 cursor-pointer"
          >
            <PenTool className="w-3 h-3 text-red-500" />
            <span>{showWorkings ? 'Hide calculation workings note' : 'Show working steps note (optional)'}</span>
          </button>

          {showWorkings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2"
            >
              <textarea
                rows={2}
                disabled={isLocked}
                value={workingText}
                onChange={(e) => setWorkingText(e.target.value)}
                placeholder="Show your calculation formula and subtraction/division steps here (e.g. 1.258 - 0.80 = 0.458)..."
                className={`w-full p-2.5 rounded-xl border text-xs font-mono outline-hidden ${
                  isDark ? 'bg-[#18070c] border-rose-950 text-rose-200' : 'bg-slate-50 border-rose-100 text-slate-800'
                }`}
              />
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. LONG-TEXT & ESSAY MODE
  // =========================================================================
  if (inputType === 'long-text') {
    const wordCount = (localText.trim().match(/\S+/g) || []).length;

    return (
      <div className={`mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl border transition-all ${
        isDark
          ? 'bg-[#150608]/90 border-rose-950/80 shadow-xs'
          : 'bg-white border-rose-200/90 shadow-xs'
      } ${isLocked ? 'opacity-75 pointer-events-none select-none' : ''}`}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-red-500" />
            <span>UITGEBREIDE ANTWOORD / STRUCTURED ESSAY & EXPLANATION</span>
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            {question.marks || 8} Marks Allocated
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-rose-300/80 mb-3">
          Compose your structured response in full academic paragraphs. Include primary definitions, analytical factors, and conclusion where applicable:
        </p>

        <textarea
          rows={6}
          disabled={isLocked}
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          placeholder="Type your structured explanation, point-by-point arguments, or essay response..."
          className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm font-sans leading-relaxed outline-hidden transition-all ${
            isDark
              ? 'bg-[#1c080e] border-rose-900/70 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'bg-slate-50/60 border-rose-200 text-slate-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:bg-white'
          }`}
        />

        <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400">
            Word count: <strong className="text-red-600 dark:text-rose-400">{wordCount}</strong> words
          </span>

          <button
            type="button"
            disabled={isLocked || !localText.trim()}
            onClick={() => handleTextCommit(localText)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Record Essay Answer</span>
          </button>
        </div>

        {isSavedFeedback && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Response recorded!</span>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 5. SHORT-TEXT / IDENTIFICATION / FILL-IN-THE-BLANK MODE (DEFAULT FALLBACK)
  // =========================================================================
  return (
    <div className={`mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl border transition-all ${
      isDark
        ? 'bg-[#150608]/90 border-rose-950/80 shadow-xs'
        : 'bg-white border-rose-200/90 shadow-xs'
    } ${isLocked ? 'opacity-75 pointer-events-none select-none' : ''}`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400 flex items-center gap-1.5">
          <TypeIcon className="w-3.5 h-3.5 text-red-500" />
          <span>KORT ANTWOORD / SHORT ANSWER RESPONSE</span>
        </span>
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
          {question.marks || 2} Marks
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-rose-300/80 mb-3">
        Write your response, key term, country name, or identification below:
      </p>

      <div className="flex items-center gap-2">
        <input
          type="text"
          disabled={isLocked}
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleTextCommit(localText);
            }
          }}
          placeholder="Type your answer here..."
          className={`flex-1 p-3 rounded-xl border text-xs sm:text-sm font-semibold outline-hidden transition-all ${
            isDark
              ? 'bg-[#1c080e] border-rose-900/70 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'bg-slate-50/60 border-rose-200 text-slate-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:bg-white'
          }`}
        />

        <button
          type="button"
          disabled={isLocked || !localText.trim()}
          onClick={() => handleTextCommit(localText)}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Submit</span>
        </button>
      </div>

      {isSavedFeedback && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Answer recorded!</span>
        </div>
      )}
    </div>
  );
};

export default DynamicAnswerStudio;
