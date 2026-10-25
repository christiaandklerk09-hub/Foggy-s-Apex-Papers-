import { Question } from '@/types/quiz';

/**
 * Normalizes text by trimming whitespace, lowercasing, and normalizing quotes/dashes.
 */
export function normalizeText(val: string | undefined | null): string {
  if (!val) return '';
  return String(val)
    .trim()
    .toLowerCase()
    .replace(/[“”"']/g, '')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ');
}

/**
 * Normalizes numbers and currency strings (e.g. "R675 500" -> 675500, "$0,458" -> 0.458).
 * Supports South African decimal commas, currency symbols, percentages, and fractions (e.g. 5/6).
 */
export function normalizeNumeric(val: string | undefined | null): {
  isNumeric: boolean;
  value: number | null;
  rawNormalized: string;
} {
  if (!val) return { isNumeric: false, value: null, rawNormalized: '' };

  let raw = String(val).trim();

  // Strip currencies, units, and symbols
  raw = raw
    .replace(/[R$€£]/gi, '')
    .replace(/us\$/gi, '')
    .replace(/rands?/gi, '')
    .replace(/dollars?/gi, '')
    .replace(/%/g, '')
    .replace(/cm\^?2?/gi, '')
    .replace(/m\^?2?/gi, '')
    .replace(/km\/?h?/gi, '')
    .replace(/units?/gi, '')
    .replace(/pula/gi, '')
    .trim();

  // Handle fractions like "5/6"
  const fractionMatch = raw.match(/^([+-]?\d+(?:\.\d+)?)\s*\/\s*([+-]?\d+(?:\.\d+)?)$/);
  if (fractionMatch) {
    const num = parseFloat(fractionMatch[1]);
    const den = parseFloat(fractionMatch[2]);
    if (den !== 0) {
      const fracVal = num / den;
      return { isNumeric: true, value: fracVal, rawNormalized: String(fracVal) };
    }
  }

  // Remove digit grouping spaces (e.g. "675 500" -> "675500")
  raw = raw.replace(/\s+/g, '');

  // Convert decimal comma to period (e.g. "0,458" -> "0.458")
  if (raw.includes(',') && !raw.includes(';')) {
    // If only one comma, it's a decimal separator
    if ((raw.match(/,/g) || []).length === 1) {
      raw = raw.replace(',', '.');
    } else {
      // If multiple commas, it might be thousands separators: "1,250,000"
      raw = raw.replace(/,/g, '');
    }
  }

  const parsed = parseFloat(raw);
  const isNumeric = !isNaN(parsed) && isFinite(parsed);

  return {
    isNumeric,
    value: isNumeric ? parsed : null,
    rawNormalized: raw,
  };
}

/**
 * Checks if two numbers are equal within a reasonable tolerance (handles rounding to 2 or 3 decimals).
 */
export function isNumericClose(val1: number, val2: number, tolerance: number = 0.02): boolean {
  if (val1 === val2) return true;
  const absDiff = Math.abs(val1 - val2);
  if (absDiff <= tolerance) return true;

  // Relative tolerance for larger values (e.g. R675,500 vs R675,499)
  const maxVal = Math.max(1, Math.abs(val2));
  return absDiff / maxVal <= 0.015;
}

/**
 * Intelligently extracts candidate keywords from a memo with options like:
 * "Angola, Namibia, Botswana (Any two)" or "Zimbabwe / South Africa"
 */
function extractMemoKeywords(correctAnswer: string): string[] {
  // Strip "(Any two)", "(Any one)", etc.
  let cleaned = correctAnswer.replace(/\(any\s+\w+\)/gi, '').trim();
  const tokens = cleaned
    .split(/[,;\/|]|(?:\band\b)|(?:\bor\b)/gi)
    .map((t) => normalizeText(t))
    .filter((t) => t.length > 1);
  return tokens;
}

/**
 * Universal evaluation function to check if a student's answer is correct
 * dynamically based on the question definition itself.
 */
export function evaluateQuestionAnswer(
  userAnswer: string | undefined | null,
  question: Question
): {
  isCorrect: boolean;
  matchedAnswer?: string;
  feedback?: string;
} {
  if (!userAnswer || !String(userAnswer).trim()) {
    return { isCorrect: false, feedback: 'No answer provided.' };
  }

  const userTrimmed = String(userAnswer).trim();
  const userNormText = normalizeText(userTrimmed);
  const userNum = normalizeNumeric(userTrimmed);

  // 1. Multiple-choice matching (A, B, C, D)
  if (question.options && question.options.length > 0) {
    const userLetter = userTrimmed.toUpperCase();
    const correctLetter = String(question.correctAnswer || '').trim().toUpperCase();

    // Check letter match
    if (['A', 'B', 'C', 'D'].includes(userLetter)) {
      if (userLetter === correctLetter) {
        return { isCorrect: true, matchedAnswer: userLetter };
      }
    }

    // Check text match against the correct option's text
    const correctOption = question.options.find(
      (opt) => opt.letter.toUpperCase() === correctLetter
    );
    if (correctOption) {
      if (normalizeText(correctOption.text) === userNormText) {
        return { isCorrect: true, matchedAnswer: correctOption.letter };
      }
      const optNum = normalizeNumeric(correctOption.text);
      if (userNum.isNumeric && optNum.isNumeric && userNum.value !== null && optNum.value !== null) {
        if (isNumericClose(userNum.value, optNum.value)) {
          return { isCorrect: true, matchedAnswer: correctOption.letter };
        }
      }
    }
  }

  // 2. Direct string equality (case-insensitive)
  const memoNormText = normalizeText(String(question.correctAnswer || ''));
  if (userNormText === memoNormText) {
    return { isCorrect: true, matchedAnswer: question.correctAnswer };
  }

  // 3. Acceptable Answers Array Check (if provided in question or calculation steps)
  const candidateAnswers: string[] = [];
  if (Array.isArray(question.acceptableAnswers)) {
    candidateAnswers.push(...question.acceptableAnswers);
  }
  if (Array.isArray(question.steps)) {
    question.steps.forEach((step) => {
      if (step.expectedAnswer) candidateAnswers.push(step.expectedAnswer);
      if (Array.isArray(step.acceptableAnswers)) {
        candidateAnswers.push(...step.acceptableAnswers);
      }
    });
  }

  for (const candidate of candidateAnswers) {
    if (normalizeText(candidate) === userNormText) {
      return { isCorrect: true, matchedAnswer: candidate };
    }
    const candNum = normalizeNumeric(candidate);
    if (userNum.isNumeric && candNum.isNumeric && userNum.value !== null && candNum.value !== null) {
      if (isNumericClose(userNum.value, candNum.value)) {
        return { isCorrect: true, matchedAnswer: candidate };
      }
    }
  }

  // 4. Numeric / Currency Equivalence
  const memoNum = normalizeNumeric(String(question.correctAnswer || ''));
  if (userNum.isNumeric && memoNum.isNumeric && userNum.value !== null && memoNum.value !== null) {
    if (isNumericClose(userNum.value, memoNum.value)) {
      return { isCorrect: true, matchedAnswer: String(question.correctAnswer) };
    }
  }

  // 5. Keyword & List Matching (e.g. "Angola, Namibia, Botswana (Any two)")
  const memoKeywords = extractMemoKeywords(String(question.correctAnswer || ''));
  if (memoKeywords.length > 0) {
    let matchedKeywordsCount = 0;
    for (const kw of memoKeywords) {
      if (userNormText.includes(kw)) {
        matchedKeywordsCount++;
      }
    }

    const isAnyTwo = /any\s+two/i.test(String(question.correctAnswer || ''));
    const isAnyOne = /any\s+one/i.test(String(question.correctAnswer || ''));

    if (isAnyTwo && matchedKeywordsCount >= 2) {
      return { isCorrect: true, matchedAnswer: `Matched: ${matchedKeywordsCount} required terms` };
    }
    if (isAnyOne && matchedKeywordsCount >= 1) {
      return { isCorrect: true, matchedAnswer: `Matched: ${matchedKeywordsCount} required term` };
    }
    if (matchedKeywordsCount === memoKeywords.length && memoKeywords.length > 0) {
      return { isCorrect: true, matchedAnswer: `Matched all terms: ${memoKeywords.join(', ')}` };
    }
  }

  // 6. Substring match for detailed multi-word answers
  if (memoNormText.length > 4 && userNormText.length > 4) {
    if (memoNormText.includes(userNormText) || userNormText.includes(memoNormText)) {
      return { isCorrect: true, matchedAnswer: String(question.correctAnswer) };
    }
  }

  return { isCorrect: false };
}

/**
 * Determines the ideal dynamic input and answering layout based solely on the question's
 * structure, options, steps, marks, and content.
 */
export function detectQuestionInputType(question: Question): 'multiple-choice' | 'steps' | 'numeric' | 'short-text' | 'long-text' {
  // If options are provided, it is multiple-choice
  if (question.options && question.options.length > 0) {
    return 'multiple-choice';
  }

  // If calculation steps are defined, it is step-by-step
  if (question.steps && question.steps.length > 0) {
    return 'steps';
  }

  // Check if it is a numeric/currency calculation
  if (question.type === 'numeric') {
    return 'numeric';
  }

  const memoNum = normalizeNumeric(String(question.correctAnswer || ''));
  const promptLower = (question.question || '').toLowerCase();
  const isCalcPrompt = 
    promptLower.includes('calculate') || 
    promptLower.includes('determine') || 
    promptLower.includes('find the difference') || 
    promptLower.includes('exchange rate') ||
    promptLower.includes('probability');

  if (memoNum.isNumeric || isCalcPrompt) {
    // If the answer is a single number/amount and prompt is calculation
    if (memoNum.isNumeric || (!promptLower.includes('explain') && !promptLower.includes('discuss') && (question.marks || 2) <= 5)) {
      return 'numeric';
    }
  }

  // If high marks (>= 6) and open-ended, treat as long text / essay
  if (question.type === 'essay' || ((question.marks || 2) >= 8 && !promptLower.includes('calculate'))) {
    return 'long-text';
  }

  return 'short-text';
}

/**
 * Detects the preferred unit or currency symbol from a question's steps, answer, or text.
 */
export function detectQuestionUnit(question: Question): string | null {
  if (question.steps && question.steps.length > 0 && question.steps[0].unit) {
    return question.steps[0].unit;
  }
  const ans = String(question.correctAnswer || '');
  if (/^R\s*[\d]/i.test(ans)) return 'R';
  if (/^\$\s*[\d]/i.test(ans)) return 'US$';
  if (ans.includes('%')) return '%';
  if (/cm\^?2?/i.test(ans)) return 'cm';
  if (/m\^?2?/i.test(ans)) return 'm';
  if (/km\/?h?/i.test(ans)) return 'km/h';
  return null;
}
