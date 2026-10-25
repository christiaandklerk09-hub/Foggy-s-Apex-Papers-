export type { ExamAttempt, UserProfile, UserProgressData } from '@/lib/storage';

export type SubjectID = 
  | 'accounting'
  | 'afrikaans_fal'
  | 'business_studies'
  | 'economics'
  | 'english_hg'
  | 'maths_literacy';

export interface SubjectConfig {
  id: SubjectID;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  lightBg: string;
  darkBg: string;
  badgeBorder: string;
  description: string;
  grade: string;
  papersCount: number;
}

export type QuestionType = 
  | 'multiple-choice' 
  | 'numeric' 
  | 'text' 
  | 'step_by_step' 
  | 'table' 
  | 'matching' 
  | 'word_bank' 
  | 'essay';

export interface CalculationStep {
  stepNumber: number;
  title: string;
  instruction: string;
  formula?: string;
  hint?: string;
  marks: number;
  rubricCode: string; // e.g. '1MA', '1CA', '1A', '1SF', '2A', '1M', '1R'
  rubricDescription: string;
  expectedAnswer: string;
  acceptableAnswers?: string[];
  unit?: string;
  inputPlaceholder?: string;
}

export interface Question {
  id: number;
  subjectId?: SubjectID;
  paperId?: string;
  question: string;
  category: string;
  type?: QuestionType;
  marks?: number;
  steps?: CalculationStep[];
  rubricDescription?: string;
  annexureRef?: string;
  acceptableAnswers?: string[];
  // Optional multiple-choice fields
  options?: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  // Answer field (polymorphic: A|B|C|D for MC, string for others)
  correctAnswer: 'A' | 'B' | 'C' | 'D' | string;
  explanation: string;
}

export interface QuizPaper {
  id: string;
  subjectId?: SubjectID;
  title: string;
  subtitle: string;
  code: string;
  chapterNumber?: number;
  paperNumber?: number;
  totalMarks: number;
  passMark: number;
  timeLimitMinutes?: number;
  description: string;
  questions: Question[];
}

export const SUBJECTS: SubjectConfig[] = [
  {
    id: 'economics',
    name: 'Economics',
    shortName: 'Economics',
    icon: 'TrendingUp',
    color: '#FB7185', // Soft coral red
    lightBg: 'bg-rose-50/80',
    darkBg: 'bg-rose-900/30',
    badgeBorder: 'border-rose-300 dark:border-rose-700/60',
    description: 'Macroeconomics, circular flow, business cycles, public sector, foreign exchange & economic pursuits.',
    grade: 'Grade 12',
    papersCount: 2,
  },
  {
    id: 'business_studies',
    name: 'Business Studies',
    shortName: 'Business Studies',
    icon: 'Briefcase',
    color: '#F43F5E', // Rose red
    lightBg: 'bg-rose-50',
    darkBg: 'bg-rose-950/40',
    badgeBorder: 'border-rose-200 dark:border-rose-800/60',
    description: 'Macro & market environments, corporate strategies, business ventures, ethics, and team performance.',
    grade: 'Grade 12',
    papersCount: 2,
  },
  {
    id: 'accounting',
    name: 'Accounting',
    shortName: 'Accounting',
    icon: 'Calculator',
    color: '#EF4444', // Light red / coral red representative of Accounting
    lightBg: 'bg-red-50',
    darkBg: 'bg-red-950/40',
    badgeBorder: 'border-red-200 dark:border-red-800/60',
    description: 'Financial reporting, reconciliation, inventory valuation, cost accounting and corporate governance.',
    grade: 'Grade 12',
    papersCount: 3,
  },
  {
    id: 'maths_literacy',
    name: 'Mathematical Literacy',
    shortName: 'MLIT',
    icon: 'Sigma',
    color: '#E11D48', // Crimson light red
    lightBg: 'bg-rose-100/60',
    darkBg: 'bg-rose-950/50',
    badgeBorder: 'border-rose-200 dark:border-rose-800/60',
    description: 'Financial mathematics, taxation, exchange rates, measurement, maps, plans and data handling.',
    grade: 'Grade 12',
    papersCount: 2,
  },
  {
    id: 'english_hg',
    name: 'English Home Language',
    shortName: 'ENG-HL',
    icon: 'BookOpen',
    color: '#FDA4AF', // Warm rose
    lightBg: 'bg-rose-50',
    darkBg: 'bg-rose-950/30',
    badgeBorder: 'border-rose-200 dark:border-rose-800/40',
    description: 'Critical comprehension, summary writing, cartoon analysis, advertising techniques and editing skills.',
    grade: 'Grade 12',
    papersCount: 2,
  },
  {
    id: 'afrikaans_fal',
    name: 'Afrikaans Eerste Addisionele Taal',
    shortName: 'AFR-FAL',
    icon: 'Languages',
    color: '#EF4444', // Light red representative of the topic
    lightBg: 'bg-red-50/90',
    darkBg: 'bg-red-950/40',
    badgeBorder: 'border-red-200 dark:border-red-800/50',
    description: 'Leesbegrip, opsomming, taalstrukture en -konvensies, woordsoorte en kommunikatiewe taal.',
    grade: 'Graad 12',
    papersCount: 3,
  }
];
