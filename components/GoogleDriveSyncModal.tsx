'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cloud,
  HardDrive,
  Upload,
  Download,
  Trash2,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FolderPlus,
  Search,
  FileText,
  FileCode,
  File,
  X,
  LogOut,
  Folder,
  Shield,
  Sparkles,
} from 'lucide-react';
import {
  googleSignInForDrive,
  getDriveAccessToken,
  getDriveUser,
  logoutFromDrive,
  initDriveAuth,
  isDriveConnected,
} from '@/lib/googleDriveAuth';
import {
  listDriveFiles,
  getDriveAbout,
  getOrCreateApexPapersFolder,
  backupStudyProgressToDrive,
  deleteDriveFile,
  uploadDriveFile,
  DriveFileItem,
  DriveAboutInfo,
} from '@/lib/googleDriveService';
import { UserProfile, UserProgressData } from '@/lib/storage';

interface GoogleDriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
  userProgress?: UserProgressData | null;
  isDark?: boolean;
}

export const GoogleDriveSyncModal: React.FC<GoogleDriveSyncModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  userProgress,
  isDark = true,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [aboutInfo, setAboutInfo] = useState<DriveAboutInfo | null>(null);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  // Confirmation state for destructive actions (Mandatory user confirmation)
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [quickUploadText, setQuickUploadText] = useState('');
  const [quickUploadTitle, setQuickUploadTitle] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const loadDriveData = useCallback(async (token: string) => {
    setIsLoading(true);
    try {
      const [about, filesResult] = await Promise.all([
        getDriveAbout(token).catch((e) => {
          console.warn('Could not load about info:', e);
          return null;
        }),
        listDriveFiles(token, { pageSize: 25, query: searchQuery }).catch((e) => {
          console.warn('Could not list files:', e);
          return { files: [] };
        }),
      ]);

      if (about) setAboutInfo(about);
      setFiles(filesResult.files || []);
      setIsConnected(true);
    } catch (err: any) {
      console.error('Error loading Drive data:', err);
      setStatusMessage({ text: err.message || 'Failed to connect to Drive', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!isOpen) return;

    // Check if we already have an active token in memory
    getDriveAccessToken().then((token) => {
      if (token) {
        setIsConnected(true);
        loadDriveData(token);
      } else {
        setIsConnected(false);
      }
    });

    const unsubscribe = initDriveAuth(
      (_user, token) => {
        setIsConnected(true);
        loadDriveData(token);
      },
      () => {
        setIsConnected(false);
        setAboutInfo(null);
        setFiles([]);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isOpen, loadDriveData]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const res = await googleSignInForDrive();
      if (res?.accessToken) {
        setIsConnected(true);
        setStatusMessage({ text: 'Connected to Google Drive successfully!', type: 'success' });
        await loadDriveData(res.accessToken);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setStatusMessage({
        text: err.message || 'Google Drive authentication was cancelled or failed.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logoutFromDrive();
    setIsConnected(false);
    setAboutInfo(null);
    setFiles([]);
    setStatusMessage({ text: 'Signed out of Google Drive.', type: 'info' });
  };

  const handleBackupNow = async () => {
    const token = await getDriveAccessToken();
    if (!token) {
      setStatusMessage({ text: 'Please sign in to Google Drive first.', type: 'error' });
      return;
    }

    setIsSyncing(true);
    setStatusMessage(null);
    try {
      const backupPayload = {
        candidate: currentUser,
        progress: userProgress,
        timestamp: new Date().toISOString(),
      };
      const candidateName = currentUser?.name || 'Apex_Candidate';
      const uploadedFile = await backupStudyProgressToDrive(token, backupPayload, candidateName);
      
      setStatusMessage({
        text: `Backed up study data to Google Drive as "${uploadedFile.name}"!`,
        type: 'success',
      });
      await loadDriveData(token);
    } catch (err: any) {
      console.error('Backup failed:', err);
      setStatusMessage({ text: `Backup failed: ${err.message}`, type: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCreateFolder = async () => {
    const token = await getDriveAccessToken();
    if (!token) return;

    setIsSyncing(true);
    try {
      const folderId = await getOrCreateApexPapersFolder(token);
      setStatusMessage({
        text: 'Apex Papers Exam Archive folder created / verified on Google Drive!',
        type: 'success',
      });
      await loadDriveData(token);
    } catch (err: any) {
      setStatusMessage({ text: `Failed to create folder: ${err.message}`, type: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    const token = await getDriveAccessToken();
    if (!token) return;

    setIsDeleting(true);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      setStatusMessage({
        text: `File "${fileToDelete.name}" was permanently removed from Google Drive.`,
        type: 'info',
      });
      setFileToDelete(null);
      await loadDriveData(token);
    } catch (err: any) {
      setStatusMessage({ text: `Failed to delete file: ${err.message}`, type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleQuickUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUploadTitle.trim() || !quickUploadText.trim()) return;
    const token = await getDriveAccessToken();
    if (!token) return;

    setIsSyncing(true);
    try {
      const folderId = await getOrCreateApexPapersFolder(token);
      const fileName = `${quickUploadTitle.trim().replace(/\s+/g, '_')}_${Date.now()}.txt`;
      await uploadDriveFile(token, {
        name: fileName,
        mimeType: 'text/plain',
        content: quickUploadText,
        parentFolderId: folderId,
        description: 'Study Note uploaded via Apex Papers',
      });
      setStatusMessage({ text: `Uploaded "${fileName}" to Google Drive!`, type: 'success' });
      setQuickUploadTitle('');
      setQuickUploadText('');
      setShowUploadForm(false);
      await loadDriveData(token);
    } catch (err: any) {
      setStatusMessage({ text: `Upload failed: ${err.message}`, type: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden z-10 flex flex-col max-h-[90vh] ${
            isDark
              ? 'bg-[#120709] border-rose-900/60 text-slate-100'
              : 'bg-white border-rose-100 text-slate-900 sunlit-card'
          }`}
        >
          {/* Header */}
          <div
            className={`p-5 sm:p-6 border-b flex items-center justify-between shrink-0 ${
              isDark ? 'bg-[#180a0e] border-rose-950/70' : 'bg-rose-50/50 border-rose-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 text-white flex items-center justify-center shadow-md">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Google Drive Integration
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-900">
                    Live Sync
                  </span>
                </div>
                <p className={`text-xs font-semibold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                  Backup past paper scores, export study guides & transcripts
                </p>
              </div>
            </div>

            <button
              id="close-drive-modal-btn"
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-[#250e14]' : 'text-slate-500 hover:text-slate-900 hover:bg-rose-100/50'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
            {/* Status Alert */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 border ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : statusMessage.type === 'error'
                    ? 'bg-red-950/80 border-red-500/50 text-[#FF6B6B]'
                    : 'bg-rose-950/60 border-rose-800/60 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
                <button
                  onClick={() => setStatusMessage(null)}
                  className="text-slate-400 hover:text-white text-xs font-bold px-1"
                >
                  ✕
                </button>
              </motion.div>
            )}

            {/* NOT CONNECTED: Official Sign in with Google Button */}
            {!isConnected ? (
              <div
                className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 ${
                  isDark ? 'bg-[#180a0e]/80 border-rose-900/40' : 'bg-rose-50/40 border-rose-100'
                }`}
              >
                <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-red-500 flex items-center justify-center mx-auto shadow-inner">
                  <HardDrive className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h4 className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Connect your Google Drive Account
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    With your permission, Apex Papers will securely store your Grade 12 practice transcripts,
                    mock exam papers, and question bank backups directly in your personal Google Drive.
                  </p>
                </div>

                {/* Official Material Google Sign-In Button */}
                <div className="pt-2 flex justify-center">
                  <button
                    id="google-drive-signin-btn"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-slate-800 font-bold text-sm shadow-lg hover:shadow-xl hover:bg-slate-50 active:scale-98 transition-all border border-slate-200 cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                    </svg>
                    <span>{isLoading ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    Zero-Trust Security
                  </span>
                  <span>•</span>
                  <span>Direct Browser OAuth</span>
                </div>
              </div>
            ) : (
              /* CONNECTED VIEW */
              <div className="space-y-4">
                {/* User & Storage Profile Card */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDark ? 'bg-[#16080b] border-rose-950/70' : 'bg-rose-50/40 border-rose-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {aboutInfo?.user.photoLink ? (
                      <img
                        src={aboutInfo.user.photoLink}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-rose-500/40 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center">
                        {aboutInfo?.user.displayName?.charAt(0) || 'G'}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {aboutInfo?.user.displayName || 'Google Drive User'}
                        </h4>
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                          Connected
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {aboutInfo?.user.emailAddress}
                      </p>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-2">
                    <button
                      id="refresh-drive-files-btn"
                      onClick={() => {
                        getDriveAccessToken().then((t) => {
                          if (t) loadDriveData(t);
                        });
                      }}
                      disabled={isLoading}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isDark
                          ? 'bg-[#200d11] border-rose-900/50 hover:bg-[#2c1117] text-slate-200'
                          : 'bg-white border-rose-200 hover:bg-rose-50 text-slate-700'
                      }`}
                      title="Refresh file directory"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-red-500' : ''}`} />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>

                    <button
                      id="disconnect-drive-btn"
                      onClick={handleSignOut}
                      className="p-2 rounded-xl border border-rose-900/40 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Disconnect Google Account"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Disconnect</span>
                    </button>
                  </div>
                </div>

                {/* Primary Sync Actions Toolbar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    id="drive-backup-now-btn"
                    onClick={handleBackupNow}
                    disabled={isSyncing}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-xs shadow-md hover:from-red-700 hover:to-rose-600 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isSyncing ? 'Syncing...' : 'Backup Study Progress'}</span>
                  </button>

                  <button
                    id="drive-create-folder-btn"
                    onClick={handleCreateFolder}
                    disabled={isSyncing}
                    className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-[#180a0e] border-rose-900/60 hover:bg-[#240e14] text-rose-200'
                        : 'bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-900'
                    }`}
                  >
                    <FolderPlus className="w-4 h-4 text-red-500" />
                    <span>Create Exam Folder</span>
                  </button>

                  <button
                    id="drive-upload-note-btn"
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-[#180a0e] border-rose-900/60 hover:bg-[#240e14] text-rose-200'
                        : 'bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-900'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-red-500" />
                    <span>Upload Study Note</span>
                  </button>
                </div>

                {/* Quick Upload Form (Expandable) */}
                {showUploadForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleQuickUpload}
                    className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#180a0e] border-rose-900/50' : 'bg-rose-50/60 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                        Upload Note to Google Drive
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowUploadForm(false)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Note Title (e.g. Accounting Grade 12 Formulas)"
                      value={quickUploadTitle}
                      onChange={(e) => setQuickUploadTitle(e.target.value)}
                      required
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-red-500 ${
                        isDark ? 'bg-[#120709] border-rose-950 text-white' : 'bg-white border-rose-200 text-slate-900'
                      }`}
                    />
                    <textarea
                      placeholder="Write or paste your study notes, essay points, or exam summary here..."
                      value={quickUploadText}
                      onChange={(e) => setQuickUploadText(e.target.value)}
                      required
                      rows={3}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-red-500 ${
                        isDark ? 'bg-[#120709] border-rose-950 text-white' : 'bg-white border-rose-200 text-slate-900'
                      }`}
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSyncing}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                      >
                        {isSyncing ? 'Uploading...' : 'Upload to Google Drive'}
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Search Drive Files */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search files on your Google Drive..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-red-500 ${
                      isDark
                        ? 'bg-[#16080b] border-rose-950/70 text-white'
                        : 'bg-rose-50/30 border-rose-200 text-slate-900'
                    }`}
                  />
                </div>

                {/* File List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                    <span>Google Drive Files ({files.length})</span>
                    <span>Apex Exam Archive</span>
                  </div>

                  {isLoading ? (
                    <div className="py-8 text-center space-y-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-red-500 mx-auto" />
                      <p className="text-xs text-slate-400">Loading files from Google Drive...</p>
                    </div>
                  ) : files.length === 0 ? (
                    <div
                      className={`py-8 text-center rounded-2xl border ${
                        isDark ? 'bg-[#140608] border-rose-950/60' : 'bg-rose-50/20 border-rose-100'
                      }`}
                    >
                      <Folder className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                      <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        No files found matching your search.
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Use the &quot;Backup Study Progress&quot; button above to create your first archive!
                      </p>
                    </div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {files.map((file) => {
                        const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                        const isJson = file.name.endsWith('.json') || file.mimeType.includes('json');
                        const isText = file.name.endsWith('.txt') || file.mimeType.includes('text');

                        return (
                          <div
                            key={file.id}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                              isDark
                                ? 'bg-[#16080b] border-rose-950/60 hover:bg-[#200d12]'
                                : 'bg-white border-rose-100 hover:bg-rose-50/60'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                                {isFolder ? (
                                  <Folder className="w-4 h-4" />
                                ) : isJson ? (
                                  <FileCode className="w-4 h-4" />
                                ) : isText ? (
                                  <FileText className="w-4 h-4" />
                                ) : (
                                  <File className="w-4 h-4" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h5
                                  className={`text-xs font-bold truncate ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                  }`}
                                  title={file.name}
                                >
                                  {file.name}
                                </h5>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                  {file.size && <span>{Math.round(Number(file.size) / 1024)} KB</span>}
                                  {file.modifiedTime && (
                                    <span>
                                      • Modified {new Date(file.modifiedTime).toLocaleDateString('en-ZA')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 shrink-0">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                                    isDark
                                      ? 'border-rose-950 text-slate-300 hover:text-white hover:bg-[#2c1117]'
                                      : 'border-rose-100 text-slate-600 hover:text-slate-900 hover:bg-rose-100'
                                  }`}
                                  title="Open file in Google Drive"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {/* Trigger Delete with Mandatory Confirmation */}
                              <button
                                onClick={() => setFileToDelete(file)}
                                className="p-1.5 rounded-lg border border-transparent text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                                title="Delete file from Google Drive"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className={`p-4 border-t text-center shrink-0 ${
              isDark ? 'bg-[#180a0e] border-rose-950/70' : 'bg-rose-50/40 border-rose-100'
            }`}
          >
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Google Drive integration complies with official Workspace OAuth access rules with in-memory tokens.
            </p>
          </div>
        </motion.div>

        {/* MANDATORY USER CONFIRMATION MODAL FOR DELETION */}
        {fileToDelete && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full max-w-sm rounded-2xl p-5 shadow-2xl border ${
                isDark ? 'bg-[#15070a] border-rose-900/80 text-white' : 'bg-white border-rose-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3 text-red-500">
                <Trash2 className="w-5 h-5" />
                <h4 className="text-sm font-black">Confirm Deletion from Google Drive</h4>
              </div>

              <p className="text-xs leading-relaxed text-slate-300 mb-4">
                Are you sure you want to delete <strong className="text-white">&quot;{fileToDelete.name}&quot;</strong> from
                your Google Drive? This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setFileToDelete(null)}
                  disabled={isDeleting}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    isDark
                      ? 'border-rose-950 bg-[#200d11] text-slate-300 hover:text-white'
                      : 'border-slate-200 bg-slate-100 text-slate-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md cursor-pointer transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete from Drive'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
