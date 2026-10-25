'use client';

import React from 'react';
import { Clock, Volume2, VolumeX, ChevronDown, Home, Sun, Moon, Cloud, Sparkles } from 'lucide-react';
import { QuizPaper } from '@/lib/quiz-data';
import { VintageLifeRing } from '@/components/VintageLifeRing';
import { useAppTheme } from '@/lib/theme';
import { PWAInstallButton } from './PWAInstallButton';

interface QuizHeaderProps {
  currentPaper: QuizPaper;
  secondsElapsed: number;
  onOpenPaperSelector: () => void;
  onOpenCandidateModal: () => void;
  onOpenDriveModal?: () => void;
  onOpenIngestionModal?: () => void;
  candidateName?: string | null;
  avatarImage?: string | null;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoHome?: () => void;
  isHomeView?: boolean;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentPaper,
  secondsElapsed,
  onOpenPaperSelector,
  onOpenCandidateModal,
  onOpenDriveModal,
  onOpenIngestionModal,
  candidateName,
  avatarImage,
  soundEnabled,
  onToggleSound,
  onGoHome,
  isHomeView = false,
}) => {
  const { toggleTheme, isDark } = useAppTheme();

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="w-full bg-white/95 dark:bg-[#12070a]/95 backdrop-blur-xl border-b border-rose-200/80 dark:border-rose-950/80 sticky top-0 z-30 shadow-[0_4px_20px_rgba(244,63,94,0.08)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-colors duration-200">
      {/* Top Academic Accent Bar - Light Red / Rose Crimson Gradient */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-rose-500 to-rose-600 shadow-[0_0_12px_rgba(244,63,94,0.3)]" />

      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
        {/* Responsive flex container */}
        <div className="flex items-center justify-between gap-2">
          
          {/* Left: Branding & Paper Info */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            {/* Apex Papers Academic Emblem Button */}
            <button 
              id="apex-emblem-btn"
              onClick={onGoHome || onOpenPaperSelector}
              className="relative p-0.5 rounded-full hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer group focus:outline-none"
              title={isHomeView ? "Exam Portal" : "Return to Exam Portal Home"}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5252]/30 via-rose-300/20 to-[#ef4444]/30 rounded-full blur-md group-hover:from-[#FF5252]/50 group-hover:to-[#ef4444]/50 transition-all"></div>
              <VintageLifeRing className="relative w-8 h-8 sm:w-10 sm:h-10 group-hover:rotate-6 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(244,63,94,0.35)]" />
            </button>

            {/* Home portal button */}
            {onGoHome && !isHomeView && (
              <button
                id="header-home-btn"
                onClick={onGoHome}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-[#1f0b10] dark:hover:bg-[#2d1017] text-rose-800 dark:text-rose-200 hover:text-red-600 dark:hover:text-red-400 border border-rose-200 dark:border-rose-900/50 text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0"
                title="Return to Apex Papers Portal Home"
              >
                <Home className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span>Home</span>
              </button>
            )}

            {/* Paper Title & Selector */}
            {!isHomeView ? (
              <button
                id="header-paper-badge"
                onClick={onOpenPaperSelector}
                className="flex flex-col text-left min-w-0 group hover:opacity-95 transition-opacity"
              >
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 tracking-wider uppercase truncate">
                  APEX PAPERS · GRADE 12
                </span>

                <div className="flex items-center gap-1 min-w-0">
                  <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tracking-tight truncate max-w-[120px] xs:max-w-[170px] sm:max-w-xs">
                    {currentPaper.subtitle}
                  </h1>
                  <ChevronDown className="w-3 h-3 text-rose-400 dark:text-red-400 shrink-0 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </button>
            ) : (
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[10px] font-bold tracking-wider uppercase text-red-600 dark:text-red-400">
                  APEX PAPERS · GRADE 12
                </span>
                <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                  Past Paper Examination Engine
                </h1>
              </div>
            )}
          </div>

          {/* Right: Timer, Ingest, Google Drive, PWA Install, Theme Switcher, Sound, and Profile Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* AI Paper & Memo Ingestion Button */}
            {onOpenIngestionModal && (
              <button
                id="header-ingest-paper-btn"
                onClick={onOpenIngestionModal}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-extrabold text-[11px] sm:text-xs transition-all cursor-pointer shadow-xs shadow-rose-600/30 shrink-0"
                title="Ingest DBE Exam Paper & Marking Memo"
                aria-label="Ingest DBE Paper and Memo"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="hidden xs:inline">Ingest Paper</span>
              </button>
            )}

            {/* Google Drive Cloud Sync Button */}
            {onOpenDriveModal && (
              <button
                id="header-google-drive-btn"
                onClick={onOpenDriveModal}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-rose-700 hover:text-red-600 dark:text-rose-300 dark:hover:text-red-400 bg-rose-50/80 hover:bg-rose-100 dark:bg-[#1f0b10] dark:hover:bg-[#2d1017] border border-rose-200 dark:border-rose-900/50 transition-all cursor-pointer shadow-xs"
                title="Google Drive Cloud Sync & Transcripts"
                aria-label="Google Drive Sync"
              >
                <Cloud className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              </button>
            )}

            {/* PWA / APK Install Button */}
            <PWAInstallButton />

            {!isHomeView && (
              <div 
                id="quiz-timer-badge"
                className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-rose-50 dark:bg-[#1f0b10] border border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200 text-[11px] sm:text-xs font-mono font-bold shadow-xs shrink-0"
              >
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600 dark:text-red-400 animate-pulse" />
                <span>{formatTime(secondsElapsed)}</span>
              </div>
            )}

            {/* Theme Switcher Button */}
            <button
              id="header-theme-toggle-btn"
              onClick={toggleTheme}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-rose-700 hover:text-amber-600 dark:text-rose-300 dark:hover:text-amber-400 bg-rose-50/80 hover:bg-rose-100 dark:bg-[#1f0b10] dark:hover:bg-[#2d1017] border border-rose-200 dark:border-rose-900/50 transition-all cursor-pointer shadow-xs"
              title={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
              aria-label="Toggle Light / Dark Theme"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-rose-700" />
              )}
            </button>

            {/* Sound Toggle */}
            <button
              id="header-sound-btn"
              onClick={onToggleSound}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-rose-700 hover:text-red-600 dark:text-rose-300 dark:hover:text-red-400 bg-rose-50/80 hover:bg-rose-100 dark:bg-[#1f0b10] dark:hover:bg-[#2d1017] border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer shadow-xs"
              title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {/* Candidate Profile Avatar Button */}
            <button
              id="header-candidate-btn"
              onClick={onOpenCandidateModal}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-50/80 hover:bg-rose-100 dark:bg-[#1f0b10] dark:hover:bg-[#2d1017] border border-rose-200 dark:border-rose-900/50 flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0 overflow-hidden"
              title={candidateName ? `Signed in as ${candidateName}` : "Sign in / Profile"}
              aria-label="Profile"
            >
              {avatarImage ? (
                <div 
                  className="w-full h-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${avatarImage})` }} 
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-[10px] font-black text-white">
                  {(candidateName || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
