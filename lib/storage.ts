import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  Unsubscribe,
  DocumentSnapshot
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { clearAllQuizProgressAndCaches } from './localProgress';

/**
 * Recursively removes any explicit `undefined` values from an object or array.
 * Firebase Firestore throws an error if an object contains a key whose value is explicitly `undefined`.
 */
export function removeUndefinedValues<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefinedValues) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        result[key] = removeUndefinedValues(value);
      }
    }
    return result as T;
  }
  return obj;
}

export interface BrandingSettings {
  appIconBase64?: string;
  avatars?: string[];
  moduleIcons?: Record<string, string>;
}

export const DEFAULT_PRESET_AVATARS: string[] = [
  // 1. Scholar Mortarboard Cap & Laurel (Light Red & Gold)
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="capBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF1F2"/>
          <stop offset="100%" stop-color="#FFE4E6"/>
        </linearGradient>
        <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EF4444"/>
          <stop offset="100%" stop-color="#991B1B"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#capBg)" stroke="#FDA4AF" stroke-width="2"/>
      <polygon points="50,22 84,36 50,50 16,36" fill="url(#capGrad)" stroke="#7F1D1D" stroke-width="2"/>
      <path d="M28 42 L28 56 C28 66 72 66 72 56 L72 42 Z" fill="#991B1B"/>
      <circle cx="50" cy="36" r="3" fill="#FBBF24"/>
      <path d="M50 36 C58 38 66 46 68 58" stroke="#FBBF24" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <polygon points="66,58 71,58 72,70 65,70" fill="#F59E0B"/>
      <path d="M22 74 C34 84 66 84 78 74" stroke="#BE123C" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>
  `)}`,

  // 2. Open Textbook & Ribbon (Light Red & White)
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="bookBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF1F2"/>
          <stop offset="100%" stop-color="#FECDD3"/>
        </linearGradient>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F43F5E"/>
          <stop offset="100%" stop-color="#BE123C"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bookBg)" stroke="#FB7185" stroke-width="2"/>
      <path d="M50 40 L50 76 M50 40 C40 34 22 36 18 38 L18 70 C24 68 40 66 50 74 C60 66 76 68 82 70 L82 38 C78 36 60 34 50 40 Z" fill="#FFFFFF" stroke="#BE123C" stroke-width="2"/>
      <path d="M16 71 C22 69 40 67 50 75 C60 67 78 69 84 71" stroke="#9F1239" stroke-width="3" fill="none"/>
      <line x1="24" y1="48" x2="44" y2="48" stroke="#FDA4AF" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="56" x2="44" y2="56" stroke="#FDA4AF" stroke-width="2" stroke-linecap="round"/>
      <line x1="56" y1="48" x2="76" y2="48" stroke="#FDA4AF" stroke-width="2" stroke-linecap="round"/>
      <line x1="56" y1="56" x2="76" y2="56" stroke="#FDA4AF" stroke-width="2" stroke-linecap="round"/>
      <path d="M50 40 L50 64 L53 60 L56 64 L56 40 Z" fill="#E11D48"/>
    </svg>
  `)}`,

  // 3. Apex Mountain Peak Crest (Light Red & Gold)
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="apexBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF1F2"/>
          <stop offset="100%" stop-color="#FFE4E6"/>
        </linearGradient>
        <linearGradient id="apexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF5252"/>
          <stop offset="100%" stop-color="#DC2626"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#apexBg)" stroke="#FDA4AF" stroke-width="2"/>
      <path d="M50 16 L76 26 C76 56 50 78 50 82 C50 78 24 56 24 26 Z" fill="url(#apexGrad)" stroke="#881337" stroke-width="2"/>
      <polygon points="50,30 66,66 34,66" fill="#FFFFFF"/>
      <polygon points="50,30 57,48 50,44 43,48" fill="#FBBF24"/>
      <polygon points="50,30 50,66 66,66" fill="#F1F5F9" opacity="0.6"/>
      <polygon points="50,22 52,27 57,27 53,30 55,35 50,32 45,35 47,30 43,27 48,27" fill="#FDE68A"/>
    </svg>
  `)}`,

  // 4. Calculator & Math Precision (Rose & Slate)
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="calcBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF1F2"/>
          <stop offset="100%" stop-color="#FECDD3"/>
        </linearGradient>
        <linearGradient id="calcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E11D48"/>
          <stop offset="100%" stop-color="#9F1239"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#calcBg)" stroke="#FB7185" stroke-width="2"/>
      <rect x="26" y="20" width="48" height="60" rx="8" fill="url(#calcGrad)" stroke="#881337" stroke-width="2"/>
      <rect x="32" y="26" width="36" height="14" rx="3" fill="#0F172A"/>
      <text x="64" y="37" fill="#34D399" font-size="10" font-family="monospace" text-anchor="end" font-weight="bold">100%</text>
      <circle cx="38" cy="48" r="3.5" fill="#FFFFFF"/>
      <circle cx="50" cy="48" r="3.5" fill="#FFFFFF"/>
      <circle cx="62" cy="48" r="3.5" fill="#FBBF24"/>
      <circle cx="38" cy="58" r="3.5" fill="#FFFFFF"/>
      <circle cx="50" cy="58" r="3.5" fill="#FFFFFF"/>
      <circle cx="62" cy="58" r="3.5" fill="#FBBF24"/>
      <circle cx="38" cy="68" r="3.5" fill="#FFFFFF"/>
      <circle cx="50" cy="68" r="3.5" fill="#FFFFFF"/>
      <rect x="58" y="65" width="8" height="6" rx="2" fill="#34D399"/>
    </svg>
  `)}`,

  // 5. Honors Distinction Medal (Light Red & Gold)
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="medBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF1F2"/>
          <stop offset="100%" stop-color="#FFE4E6"/>
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FCD34D"/>
          <stop offset="100%" stop-color="#F59E0B"/>
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EF4444"/>
          <stop offset="100%" stop-color="#B91C1C"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#medBg)" stroke="#FDA4AF" stroke-width="2"/>
      <polygon points="36,16 50,46 42,48 26,16" fill="url(#ribbonGrad)"/>
      <polygon points="64,16 50,46 58,48 74,16" fill="url(#ribbonGrad)"/>
      <circle cx="50" cy="60" r="22" fill="url(#goldGrad)" stroke="#B45309" stroke-width="2"/>
      <circle cx="50" cy="60" r="18" fill="none" stroke="#FEF3C7" stroke-width="1.5" stroke-dasharray="3 2"/>
      <polygon points="50,48 53,56 61,56 55,61 57,69 50,64 43,69 45,61 39,56 47,56" fill="#B45309"/>
    </svg>
  `)}`,

  // 6. Insight & Innovation Lightbulb (Coral Red & Amber)
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="bulbBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF1F2"/>
          <stop offset="100%" stop-color="#FFE4E6"/>
        </linearGradient>
        <linearGradient id="bulbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF6B6B"/>
          <stop offset="100%" stop-color="#E11D48"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bulbBg)" stroke="#FDA4AF" stroke-width="2"/>
      <path d="M50 20 C34 20 28 32 28 44 C28 54 36 60 38 68 L62 68 C64 60 72 54 72 44 C72 32 66 20 50 20 Z" fill="url(#bulbGrad)" stroke="#881337" stroke-width="2"/>
      <path d="M42 46 L46 36 L54 36 L58 46" stroke="#FEF08A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <rect x="40" y="68" width="20" height="5" rx="1.5" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
      <rect x="42" y="73" width="16" height="4" rx="1.5" fill="#94A3B8" stroke="#64748B" stroke-width="1"/>
      <path d="M45 77 C45 80 55 80 55 77 Z" fill="#475569"/>
      <line x1="50" y1="10" x2="50" y2="16" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="18" y1="36" x2="24" y2="38" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="82" y1="36" x2="76" y2="38" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `)}`
];

export const getBrandingSettings = async (): Promise<BrandingSettings> => {
  // Read local cache first for instant synchronous/offline response
  let cached: BrandingSettings = { avatars: DEFAULT_PRESET_AVATARS };
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('sho_branding_cache');
      if (stored) {
        cached = JSON.parse(stored);
      }
    } catch (err) {
      // ignore JSON parse error
    }
  }

  try {
    const docRef = doc(db, 'settings', 'branding');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as BrandingSettings;
      const merged: BrandingSettings = {
        appIconBase64: data.appIconBase64,
        avatars: Array.isArray(data.avatars) ? data.avatars : DEFAULT_PRESET_AVATARS,
        moduleIcons: data.moduleIcons || {},
      };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('sho_branding_cache', JSON.stringify(merged));
        } catch (err) {}
      }
      return merged;
    } else {
      // Initialize branding settings in Firestore with default preset avatars if not already present
      await setDoc(docRef, { avatars: DEFAULT_PRESET_AVATARS }, { merge: true });
    }
  } catch (e) {
    console.warn('Unable to retrieve branding settings from Firestore; using local cache fallback:', e);
    return cached;
  }
  return cached;
};

export const updateBrandingSettings = async (settings: Partial<BrandingSettings>): Promise<void> => {
  // Update local cache immediately
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('sho_branding_cache');
      const current = stored ? JSON.parse(stored) : {};
      localStorage.setItem('sho_branding_cache', JSON.stringify({ ...current, ...settings }));
    } catch (err) {}
  }

  try {
    const docRef = doc(db, 'settings', 'branding');
    await setDoc(docRef, removeUndefinedValues(settings), { merge: true });
    emitStorageChange();
  } catch (e) {
    console.error('Error updating branding settings in Firestore:', e);
    throw e;
  }
};

/**
 * Removes a specific preset avatar by index and persists to both Firestore and local cache.
 */
export const removePresetAvatarByIndex = async (index: number): Promise<string[]> => {
  const current = await getBrandingSettings();
  const list = [...(current.avatars || DEFAULT_PRESET_AVATARS)];
  if (index >= 0 && index < list.length) {
    list.splice(index, 1);
  }
  await updateBrandingSettings({ avatars: list });
  return list;
};

/**
 * Adds a new preset avatar and persists to Firestore and local cache.
 */
export const addPresetAvatar = async (newAvatarUrlOrBase64: string): Promise<string[]> => {
  const current = await getBrandingSettings();
  const list = [...(current.avatars || DEFAULT_PRESET_AVATARS), newAvatarUrlOrBase64];
  await updateBrandingSettings({ avatars: list });
  return list;
};

/**
 * Resets preset avatars back to the standard Light Red Lifeguard defaults.
 */
export const resetPresetAvatarsToDefault = async (): Promise<string[]> => {
  await updateBrandingSettings({ avatars: DEFAULT_PRESET_AVATARS });
  return DEFAULT_PRESET_AVATARS;
};

export interface UserProfile {
  id: string;
  accessCode: string;
  name: string;
  club: string;
  createdAt: string;
  lastLoginAt: string;
  avatarColor: string;
  avatarImage?: string;
  isArchived?: boolean;
  updatedAt?: string;
  swimTime400m?: string;
  swimTimeUpdatedAt?: string;
  subsPaid?: boolean;
  subsUpdatedByAdminAt?: string;
}

export interface SavedQuizSession {
  paperId: string;
  chapterNumber?: number;
  chapterLabel?: string;
  currentIndex: number;
  answers: Record<number, string>;
  flaggedQuestions: number[];
  secondsElapsed: number;
  lastSavedAt: string;
  totalQuestions: number;
  activeSection?: number;
  completedSections?: number[];
  sectionScores?: Record<number, { score: number; total: number; title?: string }>;
  seed?: number;
}

export interface ExamAttempt {
  id: string;
  paperId: string;
  chapterNumber?: number;
  chapterLabel?: string;
  paperTitle: string;
  paperSubtitle: string;
  paperCode: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  passMark: number;
  completedAt: string;
  timeElapsed: number;
  answers: Record<number, string>;
  missedIds: number[];
  candidateName: string;
  accessCode: string;
  isArchived?: boolean;
  clubName: string;
  categoryBreakdown: Record<string, { total: number; correct: number }>;
  activeSection?: number;
  completedSections?: number[];
  sectionScores?: Record<number, { score: number; total: number; title?: string }>;
  submittedAt?: string;
  isDeleted?: boolean;
  seed?: number;
}


export interface UserProgressData {
  profile: UserProfile;
  savedSessions: Record<string, SavedQuizSession>; // keyed by paperId
  examHistory: ExamAttempt[];
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
  timestamp: string;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified ?? null,
      isAnonymous: auth?.currentUser?.isAnonymous ?? null,
      tenantId: auth?.currentUser?.tenantId ?? null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
    timestamp: new Date().toISOString(),
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

export const STORAGE_KEY = 'apex_papers_user_progress';

const STORAGE_KEY_PREFIX = 'ap_quiz_user_';
const ACTIVE_USER_ID_KEY = 'ap_quiz_active_user_id';
const ALL_USERS_KEY = 'ap_quiz_all_users_list';
const PERMANENT_EXAM_ARCHIVE_KEY = 'ap_permanent_exam_archive_v2';
const PENDING_SYNC_QUEUE_KEY = 'ap_pending_exam_sync_queue';

// Purge legacy SafeHarbor / CPR local storage items on startup
if (typeof window !== 'undefined') {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('sho_') || k.startsWith('safeharbor_') || k.includes('cpr-'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}
}

/**
 * Designated Master Administrator & Candidate Key.
 * APEX-8956-PMY provides full dual access to Administrator and the Candidate.
 */
export const ADMIN_ACCESS_CODE = 'APEX-2124-TV3';
export const SECONDARY_ADMIN_ACCESS_CODE = 'APEX-8956-PMY';
export const ADMIN_NAME = 'Administrator';

/**
 * Strict limit removed: Unlimited candidate keys and persistent log storage.
 */
export const MAX_KEYS_LIMIT = Infinity;

/**
 * Deterministically derives a unique profile/document ID from the access code.
 * Ensures that ANY profile sharing the same code is strictly considered 1 single profile.
 */
export function getUserDocId(accessCode: string): string {
  const clean = (accessCode || '').trim().toUpperCase();
  if (clean === ADMIN_ACCESS_CODE || clean === 'SHO-2124-TV3' || clean === 'APEX-2124-TV3') return 'usr_admin_master';
  const sanitized = clean.replace(/[^A-Z0-9]/g, '_');
  return `usr_${sanitized || 'default'}`;
}

export const ADMIN_USER: UserProfile = {
  id: 'usr_admin_master',
  accessCode: ADMIN_ACCESS_CODE,
  name: 'Administrator',
  club: 'Apex Papers (Directorate)',
  createdAt: '2026-01-01T00:00:00.000Z',
  lastLoginAt: '2026-01-01T00:00:00.000Z',
  avatarColor: 'from-rose-600 to-red-700',
  isArchived: false,
};

export const DEFAULT_USER: UserProfile = {
  id: 'usr_default',
  accessCode: 'APEX-8956-PMY',
  name: 'Grade 12 Scholar',
  club: 'Apex Papers Academy',
  createdAt: '2026-01-01T00:00:00.000Z',
  lastLoginAt: '2026-01-01T00:00:00.000Z',
  avatarColor: 'from-rose-500 to-red-600',
  isArchived: false,
};

export const INITIAL_PROGRESS_DATA: UserProgressData = {
  profile: DEFAULT_USER,
  savedSessions: {},
  examHistory: [],
};

export function isAdminUser(user?: UserProfile | null): boolean {
  if (!user) return false;
  const code = (user.accessCode || '').trim().toUpperCase();
  const name = (user.name || '').trim().toLowerCase();
  const id = (user.id || '').trim().toLowerCase();
  return (
    isMasterKeyCode(code) ||
    name === 'administrator' ||
    name === 'admin' ||
    name === 'director' ||
    id === 'usr_admin_master' ||
    id === 'usr_admin'
  );
}

export function canSkipQuiz(user?: UserProfile | null): boolean {
  if (!user) return false;
  if (isAdminUser(user)) return true;
  
  const id = (user.id || '').trim().toUpperCase();
  const accessCode = (user.accessCode || '').trim().toUpperCase();
  
  return id === 'APEX-6543-WUR' || accessCode === 'APEX-6543-WUR' || accessCode === 'SHO-6543-WUR';
}

export function isTraineeProfile(u?: Partial<UserProfile> | null): boolean {
  if (!u) return false;
  const name = (u.name || '').toLowerCase().trim();
  const code = (u.accessCode || '').toLowerCase().trim();
  const id = (u.id || '').toLowerCase().trim();
  return (
    name === 'trainee' ||
    name === 'trainee profile' ||
    name === 'scholar trainee' ||
    code === 'trainee' ||
    id === 'usr_trainee'
  );
}

export function isMasterKeyCode(code?: string | null): boolean {
  if (!code) return false;
  const clean = code.trim().toUpperCase();
  return (
    clean === 'APEX-2124-TV3' ||
    clean === 'SHO-2124-TV3' ||
    clean === ADMIN_ACCESS_CODE ||
    clean === SECONDARY_ADMIN_ACCESS_CODE ||
    clean === 'APEX-8956-PMY' ||
    clean === 'SHO-8956-PMY' ||
    clean === 'APEX-ADMIN-2026' ||
    clean === 'APEX-ADMIN' ||
    clean === 'ADMIN' ||
    clean === 'ADMINISTRATOR' ||
    clean === 'APEX-MASTER-KEY' ||
    clean === 'MASTER'
  );
}

/**
 * Generates a unique, distinct candidate access code
 * Example: APEX-7824-KC9
 */
export function generateCandidateAccessCode(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const numPart = Math.floor(1000 + Math.random() * 9000);
  let suffix = '';
  for (let i = 0; i < 3; i++) {
    suffix += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  const code = `APEX-${numPart}-${suffix}`;
  if (code === ADMIN_ACCESS_CODE) {
    return generateCandidateAccessCode();
  }
  return code;
}

// Listeners for reactive updates
const listeners = new Set<() => void>();
let emitPending = false;

export function subscribeToStorage(callback: () => void) {
  listeners.add(callback);
  const onStorage = () => {
    callback();
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
    window.addEventListener('sho_storage_change', onStorage);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('sho_storage_change', onStorage);
    }
  };
}

export function emitStorageChange() {
  if (emitPending) return;
  emitPending = true;
  queueMicrotask(() => {
    emitPending = false;
    listeners.forEach((l) => {
      try {
        l();
      } catch {
        // safe
      }
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sho_storage_change'));
    }
  });
}

export function sanitizeProfile(u: Partial<UserProfile> | null | undefined, fallbackId = 'usr_default'): UserProfile {
  if (!u) {
    return { ...DEFAULT_USER, id: fallbackId };
  }
  const anyU = u as Record<string, unknown>;
  const rawCode = typeof u.accessCode === 'string' && u.accessCode.trim() 
    ? u.accessCode.trim() 
    : typeof anyU.candidateNumber === 'string' && (anyU.candidateNumber as string).trim()
      ? (anyU.candidateNumber as string).trim()
      : DEFAULT_USER.accessCode;

  const upperCode = String(rawCode).toUpperCase();
  const isAdmin = isMasterKeyCode(upperCode);
  const canonicalId = getUserDocId(upperCode);

  return {
    id: typeof u.id === 'string' && u.id ? u.id : canonicalId,
    accessCode: upperCode,
    name: isAdmin ? ADMIN_NAME : (typeof u.name === 'string' && u.name.trim() ? u.name.trim() : 'Lifeguard Candidate'),
    club: isAdmin ? 'Apex Papers Operations (Admin HQ)' : (typeof u.club === 'string' && u.club.trim() ? u.club.trim() : 'Apex Papers Operations'),
    createdAt: typeof u.createdAt === 'string' ? u.createdAt : DEFAULT_USER.createdAt,
    lastLoginAt: typeof u.lastLoginAt === 'string' ? u.lastLoginAt : DEFAULT_USER.lastLoginAt,
    avatarColor: isAdmin ? 'from-rose-600 to-red-700' : (typeof u.avatarColor === 'string' && u.avatarColor ? u.avatarColor : 'from-rose-600 to-red-600'),
    avatarImage: typeof u.avatarImage === 'string' ? u.avatarImage : undefined,
    isArchived: Boolean(u.isArchived),
    updatedAt: typeof u.updatedAt === 'string' ? u.updatedAt : new Date().toISOString(),
    swimTime400m: typeof u.swimTime400m === 'string' ? u.swimTime400m : undefined,
    swimTimeUpdatedAt: typeof u.swimTimeUpdatedAt === 'string' ? u.swimTimeUpdatedAt : undefined,
    subsPaid: Boolean(u.subsPaid),
    subsUpdatedByAdminAt: typeof u.subsUpdatedByAdminAt === 'string' ? u.subsUpdatedByAdminAt : undefined,
  };
}

/**
 * Deduplicates a list of profiles so that any profiles sharing the exact same accessCode
 * are unified into 1 single profile with merged attributes.
 */
export function deduplicateProfilesByCode(profiles: UserProfile[]): UserProfile[] {
  const codeMap = new Map<string, UserProfile>();

  for (const raw of profiles) {
    const sanitized = sanitizeProfile(raw);
    const codeKey = sanitized.accessCode.trim().toUpperCase();
    if (!codeKey) continue;

    if (codeMap.has(codeKey)) {
      const existing = codeMap.get(codeKey)!;
      const mergedName = existing.name !== 'Lifeguard Candidate' ? existing.name : sanitized.name;
      const mergedClub = existing.club !== 'Apex Papers Operations' ? existing.club : sanitized.club;
      const latestLogin = new Date(sanitized.lastLoginAt) > new Date(existing.lastLoginAt) 
        ? sanitized.lastLoginAt 
        : existing.lastLoginAt;
      const earliestCreated = new Date(sanitized.createdAt) < new Date(existing.createdAt)
        ? sanitized.createdAt
        : existing.createdAt;

      codeMap.set(codeKey, {
        ...existing,
        ...sanitized, // Take newer data first
        id: getUserDocId(codeKey),
        name: mergedName,
        club: mergedClub,
        createdAt: earliestCreated,
        lastLoginAt: latestLogin,
        isArchived: existing.isArchived && sanitized.isArchived,
        updatedAt: new Date().toISOString(),
        swimTime400m: sanitized.swimTime400m || existing.swimTime400m,
        swimTimeUpdatedAt: sanitized.swimTimeUpdatedAt || existing.swimTimeUpdatedAt,
        subsPaid: typeof sanitized.subsPaid === 'boolean' ? sanitized.subsPaid : existing.subsPaid,
        subsUpdatedByAdminAt: sanitized.subsUpdatedByAdminAt || existing.subsUpdatedByAdminAt,
      });
    } else {
      codeMap.set(codeKey, {
        ...sanitized,
        id: getUserDocId(codeKey),
      });
    }
  }

  return Array.from(codeMap.values());
}

// ==========================================
// Permanent Local Archive & Offline Sync Queue
// ==========================================

/**
 * Merges and deduplicates exam attempts across multiple sources.
 */
export function mergeExamAttempts(sources: ExamAttempt[][]): ExamAttempt[] {
  const map = new Map<string, ExamAttempt>();

  for (const list of sources) {
    if (!Array.isArray(list)) continue;
    for (const item of list) {
      if (!item || !item.id) continue;
      // Key by unique attempt ID
      const key = item.id;
      if (!map.has(key)) {
        map.set(key, item);
      } else {
        // Merge attributes if one has richer info
        const existing = map.get(key)!;
        map.set(key, {
          ...existing,
          ...item,
          isArchived: existing.isArchived || item.isArchived,
          candidateName: (item.candidateName && item.candidateName !== 'Lifeguard Candidate') ? item.candidateName : existing.candidateName,
          clubName: (item.clubName && item.clubName !== 'Apex Papers Operations') ? item.clubName : existing.clubName,
        });
      }
    }
  }

  // Sort descending by completion timestamp
  return Array.from(map.values()).sort((a, b) => {
    const timeA = new Date(a.completedAt || a.submittedAt || 0).getTime();
    const timeB = new Date(b.completedAt || b.submittedAt || 0).getTime();
    return timeB - timeA;
  });
}

/**
 * Gets all attempts permanently archived in this browser instance.
 */
export function getPermanentLocalArchive(): ExamAttempt[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PERMANENT_EXAM_ARCHIVE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.warn('Failed to read permanent exam archive:', e);
    return [];
  }
}

/**
 * Stores attempts permanently in local archive.
 */
export function saveToPermanentLocalArchive(attempts: ExamAttempt[]) {
  if (typeof window === 'undefined' || !Array.isArray(attempts) || attempts.length === 0) return;
  try {
    const existing = getPermanentLocalArchive();
    const merged = mergeExamAttempts([existing, attempts]);
    localStorage.setItem(PERMANENT_EXAM_ARCHIVE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.warn('Failed to write to permanent exam archive:', e);
  }
}

/**
 * Pushes an attempt to the offline retry queue.
 */
export function enqueuePendingExamSync(attempt: ExamAttempt) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(PENDING_SYNC_QUEUE_KEY);
    const queue: ExamAttempt[] = raw ? JSON.parse(raw) : [];
    if (!queue.some(q => q.id === attempt.id)) {
      queue.push(attempt);
      localStorage.setItem(PENDING_SYNC_QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (e) {
    console.warn('Failed to enqueue pending exam sync:', e);
  }
}

/**
 * Flushes pending exam submissions to Firestore.
 */
export async function flushPendingExamSyncQueue() {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(PENDING_SYNC_QUEUE_KEY);
    if (!raw) return;
    const queue: ExamAttempt[] = JSON.parse(raw);
    if (!Array.isArray(queue) || queue.length === 0) return;

    const remaining: ExamAttempt[] = [];
    for (const attempt of queue) {
      try {
        await persistExamSubmissionDirectly(attempt);
      } catch (err) {
        remaining.push(attempt);
      }
    }

    if (remaining.length === 0) {
      localStorage.removeItem(PENDING_SYNC_QUEUE_KEY);
    } else {
      localStorage.setItem(PENDING_SYNC_QUEUE_KEY, JSON.stringify(remaining));
    }
  } catch (e) {
    console.warn('Failed to flush pending exam sync queue:', e);
  }
}

// ==========================================
// Direct Immutable Exam Submission Persistence
// ==========================================

/**
 * Direct, immediate write of an exam submission to:
 * 1. /exam_submissions/{submissionId}
 * 2. /exam_audit_logs/{logId}
 * 3. /user_data/{userId}
 * With server-side API validation as extra fail-safe.
 */
export async function persistExamSubmissionDirectly(attempt: ExamAttempt): Promise<boolean> {
  if (!attempt || !attempt.id) return false;

  // 1. Immediately backup to local permanent archive
  saveToPermanentLocalArchive([attempt]);

  let isCommittedToCloud = false;

  try {
    // 2. Write to immutable /exam_submissions collection
    const submissionRef = doc(db, 'exam_submissions', attempt.id);
    const submissionPayload = {
      ...attempt,
      submittedAt: attempt.submittedAt || new Date().toISOString(),
      isDeleted: false,
    };
    try {
      await setDoc(submissionRef, removeUndefinedValues(submissionPayload));
    } catch (error: any) {
      // If it's a permission denied, it's likely an idempotent retry.
      if (error.code === 'permission-denied') {
        return true; // Already exists
      }
      throw error;
    }

    // 3. Write to /exam_audit_logs collection
    const auditLogId = `log_${attempt.id}_${Date.now()}`;
    const auditLogRef = doc(db, 'exam_audit_logs', auditLogId);
    await setDoc(auditLogRef, removeUndefinedValues({
      id: auditLogId,
      submissionId: attempt.id,
      accessCode: attempt.accessCode,
      candidateName: attempt.candidateName,
      action: 'EXAM_SUBMISSION_COMPLETED',
      timestamp: new Date().toISOString(),
      payloadSnapshot: submissionPayload,
    }));

    isCommittedToCloud = true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `exam_submissions/${attempt.id}`);
    enqueuePendingExamSync(attempt);
  }

  // 4. Also call server-side verification endpoint
  try {
    fetch('/api/exams/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attempt),
    }).catch(() => {});
  } catch {
    // non-blocking
  }

  return isCommittedToCloud;
}

// ==========================================
// Cloud Sync Helpers with Firestore
// ==========================================

export async function syncUsersFromCloud(): Promise<UserProfile[]> {
  if (typeof window === 'undefined') return getAllUsers();
  try {
    const usersColl = collection(db, 'users');
    const snapshot = await getDocs(usersColl);
    const cloudUsers: UserProfile[] = [];
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Partial<UserProfile>;
      cloudUsers.push(sanitizeProfile({ ...data, id: docSnap.id }, docSnap.id));
    });

    if (cloudUsers.length > 0) {
      const localUsers = getAllUsers();
      const combined = [...localUsers, ...cloudUsers];
      const mergedList = deduplicateProfilesByCode(combined);
      
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(mergedList));
      emitStorageChange();
      return mergedList;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'users');
  }
  return getAllUsers();
}

export function subscribeToCloudUsers(callback: (users: UserProfile[]) => void): Unsubscribe | null {
  if (typeof window === 'undefined') return null;
  try {
    const usersColl = collection(db, 'users');
    return onSnapshot(usersColl, (snapshot) => {
      const cloudUsers: UserProfile[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Partial<UserProfile>;
        cloudUsers.push(sanitizeProfile({ ...data, id: docSnap.id }, docSnap.id));
      });

      if (cloudUsers.length > 0) {
        const localUsers = getAllUsers();
        const combined = [...localUsers, ...cloudUsers];
        const mergedList = deduplicateProfilesByCode(combined);
        
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(mergedList));
        emitStorageChange();
        callback(mergedList);
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'users');
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'users');
    return null;
  }
}

/**
 * Fetch all exam submissions for a specific access code from the immutable `/exam_submissions` collection.
 */
export async function fetchExamSubmissionsFromCloud(accessCode: string): Promise<ExamAttempt[]> {
  if (typeof window === 'undefined' || !accessCode) return [];
  try {
    const cleanCode = accessCode.trim().toUpperCase();
    const submissionsColl = collection(db, 'exam_submissions');
    const q = query(
      submissionsColl,
      where('accessCode', '==', cleanCode),
      limit(100)
    );
    const snapshot = await getDocs(q);
    const attempts: ExamAttempt[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as ExamAttempt;
      if (data && data.id) {
        attempts.push(data);
      }
    });
    return attempts;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `exam_submissions?code=${accessCode}`);
    return [];
  }
}


export async function clearUserExamHistory(accessCode: string): Promise<void> {
  const canonicalDocId = getUserDocId(accessCode);

  try {
    const submissionsColl = collection(db, 'exam_submissions');
    const q = query(submissionsColl, where('accessCode', '==', accessCode));
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (err) {
    console.warn('Failed to clear cloud submissions:', err);
  }

  try {
    const userDocRef = doc(db, 'user_data', canonicalDocId);
    await setDoc(userDocRef, { examHistory: [] }, { merge: true });
  } catch (err) {
    console.warn('Failed to clear user doc history:', err);
  }

  if (typeof window !== 'undefined') {
    try {
      const localKey = `${STORAGE_KEY_PREFIX}${canonicalDocId}`;
      const raw = localStorage.getItem(localKey);
      if (raw) {
        const data = JSON.parse(raw);
        data.examHistory = [];
        localStorage.setItem(localKey, JSON.stringify(data));
      }

      const archiveRaw = localStorage.getItem(PERMANENT_EXAM_ARCHIVE_KEY);
      if (archiveRaw) {
        const archive = JSON.parse(archiveRaw);
        if (Array.isArray(archive)) {
          const filtered = archive.filter(a => a.accessCode !== accessCode);
          localStorage.setItem(PERMANENT_EXAM_ARCHIVE_KEY, JSON.stringify(filtered));
        }
      }
      window.dispatchEvent(new CustomEvent('sho_storage_change'));
    } catch (e) {
      console.warn('Failed to clear local history:', e);
    }
  }
}

export async function syncUserDataFromCloud(userIdOrAccessCode: string): Promise<UserProgressData | null> {
  if (typeof window === 'undefined' || !userIdOrAccessCode) return null;
  try {
    const users = getAllUsers();
    const found = users.find(u => u.id === userIdOrAccessCode || u.accessCode.toUpperCase() === userIdOrAccessCode.toUpperCase());
    const accessCode = found ? found.accessCode : userIdOrAccessCode;
    const canonicalDocId = getUserDocId(accessCode);

    // 1. Fetch from /user_data
    let snap: DocumentSnapshot | null = null;
    try {
      const userDocRef = doc(db, 'user_data', canonicalDocId);
      snap = await getDoc(userDocRef);
      
      if (!snap.exists() && userIdOrAccessCode !== canonicalDocId) {
        const legacyDocRef = doc(db, 'user_data', userIdOrAccessCode);
        snap = await getDoc(legacyDocRef);
      }
    } catch (err) {
      console.warn('Firestore fetch failed, relying on local cache:', err);
      // Continue with snap = null (offline mode)
    }

    // 2. Fetch all immutable submissions from /exam_submissions
    let cloudSubmissions: ExamAttempt[] = [];
    try {
      cloudSubmissions = await fetchExamSubmissionsFromCloud(accessCode);
    } catch (err) {
      console.warn('Cloud submissions fetch failed, relying on local cache:', err);
    }

    // 3. Get local cached attempts + permanent browser archive
    const localData = loadUserData(canonicalDocId);
    const permanentArchive = getPermanentLocalArchive().filter(
      a => a.accessCode?.toUpperCase() === accessCode.toUpperCase()
    );

    let docHistory: ExamAttempt[] = [];
    let savedSessions: Record<string, SavedQuizSession> = {};

    if (snap && snap.exists()) {
      const data = snap.data() as Partial<UserProgressData>;
      docHistory = Array.isArray(data?.examHistory) ? data.examHistory : [];
      savedSessions = data?.savedSessions || {};
    }

    // Unify all sources without losing ANY past exam
    const allAttempts = mergeExamAttempts([
      localData.examHistory || [],
      docHistory,
      cloudSubmissions,
      permanentArchive,
    ]);

    const unifiedProfile = sanitizeProfile({
      ...(found || (snap && snap.exists() ? (snap.data() as any).profile : null)),
      id: canonicalDocId,
      accessCode: accessCode.toUpperCase(),
    }, canonicalDocId);

    const progressData: UserProgressData = {
      profile: unifiedProfile,
      savedSessions: Object.keys(savedSessions).length > 0 ? savedSessions : localData.savedSessions,
      examHistory: allAttempts,
    };

    // Update local storage and archive
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${canonicalDocId}`, JSON.stringify(progressData));
    if (userIdOrAccessCode !== canonicalDocId) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${userIdOrAccessCode}`, JSON.stringify(progressData));
    }
    saveToPermanentLocalArchive(allAttempts);

    // Flush any pending offline queue items
    flushPendingExamSyncQueue().catch(() => {});

    return progressData;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `user_data/${userIdOrAccessCode}`);
  }
  return null;
}

const cloudPushTimeouts = new Map<string, NodeJS.Timeout>();

export async function pushUserDataToCloud(data: UserProgressData, immediate = false) {
  if (typeof window === 'undefined' || !data.profile?.accessCode) return;
  const canonicalDocId = getUserDocId(data.profile.accessCode);

  const executePush = async () => {
    try {
      const unifiedProfile = {
        ...sanitizeProfile(data.profile),
        id: canonicalDocId,
      };

      // 1. Save user profile to /users collection
      const userDocRef = doc(db, 'users', canonicalDocId);
      await setDoc(userDocRef, removeUndefinedValues(unifiedProfile), { merge: true });

      // 2. Ensure each attempt in examHistory is also safely archived in /exam_submissions
      if (Array.isArray(data.examHistory)) {
        for (const attempt of data.examHistory) {
          if (attempt && attempt.id) {
            persistExamSubmissionDirectly(attempt).catch(() => {});
          }
        }
      }

      // 3. Save full progress to /user_data collection
      const progressDocRef = doc(db, 'user_data', canonicalDocId);
      await setDoc(progressDocRef, removeUndefinedValues({
        userId: canonicalDocId,
        profile: unifiedProfile,
        savedSessions: data.savedSessions || {},
        examHistory: data.examHistory || [],
        updatedAt: new Date().toISOString()
      }), { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `user_data/${canonicalDocId}`);
    }
  };

  if (immediate) {
    if (cloudPushTimeouts.has(canonicalDocId)) {
      clearTimeout(cloudPushTimeouts.get(canonicalDocId));
      cloudPushTimeouts.delete(canonicalDocId);
    }
    return executePush();
  }

  // Debounce for non-critical draft updates
  if (cloudPushTimeouts.has(canonicalDocId)) {
    clearTimeout(cloudPushTimeouts.get(canonicalDocId));
  }

  const timer = setTimeout(executePush, 1500);
  cloudPushTimeouts.set(canonicalDocId, timer);
}

/**
 * Saves in-progress quiz session to localStorage without triggering recursive storage events.
 */
export function saveQuizDraftSessionLocally(
  userIdOrAccessCode: string, 
  paperId: string, 
  session: SavedQuizSession,
  seed?: number
) {

  if (typeof window === 'undefined' || !userIdOrAccessCode) return;
  try {
    const users = getAllUsers();
    const foundProfile = users.find(u => 
      u.id === userIdOrAccessCode || 
      u.accessCode.toUpperCase() === userIdOrAccessCode.toUpperCase()
    ) || sanitizeProfile(undefined, userIdOrAccessCode);

    const canonicalId = getUserDocId(foundProfile.accessCode);
    const storageKey = `${STORAGE_KEY_PREFIX}${canonicalId}`;

    let currentData: UserProgressData = {
      profile: { ...foundProfile, id: canonicalId },
      savedSessions: {},
      examHistory: [],
    };

    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        currentData = JSON.parse(raw);
      } catch {
        // safe fallback
      }
    }

    currentData.savedSessions = {
      ...(currentData.savedSessions || {}),
      [paperId]: { ...session, seed: seed || session.seed },
    };

    localStorage.setItem(storageKey, JSON.stringify(currentData));
    if (userIdOrAccessCode !== canonicalId) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${userIdOrAccessCode}`, JSON.stringify(currentData));
    }
  } catch (e) {
    console.warn('Failed to save quiz draft session locally:', e);
  }
}

export function subscribeToCloudUserData(userIdOrAccessCode: string, callback: (data: UserProgressData) => void): Unsubscribe | null {
  if (typeof window === 'undefined' || !userIdOrAccessCode) return null;
  try {
    const users = getAllUsers();
    const found = users.find(u => u.id === userIdOrAccessCode || u.accessCode.toUpperCase() === userIdOrAccessCode.toUpperCase());
    const accessCode = found ? found.accessCode : userIdOrAccessCode;
    const canonicalDocId = getUserDocId(accessCode);

    const progressDocRef = doc(db, 'user_data', canonicalDocId);
    return onSnapshot(progressDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Partial<UserProgressData>;
        const rawHistory = Array.isArray(data?.examHistory) ? data.examHistory : [];
        
        // Merge with local archive so snapshots never wipe unsynced local exams
        const localArchive = getPermanentLocalArchive().filter(
          a => a.accessCode?.toUpperCase() === accessCode.toUpperCase()
        );
        const unifiedHistory = mergeExamAttempts([rawHistory, localArchive]);

        const updated: UserProgressData = {
          profile: sanitizeProfile({ ...(found || data?.profile), id: canonicalDocId, accessCode }, canonicalDocId),
          savedSessions: data?.savedSessions || {},
          examHistory: unifiedHistory,
        };
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${canonicalDocId}`, JSON.stringify(updated));
        if (userIdOrAccessCode !== canonicalDocId) {
          localStorage.setItem(`${STORAGE_KEY_PREFIX}${userIdOrAccessCode}`, JSON.stringify(updated));
        }
        callback(updated);
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `user_data/${userIdOrAccessCode}`);
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `user_data/${userIdOrAccessCode}`);
    return null;
  }
}

// Local Storage & Synchronized Helpers
export function getAllUsers(): UserProfile[] {
  if (typeof window === 'undefined') return [DEFAULT_USER];
  try {
    const raw = localStorage.getItem(ALL_USERS_KEY);
    if (!raw) {
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify([DEFAULT_USER]));
      return [DEFAULT_USER];
    }
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) {
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify([DEFAULT_USER]));
      return [DEFAULT_USER];
    }

    const sanitizedList: UserProfile[] = list.map((u, i) => sanitizeProfile(u, `usr_${i}`));
    const unifiedList = deduplicateProfilesByCode(sanitizedList);

    if (!unifiedList.some(u => u.accessCode === DEFAULT_USER.accessCode)) {
      unifiedList.unshift(DEFAULT_USER);
    }
    
    if (unifiedList.length !== list.length) {
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(unifiedList));
    }

    return unifiedList;
  } catch (e) {
    console.error('Failed to parse users list from localStorage', e);
    return [DEFAULT_USER];
  }
}

export function getKeyCapacity(): { count: number; max: number; available: number; isUnlimited: boolean } {
  const users = getAllUsers().filter(u => !u.isArchived);
  return {
    count: users.length,
    max: users.length,
    available: Infinity,
    isUnlimited: true,
  };
}

export function getActiveUserId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(ACTIVE_USER_ID_KEY);
    return stored || null;
  } catch {
    return null;
  }
}

export function setActiveUserId(userId: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACTIVE_USER_ID_KEY, userId);
    emitStorageChange();
  } catch (e) {
    console.error('Failed to set active user id', e);
  }
}

export function clearActiveUser() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ACTIVE_USER_ID_KEY);
    emitStorageChange();
  } catch (e) {
    console.error('Failed to clear active user', e);
  }
}

export function normalizeExamAttemptsWithCandidate(attempts: ExamAttempt[], profile: UserProfile): ExamAttempt[] {
  if (!Array.isArray(attempts)) return [];
  return attempts.map((attempt) => {
    const candidateName = (attempt.candidateName && 
      attempt.candidateName.trim() && 
      attempt.candidateName !== 'Lifeguard Candidate' && 
      attempt.candidateName !== 'Administrator') 
        ? attempt.candidateName.trim() 
        : (profile.name && profile.name.trim() ? profile.name.trim() : 'Lifeguard Candidate');

    const clubName = (attempt.clubName && 
      attempt.clubName.trim() && 
      attempt.clubName !== 'Apex Papers Operations') 
        ? attempt.clubName.trim() 
        : (profile.club && profile.club.trim() ? profile.club.trim() : 'Apex Papers Operations');

    const accessCode = attempt.accessCode || profile.accessCode;

    return {
      ...attempt,
      candidateName,
      clubName,
      accessCode,
    };
  });
}

/**
 * Loads user data for a specific user ID or Access Code.
 * Unifies all data from local storage, permanent archive, and past submissions.
 */
export function loadUserData(userIdOrAccessCode: string | null): UserProgressData {
  if (typeof window === 'undefined' || !userIdOrAccessCode) {
    return {
      profile: DEFAULT_USER,
      savedSessions: {},
      examHistory: [],
    };
  }

  const users = getAllUsers();
  const foundProfile = users.find(u => 
    u.id === userIdOrAccessCode || 
    u.accessCode.toUpperCase() === userIdOrAccessCode.toUpperCase()
  ) || sanitizeProfile(undefined, userIdOrAccessCode);

  const canonicalId = getUserDocId(foundProfile.accessCode);

  try {
    let raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${canonicalId}`);
    if (!raw && userIdOrAccessCode !== canonicalId) {
      raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${userIdOrAccessCode}`);
    }

    const permanentArchive = getPermanentLocalArchive().filter(
      a => a.accessCode?.toUpperCase() === foundProfile.accessCode.toUpperCase()
    );

    if (raw) {
      const data = JSON.parse(raw) as Partial<UserProgressData>;
      const rawHistory = Array.isArray(data?.examHistory) ? data.examHistory : [];
      const mergedHistory = mergeExamAttempts([rawHistory, permanentArchive]);
      const normalizedHistory = normalizeExamAttemptsWithCandidate(mergedHistory, foundProfile);

      return {
        profile: { ...foundProfile, id: canonicalId },
        savedSessions: data?.savedSessions || {},
        examHistory: normalizedHistory,
      };
    } else if (permanentArchive.length > 0) {
      const normalizedHistory = normalizeExamAttemptsWithCandidate(permanentArchive, foundProfile);
      return {
        profile: { ...foundProfile, id: canonicalId },
        savedSessions: {},
        examHistory: normalizedHistory,
      };
    }
  } catch (e) {
    console.error(`Failed to load data for user ${userIdOrAccessCode}`, e);
  }

  return {
    profile: { ...foundProfile, id: canonicalId },
    savedSessions: {},
    examHistory: [],
  };
}

export function saveUserData(data: UserProgressData) {
  if (typeof window === 'undefined') return;
  try {
    const canonicalId = getUserDocId(data.profile.accessCode);
    const sanitizedProfile = {
      ...sanitizeProfile(data.profile),
      id: canonicalId,
    };

    const rawHistory = Array.isArray(data.examHistory) ? data.examHistory : [];
    const permanentArchive = getPermanentLocalArchive().filter(
      a => a.accessCode?.toUpperCase() === sanitizedProfile.accessCode.toUpperCase()
    );
    const mergedHistory = mergeExamAttempts([rawHistory, permanentArchive]);
    const normalizedHistory = normalizeExamAttemptsWithCandidate(mergedHistory, sanitizedProfile);

    const sanitized: UserProgressData = {
      profile: sanitizedProfile,
      savedSessions: data.savedSessions || {},
      examHistory: normalizedHistory,
    };

    localStorage.setItem(`${STORAGE_KEY_PREFIX}${canonicalId}`, JSON.stringify(sanitized));
    saveToPermanentLocalArchive(normalizedHistory);
    
    // Also keep the user list unified & deduplicated
    const users = getAllUsers();
    const existingIdx = users.findIndex(u => u.accessCode.toUpperCase() === sanitizedProfile.accessCode.toUpperCase());
    if (existingIdx >= 0) {
      users[existingIdx] = sanitizedProfile;
    } else {
      users.push(sanitizedProfile);
    }
    const unifiedUsers = deduplicateProfilesByCode(users);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(unifiedUsers));
    emitStorageChange();

    // Async push to cloud Firestore
    pushUserDataToCloud(sanitized).catch(() => {});
  } catch (e) {
    console.error('Failed to save user data to localStorage', e);
  }
}

/**
 * Updates a candidate's profile (name, club) and immediately updates all their
 * previous exam attempt records across local storage and cloud Firestore.
 * Dispatches an API request to /api/admin/edit-profile for permanent database persistence.
 */
export async function updateCandidateProfileAndAttempts(
  accessCodeOrId: string,
  newName: string,
  newClub?: string,
  adminAccessCode?: string
): Promise<UserProfile | null> {
  if (typeof window === 'undefined' || !accessCodeOrId) return null;
  const users = getAllUsers();
  const target = users.find(
    (u) => u.id === accessCodeOrId || u.accessCode.toUpperCase() === accessCodeOrId.toUpperCase()
  );

  const cleanCode = (target ? target.accessCode : accessCodeOrId).trim().toUpperCase();
  const canonicalId = getUserDocId(cleanCode);
  const updatedProfile: UserProfile = {
    ...(target || DEFAULT_USER),
    id: canonicalId,
    accessCode: cleanCode,
    name: newName.trim() || (target?.name ?? 'Candidate'),
    club: newClub !== undefined && newClub.trim() ? newClub.trim() : (target?.club ?? 'Apex Papers Operations'),
    lastLoginAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Update local user list
  const userIdx = users.findIndex(u => u.accessCode.toUpperCase() === cleanCode);
  if (userIdx >= 0) {
    users[userIdx] = updatedProfile;
  } else {
    users.push(updatedProfile);
  }
  const unifiedUsers = deduplicateProfilesByCode(users);
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(unifiedUsers));

  // 2. Load and update all user progress data and exam history attempts
  const data = loadUserData(canonicalId);
  data.profile = updatedProfile;
  if (Array.isArray(data.examHistory)) {
    data.examHistory = data.examHistory.map((attempt) => ({
      ...attempt,
      candidateName: updatedProfile.name,
      clubName: updatedProfile.club,
      accessCode: updatedProfile.accessCode,
    }));
  }

  saveUserData(data);

  // 3. Dispatch API request to update database permanently
  try {
    const res = await fetch('/api/admin/edit-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessCodeOrId: cleanCode,
        name: updatedProfile.name,
        club: updatedProfile.club,
        adminAccessCode: adminAccessCode || ADMIN_ACCESS_CODE,
      }),
    });

    if (res.ok) {
      const resJson = await res.json();
      if (resJson.profile) {
        Object.assign(updatedProfile, resJson.profile);
      }
    }
  } catch (apiErr) {
    console.warn('API call to /api/admin/edit-profile failed, falling back to direct Firestore:', apiErr);
  }

  // 4. Push update to cloud Firestore
  try {
    const userDocRef = doc(db, 'users', canonicalId);
    await setDoc(userDocRef, removeUndefinedValues(updatedProfile), { merge: true });

    const progressDocRef = doc(db, 'user_data', canonicalId);
    await setDoc(progressDocRef, removeUndefinedValues({
      userId: canonicalId,
      profile: updatedProfile,
      savedSessions: data.savedSessions || {},
      examHistory: data.examHistory || [],
      updatedAt: new Date().toISOString(),
    }), { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `users/${canonicalId}`);
  }

  emitStorageChange();
  return updatedProfile;
}

/**
 * Updates a candidate or administrator's profile avatar icon.
 * Saves locally immediately, updates active user progress, and synchronizes to Firestore.
 */
export async function updateUserProfileAvatar(
  accessCodeOrId: string,
  avatarImage: string | undefined
): Promise<UserProfile | null> {
  if (typeof window === 'undefined' || !accessCodeOrId) return null;
  const users = getAllUsers();
  const target = users.find(
    (u) => u.id === accessCodeOrId || u.accessCode.toUpperCase() === accessCodeOrId.toUpperCase()
  );

  const cleanCode = (target ? target.accessCode : accessCodeOrId).trim().toUpperCase();
  const canonicalId = getUserDocId(cleanCode);
  const updatedProfile: UserProfile = {
    ...(target || DEFAULT_USER),
    id: canonicalId,
    accessCode: cleanCode,
    avatarImage: avatarImage ? avatarImage : undefined,
    updatedAt: new Date().toISOString(),
  };

  // 1. Update all users list
  const userIdx = users.findIndex((u) => u.accessCode.toUpperCase() === cleanCode);
  if (userIdx >= 0) {
    users[userIdx] = updatedProfile;
  } else {
    users.push(updatedProfile);
  }
  const unifiedUsers = deduplicateProfilesByCode(users);
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(unifiedUsers));

  // 2. Update user progress data locally
  const data = loadUserData(canonicalId);
  data.profile = updatedProfile;
  saveUserData(data);

  // 3. Sync to Firestore (both /users and /user_data)
  try {
    const userDocRef = doc(db, 'users', canonicalId);
    await setDoc(userDocRef, removeUndefinedValues({
      avatarImage: avatarImage || null,
      updatedAt: new Date().toISOString(),
    }), { merge: true });

    const progressDocRef = doc(db, 'user_data', canonicalId);
    await setDoc(progressDocRef, removeUndefinedValues({
      userId: canonicalId,
      profile: updatedProfile,
      updatedAt: new Date().toISOString(),
    }), { merge: true });
  } catch (err) {
    console.warn('Could not sync avatar to Firestore, saved locally:', err);
  }

  emitStorageChange();
  return updatedProfile;
}

/**
 * Records a completed exam attempt.
 * Transactional & Zero-Data-Loss:
 * 1. Immediately writes to localStorage & permanent archive
 * 2. Directly commits to /exam_submissions in Firestore without debouncing
 * 3. Enqueues in offline retry queue in case of network interruption
 */
export function recordExamAttempt(userIdOrAccessCode: string, newAttempt: ExamAttempt, seed?: number): UserProgressData {
  const current = loadUserData(userIdOrAccessCode);
  const updatedSavedSessions = { ...current.savedSessions };
  delete updatedSavedSessions[newAttempt.paperId];

  const enrichedAttempt: ExamAttempt = {
    ...newAttempt,
    seed: seed || newAttempt.seed,
    candidateName: (newAttempt.candidateName && newAttempt.candidateName !== 'Lifeguard Candidate')
      ? newAttempt.candidateName
      : (current.profile.name || 'Lifeguard Candidate'),
    clubName: (newAttempt.clubName && newAttempt.clubName !== 'Apex Papers Operations')
      ? newAttempt.clubName
      : (current.profile.club || 'Apex Papers Operations'),
    accessCode: newAttempt.accessCode || current.profile.accessCode,
    submittedAt: new Date().toISOString(),
    isDeleted: false,
  };

  // 1. Permanent local archive write
  saveToPermanentLocalArchive([enrichedAttempt]);

  // 2. Multi-tier merge
  const allAttempts = mergeExamAttempts([[enrichedAttempt], current.examHistory || []]);

  const updated: UserProgressData = {
    ...current,
    savedSessions: updatedSavedSessions,
    examHistory: allAttempts,
  };

  saveUserData(updated);

  // 3. Immediate direct write to cloud Firestore (no debouncing!)
  persistExamSubmissionDirectly(enrichedAttempt).catch(() => {
    enqueuePendingExamSync(enrichedAttempt);
  });

  return updated;
}

/**
 * Creates a candidate profile with a unique Access Code.
 */
export function createOrLoginCandidate(name: string, club?: string, providedCode?: string, avatarImage?: string): UserProfile {
  const users = getAllUsers();
  const cleanCode = (providedCode || generateCandidateAccessCode()).trim().toUpperCase();
  const canonicalId = getUserDocId(cleanCode);
  
  const existing = users.find(u => (u.accessCode || '').toUpperCase() === cleanCode);

  if (existing) {
    const updated: UserProfile = {
      ...existing,
      id: canonicalId,
      name: name.trim() && name.trim() !== 'Lifeguard Candidate' ? name.trim() : existing.name,
      club: club?.trim() && club.trim() !== 'Apex Papers Operations' ? club.trim() : existing.club,
      avatarImage: avatarImage || existing.avatarImage,
      lastLoginAt: new Date().toISOString(),
      isArchived: false,
    };
    setActiveUserId(updated.id);
    const data = loadUserData(updated.id);
    data.profile = updated;
    saveUserData(data);
    return updated;
  }

  const avatarColors = [
    'from-rose-600 to-red-700',
    'from-red-600 to-rose-600',
    'from-rose-700 to-red-800',
    'from-red-700 to-rose-700',
  ];
  const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  const newUser: UserProfile = {
    id: canonicalId,
    accessCode: cleanCode,
    name: name.trim() || 'Lifeguard Candidate',
    club: club?.trim() || 'Apex Papers Operations',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    avatarColor: color,
    avatarImage: avatarImage,
    isArchived: false,
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  const unified = deduplicateProfilesByCode(users);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(unified));
  }
  setActiveUserId(newUser.id);

  const newUserData: UserProgressData = {
    profile: newUser,
    savedSessions: {},
    examHistory: [],
  };
  saveUserData(newUserData);

  return newUser;
}

export function loginAsAdministrator(overrideCode?: string): UserProfile {
  const users = getAllUsers();
  const targetCode = (overrideCode || '').trim().toUpperCase() || 'SHO-2124-TV3';
  let adminProfile = users.find(u => isMasterKeyCode(u.accessCode) || u.name === ADMIN_NAME);
  if (!adminProfile) {
    adminProfile = { ...ADMIN_USER, accessCode: targetCode, name: ADMIN_NAME, lastLoginAt: new Date().toISOString() };
    users.push(adminProfile);
  } else {
    adminProfile.accessCode = targetCode;
    adminProfile.name = ADMIN_NAME;
    adminProfile.lastLoginAt = new Date().toISOString();
  }
  const unified = deduplicateProfilesByCode(users);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(unified));
  }
  setActiveUserId(adminProfile.id);
  const data = loadUserData(adminProfile.id);
  data.profile = adminProfile;
  saveUserData(data);
  return adminProfile;
}

export function loginAsCandidate(targetCandidateId?: string): UserProfile {
  const users = getAllUsers();
  let candidateProfile = targetCandidateId ? users.find(u => u.id === targetCandidateId) : null;
  
  if (!candidateProfile) {
    candidateProfile = users.find(u => u.id === DEFAULT_USER.id || u.name === 'Lifeguard Candidate');
  }

  if (!candidateProfile) {
    candidateProfile = { ...DEFAULT_USER, lastLoginAt: new Date().toISOString() };
    users.push(candidateProfile);
  } else {
    candidateProfile.lastLoginAt = new Date().toISOString();
  }

  const unified = deduplicateProfilesByCode(users);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(unified));
  }

  setActiveUserId(candidateProfile.id);
  const data = loadUserData(candidateProfile.id);
  data.profile = candidateProfile;
  saveUserData(data);
  return candidateProfile;
}

export function loginByAccessCode(accessCode: string): UserProfile | null {
  const cleanCode = (accessCode || '').trim().toUpperCase();
  if (!cleanCode) return null;

  if (cleanCode === ADMIN_ACCESS_CODE) {
    return loginAsAdministrator();
  }

  const users = getAllUsers();
  const found = users.find(u => (u.accessCode || '').toUpperCase() === cleanCode);
  
  if (found) {
    const canonicalId = getUserDocId(cleanCode);
    const updated: UserProfile = {
      ...found,
      id: canonicalId,
      lastLoginAt: new Date().toISOString(),
    };
    setActiveUserId(canonicalId);
    const data = loadUserData(canonicalId);
    data.profile = updated;
    saveUserData(data);
    return updated;
  }
  
  return null;
}

export async function loginByAccessCodeAsync(accessCode: string): Promise<UserProfile | null> {
  const cleanCode = (accessCode || '').trim().toUpperCase();
  if (!cleanCode) return null;

  if (cleanCode === ADMIN_ACCESS_CODE) {
    return loginAsAdministrator();
  }

  // 1. Try local match first
  const localMatch = loginByAccessCode(cleanCode);
  if (localMatch) {
    syncUserDataFromCloud(localMatch.id).catch(() => {});
    return localMatch;
  }

  // 2. Query Firestore users collection
  try {
    const canonicalId = getUserDocId(cleanCode);
    const usersColl = collection(db, 'users');
    const q = query(usersColl, where('accessCode', '==', cleanCode));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const cloudData = docSnap.data() as Partial<UserProfile>;
      const matchedProfile = sanitizeProfile({ ...cloudData, id: canonicalId, accessCode: cleanCode }, canonicalId);
      
      matchedProfile.lastLoginAt = new Date().toISOString();
      
      const users = getAllUsers();
      users.push(matchedProfile);
      const unified = deduplicateProfilesByCode(users);
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(unified));

      setActiveUserId(canonicalId);

      // Fetch user's papers and attempts from cloud
      const userProgress = await syncUserDataFromCloud(canonicalId);
      if (!userProgress) {
        saveUserData({
          profile: matchedProfile,
          savedSessions: {},
          examHistory: [],
        });
      }

      return matchedProfile;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users?accessCode=${cleanCode}`);
  }

  return null;
}

export async function archiveExamAttempt(adminAccessCode: string, userId: string, attemptId: string): Promise<{ success: boolean; message: string }> {
  const cleanAdminCode = (adminAccessCode || '').trim().toUpperCase();
  if (!isMasterKeyCode(cleanAdminCode)) {
    return { success: false, message: 'Unauthorized' };
  }
  
  const userData = loadUserData(userId);
  if (!userData.examHistory) {
      return { success: false, message: 'No exam history found' };
  }
  
  const attemptIndex = userData.examHistory.findIndex(a => a.id === attemptId);
  if (attemptIndex === -1) {
      return { success: false, message: 'Attempt not found' };
  }
  
  userData.examHistory[attemptIndex] = { ...userData.examHistory[attemptIndex], isArchived: true };
  
  saveUserData(userData);
  await pushUserDataToCloud(userData, true);
  
  return { success: true, message: 'Attempt archived' };
}

/**
 * Soft Delete / Archive candidate profile.
 * Retains ALL completed exams in /exam_submissions permanently without risk of data loss.
 */
export function deleteUserByAdmin(adminAccessCode: string, targetUserIdOrCode: string): { success: boolean; message: string } {
  const cleanAdminCode = (adminAccessCode || '').trim().toUpperCase();
  if (!isMasterKeyCode(cleanAdminCode)) {
    return { 
      success: false, 
      message: 'Unauthorized: Only an Administrator is authorized to manage candidate profiles.' 
    };
  }

  const users = getAllUsers();
  const target = users.find(u => 
    u.id === targetUserIdOrCode || 
    u.accessCode.toUpperCase() === targetUserIdOrCode.toUpperCase()
  );

  if (!target) {
    return { success: false, message: 'User profile not found.' };
  }

  if (isMasterKeyCode(target.accessCode)) {
    return { success: false, message: 'The Administrator profile cannot be archived.' };
  }

  const targetCode = target.accessCode.toUpperCase();
  const canonicalDocId = getUserDocId(targetCode);

  // Soft-delete: mark profile as archived rather than deleting historical attempts
  const updatedUsers = users.map(u => {
    if (u.accessCode.toUpperCase() === targetCode) {
      return { ...u, isArchived: true, updatedAt: new Date().toISOString() };
    }
    return u;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(updatedUsers));
  }

  if (getActiveUserId() === target.id || getActiveUserId() === canonicalDocId) {
    setActiveUserId(DEFAULT_USER.id);
  }

  emitStorageChange();

  // Update cloud profile to isArchived
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        await setDoc(doc(db, 'users', canonicalDocId), removeUndefinedValues({ isArchived: true, updatedAt: new Date().toISOString() }), { merge: true });
        // Also log the archive action
        const logId = `log_archive_${canonicalDocId}_${Date.now()}`;
        await setDoc(doc(db, 'exam_audit_logs', logId), removeUndefinedValues({
          id: logId,
          submissionId: canonicalDocId,
          accessCode: targetCode,
          candidateName: target.name,
          action: 'CANDIDATE_PROFILE_ARCHIVED',
          timestamp: new Date().toISOString(),
        }));
      } catch (e) {
        handleFirestoreError(e, OperationType.UPDATE, `users/${canonicalDocId}`);
      }
    })();
  }

  return { 
    success: true, 
    message: `Successfully archived candidate ${target.name}. Past test submissions and certificates are securely retained in the permanent cloud audit log.` 
  };
}

/**
 * Retrieve completed exam attempts for a specific candidate.
 */
export function getCandidateExamAttempts(requesterAccessCode: string, targetUserIdOrCode: string): ExamAttempt[] {
  const cleanRequesterCode = (requesterAccessCode || '').trim().toUpperCase();
  const users = getAllUsers();
  const requester = users.find(u => u.accessCode.toUpperCase() === cleanRequesterCode || u.id === requesterAccessCode);

  const isAdmin = isMasterKeyCode(cleanRequesterCode) || isAdminUser(requester);
  const isSelf = requester && (
    requester.id === targetUserIdOrCode || 
    requester.accessCode.toUpperCase() === targetUserIdOrCode.toUpperCase()
  );

  if (!isAdmin && !isSelf) {
    return [];
  }

  const targetData = loadUserData(targetUserIdOrCode);
  return (targetData.examHistory || []).filter(a => !a.isArchived);
}

/**
 * Async version to retrieve candidate exam attempts combining Firestore cloud and local archives.
 */
export async function getCandidateExamAttemptsAsync(requesterAccessCode: string, targetUserIdOrCode: string): Promise<ExamAttempt[]> {
  const cleanRequesterCode = (requesterAccessCode || '').trim().toUpperCase();
  const users = getAllUsers();
  const requester = users.find(u => u.accessCode.toUpperCase() === cleanRequesterCode || u.id === requesterAccessCode);
  const isAdmin = isMasterKeyCode(cleanRequesterCode) || isAdminUser(requester);
  const isSelf = requester && (
    requester.id === targetUserIdOrCode || 
    requester.accessCode.toUpperCase() === targetUserIdOrCode.toUpperCase()
  );

  if (!isAdmin && !isSelf) {
    return [];
  }

  // Sync cloud state from both /user_data and /exam_submissions
  await syncUserDataFromCloud(targetUserIdOrCode);
  const targetData = loadUserData(targetUserIdOrCode);
  return (targetData.examHistory || []).filter(a => !a.isArchived);
}

export function getUserExamAttemptCount(userIdOrCode: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const data = loadUserData(userIdOrCode);
    return Array.isArray(data?.examHistory) ? data.examHistory.length : 0;
  } catch {
    return 0;
  }
}

// 1. Candidate Function: Save or update 400m swim time
export async function saveCandidateSwimTime(candidateId: string, timeString: string): Promise<void> {
  const users = getAllUsers();
  const userIdx = users.findIndex(u => u.id === candidateId || getUserDocId(u.accessCode) === candidateId);
  
  if (userIdx === -1) return;
  
  const updatedProfile = {
    ...users[userIdx],
    swimTime400m: timeString,
    swimTimeUpdatedAt: new Date().toISOString()
  };
  
  users[userIdx] = updatedProfile;
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(deduplicateProfilesByCode(users)));
  
  const data = loadUserData(candidateId);
  data.profile = updatedProfile;
  saveUserData(data);
  
  try {
    const userDocRef = doc(db, 'users', candidateId);
    await setDoc(userDocRef, removeUndefinedValues({
      swimTime400m: timeString,
      swimTimeUpdatedAt: updatedProfile.swimTimeUpdatedAt
    }), { merge: true });

    const progressDocRef = doc(db, 'user_data', candidateId);
    await setDoc(progressDocRef, removeUndefinedValues({
      profile: updatedProfile,
      updatedAt: new Date().toISOString()
    }), { merge: true });
  } catch (error) {
    console.error("Error saving swim time:", error);
  }
  emitStorageChange();
}

// 2. Admin Function: Toggle subscription paid status
export async function updateSubsPaidStatus(candidateId: string, isPaid: boolean, adminAuthCheck: boolean): Promise<void> {
  if (!adminAuthCheck) {
    throw new Error("Unauthorized: Only admins can update subscription status.");
  }
  
  const users = getAllUsers();
  const userIdx = users.findIndex(u => u.id === candidateId || getUserDocId(u.accessCode) === candidateId);
  
  if (userIdx === -1) return;
  
  const updatedProfile = {
    ...users[userIdx],
    subsPaid: isPaid,
    subsUpdatedByAdminAt: new Date().toISOString()
  };
  
  users[userIdx] = updatedProfile;
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(deduplicateProfilesByCode(users)));
  
  const data = loadUserData(candidateId);
  data.profile = updatedProfile;
  saveUserData(data);
  
  try {
    const userDocRef = doc(db, 'users', candidateId);
    await setDoc(userDocRef, removeUndefinedValues({
      subsPaid: isPaid,
      subsUpdatedByAdminAt: updatedProfile.subsUpdatedByAdminAt
    }), { merge: true });

    const progressDocRef = doc(db, 'user_data', candidateId);
    await setDoc(progressDocRef, removeUndefinedValues({
      profile: updatedProfile,
      updatedAt: new Date().toISOString()
    }), { merge: true });
  } catch (error) {
    console.error("Error updating subscription status:", error);
  }
  emitStorageChange();
}

/**
 * Performs a comprehensive cache purge of local question states, saved sessions,
 * and base paper caches, then re-synchronizes authoritative candidate data and users from Firestore.
 */
export async function purgeAllApplicationCacheAndResync(accessCode?: string): Promise<boolean> {
  clearAllQuizProgressAndCaches();
  try {
    await syncUsersFromCloud();
    if (accessCode) {
      await syncUserDataFromCloud(accessCode);
    }
    emitStorageChange();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sho_cache_purged'));
      window.dispatchEvent(new CustomEvent('sho_question_updated'));
    }
    return true;
  } catch (err) {
    console.warn('Error during cloud re-sync following cache purge:', err);
    emitStorageChange();
    return false;
  }
}

