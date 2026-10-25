'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Search,
  Coins,
  Ruler,
  Compass,
  BarChart3,
  Calculator,
  FileCheck,
  Briefcase,
  TrendingUp,
  Activity
} from 'lucide-react';
import { QUIZ_PAPERS, QuizPaper } from '@/lib/quiz-data';
import { getPaperChapterBadge } from '@/lib/chapterParser';
import { CURRICULUM_TOPICS, CurriculumTopic, groupPapersByTopic } from '@/lib/topic-curriculum';
import { VintageLifeRing } from '@/components/VintageLifeRing';
import { useAppTheme } from '@/lib/theme';
import { SubjectID, SUBJECTS } from '@/types/quiz';

interface PaperSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPaperId: string;
  onSelectPaper: (paper: QuizPaper) => void;
  papers?: QuizPaper[];
  onOpenIngestionModal?: () => void;
  initialSubjectId?: string;
}

// Icon mapper for topic icons
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
      return <Calculator className={className} />;
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

export const PaperSelectorModal: React.FC<PaperSelectorModalProps> = ({
  isOpen,
  onClose,
  currentPaperId,
  onSelectPaper,
  papers,
  onOpenIngestionModal,
  initialSubjectId,
}) => {
  const { isDark } = useAppTheme();
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubjectId || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync selectedSubject when initialSubjectId prop changes or modal opens
  useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubject(initialSubjectId);
    }
  }, [initialSubjectId, isOpen]);

  const paperList = papers && papers.length > 0 ? papers : QUIZ_PAPERS;

  // Group papers by curriculum topic
  const topicGroups = useMemo(() => {
    return groupPapersByTopic(paperList);
  }, [paperList]);

  // Filter topics based on selected subject and search query
  const filteredTopicGroups = useMemo(() => {
    return topicGroups.filter((group) => {
      // 1. Subject filter
      if (selectedSubject !== 'all') {
        if (selectedSubject === 'languages') {
          if (group.topic.subjectId !== 'english_hg' && group.topic.subjectId !== 'afrikaans_fal') {
            return false;
          }
        } else if (group.topic.subjectId !== selectedSubject) {
          return false;
        }
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
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
  }, [topicGroups, selectedSubject, searchQuery]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className={`relative w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden z-10 transition-colors flex flex-col max-h-[88vh] ${
            isDark
              ? 'bg-[#120609] border-rose-900/50 text-white'
              : 'bg-white border-rose-100 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className={`p-4 sm:p-5 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'bg-[#18080c] border-rose-950/80' : 'bg-rose-50/60 border-rose-100'
          }`}>
            <div className="flex items-center gap-3">
              <VintageLifeRing className="w-10 h-10 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-rose-400 border border-red-500/30">
                    CURRICULUM TOPICS
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Grade 12 NSC
                  </span>
                </div>
                <h3 className={`text-base sm:text-lg font-black mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Select Examination by Topic
                </h3>
              </div>
            </div>

            <button
              id="close-paper-modal-btn"
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'text-rose-300 hover:text-white hover:bg-rose-950/60 border-transparent hover:border-rose-900/60'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-rose-100/70 border-transparent hover:border-rose-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Subject Category Filter Bar */}
          <div className={`p-3 sm:p-4 border-b space-y-2.5 shrink-0 ${
            isDark ? 'bg-[#150608] border-rose-950/60' : 'bg-rose-50/30 border-rose-100'
          }`}>
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g., Finance, Measurement, Taxation, Balance Sheet)..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-red-500 ${
                  isDark
                    ? 'bg-[#0f0305] border-rose-950 text-white placeholder-slate-600 focus:border-red-500'
                    : 'bg-white border-rose-200 text-slate-900 placeholder-slate-400 focus:border-red-500'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              )}
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
                  onClick={() => setSelectedSubject(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    selectedSubject === tab.id
                      ? tab.id === 'economics'
                        ? 'bg-gradient-to-r from-rose-600 to-red-500 border-rose-500 text-white shadow-xs'
                        : 'bg-red-600 border-red-600 text-white shadow-xs'
                      : isDark
                      ? tab.id === 'economics'
                        ? 'bg-[#220912] border-rose-900/80 text-rose-300 hover:border-rose-700'
                        : 'bg-[#1b070b] border-rose-950 text-rose-300 hover:border-rose-800'
                      : tab.id === 'economics'
                        ? 'bg-rose-50/70 border-rose-200 text-rose-800 hover:bg-rose-100'
                        : 'bg-white border-rose-200 text-slate-700 hover:bg-rose-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categorized Topic List Body */}
          <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
            {/* Direct Ingestion Action */}
            {onOpenIngestionModal && (
              <button
                id="selector-open-ingest-btn"
                onClick={() => {
                  onClose();
                  onOpenIngestionModal();
                }}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white font-bold text-xs flex items-center justify-between shadow-md cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold text-sm">Ingest New Exam Paper by Topic</p>
                    <p className="text-[10px] text-rose-100 font-normal">Extract DBE past papers & categorize into curriculum topics</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {filteredTopicGroups.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-rose-500" />
                <p className="text-sm font-bold">No curriculum topics match your search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSubject('all');
                  }}
                  className="mt-2 text-xs font-semibold text-red-500 hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredTopicGroups.map((group) => {
                return (
                  <div
                    key={group.topic.id}
                    className={`rounded-2xl border p-3.5 sm:p-4 transition-all ${
                      isDark 
                        ? 'bg-[#160609]/90 border-rose-950/80 shadow-xs' 
                        : 'bg-rose-50/30 border-rose-100 hover:border-rose-200'
                    }`}
                  >
                    {/* Topic Header */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs ${
                          isDark ? 'bg-red-950 text-rose-300 border border-red-800' : 'bg-red-600 text-white'
                        }`}>
                          <TopicIcon name={group.topic.iconName} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400">
                              {group.topic.subjectName}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-black/10 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                              {group.questionCount} Questions
                            </span>
                          </div>
                          <h4 className={`text-sm sm:text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {group.topic.name}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <p className={`text-xs mb-3 leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {group.topic.description}
                    </p>

                    {/* Papers Under This Topic */}
                    <div className="space-y-2">
                      {group.papers.map((paper) => {
                        const isSelected = paper.id === currentPaperId;

                        return (
                          <button
                            key={paper.id}
                            id={`select-paper-btn-${paper.id}`}
                            onClick={() => {
                              onSelectPaper(paper);
                              onClose();
                            }}
                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                              isSelected
                                ? isDark
                                  ? 'bg-[#290e14] border-rose-500 ring-2 ring-rose-500/30 text-white shadow-xs'
                                  : 'bg-rose-50 border-red-500 ring-2 ring-red-500/20 text-slate-900'
                                : isDark
                                  ? 'bg-[#1b080d] border-rose-950 hover:border-rose-700 hover:bg-[#220b11]'
                                  : 'bg-white border-rose-200/80 hover:border-rose-300 hover:bg-rose-50/60'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <div className={`w-8 h-8 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-red-600 text-white border-red-600 shadow-xs'
                                  : isDark
                                    ? 'bg-rose-950/60 text-rose-300 border-rose-900'
                                    : 'bg-rose-50 text-rose-800 border-rose-200'
                              }`}>
                                {paper.questions.length}Q
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                                    isDark ? 'text-rose-400' : 'text-rose-600'
                                  }`}>
                                    {paper.code}
                                  </span>
                                  {isSelected && (
                                    <span className="px-1.5 py-0.2 text-[9px] font-black rounded bg-red-600 text-white uppercase">
                                      ACTIVE
                                    </span>
                                  )}
                                </div>
                                <p className={`text-xs font-bold truncate mt-0.5 ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                  {paper.subtitle}
                                </p>
                              </div>
                            </div>

                            <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                              isSelected
                                ? 'text-red-500 translate-x-1'
                                : isDark
                                  ? 'text-slate-500 group-hover:text-red-400 group-hover:translate-x-1'
                                  : 'text-slate-400 group-hover:text-red-600 group-hover:translate-x-1'
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className={`p-3.5 border-t text-center shrink-0 ${
            isDark ? 'bg-[#150608] border-rose-950/80' : 'bg-rose-50/50 border-rose-100'
          }`}>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Organized according to the Department of Basic Education (DBE) National Curriculum Statement.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
