/**
 * Dynamic Section Splitting and Chunking Utility
 * Automatically evaluates the total question count and divides large blocks (> 40 questions)
 * into balanced sub-sections (Section A & Section B) to handle larger question papers smoothly.
 */

export function chunkQuestions<T>(questions: T[]): T[][] {
  if (questions.length > 40) {
    const mid = Math.ceil(questions.length / 2);
    return [questions.slice(0, mid), questions.slice(mid)];
  }
  return [questions];
}

export { seededShuffle, prepareAndShuffleOptions, shufflePaperQuestions, shuffleQuestionOptions, fisherYatesShuffle } from './quiz-data';

