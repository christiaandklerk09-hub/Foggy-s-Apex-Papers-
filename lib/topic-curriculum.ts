import { QuizPaper, Question, SubjectID } from '@/types/quiz';
import { ExamAttempt } from '@/lib/storage';

export interface CurriculumTopic {
  id: string;
  subjectId: SubjectID;
  subjectName: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  grade: string;
  keywords: string[];
  paperCodes: string[];
  color?: string;
  lightBg?: string;
  darkBg?: string;
  borderColor?: string;
  badgeClass?: string;
  accentGradient?: string;
}

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  // ---------------------------------------------------------------------------
  // MATHEMATICAL LITERACY TOPICS
  // ---------------------------------------------------------------------------
  {
    id: 'mlit_finance',
    subjectId: 'maths_literacy',
    subjectName: 'Mathematical Literacy',
    name: 'Finance & Taxation',
    shortName: 'Finance',
    description: 'Income tax brackets, medical tax credits, UIF deductions, tariff systems, simple & compound interest, inflation, exchange rates.',
    iconName: 'Coins',
    grade: 'Grade 12',
    keywords: ['finance', 'tax', 'medical', 'uif', 'tariff', 'interest', 'exchange', 'budget', 'credit', 'rand', 'vat'],
    paperCodes: ['MLIT-TEST-1', 'MLIT-TEST-2', 'MATHLIT-P1-2021', 'MLIT-P1-2026'],
    color: '#EF4444',
    lightBg: 'bg-red-50/70',
    darkBg: 'bg-[#1c080d]/90',
    borderColor: 'border-red-200 dark:border-red-900/60',
    badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
    accentGradient: 'from-red-500 via-rose-400 to-red-500',
  },
  {
    id: 'mlit_measurement',
    subjectId: 'maths_literacy',
    subjectName: 'Mathematical Literacy',
    name: 'Measurement & Conversions',
    shortName: 'Measurement',
    description: 'Perimeter, area, volume, mass, conversions between metric units (litres, cubic metres, grams, km), elapsed time, distance and speed calculations.',
    iconName: 'Ruler',
    grade: 'Grade 12',
    keywords: ['measurement', 'distance', 'speed', 'litre', 'fuel', 'volume', 'area', 'perimeter', 'dimension', 'time'],
    paperCodes: ['MLIT-TEST-1', 'MLIT-TEST-2', 'MATHLIT-P1-2021', 'MLIT-P1-2026'],
    color: '#FB7185',
    lightBg: 'bg-rose-50/70',
    darkBg: 'bg-[#1d070c]/90',
    borderColor: 'border-rose-200 dark:border-rose-900/60',
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    accentGradient: 'from-rose-500 via-red-400 to-rose-400',
  },
  {
    id: 'mlit_maps',
    subjectId: 'maths_literacy',
    subjectName: 'Mathematical Literacy',
    name: 'Maps, Plans & Scale',
    shortName: 'Maps & Plans',
    description: 'Strip maps, floor layouts, elevations, grid referencing, compass directions, bar & numerical scale calculations.',
    iconName: 'Compass',
    grade: 'Grade 12',
    keywords: ['map', 'plan', 'scale', 'elevation', 'grid', 'direction', 'route', 'layout'],
    paperCodes: ['MLIT-TEST-1', 'MLIT-TEST-2', 'MATHLIT-P1-2021', 'MLIT-P1-2026'],
    color: '#F87171',
    lightBg: 'bg-red-50/70',
    darkBg: 'bg-[#1c080d]/90',
    borderColor: 'border-red-200 dark:border-red-900/60',
    badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
    accentGradient: 'from-red-400 via-rose-300 to-red-500',
  },
  {
    id: 'mlit_data',
    subjectId: 'maths_literacy',
    subjectName: 'Mathematical Literacy',
    name: 'Data Handling & Statistics',
    shortName: 'Data Handling',
    description: 'Data tables, bar charts, histograms, box-and-whisker plots, mean, median, mode, quartiles, percentiles, probability.',
    iconName: 'BarChart3',
    grade: 'Grade 12',
    keywords: ['data', 'fuel prices', 'table', 'graph', 'mean', 'median', 'percentile', 'probability', 'statistics', 'chart'],
    paperCodes: ['MLIT-TEST-1', 'MLIT-TEST-2', 'MATHLIT-P1-2021', 'MLIT-P1-2026'],
    color: '#F43F5E',
    lightBg: 'bg-rose-50/70',
    darkBg: 'bg-[#1f090e]/90',
    borderColor: 'border-rose-200 dark:border-rose-900/60',
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    accentGradient: 'from-rose-500 via-red-400 to-rose-500',
  },

  // ---------------------------------------------------------------------------
  // ACCOUNTING TOPICS
  // ---------------------------------------------------------------------------
  {
    id: 'acc_comprehensive',
    subjectId: 'accounting',
    subjectName: 'Accounting',
    name: 'Accounting: Full Curriculum',
    shortName: 'Accounting',
    description: 'Comprehensive accounting review covering financial statements, reconciliation, cost accounting, inventory systems, VAT, and internal controls.',
    iconName: 'Calculator',
    grade: 'Grade 12',
    keywords: ['accounting', 'financial', 'reconciliation', 'cost', 'inventory', 'vat', 'audit'],
    // Order matters: MCQ tests (TEST-1, TEST-2) are listed first, followed by standard exams (P1-2021)
    paperCodes: ['ACC-TEST-1', 'ACC-TEST-2', 'ACC-P1-2021'],
    color: '#EF4444', // Light red representative of the topic
    lightBg: 'bg-red-50/70',
    darkBg: 'bg-[#1c080d]/90',
    borderColor: 'border-red-200 dark:border-red-900/60',
    badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
    accentGradient: 'from-red-500 via-rose-400 to-red-500',
  },

  // ---------------------------------------------------------------------------
  // BUSINESS STUDIES TOPICS
  // ---------------------------------------------------------------------------
  {
    id: 'bus_environment',
    subjectId: 'business_studies',
    subjectName: 'Business Studies',
    name: 'Business Environments & Strategies',
    shortName: 'Environments',
    description: 'Macro, market and micro environments, PESTLE analysis, environmental scanning, integration and defensive strategies.',
    iconName: 'Briefcase',
    grade: 'Grade 12',
    keywords: ['environment', 'macro', 'pestle', 'market', 'strategy', 'legislation', 'bcea', 'eeac'],
    paperCodes: ['BUS-TEST-1', 'BUS-TEST-2', 'BUS-P1-2021', 'BUS-P1-2026'],
    color: '#E11D48',
    lightBg: 'bg-rose-50/70',
    darkBg: 'bg-[#1c080e]/90',
    borderColor: 'border-rose-200 dark:border-rose-900/60',
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    accentGradient: 'from-red-600 via-rose-500 to-red-500',
  },
  {
    id: 'bus_ventures_roles',
    subjectId: 'business_studies',
    subjectName: 'Business Studies',
    name: 'Business Ventures, Roles & Ethics',
    shortName: 'Ventures & Roles',
    description: 'Investment securities, insurance vs assurance, King Code ethical principles, CSR, conflict management, human resources and TQM.',
    iconName: 'Award',
    grade: 'Grade 12',
    keywords: ['venture', 'investment', 'share', 'insurance', 'ethics', 'csr', 'conflict', 'tqm', 'quality', 'recruitment'],
    paperCodes: ['BUS-TEST-1', 'BUS-TEST-2', 'BUS-P1-2021', 'BUS-P1-2026'],
    color: '#F43F5E',
    lightBg: 'bg-rose-50/70',
    darkBg: 'bg-[#1d070d]/90',
    borderColor: 'border-rose-200 dark:border-rose-900/60',
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    accentGradient: 'from-rose-500 via-red-400 to-rose-500',
  },

  // ---------------------------------------------------------------------------
  // ECONOMICS TOPICS
  // ---------------------------------------------------------------------------
  {
    id: 'econ_macro',
    subjectId: 'economics',
    subjectName: 'Economics',
    name: 'Macroeconomics & Circular Flow',
    shortName: 'Macroeconomics',
    description: 'Four-sector circular flow model, national account aggregates, multiplier effect, business cycles, public sector and monetary policy.',
    iconName: 'TrendingUp',
    grade: 'Grade 12',
    keywords: ['macroeconomics', 'circular flow', 'multiplier', 'national account', 'fiscal', 'monetary', 'gdp', 'gni'],
    paperCodes: ['ECON-TEST-1', 'ECON-TEST-2', 'ECON-P1-2021', 'ECON-P1-2026'],
    color: '#EF4444',
    lightBg: 'bg-red-50/70',
    darkBg: 'bg-[#1c080d]/90',
    borderColor: 'border-red-200 dark:border-red-900/60',
    badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
    accentGradient: 'from-red-500 via-rose-400 to-red-500',
  },
  {
    id: 'econ_pursuits_markets',
    subjectId: 'economics',
    subjectName: 'Economics',
    name: 'Economic Pursuits & Market Structures',
    shortName: 'Pursuits & Markets',
    description: 'Industrial development zones, international trade protocols, market structures (perfect competition, monopoly, oligopoly) and inflation.',
    iconName: 'Activity',
    grade: 'Grade 12',
    keywords: ['pursuit', 'trade', 'export', 'market', 'monopoly', 'oligopoly', 'competition', 'inflation', 'tourism'],
    paperCodes: ['ECON-TEST-1', 'ECON-TEST-2', 'ECON-P1-2021', 'ECON-P1-2026'],
    color: '#FB7185',
    lightBg: 'bg-rose-50/70',
    darkBg: 'bg-[#1d080e]/90',
    borderColor: 'border-rose-200 dark:border-rose-900/60',
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    accentGradient: 'from-rose-500 via-red-400 to-rose-400',
  },

  // ---------------------------------------------------------------------------
  // LANGUAGES (ENGLISH & AFRIKAANS)
  // ---------------------------------------------------------------------------
  {
    id: 'lang_english',
    subjectId: 'english_hg',
    subjectName: 'English Home Language',
    name: 'English HL: Comprehension & Visual Literacy',
    shortName: 'English HL',
    description: 'Critical comprehension, summarising, visual cartoon analysis, advertising techniques, propaganda, editing skills and grammar.',
    iconName: 'BookOpen',
    grade: 'Grade 12',
    keywords: ['english', 'comprehension', 'summary', 'cartoon', 'advertising', 'grammar', 'editing', 'punctuation'],
    paperCodes: ['ENG-TEST-1', 'ENG-TEST-2', 'ENG-FAL-P1-2021', 'ENG-P1-2026'],
    color: '#F87171', // Light red representative of the topic
    lightBg: 'bg-red-50/80',
    darkBg: 'bg-[#20080c]/90',
    borderColor: 'border-red-200 dark:border-red-900/60',
    badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
    accentGradient: 'from-red-400 via-rose-400 to-red-500',
  },
  {
    id: 'lang_afrikaans',
    subjectId: 'afrikaans_fal',
    subjectName: 'Afrikaans Eerste Addisionele Taal',
    name: 'Afrikaans FAL: Leesbegrip & Taalstrukture',
    shortName: 'Afrikaans FAL',
    description: 'Leesbegrip, opsommingstegnieke, strokiesprente, advertensies, woordsoorte, tye, ontkenning en samestellings.',
    iconName: 'Sparkles',
    grade: 'Graad 12',
    keywords: ['afrikaans', 'leesbegrip', 'opsomming', 'taalstrukture', 'strokiesprent', 'woordsoorte', 'ontkenning', 'samestellings'],
    paperCodes: ['AFR-TEST-1', 'AFR-TEST-2', 'AFR-TAT-V1-2021', 'AFR-V1-2026'],
    color: '#EF4444', // Light red representative of the topic
    lightBg: 'bg-red-50/80',
    darkBg: 'bg-[#1c080d]/90',
    borderColor: 'border-red-200 dark:border-red-900/60',
    badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
    accentGradient: 'from-red-500 via-rose-400 to-red-500',
  },
];

/**
 * Classifies a question into a curriculum topic based on its category, subjectId, and text
 */
export function classifyQuestionTopic(question: Question): CurriculumTopic {
  const cat = (question.category || '').toLowerCase();
  const text = (question.question || '').toLowerCase();
  const subj = question.subjectId;

  // Filter topics for this subject first
  const subjectTopics = CURRICULUM_TOPICS.filter((t) => !subj || t.subjectId === subj);

  // Exact keyword matching
  for (const topic of subjectTopics) {
    for (const kw of topic.keywords) {
      if (cat.includes(kw) || text.includes(kw)) {
        return topic;
      }
    }
  }

  // Fallback to the first topic of this subject or the first general topic
  return subjectTopics[0] || CURRICULUM_TOPICS[0];
}

export interface TopicGroup {
  topic: CurriculumTopic;
  papers: QuizPaper[];
  questionCount: number;
  totalMarks: number;
  attemptsCount: number;
  averageScore?: number;
  bestScore?: number;
  isMastered: boolean;
}

/**
 * Groups papers by curriculum topic, calculating questions count and user performance
 */
export function groupPapersByTopic(
  papers: QuizPaper[],
  examHistory: ExamAttempt[] = []
): TopicGroup[] {
  const topicMap = new Map<string, { papers: Set<QuizPaper>; questionCount: number; totalMarks: number }>();

  // Initialize all topics
  CURRICULUM_TOPICS.forEach((topic) => {
    topicMap.set(topic.id, { papers: new Set<QuizPaper>(), questionCount: 0, totalMarks: 0 });
  });

  // Assign each paper cleanly to its designated topic (prevents duplicate listing)
  papers.forEach((paper) => {
    if (!paper || !paper.id) return;

    // 1. Check direct paper code match
    const matchingTopics = CURRICULUM_TOPICS.filter((t) => t.paperCodes.includes(paper.code));
    if (matchingTopics.length > 0) {
      matchingTopics.forEach((explicitTopic) => {
        const entry = topicMap.get(explicitTopic.id);
        if (entry && !entry.papers.has(paper)) {
          entry.papers.add(paper);
          entry.questionCount += paper.questions.length;
          entry.totalMarks += paper.totalMarks;
        }
      });
      return;
    }

    // 2. Otherwise find the single best matching primary topic for this subject
    const subjectTopics = CURRICULUM_TOPICS.filter((t) => t.subjectId === paper.subjectId);
    if (subjectTopics.length > 0) {
      // Pick the primary topic for this subject
      const primaryTopic = subjectTopics[0];
      const entry = topicMap.get(primaryTopic.id);
      if (entry && !entry.papers.has(paper)) {
        entry.papers.add(paper);
        entry.questionCount += paper.questions.length;
        entry.totalMarks += paper.totalMarks;
      }
    }
  });

  // Build result array with user progress stats
  return CURRICULUM_TOPICS.map((topic) => {
    const entry = topicMap.get(topic.id) || { papers: new Set<QuizPaper>(), questionCount: 0, totalMarks: 0 };
    const paperList = Array.from(entry.papers);

    // Calculate performance for papers matching this topic
    const relevantAttempts = examHistory.filter((att) =>
      paperList.some((p) => p.id === att.paperId)
    );

    // Sort papers: MCQ tests first (Test 1 before Test 2), followed by official past exams
    const sortedPaperList = paperList.sort((a, b) => {
      const aIsTest = a.id.includes('test') || a.code.includes('TEST');
      const bIsTest = b.id.includes('test') || b.code.includes('TEST');
      if (aIsTest && !bIsTest) return -1;
      if (!aIsTest && bIsTest) return 1;
      if (aIsTest && bIsTest) {
        return a.code.localeCompare(b.code);
      }
      return 0;
    });

    let averageScore: number | undefined;
    let bestScore: number | undefined;
    let isMastered = false;

    if (relevantAttempts.length > 0) {
      const percentages = relevantAttempts.map((a) => a.percentage);
      bestScore = Math.max(...percentages);
      averageScore = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length);
      isMastered = bestScore >= 80;
    }

    return {
      topic,
      papers: sortedPaperList,
      questionCount: entry.questionCount || (sortedPaperList[0]?.questions.length || 0),
      totalMarks: entry.totalMarks || (sortedPaperList[0]?.totalMarks || 150),
      attemptsCount: relevantAttempts.length,
      averageScore,
      bestScore,
      isMastered,
    };
  });
}
