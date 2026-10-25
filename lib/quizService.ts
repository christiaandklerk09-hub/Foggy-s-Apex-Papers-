import { collection, doc, setDoc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QUIZ_PAPERS, Question } from '@/lib/quiz-data';

export async function startNewAttempt(
  userId: string,
  chapterId: string,
  shuffledQuestionIds: number[]
): Promise<string> {
  const attemptsRef = collection(db, 'users', userId, 'chapters', chapterId, 'attempts');
  const newAttemptRef = doc(attemptsRef);
  
  await setDoc(newAttemptRef, {
    completed: false,
    shuffledQuestionIds,
    createdAt: serverTimestamp(),
  });
  
  return newAttemptRef.id;
}

export async function saveAttemptWithSequence(
  userId: string,
  chapterId: string,
  attemptId: string,
  score: number,
  total: number,
  incorrectIds: number[]
): Promise<void> {
  const attemptRef = doc(db, 'users', userId, 'chapters', chapterId, 'attempts', attemptId);
  
  await updateDoc(attemptRef, {
    score,
    total,
    incorrectIds,
    completed: true,
    completedAt: serverTimestamp(),
  });
}

export async function getRetryQuestions(
  userId: string,
  chapterId: string,
  attemptId: string
): Promise<Question[]> {
  const attemptRef = doc(db, 'users', userId, 'chapters', chapterId, 'attempts', attemptId);
  const attemptSnap = await getDoc(attemptRef);
  
  if (!attemptSnap.exists()) {
    throw new Error('Attempt not found');
  }
  
  const data = attemptSnap.data();
  const shuffledQuestionIds: number[] = data.shuffledQuestionIds || [];
  const incorrectIds: number[] = data.incorrectIds || [];
  
  const paper = QUIZ_PAPERS.find(p => p.id === chapterId);
  if (!paper) {
    throw new Error('Quiz paper not found');
  }
  
  const missedQuestions: Question[] = [];
  
  // Filter the original full question list to return missed questions in their original relative sequence
  for (const qId of shuffledQuestionIds) {
    if (incorrectIds.includes(qId)) {
      const question = paper.questions.find(q => q.id === qId);
      if (question) {
        missedQuestions.push(question);
      }
    }
  }
  
  return missedQuestions;
}
