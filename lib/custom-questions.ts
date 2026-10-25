import { doc, getDocs, setDoc, deleteDoc, collection, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { Question, QuizPaper } from './quiz-data';

const LOCAL_CUSTOM_QUESTIONS_PREFIX = 'sho_custom_q_';
const LOCAL_DELETED_QUESTIONS_PREFIX = 'sho_deleted_q_';

export async function saveEditedQuestion(
  paperId: string,
  updatedQuestion: Question,
  adminAccessCode?: string
): Promise<Question> {
  const key = `${paperId}_${updatedQuestion.id}`;
  
  // 1. Immediately cache in localStorage for zero-latency local fallback
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`${LOCAL_CUSTOM_QUESTIONS_PREFIX}${key}`, JSON.stringify(updatedQuestion));
      const rawList = localStorage.getItem('sho_edited_question_keys');
      const list: string[] = rawList ? JSON.parse(rawList) : [];
      if (!list.includes(key)) {
        list.push(key);
        localStorage.setItem('sho_edited_question_keys', JSON.stringify(list));
      }

      // Remove from local deleted list if it was deleted previously
      const rawDeleted = localStorage.getItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperId}`);
      if (rawDeleted) {
        const deletedIds: number[] = JSON.parse(rawDeleted);
        const filtered = deletedIds.filter((id) => id !== updatedQuestion.id);
        localStorage.setItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperId}`, JSON.stringify(filtered));
      }

      window.dispatchEvent(new CustomEvent('sho_question_edited', { detail: { paperId, question: updatedQuestion } }));
    } catch (e) {
      console.warn('Failed to save edited question to localStorage', e);
    }
  }

  // 2. Dispatch API request to update the database permanently
  try {
    const res = await fetch('/api/admin/edit-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paperId,
        question: updatedQuestion,
        adminAccessCode: adminAccessCode || 'ADMIN',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.question) {
        return data.question;
      }
    }
  } catch (apiErr) {
    console.warn('API request to /api/admin/edit-question failed, falling back to direct Firestore:', apiErr);
  }

  // 3. Fallback direct write to Firestore cloud collection `custom_questions`
  try {
    const qDocRef = doc(db, 'custom_questions', key);
    setDoc(qDocRef, {
      paperId,
      questionId: updatedQuestion.id,
      question: updatedQuestion,
      updatedAt: new Date().toISOString(),
      updatedBy: adminAccessCode || 'Administrator',
    }, { merge: true }).catch(e => console.warn('Sync delayed (offline):', e));

    try {
      const delDocRef = doc(db, 'deleted_questions', key);
      deleteDoc(delDocRef).catch(e => console.warn('Sync delayed (offline):', e));
    } catch {
      // ignore
    }
  } catch (err) {
    console.warn('Failed to save edited question to Firestore:', err);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sho_question_updated', { detail: { paperId, question: updatedQuestion } }));
  }

  return updatedQuestion;
}

/**
 * Permanently deletes a specific question by ID from the database for a given paper.
 */
export async function deleteQuestionPermanently(
  paperId: string,
  questionId: number,
  adminAccessCode?: string
): Promise<boolean> {
  const docKey = `${paperId}_${questionId}`;

  // 1. Update localStorage instantly
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(`${LOCAL_CUSTOM_QUESTIONS_PREFIX}${docKey}`);
      const rawList = localStorage.getItem('sho_edited_question_keys');
      if (rawList) {
        const list: string[] = JSON.parse(rawList);
        const filtered = list.filter((k) => k !== docKey);
        localStorage.setItem('sho_edited_question_keys', JSON.stringify(filtered));
      }

      // Add to local deleted questions array
      const rawDeleted = localStorage.getItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperId}`);
      const deletedIds: number[] = rawDeleted ? JSON.parse(rawDeleted) : [];
      if (!deletedIds.includes(questionId)) {
        deletedIds.push(questionId);
        localStorage.setItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperId}`, JSON.stringify(deletedIds));
      }

      window.dispatchEvent(new CustomEvent('sho_question_deleted', { detail: { paperId, questionId } }));
    } catch (e) {
      console.warn('Failed to update local storage for deleted question:', e);
    }
  }

  // 2. Dispatch DELETE API request
  let apiSuccess = false;
  try {
    const res = await fetch('/api/admin/edit-question', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paperId,
        questionId,
        adminAccessCode: adminAccessCode || 'ADMIN',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        apiSuccess = true;
      }
    }
  } catch (apiErr) {
    console.warn('API call to delete question failed, trying direct Firestore:', apiErr);
  }

  // 3. Direct Firestore deletion & recording in deleted_questions collection
  try {
    const customDocRef = doc(db, 'custom_questions', docKey);
    deleteDoc(customDocRef).catch(e => console.warn('Sync delayed (offline):', e));

    const delDocRef = doc(db, 'deleted_questions', docKey);
    setDoc(delDocRef, {
      paperId,
      questionId,
      deletedAt: new Date().toISOString(),
      deletedBy: adminAccessCode || 'Administrator',
    }, { merge: true }).catch(e => console.warn('Sync delayed (offline):', e));

    apiSuccess = true;
  } catch (fsErr) {
    console.warn('Direct Firestore delete question error:', fsErr);
  }

  return apiSuccess;
}

export function getLocalDeletedQuestions(paperId: string): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const rawDeleted = localStorage.getItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperId}`);
    return rawDeleted ? JSON.parse(rawDeleted) : [];
  } catch {
    return [];
  }
}

export function getLocalCustomQuestions(paperId: string): Record<number, Question> {
  if (typeof window === 'undefined') return {};
  const result: Record<number, Question> = {};
  try {
    const rawList = localStorage.getItem('sho_edited_question_keys');
    const list: string[] = rawList ? JSON.parse(rawList) : [];
    
    for (const key of list) {
      if (key.startsWith(`${paperId}_`)) {
        const raw = localStorage.getItem(`${LOCAL_CUSTOM_QUESTIONS_PREFIX}${key}`);
        if (raw) {
          const q = JSON.parse(raw) as Question;
          if (q && q.id) {
            result[q.id] = q;
          }
        }
      }
    }
  } catch (e) {
    console.warn('Error reading local custom questions', e);
  }
  return result;
}

export async function syncCustomQuestionsFromCloud(paperId: string): Promise<{
  questions: Record<number, Question>;
  deletedQuestionIds: number[];
}> {
  const local = getLocalCustomQuestions(paperId);
  const localDeleted = getLocalDeletedQuestions(paperId);
  if (typeof window === 'undefined') return { questions: local, deletedQuestionIds: localDeleted };

  let cloudDeleted: number[] = [...localDeleted];

  // 1. First attempt to fetch from the server-side API
  try {
    const res = await fetch(`/api/admin/edit-question?paperId=${encodeURIComponent(paperId)}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.deletedQuestionIds)) {
        // Cloud is authoritative for deletedQuestionIds
        cloudDeleted = data.deletedQuestionIds;
        
        // Also prune any questions from deleted list if they are present in custom questions
        if (data.questions && typeof data.questions === 'object') {
          const presentIds = new Set(
            Object.values(data.questions)
              .map((q: any) => q?.id)
              .filter((id) => typeof id === 'number')
          );
          cloudDeleted = cloudDeleted.filter((id) => !presentIds.has(id));
        }

        // Write authoritative list to localStorage
        localStorage.setItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperId}`, JSON.stringify(cloudDeleted));
      }
      if (data.questions && typeof data.questions === 'object') {
        const rawList = localStorage.getItem('sho_edited_question_keys');
        const list: string[] = rawList ? JSON.parse(rawList) : [];

        for (const [docKey, qObj] of Object.entries(data.questions)) {
          const q = qObj as Question;
          if (q && q.id) {
            local[q.id] = q;
            localStorage.setItem(`${LOCAL_CUSTOM_QUESTIONS_PREFIX}${docKey}`, JSON.stringify(q));
            if (!list.includes(docKey)) {
              list.push(docKey);
            }
          }
        }
        localStorage.setItem('sho_edited_question_keys', JSON.stringify(list));
      }
      return { questions: local, deletedQuestionIds: cloudDeleted };
    }
  } catch (e) {
    console.warn('API fetch for custom questions failed, trying Firestore:', e);
  }

  // 2. Direct Firestore query fallback
  try {
    const customColl = collection(db, 'custom_questions');
    const qQuery = query(customColl, where('paperId', '==', paperId));
    const snapshot = await getDocs(qQuery);
    
    const rawList = localStorage.getItem('sho_edited_question_keys');
    const list: string[] = rawList ? JSON.parse(rawList) : [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && data.paperId === paperId && data.question) {
        const q = data.question as Question;
        local[q.id] = q;
        const key = `${paperId}_${q.id}`;
        localStorage.setItem(`${LOCAL_CUSTOM_QUESTIONS_PREFIX}${key}`, JSON.stringify(q));
        if (!list.includes(key)) {
          list.push(key);
        }
      }
    });

    localStorage.setItem('sho_edited_question_keys', JSON.stringify(list));

    // Also query deleted_questions
    const delColl = collection(db, 'deleted_questions');
    const delQuery = query(delColl, where('paperId', '==', paperId));
    const delSnap = await getDocs(delQuery);
    const fsDeleted: number[] = [];
    delSnap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && typeof data.questionId === 'number') {
        fsDeleted.push(data.questionId);
      }
    });
    cloudDeleted = fsDeleted;
    localStorage.setItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperId}`, JSON.stringify(cloudDeleted));
  } catch (err) {
    console.warn('Could not fetch custom questions from Firestore:', err);
  }

  return { questions: local, deletedQuestionIds: cloudDeleted };
}

export async function createNewQuestion(
  paperId: string,
  questionData: Omit<Question, 'id'> & { id?: number },
  adminAccessCode?: string
): Promise<Question> {
  const paperTrimmed = paperId.trim();

  // 1. Try Backend API Route /api/admin/create-question
  try {
    const baseUrl = (typeof window !== 'undefined') ? '' : (process.env.NEXT_PUBLIC_APP_URL || '');
    const res = await fetch(`${baseUrl}/api/admin/create-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paperId: paperTrimmed,
        question: questionData,
        adminAccessCode: adminAccessCode || 'ADMIN',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.question) {
        const createdQ = data.question as Question;
        const key = `${paperTrimmed}_${createdQ.id}`;

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(`${LOCAL_CUSTOM_QUESTIONS_PREFIX}${key}`, JSON.stringify(createdQ));
            const rawList = localStorage.getItem('sho_edited_question_keys');
            const list: string[] = rawList ? JSON.parse(rawList) : [];
            if (!list.includes(key)) {
              list.push(key);
              localStorage.setItem('sho_edited_question_keys', JSON.stringify(list));
            }

            // Remove from deleted list if present
            const rawDeleted = localStorage.getItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperTrimmed}`);
            if (rawDeleted) {
              const deletedIds: number[] = JSON.parse(rawDeleted);
              const filtered = deletedIds.filter((id) => id !== createdQ.id);
              localStorage.setItem(`${LOCAL_DELETED_QUESTIONS_PREFIX}${paperTrimmed}`, JSON.stringify(filtered));
            }

            window.dispatchEvent(new CustomEvent('sho_question_created', { detail: { paperId: paperTrimmed, question: createdQ } }));
            window.dispatchEvent(new CustomEvent('sho_question_edited', { detail: { paperId: paperTrimmed, question: createdQ } }));
          } catch (e) {
            console.warn('Failed to cache new question locally:', e);
          }
        }
        return createdQ;
      }
    }
  } catch (apiErr) {
    console.warn('API call to /api/admin/create-question failed, falling back to local/Firestore creation:', apiErr);
  }

  // 2. Client-side fallback if server API is unavailable
  const fallbackId = questionData.id && questionData.id > 0 ? questionData.id : Date.now() % 100000;
  const createdQuestion: Question = {
    id: fallbackId,
    category: (questionData.category || 'Assessment Protocol').trim(),
    question: questionData.question.trim(),
    options: (questionData.options || []).map((opt) => ({ letter: opt.letter, text: opt.text.trim() })),
    correctAnswer: questionData.correctAnswer,
    explanation: (questionData.explanation || '').trim(),
  };

  const key = `${paperTrimmed}_${createdQuestion.id}`;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`${LOCAL_CUSTOM_QUESTIONS_PREFIX}${key}`, JSON.stringify(createdQuestion));
      const rawList = localStorage.getItem('sho_edited_question_keys');
      const list: string[] = rawList ? JSON.parse(rawList) : [];
      if (!list.includes(key)) {
        list.push(key);
        localStorage.setItem('sho_edited_question_keys', JSON.stringify(list));
      }
      window.dispatchEvent(new CustomEvent('sho_question_created', { detail: { paperId: paperTrimmed, question: createdQuestion } }));
      window.dispatchEvent(new CustomEvent('sho_question_edited', { detail: { paperId: paperTrimmed, question: createdQuestion } }));
    } catch {
      // ignore
    }
  }

  // 3. Fallback direct Firestore write
  try {
    const qDocRef = doc(db, 'custom_questions', key);
    setDoc(qDocRef, {
      paperId: paperTrimmed,
      questionId: createdQuestion.id,
      question: createdQuestion,
      isNew: true,
      createdAt: new Date().toISOString(),
      createdBy: adminAccessCode || 'Administrator',
    }, { merge: true }).catch(e => console.warn('Sync delayed (offline):', e));
  } catch (fsErr) {
    console.warn('Direct Firestore write error in createNewQuestion:', fsErr);
  }

  return createdQuestion;
}

export function applyCustomQuestionsToPaper(
  paper: QuizPaper,
  customMap: Record<number, Question>,
  deletedQuestionIds?: number[]
): QuizPaper {
  const deletedSet = new Set(
    deletedQuestionIds !== undefined ? deletedQuestionIds : getLocalDeletedQuestions(paper.id)
  );

  // 1. Filter out deleted questions
  const filtered = paper.questions.filter((q) => !deletedSet.has(q.id));

  // 2. Apply customized question bodies
  const existingIds = new Set(filtered.map((q) => q.id));
  const updatedQuestions = filtered.map((q) => {
    if (customMap && customMap[q.id]) {
      return { ...q, ...customMap[q.id] };
    }
    return q;
  });

  // 3. Append newly added questions that are not part of initial static paper
  if (customMap) {
    Object.values(customMap).forEach((q) => {
      if (q && typeof q.id === 'number' && !existingIds.has(q.id) && !deletedSet.has(q.id)) {
        updatedQuestions.push(q);
      }
    });
  }

  // Sort questions cleanly by ID
  updatedQuestions.sort((a, b) => a.id - b.id);

  return {
    ...paper,
    questions: updatedQuestions,
    totalMarks: Math.max(1, updatedQuestions.length),
  };
}
