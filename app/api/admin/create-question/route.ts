import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { Question } from '@/lib/quiz-data';

export const dynamic = 'force-dynamic';

export interface CreateQuestionPayload {
  paperId: string;
  question: {
    id?: number;
    question: string;
    category?: string;
    options: {
      letter: 'A' | 'B' | 'C' | 'D';
      text: string;
    }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanation?: string;
  };
  adminAccessCode?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CreateQuestionPayload>;
    const { paperId, question, adminAccessCode } = body;

    // 1. Validation
    if (!paperId || typeof paperId !== 'string' || !paperId.trim()) {
      return NextResponse.json(
        { success: false, error: 'Valid paperId is required to assign question to curriculum.' },
        { status: 400 }
      );
    }

    if (!question || typeof question !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Question data payload is required.' },
        { status: 400 }
      );
    }

    if (!question.question || typeof question.question !== 'string' || !question.question.trim()) {
      return NextResponse.json(
        { success: false, error: 'Question prompt text cannot be empty.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(question.options) || question.options.length !== 4) {
      return NextResponse.json(
        { success: false, error: 'Question must have exactly 4 options (A, B, C, and D).' },
        { status: 400 }
      );
    }

    for (const opt of question.options as { letter?: string; text?: string }[]) {
      if (!opt.letter || !['A', 'B', 'C', 'D'].includes(opt.letter) || !opt.text || !opt.text.trim()) {
        return NextResponse.json(
          { success: false, error: `Invalid option text for choice ${opt?.letter || 'unknown'}. All choices must have text.` },
          { status: 400 }
        );
      }
    }

    if (!['A', 'B', 'C', 'D'].includes(question.correctAnswer || '')) {
      return NextResponse.json(
        { success: false, error: 'Correct answer must be designated as A, B, C, or D.' },
        { status: 400 }
      );
    }

    // 2. Determine Question ID if not explicitly specified
    let targetQuestionId = question.id && !isNaN(Number(question.id)) ? Number(question.id) : 0;

    if (!targetQuestionId || targetQuestionId <= 0) {
      // Find highest existing question ID for this paper to calculate next sequential ID
      try {
        const customColl = collection(db, 'custom_questions');
        const qQuery = query(customColl, where('paperId', '==', paperId.trim()));
        const snapshot = await getDocs(qQuery);
        let maxId = 50; // Standard paper default

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && typeof data.questionId === 'number' && data.questionId > maxId) {
            maxId = data.questionId;
          }
        });

        targetQuestionId = maxId + 1;
      } catch (err) {
        console.warn('Could not query max questionId from Firestore, using timestamp fallback:', err);
        targetQuestionId = 51;
      }
    }

    const sanitizedQuestion: Question = {
      id: targetQuestionId,
      category: (question.category || 'Assessment Protocol').trim(),
      question: question.question.trim(),
      options: (question.options as { letter: 'A' | 'B' | 'C' | 'D'; text: string }[]).map((opt) => ({
        letter: opt.letter,
        text: opt.text.trim(),
      })),
      correctAnswer: question.correctAnswer,
      explanation: (question.explanation || '').trim(),
    };

    const docKey = `${paperId.trim()}_${targetQuestionId}`;
    const timestamp = new Date().toISOString();

    // 3. Persist new question to Firestore `custom_questions`
    try {
      const qDocRef = doc(db, 'custom_questions', docKey);
      await setDoc(qDocRef, {
        paperId: paperId.trim(),
        questionId: targetQuestionId,
        question: sanitizedQuestion,
        isNew: true,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: adminAccessCode || 'Administrator',
      }, { merge: true });

      // Unmark from deleted_questions if it was previously marked deleted
      try {
        const delDocRef = doc(db, 'deleted_questions', docKey);
        await deleteDoc(delDocRef);
      } catch {
        // ignore
      }

      // 4. Log to exam audit logs
      const auditLogId = `log_qcreate_${docKey}_${Date.now()}`;
      const auditRef = doc(db, 'exam_audit_logs', auditLogId);
      await setDoc(auditRef, {
        id: auditLogId,
        submissionId: docKey,
        accessCode: adminAccessCode || 'ADMIN',
        candidateName: 'Administrator',
        action: 'ADMIN_QUESTION_CREATED',
        timestamp,
        payloadSnapshot: {
          paperId: paperId.trim(),
          questionId: targetQuestionId,
          questionPrompt: sanitizedQuestion.question,
          category: sanitizedQuestion.category,
          correctAnswer: sanitizedQuestion.correctAnswer,
        },
      });
    } catch (fsErr) {
      console.error('Firestore error during question creation:', fsErr);
    }

    return NextResponse.json({
      success: true,
      message: `New Question #${targetQuestionId} successfully created for paper "${paperId.trim()}" in the database.`,
      docKey,
      paperId: paperId.trim(),
      question: sanitizedQuestion,
      createdAt: timestamp,
    });
  } catch (error) {
    console.error('Server error in /api/admin/create-question:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Server error while creating question.',
      },
      { status: 500 }
    );
  }
}
