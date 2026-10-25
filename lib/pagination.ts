import { Question } from './quiz-data';
import { chunkQuestions } from './quizUtils';

export interface QuestionBlock {
  blockIndex: number;
  blockNumber: number; // 1-indexed (e.g. Block 1, Block 2 / Section 1, Section 2)
  title: string;
  sectionLabel?: string;
  startIndex: number; // 0-indexed start
  endIndex: number; // 0-indexed inclusive end
  startQuestionNumber: number; // 1-indexed (e.g. 1)
  endQuestionNumber: number; // 1-indexed (e.g. 20)
  totalInBlock: number;
  questions: Question[];
}

/**
 * Groups questions into smart sections with dynamic chunking.
 * Dynamic Section Splitting Rule:
 * Automatically splits any section or paper exceeding 40 questions into 2 equal parts.
 * If total <= 40, uses smart block grouping of target size 20 with overflow protection.
 */
export function getSmartQuestionBlocks(
  questions: Question[],
  baseBlockSize: number = 20,
  maxOverflow: number = 4
): QuestionBlock[] {
  const total = questions.length;
  if (total === 0) return [];

  // Dynamic Section Splitting Logic: evaluate total question count and divide large blocks (> 40) into 2 balanced sub-sections
  if (total > 40) {
    const sections = chunkQuestions(questions);
    let offset = 0;
    return sections.map((sectionQuestions, idx) => {
      const start = offset;
      const end = offset + sectionQuestions.length - 1;
      const blockNum = idx + 1;
      const sectionLetter = idx === 0 ? 'A' : 'B';
      const block: QuestionBlock = {
        blockIndex: idx,
        blockNumber: blockNum,
        title: `Section ${blockNum} (Q${start + 1} – Q${end + 1})`,
        sectionLabel: `Section ${blockNum}`,
        startIndex: start,
        endIndex: end,
        startQuestionNumber: start + 1,
        endQuestionNumber: end + 1,
        totalInBlock: sectionQuestions.length,
        questions: sectionQuestions,
      };
      offset += sectionQuestions.length;
      return block;
    });
  }

  // If total questions only slightly exceed base block size (e.g. <= 24 questions),
  // keep them all in 1 single block!
  if (total <= baseBlockSize + maxOverflow) {
    return [
      {
        blockIndex: 0,
        blockNumber: 1,
        title: `Section 1 (Q1 – Q${total})`,
        startIndex: 0,
        endIndex: total - 1,
        startQuestionNumber: 1,
        endQuestionNumber: total,
        totalInBlock: total,
        questions: questions.slice(0, total),
      },
    ];
  }

  const blocks: QuestionBlock[] = [];
  let currentStart = 0;
  let blockNum = 1;

  while (currentStart < total) {
    const remainingAfterStart = total - currentStart;

    // Check if what remains is <= baseBlockSize + maxOverflow
    // If so, take all remaining into the final block
    if (remainingAfterStart <= baseBlockSize + maxOverflow) {
      const end = total - 1;
      blocks.push({
        blockIndex: blocks.length,
        blockNumber: blockNum,
        title: `Section ${blockNum} (Q${currentStart + 1} – Q${total})`,
        startIndex: currentStart,
        endIndex: end,
        startQuestionNumber: currentStart + 1,
        endQuestionNumber: total,
        totalInBlock: total - currentStart,
        questions: questions.slice(currentStart, total),
      });
      break;
    } else {
      const end = currentStart + baseBlockSize - 1;
      blocks.push({
        blockIndex: blocks.length,
        blockNumber: blockNum,
        title: `Section ${blockNum} (Q${currentStart + 1} – Q${currentStart + baseBlockSize})`,
        startIndex: currentStart,
        endIndex: end,
        startQuestionNumber: currentStart + 1,
        endQuestionNumber: currentStart + baseBlockSize,
        totalInBlock: baseBlockSize,
        questions: questions.slice(currentStart, currentStart + baseBlockSize),
      });
      currentStart += baseBlockSize;
      blockNum++;
    }
  }

  return blocks;
}

/**
 * Finds which block contains a given question index (0-indexed).
 */
export function findBlockForQuestionIndex(blocks: QuestionBlock[], questionIndex: number): QuestionBlock | undefined {
  return blocks.find((b) => questionIndex >= b.startIndex && questionIndex <= b.endIndex);
}
