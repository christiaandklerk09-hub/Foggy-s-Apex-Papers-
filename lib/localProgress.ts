export interface LocalQuizProgress {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  flaggedQuestions: number[];
  secondsElapsed: number;
  activeSection: number;
  completedSections: number[];
  sectionScores: Record<number, { score: number; total: number; title?: string }>;
  seed: number;
  lastUpdated: number;
}

export function saveQuizProgress(paperId: string, progress: LocalQuizProgress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`ap_quiz_progress_${paperId}`, JSON.stringify(progress));
}

export function loadQuizProgress(paperId: string): LocalQuizProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(`ap_quiz_progress_${paperId}`);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to parse quiz progress for', paperId, e);
    return null;
  }
}

export function clearQuizProgress(paperId: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`ap_quiz_progress_${paperId}`);
    localStorage.removeItem(`ap_quiz_seed_${paperId}`);
  } catch (e) {
    console.warn('Error clearing quiz progress:', e);
  }
}

export function clearAllQuizProgressAndCaches() {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('ap_quiz_progress_') ||
        key.startsWith('ap_quiz_seed_') ||
        key.startsWith('ap_custom_q_') ||
        key.startsWith('ap_deleted_q_') ||
        key.startsWith('base_paper_') ||
        key === 'ap_edited_question_keys' ||
        key === 'base_paper'
      )) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    try {
      sessionStorage.clear();
    } catch {}
  } catch (e) {
    console.warn('Error clearing all quiz caches:', e);
  }
}
