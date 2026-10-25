'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Building2, 
  KeyRound, 
  Sparkles, 
  ShieldCheck,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  Lock,
  Search,
  CheckCircle2,
  FileText,
  Clock,
  ChevronLeft,
  ExternalLink,
  Check,
  Play,
  ArrowRight,
  BookOpen,
  Edit3,
  Loader2,
  Upload,
  Camera,
  Image as ImageIcon,
  Plus,
  RotateCw,
  HelpCircle,
  Layers,
  Filter
} from 'lucide-react';
import { QUIZ_PAPERS, QuizPaper, Question } from '@/lib/quiz-data';
import { 
  getLocalCustomQuestions,
  getLocalDeletedQuestions,
  applyCustomQuestionsToPaper,
  syncCustomQuestionsFromCloud,
  deleteQuestionPermanently
} from '@/lib/custom-questions';
import { AdminEditQuestionModal } from './AdminEditQuestionModal';
import { 
  UserProfile, 
  ExamAttempt,
  getAllUsers, 
  createOrLoginCandidate, 
  loginByAccessCode,
  loginByAccessCodeAsync,
  loginAsAdministrator,
  loginAsCandidate,
  isMasterKeyCode,
  generateCandidateAccessCode,
  deleteUserByAdmin,
  isAdminUser,
  getKeyCapacity,
  getUserExamAttemptCount,
  getCandidateExamAttempts,
  getCandidateExamAttemptsAsync,
  updateCandidateProfileAndAttempts,
  syncUsersFromCloud,
  subscribeToCloudUsers,
  ADMIN_ACCESS_CODE,
  ADMIN_NAME,
  MAX_KEYS_LIMIT,
  ADMIN_USER,
  DEFAULT_USER,
  BrandingSettings,
  getBrandingSettings,
  updateBrandingSettings,
  updateUserProfileAvatar,
  updateSubsPaidStatus,
  DEFAULT_PRESET_AVATARS,
  removePresetAvatarByIndex,
  addPresetAvatar,
  resetPresetAvatarsToDefault,
  purgeAllApplicationCacheAndResync
} from '@/lib/storage';
import { Cloud, Wifi, Key } from 'lucide-react';
import { VintageLifeRing } from './VintageLifeRing';
import { CopyPasscodeButton } from './CopyPasscodeButton';
import { useAppTheme } from '@/lib/theme';
import { CropperModal } from './CropperModal';

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserChanged: (user: UserProfile) => void;
  onSignOut?: () => void;
  onInspectAttempt?: (attempt: ExamAttempt) => void;
  onSelectPaper?: (paper: QuizPaper) => void;
  onOpenIngestionModal?: () => void;
}

export const UserLoginModal: React.FC<UserLoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged,
  onSignOut,
  onInspectAttempt,
  onSelectPaper,
  onOpenIngestionModal,
}) => {
  const { isDark } = useAppTheme();
  const [activeTab, setActiveTab] = useState<'enter-code' | 'create' | 'admin'>('enter-code');
  
  // Enter code state
  const [inputCode, setInputCode] = useState('');
  const [showInputCode, setShowInputCode] = useState(false);
  const [masterKeyPrompt, setMasterKeyPrompt] = useState(false);
  
  // Create profile form state
  const [name, setName] = useState('');
  const [club, setClub] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [createdSecretProfile, setCreatedSecretProfile] = useState<UserProfile | null>(null);
  
  // Feedback state
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Admin state (Christiaan only)
  const [adminUsersList, setAdminUsersList] = useState<UserProfile[]>([]);
  const [adminSearch, setAdminSearch] = useState('');
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [keyCapacity, setKeyCapacity] = useState({ count: 0, max: MAX_KEYS_LIMIT, available: MAX_KEYS_LIMIT });
  
  // Admin Subtabs: candidates, questions, branding
  const [adminSubTab, setAdminSubTab] = useState<'candidates' | 'questions' | 'branding'>('candidates');
  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings | null>(null);
  const [isSavingBranding, setIsSavingBranding] = useState(false);

  // Admin Question Bank state
  const [adminSelectedPaperId, setAdminSelectedPaperId] = useState<string>(QUIZ_PAPERS[0]?.id || 'safeharbor-paper-1');
  const [adminQuestionSearch, setAdminQuestionSearch] = useState('');
  const [adminQuestionCategoryFilter, setAdminQuestionCategoryFilter] = useState('ALL');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false);
  const [paperQuestionsList, setPaperQuestionsList] = useState<Question[]>([]);
  const [isSyncingQuestions, setIsSyncingQuestions] = useState(false);
  const [deletingQuestionId, setDeletingQuestionId] = useState<number | null>(null);
  
  // Admin test inspection state (Christiaan only)
  const [inspectedCandidate, setInspectedCandidate] = useState<UserProfile | null>(null);
  const [candidateAttempts, setCandidateAttempts] = useState<ExamAttempt[]>([]);

  // Candidate editing state (Christiaan only)
  const [editingCandidate, setEditingCandidate] = useState<UserProfile | null>(null);
  const [editCandidateName, setEditCandidateName] = useState('');
  const [editCandidateClub, setEditCandidateClub] = useState('');
  const [isSavingCandidate, setIsSavingCandidate] = useState(false);

  // Branding & Profile Avatar Upload Handlers
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<'icon' | 'avatar' | 'user-avatar' | 'new-user-avatar' | null>(null);
  const [isUpdatingUserAvatar, setIsUpdatingUserAvatar] = useState(false);

  const handleAppIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setImageToCrop(result);
        setCropTarget('icon');
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setImageToCrop(result);
        setCropTarget('avatar');
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleUserAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setImageToCrop(result);
        setCropTarget('user-avatar');
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleNewCandidateAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setImageToCrop(result);
        setCropTarget('new-user-avatar');
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleRemoveUserAvatar = async () => {
    if (!currentUser) return;
    setIsUpdatingUserAvatar(true);
    try {
      const updated = await updateUserProfileAvatar(currentUser.accessCode, undefined);
      if (updated) {
        onUserChanged(updated);
        setSuccessMsg('Profile icon removed.');
      }
    } catch (err) {
      console.error('Failed to remove profile icon:', err);
      setError('Failed to remove profile icon.');
    } finally {
      setIsUpdatingUserAvatar(false);
    }
  };

  const handleSelectPresetForCurrentUser = async (presetUrl: string) => {
    if (!currentUser) return;
    setIsUpdatingUserAvatar(true);
    try {
      const updated = await updateUserProfileAvatar(currentUser.accessCode, presetUrl);
      if (updated) {
        onUserChanged(updated);
        setSuccessMsg('Profile icon updated successfully!');
      }
    } catch (err) {
      console.error('Failed to update profile icon:', err);
      setError('Failed to update profile icon.');
    } finally {
      setIsUpdatingUserAvatar(false);
    }
  };

  const handleRemovePresetAvatar = async (index: number) => {
    try {
      const updatedList = await removePresetAvatarByIndex(index);
      setBrandingSettings(prev => ({ ...prev, avatars: updatedList }));
      setSuccessMsg('Preset profile picture removed from system.');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Failed to remove preset avatar:', err);
      setError('Failed to remove preset avatar.');
    }
  };

  const handleResetPresetsToDefault = async () => {
    try {
      const defaultList = await resetPresetAvatarsToDefault();
      setBrandingSettings(prev => ({ ...prev, avatars: defaultList }));
      setSuccessMsg('Preset profile pictures restored to Lifeguard defaults.');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Failed to restore preset avatars:', err);
      setError('Failed to restore preset avatars.');
    }
  };

  const handleClearAllPresets = async () => {
    try {
      await updateBrandingSettings({ avatars: [] });
      setBrandingSettings(prev => ({ ...prev, avatars: [] }));
      setSuccessMsg('All preset profile pictures removed.');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Failed to clear preset avatars:', err);
      setError('Failed to clear preset avatars.');
    }
  };

  const handleCrop = async (croppedImage: string) => {
    if (cropTarget === 'icon') {
      setBrandingSettings(prev => ({ ...prev, appIconBase64: croppedImage }));
    } else if (cropTarget === 'avatar') {
      try {
        const updatedList = await addPresetAvatar(croppedImage);
        setBrandingSettings(prev => ({
          ...prev,
          avatars: updatedList
        }));
        setSuccessMsg('New preset profile picture added successfully!');
        setTimeout(() => setSuccessMsg(null), 3500);
      } catch (err) {
        setBrandingSettings(prev => ({
          ...prev,
          avatars: [...(prev?.avatars || []), croppedImage]
        }));
      }
    } else if (cropTarget === 'user-avatar' && currentUser) {
      setIsUpdatingUserAvatar(true);
      try {
        const updated = await updateUserProfileAvatar(currentUser.accessCode, croppedImage);
        if (updated) {
          onUserChanged(updated);
          setSuccessMsg('Profile picture updated successfully!');
          setTimeout(() => setSuccessMsg(null), 3500);
        }
      } catch (err) {
        console.error('Failed to update profile picture:', err);
        setError('Failed to update profile picture.');
      } finally {
        setIsUpdatingUserAvatar(false);
      }
    } else if (cropTarget === 'new-user-avatar') {
      setSelectedAvatar(croppedImage);
      setSuccessMsg('Profile photo selected! Complete registration below to save.');
      setTimeout(() => setSuccessMsg(null), 3500);
    }
    setImageToCrop(null);
    setCropTarget(null);
  };

  const handleSaveBranding = async () => {
    setIsSavingBranding(true);
    try {
      if (brandingSettings) {
        await updateBrandingSettings(brandingSettings);
        setSuccessMsg('Branding & avatar presets saved successfully.');
        setTimeout(() => setSuccessMsg(null), 3500);
      }
    } catch (err) {
      setError('Failed to save branding settings.');
    }
    setIsSavingBranding(false);
  };

  const isCurrentAdmin = isAdminUser(currentUser);

  // Loading / cloud status
  const [isCloudLoading, setIsCloudLoading] = useState(false);

  // Load and refresh questions for active paper
  const refreshAdminQuestions = useCallback(async (targetPaperId?: string) => {
    const paperId = (targetPaperId || adminSelectedPaperId).trim();
    const rawPaper = QUIZ_PAPERS.find((p) => p.id === paperId) || QUIZ_PAPERS[0];
    if (!rawPaper) return;

    setIsSyncingQuestions(true);
    try {
      const cloudData = await syncCustomQuestionsFromCloud(paperId);
      const customized = applyCustomQuestionsToPaper(rawPaper, cloudData.questions, cloudData.deletedQuestionIds);
      setPaperQuestionsList(customized.questions);
    } catch (err) {
      console.warn('Error refreshing admin questions from cloud, falling back to local storage:', err);
      const local = getLocalCustomQuestions(paperId);
      const deleted = getLocalDeletedQuestions(paperId);
      const customized = applyCustomQuestionsToPaper(rawPaper, local, deleted);
      setPaperQuestionsList(customized.questions);
    } finally {
      setIsSyncingQuestions(false);
    }
  }, [adminSelectedPaperId]);

  const handleAdminDeleteQuestion = async (qId: number) => {
    setDeletingQuestionId(qId);
    try {
      await deleteQuestionPermanently(adminSelectedPaperId, qId);
      await refreshAdminQuestions(adminSelectedPaperId);
      setSuccessMsg(`Question #${qId} permanently deleted.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch {
      setError(`Failed to delete Question #${qId}. Please try again.`);
    } finally {
      setDeletingQuestionId(null);
    }
  };

  // Sync questions whenever question subtab is opened or selected paper changes
  useEffect(() => {
    let isMounted = true;
    if (adminSubTab === 'questions') {
      const fetchQuestions = async () => {
        const paperId = adminSelectedPaperId.trim();
        const rawPaper = QUIZ_PAPERS.find((p) => p.id === paperId) || QUIZ_PAPERS[0];
        if (!rawPaper) return;
        setIsSyncingQuestions(true);
        try {
          const cloudData = await syncCustomQuestionsFromCloud(paperId);
          if (isMounted) {
            const customized = applyCustomQuestionsToPaper(rawPaper, cloudData.questions, cloudData.deletedQuestionIds);
            setPaperQuestionsList(customized.questions);
          }
        } catch (err) {
          console.warn('Error refreshing admin questions from cloud:', err);
          if (isMounted) {
            const local = getLocalCustomQuestions(paperId);
            const deleted = getLocalDeletedQuestions(paperId);
            const customized = applyCustomQuestionsToPaper(rawPaper, local, deleted);
            setPaperQuestionsList(customized.questions);
          }
        } finally {
          if (isMounted) {
            setIsSyncingQuestions(false);
          }
        }
      };
      fetchQuestions();
    }
    return () => {
      isMounted = false;
    };
  }, [adminSubTab, adminSelectedPaperId]);

  // Listen to cross-window question modification events
  useEffect(() => {
    const handleQEvent = () => {
      if (adminSubTab === 'questions') {
        refreshAdminQuestions(adminSelectedPaperId);
      }
    };
    window.addEventListener('sho_question_created', handleQEvent);
    window.addEventListener('sho_question_edited', handleQEvent);
    window.addEventListener('sho_question_deleted', handleQEvent);
    return () => {
      window.removeEventListener('sho_question_created', handleQEvent);
      window.removeEventListener('sho_question_edited', handleQEvent);
      window.removeEventListener('sho_question_deleted', handleQEvent);
    };
  }, [adminSubTab, adminSelectedPaperId, refreshAdminQuestions]);

  useEffect(() => {
    if (!isOpen) return;
    const init = () => {
      setError(null);
      setSuccessMsg(null);
      setInputCode('');
      setMasterKeyPrompt(false);
      setCreatedSecretProfile(null);
      setUserToDelete(null);
      setInspectedCandidate(null);
      setCandidateAttempts([]);
      setAdminSearch('');
      setIsCloudLoading(false);
      
      const capacity = getKeyCapacity();
      setKeyCapacity(capacity);
      setAdminUsersList(getAllUsers());

      // Always default to 'enter-code' (no automatic sign-in)
      setActiveTab('enter-code');
    };
    queueMicrotask(init);

    // Sync latest candidates from Firestore cloud and subscribe to live changes
    syncUsersFromCloud().then((cloudUsers) => {
      setAdminUsersList(cloudUsers);
      setKeyCapacity(getKeyCapacity());
    });

    getBrandingSettings().then(settings => setBrandingSettings(settings));

    const unsub = subscribeToCloudUsers((cloudUsers) => {
      setAdminUsersList(cloudUsers);
      setKeyCapacity(getKeyCapacity());
    });

    return () => {
      if (unsub) unsub();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignInWithCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = inputCode.trim().toUpperCase();
    if (!clean) {
      setError('Please enter your secret Access Code');
      return;
    }

    if (isMasterKeyCode(clean)) {
      setMasterKeyPrompt(true);
      return;
    }

    setIsCloudLoading(true);
    try {
      const found = await loginByAccessCodeAsync(clean);
      setIsCloudLoading(false);
      if (found) {
        onUserChanged(found);
        if (isAdminUser(found)) {
          setActiveTab('admin');
          setSuccessMsg(`Welcome. Administrator clearance verified.`);
        } else {
          onClose();
        }
      } else {
        setError('Access Denied: Invalid access key. Only the key holder can access their profile.');
      }
    } catch {
      setIsCloudLoading(false);
      setError('Access verification failed. Please check network connection.');
    }
  };

  const handleSelectAdmin = () => {
    const admin = loginAsAdministrator();
    onUserChanged(admin);
    setActiveTab('admin');
    setSuccessMsg(`Signed in as Administrator. Clearance verified.`);
    setMasterKeyPrompt(false);
  };

  const handleSelectCandidate = () => {
    const candidate = loginAsCandidate();
    onUserChanged(candidate);
    setSuccessMsg(`Signed in as Lifeguard Candidate.`);
    setMasterKeyPrompt(false);
    onClose();
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setError('Please enter candidate name');
      return;
    }

    try {
      const generatedCode = generateCandidateAccessCode();
      const newUser = createOrLoginCandidate(name.trim(), club.trim(), generatedCode, selectedAvatar || undefined);
      setCreatedSecretProfile(newUser);
      setKeyCapacity(getKeyCapacity());
      setAdminUsersList(getAllUsers());
      onUserChanged(newUser);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create candidate profile';
      setError(msg);
    }
  };

  const handleDeleteUser = (target: UserProfile) => {
    if (!currentUser || !isCurrentAdmin) {
      setError(`Unauthorized: Only an Administrator can delete candidate profiles.`);
      return;
    }

    const result = deleteUserByAdmin(currentUser.accessCode, target.id);
    if (result.success) {
      setSuccessMsg(result.message);
      setUserToDelete(null);
      if (inspectedCandidate?.id === target.id) {
        setInspectedCandidate(null);
        setCandidateAttempts([]);
      }
      setAdminUsersList(getAllUsers());
      setKeyCapacity(getKeyCapacity());
      setTimeout(() => setSuccessMsg(null), 3500);
    } else {
      setError(result.message);
    }
  };

  const handleLaunchTest = (paper: QuizPaper) => {
    if (onSelectPaper) {
      onSelectPaper(paper);
      onClose();
    }
  };

  const handleOpenCandidateTests = async (candidate: UserProfile) => {
    if (!currentUser || !isCurrentAdmin) {
      setError(`Unauthorized: Only an Administrator has clearance to access candidate tests.`);
      return;
    }
    setInspectedCandidate(candidate);
    // Instant local attempts first
    const localAttempts = getCandidateExamAttempts(currentUser.accessCode, candidate.id);
    setCandidateAttempts(localAttempts);

    // Fetch latest cloud attempts
    try {
      const cloudAttempts = await getCandidateExamAttemptsAsync(currentUser.accessCode, candidate.id);
      setCandidateAttempts(cloudAttempts);
    } catch (e) {
      console.warn('Could not fetch candidate attempts from cloud:', e);
    }
  };

  const handleInspectSpecificAttempt = (attempt: ExamAttempt) => {
    if (onInspectAttempt) {
      onInspectAttempt(attempt);
      onClose();
    }
  };

  const handleStartEditCandidate = (candidate: UserProfile) => {
    setEditingCandidate(candidate);
    setEditCandidateName(candidate.name);
    setEditCandidateClub(candidate.club || '');
    setError(null);
    setSuccessMsg(null);
  };

  const handleSaveCandidateEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCandidate) return;
    const trimmedName = editCandidateName.trim();
    if (!trimmedName) {
      setError('Candidate name cannot be empty.');
      return;
    }
    setIsSavingCandidate(true);
    setError(null);
    try {
      const updated = await updateCandidateProfileAndAttempts(
        editingCandidate.id,
        trimmedName,
        editCandidateClub.trim(),
        currentUser?.accessCode || ADMIN_ACCESS_CODE
      );
      setAdminUsersList(getAllUsers());
      if (updated) {
        if (inspectedCandidate && inspectedCandidate.id === editingCandidate.id) {
          setInspectedCandidate(updated);
          const attempts = await getCandidateExamAttemptsAsync(currentUser?.accessCode || ADMIN_ACCESS_CODE, updated.id);
          setCandidateAttempts(attempts);
        }
        if (currentUser && currentUser.id === editingCandidate.id) {
          onUserChanged(updated);
        }
      }
      setEditingCandidate(null);
      setSuccessMsg(`Candidate profile updated! All previous exam logs and scores are now tied to "${trimmedName}".`);
    } catch (err) {
      setError('Failed to update candidate profile.');
    } finally {
      setIsSavingCandidate(false);
    }
  };

  const filteredAdminUsers = adminUsersList.filter((u) => {
    const q = adminSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      (u.name || '').toLowerCase().includes(q) ||
      (u.club || '').toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className={`relative w-full max-w-xl rounded-3xl shadow-2xl border overflow-hidden z-10 max-h-[92vh] flex flex-col transition-colors ${
            isDark
              ? 'bg-[#120709] border-red-900/60 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 sunlit-card'
          }`}
        >
          {/* Header */}
          <div className={`p-5 sm:p-6 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'bg-[#180a0e] border-red-900/50' : 'bg-rose-50/70 border-rose-200'
          }`}>
            <div className="flex items-center gap-3">
              <VintageLifeRing size={42} className="shrink-0 drop-shadow-xs" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Candidate Security & Access Portal
                  </h3>
                </div>
                <p className={`text-xs font-medium ${isDark ? 'text-red-400' : 'text-rose-600'}`}>
                  Confidential Key Authentication • Capacity: {keyCapacity.count}/{MAX_KEYS_LIMIT} Keys
                </p>
              </div>
            </div>

            <button
              id="close-login-modal-btn"
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-[#1a0a0d]'
                  : 'text-rose-700 hover:text-red-700 hover:bg-rose-100/70'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className={`flex border-b px-4 pt-2 shrink-0 gap-1.5 overflow-x-auto ${
            isDark ? 'border-red-900/50 bg-[#0d0507]' : 'border-rose-200 bg-rose-50/60'
          }`}>
            <button
              id="tab-enter-code"
              onClick={() => { setActiveTab('enter-code'); setError(null); setSuccessMsg(null); setInspectedCandidate(null); }}
              className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'enter-code'
                  ? isDark
                    ? 'bg-[#180a0e] text-[#FF6B6B] border-t-2 border-[#FF4D4D] shadow-xs'
                    : 'bg-white text-rose-600 border-t-2 border-red-600 shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-[#1c0d12]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Lock className="w-4 h-4 text-red-500" />
              <span>Enter Secret Key</span>
            </button>

            <button
              id="tab-create-profile"
              onClick={() => { setActiveTab('create'); setError(null); setSuccessMsg(null); setInspectedCandidate(null); }}
              className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'create'
                  ? isDark
                    ? 'bg-[#180a0e] text-[#FF6B6B] border-t-2 border-[#FF4D4D] shadow-xs'
                    : 'bg-white text-rose-600 border-t-2 border-red-600 shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-[#1c0d12]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Generate New Key ({keyCapacity.count}/{MAX_KEYS_LIMIT})</span>
            </button>

            {isCurrentAdmin && (
              <button
                id="tab-admin-portal"
                onClick={() => { setActiveTab('admin'); setError(null); setSuccessMsg(null); }}
                className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'admin'
                    ? isDark
                      ? 'bg-[#180a0e] text-amber-400 border-t-2 border-amber-500 shadow-xs'
                      : 'bg-white text-amber-700 border-t-2 border-amber-500 shadow-xs'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-[#1c0d12]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Admin Manager</span>
              </button>
            )}
          </div>

          {/* Modal Body */}
          <div className={`p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 ${
            isDark ? 'bg-[#120709]' : 'bg-white'
          }`}>
            {error && (
              <div className={`p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 ${
                isDark
                  ? 'bg-red-950/80 border border-red-700/80 text-red-200'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {successMsg && (
              <div className={`p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 ${
                isDark
                  ? 'bg-emerald-950/80 border border-emerald-700/80 text-emerald-200'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{successMsg}</span>
              </div>
            )}

            {/* TAB 1: ENTER SECRET ACCESS CODE */}
            {activeTab === 'enter-code' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-[#180a0e] border-red-900/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1 ${
                    isDark ? 'text-[#FF6B6B]' : 'text-rose-600'
                  }`}>
                    <KeyRound className="w-4 h-4 text-red-500" />
                    <span>Private Key Authentication</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Enter your confidential access key to unlock your profile, test progress, and examination history.
                  </p>
                </div>

                {masterKeyPrompt ? (
                  <div className={`p-4 rounded-2xl border-2 space-y-3 ${
                    isDark ? 'bg-[#180a0e] border-red-500 shadow-sm' : 'bg-rose-50/50 border-red-500 shadow-sm'
                  }`}>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <ShieldCheck className="w-5 h-5 text-red-500" />
                      <div>
                        <h4 className="text-sm font-black">Authorized Master Key Verified</h4>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Select which profile mode you wish to access:</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <button
                        id="choose-admin-profile-btn"
                        type="button"
                        onClick={handleSelectAdmin}
                        className="p-3.5 rounded-xl bg-gradient-to-br from-amber-600 to-red-700 text-white text-left font-bold text-xs hover:shadow-lg transition-all group cursor-pointer border border-amber-500/40"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase tracking-wider text-amber-100 bg-amber-900/60 px-1.5 py-0.5 rounded">Administrator</span>
                          <ShieldCheck className="w-4 h-4 text-amber-200" />
                        </div>
                        <div className="text-sm font-black">Administrator</div>
                        <p className="text-[11px] text-amber-100/90 font-normal mt-0.5">Admin Clearance & Candidate Inspector</p>
                      </button>

                      <button
                        id="choose-candidate-profile-btn"
                        type="button"
                        onClick={handleSelectCandidate}
                        className="p-3.5 rounded-xl bg-gradient-to-br from-red-600 to-rose-500 text-white text-left font-bold text-xs hover:shadow-lg transition-all group cursor-pointer border border-red-400/40"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase tracking-wider text-rose-100 bg-red-950/60 px-1.5 py-0.5 rounded">Candidate Mode</span>
                          <User className="w-4 h-4 text-rose-200" />
                        </div>
                        <div className="text-sm font-black">Lifeguard Candidate</div>
                        <p className="text-[11px] text-rose-100/90 font-normal mt-0.5">Assessment and Practice Tests</p>
                      </button>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => setMasterKeyPrompt(false)}
                        className={`text-xs underline cursor-pointer ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        Enter different key
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSignInWithCode} className="space-y-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Secret Access Key
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="candidate-secret-key-input"
                          type={showInputCode ? 'text' : 'password'}
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          placeholder="e.g. SHO-XXXX-XXX or your private key"
                          className={`w-full pl-10 pr-12 py-3 rounded-xl border text-sm font-mono tracking-wider focus:outline-none focus:border-red-500 uppercase ${
                            isDark
                              ? 'border-red-900/60 bg-[#0d0507] text-white'
                              : 'border-slate-300 bg-slate-50 text-slate-900'
                          }`}
                          autoComplete="off"
                          spellCheck={false}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowInputCode(!showInputCode)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                          title={showInputCode ? 'Hide characters' : 'Show characters'}
                        >
                          {showInputCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      id="submit-secret-key-btn"
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold text-sm shadow-[0_0_15px_rgba(255,77,77,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Unlock Profile</span>
                    </button>
                  </form>
                )}

                {/* Currently logged-in profile summary or Not Signed in */}
                <div className={`pt-3 border-t ${isDark ? 'border-red-900/40' : 'border-slate-200'}`}>
                  {currentUser ? (
                    <div className={`p-4 rounded-2xl border flex flex-col gap-3.5 ${
                      isDark 
                        ? 'bg-[#180a0e] border-red-900/50' 
                        : 'bg-gradient-to-b from-rose-50/70 to-white border-rose-200/80 shadow-xs'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative group">
                            {currentUser.avatarImage ? (
                              <div 
                                className="w-11 h-11 rounded-2xl bg-cover bg-center shrink-0 border-2 border-rose-400/80 dark:border-red-700/60 shadow-sm" 
                                style={{ backgroundImage: `url(${currentUser.avatarImage})` }} 
                              />
                            ) : (
                              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${currentUser.avatarColor || 'from-red-600 to-rose-500'} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm border border-white/20`}>
                                {(currentUser.name || 'L').charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-sm font-black truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {currentUser.name}
                              </span>
                              {isCurrentAdmin ? (
                                <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800 text-[10px] font-extrabold uppercase">
                                  Administrator
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-red-950/60 text-red-700 dark:text-rose-300 border border-rose-300 dark:border-rose-900/40 text-[10px] font-extrabold uppercase">
                                  Candidate
                                </span>
                              )}
                            </div>
                            <span className={`text-xs font-medium block truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              {currentUser.club}
                            </span>
                            {/* Creator's Access Key Badge (Selectable) */}
                            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                              <span className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded border select-all cursor-text ${
                                isDark ? 'text-red-400 bg-[#1a0a0d] border-red-800' : 'text-rose-700 bg-rose-100/70 border-rose-300'
                              }`}>
                                {currentUser.accessCode}
                              </span>
                              <CopyPasscodeButton passcode={currentUser.accessCode} size="xs" />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                          {onSignOut && (
                            <button
                              id="signout-modal-btn"
                              type="button"
                              onClick={() => {
                                onSignOut();
                                onClose();
                              }}
                              className="px-2.5 py-1.5 rounded-xl bg-red-100 dark:bg-[#2a1014] border border-red-300 dark:border-red-500/40 text-red-700 dark:text-[#FF6B6B] hover:bg-red-200 dark:hover:bg-[#38151a] text-xs font-bold cursor-pointer transition-colors"
                            >
                              Sign Out
                            </button>
                          )}
                          <button
                            id="close-modal-keep-profile"
                            onClick={onClose}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                              isDark
                                ? 'bg-[#1a0a0d] border-red-800/60 text-red-400 hover:bg-[#113a48]'
                                : 'bg-slate-200 border-slate-300 text-slate-800 hover:bg-slate-300'
                            }`}
                          >
                            Keep Active
                          </button>
                        </div>
                      </div>

                      {/* Profile Icon / Avatar Settings */}
                      <div className={`pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 ${
                        isDark ? 'border-red-900/40' : 'border-rose-200/70'
                      }`}>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                            <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Profile Icon / Photo
                            </span>
                          </div>
                          <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {currentUser.avatarImage 
                              ? 'Custom profile icon is active' 
                              : 'No icon uploaded yet — upload your photo or select an avatar'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <input
                            type="file"
                            id="active-user-avatar-upload"
                            accept="image/*"
                            onChange={handleUserAvatarUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="active-user-avatar-upload"
                            id="upload-profile-icon-btn"
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white text-xs font-bold cursor-pointer transition-all shadow-[0_2px_10px_rgba(244,63,94,0.25)] flex items-center gap-1.5 active:scale-95"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{currentUser.avatarImage ? 'Change Icon' : 'Upload Icon'}</span>
                          </label>

                          {currentUser.avatarImage && (
                            <button
                              id="remove-profile-icon-btn"
                              type="button"
                              onClick={handleRemoveUserAvatar}
                              disabled={isUpdatingUserAvatar}
                              className="px-2.5 py-1.5 rounded-xl border border-red-300 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-100/60 dark:hover:bg-red-950/40 text-xs font-bold cursor-pointer transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Preset Avatar Selection for Current User */}
                      {brandingSettings?.avatars && brandingSettings.avatars.length > 0 && (
                        <div className={`pt-2.5 border-t ${isDark ? 'border-red-900/40' : 'border-rose-100'}`}>
                          <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            Or choose from preset avatars:
                          </span>
                          <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {brandingSettings.avatars.map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleSelectPresetForCurrentUser(preset)}
                                className={`relative w-8 h-8 rounded-lg bg-cover bg-center border-2 transition-all hover:scale-105 cursor-pointer shrink-0 ${
                                  currentUser.avatarImage === preset
                                    ? isDark ? 'border-red-400 ring-2 ring-red-400/40' : 'border-red-500 ring-2 ring-red-500/40'
                                    : 'border-slate-300 dark:border-red-900/60 opacity-80 hover:opacity-100'
                                }`}
                                style={{ backgroundImage: `url(${preset})` }}
                                title="Set as your profile icon"
                              >
                                {currentUser.avatarImage === preset && (
                                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                    <Check className="w-2 h-2" />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`p-3 rounded-xl border text-center text-xs font-medium ${
                      isDark ? 'bg-[#180a0e] border-red-900/50 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}>
                      Status: <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Not Signed In</span>. Enter access code above or generate a key to continue.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: GENERATE NEW SECRET KEY */}
            {activeTab === 'create' && (
              <div className="space-y-4">
                {/* Unlimited Keys Registry Card */}
                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  isDark ? 'bg-[#180a0e] border-red-900/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={`flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <Sparkles className="w-3.5 h-3.5 text-red-500" />
                      Candidate Key Registry
                    </span>
                    <span className={`font-mono ${isDark ? 'text-red-400' : 'text-rose-600'}`}>
                      {keyCapacity.count} Registered • Unlimited
                    </span>
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Register candidate profiles with unlimited access keys and persistent cloud log storage.
                  </p>
                </div>

                {!createdSecretProfile ? (
                  <form onSubmit={handleCreateProfile} className="space-y-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Candidate Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="candidate-fullname-input"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Liam Naidoo"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-red-500 ${
                            isDark
                              ? 'border-red-900/60 bg-[#0d0507] text-white'
                              : 'border-slate-300 bg-slate-50 text-slate-900'
                          }`}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Medical Station / Lifeguard Station
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="candidate-club-input"
                          type="text"
                          value={club}
                          onChange={(e) => setClub(e.target.value)}
                          placeholder="e.g. Durban Surf Medical Station"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-red-500 ${
                            isDark
                              ? 'border-red-900/60 bg-[#0d0507] text-white'
                              : 'border-slate-300 bg-slate-50 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Profile Icon / Photo Selection & Upload */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={`block text-xs font-bold uppercase tracking-wider ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Profile Icon / Photo (Optional)
                        </label>
                        {selectedAvatar && (
                          <button
                            type="button"
                            onClick={() => setSelectedAvatar(null)}
                            className="text-[11px] font-bold text-red-500 hover:text-red-600 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className={`p-3.5 rounded-xl border flex flex-col gap-3 ${
                        isDark 
                          ? 'border-red-900/60 bg-[#180a0e]/50' 
                          : 'border-rose-200/80 bg-rose-50/40'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {selectedAvatar ? (
                              <div
                                className="w-12 h-12 rounded-2xl border-2 border-red-500 bg-cover bg-center shadow-xs"
                                style={{ backgroundImage: `url(${selectedAvatar})` }}
                              />
                            ) : (
                              <div className={`w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center text-xs font-bold ${
                                isDark ? 'border-red-800 text-red-400 bg-red-950/30' : 'border-rose-300 text-rose-400 bg-white'
                              }`}>
                                <User className="w-5 h-5" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {selectedAvatar ? 'Custom Icon Selected' : 'Upload your own icon / photo'}
                            </span>
                            <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              {selectedAvatar ? 'Image cropped and ready to save' : 'Crop and center your photo perfectly'}
                            </span>
                          </div>

                          <input
                            type="file"
                            id="new-candidate-avatar-upload"
                            accept="image/*"
                            onChange={handleNewCandidateAvatarUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="new-candidate-avatar-upload"
                            id="upload-new-avatar-btn"
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white text-xs font-bold cursor-pointer transition-all shadow-[0_2px_10px_rgba(244,63,94,0.25)] flex items-center gap-1.5 shrink-0 active:scale-95"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{selectedAvatar ? 'Change' : 'Upload'}</span>
                          </label>
                        </div>

                        {/* Preset avatars if configured */}
                        {brandingSettings?.avatars && brandingSettings.avatars.length > 0 && (
                          <div className={`pt-2.5 border-t ${isDark ? 'border-red-900/40' : 'border-rose-200/60'}`}>
                            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              Or choose from presets:
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                              {brandingSettings.avatars.map((avatar, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setSelectedAvatar(selectedAvatar === avatar ? null : avatar)}
                                  className={`relative w-9 h-9 rounded-xl border-2 bg-cover bg-center transition-all cursor-pointer ${
                                    selectedAvatar === avatar
                                      ? isDark ? 'border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                                      : isDark ? 'border-red-900/40 hover:border-red-700' : 'border-slate-300 hover:border-slate-400'
                                  }`}
                                  style={{ backgroundImage: `url(${avatar})` }}
                                >
                                  {selectedAvatar === avatar && (
                                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center border border-white dark:border-[#180a0e]">
                                      <Check className="w-2 h-2" />
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      id="generate-and-save-key-btn"
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold text-sm shadow-[0_0_15px_rgba(255,77,77,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Key & Register Candidate</span>
                    </button>
                  </form>
                ) : (
                  /* Key Display for Creator (Selectable Text) */
                  <div className={`space-y-4 p-5 rounded-2xl border-2 shadow-lg animate-in fade-in duration-300 ${
                    isDark ? 'bg-[#180a0e] border-red-700/60' : 'bg-rose-50/50 border-rose-300'
                  }`}>
                    <div className={`flex items-center gap-2 font-black text-sm uppercase tracking-wider ${
                      isDark ? 'text-[#FF6B6B]' : 'text-rose-600'
                    }`}>
                      <ShieldCheck className="w-5 h-5 text-red-500" />
                      <span>Account Key Generated</span>
                    </div>

                    <div className={`p-4 rounded-xl space-y-3 border ${
                      isDark ? 'bg-[#0a0406] text-white border-red-900/40' : 'bg-white text-slate-900 border-slate-200 shadow-xs'
                    }`}>
                      <div className={`flex items-center justify-between text-xs uppercase font-bold ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <span>Candidate Name</span>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{createdSecretProfile.name}</span>
                      </div>

                      <div className={`py-3 text-center p-3 rounded-xl border space-y-2 ${
                        isDark ? 'bg-[#1c0d12] border-red-900/60' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`font-mono text-2xl sm:text-3xl font-black tracking-widest select-all cursor-text block ${
                          isDark ? 'text-red-400' : 'text-rose-600'
                        }`}>
                          {createdSecretProfile.accessCode}
                        </span>
                        <div className="flex justify-center pt-1">
                          <CopyPasscodeButton passcode={createdSecretProfile.accessCode} showText={true} label="Copy Access Key" size="md" />
                        </div>
                      </div>
                    </div>

                    <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                      isDark ? 'bg-[#210f14] border-red-900/60 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                    }`}>
                      <KeyRound className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div className="leading-relaxed font-medium">
                        <strong className={isDark ? 'text-white' : 'text-slate-900'}>Save your access key.</strong>
                        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Use this key to sign in anytime across desktop, mobile, and tablets. Your full assessment progress and exam logs will sync seamlessly.
                        </p>
                      </div>
                    </div>

                    <button
                      id="confirm-saved-key-btn"
                      type="button"
                      onClick={onClose}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold text-sm shadow-[0_0_15px_rgba(255,77,77,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Enter Assessment Portal</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADMIN USER & TEST ACCESS MANAGER (CHRISTIAAN ONLY) */}
            {activeTab === 'admin' && isCurrentAdmin && (
              <div className="space-y-4">
                {/* Admin Header Stats (NO keys shown) */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-[#180a0e] border-amber-500/40' : 'bg-amber-50/70 border-amber-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amber-500" />
                      <div>
                        <h4 className={`text-xs font-black uppercase tracking-wider ${
                          isDark ? 'text-amber-200' : 'text-amber-900'
                        }`}>
                          Administrator Management Portal
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[11px] font-bold ${
                            isDark ? 'text-amber-400/90' : 'text-amber-800'
                          }`}>
                            Authorized Test Inspector & Profile Manager
                          </span>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-[9px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Cloud Synced
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-amber-600 text-white text-[11px] font-black font-mono shadow-xs">
                      {keyCapacity.count} Active Profiles • Unlimited
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Clearance Level: <strong className={isDark ? 'text-amber-300' : 'text-amber-800'}>Administrator</strong>. You have exclusive clearance to inspect all past exam attempts and question answers across candidates, and delete candidate records.
                  </p>
                </div>

                {/* Admin Sub-navigation */}
                <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800 flex-wrap">
                  <button
                    id="admin-subtab-candidates-btn"
                    type="button"
                    onClick={() => setAdminSubTab('candidates')}
                    className={`px-3 py-1.5 text-xs font-bold transition-all rounded-t-lg cursor-pointer ${
                      adminSubTab === 'candidates'
                        ? isDark ? 'text-amber-400 bg-[#180a0e] border-b-2 border-amber-500' : 'text-amber-700 bg-amber-50 border-b-2 border-amber-500'
                        : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <User className="w-4 h-4 inline-block mr-1.5" />
                    Candidates
                  </button>
                  <button
                    id="admin-subtab-questions-btn"
                    type="button"
                    onClick={() => setAdminSubTab('questions')}
                    className={`px-3 py-1.5 text-xs font-bold transition-all rounded-t-lg cursor-pointer ${
                      adminSubTab === 'questions'
                        ? isDark ? 'text-amber-400 bg-[#180a0e] border-b-2 border-amber-500' : 'text-amber-700 bg-amber-50 border-b-2 border-amber-500'
                        : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 inline-block mr-1.5" />
                    Question Bank & Q&A
                  </button>
                  <button
                    id="admin-subtab-branding-btn"
                    type="button"
                    onClick={() => setAdminSubTab('branding')}
                    className={`px-3 py-1.5 text-xs font-bold transition-all rounded-t-lg cursor-pointer ${
                      adminSubTab === 'branding'
                        ? isDark ? 'text-amber-400 bg-[#180a0e] border-b-2 border-amber-500' : 'text-amber-700 bg-amber-50 border-b-2 border-amber-500'
                        : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 inline-block mr-1.5" />
                    Branding & Icons
                  </button>

                  {onOpenIngestionModal && (
                    <button
                      id="admin-subtab-ingest-btn"
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenIngestionModal();
                      }}
                      className="px-3 py-1.5 text-xs font-bold transition-all rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white cursor-pointer ml-auto flex items-center gap-1.5 shadow-xs"
                      title="Ingest DBE Exam Paper & Marking Memo with AI"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      <span>Ingest Paper & Memo</span>
                    </button>
                  )}
                </div>

                {adminSubTab === 'candidates' && (
                  <>
                    {/* Sub-view: Inspected Candidate Tests */}
                    {inspectedCandidate ? (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className={`flex items-center justify-between pb-2 border-b ${
                      isDark ? 'border-red-900/50' : 'border-slate-200'
                    }`}>
                      <button
                        type="button"
                        onClick={() => setInspectedCandidate(null)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                          isDark ? 'text-red-400 hover:text-white' : 'text-rose-600 hover:text-rose-800'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to All Candidates</span>
                      </button>

                      <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {inspectedCandidate.club}
                      </span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDark ? 'bg-[#180a0e] border-red-900/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <h5 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {inspectedCandidate.name}
                        </h5>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Registered: {new Date(inspectedCandidate.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEditCandidate(inspectedCandidate)}
                          className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs ${
                            isDark
                              ? 'bg-[#1a0a0d] hover:bg-[#250f13] border-red-800/60 text-red-400'
                              : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                          }`}
                          title="Edit candidate profile and tie exam tries"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-red-500" />
                          <span>Edit & Tie Exams</span>
                        </button>
                        <div className="text-right">
                          <span className={`text-xs font-bold block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {candidateAttempts.length} {candidateAttempts.length === 1 ? 'Exam Attempt' : 'Exam Attempts'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Attempts List */}
                    <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                      {candidateAttempts.map((attempt) => (
                        <div
                          key={attempt.id}
                          className={`p-3.5 rounded-2xl border transition-colors space-y-2 ${
                            isDark
                              ? 'border-red-900/50 bg-[#180a0e] hover:border-red-700/60'
                              : 'border-slate-200 bg-white hover:border-rose-300 shadow-2xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[11px] font-bold uppercase block tracking-wider ${
                                  isDark ? 'text-[#FF6B6B]' : 'text-rose-600'
                                }`}>
                                  {attempt.paperCode}
                                </span>
                                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {new Date(attempt.completedAt).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <h6 className={`text-xs sm:text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {attempt.paperSubtitle || attempt.paperTitle}
                              </h6>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                                  isDark
                                    ? 'text-white bg-[#1a0a0d] border-red-800/60'
                                    : 'text-slate-800 bg-slate-100 border-slate-200'
                                }`}>
                                  Candidate: {attempt.candidateName || inspectedCandidate.name}
                                </span>
                                {attempt.clubName && (
                                  <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    • {attempt.clubName}
                                  </span>
                                )}
                              </div>
                            </div>

                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-black uppercase ${
                                attempt.passed
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                                  : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700'
                              }`}
                            >
                              {attempt.passed ? 'PASSED' : 'FAILED'} ({attempt.percentage}%)
                            </span>
                          </div>

                          <div className={`flex items-center justify-between pt-1 text-[11px] border-t ${
                            isDark ? 'text-slate-400 border-red-900/40' : 'text-slate-500 border-slate-100'
                          }`}>
                            <div className="flex items-center gap-3">
                              <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                Score: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{attempt.score}/{attempt.totalMarks}</strong>
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {Math.floor(attempt.timeElapsed / 60)}m {attempt.timeElapsed % 60}s
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleInspectSpecificAttempt(attempt)}
                              className={`inline-flex items-center gap-1 text-xs font-bold cursor-pointer ${
                                isDark ? 'text-[#FF6B6B] hover:text-[#ff8a8a]' : 'text-rose-600 hover:text-rose-800'
                              }`}
                            >
                              <span>Inspect Full Test</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {candidateAttempts.length === 0 && (
                        <div className={`p-6 text-center text-xs rounded-2xl border border-dashed ${
                          isDark
                            ? 'text-slate-400 bg-[#180a0e] border-red-900/60'
                            : 'text-slate-500 bg-slate-50 border-slate-300'
                        }`}>
                          This candidate has not completed any exams yet. When they take an exam, all attempts and past logs will be stored here.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Candidate Recovery & Inspector Section Title */}
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-1.5 text-xs font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        <User className="w-4 h-4 text-amber-500" />
                        <span>Registered Candidate Profiles & Exam Records</span>
                      </div>
                      <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {filteredAdminUsers.length} Candidates
                      </span>
                    </div>

                    {/* Search candidate name or club (NO keys) */}
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="admin-search-users-input"
                        type="text"
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        placeholder="Search candidate name or club..."
                        className={`w-full pl-10 pr-4 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-amber-500 ${
                          isDark
                            ? 'border-red-900/60 bg-[#0d0507] text-white'
                            : 'border-slate-300 bg-slate-50 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Delete Confirmation Modal Overlay (NO keys shown) */}
                    {userToDelete && (
                      <div className={`p-4 rounded-2xl border-2 space-y-3 animate-in fade-in duration-200 ${
                        isDark ? 'bg-[#2a0e14] border-red-500/80' : 'bg-red-50 border-red-400'
                      }`}>
                        <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span>Confirm Deletion of Candidate Profile</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-red-200' : 'text-red-800'}`}>
                          Are you sure you want to delete candidate <strong>{userToDelete.name}</strong> ({userToDelete.club})?
                          This will permanently remove their profile and all associated exam logs from the database.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(userToDelete)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Yes, Delete Profile</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setUserToDelete(null)}
                            className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                              isDark
                                ? 'bg-[#180a0e] border-red-900/60 text-slate-300 hover:bg-[#1a0a0d]'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Candidate Recovery & Inspector Table / List */}
                    <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                      {filteredAdminUsers.map((u) => {
                        const isAdmin = isAdminUser(u);
                        const examCount = getUserExamAttemptCount(u.id);

                        return (
                          <div
                            key={u.id}
                            className={`p-3.5 rounded-2xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs w-full overflow-hidden ${
                              isDark
                                ? 'border-red-900/50 bg-[#180a0e] hover:border-red-700/60'
                                : 'border-slate-200 bg-white hover:border-rose-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 w-full">
                              {u.avatarImage ? (
                                <div className="w-10 h-10 rounded-xl bg-cover bg-center shrink-0 border border-slate-200 dark:border-red-900/50 shadow-xs" style={{ backgroundImage: `url(${u.avatarImage})` }} />
                              ) : (
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${u.avatarColor || 'from-red-600 to-rose-500'} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                                  {(u.name || 'L').substring(0, 2).toUpperCase()}
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap min-w-0">
                                  <span className={`font-bold text-xs sm:text-sm truncate max-w-full ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                  }`}>
                                    {u.name}
                                  </span>
                                  {isAdmin && (
                                    <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800 text-[10px] font-black uppercase">
                                      Administrator
                                    </span>
                                  )}
                                </div>
                                <div className={`flex items-center gap-2 text-[11px] mt-0.5 font-sans flex-wrap min-w-0 ${
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}>
                                  <span className="truncate max-w-[120px] xs:max-w-[160px] sm:max-w-[220px]">
                                    {u.club}
                                  </span>
                                  <span>•</span>
                                  <span>
                                    {examCount} {examCount === 1 ? 'test' : 'tests'}
                                  </span>
                                </div>

                                {/* Plain-Text Passkey for Credential Recovery */}
                                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                                  <span className={`text-[10px] uppercase font-bold ${
                                    isDark ? 'text-slate-400' : 'text-slate-500'
                                  }`}>Passkey:</span>
                                  <span className={`font-mono text-xs font-black px-2 py-0.5 rounded select-all cursor-text border ${
                                    isDark
                                      ? 'text-red-400 bg-[#1a0a0d] border-red-800'
                                      : 'text-rose-700 bg-rose-50 border-rose-200'
                                  }`}>
                                    {u.accessCode}
                                  </span>
                                  <CopyPasscodeButton passcode={u.accessCode} size="xs" />
                                </div>
                                
                                {/* Swim Time & Subscription Status */}
                                <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-red-900/30 flex flex-wrap gap-4 items-center">
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-[10px] uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                      400m Swim:
                                    </span>
                                    <span className={`font-mono text-xs font-semibold ${
                                      u.swimTime400m 
                                        ? isDark ? 'text-red-400' : 'text-red-600' 
                                        : isDark ? 'text-slate-500' : 'text-slate-400'
                                    }`}>
                                      {u.swimTime400m || 'Not logged'}
                                    </span>
                                  </div>
                                  <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                      type="checkbox" 
                                      checked={!!u.subsPaid}
                                      onChange={async (e) => {
                                        const isPaid = e.target.checked;
                                        // Update local state immediately for optimistic UI
                                        setAdminUsersList(prev => prev.map(user => 
                                          user.id === u.id ? { ...user, subsPaid: isPaid } : user
                                        ));
                                        try {
                                          await updateSubsPaidStatus(u.id, isPaid, isCurrentAdmin);
                                        } catch (err) {
                                          console.error('Failed to update subscription status:', err);
                                          // Revert on failure
                                          setAdminUsersList(prev => prev.map(user => 
                                            user.id === u.id ? { ...user, subsPaid: !isPaid } : user
                                          ));
                                        }
                                      }}
                                      className="w-3.5 h-3.5 accent-rose-500 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors"
                                    />
                                    <span className={`text-[11px] font-semibold transition-colors ${
                                      u.subsPaid 
                                        ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                                        : isDark ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-600'
                                    }`}>
                                      {u.subsPaid ? 'Subscription Paid' : 'Subscription Unpaid'}
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>

                            {/* Actions (Administrator) */}
                            <div className={`flex items-center gap-1.5 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 w-full sm:w-auto justify-end ${
                              isDark ? 'border-red-900/40' : 'border-slate-100'
                            }`}>
                              <button
                                id={`admin-edit-user-${u.id}`}
                                type="button"
                                onClick={() => handleStartEditCandidate(u)}
                                className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                                  isDark
                                    ? 'bg-[#1a0a0d] hover:bg-[#250f13] border-red-800/60 text-slate-200'
                                    : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                                }`}
                                title={`Edit candidate name & tie previous exam tries to ${u.name}`}
                              >
                                <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                                <span>Edit</span>
                              </button>

                              <button
                                id={`admin-access-tests-${u.id}`}
                                type="button"
                                onClick={() => handleOpenCandidateTests(u)}
                                className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                                  isDark
                                    ? 'bg-[#1a0a0d] hover:bg-[#250f13] border-red-800 text-red-400'
                                    : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                                }`}
                                title={`Access tests completed by ${u.name}`}
                              >
                                <FileText className="w-3.5 h-3.5 text-red-500" />
                                <span>Tests ({examCount})</span>
                              </button>

                              {!isAdmin && (
                                <button
                                  id={`admin-delete-user-${u.id}`}
                                  type="button"
                                  onClick={() => setUserToDelete(u)}
                                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-[#2a0e14] border border-transparent hover:border-red-300 dark:hover:border-red-500/40 transition-colors cursor-pointer"
                                  title={`Delete candidate ${u.name}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {filteredAdminUsers.length === 0 && (
                        <div className={`p-6 text-center text-xs rounded-2xl border border-dashed ${
                          isDark
                            ? 'text-slate-400 bg-[#180a0e] border-red-900/60'
                            : 'text-slate-500 bg-slate-50 border-slate-300'
                        }`}>
                          No candidate profiles match &quot;{adminSearch}&quot;
                        </div>
                      )}
                    </div>
                  </>
                )}
                  </>
                )}

                {adminSubTab === 'branding' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className={`p-4 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#180a0e] border-red-900/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        App Icon (PWA)
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className={`w-20 h-20 rounded-2xl border-2 overflow-hidden flex items-center justify-center bg-cover bg-center ${
                          isDark ? 'border-red-800 bg-[#1a0a0d]' : 'border-slate-300 bg-white'
                        }`}
                        style={brandingSettings?.appIconBase64 ? { backgroundImage: `url(${brandingSettings.appIconBase64})` } : {}}
                        >
                          {!brandingSettings?.appIconBase64 && <Sparkles className="w-8 h-8 opacity-20" />}
                        </div>
                        <div>
                          <input type="file" id="appIconUpload" accept="image/*" onChange={handleAppIconUpload} className="hidden" />
                          <label htmlFor="appIconUpload" className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors border inline-block ${
                            isDark ? 'bg-[#1a0a0d] border-red-800 text-red-400 hover:bg-[#250f13]' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                          }`}>
                            Upload Custom Icon
                          </label>
                          <p className={`text-[10px] mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Upload a square image (e.g., 512x512). This will replace the PWA app icon.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Candidate Presets Management Section */}
                    <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#180a0e] border-red-900/50' : 'bg-rose-50/40 border-rose-200/80'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Candidate Avatar Presets
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isDark ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60' : 'bg-rose-100 text-rose-700 border border-rose-200'
                          }`}>
                            {brandingSettings?.avatars?.length || 0} active
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <input 
                            type="file" 
                            id="admin-avatar-preset-upload" 
                            accept="image/*" 
                            onChange={handleAvatarUpload} 
                            className="hidden" 
                          />
                          <label 
                            htmlFor="admin-avatar-preset-upload" 
                            id="add-preset-avatar-btn"
                            className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-all bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white shadow-[0_2px_8px_rgba(244,63,94,0.25)] flex items-center gap-1 active:scale-95"
                          >
                            <Upload className="w-3 h-3" />
                            <span>+ Upload Preset</span>
                          </label>

                          <button
                            type="button"
                            onClick={handleResetPresetsToDefault}
                            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-colors border ${
                              isDark ? 'bg-[#1a0a0d] border-red-800 text-rose-300 hover:bg-[#250f13]' : 'bg-white border-rose-200 text-slate-700 hover:bg-rose-50'
                            }`}
                            title="Reset presets to standard Lifeguard emblems"
                          >
                            Restore Defaults
                          </button>

                          {brandingSettings?.avatars && brandingSettings.avatars.length > 0 && (
                            <button
                              type="button"
                              onClick={handleClearAllPresets}
                              className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-colors border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40"
                              title="Remove all preset avatars"
                            >
                              Clear All
                            </button>
                          )}
                        </div>
                      </div>

                      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        These profile picture presets are offered to candidates upon registration or in their profile menu. You can remove individual presets or upload custom team badges.
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {brandingSettings?.avatars?.map((avatar, i) => (
                          <div 
                            key={i} 
                            className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2.5 transition-all ${
                              isDark ? 'bg-[#050d17] border-red-900/60 hover:border-red-700' : 'bg-white border-rose-200/80 hover:border-rose-300 shadow-xs'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div 
                                className="w-10 h-10 rounded-xl border border-rose-200 dark:border-red-900/80 bg-cover bg-center shrink-0 shadow-xs" 
                                style={{ backgroundImage: `url(${avatar})` }} 
                              />
                              <div className="min-w-0">
                                <span className={`text-xs font-bold block truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                  Preset #{i + 1}
                                </span>
                                <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  Active Badge
                                </span>
                              </div>
                            </div>

                            <button
                              id={`remove-preset-btn-${i}`}
                              type="button"
                              onClick={() => handleRemovePresetAvatar(i)}
                              className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/50 hover:bg-rose-100 hover:text-rose-700 dark:hover:bg-rose-900/60 transition-colors cursor-pointer shrink-0"
                              title={`Remove Preset #${i + 1}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        {(!brandingSettings?.avatars || brandingSettings.avatars.length === 0) && (
                          <div className={`col-span-full p-4 rounded-xl border border-dashed text-center text-xs italic ${
                            isDark ? 'border-red-900 text-slate-500 bg-[#040a12]' : 'border-rose-200 text-slate-400 bg-white'
                          }`}>
                            No preset avatars configured. Click &ldquo;+ Upload Preset&rdquo; or &ldquo;Restore Defaults&rdquo; above.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Module Icon Management Section */}
                    <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#180a0e] border-red-900/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Module Icons
                      </h4>
                      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Set custom icons for each curriculum module displayed on the dashboard.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {QUIZ_PAPERS.map((paper) => (
                          <div key={paper.id} className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl border ${
                                isDark ? 'border-red-900 bg-[#1a0a0d]' : 'border-slate-300 bg-white'
                            } flex items-center justify-center`}>
                              {brandingSettings?.moduleIcons?.[paper.id] ? (
                                <div className="w-full h-full rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${brandingSettings.moduleIcons[paper.id]})` }} />
                              ) : (
                                <Sparkles className="w-5 h-5 opacity-40" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-[11px] font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{paper.title}</p>
                              <input 
                                type="text" 
                                placeholder="Image URL..." 
                                className={`w-full text-[10px] p-1 rounded border ${isDark ? 'bg-[#0d0507] border-red-900 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                                value={brandingSettings?.moduleIcons?.[paper.id] || ''}
                                onChange={(e) => {
                                    setBrandingSettings(prev => ({
                                        ...prev,
                                        moduleIcons: { ...(prev?.moduleIcons || {}), [paper.id]: e.target.value }
                                    } as BrandingSettings));
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleSaveBranding}
                        disabled={isSavingBranding}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white text-xs font-bold transition-all shadow-[0_2px_10px_rgba(244,63,94,0.25)] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                      >
                        {isSavingBranding && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        Save Branding Settings
                      </button>
                    </div>
                  </div>
                )}

                {/* Question Bank & Q&A Subtab */}
                {adminSubTab === 'questions' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Top Control Bar: Paper Selector, Add New Question Button, Sync */}
                    <div className={`p-4 rounded-2xl border space-y-3.5 ${
                      isDark ? 'bg-[#180a0e] border-red-900/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Curriculum Question Bank
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              {paperQuestionsList.length} Questions
                            </span>
                          </div>
                          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Live cloud synchronization with Firestore & Assessment Protocols
                          </p>
                        </div>

                        {/* Action buttons: Add New Question + Refresh from Cloud */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            id="admin-add-new-question-btn"
                            type="button"
                            onClick={() => setIsAddingNewQuestion(true)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white text-xs font-bold transition-all shadow-[0_2px_10px_rgba(244,63,94,0.3)] flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                            title="Open blank Admin Q&A Editor to insert a new question"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add New Question</span>
                          </button>

                          <button
                            id="admin-refresh-questions-btn"
                            type="button"
                            onClick={() => refreshAdminQuestions(adminSelectedPaperId)}
                            disabled={isSyncingQuestions}
                            className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
                              isDark 
                                ? 'bg-[#1a0a0d] border-red-800 text-rose-300 hover:bg-[#250f13]' 
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                            title="Sync latest custom questions from Cloud Firestore"
                          >
                            <RotateCw className={`w-4 h-4 ${isSyncingQuestions ? 'animate-spin text-amber-500' : ''}`} />
                          </button>

                          <button
                            id="admin-purge-cache-questions-btn"
                            type="button"
                            onClick={async () => {
                              setIsSyncingQuestions(true);
                              try {
                                await purgeAllApplicationCacheAndResync();
                                await refreshAdminQuestions(adminSelectedPaperId);
                              } finally {
                                setIsSyncingQuestions(false);
                              }
                            }}
                            disabled={isSyncingQuestions}
                            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                              isDark 
                                ? 'bg-[#1a0a0d] border-red-800 text-rose-300 hover:bg-[#250f13]' 
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                            title="Clear local question progress caches and force re-sync with Firestore"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>Clear Cache & Sync</span>
                          </button>
                        </div>
                      </div>

                      {/* Paper selector + Search & Category Filters */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
                        <div className="sm:col-span-5">
                          <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Select Exam Paper
                          </label>
                          <select
                            id="admin-paper-filter-select"
                            value={adminSelectedPaperId}
                            onChange={(e) => setAdminSelectedPaperId(e.target.value)}
                            className={`w-full px-3 py-2 text-xs rounded-xl border font-medium focus:outline-none focus:border-red-500 cursor-pointer ${
                              isDark
                                ? 'border-red-900/60 bg-[#0d0507] text-white'
                                : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          >
                            {QUIZ_PAPERS.map((paper) => (
                              <option key={paper.id} value={paper.id}>
                                {paper.subtitle || paper.title} ({paper.code})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-4">
                          <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Search Questions
                          </label>
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                            <input
                              id="admin-search-questions-input"
                              type="text"
                              value={adminQuestionSearch}
                              onChange={(e) => setAdminQuestionSearch(e.target.value)}
                              placeholder="Search by text, ID, or option..."
                              className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border font-medium focus:outline-none focus:border-red-500 ${
                                isDark
                                  ? 'border-red-900/60 bg-[#0d0507] text-white'
                                  : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Category Filter
                          </label>
                          <select
                            id="admin-category-filter-select"
                            value={adminQuestionCategoryFilter}
                            onChange={(e) => setAdminQuestionCategoryFilter(e.target.value)}
                            className={`w-full px-3 py-2 text-xs rounded-xl border font-medium focus:outline-none focus:border-red-500 cursor-pointer ${
                              isDark
                                ? 'border-red-900/60 bg-[#0d0507] text-white'
                                : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          >
                            <option value="ALL">All Categories ({paperQuestionsList.length})</option>
                            {Array.from(new Set(paperQuestionsList.map(q => q.category || 'General Assessment'))).sort().map(cat => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
                      {paperQuestionsList
                        .filter((q) => {
                          const matchesSearch = !adminQuestionSearch.trim() || 
                            q.question.toLowerCase().includes(adminQuestionSearch.toLowerCase()) ||
                            q.id.toString().includes(adminQuestionSearch.trim()) ||
                            q.options?.some(o => o.text.toLowerCase().includes(adminQuestionSearch.toLowerCase()));
                          const matchesCategory = adminQuestionCategoryFilter === 'ALL' || (q.category || 'General Assessment') === adminQuestionCategoryFilter;
                          return matchesSearch && matchesCategory;
                        })
                        .map((q) => {
                          const isDeletingThis = deletingQuestionId === q.id;

                          return (
                            <div
                              key={q.id}
                              className={`p-3.5 sm:p-4 rounded-2xl border transition-all space-y-2.5 ${
                                isDark 
                                  ? 'bg-[#180a0e] border-red-900/50 hover:border-red-700/60' 
                                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2 py-0.5 rounded-lg bg-red-600 text-white text-[11px] font-black font-mono shadow-xs">
                                    #{q.id}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${
                                    isDark ? 'bg-[#0d0507] border-red-900 text-rose-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                                  }`}>
                                    {q.category || 'Assessment Topic'}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    id={`admin-edit-q-${q.id}`}
                                    type="button"
                                    onClick={() => setEditingQuestion(q)}
                                    className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                      isDark 
                                        ? 'bg-[#1a0a0d] border-red-800 text-rose-300 hover:bg-[#250f13]' 
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                    }`}
                                    title={`Edit Question #${q.id}`}
                                  >
                                    <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                                    <span>Edit</span>
                                  </button>

                                  <button
                                    id={`admin-delete-q-${q.id}`}
                                    type="button"
                                    onClick={() => setEditingQuestion(q)}
                                    disabled={isDeletingThis}
                                    className="p-1.5 rounded-xl border border-red-500/40 text-red-500 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all cursor-pointer disabled:opacity-40"
                                    title={`Delete Question #${q.id}`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                                isDark ? 'text-slate-100' : 'text-slate-900'
                              }`}>
                                {q.question}
                              </p>

                              {/* Options preview grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                                {q.options?.map((opt) => {
                                  const isCorrect = opt.letter === q.correctAnswer;
                                  return (
                                    <div
                                      key={opt.letter}
                                      className={`px-2.5 py-1.5 rounded-xl text-[11px] border flex items-center gap-2 ${
                                        isCorrect
                                          ? isDark
                                            ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200 font-bold'
                                            : 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                          : isDark
                                            ? 'bg-[#0d0507]/60 border-red-900/30 text-slate-400'
                                            : 'bg-slate-50 border-slate-100 text-slate-600'
                                      }`}
                                    >
                                      <span className={`w-4 h-4 rounded text-[10px] font-black flex items-center justify-center shrink-0 ${
                                        isCorrect ? 'bg-emerald-600 text-white' : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                                      }`}>
                                        {opt.letter}
                                      </span>
                                      <span className="truncate">{opt.text}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              {q.explanation && (
                                <p className={`text-[11px] italic border-t pt-2 ${
                                  isDark ? 'border-red-900/30 text-slate-400' : 'border-slate-100 text-slate-500'
                                }`}>
                                  <strong>Rationale:</strong> {q.explanation}
                                </p>
                              )}
                            </div>
                          );
                        })}

                      {paperQuestionsList.length === 0 && (
                        <div className={`p-8 rounded-2xl border border-dashed text-center space-y-3 ${
                          isDark ? 'border-red-900/60 bg-[#0d0507]' : 'border-slate-300 bg-slate-50'
                        }`}>
                          <HelpCircle className="w-8 h-8 mx-auto text-amber-500 opacity-60" />
                          <p className="text-xs font-semibold text-slate-400">
                            No questions found for this paper.
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsAddingNewQuestion(true)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add First Question</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Admin Edit / Add Question Modal */}
          <AdminEditQuestionModal
            isOpen={isAddingNewQuestion || !!editingQuestion}
            isNew={isAddingNewQuestion}
            question={editingQuestion}
            paperId={adminSelectedPaperId}
            availablePapers={QUIZ_PAPERS}
            nextSuggestedId={
              paperQuestionsList.length > 0 
                ? Math.max(...paperQuestionsList.map(q => q.id)) + 1 
                : 1
            }
            onClose={() => {
              setIsAddingNewQuestion(false);
              setEditingQuestion(null);
            }}
            onSave={async (savedQ) => {
              await refreshAdminQuestions(adminSelectedPaperId);
              setSuccessMsg(isAddingNewQuestion ? `New Question #${savedQ.id} created & saved to database!` : `Question #${savedQ.id} updated!`);
              setTimeout(() => setSuccessMsg(null), 3500);
            }}
            onDelete={async (deletedId) => {
              await refreshAdminQuestions(adminSelectedPaperId);
              setSuccessMsg(`Question #${deletedId} permanently deleted.`);
              setTimeout(() => setSuccessMsg(null), 3500);
            }}
          />

          {/* Edit Candidate Profile & Tie Exams Modal */}
          {editingCandidate && (
            <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
              <div className={`w-full max-w-md rounded-3xl shadow-2xl border p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95 ${
                isDark
                  ? 'bg-[#120709] border-red-900/80 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900 sunlit-card'
              }`}>
                <div className={`flex items-center justify-between border-b pb-3 ${
                  isDark ? 'border-red-900/50' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${
                      isDark
                        ? 'bg-[#1a0a0d] border-red-800 text-red-500'
                        : 'bg-rose-50 border-rose-200 text-rose-600'
                    }`}>
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Update Candidate & Tie Exam Tries
                      </h4>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Passkey: <span className={`font-mono font-bold ${isDark ? 'text-red-400' : 'text-rose-600'}`}>{editingCandidate.accessCode}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingCandidate(null)}
                    className={`p-1.5 rounded-lg cursor-pointer ${
                      isDark
                        ? 'text-slate-400 hover:text-white hover:bg-[#1a0a0d]'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveCandidateEdit} className="space-y-3.5">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Full Candidate Name
                    </label>
                    <input
                      type="text"
                      value={editCandidateName}
                      onChange={(e) => setEditCandidateName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-red-500 ${
                        isDark
                          ? 'border-red-900/60 bg-[#0d0507] text-white'
                          : 'border-slate-300 bg-slate-50 text-slate-900'
                      }`}
                      placeholder="e.g. Johnathan Doe"
                      required
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Medical Station / Station
                    </label>
                    <input
                      type="text"
                      value={editCandidateClub}
                      onChange={(e) => setEditCandidateClub(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-red-500 ${
                        isDark
                          ? 'border-red-900/60 bg-[#0d0507] text-white'
                          : 'border-slate-300 bg-slate-50 text-slate-900'
                      }`}
                      placeholder="e.g. Clifton Surf Medical Station"
                    />
                  </div>

                  <div className={`p-3 rounded-xl border text-[11px] space-y-1 ${
                    isDark
                      ? 'bg-[#180a0e] border-red-900/60 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <p className={`font-bold flex items-center gap-1.5 ${
                      isDark ? 'text-[#FF6B6B]' : 'text-rose-600'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                      Candidate Exam Tries Binding:
                    </p>
                    <p className={`leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Updating will re-link all previously completed exam records and future attempts to <strong className={isDark ? 'text-white' : 'text-slate-900'}>{editCandidateName.trim() || 'this candidate'}</strong> across both device storage and cloud database.
                    </p>
                  </div>

                  <div className={`flex items-center justify-end gap-2 pt-2 border-t ${
                    isDark ? 'border-red-900/50' : 'border-slate-200'
                  }`}>
                    <button
                      type="button"
                      onClick={() => setEditingCandidate(null)}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                        isDark
                          ? 'border-red-900/60 text-slate-300 hover:bg-[#1a0a0d]'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingCandidate}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isSavingCandidate ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Save & Tie All Exams</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
        
        {imageToCrop && (
          <CropperModal
            image={imageToCrop}
            isOpen={!!imageToCrop}
            title={
              cropTarget === 'icon' 
                ? 'Crop Application Icon' 
                : cropTarget === 'avatar' 
                ? 'Crop Preset Avatar' 
                : 'Crop Your Profile Icon / Photo'
            }
            onClose={() => { setImageToCrop(null); setCropTarget(null); }}
            onCrop={handleCrop}
          />
        )}
      </div>
    </AnimatePresence>
  );
};
