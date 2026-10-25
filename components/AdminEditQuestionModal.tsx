'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, AlertCircle, CheckCircle2, ShieldCheck, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { Question, QuizPaper } from '@/lib/quiz-data';
import { saveEditedQuestion, deleteQuestionPermanently } from '@/lib/custom-questions';
import { useAppTheme } from '@/lib/theme';

interface AdminEditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question?: Question | null;
  paperId: string;
  isNew?: boolean;
  availablePapers?: QuizPaper[];
  nextSuggestedId?: number;
  onSave?: (updated: Question) => Promise<void> | void;
  onSaveQuestion?: (updated: Question) => Promise<void> | void;
  onDelete?: (questionId: number) => Promise<void> | void;
  onDeleteQuestion?: (questionId: number) => Promise<void> | void;
}

interface InnerFormProps {
  question?: Question | null;
  paperId: string;
  isNew?: boolean;
  availablePapers?: QuizPaper[];
  nextSuggestedId?: number;
  onClose: () => void;
  onSave?: (updated: Question) => Promise<void> | void;
  onSaveQuestion?: (updated: Question) => Promise<void> | void;
  onDelete?: (questionId: number) => Promise<void> | void;
  onDeleteQuestion?: (questionId: number) => Promise<void> | void;
}

const AdminEditQuestionForm: React.FC<InnerFormProps> = ({
  question,
  paperId: initialPaperId,
  isNew = false,
  availablePapers = [],
  nextSuggestedId,
  onClose,
  onSave,
  onSaveQuestion,
  onDelete,
  onDeleteQuestion,
}) => {
  const { isDark } = useAppTheme();
  const initialType: 'multiple-choice' | 'numeric' | 'text' =
    question?.type === 'numeric'
      ? 'numeric'
      : question?.type === 'text'
      ? 'text'
      : (question?.options && question.options.length > 0)
      ? 'multiple-choice'
      : (question?.correctAnswer && !['A', 'B', 'C', 'D'].includes(question.correctAnswer.trim()))
      ? 'numeric'
      : 'multiple-choice';

  const [questionType, setQuestionType] = useState<'multiple-choice' | 'numeric' | 'text'>(initialType);
  const [selectedPaperId, setSelectedPaperId] = useState(initialPaperId);
  const [questionIdNumber, setQuestionIdNumber] = useState<number>(
    question?.id || nextSuggestedId || 51
  );
  const [questionText, setQuestionText] = useState(question?.question || '');
  const [category, setCategory] = useState(question?.category || '');
  const [optionA, setOptionA] = useState(question?.options?.find((o) => o.letter === 'A')?.text || '');
  const [optionB, setOptionB] = useState(question?.options?.find((o) => o.letter === 'B')?.text || '');
  const [optionC, setOptionC] = useState(question?.options?.find((o) => o.letter === 'C')?.text || '');
  const [optionD, setOptionD] = useState(question?.options?.find((o) => o.letter === 'D')?.text || '');
  const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D'>((question?.correctAnswer as 'A' | 'B' | 'C' | 'D') || 'A');
  const [directAnswer, setDirectAnswer] = useState(
    question?.correctAnswer && !['A', 'B', 'C', 'D'].includes(question.correctAnswer.trim())
      ? question.correctAnswer
      : ''
  );
  const [acceptableAnswersStr, setAcceptableAnswersStr] = useState(
    question?.acceptableAnswers ? question.acceptableAnswers.join(', ') : ''
  );
  const [unit, setUnit] = useState(question?.unit || '');
  const [marks, setMarks] = useState<number>(question?.marks || 2);
  const [explanation, setExplanation] = useState(question?.explanation || '');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!questionText.trim()) {
      setError('Question prompt cannot be empty.');
      return;
    }

    let finalCorrectAnswer = '';
    let finalOptions: { letter: string; text: string }[] | undefined = undefined;

    if (questionType === 'multiple-choice') {
      if (!optionA.trim() || !optionB.trim() || !optionC.trim() || !optionD.trim()) {
        setError('All four options (A, B, C, D) must have text for multiple choice questions.');
        return;
      }
      finalCorrectAnswer = correctAnswer;
      finalOptions = [
        { letter: 'A', text: optionA.trim() },
        { letter: 'B', text: optionB.trim() },
        { letter: 'C', text: optionC.trim() },
        { letter: 'D', text: optionD.trim() },
      ];
    } else {
      if (!directAnswer.trim()) {
        setError('Please enter the expected correct answer for this question.');
        return;
      }
      finalCorrectAnswer = directAnswer.trim();
    }

    const acceptableArray = acceptableAnswersStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const qPayload: Question = {
      id: questionIdNumber,
      category: category.trim() || 'Curriculum Assessment',
      question: questionText.trim(),
      type: questionType,
      marks,
      unit: unit.trim() || undefined,
      options: finalOptions,
      correctAnswer: finalCorrectAnswer,
      acceptableAnswers: acceptableArray.length > 0 ? acceptableArray : undefined,
      explanation: explanation.trim(),
    };

    setIsSaving(true);
    try {
      if (isNew) {
        // Try backend create route & local store
        const { createNewQuestion } = await import('@/lib/custom-questions');
        const created = await createNewQuestion(selectedPaperId, qPayload);
        if (onSave) await onSave(created);
        if (onSaveQuestion) await onSaveQuestion(created);
      } else {
        await saveEditedQuestion(selectedPaperId, qPayload);
        if (onSave) await onSave(qPayload);
        if (onSaveQuestion) await onSaveQuestion(qPayload);
      }

      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 900);
    } catch {
      setIsSaving(false);
      setError('Failed to save question to database. Please check your connection.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!question) return;
    setError(null);
    setIsDeleting(true);

    try {
      await deleteQuestionPermanently(selectedPaperId, question.id);
      if (onDelete) await onDelete(question.id);
      if (onDeleteQuestion) await onDeleteQuestion(question.id);

      setIsDeleting(false);
      setDeleteSuccess(true);
      setShowDeleteConfirm(false);

      setTimeout(() => {
        setDeleteSuccess(false);
        onClose();
      }, 800);
    } catch (err) {
      console.error('Delete question error:', err);
      setIsDeleting(false);
      setError('Failed to delete question from database. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col flex-1 min-h-0 overflow-hidden ${
      isDark ? 'bg-[#120709] text-slate-200' : 'bg-white text-slate-800'
    }`}>
      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 overscroll-contain">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-700/80 text-red-200 text-xs font-semibold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {saveSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isNew ? 'New question inserted into database & curriculum!' : 'Question saved to database and live assessment!'}</span>
          </div>
        )}

        {deleteSuccess && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-700/80 text-red-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
            <span>Question permanently removed from database!</span>
          </div>
        )}

        {/* Confirmation Warning Overlay when Delete is Clicked */}
        <AnimatePresence>
          {showDeleteConfirm && question && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              className={`p-4 sm:p-5 rounded-2xl border-2 space-y-3.5 shadow-lg ${
                isDark
                  ? 'bg-[#2a0e14] border-red-500 text-red-100'
                  : 'bg-rose-50 border-red-400 text-red-950'
              }`}
            >
              <div className="flex items-center gap-2 text-red-500 font-black text-sm">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 animate-pulse" />
                <span>Confirm Permanent Question Deletion</span>
              </div>
              
              <p className="text-xs sm:text-sm leading-relaxed">
                Are you sure you want to permanently delete <strong>Question #{question.id}</strong> from paper <strong>&ldquo;{selectedPaperId}&rdquo;</strong>?
              </p>

              <div className={`p-2.5 rounded-xl text-xs font-medium border italic ${
                isDark ? 'bg-[#1a070a] border-red-900/60 text-slate-300' : 'bg-white border-red-200 text-slate-700'
              }`}>
                &ldquo;{questionText ? questionText.slice(0, 140) + (questionText.length > 140 ? '...' : '') : 'Question Prompt'}&rdquo;
              </div>

              <p className={`text-[11px] font-semibold ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                ⚠️ This action will immediately execute database deletion, close the editor, and update the assessment UI to remove this question.
              </p>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  id="confirm-delete-question-btn"
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting from DB...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Yes, Delete Question</span>
                    </>
                  )}
                </button>

                <button
                  id="cancel-delete-question-btn"
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-[#180a0e] border-red-900/60 text-slate-300 hover:bg-[#1a0a0d]'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paper & Question ID Assignment (Especially useful for New Questions) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availablePapers.length > 0 ? (
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Target Curriculum Paper
              </label>
              <select
                id="edit-q-paper-select"
                value={selectedPaperId}
                onChange={(e) => setSelectedPaperId(e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:border-red-500 cursor-pointer ${
                  isDark
                    ? 'border-red-900/60 bg-[#0d0507] text-white'
                    : 'border-slate-300 bg-slate-50 text-slate-900'
                }`}
              >
                {availablePapers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.subtitle || p.title} ({p.code})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Curriculum Paper Code
              </label>
              <input
                type="text"
                value={selectedPaperId}
                disabled
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border font-mono font-bold ${
                  isDark
                    ? 'border-red-900/60 bg-[#0d0507] text-amber-400'
                    : 'border-slate-300 bg-slate-100 text-amber-800'
                }`}
              />
            </div>
          )}

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Question Number / ID
            </label>
            <input
              id="edit-q-id-input"
              type="number"
              min={1}
              value={questionIdNumber}
              onChange={(e) => setQuestionIdNumber(Math.max(1, parseInt(e.target.value, 10) || 1))}
              disabled={!isNew}
              className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:border-red-500 ${
                isNew
                  ? isDark
                    ? 'border-red-900/60 bg-[#0d0507] text-white'
                    : 'border-slate-300 bg-slate-50 text-slate-900'
                  : isDark
                    ? 'border-red-900/40 bg-[#0d0507]/50 text-slate-400 cursor-not-allowed'
                    : 'border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed'
              }`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Curriculum Topic / Category
          </label>
          <input
            id="edit-q-category-input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. SAFE Approach, Beach Patrol, Radio Signals, First Aid..."
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:border-red-500 ${
              isDark
                ? 'border-red-900/60 bg-[#0d0507] text-white'
                : 'border-slate-300 bg-slate-50 text-slate-900'
            }`}
          />
        </div>

        {/* Question Text */}
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Question Prompt Text
          </label>
          <textarea
            id="edit-q-text-input"
            rows={3}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Type or paste the complete question prompt here..."
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:border-red-500 leading-relaxed ${
              isDark
                ? 'border-red-900/60 bg-[#0d0507] text-white'
                : 'border-slate-300 bg-slate-50 text-slate-900'
            }`}
          />
        </div>

        {/* Question Answering Format Selector */}
        <div className="space-y-2 pt-1">
          <label className={`block text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Answering Format & Input Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'multiple-choice', label: 'Multiple Choice (MCQ)' },
              { id: 'numeric', label: 'Numeric / Calculation' },
              { id: 'text', label: 'Short Text / Written' },
            ].map((fmt) => {
              const active = questionType === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setQuestionType(fmt.id as 'multiple-choice' | 'numeric' | 'text')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-sm'
                        : 'bg-rose-50 border-rose-400 text-rose-900 shadow-sm'
                      : isDark
                        ? 'bg-[#180a0e] border-red-900/40 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Numeric / Text Additional Settings (Unit and Marks) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Marks Assigned
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={marks}
              onChange={(e) => setMarks(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:border-red-500 ${
                isDark
                  ? 'border-red-900/60 bg-[#0d0507] text-white'
                  : 'border-slate-300 bg-white text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Measurement Unit (Optional)
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. R, %, km/h, units"
              className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:border-red-500 ${
                isDark
                  ? 'border-red-900/60 bg-[#0d0507] text-white'
                  : 'border-slate-300 bg-white text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Render Format: Multiple Choice */}
        {questionType === 'multiple-choice' && (
          <div className="space-y-2.5 pt-1">
            <label className={`block text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Options & Correct Option Radio
            </label>
            <p className={`text-[11px] -mt-1 mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Click the radio button beside the option that is the official correct answer.
            </p>

            {(['A', 'B', 'C', 'D'] as const).map((letter) => {
              const val = letter === 'A' ? optionA : letter === 'B' ? optionB : letter === 'C' ? optionC : optionD;
              const setVal = letter === 'A' ? setOptionA : letter === 'B' ? setOptionB : letter === 'C' ? setOptionC : setOptionD;
              const isCorrect = correctAnswer === letter;

              return (
                <div
                  key={letter}
                  className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                    isCorrect
                      ? isDark
                        ? 'bg-[#1e0a12] border-rose-500/70 shadow-xs'
                        : 'bg-rose-50/80 border-rose-300 shadow-xs'
                      : isDark
                        ? 'bg-[#180a0e] border-red-900/50 hover:border-red-700/60'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <label className="flex items-center gap-2 cursor-pointer pt-1.5 shrink-0">
                    <input
                      type="radio"
                      name="correct-option-group"
                      checked={isCorrect}
                      onChange={() => setCorrectAnswer(letter)}
                      className="w-4 h-4 text-rose-500 accent-rose-500 cursor-pointer"
                    />
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                        isCorrect 
                          ? 'bg-rose-600 text-white' 
                          : isDark ? 'bg-[#2a0e14] text-slate-300' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                  </label>

                  <div className="flex-1 min-w-0">
                    <input
                      id={`edit-option-${letter}-input`}
                      type="text"
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                      placeholder={`Option ${letter} text...`}
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:border-red-500 ${
                        isDark
                          ? 'border-red-900/60 bg-[#0d0507] text-white'
                          : 'border-slate-300 bg-white text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Render Format: Numeric or Text */}
        {questionType !== 'multiple-choice' && (
          <div className="space-y-3 pt-1">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {questionType === 'numeric' ? 'Official Calculated Value / Solution' : 'Official Expected Answer / Keyword'}
              </label>
              <input
                type="text"
                value={directAnswer}
                onChange={(e) => setDirectAnswer(e.target.value)}
                placeholder={questionType === 'numeric' ? 'e.g. 675 500 or 0.458' : 'e.g. Special Economic Zone'}
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border font-mono font-bold focus:outline-none focus:border-rose-500 ${
                  isDark
                    ? 'border-rose-900/60 bg-[#0d0507] text-rose-300'
                    : 'border-rose-200 bg-rose-50/40 text-rose-950'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Acceptable Variants & Synonyms (Comma-separated)
              </label>
              <input
                type="text"
                value={acceptableAnswersStr}
                onChange={(e) => setAcceptableAnswersStr(e.target.value)}
                placeholder={questionType === 'numeric' ? 'e.g. 675500, R675 500, R 675 500' : 'e.g. SEZ, Industrial Zone'}
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:border-red-500 ${
                  isDark
                    ? 'border-red-900/60 bg-[#0d0507] text-white'
                    : 'border-slate-300 bg-white text-slate-900'
                }`}
              />
              <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                The dynamic grading engine automatically handles decimal commas/dots, spaces, currency symbols, and rounding tolerance.
              </p>
            </div>
          </div>
        )}

        {/* Explanation / Rationale */}
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Official Rationale & Curriculum Explanation
          </label>
          <textarea
            id="edit-q-explanation-input"
            rows={2}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Reference Apex Papers Operations manual chapter or technical reason..."
            className={`w-full px-3.5 py-2 text-xs rounded-xl border font-medium focus:outline-none focus:border-red-500 ${
              isDark
                ? 'border-red-900/60 bg-[#0d0507] text-white'
                : 'border-slate-300 bg-slate-50 text-slate-900'
            }`}
          />
        </div>
      </div>

      {/* Sticky Footer on Mobile & Desktop with Distinct Red Delete Question Button */}
      <div className={`p-3 sm:p-4 border-t flex items-center justify-between gap-2.5 shrink-0 z-10 ${
        isDark ? 'bg-[#180a0e] border-red-900/50' : 'bg-slate-50 border-slate-200'
      }`}>
        {!isNew && question ? (
          <button
            id="delete-admin-question-btn"
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isSaving || isDeleting || showDeleteConfirm}
            className="px-3.5 sm:px-4 py-2.5 rounded-xl border border-red-500/60 bg-red-500/10 hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-600 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-40 min-h-[40px] group"
            title={`Permanently delete Question #${question.id} from database`}
          >
            <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400 group-hover:text-white transition-colors" />
            <span>Delete Question</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
            <ShieldCheck className="w-4 h-4" />
            <span>New Curriculum Entry</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving || isDeleting}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer min-h-[40px] ${
              isDark ? 'text-slate-300 hover:text-white hover:bg-[#0c2234]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>

          <button
            id="save-admin-question-btn"
            type="submit"
            disabled={isSaving || isDeleting}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 min-h-[40px]"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export const AdminEditQuestionModal: React.FC<AdminEditQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  paperId,
  isNew = false,
  availablePapers = [],
  nextSuggestedId,
  onSave,
  onSaveQuestion,
  onDelete,
  onDeleteQuestion,
}) => {
  const { isDark } = useAppTheme();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden z-10 max-h-[92vh] flex flex-col ${
            isDark
              ? 'bg-[#120709] border-red-900/60 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 sunlit-card'
          }`}
        >
          {/* Header */}
          <div className={`px-5 py-4 sm:px-6 sm:py-5 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'bg-[#180a0e] border-red-900/50' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {isNew ? 'Add New Question' : 'Admin Q&A Editor'}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-black uppercase ${
                    isNew
                      ? 'bg-rose-950 border-rose-800 text-rose-300'
                      : isDark ? 'bg-amber-950 border-amber-800 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    {isNew ? `New Question #${question?.id || nextSuggestedId || 'Auto'}` : `Question #${question?.id}`}
                  </span>
                </div>
                <p className={`text-xs font-medium ${isDark ? 'text-amber-400/90' : 'text-amber-700'}`}>
                  {isNew ? `Insert new question record into ${paperId}` : `Direct database management for ${paperId}`}
                </p>
              </div>
            </div>

            <button
              id="close-admin-edit-modal-btn"
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-[#0c2234]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AdminEditQuestionForm
            key={question?.id ? `q_${question.id}` : `new_${nextSuggestedId ?? 0}`}
            question={question}
            paperId={paperId}
            isNew={isNew}
            availablePapers={availablePapers}
            nextSuggestedId={nextSuggestedId}
            onClose={onClose}
            onSave={onSave}
            onSaveQuestion={onSaveQuestion}
            onDelete={onDelete}
            onDeleteQuestion={onDeleteQuestion}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


