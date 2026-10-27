'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Database, 
  ShieldCheck, 
  UserCheck, 
  Terminal, 
  Copy, 
  Check,
  FileText
} from 'lucide-react';
import { doc, getDocFromServer, collection, getDocs, limit, query } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import firebaseConfig from '../firebase-applet-config.json';
import { QUIZ_PAPERS } from '@/lib/quiz-data';

interface DiagnosticResult {
  step: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  message: string;
  details?: any;
  durationMs?: number;
}

export function FirestoreDiagnosticsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [copied, setCopied] = useState(false);
  const [rawLogs, setRawLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] ${msg}`;
    console.log(`[FirestoreDiagnostics] ${entry}`);
    setRawLogs((prev) => [...prev, entry]);
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);
    setRawLogs([]);

    addLog('Starting Firestore & Auth connectivity diagnostic scan...');

    const newResults: DiagnosticResult[] = [];

    // Step 1: Configuration check
    const step1Start = performance.now();
    try {
      const configSummary = {
        projectId: firebaseConfig.projectId,
        databaseId: (firebaseConfig as any).firestoreDatabaseId || '(default)',
        authDomain: firebaseConfig.authDomain,
        hasApiKey: !!firebaseConfig.apiKey,
        appId: firebaseConfig.appId,
      };

      addLog(`Config verified: project=${configSummary.projectId}, db=${configSummary.databaseId}`);
      newResults.push({
        step: 'Firebase Configuration',
        status: 'success',
        message: `Database ID: ${configSummary.databaseId}`,
        details: configSummary,
        durationMs: Math.round(performance.now() - step1Start),
      });
    } catch (err: any) {
      addLog(`Config error: ${err.message}`);
      newResults.push({
        step: 'Firebase Configuration',
        status: 'error',
        message: err.message,
        details: err,
        durationMs: Math.round(performance.now() - step1Start),
      });
    }
    setResults([...newResults]);

    // Step 2: Firestore Ping / Server Connection
    const step2Start = performance.now();
    try {
      addLog('Pinging Firestore server endpoint with getDocFromServer...');
      await getDocFromServer(doc(db, 'test', 'connection'));
      addLog('Firestore server connection verified successfully.');
      newResults.push({
        step: 'Firestore Server Reachability',
        status: 'success',
        message: 'Connected to Firestore server directly',
        durationMs: Math.round(performance.now() - step2Start),
      });
    } catch (err: any) {
      const isOffline = err?.message?.includes('the client is offline');
      const isPermissionDenied = err?.code === 'permission-denied' || err?.message?.includes('Missing or insufficient permissions');
      
      addLog(`Ping response: ${err.message} (code: ${err.code || 'unknown'})`);
      
      if (isPermissionDenied) {
        // Permission denied on test/connection means the server IS reachable, but security rules rejected write/read, which is normal for protected collections
        newResults.push({
          step: 'Firestore Server Reachability',
          status: 'success',
          message: 'Server responded (security rules active)',
          details: { code: err.code, note: 'Server is reachable; test doc is protected by security rules.' },
          durationMs: Math.round(performance.now() - step2Start),
        });
      } else if (isOffline) {
        newResults.push({
          step: 'Firestore Server Reachability',
          status: 'error',
          message: 'Client is offline or network connection blocked',
          details: err,
          durationMs: Math.round(performance.now() - step2Start),
        });
      } else {
        newResults.push({
          step: 'Firestore Server Reachability',
          status: 'warning',
          message: err.message || 'Unexpected response from Firestore',
          details: err,
          durationMs: Math.round(performance.now() - step2Start),
        });
      }
    }
    setResults([...newResults]);

    // Step 3: Auth State Verification
    const step3Start = performance.now();
    try {
      const user = auth.currentUser;
      const authInfo = {
        authenticated: !!user,
        uid: user?.uid || null,
        email: user?.email || null,
        isAnonymous: user?.isAnonymous || false,
      };
      addLog(`Auth state: user=${authInfo.uid || 'Anonymous/Guest'}, email=${authInfo.email || 'None'}`);
      newResults.push({
        step: 'Firebase Authentication State',
        status: user ? 'success' : 'warning',
        message: user ? `Signed in as ${user.email || user.uid}` : 'Running as unauthenticated candidate / guest session',
        details: authInfo,
        durationMs: Math.round(performance.now() - step3Start),
      });
    } catch (err: any) {
      addLog(`Auth check failed: ${err.message}`);
      newResults.push({
        step: 'Firebase Authentication State',
        status: 'error',
        message: err.message,
        details: err,
        durationMs: Math.round(performance.now() - step3Start),
      });
    }
    setResults([...newResults]);

    // Step 4: Curriculum Exam Papers Check (Local & Cloud)
    const step4Start = performance.now();
    try {
      const localPapersCount = QUIZ_PAPERS.length;
      addLog(`Curriculum papers memory check: ${localPapersCount} papers loaded in memory.`);

      // Also probe cloud papers collection
      let cloudCount = 0;
      try {
        const snap = await getDocs(query(collection(db, 'papers'), limit(5)));
        cloudCount = snap.size;
        addLog(`Cloud papers query successful: found ${cloudCount} documents in /papers.`);
      } catch (cloudErr: any) {
        addLog(`Cloud papers query note: ${cloudErr.message}`);
      }

      newResults.push({
        step: 'Curriculum Exam Papers Dataset',
        status: localPapersCount > 0 ? 'success' : 'error',
        message: `${localPapersCount} Grade 12 Papers loaded in memory (Cloud docs: ${cloudCount})`,
        details: {
          papersAvailable: localPapersCount,
          subjects: ['economics', 'business_studies', 'accounting', 'maths_literacy', 'english_hg', 'afrikaans_fal'],
        },
        durationMs: Math.round(performance.now() - step4Start),
      });
    } catch (err: any) {
      newResults.push({
        step: 'Curriculum Exam Papers Dataset',
        status: 'error',
        message: err.message,
        details: err,
        durationMs: Math.round(performance.now() - step4Start),
      });
    }
    setResults([...newResults]);

    // Step 5: User Profiles Collection Access
    const step5Start = performance.now();
    try {
      addLog('Testing read access to /users collection...');
      const usersSnap = await getDocs(query(collection(db, 'users'), limit(3)));
      addLog(`Users collection query returned ${usersSnap.size} profile documents.`);
      newResults.push({
        step: 'Firestore /users Collection',
        status: 'success',
        message: `Query successful (retrieved ${usersSnap.size} profiles)`,
        durationMs: Math.round(performance.now() - step5Start),
      });
    } catch (err: any) {
      addLog(`Users collection error: ${err.message} (${err.code || 'unknown'})`);
      newResults.push({
        step: 'Firestore /users Collection',
        status: err.code === 'permission-denied' ? 'warning' : 'error',
        message: err.code === 'permission-denied' ? 'Protected by Security Rules (Authentication Required)' : err.message,
        details: { code: err.code, message: err.message },
        durationMs: Math.round(performance.now() - step5Start),
      });
    }

    addLog('Diagnostic scan completed.');
    setResults([...newResults]);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isOpen) {
      runDiagnostics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleCopy = () => {
    const summary = {
      timestamp: new Date().toISOString(),
      results,
      logs: rawLogs,
    };
    navigator.clipboard.writeText(JSON.stringify(summary, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#15070a] border border-rose-200 dark:border-rose-900/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 dark:border-rose-950 flex items-center justify-between bg-rose-50/50 dark:bg-[#1a080d]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
              <Activity className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Firestore & System Diagnostics</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-red-600 text-white">
                  Live
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-rose-300/80">
                Database connectivity, authentication status, and paper repository integrity check.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-rose-200 dark:border-rose-900/60 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-rose-100 dark:hover:bg-[#250e14] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Quick status bar */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-rose-50/60 dark:bg-[#1f090e] border border-rose-200/70 dark:border-rose-900/40 text-xs flex-wrap">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-red-600 dark:text-[#FF6B6B]" />
              <span className="font-semibold text-slate-700 dark:text-rose-200">
                Project: <code className="font-mono text-red-600 dark:text-rose-300">{firebaseConfig.projectId}</code>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-rose-200">
                Exam Papers: <span className="font-bold text-emerald-600 dark:text-emerald-400">{QUIZ_PAPERS.length} loaded</span>
              </span>
            </div>
          </div>

          {/* Test Results Cards */}
          <div className="space-y-2.5">
            {results.map((res, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  res.status === 'success'
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                    : res.status === 'warning'
                    ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40'
                    : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {res.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : res.status === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{res.step}</span>
                      {res.durationMs !== undefined && (
                        <span className="text-[10px] font-mono text-slate-400 font-normal">
                          {res.durationMs}ms
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {res.message}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  res.status === 'success'
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : res.status === 'warning'
                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'bg-red-500/10 text-red-700 dark:text-red-300'
                }`}>
                  {res.status}
                </span>
              </div>
            ))}
          </div>

          {/* Console Output Log Terminal */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-rose-200">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-red-600 dark:text-[#FF6B6B]" />
                <span>Diagnostic Event Logs</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <div className="bg-[#0b0305] text-rose-200 font-mono text-[11px] p-3 rounded-2xl max-h-40 overflow-y-auto space-y-1 border border-rose-950 select-text">
              {rawLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed opacity-90">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-rose-100 dark:border-rose-950 flex items-center justify-between gap-3 bg-white dark:bg-[#15070a] flex-wrap">
          <button
            type="button"
            onClick={runDiagnostics}
            disabled={isRunning}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running Diagnostic Scan...' : 'Re-run Diagnostics'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-[#200b10] border border-rose-200 dark:border-rose-900 text-xs font-bold text-slate-700 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-[#2c1017] transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
