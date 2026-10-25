'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Layers, 
  Lock,
  Home,
  Calculator
} from 'lucide-react';
import { 
  QUIZ_PAPERS, 
  QuizPaper, 
  Question, 
  shufflePaperQuestions, 
  shuffleQuestionOptions,
  seededShuffle,
  prepareAndShuffleOptions
} from '@/lib/quiz-data';
import { QuizHeader } from '@/components/QuizHeader';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionMapModal } from '@/components/QuestionMapModal';
import { QuizResults } from '@/components/QuizResults';
import { PaperSelectorModal } from '@/components/PaperSelectorModal';
import { UserLoginModal } from '@/components/UserLoginModal';
import { GoogleDriveSyncModal } from '@/components/GoogleDriveSyncModal';
import { PaperIngestionModal } from '@/components/PaperIngestionModal';
import { MathScratchpadModal } from '@/components/MathScratchpadModal';
import { HomePage } from '@/components/HomePage';
import { ProgressTile } from '@/components/ProgressTile';
import { getPaperChapterNumber, getPaperChapterBadge } from '@/lib/chapterParser';
import { playSound } from '@/lib/audio';
import { getSmartQuestionBlocks, findBlockForQuestionIndex } from '@/lib/pagination';
import { 
  getActiveUserId, 
  loadUserData, 
  saveUserData, 
  saveQuizDraftSessionLocally,
  recordExamAttempt,
  clearActiveUser,
  subscribeToStorage,
  syncUsersFromCloud,
  syncUserDataFromCloud,
  subscribeToCloudUserData,
  isAdminUser,
  canSkipQuiz,
  isTraineeProfile,
  UserProfile, 
  UserProgressData, 
  DEFAULT_USER,
  INITIAL_PROGRESS_DATA,
  ExamAttempt 
} from '@/lib/storage';

import {
  saveEditedQuestion,
  getLocalCustomQuestions,
  getLocalDeletedQuestions,
  syncCustomQuestionsFromCloud,
  applyCustomQuestionsToPaper
} from '@/lib/custom-questions';
import {
  saveQuizProgress,
  loadQuizProgress,
  clearQuizProgress
} from '@/lib/localProgress';
import { evaluateQuestionAnswer } from '@/lib/evaluation';

/**
 * String-to-number hash helper to convert an active exam code or paper identifier
 * into a predictable, deterministic numeric seed.
 * Produces an identical positive 32-bit integer seed for any given code or identifier.
 */
function getSeedFromCode(codeOrId: string | number | undefined | null): number {
  if (typeof codeOrId === 'number' && !isNaN(codeOrId) && codeOrId !== 0) {
    return Math.abs(Math.floor(codeOrId));
  }
  if (!codeOrId) return 101010;
  const str = String(codeOrId).trim();
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) || 101010;
}

export function QuizAppContent() {
  console.log('QuizAppContent is mounting...');
  // Navigation / View state ('home' by default as requested by user)
  const [viewMode, setViewMode] = useState<'home' | 'quiz' | 'results'>('home');

  // User & Persistent Memory State (null initially when no user is signed in)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userData, setUserData] = useState<UserProgressData>(INITIAL_PROGRESS_DATA);

  // Sync state from client storage & Firestore cloud on mount
  useEffect(() => {
    console.log('QuizApp useEffect: syncing users...');
    // Initial sync of all registered users from Firestore cloud
    syncUsersFromCloud().catch(() => {});

    // Pure local reader - avoids async recursion
    const loadLocal = () => {
      const activeId = getActiveUserId();
      if (!activeId) {
        setCurrentUser(null);
        setUserData(INITIAL_PROGRESS_DATA);
      } else {
        const loaded = loadUserData(activeId);
        // If the active session belongs to default 'trainee', auto clear & sign out
        if (isTraineeProfile(loaded.profile)) {
          clearActiveUser();
          setCurrentUser(null);
          setUserData(INITIAL_PROGRESS_DATA);
        } else {
          setCurrentUser(loaded.profile);
          setUserData(loaded);
        }
      }
    };

    loadLocal();
    const storageUnsub = subscribeToStorage(loadLocal);

    return () => {
      storageUnsub();
    };
  }, []);

  // Stable string user key to prevent re-subscribing on object identity changes
  const activeUserCode = currentUser?.accessCode || currentUser?.id || null;
  const isCurrentUserTrainee = isTraineeProfile(currentUser);

  // Realtime Cloud synchronization for the active user
  useEffect(() => {
    if (!activeUserCode || isCurrentUserTrainee) return;

    // 1. Initial one-time cloud fetch for user
    syncUserDataFromCloud(activeUserCode).then((cloudData) => {
      if (cloudData && !isTraineeProfile(cloudData.profile)) {
        setUserData(cloudData);
      }
    }).catch(() => {});

    // 2. Real-time Firestore snapshot listener
    const unsub = subscribeToCloudUserData(activeUserCode, (liveData) => {
      if (liveData && !isTraineeProfile(liveData.profile)) {
        setUserData(liveData);
      }
    });

    return () => {
      if (unsub) unsub();
    };
  }, [activeUserCode, isCurrentUserTrainee]);

  // Assessment paper selection (curriculum papers collection)
  const [curriculumPapers, setCurriculumPapers] = useState<QuizPaper[]>(QUIZ_PAPERS);

  const fallbackPaper: QuizPaper = useMemo(() => ({
    id: 'no-exams-placeholder',
    subjectId: 'maths_literacy',
    title: 'Apex Papers',
    subtitle: 'Ready to Ingest Examination Papers',
    code: 'APEX-01',
    chapterNumber: 1,
    paperNumber: 1,
    totalMarks: 100,
    passMark: 50,
    timeLimitMinutes: 60,
    description: 'No examination papers currently loaded. Use the AI Ingestion tool to upload DBE Question Papers & Marking Memos.',
    questions: []
  }), []);

  const [currentPaper, setCurrentPaper] = useState<QuizPaper>(() => {
    const defaultPaper = QUIZ_PAPERS[0] || {
      id: 'no-exams-placeholder',
      subjectId: 'maths_literacy',
      title: 'Apex Papers',
      subtitle: 'Ready to Ingest Examination Papers',
      code: 'APEX-01',
      chapterNumber: 1,
      paperNumber: 1,
      totalMarks: 100,
      passMark: 50,
      timeLimitMinutes: 60,
      description: 'No examination papers currently loaded. Use the AI Ingestion tool to upload DBE Question Papers & Marking Memos.',
      questions: []
    };
    const initialSeed = getSeedFromCode(defaultPaper.code || defaultPaper.id);
    return shufflePaperQuestions(defaultPaper, initialSeed);
  });
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(() => {
    const defaultPaper = QUIZ_PAPERS[0] || {
      id: 'no-exams-placeholder',
      subjectId: 'maths_literacy',
      title: 'Apex Papers',
      subtitle: 'Ready to Ingest Examination Papers',
      code: 'APEX-01',
      chapterNumber: 1,
      paperNumber: 1,
      totalMarks: 100,
      passMark: 50,
      timeLimitMinutes: 60,
      description: 'No examination papers currently loaded. Use the AI Ingestion tool to upload DBE Question Papers & Marking Memos.',
      questions: []
    };
    const initialSeed = getSeedFromCode(defaultPaper.code || defaultPaper.id);
    return shufflePaperQuestions(defaultPaper, initialSeed).questions || [];
  });

  // Apply custom questions on mount to avoid hydration mismatch
  useEffect(() => {
    const load = async () => {
      const defaultPaper = QUIZ_PAPERS[0];
      if (!defaultPaper) return;
      const syncRes = await syncCustomQuestionsFromCloud(defaultPaper.id);
      const customMap = getLocalCustomQuestions(defaultPaper.id);
      const customPaper = applyCustomQuestionsToPaper(
        defaultPaper,
        customMap,
        syncRes?.deletedQuestionIds
      );
      const initialSeed = getSeedFromCode(defaultPaper.code || defaultPaper.id);
      const shuffled = shufflePaperQuestions(customPaper, initialSeed);
      
      setCurrentPaper(shuffled);
      setActiveQuestions(shuffled.questions);
      setCurriculumPapers(prev => prev.map(p => p.id === shuffled.id ? shuffled : p));
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`base_paper_${customPaper.id}`, JSON.stringify(customPaper));
      }
    };
    
    load();
    
    const handleEvent = () => load();
    window.addEventListener('sho_question_deleted', handleEvent);
    window.addEventListener('sho_question_updated', handleEvent);
    
    return () => {
      window.removeEventListener('sho_question_deleted', handleEvent);
      window.removeEventListener('sho_question_updated', handleEvent);
    };
  }, []);

  // Quiz progress state (initialized deterministically to prevent hydration mismatch)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [currentSeed, setCurrentSeed] = useState<number>(() => {
    const defaultPaper = QUIZ_PAPERS[0];
    return getSeedFromCode(defaultPaper?.code || defaultPaper?.id || 'APEX-01');
  });

  // Sound preference & timer state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Active attempt being inspected or reviewed
  const [viewingAttempt, setViewingAttempt] = useState<ExamAttempt | null>(null);

  // Modals
  const [isQuestionMapOpen, setIsQuestionMapOpen] = useState(false);
  const [isPaperSelectorOpen, setIsPaperSelectorOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isIngestionModalOpen, setIsIngestionModalOpen] = useState(false);
  const [ingestionSubjectTarget, setIngestionSubjectTarget] = useState<string | undefined>(undefined);
  const [isMathScratchpadOpen, setIsMathScratchpadOpen] = useState(false);

  // Section Locking & Cumulative Scoring Controller State (Requirement)
  const [activeSection, setActiveSection] = useState<number>(1);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [sectionScores, setSectionScores] = useState<Record<number, { score: number; total: number; title?: string }>>({});

  const isHydratedRef = useRef<boolean>(false);

  // Restore saved quiz session safely after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedSession = loadQuizProgress(currentPaper.id);
        const savedSeed = localStorage.getItem(`sho_quiz_seed_${currentPaper.id}`);
        
        if (savedSeed && !isNaN(Number(savedSeed))) {
          setCurrentSeed(Number(savedSeed));
        }

        if (savedSession) {
          if (typeof savedSession.currentQuestionIndex === 'number') {
            setCurrentIndex(savedSession.currentQuestionIndex);
          }
          if (savedSession.answers && typeof savedSession.answers === 'object') {
            setAnswers(savedSession.answers);
          }
          if (Array.isArray(savedSession.flaggedQuestions)) {
            setFlaggedQuestions(new Set(savedSession.flaggedQuestions));
          }
          if (typeof savedSession.secondsElapsed === 'number') {
            setSecondsElapsed(savedSession.secondsElapsed);
          }
          if (typeof savedSession.activeSection === 'number') {
            setActiveSection(savedSession.activeSection);
          }
          if (Array.isArray(savedSession.completedSections)) {
            setCompletedSections(savedSession.completedSections);
          }
          if (savedSession.sectionScores) {
            setSectionScores(savedSession.sectionScores);
          }
        }
      } catch (e) {
        console.error('Failed to restore quiz progress:', e);
      }
      isHydratedRef.current = true;
    }, 0);

    return () => clearTimeout(timer);
  }, [currentPaper.id]);

  // Persist progress on interaction only after initial hydration
  useEffect(() => {
    if (!isHydratedRef.current) return;
    saveQuizProgress(currentPaper.id, {
        currentQuestionIndex: currentIndex,
        answers,
        flaggedQuestions: Array.from(flaggedQuestions),
        secondsElapsed, // Ensure secondsElapsed is part of the saved state
        activeSection,
        completedSections,
        sectionScores,
        seed: currentSeed,
        lastUpdated: Date.now(),
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem(`sho_quiz_seed_${currentPaper.id}`, currentSeed.toString());
    }
  }, [currentIndex, answers, flaggedQuestions, currentSeed, currentPaper.id]);

  // Admin Question Edit Callback
  const handleQuestionUpdated = useCallback((updated: Question) => {
    setActiveQuestions((prev) => {
      const exists = prev.some((q) => q.id === updated.id);
      const next = exists
        ? prev.map((q) => (q.id === updated.id ? updated : q))
        : [...prev, updated];
      next.sort((a, b) => a.id - b.id);
      return next;
    });
    setCurrentPaper((prev) => {
      const exists = prev.questions.some((q) => q.id === updated.id);
      const nextQuestions = exists
        ? prev.questions.map((q) => (q.id === updated.id ? updated : q))
        : [...prev.questions, updated];
      nextQuestions.sort((a, b) => a.id - b.id);
      return {
        ...prev,
        questions: nextQuestions,
        totalMarks: Math.max(1, nextQuestions.length),
      };
    });
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem(`base_paper_${currentPaper.id}`);
        if (raw) {
          const p = JSON.parse(raw);
          const idx = p.questions.findIndex((q: Question) => q.id === updated.id);
          if (idx !== -1) {
            p.questions[idx] = updated;
          } else {
            p.questions.push(updated);
            p.questions.sort((a: Question, b: Question) => a.id - b.id);
          }
          sessionStorage.setItem(`base_paper_${currentPaper.id}`, JSON.stringify(p));
        }
      } catch {}
    }
  }, []);

  // Admin Question Delete Callback
  const handleQuestionDeleted = useCallback((deletedId: number) => {
    setActiveQuestions((prev) => {
      const remaining = prev.filter((q) => q.id !== deletedId);
      return remaining;
    });
    setCurrentPaper((prev) => {
      const remainingQuestions = prev.questions.filter((q) => q.id !== deletedId);
      return {
        ...prev,
        questions: remainingQuestions,
        totalMarks: Math.max(1, remainingQuestions.length),
      };
    });
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[deletedId];
      return copy;
    });
    setFlaggedQuestions((prev) => {
      const nextSet = new Set(prev);
      nextSet.delete(deletedId);
      return nextSet;
    });
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem(`base_paper_${currentPaper.id}`);
        if (raw) {
          const p = JSON.parse(raw);
          p.questions = p.questions.filter((q: Question) => q.id !== deletedId);
          sessionStorage.setItem(`base_paper_${currentPaper.id}`, JSON.stringify(p));
        }
      } catch {}
    }
    setCurrentIndex((prevIdx) => {
      return prevIdx > 0 ? Math.min(prevIdx, Math.max(0, activeQuestions.length - 2)) : 0;
    });
  }, [activeQuestions.length]);

  // Listen for real-time question edits & deletes dispatched from admin modals
  useEffect(() => {
    const handleCustomQuestionEvent = (e: Event) => {
      const customEvt = e as CustomEvent<{ paperId: string; question: Question }>;
      if (customEvt.detail && customEvt.detail.question) {
        const { paperId, question } = customEvt.detail;
        if (paperId === currentPaper.id) {
          handleQuestionUpdated(question);
        }
      }
    };

    const handleCustomQuestionDeletedEvent = (e: Event) => {
      const customEvt = e as CustomEvent<{ paperId: string; questionId: number }>;
      if (customEvt.detail && customEvt.detail.questionId) {
        const { paperId, questionId } = customEvt.detail;
        if (paperId === currentPaper.id) {
          handleQuestionDeleted(questionId);
        }
      }
    };

    window.addEventListener('sho_question_edited', handleCustomQuestionEvent);
    window.addEventListener('sho_question_deleted', handleCustomQuestionDeletedEvent);
    return () => {
      window.removeEventListener('sho_question_edited', handleCustomQuestionEvent);
      window.removeEventListener('sho_question_deleted', handleCustomQuestionDeletedEvent);
    };
  }, [currentPaper.id, handleQuestionUpdated, handleQuestionDeleted]);

  // Synchronize custom questions from database on mount and whenever paper ID changes
  useEffect(() => {
    const paperId = currentPaper.id;
    syncCustomQuestionsFromCloud(paperId).then((result) => {
      const cloudCustoms = result?.questions || {};
      const deletedIds = result?.deletedQuestionIds || [];

      // Base static paper from curriculum definition ensures all static questions are present
      const baseStaticPaper = QUIZ_PAPERS.find((p) => p.id === paperId) || currentPaper;
      const merged = applyCustomQuestionsToPaper(baseStaticPaper, cloudCustoms, deletedIds);
      const shuffled = shufflePaperQuestions(merged, currentSeed);

      setCurrentPaper(shuffled);
      setActiveQuestions(shuffled.questions);
      setCurriculumPapers((prev) =>
        prev.map((p) => (p.id === shuffled.id ? shuffled : p))
      );
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('base_paper', JSON.stringify(merged));
      }
    }).catch(() => {});
  }, [currentPaper.id, currentSeed]);

  // Handle locking and score compilation upon section submission
  const handleCompleteSection = useCallback((sectionId: number, score: number, total: number, nextStartIndex?: number) => {
    // If score was passed as 0 or need recalculating, compute from questions
    const blocks = getSmartQuestionBlocks(activeQuestions);
    const targetBlock = blocks.find((b) => b.blockNumber === sectionId);
    let computedScore = score;
    let computedTotal = total;

    if (targetBlock) {
      let sc = 0;
      targetBlock.questions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) sc++;
      });
      computedScore = sc;
      computedTotal = targetBlock.questions.length;
    }

    setSectionScores((prev) => ({
      ...prev,
      [sectionId]: { 
        score: computedScore, 
        total: computedTotal, 
        title: targetBlock?.title || `Section ${sectionId}` 
      }
    }));
    setCompletedSections((prev) => Array.from(new Set([...prev, sectionId])));
    setActiveSection((prev) => Math.max(prev, sectionId + 1));
    if (soundEnabled) playSound('complete');

    if (typeof nextStartIndex === 'number' && nextStartIndex < activeQuestions.length) {
      setCurrentIndex(nextStartIndex);
    }
  }, [activeQuestions, answers, soundEnabled]);


  // Auto-save active in-progress quiz session locally
  useEffect(() => {
    if (viewMode !== 'quiz' || !currentUser) return;

    const answeredCount = Object.keys(answers).length;
    if (answeredCount > 0 || secondsElapsed > 2) {
      saveQuizProgress(currentPaper.id, {
        currentQuestionIndex: currentIndex,
        answers,
        flaggedQuestions: Array.from(flaggedQuestions),
        secondsElapsed,
        activeSection,
        completedSections,
        sectionScores,
        seed: currentSeed,
        lastUpdated: Date.now(),
      });
    }
  }, [answers, currentIndex, flaggedQuestions, secondsElapsed, currentPaper.id, viewMode, currentUser, activeSection, completedSections, sectionScores, currentSeed]);


  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && viewMode === 'quiz') {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, viewMode]);

  // Handle switching or creating user
  const handleUserChanged = (user: UserProfile) => {
    setCurrentUser(user);
    const loaded = loadUserData(user.id);
    setUserData(loaded);

    // If on quiz, check if new user has a saved session for this paper
    const userSession = loaded.savedSessions?.[currentPaper.id];
    if (userSession && viewMode === 'quiz') {
      setCurrentIndex(userSession.currentIndex || 0);
      setAnswers(userSession.answers || {});
      setFlaggedQuestions(new Set(userSession.flaggedQuestions || []));
      setSecondsElapsed(userSession.secondsElapsed || 0);
      setActiveSection(userSession.activeSection || 1);
      setCompletedSections(userSession.completedSections || []);
      setSectionScores(userSession.sectionScores || {});
    } else if (viewMode === 'quiz') {
      // Start fresh for new user
      setCurrentIndex(0);
      setAnswers({});
      setFlaggedQuestions(new Set());
      setSecondsElapsed(0);
      setActiveSection(1);
      setCompletedSections([]);
      setSectionScores({});
    }
  };

  // Handle signing out
  const handleSignOut = () => {
    clearActiveUser();
    setCurrentUser(null);
    setUserData(INITIAL_PROGRESS_DATA);
    setViewMode('home');
    setIsTimerRunning(false);
  };

  const refreshUserData = async () => {
    if (!currentUser) return;
    console.log('Refreshing user data from cloud...');
    const cloudData = await syncUserDataFromCloud(currentUser.accessCode);
    console.log('Cloud data fetched:', cloudData ? 'success' : 'failed');
    if (cloudData) {
      setUserData(cloudData);
    }
  };

  // Start or resume assessment
  const handleStartPaper = useCallback((paper: QuizPaper, resume: boolean = false) => {
    if (!currentUser) {
      const guestProfile: UserProfile = {
        id: 'candidate_guest',
        accessCode: 'CANDIDATE-12',
        name: 'Grade 12 Candidate',
        club: 'Apex Exam Center',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        avatarColor: '#EF4444',
      };
      setCurrentUser(guestProfile);
    }

    const savedSession = loadQuizProgress(paper.id);
    let seed: number;
    if (resume && savedSession && savedSession.seed) {
      seed = savedSession.seed;
    } else {
      // Generate a fresh random seed for a new attempt to ensure options shuffle uniquely
      seed = Math.floor(Math.random() * 0xffffffff);
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quiz_seed', seed.toString());
    }
    setCurrentSeed(seed);

    // Merge any locally customized questions
    const customMap = getLocalCustomQuestions(paper.id);
    const customizedPaper = applyCustomQuestionsToPaper(paper, customMap);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`base_paper_${customizedPaper.id}`, JSON.stringify(customizedPaper));
    }

    const randomizedPaper = shufflePaperQuestions(customizedPaper, seed);
    setCurrentPaper(randomizedPaper);
    setActiveQuestions(randomizedPaper.questions);

    // Removed async cloud sync overriding here as per user request to prevent cloud from overriding answers.

    if (resume && savedSession) {
      setCurrentIndex(Math.min(savedSession.currentQuestionIndex || 0, randomizedPaper.questions.length - 1));
      setAnswers(savedSession.answers || {});
      setFlaggedQuestions(new Set(savedSession.flaggedQuestions || []));
      setSecondsElapsed(savedSession.secondsElapsed || 0);
      setActiveSection(savedSession.activeSection || 1);
      setCompletedSections(savedSession.completedSections || []);
      setSectionScores(savedSession.sectionScores || {});
    } else {
      // Fresh start: automatically randomized options with Fisher-Yates algorithm
      setCurrentIndex(0);
      setAnswers({});
      setFlaggedQuestions(new Set());
      setSecondsElapsed(0);
      setActiveSection(1);
      setCompletedSections([]);
      setSectionScores({});
    }

    setViewMode('quiz');
    setIsTimerRunning(true);
  }, [currentUser, userData]);

  // Admin Skip to End Shortcut (Requirement 3)
  const handleAdminSkipToEnd = useCallback(() => {
    if (!canSkipQuiz(currentUser)) return;

    // Auto-fill all remaining unanswered questions so exam is 100% complete
    const filledAnswers: Record<number, string> = { ...answers };
    activeQuestions.forEach((q) => {
      if (!filledAnswers[q.id]) {
        filledAnswers[q.id] = String(q.correctAnswer || 'A');
      }
    });
    setAnswers(filledAnswers);

    // Compile cumulative section scores first
    const blocks = getSmartQuestionBlocks(activeQuestions);
    const finalSectionScores: Record<number, { score: number; total: number; title?: string }> = {};
    blocks.forEach((block) => {
      let sc = 0;
      block.questions.forEach((q) => {
        if (evaluateQuestionAnswer(filledAnswers[q.id], q).isCorrect) {
          sc++;
        }
      });
      finalSectionScores[block.blockNumber] = {
        score: sc,
        total: block.questions.length,
        title: block.title,
      };
    });
    setSectionScores(finalSectionScores);

    // Calculate score guaranteed to match section scores sum
    let correct = Object.values(finalSectionScores).reduce((acc, curr) => acc + curr.score, 0);
    const missed: number[] = [];
    const categoryStats: Record<string, { total: number; correct: number }> = {};

    activeQuestions.forEach((q) => {
      const isCorrect = evaluateQuestionAnswer(filledAnswers[q.id], q).isCorrect;
      if (!isCorrect) {
        missed.push(q.id);
      }

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0 };
      }
      categoryStats[q.category].total++;
      if (isCorrect) {
        categoryStats[q.category].correct++;
      }
    });

    const total = activeQuestions.length;
    const percentage = Math.round((correct / total) * 100);
    const effectivePassMark = activeQuestions.length === currentPaper.questions.length 
      ? currentPaper.passMark 
      : Math.ceil(total * 0.8);
    const isPassed = correct >= effectivePassMark;

    const newAttempt: ExamAttempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      paperId: currentPaper.id,
      chapterNumber: getPaperChapterNumber(currentPaper),
      chapterLabel: getPaperChapterBadge(currentPaper)?.topicLabel || currentPaper.code,
      paperTitle: currentPaper.title,
      paperSubtitle: currentPaper.subtitle,
      paperCode: currentPaper.code,
      score: correct,
      totalMarks: total,
      percentage,
      passed: isPassed,
      passMark: effectivePassMark,
      completedAt: new Date().toISOString(),
      timeElapsed: secondsElapsed || 45,
      answers: filledAnswers,
      missedIds: missed,
      candidateName: currentUser?.name || 'Administrator',
      accessCode: currentUser?.accessCode || '',
      clubName: currentUser?.club || 'Apex Papers Operations',
      categoryBreakdown: categoryStats,
      activeSection: blocks.length,
      completedSections: blocks.map((b) => b.blockNumber),
      sectionScores: finalSectionScores,
      seed: currentSeed,
    };

    if (currentUser) {
      const updated = recordExamAttempt(currentUser.id, newAttempt, currentSeed);
      setUserData(updated);
    } else {
      setUserData((prev) => ({
        ...prev,
        examHistory: [newAttempt, ...(prev.examHistory || [])],
      }));
    }

    setViewingAttempt(newAttempt);
    setViewMode('results');
    setIsTimerRunning(false);
    if (soundEnabled) playSound('complete');
  }, [activeQuestions, answers, currentPaper, currentUser, secondsElapsed, soundEnabled, sectionScores, currentSeed]);


  // Option selection
  const handleSelectOption = useCallback((answerVal: string) => {
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answerVal,
    }));

    if (soundEnabled) {
      playSound('select');
    }
  }, [activeQuestions, currentIndex, soundEnabled]);

  // Toggle flag
  const handleToggleFlag = useCallback(() => {
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;

    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });

    if (soundEnabled) {
      playSound('flag');
    }
  }, [activeQuestions, currentIndex, soundEnabled]);

  // Prev / Next navigation
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      if (soundEnabled) playSound('select');
    }
  }, [currentIndex, soundEnabled]);

  const handleNext = useCallback(() => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      if (soundEnabled) playSound('select');
    }
  }, [currentIndex, activeQuestions.length, soundEnabled]);

  // Jump to first unanswered question shortcut
  const handleJumpToFirstUnanswered = useCallback(() => {
    const firstUnansweredIndex = activeQuestions.findIndex((q) => answers[q.id] === undefined);
    if (firstUnansweredIndex !== -1) {
      setCurrentIndex(firstUnansweredIndex);
      if (soundEnabled) playSound('select');
    }
  }, [activeQuestions, answers, soundEnabled]);

  // Submit Quiz (locked until at least 80% of questions answered - e.g., 60 of 75 questions, or 24 of 30 questions)
  const handleSubmitQuiz = useCallback(() => {
    const minRequired = Math.ceil(activeQuestions.length * 0.8);
    const currentAnswered = Object.keys(answers).length;
    if (currentAnswered < minRequired) {
      if (soundEnabled) playSound('incorrect');
      return;
    }

    // Compile cumulative section scores first
    const blocks = getSmartQuestionBlocks(activeQuestions);
    const finalSectionScores: Record<number, { score: number; total: number; title?: string }> = {};
    blocks.forEach((block) => {
      let sc = 0;
      block.questions.forEach((q) => {
        if (evaluateQuestionAnswer(answers[q.id], q).isCorrect) {
          sc++;
        }
      });
      finalSectionScores[block.blockNumber] = {
        score: sc,
        total: block.questions.length,
        title: block.title,
      };
    });
    setSectionScores(finalSectionScores);

    // Calculate score guaranteed to match section scores sum
    let correct = Object.values(finalSectionScores).reduce((acc, curr) => acc + curr.score, 0);
    const missed: number[] = [];
    const categoryStats: Record<string, { total: number; correct: number }> = {};

    activeQuestions.forEach((q) => {
      const isCorrect = evaluateQuestionAnswer(answers[q.id], q).isCorrect;
      if (!isCorrect) {
        missed.push(q.id);
      }

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0 };
      }
      categoryStats[q.category].total++;
      if (isCorrect) {
        categoryStats[q.category].correct++;
      }
    });

    const total = activeQuestions.length;
    const percentage = Math.round((correct / total) * 100);
    const effectivePassMark = activeQuestions.length === currentPaper.questions.length
      ? currentPaper.passMark
      : Math.ceil(total * 0.8);
    const isPassed = correct >= effectivePassMark;

    // Record attempt into permanent memory
    const newAttempt: ExamAttempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      paperId: currentPaper.id,
      chapterNumber: getPaperChapterNumber(currentPaper),
      chapterLabel: getPaperChapterBadge(currentPaper)?.topicLabel || currentPaper.code,
      paperTitle: currentPaper.title,
      paperSubtitle: currentPaper.subtitle,
      paperCode: currentPaper.code,
      score: correct,
      totalMarks: total,
      percentage,
      passed: isPassed,
      passMark: effectivePassMark,
      completedAt: new Date().toISOString(),
      timeElapsed: secondsElapsed,
      answers,
      missedIds: missed,
      candidateName: currentUser?.name || 'Apex Papers Candidate',
      accessCode: currentUser?.accessCode || '',
      clubName: currentUser?.club || 'Apex High School',
      categoryBreakdown: categoryStats,
      activeSection: blocks.length,
      completedSections: blocks.map((b) => b.blockNumber),
      sectionScores: finalSectionScores,
      seed: currentSeed,
    };

    if (currentUser) {
      const updated = recordExamAttempt(currentUser.id, newAttempt, currentSeed);
      setUserData(updated);
    } else {
      setUserData((prev) => ({
        ...prev,
        examHistory: [newAttempt, ...(prev.examHistory || [])],
      }));
    }

    setViewingAttempt(newAttempt);
    setViewMode('results');
    setIsTimerRunning(false);
    if (soundEnabled) playSound('complete');
  }, [activeQuestions, answers, currentPaper, currentUser, secondsElapsed, soundEnabled, sectionScores, currentSeed]);

  // Retake full quiz
  const handleRetake = () => {
    // Generate a fresh randomized/shifted seed so retake shuffles anew each time
    const baseSeed = viewingAttempt?.seed 
      || currentSeed 
      || getSeedFromCode(currentPaper.code || currentPaper.id);
    const freshSeed = baseSeed + Math.floor(Math.random() * 100000);

    setCurrentSeed(freshSeed);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quiz_seed', freshSeed.toString());
    }
    setViewingAttempt(null);

    // Always build fresh base paper from static definitions + custom modifications
    const rawPaper = QUIZ_PAPERS.find((p) => p.id === currentPaper.id)
      || curriculumPapers.find((p) => p.id === currentPaper.id)
      || currentPaper;
    const customMap = getLocalCustomQuestions(rawPaper.id);
    const deletedList = getLocalDeletedQuestions(rawPaper.id);
    const base = applyCustomQuestionsToPaper(rawPaper, customMap, deletedList);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`base_paper_${base.id}`, JSON.stringify(base));
    }

    console.log('[Shuffle] 🔀 Retaking quiz with fresh shuffled options and seed:', freshSeed);
    const reshuffledPaper = shufflePaperQuestions(base, freshSeed);
    setActiveQuestions(reshuffledPaper.questions);
    setCurrentPaper(reshuffledPaper);

    setCurrentIndex(0);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setActiveSection(1);
    setCompletedSections([]);
    setSectionScores({});
    setViewMode('quiz');
    setSecondsElapsed(0);
    setIsTimerRunning(true);
  };

  // Practice only missed questions
  const handleRetryMissed = (missedIds: number[]) => {
    const missedQuestions = currentPaper.questions.filter((q) => missedIds.includes(q.id));
    if (missedQuestions.length === 0) return;

    setViewingAttempt(null);
    const baseSeed = viewingAttempt?.seed 
      || currentSeed 
      || getSeedFromCode(currentPaper.code || currentPaper.id);
    const retrySeed = baseSeed + Math.floor(Math.random() * 100000);

    setCurrentSeed(retrySeed);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quiz_seed', retrySeed.toString());
    }

    console.log('[Shuffle] 🔀 Retrying missed questions with new randomized options and seed:', retrySeed);
    // Shuffle the options of the missed questions, but preserve their order as requested
    const reshuffledMissed = missedQuestions.map((q) => 
      shuffleQuestionOptions(q, retrySeed + (q.id * 100))
    );
    setActiveQuestions(reshuffledMissed);
    setCurrentPaper((prev) => ({
      ...prev,
      title: prev.title.includes(' (Retry Missed)') ? prev.title : `${prev.title} (Retry Missed)`,
      questions: reshuffledMissed,
      totalMarks: reshuffledMissed.length,
      passMark: Math.ceil(reshuffledMissed.length * 0.8),
    }));
    setCurrentIndex(0);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setActiveSection(1);
    setCompletedSections([]);
    setSectionScores({});
    setViewMode('quiz');
    setSecondsElapsed(0);
    setIsTimerRunning(true);
  };


  // View exam history attempt
  const handleViewExamHistoryItem = (attempt: ExamAttempt) => {
    const foundPaper = QUIZ_PAPERS.find((p) => p.id === attempt.paperId) || currentPaper;
    const attemptSeed = attempt.seed || getSeedFromCode(foundPaper.code || foundPaper.id);
    setCurrentSeed(attemptSeed);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quiz_seed', attemptSeed.toString());
    }
    const recreatedPaper = shufflePaperQuestions(foundPaper, attemptSeed);
    
    if (attempt.paperTitle?.includes('(Retry Missed)')) {
      const answeredIds = Object.keys(attempt.answers).map(Number);
      recreatedPaper.questions = recreatedPaper.questions.filter((q) => answeredIds.includes(q.id));
      recreatedPaper.title = attempt.paperTitle;
      recreatedPaper.totalMarks = attempt.totalMarks;
      recreatedPaper.passMark = attempt.passMark;
    }

    setViewingAttempt(attempt);
    setCurrentPaper(recreatedPaper);
    setActiveQuestions(recreatedPaper.questions);
    setAnswers(attempt.answers);
    setFlaggedQuestions(new Set());
    setSecondsElapsed(attempt.timeElapsed);
    setViewMode('results');
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (viewMode !== 'quiz' || isQuestionMapOpen || isPaperSelectorOpen || isLoginModalOpen) {
        return;
      }

      if (e.key === 'ArrowRight') {
        if (currentIndex < activeQuestions.length - 1) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          handlePrev();
        }
      } else if (e.key.toLowerCase() === 'a' || e.key === '1') {
        handleSelectOption('A');
      } else if (e.key.toLowerCase() === 'b' || e.key === '2') {
        handleSelectOption('B');
      } else if (e.key.toLowerCase() === 'c' || e.key === '3') {
        handleSelectOption('C');
      } else if (e.key.toLowerCase() === 'd' || e.key === '4') {
        handleSelectOption('D');
      } else if (e.key.toLowerCase() === 'f') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentIndex, 
    activeQuestions.length, 
    viewMode, 
    isQuestionMapOpen, 
    isPaperSelectorOpen, 
    isLoginModalOpen,
    handleNext,
    handlePrev,
    handleSelectOption,
    handleToggleFlag
  ]);

  // Scroll to top when switching views or papers
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPaper.id, viewMode]);

  const currentQuestion = activeQuestions[currentIndex];
  const totalCount = activeQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const requiredSubmitCount = Math.ceil(totalCount * 0.8);
  const canSubmit = answeredCount >= requiredSubmitCount;
  const blocks = React.useMemo(() => getSmartQuestionBlocks(activeQuestions), [activeQuestions]);
  const activeBlock = React.useMemo(() => findBlockForQuestionIndex(blocks, currentIndex), [blocks, currentIndex]);

  return (    <div className="min-h-screen w-full bg-red-50 dark:bg-rose-950 text-slate-800 dark:text-rose-50 flex flex-col font-sans selection:bg-red-200 selection:text-red-900 relative transition-colors bg-paper-grid">
      
      {/* Top Header with vintage ring logo and home navigation */}
      <div className="border-b border-rose-100 dark:border-rose-950/70 bg-white/95 dark:bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <QuizHeader
          currentPaper={currentPaper}
          secondsElapsed={secondsElapsed}
          onOpenPaperSelector={() => setIsPaperSelectorOpen(true)}
          onOpenCandidateModal={() => setIsLoginModalOpen(true)}
          onOpenDriveModal={() => setIsDriveModalOpen(true)}
          onOpenIngestionModal={() => setIsIngestionModalOpen(true)}
          candidateName={currentUser?.name}
          avatarImage={currentUser?.avatarImage}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onGoHome={() => setViewMode('home')}
          isHomeView={viewMode === 'home'}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col justify-start">
        {viewMode === 'home' && (
          <HomePage
            papers={curriculumPapers}
            currentUser={currentUser}
            userData={userData}
            onSelectPaperToStart={(paper, resume) => handleStartPaper(paper, resume)}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onUserChanged={handleUserChanged}
            onSignOut={handleSignOut}
            onViewExamHistoryItem={handleViewExamHistoryItem}
            onRefreshData={refreshUserData}
            onOpenDriveModal={() => setIsDriveModalOpen(true)}
            onOpenIngestionModal={(targetSub) => {
              setIngestionSubjectTarget(targetSub);
              setIsIngestionModalOpen(true);
            }}
          />
        )}

        {viewMode === 'results' && (
          <div className="max-w-4xl w-full mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-20">
            <QuizResults
              paper={currentPaper}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
              timeElapsed={secondsElapsed}
              candidateName={viewingAttempt?.candidateName || currentUser?.name || 'Matric Candidate'}
              candidateClub={viewingAttempt?.clubName || currentUser?.club || 'Apex Papers Exam Center'}
              attemptDate={viewingAttempt?.completedAt}
              sectionScores={viewingAttempt?.sectionScores || sectionScores}
              onRetake={handleRetake}
              onRetryMissed={handleRetryMissed}
              onSwitchPaper={() => setIsPaperSelectorOpen(true)}
              onGoHome={() => setViewMode('home')}
            />
          </div>
        )}

        {viewMode === 'quiz' && (
          <div className="max-w-4xl w-full mx-auto px-3 sm:px-4 pt-3 sm:pt-6 pb-24 sm:pb-28 space-y-4">
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={totalCount}
                allQuestions={activeQuestions}
                paperId={currentPaper.id}
                selectedAnswer={answers[currentQuestion.id]}
                isFlagged={flaggedQuestions.has(currentQuestion.id)}
                isAdmin={isAdminUser(currentUser)}
                canSkip={canSkipQuiz(currentUser)}
                activeSection={activeSection}
                completedSections={completedSections}
                onCompleteSection={handleCompleteSection}
                onSelectOption={handleSelectOption}
                onToggleFlag={handleToggleFlag}
                onPrev={handlePrev}
                onNext={handleNext}
                onSubmitQuiz={handleSubmitQuiz}

                onAdminSkipToEnd={handleAdminSkipToEnd}
                onQuestionUpdated={handleQuestionUpdated}
                onQuestionDeleted={handleQuestionDeleted}
                onJumpToQuestion={(idx) => setCurrentIndex(idx)}
                canSubmit={canSubmit}
                answeredCount={answeredCount}
                requiredSubmitCount={requiredSubmitCount}
              />
            )}
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar (Only visible when active in quiz view) */}
      {viewMode === 'quiz' && (
        <div className="fixed bottom-0 left-0 right-0 w-full max-w-[100vw] z-20 bg-white/95 dark:bg-[#100608]/95 backdrop-blur-xl border-t border-rose-100 dark:border-rose-950/70 px-3 sm:px-4 py-2.5 sm:py-3.5 shadow-[0_-4px_20px_rgba(244,63,94,0.06)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)] transition-colors">
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              {/* Home button in bottom bar */}
              <button
                id="bottom-home-btn"
                onClick={() => setViewMode('home')}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-[#250e14] dark:hover:bg-[#34131b] text-rose-900 hover:text-red-900 dark:text-rose-300 dark:hover:text-[#FF6B6B] border border-rose-200 dark:border-rose-900/50 text-xs font-bold transition-all cursor-pointer shadow-xs"
                title="Return to Portal Home (Auto-saved)"
              >
                <Home className="w-3.5 h-3.5 text-red-600 dark:text-[#FF6B6B]" />
                <span className="hidden xs:inline">Home</span>
              </button>

              {/* View Question Map Button */}
              <button
                id="view-question-map-bottom-btn"
                onClick={() => setIsQuestionMapOpen(true)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-[#250e14]/90 text-red-600 dark:text-[#FF6B6B] dark:hover:bg-[#34131b] border border-rose-200 dark:border-rose-800/40 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
              >
                <LayoutGrid className="w-4 h-4 text-red-600 dark:text-[#FF4D4D]" />
                <span>Map ({totalCount})</span>
              </button>


            </div>

            {/* Progress counter & bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right">
                <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-rose-200">
                  <strong className="text-red-600 dark:text-[#FF6B6B] font-extrabold">{answeredCount}</strong>
                  /{totalCount} done
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-16 sm:w-28 h-2 bg-rose-100/70 dark:bg-[#250e14] rounded-full overflow-hidden border border-rose-200 dark:border-rose-900/50">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-rose-400 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(244,63,94,0.35)]"
                  style={{ width: `${(answeredCount / totalCount) * 100}%` }}
                />
              </div>

              {/* Quick Submit button or locked status */}
              {canSubmit ? (
                <button
                  id="bottom-quick-submit-btn"
                  onClick={handleSubmitQuiz}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              ) : (
                <div 
                  id="bottom-submit-locked-badge"
                  className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-[#1f0b10] text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 text-[11px] font-semibold select-none"
                  title={`Answer at least ${requiredSubmitCount} questions to submit`}
                >
                  <Lock className="w-3 h-3 text-rose-400 dark:text-rose-400" />
                  <span>{answeredCount}/{requiredSubmitCount} min</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Modals */}
      <QuestionMapModal
        isOpen={isQuestionMapOpen}
        onClose={() => setIsQuestionMapOpen(false)}
        questions={activeQuestions}
        currentIndex={currentIndex}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        completedSections={completedSections}
        onJumpToQuestion={(idx) => setCurrentIndex(idx)}
        onSubmitQuiz={handleSubmitQuiz}
        canSubmit={canSubmit}
        requiredSubmitCount={requiredSubmitCount}
      />


      <PaperSelectorModal
        isOpen={isPaperSelectorOpen}
        onClose={() => setIsPaperSelectorOpen(false)}
        currentPaperId={currentPaper.id}
        papers={curriculumPapers}
        onSelectPaper={(paper) => handleStartPaper(paper, false)}
        onOpenIngestionModal={() => setIsIngestionModalOpen(true)}
      />

      <UserLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onUserChanged={handleUserChanged}
        onInspectAttempt={handleViewExamHistoryItem}
        onSelectPaper={(paper) => handleStartPaper(paper, false)}
        onOpenIngestionModal={() => setIsIngestionModalOpen(true)}
      />

      <GoogleDriveSyncModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        currentUser={currentUser}
        userProgress={userData}
      />

      <PaperIngestionModal
        isOpen={isIngestionModalOpen}
        onClose={() => {
          setIsIngestionModalOpen(false);
          setIngestionSubjectTarget(undefined);
        }}
        initialSubjectId={ingestionSubjectTarget}
        onPaperIngested={(paperId) => {
          const target = curriculumPapers.find(p => p.id === paperId) || QUIZ_PAPERS.find(p => p.id === paperId);
          if (target) {
            handleStartPaper(target, false);
          }
        }}
        onStartPaper={(paper) => handleStartPaper(paper, false)}
      />

      <MathScratchpadModal
        isOpen={isMathScratchpadOpen}
        onClose={() => setIsMathScratchpadOpen(false)}
      />
    </div>
  );
}
