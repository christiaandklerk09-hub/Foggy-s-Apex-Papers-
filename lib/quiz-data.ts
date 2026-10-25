import { SubjectID, Question, QuizPaper, SUBJECTS } from '@/types/quiz';

export { SUBJECTS };
export type { SubjectID, Question, QuizPaper };

/**
 * Mulberry32 PRNG (Pseudo-Random Number Generator)
 * A fast, high-quality 32-bit PRNG.
 */
export function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Pure Fisher-Yates (Knuth) shuffle algorithm.
 */
export function fisherYatesShuffle<T>(array: readonly T[], seed?: number): T[] {
  const result = [...array];
  const actualSeed = seed !== undefined ? seed : Math.floor(Math.random() * 0xffffffff);
  const prng = mulberry32(actualSeed);
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export const seededShuffle = fisherYatesShuffle;

/**
 * Helper to bind option texts to their isCorrect boolean flags before they are shuffled.
 */
export function prepareAndShuffleOptions(
  options: Question['options'],
  correctAnswer: Question['correctAnswer'],
  seed?: number
) {
  const correctStr = String(correctAnswer ?? '').trim().toUpperCase();
  const boundOptions = (options || []).map((opt) => ({
    text: opt?.text ?? '',
    isCorrect: opt?.letter ? String(opt.letter).trim().toUpperCase() === correctStr : false,
  }));

  const shuffled = seededShuffle(boundOptions, seed);
  const standardLetters: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

  const newOptions = shuffled.map((item, index) => ({
    letter: standardLetters[index] || ('A' as const),
    text: item.text,
  }));

  const newCorrectIndex = shuffled.findIndex((opt) => opt.isCorrect);
  const newCorrectAnswer = newCorrectIndex !== -1 ? standardLetters[newCorrectIndex] : correctAnswer;

  return { newOptions, newCorrectAnswer };
}

export function shuffleQuestionOptions(question: Question, seed?: number): Question {
  if (!question || !question.options || question.options.length <= 1) {
    return { ...question };
  }

  const { newOptions, newCorrectAnswer } = prepareAndShuffleOptions(
    question.options,
    question.correctAnswer,
    seed
  );

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

export function shufflePaperQuestions(paper: QuizPaper, seed?: number): QuizPaper {
  if (!paper || !paper.questions) return paper;
  const actualSeed = seed !== undefined ? seed : 101010;
  return {
    ...paper,
    questions: paper.questions.map((q) => 
      shuffleQuestionOptions(q, seed !== undefined ? seed + (q.id * 100) : undefined)
    ),
  };
}

import { ECONOMICS_MCQ_TEST_1_PAPER } from './economics-mcq-test-1-data';
import { ECONOMICS_MCQ_TEST_2_PAPER } from './economics-mcq-test-2-data';
import { ECONOMICS_P1_2021_PAPER } from './economics-p1-2021-data';
import { BUSINESS_STUDIES_MCQ_TEST_1_PAPER } from './business-studies-mcq-test-1-data';
import { BUSINESS_STUDIES_MCQ_TEST_2_PAPER } from './business-studies-mcq-test-2-data';
import { BUSINESS_STUDIES_P1_2021_PAPER } from './business-studies-p1-2021-data';
import { ACCOUNTING_P1_2021_PAPER } from './accounting-p1-2021-data';
import { ACCOUNTING_MCQ_TEST_1_PAPER } from './accounting-mcq-test-1-data';
import { ACCOUNTING_MCQ_TEST_2_PAPER } from './accounting-mcq-test-2-data';
import { MATHS_LITERACY_MCQ_TEST_1_PAPER } from './maths-literacy-mcq-test-1-data';
import { MATHS_LITERACY_MCQ_TEST_2_PAPER } from './maths-literacy-mcq-test-2-data';
import { MATHS_LITERACY_P1_2021_PAPER } from './maths-literacy-p1-2021-data';
import { ENGLISH_MCQ_TEST_1_PAPER } from './english-mcq-test-1-data';
import { ENGLISH_MCQ_TEST_2_PAPER } from './english-mcq-test-2-data';
import { ENGLISH_FAL_P1_2021_PAPER } from './english-fal-p1-2021-data';
import { AFRIKAANS_MCQ_TEST_1_PAPER } from './afrikaans-mcq-test-1-data';
import { AFRIKAANS_MCQ_TEST_2_PAPER } from './afrikaans-mcq-test-2-data';
import { AFRIKAANS_TAT_V1_2021_PAPER } from './afrikaans-tat-v1-2021-data';

export { 
  ECONOMICS_MCQ_TEST_1_PAPER,
  ECONOMICS_MCQ_TEST_2_PAPER,
  ECONOMICS_P1_2021_PAPER, 
  BUSINESS_STUDIES_MCQ_TEST_1_PAPER,
  BUSINESS_STUDIES_MCQ_TEST_2_PAPER,
  BUSINESS_STUDIES_P1_2021_PAPER, 
  ACCOUNTING_P1_2021_PAPER, 
  ACCOUNTING_MCQ_TEST_1_PAPER,
  ACCOUNTING_MCQ_TEST_2_PAPER,
  MATHS_LITERACY_MCQ_TEST_1_PAPER,
  MATHS_LITERACY_MCQ_TEST_2_PAPER,
  MATHS_LITERACY_P1_2021_PAPER,
  ENGLISH_MCQ_TEST_1_PAPER,
  ENGLISH_MCQ_TEST_2_PAPER,
  ENGLISH_FAL_P1_2021_PAPER,
  AFRIKAANS_MCQ_TEST_1_PAPER,
  AFRIKAANS_MCQ_TEST_2_PAPER,
  AFRIKAANS_TAT_V1_2021_PAPER
};

// ============================================================================
// GRADE 12 PAST EXAM PAPERS CURRICULUM
// ============================================================================

export const QUIZ_PAPERS: QuizPaper[] = [
  ECONOMICS_MCQ_TEST_1_PAPER,
  ECONOMICS_MCQ_TEST_2_PAPER,
  ECONOMICS_P1_2021_PAPER,
  BUSINESS_STUDIES_MCQ_TEST_1_PAPER,
  BUSINESS_STUDIES_MCQ_TEST_2_PAPER,
  BUSINESS_STUDIES_P1_2021_PAPER,
  ACCOUNTING_MCQ_TEST_1_PAPER,
  ACCOUNTING_MCQ_TEST_2_PAPER,
  ACCOUNTING_P1_2021_PAPER,
  MATHS_LITERACY_MCQ_TEST_1_PAPER,
  MATHS_LITERACY_MCQ_TEST_2_PAPER,
  MATHS_LITERACY_P1_2021_PAPER,
  ENGLISH_MCQ_TEST_1_PAPER,
  ENGLISH_MCQ_TEST_2_PAPER,
  ENGLISH_FAL_P1_2021_PAPER,
  AFRIKAANS_MCQ_TEST_1_PAPER,
  AFRIKAANS_MCQ_TEST_2_PAPER,
  AFRIKAANS_TAT_V1_2021_PAPER,
];

// Helper to look up a paper by ID
export function getPaperById(id: string): QuizPaper | undefined {
  return QUIZ_PAPERS.find((p) => p.id === id);
}
