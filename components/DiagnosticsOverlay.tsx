'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Copy, 
  X, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Wifi, 
  WifiOff,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { doc, getDocFromServer } from 'firebase/firestore';
import { QuizPaper } from '@/lib/quiz-data';
import firebaseConfigJson from '@/firebase-applet-config.json';

interface DiagnosticsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  curriculumPapers: QuizPaper[];
  currentPaper: QuizPaper;
  activeUserCode?: string | null;
}

export function DiagnosticsOverlay({
  isOpen,
  onClose,
  curriculumPapers,
  currentPaper,
  activeUserCode,
}: DiagnosticsOverlayProps) {
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{ status: 'idle' | 'success' | 'offline' | 'error'; latencyMs?: number; message?: string }>({ status: 'idle' });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'exams'>('status');

  const projectId = db?.app?.options?.projectId || firebaseConfigJson.projectId;
  const databaseId = (firebaseConfigJson as { firestoreDatabaseId?: string }).firestoreDatabaseId || (db as unknown as { _databaseId?: { database?: string } })?._databaseId?.database || '(default)';
  const isDbReady = Boolean(db);

  // Connection probe runner
  const runPingTest = useCallback(async () => {
    setIsPinging(true);
    const start = performance.now();
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timed out after 3.5s')), 3500)
      );
      await Promise.race([
        getDocFromServer(doc(db, 'test', 'connection')),
        timeoutPromise,
      ]);
      const latency = Math.round(performance.now() - start);
      setPingResult({
        status: 'success',
        latencyMs: latency,
        message: `Connected (${latency}ms round-trip)`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isOffline = msg.includes('the client is offline') || msg.includes('timed out');
      setPingResult({
        status: isOffline ? 'offline' : 'error',
        message: isOffline ? 'Client offline / local cache mode' : `Server error: ${msg.slice(0, 80)}`,
      });
    } finally {
      setIsPinging(false);
    }
  }, []);

  // Run one initial probe when opened
  useEffect(() => {
    if (isOpen && pingResult.status === 'idle') {
      runPingTest();
    }
  }, [isOpen, pingResult.status, runPingTest]);

  const handleCopyReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      firestore: {
        initialized: isDbReady,
        projectId,
        databaseId,
        authStatus: auth?.currentUser?.uid ? 'Authenticated' : 'Anonymous/Guest',
        userId: auth?.currentUser?.uid || null,
        ping: pingResult,
      },
      curriculum: {
        totalPapersLoaded: curriculumPapers.length,
        activePaper: {
          id: currentPaper.id,
          code: currentPaper.code,
          title: currentPaper.title,
          subject: currentPaper.subjectId,
          totalQuestions: currentPaper.questions?.length || 0,
          totalMarks: currentPaper.totalMarks,
          passMark: currentPaper.passMark,
        },
      },
      user: {
        activeUserCode: activeUserCode || 'None (Guest)',
      },
    };

    navigator.clipboard.writeText(JSON.stringify(report, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-[#14080a] border border-rose-200 dark:border-rose-900/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-rose-50/80 dark:bg-[#1a0b0e] border-b border-rose-100 dark:border-rose-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-extrabold text-rose-950 dark:text-rose-100 tracking-wide uppercase">
              Apex Portal Diagnostics
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800/40">
              Live Health
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyReport}
              className="p-1.5 rounded-lg text-rose-700 hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-100 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Copy diagnostic report to clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-rose-700 hover:text-rose-950 dark:text-rose-300 dark:hover:text-white hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors cursor-pointer"
              aria-label="Close diagnostics"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-4 pt-2 border-b border-rose-100 dark:border-rose-900/30 flex gap-2 bg-white dark:bg-[#14080a]">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'status'
                ? 'border-red-600 text-red-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            Database & Cloud
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`pb-2 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'exams'
                ? 'border-red-600 text-red-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            Curriculum Exams ({curriculumPapers.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs font-sans">
          {activeTab === 'status' ? (
            <>
              {/* Firestore Connection Card */}
              <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-[#1a0a0d] border border-rose-100 dark:border-rose-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-red-600" />
                    Firestore Status
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isDbReady 
                      ? 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 border border-rose-200 dark:border-rose-800/40' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {isDbReady ? 'Ready & Initialized' : 'Missing Instance'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-white dark:bg-[#200d11] border border-rose-100 dark:border-rose-900/30">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">Database ID</span>
                    <span className="font-mono text-slate-800 dark:text-rose-100 truncate block font-bold" title={databaseId}>
                      {databaseId}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#200d11] border border-rose-100 dark:border-rose-900/30">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">Cloud Project</span>
                    <span className="font-mono text-slate-800 dark:text-rose-100 truncate block font-bold" title={projectId}>
                      {projectId}
                    </span>
                  </div>
                </div>

                {/* Live Ping Probe */}
                <div className="pt-2 border-t border-rose-100 dark:border-rose-900/30 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    {pingResult.status === 'success' ? (
                      <Wifi className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <WifiOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    )}
                    <span className="text-[11px] text-slate-700 dark:text-rose-200 font-medium truncate">
                      {pingResult.message || 'Probe not yet executed'}
                    </span>
                  </div>
                  <button
                    onClick={runPingTest}
                    disabled={isPinging}
                    className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  >
                    <RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />
                    <span>{isPinging ? 'Pinging...' : 'Ping Server'}</span>
                  </button>
                </div>
              </div>

              {/* Authentication & User Session */}
              <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-[#1a0a0d] border border-rose-100 dark:border-rose-900/40 space-y-2">
                <span className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                  Candidate Session & Auth
                </span>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Candidate Access Code:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-rose-100">
                    {activeUserCode || 'Guest Candidate'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Firebase Auth State:</span>
                  <span className="font-bold text-slate-700 dark:text-rose-300">
                    {auth?.currentUser?.uid ? `UID: ${auth.currentUser.uid.slice(0, 8)}...` : 'Local Candidate Mode'}
                  </span>
                </div>
              </div>

              {/* Active Exam Summary */}
              <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-[#1a0a0d] border border-rose-100 dark:border-rose-900/40 space-y-2">
                <span className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-red-600" />
                  Active Examination
                </span>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Paper:</span>
                  <span className="font-bold text-slate-800 dark:text-rose-100">
                    [{currentPaper.code || 'EXAM'}] {currentPaper.title}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Questions / Marks:</span>
                  <span className="font-medium text-slate-700 dark:text-rose-300">
                    {currentPaper.questions?.length || 0} questions · {currentPaper.totalMarks} marks (Pass: {currentPaper.passMark})
                  </span>
                </div>
              </div>
            </>
          ) : (
            /* Curriculum Papers List */
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {curriculumPapers.map((paper, idx) => (
                <div
                  key={paper.id}
                  className={`p-2.5 rounded-xl border text-[11px] flex items-center justify-between ${
                    paper.id === currentPaper.id
                      ? 'bg-rose-100/70 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100 font-bold'
                      : 'bg-white dark:bg-[#1a0a0d] border-rose-100 dark:border-rose-900/30 text-slate-700 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] text-slate-400 font-mono w-4">{idx + 1}</span>
                    <div className="truncate">
                      <span className="block truncate font-semibold">{paper.title}</span>
                      <span className="text-[10px] text-slate-400 dark:text-rose-300 font-normal">
                        {paper.code} · {paper.subjectId} · {paper.questions?.length || 0} Qs
                      </span>
                    </div>
                  </div>
                  {paper.id === currentPaper.id && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600 text-white font-bold shrink-0">
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-rose-50/50 dark:bg-[#170a0c] border-t border-rose-100 dark:border-rose-900/30 flex items-center justify-between">
          <span className="text-[10px] text-rose-800 dark:text-rose-400 font-medium">
            Non-blocking offline-first mode active
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-rose-900/80 dark:hover:bg-rose-900 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
