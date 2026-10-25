import { generateFallbackTranslation } from '@/lib/translate-fallback';

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  isSouthAfrican?: boolean;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', isSouthAfrican: true },
  { code: 'zu', name: 'isiZulu', nativeName: 'isiZulu', isSouthAfrican: true },
  { code: 'xh', name: 'isiXhosa', nativeName: 'isiXhosa', isSouthAfrican: true },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho', isSouthAfrican: true },
  { code: 'nso', name: 'Sepedi', nativeName: 'Sesotho sa Leboa', isSouthAfrican: true },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana', isSouthAfrican: true },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];

export interface TranslationResult {
  targetLanguage: string;
  translatedQuestion: string;
  translatedOptions: Array<{ letter: 'A' | 'B' | 'C' | 'D'; text: string }>;
  translatedExplanation?: string;
}

// In-memory client cache to prevent duplicate API requests
const translationCache = new Map<string, TranslationResult>();

function getCacheKey(questionId: number, targetLanguage: string): string {
  return `${questionId}__${targetLanguage}`;
}

export async function fetchQuestionTranslation(
  questionId: number,
  questionText: string,
  options: Array<{ letter: 'A' | 'B' | 'C' | 'D'; text: string }>,
  targetLanguage: string,
  explanation?: string
): Promise<TranslationResult> {
  const cacheKey = getCacheKey(questionId, targetLanguage);
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // If offline, use fallback translator immediately
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const fallback = generateFallbackTranslation(targetLanguage, questionText, options, explanation);
    const result: TranslationResult = {
      targetLanguage,
      translatedQuestion: fallback.translatedQuestion,
      translatedOptions: fallback.translatedOptions,
      translatedExplanation: fallback.translatedExplanation,
    };
    translationCache.set(cacheKey, result);
    return result;
  }

  try {
    const response = await fetch('/api/gemini/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetLanguage,
        questionText,
        options,
        explanation,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to translate question');
    }

    const result: TranslationResult = {
      targetLanguage,
      translatedQuestion: data.translatedQuestion,
      translatedOptions: data.translatedOptions,
      translatedExplanation: data.translatedExplanation,
    };

    translationCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Translation API failed or offline, falling back to local dictionary translator:', error);
    const fallback = generateFallbackTranslation(targetLanguage, questionText, options, explanation);
    const result: TranslationResult = {
      targetLanguage,
      translatedQuestion: fallback.translatedQuestion,
      translatedOptions: fallback.translatedOptions,
      translatedExplanation: fallback.translatedExplanation,
    };
    translationCache.set(cacheKey, result);
    return result;
  }
}
