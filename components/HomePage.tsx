'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  User, 
  Layers, 
  Trophy, 
  AlertCircle,
  Sparkles, 
  FileCheck, 
  ChevronRight, 
  Lock, 
  KeyRound, 
  LogOut, 
  Shield, 
  Trash2,
  Loader2,
  Home as HomeIcon,
  BarChart3,
  Activity,
  Zap,
  Waves,
  Stethoscope,
  Compass,
  Check,
  Search,
  Calendar,
  AlertTriangle,
  Sun,
  Moon,
  Cloud,
  Coins,
  Ruler,
  Briefcase,
  TrendingUp,
  Calculator as CalcIcon
} from 'lucide-react';
import { QuizPaper, SUBJECTS, SubjectID } from '@/lib/quiz-data';
import { getPaperChapterBadge, getPaperChapterNumber } from '@/lib/chapterParser';
import { groupPapersByTopic, TopicGroup } from '@/lib/topic-curriculum';
import { useAppTheme } from '@/lib/theme';
import { ChapterCarouselCard } from './ChapterCarouselCard';
import { SubjectTestsView } from './SubjectTestsView';
import { 
  UserProfile, 
  UserProgressData, 
  ExamAttempt,
  isAdminUser,
  getKeyCapacity,
  MAX_KEYS_LIMIT,
  ADMIN_ACCESS_CODE,
  isMasterKeyCode,
  loginByAccessCodeAsync,
  loginAsCandidate,
  clearUserExamHistory,
  archiveExamAttempt,
  saveCandidateSwimTime,
  purgeAllApplicationCacheAndResync
} from '@/lib/storage';
import { loadQuizProgress } from '@/lib/localProgress';
import { VintageLifeRing } from './VintageLifeRing';

function TopicIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'Coins':
      return <Coins className={className} />;
    case 'Ruler':
      return <Ruler className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'Calculator':
      return <CalcIcon className={className} />;
    case 'FileCheck':
      return <FileCheck className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'BookOpen':
    default:
      return <BookOpen className={className} />;
  }
}

function AcademicTargetTracker({ 
  candidateId, 
  isDark, 
  initialTime 
}: { 
  candidateId: string, 
  isDark: boolean, 
  initialTime?: string 
}) {
  const [targetScore, setTargetScore] = useState(initialTime || '85%');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await saveCandidateSwimTime(candidateId, targetScore);
    setSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className={`p-5 sm:p-6 rounded-3xl border space-y-3 transition-colors ${
      isDark
        ? 'bg-[#15070a]/90 border-rose-900/60 shadow-lg'
        : 'bg-gradient-to-br from-rose-50/80 via-white to-red-50/40 border-rose-200/90 shadow-md sunlit-card'
    }`}>
      <span className={`text-[10px] font-bold tracking-wider uppercase flex items-center justify-between ${
        isDark ? 'text-rose-400' : 'text-rose-700'
      }`}>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          Grade 12 NSC Distinction Goal
        </span>
        {submitted && <span className="text-emerald-500 font-bold">Target Saved ✓</span>}
      </span>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="text" 
          placeholder="Target % (e.g., 85%)" 
          value={targetScore} 
          onChange={(e) => setTargetScore(e.target.value)}
          className={`flex-1 border px-3.5 py-2 text-sm rounded-xl focus:outline-none transition-all ${
            isDark 
              ? 'bg-[#1b080d] border-rose-900/70 focus:border-rose-500 text-white placeholder:text-rose-300/40 focus:ring-1 focus:ring-rose-500/30' 
              : 'bg-white border-rose-200 focus:border-rose-400 text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-rose-300'
          }`}
          required
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs disabled:opacity-50 bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white border border-rose-500 cursor-pointer shadow-rose-600/30"
        >
          {isSubmitting ? 'Saving...' : 'Set Goal'}
        </button>
      </form>
      <p className={`text-[11px] ${isDark ? 'text-rose-300/70' : 'text-slate-500'}`}>
        Set your National Senior Certificate (NSC) target distinction percentage.
      </p>
    </section>
  );
}

interface HomePageProps {
  papers: QuizPaper[];
  currentUser: UserProfile | null;
  userData: UserProgressData;
  onSelectPaperToStart: (paper: QuizPaper, resume?: boolean) => void;
  onOpenLoginModal: () => void;
  onUserChanged: (user: UserProfile) => void;
  onSignOut: () => void;
  onViewExamHistoryItem: (attempt: ExamAttempt) => void;
  onRefreshData: () => Promise<void>;
  onOpenDriveModal?: () => void;
  onOpenIngestionModal?: (subjectId?: SubjectID) => void;
  onOpenPaperSelectorModal?: (subjectId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  papers,
  currentUser,
  userData,
  onSelectPaperToStart,
  onOpenLoginModal,
  onUserChanged,
  onSignOut,
  onViewExamHistoryItem,
  onRefreshData,
  onOpenDriveModal,
  onOpenIngestionModal,
  onOpenPaperSelectorModal,
}) => {
  const isAdmin = !!currentUser && isAdminUser(currentUser);
  const keyCapacity = getKeyCapacity();

  // Active view tab for bottom navigation: home | quizzes | analytics | profile
  const [activeTab, setActiveTab] = useState<'home' | 'quizzes' | 'analytics' | 'profile'>('home');
  const [selectedSubject, setSelectedSubject] = useState<SubjectID | 'all'>('all');
  
  // Dedicated Subject Exam Hub Page (when clicking scroller or carousel, directs directly to all tests for that subject)
  const [activeSubjectView, setActiveSubjectView] = useState<SubjectID | null>(null);

  const filteredPapers = useMemo(() => {
    if (selectedSubject === 'all') return papers;
    return (papers || []).filter(p => p && p.subjectId === selectedSubject);
  }, [papers, selectedSubject]);

  // Exam history list mapped directly from confirmed database state
  const displayedExamHistory = useMemo(() => {
    return userData.examHistory || [];
  }, [userData.examHistory]);

  // Determine the last attempted paper ID from exam history or local storage
  const lastAttemptedPaperId = useMemo(() => {
    if (displayedExamHistory && displayedExamHistory.length > 0) {
      return displayedExamHistory[0].paperId;
    }
    try {
      return localStorage.getItem('sho_last_viewed_module') || null;
    } catch {
      return null;
    }
  }, [displayedExamHistory]);

  // Carousel Papers: Include all papers in carousel
  const carouselPapers = useMemo(() => {
    return filteredPapers;
  }, [filteredPapers]);

  // Featured protocol chapter for hero card (initialized deterministically to prevent hydration mismatch)
  const [featuredPaperId, setFeaturedPaperId] = useState<string>(() => {
    const econ = carouselPapers.find(p => p?.subjectId === 'economics');
    return econ?.id || carouselPapers[0]?.id || papers?.[0]?.id || '';
  });

  // Client-side hydration sync for last viewed module
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sho_last_viewed_module');
      if (saved && carouselPapers.some((p) => p?.id === saved)) {
        setFeaturedPaperId(saved);
      } else {
        const econPaper = carouselPapers.find(p => p?.subjectId === 'economics');
        if (econPaper) {
          setFeaturedPaperId(econPaper.id);
        } else if (carouselPapers.length > 0 && carouselPapers[0]?.id) {
          setFeaturedPaperId(carouselPapers[0].id);
        }
      }
    } catch {}
  }, [carouselPapers]);

  // Current active index in the carousel
  const currentCarouselIndex = useMemo(() => {
    if (carouselPapers.length === 0) return 0;
    const idx = carouselPapers.findIndex(p => p?.id === featuredPaperId);
    return idx !== -1 ? idx : 0;
  }, [carouselPapers, featuredPaperId]);

  const featuredPaper = useMemo(() => {
    if ((!carouselPapers || carouselPapers.length === 0) && (!papers || papers.length === 0)) return null;
    return carouselPapers[currentCarouselIndex] || carouselPapers[0] || papers[0] || null;
  }, [carouselPapers, currentCarouselIndex, papers]);

  const handleSelectCarouselIndex = (index: number) => {
    if (carouselPapers[index]?.id) {
      setFeaturedPaperId(carouselPapers[index].id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sho_last_viewed_module', carouselPapers[index].id);
      }
    }
  };

  // Quick unlock state on home page
  const [quickCode, setQuickCode] = useState('');
  const [quickError, setQuickError] = useState<string | null>(null);
  const [quickMasterPrompt, setQuickMasterPrompt] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Deletion state
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingAttemptId, setDeletingAttemptId] = useState<string | null>(null);

  // Search filter for History Directory in Profile tab
  
  const [isClearingHistory, setIsClearingHistory] = useState(false);

  const handleClearHistory = async () => {
    if (!currentUser) return;
    const confirmed = window.confirm('Are you sure you want to permanently delete all exam history? This cannot be undone.');
    if (!confirmed) return;
    setIsClearingHistory(true);
    try {
      await clearUserExamHistory(currentUser.accessCode);
      await onRefreshData();
      window.alert('Exam history cleared successfully.');
    } catch (err) {
      window.alert('Failed to clear exam history.');
    } finally {
      setIsClearingHistory(false);
    }
  };

  const [isPurgingCache, setIsPurgingCache] = useState(false);
  const handlePurgeCacheAndResync = async () => {
    setIsPurgingCache(true);
    try {
      await purgeAllApplicationCacheAndResync(currentUser?.accessCode);
      await onRefreshData();
      window.alert('Local cache purged and fresh cloud data re-synced successfully!');
    } catch {
      window.alert('Cache cleared locally.');
    } finally {
      setIsPurgingCache(false);
    }
  };

  const handleStartPaper = (paper: QuizPaper, resume: boolean = false) => {
    const attempts = userData.examHistory ? userData.examHistory.filter((e) => e.paperId === paper.id) : [];
    if (!resume && attempts.length >= 3) {
      window.alert(`Maximum attempts (3) reached for this chapter.\n\nYou have completed this chapter ${attempts.length} times. Please contact your administrator or use the 'Clear History' option to take it again.`);
      return;
    }
    onSelectPaperToStart(paper, resume);
  };

  const [historySearch, setHistorySearch] = useState('');

  // Best attempt for currently active featured paper in carousel
  const activePaperBestAttempt = useMemo(() => {
    if (!featuredPaper || !featuredPaper.id) return null;
    const attempts = displayedExamHistory.filter(e => e.paperId === featuredPaper.id);
    return attempts.sort((a, b) => b.percentage - a.percentage)[0] || null;
  }, [displayedExamHistory, featuredPaper]);

  // Filtered by search query in profile tab
  const filteredExamHistory = useMemo(() => {
    if (!historySearch.trim()) return displayedExamHistory;
    const q = historySearch.toLowerCase();
    return displayedExamHistory.filter(item => 
      item.paperSubtitle.toLowerCase().includes(q) ||
      (item.candidateName && item.candidateName.toLowerCase().includes(q)) ||
      (item.paperId && item.paperId.toLowerCase().includes(q))
    );
  }, [displayedExamHistory, historySearch]);

  // Topic-based categorization state for Quizzes view
  const [homeTopicSubject, setHomeTopicSubject] = useState<string>('all');
  const [homeTopicSearch, setHomeTopicSearch] = useState<string>('');
  const [homeViewMode, setHomeViewMode] = useState<'topics' | 'papers'>('topics');

  const topicGroups = useMemo(() => {
    return groupPapersByTopic(papers, displayedExamHistory);
  }, [papers, displayedExamHistory]);

  const filteredTopicGroups = useMemo(() => {
    return topicGroups.filter((group) => {
      // 1. Subject filter
      if (homeTopicSubject !== 'all') {
        if (homeTopicSubject === 'languages') {
          if (group.topic.subjectId !== 'english_hg' && group.topic.subjectId !== 'afrikaans_fal') {
            return false;
          }
        } else if (group.topic.subjectId !== homeTopicSubject) {
          return false;
        }
      }

      // 2. Search query filter
      if (homeTopicSearch.trim()) {
        const q = homeTopicSearch.toLowerCase();
        const matchesTopic = group.topic.name.toLowerCase().includes(q) ||
          group.topic.description.toLowerCase().includes(q) ||
          group.topic.subjectName.toLowerCase().includes(q);
        const matchesPaper = group.papers.some(
          (p) => p.subtitle.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
        );
        return matchesTopic || matchesPaper;
      }

      return group.papers.length > 0;
    });
  }, [topicGroups, homeTopicSubject, homeTopicSearch]);

  // Check if there is an active in-progress quiz session
  const [activeSession, setActiveSession] = useState<any>(null);

  useEffect(() => {
    if (featuredPaper?.id) {
      setActiveSession(loadQuizProgress(featuredPaper.id));
    } else {
      setActiveSession(null);
    }
  }, [featuredPaper, userData.savedSessions]); // Sync when paper changes or global progress data updates

  const resumePaper = null; // Resume logic needs updating if we want to support "most recent" across all papers. Keeping null for now as Carousel handles it.

  // Stats calculation
  const totalCompleted = displayedExamHistory.length;
  const passedCount = displayedExamHistory.filter((e) => e.passed).length;
  const overallPassRate = totalCompleted > 0 ? Math.round((passedCount / totalCompleted) * 100) : 0;

  // Curriculum chapter completion tracking
  const passedChapterIds = new Set(
    displayedExamHistory.filter((e) => e.passed).map((e) => e.paperId)
  );

  const handleQuickUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuickError(null);
    const clean = quickCode.trim().toUpperCase();
    if (!clean) {
      setQuickError('Please enter an access code');
      return;
    }

    if (isMasterKeyCode(clean)) {
      setQuickMasterPrompt(true);
      return;
    }

    setIsUnlocking(true);
    try {
      const found = await loginByAccessCodeAsync(clean);
      setIsUnlocking(false);
      if (found) {
        onUserChanged(found);
        setQuickCode('');
      } else {
        setQuickError('Invalid access code. Please verify your confidential key.');
      }
    } catch {
      setIsUnlocking(false);
      setQuickError('Verification failed. Please check connection.');
    }
  };

  const handleQuickChooseCandidate = () => {
    const candidate = loginAsCandidate();
    onUserChanged(candidate);
    setQuickMasterPrompt(false);
    setQuickCode('');
  };

  const handleDeleteAttempt = async (attemptId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this exam attempt? This action cannot be undone.')) {
      return;
    }
    setDeleteError(null);
    setDeletingAttemptId(attemptId);
    try {
      // Trigger API call / database deletion that permanently removes the record
      await archiveExamAttempt(currentUser?.accessCode || currentUser?.id || '', currentUser?.id || '', attemptId);
      // Ensure the UI only updates after the database confirms the deletion
      await onRefreshData();
    } catch (error) {
      console.error('Failed to permanently delete exam attempt from database:', error);
      setDeleteError(
        'Failed to delete attempt from database: ' +
        (error instanceof Error ? error.message : 'Please check connection.')
      );
    } finally {
      setDeletingAttemptId(null);
    }
  };

  const { theme, toggleTheme, isDark } = useAppTheme();

  // Dynamic Skill Breakdown based on exam history
  const skillBreakdown = useMemo(() => {
    const categories = [
      { name: 'Accounting', ids: ['accounting-mcq-test-1', 'accounting-mcq-test-2', 'accounting-p1-nov-2021', 'accounting-paper-1', 'accounting-paper-2'], color: isDark ? 'bg-red-400' : 'bg-red-500' },
      { name: 'Mathematical Literacy', ids: ['maths-literacy-mcq-test-1', 'maths-literacy-mcq-test-2', 'maths-literacy-p1-nov-2021', 'maths-literacy-paper-1', 'maths-literacy-paper-2'], color: isDark ? 'bg-red-400' : 'bg-red-500' },
      { name: 'Economics', ids: ['economics-mcq-test-1', 'economics-mcq-test-2', 'economics-p1-nov-2021', 'economics-paper-1', 'economics-paper-2'], color: isDark ? 'bg-rose-400' : 'bg-rose-500' },
      { name: 'Business Studies', ids: ['business-studies-mcq-test-1', 'business-studies-mcq-test-2', 'business-studies-p1-2021', 'business-studies-paper-1', 'business-studies-paper-2'], color: isDark ? 'bg-rose-500' : 'bg-rose-600' },
      { name: 'English Home Language', ids: ['english-mcq-test-1', 'english-mcq-test-2', 'english-fal-p1-2021', 'english-fal-p1-nov-2021', 'english-hg-paper-1'], color: isDark ? 'bg-red-400' : 'bg-red-500' },
      { name: 'Afrikaans EAT', ids: ['afrikaans-mcq-test-1', 'afrikaans-mcq-test-2', 'afrikaans-tat-v1-2021', 'afrikaans-tat-v1-nov-2021', 'afrikaans-fal-paper-1'], color: isDark ? 'bg-red-400' : 'bg-red-500' },
    ];

    return categories.map(cat => {
      const categoryAttempts = displayedExamHistory.filter(attempt => cat.ids.includes(attempt.paperId));
      if (categoryAttempts.length === 0) {
        return { name: cat.name, percentage: 0, color: cat.color };
      }
      
      const totalPercentage = categoryAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0);
      const averagePercentage = Math.round(totalPercentage / categoryAttempts.length);
      
      return { name: cat.name, percentage: averagePercentage, color: cat.color };
    });
  }, [displayedExamHistory, isDark]);

  // Helper for difficulty badges in Quizzes view
  const getDifficulty = (index: number) => {
    if (index === 0 || index === 1) {
      return { 
        level: 'MEDIUM', 
        color: isDark 
          ? 'text-[#f59e0b] bg-[#451a03]/60 border-amber-500/40' 
          : 'text-amber-700 bg-amber-50 border-amber-200' 
      };
    }
    if (index === 2) {
      return { 
        level: 'MEDIUM', 
        color: isDark 
          ? 'text-[#f59e0b] bg-[#451a03]/60 border-amber-500/40' 
          : 'text-amber-700 bg-amber-50 border-amber-200' 
      };
    }
    if (index === 3 || index === 4 || index === 13) {
      return { 
        level: 'HARD', 
        color: isDark 
          ? 'text-[#ea580c] bg-[#431407]/70 border-orange-600/40' 
          : 'text-rose-700 bg-rose-50 border-rose-200' 
      };
    }
    return { 
      level: 'CORE', 
      color: isDark 
        ? 'text-red-400 bg-red-950/60 border-red-800/60' 
        : 'text-rose-700 bg-rose-50 border-rose-200' 
    };
  };

  return (
    <div className={`relative w-full max-w-5xl mx-auto flex flex-col overflow-x-hidden ${
      activeTab === 'home' 
        ? 'min-h-[calc(100dvh-54px-62px)] px-2.5 sm:px-4 py-2 sm:py-3 overflow-y-auto justify-between' 
        : 'px-3 sm:px-6 pt-4 sm:pt-6 pb-28 space-y-6 min-h-screen'
    }`}>
      
      {/* Deep Ambient Glow Overlays - Light Red Warmth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        {isDark ? (
          <>
            <div className="absolute -top-32 -left-20 w-80 h-80 bg-red-600/10 rounded-full blur-[90px]" />
            <div className="absolute top-1/3 -right-24 w-80 h-80 bg-rose-600/10 rounded-full blur-[100px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-32 -left-20 w-80 h-80 bg-rose-100/50 rounded-full blur-[90px]" />
            <div className="absolute top-1/3 -right-24 w-80 h-80 bg-red-100/40 rounded-full blur-[100px]" />
          </>
        )}
      </div>

      {/* VIEW 1: HOME TAB */}
      {activeTab === 'home' && (
        <>
          {activeSubjectView ? (
            <div className="w-full flex-1 overflow-y-auto red-margin-line">
              <SubjectTestsView
                subjectId={activeSubjectView}
                papers={papers}
                examHistory={displayedExamHistory}
                onBack={() => {
                  setActiveSubjectView(null);
                  setSelectedSubject('all');
                }}
                onStartPaper={handleStartPaper}
                onOpenIngestionModal={(subId) => onOpenIngestionModal ? onOpenIngestionModal(subId || activeSubjectView) : undefined}
              />
            </div>
          ) : (
            <div className="h-full flex-1 flex flex-col overflow-hidden gap-1.5">
              {/* Top Subject Scroller Strip with Light Red Glow */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1 shrink-0 no-scrollbar">
                <button 
                  type="button"
                  onClick={() => {
                    setSelectedSubject('all');
                    setActiveSubjectView(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                    selectedSubject === 'all' 
                      ? 'bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 border-red-500 text-white shadow-md shadow-rose-600/30' 
                      : isDark 
                      ? 'bg-[#18080c]/80 border-rose-950/80 text-rose-300 hover:border-rose-700 hover:bg-[#200b10]' 
                      : 'bg-white/90 border-rose-200 text-slate-700 hover:border-rose-300 hover:bg-rose-50'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>All Papers</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                    selectedSubject === 'all' ? 'bg-white/20 text-white' : 'bg-rose-500/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                  }`}>
                    {papers.length}
                  </span>
                </button>

                {[...SUBJECTS].sort((a, b) => (a.id === 'economics' ? -1 : b.id === 'economics' ? 1 : 0)).map((sub) => {
                  const subPapers = papers.filter((p) => p.subjectId === sub.id);
                  const isSelected = selectedSubject === sub.id;
                  const isEcon = sub.id === 'economics';
                  return (
                    <button 
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setSelectedSubject(sub.id);
                        setActiveSubjectView(sub.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                        isSelected 
                          ? isEcon
                            ? 'bg-gradient-to-r from-rose-600 via-red-500 to-rose-500 border-rose-500 text-white shadow-md shadow-rose-600/30 scale-[1.02]'
                            : 'bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 border-red-500 text-white shadow-md shadow-rose-600/30 scale-[1.02]' 
                          : isEcon
                          ? isDark
                            ? 'bg-[#220912] border-rose-900/90 text-rose-300 hover:border-rose-600 hover:bg-[#2e0c18]'
                            : 'bg-rose-50/90 border-rose-300 text-rose-800 hover:border-rose-400 hover:bg-rose-100'
                          : isDark 
                          ? 'bg-[#18080c]/80 border-rose-950/80 text-rose-300 hover:border-rose-700 hover:bg-[#200b10]' 
                          : 'bg-rose-50/70 border-rose-200/90 text-rose-900 hover:border-rose-300 hover:bg-rose-100/70'
                      }`}
                      title={`Open all ${sub.name} tests`}
                    >
                      <span>{sub.name}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                        isSelected ? 'bg-white/20 text-white' : isEcon ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                      }`}>
                        {subPapers.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Swipable Looping Chapter Carousel Card (Chapters 1 to 14, unique animations, fills entire screen perfectly) */}
              <div className="h-full flex-1 flex flex-col overflow-hidden">
                <ChapterCarouselCard
                  papers={carouselPapers}
                  currentIndex={currentCarouselIndex}
                  onSelectIndex={handleSelectCarouselIndex}
                  onStartAssessment={handleStartPaper}
                  onOpenIngestionModal={() => onOpenIngestionModal ? onOpenIngestionModal(featuredPaper?.subjectId) : undefined}
                  onOpenPaperSelector={(subId) => setActiveSubjectView((subId || featuredPaper?.subjectId || 'maths_literacy') as SubjectID)}
                  savedSession={activeSession}
                  hasPassed={featuredPaper?.id ? passedChapterIds.has(featuredPaper.id) : false}
                  bestScore={activePaperBestAttempt?.percentage ?? null}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* VIEW 2: QUIZZES TAB */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl border transition-colors relative overflow-hidden ${
            isDark
              ? 'bg-[#120709]/90 border-rose-900/40 shadow-lg'
              : 'bg-white/95 border-rose-100 shadow-md sunlit-card'
          }`}>
            {/* Subtle paper grid overlay for educational feel */}
            <div className="absolute inset-0 bg-paper-grid opacity-[0.03] pointer-events-none" />
            
            <div className="relative z-10">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-1.5 ${
                isDark ? 'bg-red-950/80 border border-red-500/40 text-[#FF6B6B]' : 'bg-rose-50 border border-rose-200 text-red-700'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                GRADE 12 EXAMINATION PAPERS
              </span>
              <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Apex Papers Grade 12 Past Paper Practice
              </h2>
              <p className={`text-xs mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Standardized National Senior Certificate (NSC) exam preparation papers with instant rationales.
              </p>
            </div>
          </div>

          {/* AI Ingestion Pipeline Banner */}
          {onOpenIngestionModal && (
            <div 
              id="quizzes-ingest-banner"
              onClick={() => onOpenIngestionModal?.()}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer shadow-md group ${
                isDark
                  ? 'bg-gradient-to-r from-[#200b10] via-[#1a080d] to-[#120709] border-rose-800/60 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                  : 'bg-gradient-to-r from-rose-50 via-red-50 to-white border-rose-200 hover:border-red-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-600/30">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white shadow-xs">
                      AI INGESTION
                    </span>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      DBE Past Paper & Marking Memo Pipeline
                    </span>
                  </div>
                  <h3 className={`text-sm sm:text-base font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Ingest & Process Exam PDFs with Gemini
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Upload any DBE Question Paper and Memo PDF, or test 1-Click extraction on Mathematical Literacy Nov 2021.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 group-hover:bg-red-500 text-white text-xs font-bold transition-all shrink-0 shadow-xs">
                <span>Open Ingest Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* Topic-Based Curriculum & Examination Papers */}
          <div className="space-y-4">
            {/* Filter and Control Bar */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-[#150608]/90 border-rose-950/70' : 'bg-rose-50/40 border-rose-100'
            }`}>
              {/* Search & View Mode Switcher */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={homeTopicSearch}
                    onChange={(e) => setHomeTopicSearch(e.target.value)}
                    placeholder="Search curriculum topics (e.g. Finance, Tax, Measurement, Statements)..."
                    className={`w-full pl-9 pr-8 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none transition-all ${
                      isDark 
                        ? 'bg-[#0e0305] border-rose-950 text-white placeholder-slate-600 focus:border-red-500' 
                        : 'bg-white border-rose-200 text-slate-900 placeholder-slate-400 focus:border-red-500'
                    }`}
                  />
                  {homeTopicSearch && (
                    <button
                      type="button"
                      onClick={() => setHomeTopicSearch('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 rounded-xl border border-rose-200/60 dark:border-rose-950 bg-white/60 dark:bg-[#1b080d] shrink-0 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setHomeViewMode('topics')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      homeViewMode === 'topics'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-rose-300/80 hover:text-red-500'
                    }`}
                  >
                    Categorized by Topic
                  </button>
                  <button
                    type="button"
                    onClick={() => setHomeViewMode('papers')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      homeViewMode === 'papers'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-rose-300/80 hover:text-red-500'
                    }`}
                  >
                    All Papers
                  </button>
                </div>
              </div>

              {/* Subject Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                {[
                  { id: 'all', label: 'All Topics' },
                  { id: 'maths_literacy', label: 'Maths Literacy' },
                  { id: 'accounting', label: 'Accounting' },
                  { id: 'business_studies', label: 'Business Studies' },
                  { id: 'economics', label: 'Economics' },
                  { id: 'languages', label: 'Languages' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setHomeTopicSubject(tab.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer border ${
                      homeTopicSubject === tab.id
                        ? 'bg-red-600 border-red-600 text-white shadow-xs'
                        : isDark
                        ? 'bg-[#1b080d] border-rose-950 text-rose-300 hover:border-rose-800'
                        : 'bg-white border-rose-200 text-slate-700 hover:bg-rose-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* VIEW MODE 1: CATEGORIZED BY TOPIC */}
            {homeViewMode === 'topics' && (
              <div className="space-y-4">
                {filteredTopicGroups.length === 0 ? (
                  <div className="p-8 text-center text-slate-400">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-rose-500" />
                    <p className="text-sm font-bold">No curriculum topics found matching your filter.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setHomeTopicSearch('');
                        setHomeTopicSubject('all');
                      }}
                      className="mt-2 text-xs font-semibold text-red-500 hover:underline cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  filteredTopicGroups.map((group) => {
                    const gradient = group.topic.accentGradient || 'from-red-500 via-rose-400 to-red-500';
                    return (
                      <div
                        key={group.topic.id}
                        className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-5 transition-all shadow-sm relative overflow-hidden ${
                          isDark
                            ? 'bg-gradient-to-br from-[#220a10]/95 via-[#17060a] to-[#100305] border-red-900/70 hover:border-red-600/80 shadow-[0_4px_25px_rgba(239,68,68,0.15)]'
                            : 'bg-gradient-to-br from-red-50/70 via-white to-rose-50/40 border-red-200/90 hover:border-red-400 sunlit-card'
                        }`}
                      >
                        {/* Top Accent Stripe for Topic (representative light red gradient) */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

                        {/* Topic Header with Subject & Mastery */}
                        <div className="flex items-start justify-between gap-3 mb-2.5 flex-wrap">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md bg-gradient-to-tr ${gradient} shadow-red-500/25 ring-2 ring-red-400/20`}>
                              <TopicIcon name={group.topic.iconName} className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-500/15 text-red-600 dark:text-red-400 border border-red-300/40">
                                  {group.topic.subjectName}
                                </span>
                                <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                                  {group.questionCount} Questions
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  {group.papers.length} {group.papers.length === 1 ? 'Exam Paper' : 'Exam Papers'}
                                </span>
                              </div>
                              <h3 className={`text-base sm:text-lg font-black tracking-tight mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {group.topic.name}
                              </h3>
                            </div>
                          </div>

                          {/* Topic Mastery Badge */}
                          <div className="shrink-0 text-right">
                            {group.attemptsCount > 0 && typeof group.bestScore === 'number' ? (
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  <span className={`text-sm sm:text-base font-black leading-none block ${
                                    group.isMastered ? 'text-emerald-500' : 'text-red-500'
                                  }`}>
                                    {group.bestScore}%
                                  </span>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                    TOP SCORE
                                  </span>
                                </div>
                                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border shadow-xs ${
                                  group.isMastered
                                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-rose-500/15 border-rose-500/40 text-red-600 dark:text-rose-400'
                                }`}>
                                  {group.isMastered ? 'Mastered ✓' : 'In Progress'}
                                </span>
                              </div>
                            ) : (
                              <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/5 text-slate-500 border border-black/10 dark:border-white/10">
                                Ready to Practice
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Curriculum Description */}
                        <p className={`text-xs mb-3.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {group.topic.description}
                        </p>

                        {/* Papers Covering this Topic */}
                        <div className="space-y-2 pt-2 border-t border-rose-200/40 dark:border-rose-950/70">
                          {group.papers.map((paper) => {
                            const attempts = displayedExamHistory.filter((e) => e.paperId === paper.id);
                            const bestAttempt = attempts.sort((a, b) => b.percentage - a.percentage)[0];
                            const hasTaken = attempts.length > 0;
                            const isTest = paper.id.includes('test') || paper.code.includes('TEST');

                            return (
                              <div
                                key={paper.id}
                                onClick={() => handleStartPaper(paper, false)}
                                className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                                  isDark
                                    ? 'bg-[#1e0a10] border-red-950/80 hover:border-red-500/70 hover:bg-[#280d15]'
                                    : 'bg-red-50/50 border-red-200/80 hover:border-red-400 hover:bg-red-50'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                  <div className={`w-8 h-8 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 ${
                                    hasTaken && bestAttempt?.passed
                                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                      : isDark
                                      ? 'bg-red-950/70 text-red-300 border-red-900/60'
                                      : 'bg-white text-red-700 border-red-200'
                                  }`}>
                                    {hasTaken && bestAttempt?.passed ? '✓' : `${paper.questions.length}Q`}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={`text-[10px] font-mono font-bold uppercase ${
                                        isDark ? 'text-red-400' : 'text-red-600 font-extrabold'
                                      }`}>
                                        {paper.code}
                                      </span>
                                      {isTest && (
                                        <span className="text-[9px] font-black uppercase px-2 py-0.2 rounded-md bg-red-600 text-white shadow-xs">
                                          PRACTICE TEST
                                        </span>
                                      )}
                                      <span className="text-[10px] text-slate-400 font-medium">
                                        · {paper.questions.length} Questions · {Math.max(10, Math.round(paper.questions.length * 1.5))} mins
                                      </span>
                                    </div>
                                    <h4 className={`text-xs sm:text-sm font-bold truncate mt-0.5 ${
                                      isDark ? 'text-white group-hover:text-red-300' : 'text-slate-900 group-hover:text-red-600'
                                    }`}>
                                      {paper.subtitle}
                                    </h4>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  {hasTaken && bestAttempt ? (
                                    <div className="text-right">
                                      <span className={`text-xs sm:text-sm font-black block leading-none ${
                                        bestAttempt.passed ? 'text-emerald-500' : 'text-red-500'
                                      }`}>
                                        {bestAttempt.percentage}%
                                      </span>
                                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                                        SCORE
                                      </span>
                                    </div>
                                  ) : (
                                    <div className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                      isDark
                                        ? 'bg-red-950/60 text-red-300 group-hover:bg-red-600 group-hover:text-white'
                                        : 'bg-white border border-red-200 text-red-700 group-hover:bg-red-600 group-hover:text-white'
                                    }`}>
                                      <span>Start Exam</span>
                                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* VIEW MODE 2: ALL PAPERS (FLAT LIST WITH TOPIC TAGS) */}
            {homeViewMode === 'papers' && (
              <div className="space-y-3">
                {[...papers].sort((a, b) => {
                  const aIsTest = a.id.includes('test') || a.code.includes('TEST');
                  const bIsTest = b.id.includes('test') || b.code.includes('TEST');
                  if (aIsTest && !bIsTest) return -1;
                  if (!aIsTest && bIsTest) return 1;
                  return 0;
                }).map((paper, index) => {
                  const attempts = displayedExamHistory.filter((e) => e.paperId === paper.id);
                  const bestAttempt = attempts.sort((a, b) => b.percentage - a.percentage)[0];
                  const isPassed = bestAttempt && bestAttempt.passed;
                  const hasTaken = attempts.length > 0;
                  const isTest = paper.id.includes('test') || paper.code.includes('TEST');
                  const difficulty = isTest ? { level: 'PRACTICE TEST', color: 'bg-red-600 text-white border-red-500' } : getDifficulty(index);
                  const chapterBadge = getPaperChapterBadge(paper);

                  return (
                    <div
                      key={paper.id}
                      onClick={() => handleStartPaper(paper, false)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer group shadow-xs w-full overflow-hidden ${
                        isTest
                          ? isDark
                            ? 'bg-gradient-to-r from-[#200a10] to-[#14080b] border-rose-900/80 hover:border-red-500'
                            : 'bg-gradient-to-r from-rose-50/90 to-white border-rose-200 hover:border-red-400'
                          : isDark
                          ? 'bg-[#14080b]/90 border-rose-950/60 hover:border-rose-600/60 hover:bg-[#1c0c10]'
                          : 'bg-white border-rose-100 hover:border-rose-300 hover:bg-rose-50/40 sunlit-card'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        {/* Left Icon */}
                        {isPassed ? (
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                            isDark
                              ? 'bg-[#290303] border border-red-500/50 text-red-400'
                              : 'bg-emerald-50 border border-emerald-300 text-emerald-600'
                          }`}>
                            <Check className="w-6 h-6 stroke-[3]" />
                          </div>
                        ) : (
                          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                            isDark
                              ? 'bg-red-950/40 border-red-900/50 text-[#FF6B6B] group-hover:border-red-500/60'
                              : 'bg-red-50/80 border-red-200/90 text-red-700 group-hover:text-red-600 group-hover:bg-red-100/70 group-hover:border-red-300'
                          }`}>
                            <span className="font-extrabold text-xs">{paper.code.slice(0, 4)}</span>
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap min-w-0">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border shrink-0 ${difficulty.color}`}>
                              {difficulty.level}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border shrink-0 ${chapterBadge.badgeBg} ${chapterBadge.badgeBorder} ${chapterBadge.badgeText}`}>
                              {chapterBadge.topicLabel}
                            </span>
                          </div>
                          <h3 className={`text-sm sm:text-base font-bold truncate transition-colors max-w-full ${
                            isDark ? 'text-white group-hover:text-[#FF7A7A]' : 'text-slate-900 group-hover:text-red-600'
                          }`}>
                            {paper.subtitle}
                          </h3>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {paper.questions.length} Qs · {Math.max(10, Math.round(paper.questions.length * 1.5))} min · Pass: {paper.passMark}%
                          </p>
                        </div>
                      </div>

                      {/* Right Action / Score Display */}
                      <div className="shrink-0 text-right">
                        {hasTaken && bestAttempt ? (
                          <div className="text-right">
                            <div className={`text-xl sm:text-2xl font-black leading-none ${
                              isDark ? 'text-rose-400' : 'text-red-600'
                            }`}>
                              {bestAttempt.percentage}%
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                              SCORE
                            </span>
                          </div>
                        ) : (
                          <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-xs ${
                            isDark
                              ? 'border-red-800/60 bg-red-950/40 text-red-400 group-hover:bg-red-600 group-hover:text-white'
                              : 'border-rose-200 bg-rose-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                          }`}>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-5">
          {/* Top Weekly Activity Chart */}
          <section className={`p-5 sm:p-6 rounded-3xl border transition-colors ${
            isDark
              ? 'bg-[#120709]/90 border-rose-900/40 shadow-lg'
              : 'bg-white/95 border-rose-100 shadow-md sunlit-card'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`text-[10px] font-bold tracking-wider uppercase block ${
                  isDark ? 'text-rose-400' : 'text-red-600'
                }`}>
                  WEEKLY ACTIVITY
                </span>
                <h3 className={`text-base sm:text-lg font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Study & Assessment Frequency
                </h3>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                isDark 
                  ? 'text-rose-300 bg-[#1f0b10] border-rose-900/50' 
                  : 'text-rose-800 bg-rose-50 border-rose-200'
              }`}>
                {totalCompleted} Total Tests
              </span>
            </div>

            {/* 7 Days of the Week Bar Grid */}
            <div className={`grid grid-cols-7 gap-2 sm:gap-4 h-32 items-end pt-4 pb-2 border-b ${
              isDark ? 'border-rose-950/70' : 'border-rose-100'
            }`}>
              {[
                { day: 'M', height: '40%', active: false },
                { day: 'T', height: '65%', active: false },
                { day: 'W', height: '35%', active: false },
                { day: 'T', height: '80%', active: false },
                { day: 'F', height: '55%', active: false },
                { day: 'S', height: '25%', active: false },
                { day: 'S', height: '95%', active: true },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <div className={`w-full max-w-[36px] rounded-t-lg relative flex items-end overflow-hidden h-full ${
                    isDark ? 'bg-[#220e14]' : 'bg-rose-50'
                  }`}>
                      <div 
                        className={`w-full rounded-t-lg transition-all ${
                          bar.active 
                            ? isDark 
                              ? 'bg-gradient-to-t from-red-800 via-rose-500 to-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.45)]' 
                              : 'bg-gradient-to-t from-red-600 to-rose-500 shadow-xs'
                            : isDark 
                              ? 'bg-rose-950/50 group-hover:bg-rose-900/70'
                              : 'bg-rose-200 group-hover:bg-rose-300'
                        }`}
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className={`text-[11px] font-bold ${
                    bar.active 
                      ? isDark ? 'text-rose-400' : 'text-red-600 font-extrabold' 
                      : 'text-slate-400'
                  }`}>
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Skill Breakdown */}
          <section className={`p-5 sm:p-6 rounded-3xl border space-y-4 transition-colors ${
            isDark
              ? 'bg-[#120709]/90 border-rose-900/40 shadow-lg'
              : 'bg-white/95 border-rose-100 shadow-md sunlit-card'
          }`}>
            <span className={`text-[10px] font-bold tracking-wider uppercase block ${
              isDark ? 'text-rose-400' : 'text-red-600'
            }`}>
              SUBJECT MASTERY BREAKDOWN
            </span>

            <div className="space-y-4">
              {skillBreakdown.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>{skill.name}</span>
                    <span className={skill.percentage >= 70 ? (isDark ? 'text-rose-400' : 'text-red-600') : (skill.percentage > 0 ? 'text-amber-500' : 'text-slate-400')}>
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#220e14]' : 'bg-rose-100/60'}`}>
                    <div 
                      className={`h-full rounded-full ${skill.color} transition-all duration-500`}
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className={`p-5 sm:p-6 rounded-3xl border space-y-3 transition-colors ${
            isDark
              ? 'bg-[#120709]/90 border-rose-900/40 shadow-lg'
              : 'bg-white/95 border-rose-100 shadow-md sunlit-card'
          }`}>
            <span className={`text-[10px] font-bold tracking-wider uppercase block ${
              isDark ? 'text-rose-400' : 'text-red-600'
            }`}>
              RECENT ACTIVITY
            </span>

            <div className="space-y-2.5">
              {displayedExamHistory.length > 0 ? (
                displayedExamHistory.slice(0, 4).map((attempt, i) => (
                  <div 
                    key={attempt.id}
                    onClick={() => onViewExamHistoryItem(attempt)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isDark
                        ? 'bg-[#180a0e] border-rose-900/50 hover:border-rose-700/60'
                        : 'bg-rose-50/50 border-rose-200/70 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        i === 0 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-rose-400 shadow-xs'
                      }`} />
                      <div className="min-w-0">
                        <h4 className={`text-xs sm:text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {attempt.paperSubtitle}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(attempt.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${
                      attempt.passed 
                        ? isDark ? 'bg-red-950/80 text-rose-300 border border-red-500/40' : 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}>
                      {attempt.percentage}%
                    </span>
                  </div>
                ))
              ) : (
                <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-[#180a0e] border-rose-900/50' : 'bg-rose-50/50 border-rose-200/70'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Accounting: Financial Reporting & Balance Sheet</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Today, 2:14 PM</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold ${
                    isDark ? 'bg-red-950/70 text-rose-300 border border-red-800/40' : 'bg-rose-100 text-red-700 border border-rose-200'
                  }`}>
                    ACTIVE
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* VIEW 4: PROFILE TAB */}
      {activeTab === 'profile' && (
        <div className="space-y-5">
          {/* User Account Banner */}
          <div className={`p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
            isDark
              ? 'bg-[#120709]/90 border-rose-900/40 shadow-lg'
              : 'bg-white/95 border-rose-100 shadow-md sunlit-card'
          }`}>
            <div className="flex items-center gap-3.5">
              <div 
                onClick={onOpenLoginModal}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-500 to-rose-500 p-[2px] shadow-sm cursor-pointer group relative"
                title="Click to change profile picture or edit profile"
              >
                <div className={`w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden bg-cover bg-center ${
                  isDark ? 'bg-[#180a0e] text-rose-400' : 'bg-white text-red-600'
                }`}
                style={currentUser?.avatarImage ? { backgroundImage: `url(${currentUser.avatarImage})` } : {}}
                >
                  {!currentUser?.avatarImage && (
                    <span className="font-bold text-xl">
                      {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <User className="w-7 h-7" />}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                  Edit
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {currentUser?.name || 'Grade 12 Candidate'}
                  </h2>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                    isDark ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-rose-50 text-red-700 border-rose-200'
                  }`}>
                    {isAdmin ? 'ADMIN' : 'CANDIDATE'}
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentUser?.club || 'Apex Papers Examination Engine'} • Access Code: <code className={`font-mono ${isDark ? 'text-rose-400' : 'text-red-600'}`}>{currentUser?.accessCode || 'GUEST'}</code>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="profile-clear-cache-btn"
                type="button"
                onClick={handlePurgeCacheAndResync}
                disabled={isPurgingCache}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-[#1a0a0f] hover:bg-[#250f15] text-[#FF7A7A] border border-rose-900/60'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                }`}
                title="Purge local progress cache and re-sync fresh module questions from Firestore"
              >
                {isPurgingCache ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5" />
                )}
                <span>{isPurgingCache ? 'Syncing...' : 'Clear Cache & Sync'}</span>
              </button>
              {onOpenDriveModal && (
                <button
                  id="profile-google-drive-btn"
                  onClick={onOpenDriveModal}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-[#220d14] hover:bg-[#30121c] text-rose-200 border border-rose-900/60'
                      : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                  title="Connect and manage Google Drive backups and transcripts"
                >
                  <Cloud className="w-3.5 h-3.5 text-red-500" />
                  <span>Google Drive Sync</span>
                </button>
              )}
              <button
                onClick={onOpenLoginModal}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  isDark
                    ? 'bg-[#0c222e] hover:bg-[#113a48] text-rose-300 border border-rose-900/60'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                }`}
              >
                {isAdmin ? 'Admin Manager' : 'Edit Photo / Profile'}
              </button>
              <button
                onClick={onSignOut}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* ACADEMIC TARGET TRACKER */}
          {currentUser && (
            <AcademicTargetTracker 
              candidateId={currentUser.id || currentUser.accessCode || 'candidate'} 
              isDark={isDark} 
              initialTime={currentUser.swimTime400m} 
            />
          )}

          {/* ACADEMIC STANDING & CREDENTIALS */}
          <section className={`p-5 sm:p-6 rounded-3xl border space-y-3 transition-colors ${
            isDark
              ? 'bg-[#120709]/90 border-rose-900/40 shadow-lg'
              : 'bg-white/95 border-rose-100 shadow-md sunlit-card'
          }`}>
            <span className={`text-[10px] font-bold tracking-wider uppercase block ${
              isDark ? 'text-rose-400' : 'text-red-600'
            }`}>
              ACADEMIC STANDING & PORTFOLIO
            </span>

            <div className="space-y-2.5">
              {[
                { title: 'National Senior Certificate (NSC)', authority: 'Grade 12 Candidate · Examination Ready', status: 'VERIFIED', active: true },
                { title: 'Preliminary Trials Honor Roll', authority: 'Top Academic Quintile · Distinction Track', status: 'HONOR', active: true },
                { title: 'CASS Continuous Assessment', authority: 'SBA Portfolio Tasks Verified', status: 'APPROVED', active: true },
              ].map((cert, i) => (
                <div key={i} className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-[#180a0e] border-rose-900/50' : 'bg-rose-50/50 border-rose-200/70'
                }`}>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.title}</h4>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{cert.authority}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
                    cert.active 
                      ? isDark ? 'bg-red-950/80 text-rose-300 border border-red-500/40' : 'bg-rose-100 text-rose-800 border border-rose-300'
                      : isDark ? 'bg-orange-950/60 text-[#ea580c] border border-orange-700/40' : 'bg-orange-50 text-orange-700 border border-orange-200'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ACADEMIC BADGES */}
          <section className={`p-5 sm:p-6 rounded-3xl border space-y-3 transition-colors ${
            isDark
              ? 'bg-[#120709]/90 border-rose-900/40 shadow-lg'
              : 'bg-white/95 border-rose-100 shadow-md sunlit-card'
          }`}>
            <span className={`text-[10px] font-bold tracking-wider uppercase block ${
              isDark ? 'text-rose-400' : 'text-red-600'
            }`}>
              SUBJECT HONORS & BADGES
            </span>

            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Accounting Distinction', icon: Award, unlocked: true, color: isDark ? 'text-rose-400 bg-rose-950/40 border-rose-800/60' : 'text-rose-700 bg-rose-50 border-rose-200' },
                { name: 'Business Strategist', icon: Trophy, unlocked: true, color: isDark ? 'text-rose-300 bg-rose-950/40 border-rose-800/60' : 'text-red-700 bg-red-50 border-red-200' },
                { name: 'Economics Scholar', icon: Sparkles, unlocked: true, color: isDark ? 'text-amber-400 bg-amber-950/40 border-amber-800/60' : 'text-amber-700 bg-amber-50 border-amber-200' },
                { name: 'Maths Literacy Ace', icon: CheckCircle2, unlocked: true, color: isDark ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60' : 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                { name: 'English Essayist', icon: BookOpen, unlocked: false, color: isDark ? 'text-slate-600 bg-slate-900/40 border-slate-800/60' : 'text-slate-400 bg-slate-100 border-slate-200' },
                { name: 'Afrikaans Meester', icon: ShieldCheck, unlocked: false, color: isDark ? 'text-slate-600 bg-slate-900/40 border-slate-800/60' : 'text-slate-400 bg-slate-100 border-slate-200' },
              ].map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div 
                    key={i} 
                    className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                      badge.unlocked 
                        ? isDark ? 'bg-[#180a0e] border-rose-900/50 shadow-xs' : 'bg-white border-rose-200/70 shadow-xs'
                        : isDark ? 'bg-[#120709] border-rose-950/60 opacity-60' : 'bg-rose-50/50 border-rose-200/70 opacity-60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${badge.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-bold leading-tight ${isDark ? 'text-rose-100' : 'text-slate-800'}`}>
                      {badge.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* EXAM HISTORY DIRECTORY */}
          <section id="account-history-directory" className={`p-5 sm:p-6 rounded-3xl border space-y-4 transition-colors ${
            isDark
              ? 'bg-[#120709]/90 border-rose-900/40 shadow-lg'
              : 'bg-white/95 border-rose-100 shadow-md sunlit-card'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${
                    isDark ? 'text-red-400' : 'text-red-600'
                  }`}>
                    ACCOUNT HISTORY DIRECTORY
                  </span>
                  <span className={isDark ? 'text-red-900' : 'text-slate-300'}>•</span>
                  <span className="text-[10px] font-bold text-red-500">CONFIDENTIAL LOGS</span>
                </div>
                <h3 className={`text-base sm:text-lg font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Candidate Exam History & Records
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Timestamped exam submissions, scores, and answer sheets stored for this account.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                  isDark
                    ? 'bg-[#0c222e] border-red-800/50 text-red-400'
                    : 'bg-rose-50 border-rose-200 text-red-600'
                }`}>
                  {totalCompleted} Attempt{totalCompleted === 1 ? '' : 's'}
                </span>
                
                <button
                  onClick={handleClearHistory}
                  disabled={isClearingHistory || totalCompleted === 0}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-red-950/40 border-red-900/50 text-red-400 hover:bg-red-900/60 hover:text-red-300 disabled:opacity-50'
                      : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 disabled:opacity-50'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {isClearingHistory ? 'Clearing...' : 'Clear History'}
                </button>

                {totalCompleted > 0 && (
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    isDark
                      ? 'bg-red-950/80 border-red-500/40 text-rose-400'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  }`}>
                    {overallPassRate}% Passed
                  </span>
                )}
              </div>
            </div>

            {/* Error Notification */}
            {deleteError && (
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 text-xs font-semibold ${
                isDark 
                  ? 'bg-red-950/80 border-red-800/80 text-red-200' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <div className="flex items-center gap-2 min-w-0">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="truncate">{deleteError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteError(null)}
                  className="px-2 py-0.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer text-xs"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Attempts List */}
            {filteredExamHistory.length === 0 ? (
              <div className={`text-center py-8 px-4 rounded-2xl border ${
                isDark ? 'bg-[#120709] border-rose-950/70' : 'bg-rose-50/40 border-rose-200'
              }`}>
                <FileCheck className="w-9 h-9 text-slate-400 mx-auto mb-2" />
                <h4 className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {historySearch ? 'No matching exam attempts found' : 'No Assessment Attempts Yet'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {historySearch ? 'Try a different search keyword.' : 'Complete an assessment paper in the Quizzes tab to generate verified exam records for your account.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredExamHistory.map((attempt) => (
                  <div
                    key={attempt.id}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full overflow-hidden ${
                      isDark
                        ? 'border-rose-900/40 hover:border-rose-700/60 bg-[#16080c] hover:bg-[#200d11]'
                        : 'border-rose-100 hover:border-rose-300 bg-rose-50/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 w-full">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        attempt.passed 
                          ? isDark ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' : 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : isDark ? 'bg-[#2a131b] text-rose-300 border border-rose-800/50' : 'bg-rose-100 text-rose-700 border border-rose-200'
                      }`}>
                        {attempt.percentage}%
                      </div>
                      <div className="min-w-0 flex-1 w-full">
                        <div className="flex items-center gap-2 flex-wrap min-w-0 max-w-full">
                          <h4 className={`text-xs sm:text-sm font-bold truncate max-w-full ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {attempt.paperSubtitle}
                          </h4>
                          <span className={`px-2 py-0.2 rounded text-[10px] font-extrabold border whitespace-nowrap shrink-0 ${
                            attempt.passed 
                              ? isDark ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isDark ? 'bg-red-950 text-rose-300 border-red-800' : 'bg-rose-100 text-rose-800 border-rose-200'
                          }`}>
                            {attempt.passed ? 'PASSED (≥80%)' : 'FAILED (<80%)'}
                          </span>
                        </div>

                        <p className={`text-[10px] mt-1 break-words whitespace-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {new Date(attempt.completedAt).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })} • Time: {Math.floor(attempt.timeElapsed / 60)}m {attempt.timeElapsed % 60}s • Score: <strong className={isDark ? 'text-rose-200' : 'text-slate-800'}>{attempt.score}/{attempt.totalMarks}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        id={`directory-review-btn-${attempt.id}`}
                        onClick={() => onViewExamHistoryItem(attempt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 border ${
                          isDark
                            ? 'bg-red-950/60 hover:bg-red-600 text-rose-300 hover:text-white border-red-800/60'
                            : 'bg-rose-100/70 hover:bg-red-600 text-rose-800 hover:text-white border-rose-200'
                        }`}
                      >
                        <span>Review</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        id={`directory-delete-btn-${attempt.id}`}
                        onClick={() => handleDeleteAttempt(attempt.id)}
                        disabled={deletingAttemptId === attempt.id}
                        className={`p-2 rounded-xl border transition-colors shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          isDark
                            ? 'bg-[#180a0e] hover:bg-red-950/80 text-rose-400 hover:text-red-400 border-rose-900/60'
                            : 'bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-red-600 border-rose-200'
                        }`}
                        title={deletingAttemptId === attempt.id ? 'Deleting attempt from database...' : 'Delete attempt'}
                      >
                        {deletingAttemptId === attempt.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* FIXED BOTTOM NAVIGATION BAR */}
      <div className={`fixed bottom-0 left-0 right-0 w-full max-w-[100vw] z-30 border-t backdrop-blur-xl transition-colors ${
        isDark
          ? 'bg-[#120508]/95 border-rose-950/80 shadow-[0_-4px_25px_rgba(0,0,0,0.5)]'
          : 'bg-white/95 border-rose-200/90 shadow-[0_-4px_20px_rgba(244,63,94,0.08)]'
      }`}>
        <nav 
          aria-label="Bottom Navigation" 
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-around"
        >
        {/* Nav Item: Home */}
        <button 
          id="nav-tab-home"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 group cursor-pointer transition-colors ${
            activeTab === 'home' 
              ? isDark ? 'text-rose-400 font-bold' : 'text-rose-600 font-bold' 
              : isDark ? 'text-slate-400 hover:text-rose-300' : 'text-slate-400 hover:text-rose-600'
          }`}
        >
          <div className={`w-9 h-7 rounded-lg flex items-center justify-center transition-all ${
            activeTab === 'home' 
              ? isDark 
                ? 'border border-rose-500/50 bg-rose-950/70 shadow-[0_0_12px_rgba(244,63,94,0.35)] text-rose-300' 
                : 'border border-rose-300 bg-rose-50/90 shadow-xs text-rose-600'
              : 'group-hover:bg-rose-50/50 dark:group-hover:bg-rose-950/30'
          }`}>
            <HomeIcon className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Home</span>
        </button>

        {/* Nav Item: Quizzes */}
        <button 
          id="nav-tab-quizzes"
          onClick={() => {
            setActiveTab('quizzes');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 group cursor-pointer transition-colors ${
            activeTab === 'quizzes' 
              ? isDark ? 'text-rose-400 font-bold' : 'text-rose-600 font-bold' 
              : isDark ? 'text-slate-400 hover:text-rose-300' : 'text-slate-400 hover:text-rose-600'
          }`}
        >
          <div className={`w-9 h-7 rounded-lg flex items-center justify-center transition-all ${
            activeTab === 'quizzes' 
              ? isDark 
                ? 'border border-rose-500/50 bg-rose-950/70 shadow-[0_0_12px_rgba(244,63,94,0.35)] text-rose-300' 
                : 'border border-rose-300 bg-rose-50/90 shadow-xs text-rose-600'
              : 'group-hover:bg-rose-50/50 dark:group-hover:bg-rose-950/30'
          }`}>
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium">Quizzes</span>
        </button>

        {/* Nav Item: Ingest DBE Paper */}
        {onOpenIngestionModal && (
          <button 
            id="nav-tab-ingest"
            onClick={() => onOpenIngestionModal?.()}
            className="flex flex-col items-center gap-1 group cursor-pointer transition-colors text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
            title="Ingest DBE Exam Paper & Memo"
          >
            <div className={`w-9 h-7 rounded-lg flex items-center justify-center transition-all bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-xs hover:scale-105 active:scale-95 shadow-rose-600/30`}>
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            </div>
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Ingest</span>
          </button>
        )}

        {/* Nav Item: Analytics */}
        <button 
          id="nav-tab-analytics"
          onClick={() => {
            setActiveTab('analytics');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 group cursor-pointer transition-colors ${
            activeTab === 'analytics' 
              ? isDark ? 'text-rose-400 font-bold' : 'text-rose-600 font-bold' 
              : isDark ? 'text-slate-400 hover:text-rose-300' : 'text-slate-400 hover:text-rose-600'
          }`}
        >
          <div className={`w-9 h-7 rounded-lg flex items-center justify-center transition-all ${
            activeTab === 'analytics' 
              ? isDark 
                ? 'border border-rose-500/50 bg-rose-950/70 shadow-[0_0_12px_rgba(244,63,94,0.35)] text-rose-300' 
                : 'border border-rose-300 bg-rose-50/90 shadow-xs text-rose-600'
              : 'group-hover:bg-rose-50/50 dark:group-hover:bg-rose-950/30'
          }`}>
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium">Analytics</span>
        </button>

        {/* Nav Item: Profile */}
        <button 
          id="nav-tab-profile"
          onClick={() => {
            setActiveTab('profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 group cursor-pointer transition-colors ${
            activeTab === 'profile' 
              ? isDark ? 'text-rose-400 font-bold' : 'text-rose-600 font-bold' 
              : isDark ? 'text-slate-400 hover:text-rose-300' : 'text-slate-400 hover:text-rose-600'
          }`}
        >
          <div className={`w-9 h-7 rounded-lg flex items-center justify-center transition-all ${
            activeTab === 'profile' 
              ? isDark 
                ? 'border border-rose-500/50 bg-rose-950/70 shadow-[0_0_12px_rgba(244,63,94,0.35)] text-rose-300' 
                : 'border border-rose-300 bg-rose-50/90 shadow-xs text-rose-600'
              : 'group-hover:bg-rose-50/50 dark:group-hover:bg-rose-950/30'
          }`}>
            <User className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
      </div>
    </div>
  );
};
