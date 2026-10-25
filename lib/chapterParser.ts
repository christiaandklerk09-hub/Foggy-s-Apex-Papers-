import { QuizPaper, Question } from './quiz-data';

/**
 * Dynamic Subject / Paper Number Extraction:
 */
export function extractChapterNumber(filename: string, fileContent: string): number {
  const regex = /(?:paper|vraestel|subject|chapter|ch\.?)\s*(\d{1,2})/i;
  
  const filenameMatch = (filename || '').match(regex);
  if (filenameMatch) {
    const num = parseInt(filenameMatch[1], 10);
    if (num >= 1 && num <= 6) return num;
  }

  const contentMatch = (fileContent || '').match(regex);
  if (contentMatch) {
    const num = parseInt(contentMatch[1], 10);
    if (num >= 1 && num <= 6) return num;
  }

  return 1;
}

/**
 * Standard curriculum academic past papers for Apex Papers Grade 12 (1 to 6)
 */
export const APEX_CURRICULUM_PAPERS: Record<number, { title: string; subtitle: string; code: string; defaultQuestions: number; moduleName: string; categorySlug: string; subjectId: string }> = {
  1: {
    title: 'APEX PAPERS · GRADE 12',
    subtitle: 'Accounting: Financial Reporting & Balance Sheet (Paper 1)',
    code: 'ACC-P1-2026',
    moduleName: 'Accounting Paper 1',
    categorySlug: 'accounting',
    subjectId: 'accounting',
    defaultQuestions: 20,
  },
  2: {
    title: 'APEX PAPERS · GRADE 12',
    subtitle: 'Business Studies: Business Environments & Corporate Strategies (Paper 1)',
    code: 'BUS-P1-2026',
    moduleName: 'Business Studies Paper 1',
    categorySlug: 'business_studies',
    subjectId: 'business_studies',
    defaultQuestions: 20,
  },
  3: {
    title: 'APEX PAPERS · GRADE 12',
    subtitle: 'Economics: Macroeconomics & Circular Flow (Paper 1)',
    code: 'ECON-P1-2026',
    moduleName: 'Economics Paper 1',
    categorySlug: 'economics',
    subjectId: 'economics',
    defaultQuestions: 20,
  },
  4: {
    title: 'APEX PAPERS · GRADE 12',
    subtitle: 'Mathematical Literacy: Finance, Tariffs & Taxation (Paper 1)',
    code: 'MLIT-P1-2026',
    moduleName: 'Mathematical Literacy Paper 1',
    categorySlug: 'maths_literacy',
    subjectId: 'maths_literacy',
    defaultQuestions: 20,
  },
  5: {
    title: 'APEX PAPERS · GRADE 12',
    subtitle: 'English Home Language: Comprehension, Language & Editing (Paper 1)',
    code: 'ENG-P1-2026',
    moduleName: 'English Home Language Paper 1',
    categorySlug: 'english_hg',
    subjectId: 'english_hg',
    defaultQuestions: 20,
  },
  6: {
    title: 'APEX PAPERS · GRAAD 12',
    subtitle: 'Afrikaans Eerste Addisionele Taal: Leesbegrip & Taalstrukture (Vraestel 1)',
    code: 'AFR-V1-2026',
    moduleName: 'Afrikaans FAL Vraestel 1',
    categorySlug: 'afrikaans_fal',
    subjectId: 'afrikaans_fal',
    defaultQuestions: 20,
  },
};

// Backward compatibility alias
export const CPR_CURRICULUM_CHAPTERS = APEX_CURRICULUM_PAPERS;

/**
 * Returns the numeric subject/paper order number (1 to 6)
 */
export function getPaperChapterNumber(paper?: QuizPaper | number | null): number {
  if (typeof paper === 'number') return paper >= 1 && paper <= 6 ? paper : 1;
  if (!paper) return 1;
  if (paper.chapterNumber && paper.chapterNumber >= 1 && paper.chapterNumber <= 6) {
    return paper.chapterNumber;
  }
  
  // Match by subjectId
  if (paper.subjectId === 'accounting') return 1;
  if (paper.subjectId === 'business_studies') return 2;
  if (paper.subjectId === 'economics') return 3;
  if (paper.subjectId === 'maths_literacy') return 4;
  if (paper.subjectId === 'english_hg') return 5;
  if (paper.subjectId === 'afrikaans_fal') return 6;

  // Match by id string
  if (paper.id.includes('accounting')) return 1;
  if (paper.id.includes('business')) return 2;
  if (paper.id.includes('economics')) return 3;
  if (paper.id.includes('maths')) return 4;
  if (paper.id.includes('english')) return 5;
  if (paper.id.includes('afrikaans')) return 6;

  return 1;
}

/**
 * Returns dynamic visual styling and badge info for a subject paper
 */
export function getPaperChapterBadge(paper?: QuizPaper | number | null) {
  const num = getPaperChapterNumber(paper);

  switch (num) {
    case 1:
      return {
        primaryColor: 'red',
        badgeBg: 'bg-red-50 dark:bg-red-950/70',
        badgeBorder: 'border-red-200 dark:border-red-800/60',
        badgeText: 'text-red-700 dark:text-red-300',
        isLightRed: true,
        topicLabel: 'Accounting · Financial Reporting & Balance Sheet',
        accentBarGradient: 'from-red-600 via-rose-500 to-red-400',
        cardBorderHover: 'hover:border-red-400 dark:hover:border-red-600/70',
        tagBg: 'bg-red-100 dark:bg-red-950',
        tagText: 'text-red-800 dark:text-red-300',
        tagBorder: 'border-red-300 dark:border-red-700',
      };
    case 2:
      return {
        primaryColor: 'rose',
        badgeBg: 'bg-rose-50 dark:bg-rose-950/70',
        badgeBorder: 'border-rose-200 dark:border-rose-800/60',
        badgeText: 'text-rose-700 dark:text-rose-300',
        isLightRed: true,
        topicLabel: 'Business Studies · Environments & Corporate Governance',
        accentBarGradient: 'from-rose-600 via-red-500 to-rose-400',
        cardBorderHover: 'hover:border-rose-400 dark:hover:border-rose-600/70',
        tagBg: 'bg-rose-100 dark:bg-rose-950',
        tagText: 'text-rose-800 dark:text-rose-300',
        tagBorder: 'border-rose-300 dark:border-rose-700',
      };
    case 3:
      return {
        primaryColor: 'rose',
        badgeBg: 'bg-rose-50/90 dark:bg-rose-900/40',
        badgeBorder: 'border-rose-200 dark:border-rose-700/60',
        badgeText: 'text-rose-600 dark:text-rose-400',
        isLightRed: true,
        topicLabel: 'Economics · Macroeconomics & Foreign Exchange',
        accentBarGradient: 'from-[#FF6B6B] via-[#FF8787] to-[#FFA8A8]',
        cardBorderHover: 'hover:border-rose-300 dark:hover:border-rose-600/50',
        tagBg: 'bg-rose-50 dark:bg-rose-900/20',
        tagText: 'text-rose-700 dark:text-rose-300',
        tagBorder: 'border-rose-200 dark:border-rose-800/40',
      };
    case 4:
      return {
        primaryColor: 'red',
        badgeBg: 'bg-red-50 dark:bg-red-950/60',
        badgeBorder: 'border-red-200 dark:border-red-800/60',
        badgeText: 'text-red-700 dark:text-red-300',
        isLightRed: true,
        topicLabel: 'Mathematical Literacy · Finance, Tax & Data',
        accentBarGradient: 'from-red-600 via-rose-500 to-rose-400',
        cardBorderHover: 'hover:border-red-400 dark:hover:border-red-600/70',
        tagBg: 'bg-red-100 dark:bg-red-950',
        tagText: 'text-red-800 dark:text-red-300',
        tagBorder: 'border-red-300 dark:border-red-700',
      };
    case 5:
      return {
        primaryColor: 'red',
        badgeBg: 'bg-red-50/90 dark:bg-red-950/60',
        badgeBorder: 'border-red-200 dark:border-red-800/60',
        badgeText: 'text-red-700 dark:text-red-300',
        isLightRed: true,
        topicLabel: 'English Home Language · Comprehension & Language',
        accentBarGradient: 'from-red-500 via-rose-400 to-red-400',
        cardBorderHover: 'hover:border-red-300 dark:hover:border-red-700/60',
        tagBg: 'bg-red-50 dark:bg-red-950/80',
        tagText: 'text-red-700 dark:text-red-300',
        tagBorder: 'border-red-200 dark:border-red-800',
      };
    case 6:
      return {
        primaryColor: 'red',
        badgeBg: 'bg-red-50/90 dark:bg-red-950/60',
        badgeBorder: 'border-red-200 dark:border-red-800/50',
        badgeText: 'text-red-700 dark:text-red-300',
        isLightRed: true,
        topicLabel: 'Afrikaans EAT · Leesbegrip, Opsomming & Taal',
        accentBarGradient: 'from-red-500 via-rose-400 to-red-400',
        cardBorderHover: 'hover:border-red-300 dark:hover:border-red-700/60',
        tagBg: 'bg-red-50 dark:bg-slate-800',
        tagText: 'text-red-700 dark:text-slate-300',
        tagBorder: 'border-red-100 dark:border-slate-700',
      };
    default:
      return {
        primaryColor: 'rose',
        badgeBg: 'bg-rose-50/50 dark:bg-slate-800/80',
        badgeBorder: 'border-rose-100 dark:border-slate-700',
        badgeText: 'text-rose-700 dark:text-slate-300',
        isLightRed: true,
        topicLabel: `Subject Paper ${num}`,
        accentBarGradient: 'from-[#FF5252] via-[#FBBF24] to-[#ef4444]',
        cardBorderHover: 'hover:border-rose-300 dark:hover:border-red-700/60',
        tagBg: 'bg-rose-50 dark:bg-slate-800',
        tagText: 'text-rose-700 dark:text-slate-300',
        tagBorder: 'border-rose-100 dark:border-slate-700',
      };
  }
}

/**
 * Parse an uploaded quiz file (JSON or text/markdown/CSV) into a structured QuizPaper.
 */
export function parseUploadedQuizFile(
  filename: string,
  rawContent: string
): { paper: QuizPaper; chapterNumber: number } {
  const chapterNumber = extractChapterNumber(filename, rawContent);
  const chapterStandard = APEX_CURRICULUM_PAPERS[chapterNumber] || APEX_CURRICULUM_PAPERS[1];

  let questions: Question[] = [];
  let customTitle = chapterStandard.title;
  let customSubtitle = chapterStandard.subtitle;
  let customDescription = `Apex Papers Grade 12 ${chapterStandard.moduleName} examination paper.`;

  try {
    const trimmed = rawContent.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      const parsedJson = JSON.parse(trimmed);
      if (Array.isArray(parsedJson)) {
        questions = sanitizeQuestionsArray(parsedJson);
      } else if (parsedJson && typeof parsedJson === 'object') {
        if (parsedJson.title) customTitle = parsedJson.title;
        if (parsedJson.subtitle) customSubtitle = parsedJson.subtitle;
        if (parsedJson.description) customDescription = parsedJson.description;
        if (Array.isArray(parsedJson.questions)) {
          questions = sanitizeQuestionsArray(parsedJson.questions);
        }
      }
    }
  } catch {}

  if (questions.length === 0) {
    questions = parseQuestionsFromText(rawContent);
  }

  const totalMarks = Math.max(questions.length, 1);
  const passMark = Math.ceil(totalMarks * 0.6); // 60% passing standard
  const paperId = `paper-${chapterNumber}-${Date.now().toString(36)}`;

  const paper: QuizPaper = {
    id: paperId,
    subjectId: (chapterStandard.subjectId || 'accounting') as any,
    title: customTitle,
    subtitle: customSubtitle,
    code: chapterStandard.code,
    chapterNumber,
    paperNumber: chapterNumber,
    totalMarks,
    passMark,
    description: customDescription,
    questions,
  };

  return { paper, chapterNumber };
}

function sanitizeQuestionsArray(rawArray: any[]): Question[] {
  const result: Question[] = [];
  rawArray.forEach((item, index) => {
    if (!item || typeof item !== 'object') return;
    const questionText = item.question || item.text || item.prompt;
    if (!questionText || typeof questionText !== 'string') return;

    let options = item.options;
    if (!Array.isArray(options) || options.length < 2) return;

    const formattedOptions: { letter: 'A' | 'B' | 'C' | 'D'; text: string }[] = [];
    const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    
    options.forEach((opt: any, optIdx: number) => {
      if (optIdx >= 4) return;
      if (typeof opt === 'string') {
        formattedOptions.push({ letter: letters[optIdx], text: opt });
      } else if (opt && typeof opt === 'object' && opt.text) {
        formattedOptions.push({ 
          letter: opt.letter && letters.includes(opt.letter.toUpperCase()) ? opt.letter.toUpperCase() : letters[optIdx], 
          text: String(opt.text) 
        });
      }
    });

    if (formattedOptions.length >= 2) {
      while (formattedOptions.length < 4) {
        const letter = letters[formattedOptions.length];
        formattedOptions.push({ letter, text: `None of the above` });
      }

      const rawCorrect = String(item.correctAnswer || item.answer || 'A').toUpperCase();
      const correctAnswer = (['A', 'B', 'C', 'D'].includes(rawCorrect) ? rawCorrect : 'A') as 'A' | 'B' | 'C' | 'D';

      result.push({
        id: typeof item.id === 'number' ? item.id : index + 1,
        category: String(item.category || 'General Assessment'),
        question: questionText.trim(),
        options: formattedOptions,
        correctAnswer,
        explanation: String(item.explanation || 'Official curriculum standard solution.'),
      });
    }
  });

  return result;
}

function parseQuestionsFromText(text: string): Question[] {
  const questions: Question[] = [];
  const rawBlocks = text.split(/(?:^|\n)(?=(?:Q\d+[:.]|\d+[\.)]|Question\s+\d+[:.]))/i);

  rawBlocks.forEach((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed || trimmed.length < 15) return;

    const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) return;

    const questionText = lines[0].replace(/^(?:Q\d+[:.]|\d+[\.)]|Question\s+\d+[:.])\s*/i, '').trim();

    const options: { letter: 'A' | 'B' | 'C' | 'D'; text: string }[] = [];
    let correctAnswer: 'A' | 'B' | 'C' | 'D' = 'A';
    let explanation = 'Curriculum examination standard solution.';

    lines.slice(1).forEach((line) => {
      const optMatch = line.match(/^([A-D])[).:]\s*(.+)$/i);
      if (optMatch) {
        const letter = optMatch[1].toUpperCase() as 'A' | 'B' | 'C' | 'D';
        options.push({ letter, text: optMatch[2].trim() });
      }

      const ansMatch = line.match(/(?:Ans|Answer|Correct(?: Answer)?):\s*([A-D])/i);
      if (ansMatch) {
        correctAnswer = ansMatch[1].toUpperCase() as 'A' | 'B' | 'C' | 'D';
      }

      const expMatch = line.match(/(?:Explanation|Rationale):\s*(.+)$/i);
      if (expMatch) {
        explanation = expMatch[1].trim();
      }
    });

    if (options.length >= 2) {
      const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
      while (options.length < 4) {
        const letter = letters[options.length];
        options.push({ letter, text: `None of the above` });
      }

      questions.push({
        id: idx + 1,
        category: `Examination Question`,
        question: questionText,
        options: options.slice(0, 4),
        correctAnswer,
        explanation,
      });
    }
  });

  return questions;
}
