'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Languages, Check, Loader2, Sparkles, ChevronDown, ArrowLeftRight } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage, fetchQuestionTranslation, TranslationResult } from '@/lib/translate';
import { Question } from '@/lib/quiz-data';

export interface TranslateControlProps {
  question: Question;
  activeTranslation: TranslationResult | null;
  onTranslationChange: (translation: TranslationResult | null) => void;
  chosenLanguage?: SupportedLanguage | null;
  onSelectLanguage?: (lang: SupportedLanguage | null) => void;
  isShowingTranslated?: boolean;
  onToggleShowingTranslated?: (showing: boolean) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const TranslateControl: React.FC<TranslateControlProps> = ({
  question,
  onTranslationChange,
  activeTranslation,
  chosenLanguage,
  onSelectLanguage,
  isShowingTranslated,
  onToggleShowingTranslated,
  className = '',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fallback internal states when not externally controlled (initialized deterministically to prevent hydration mismatch)
  const [internalChosenLanguage, setInternalChosenLanguage] = useState<SupportedLanguage | null>(() => {
    if (activeTranslation) {
      return SUPPORTED_LANGUAGES.find((l) => l.name === activeTranslation.targetLanguage) || null;
    }
    return null;
  });

  useEffect(() => {
    try {
      const savedCode = localStorage.getItem('sho_preferred_lang_code');
      if (savedCode) {
        const found = SUPPORTED_LANGUAGES.find((l) => l.code === savedCode) || null;
        if (found) {
          const timer = setTimeout(() => setInternalChosenLanguage(found), 0);
          return () => clearTimeout(timer);
        }
      }
    } catch {}
  }, []);
  const [internalShowingTranslated, setInternalShowingTranslated] = useState<boolean>(true);

  const effectiveChosenLanguage = chosenLanguage !== undefined ? chosenLanguage : internalChosenLanguage;
  const effectiveShowingTranslated = isShowingTranslated !== undefined ? isShowingTranslated : internalShowingTranslated;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = async (showTranslated: boolean) => {
    if (showTranslated) {
      if (onToggleShowingTranslated) {
        onToggleShowingTranslated(true);
      } else {
        setInternalShowingTranslated(true);
      }

      // If translation for this question is not yet loaded, fetch it
      if (!activeTranslation && effectiveChosenLanguage) {
        setIsLoading(true);
        setError(null);
        try {
          const result = await fetchQuestionTranslation(
            question.id,
            question.question,
            question.options || [],
            effectiveChosenLanguage.name,
            question.explanation
          );
          onTranslationChange(result);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Translation failed. Please try again.';
          setError(msg);
          setTimeout(() => setError(null), 4000);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      if (onToggleShowingTranslated) {
        onToggleShowingTranslated(false);
      } else {
        setInternalShowingTranslated(false);
      }
    }
  };

  const handleSelectLanguage = async (lang: SupportedLanguage) => {
    setIsOpen(false);
    setError(null);
    setIsLoading(true);

    if (onSelectLanguage) {
      onSelectLanguage(lang);
    } else {
      setInternalChosenLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sho_preferred_lang_code', lang.code);
      }
    }

    if (onToggleShowingTranslated) {
      onToggleShowingTranslated(true);
    } else {
      setInternalShowingTranslated(true);
    }

    try {
      const result = await fetchQuestionTranslation(
        question.id,
        question.question,
        question.options || [],
        lang.name,
        question.explanation
      );
      onTranslationChange(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Translation failed. Please try again.';
      setError(msg);
      setTimeout(() => setError(null), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToEnglish = () => {
    setIsOpen(false);
    setError(null);

    if (onSelectLanguage) {
      onSelectLanguage(null);
    } else {
      setInternalChosenLanguage(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sho_preferred_lang_code');
      }
    }

    if (onToggleShowingTranslated) {
      onToggleShowingTranslated(false);
    } else {
      setInternalShowingTranslated(false);
    }

    onTranslationChange(null);
  };

  const isSmall = size === 'sm';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {effectiveChosenLanguage ? (
        /* Dual-Language Toggle Pill: Circular items [ EN ] ⇄ [ Chosen Language ] ▾ */
        <div 
          className="inline-flex items-center rounded-full bg-rose-50/95 border border-rose-200 p-0.5 shadow-2xs gap-0.5"
          role="group"
          aria-label="Language Toggle"
        >
          {/* Circular English Toggle Button */}
          <button
            id={`toggle-lang-en-q${question.id}`}
            type="button"
            onClick={() => handleToggle(false)}
            className={`rounded-full font-bold transition-all cursor-pointer flex items-center justify-center ${
              isSmall ? 'w-6 h-6 text-[10px]' : 'w-7 h-7 text-xs'
            } ${
              !effectiveShowingTranslated
                ? 'bg-red-600 text-white shadow-xs font-extrabold'
                : 'text-neutral-500 hover:text-rose-900 hover:bg-rose-100/60'
            }`}
            title="Switch to English (Original)"
            aria-label="Switch to English (Original)"
            aria-pressed={!effectiveShowingTranslated}
          >
            EN
          </button>

          {/* Circular Flip Arrow Button */}
          <button
            id={`toggle-lang-flip-q${question.id}`}
            type="button"
            onClick={() => handleToggle(!effectiveShowingTranslated)}
            disabled={isLoading}
            className={`rounded-full text-rose-400 hover:text-red-600 hover:bg-rose-100/80 transition-colors cursor-pointer flex items-center justify-center ${
              isSmall ? 'w-5 h-5' : 'w-6 h-6'
            }`}
            title={`Toggle between English and ${effectiveChosenLanguage.name}`}
            aria-label="Toggle language"
          >
            <ArrowLeftRight className={isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
          </button>

          {/* Circular Chosen Language Toggle Button */}
          <button
            id={`toggle-lang-chosen-q${question.id}`}
            type="button"
            onClick={() => handleToggle(true)}
            disabled={isLoading}
            className={`rounded-full font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              isSmall ? 'h-6 px-2 text-[10px]' : 'h-7 px-2.5 text-xs'
            } ${
              effectiveShowingTranslated
                ? 'bg-red-600 text-white shadow-xs font-extrabold'
                : 'text-neutral-600 hover:text-rose-900 hover:bg-rose-100/60'
            }`}
            title={`Switch to ${effectiveChosenLanguage.name}`}
            aria-label={`Switch to ${effectiveChosenLanguage.name}`}
            aria-pressed={effectiveShowingTranslated}
          >
            {isLoading ? (
              <Loader2 className={`${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} animate-spin text-current`} />
            ) : null}
            <span>{effectiveChosenLanguage.code.toUpperCase()}</span>
          </button>

          {/* Circular Dropdown Menu Trigger */}
          <button
            id={`toggle-lang-menu-trigger-q${question.id}`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-full text-rose-600 hover:text-rose-900 hover:bg-rose-100/80 transition-colors cursor-pointer flex items-center justify-center ${
              isSmall ? 'w-5 h-5' : 'w-6 h-6'
            }`}
            title="Change language or reset"
            aria-label="Change language or reset"
          >
            <ChevronDown className={`${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      ) : (
        /* Initial State: Clean Translate Button */
        <button
          id={`translate-btn-q${question.id}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className={`rounded-xl border border-rose-200 dark:border-red-500/30 bg-rose-50/90 dark:bg-red-950/60 hover:bg-rose-100 dark:hover:bg-red-900/50 text-red-600 dark:text-[#FF6B6B] shadow-2xs transition-all cursor-pointer flex items-center justify-center group ${
            isSmall ? 'w-7 h-7' : 'w-8 h-8'
          }`}
          title="Translate question"
          aria-label="Translate question"
        >
          {isLoading ? (
            <Loader2 className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} animate-spin text-red-600`} />
          ) : (
            <Languages className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-red-600 dark:text-[#FF6B6B] group-hover:scale-110 transition-transform`} />
          )}
        </button>
      )}

      {/* Error Toast / Tooltip */}
      {error && (
        <div className="absolute top-full mt-1.5 right-0 sm:left-0 sm:right-auto z-50 p-2 text-[11px] font-semibold text-red-800 bg-red-50 border border-red-200 rounded-xl shadow-lg w-56 animate-in fade-in">
          {error}
        </div>
      )}

      {/* Language Selection Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-64 rounded-2xl bg-white border border-rose-200 shadow-xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-rose-100 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-red-600" />
              Choose Language
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">SHO Multilingual</span>
          </div>

          <div className="max-h-64 overflow-y-auto p-1 space-y-1">
            {/* Revert to Original Option */}
            <button
              id={`lang-select-original-q${question.id}`}
              type="button"
              onClick={handleResetToEnglish}
              className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                !effectiveChosenLanguage
                  ? 'bg-rose-50 text-rose-900 font-bold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-400" />
                <span>Original (English only)</span>
              </div>
              {!effectiveChosenLanguage && <Check className="w-3.5 h-3.5 text-red-600" />}
            </button>

            {/* South African Languages Section Header */}
            <div className="px-2 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
              South African Languages
            </div>

            {SUPPORTED_LANGUAGES.filter(l => l.isSouthAfrican).map((lang) => {
              const isSelected = effectiveChosenLanguage?.code === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-select-${lang.code}-q${question.id}`}
                  type="button"
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50 text-rose-900 font-bold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>{lang.name}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">({lang.nativeName})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-red-600" />}
                </button>
              );
            })}

            {/* International Section Header */}
            <div className="px-2 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
              International
            </div>

            {SUPPORTED_LANGUAGES.filter(l => !l.isSouthAfrican).map((lang) => {
              const isSelected = effectiveChosenLanguage?.code === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-select-${lang.code}-q${question.id}`}
                  type="button"
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50 text-rose-900 font-bold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-300" />
                    <span>{lang.name}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">({lang.nativeName})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-red-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

