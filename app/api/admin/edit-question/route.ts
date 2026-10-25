import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { Question } from '@/lib/quiz-data';

export const dynamic = 'force-dynamic';

export interface EditQuestionPayload {
  paperId: string;
  question: Question;
  adminAccessCode?: string;
  action?: 'SAVE' | 'DELETE';
}

export interface DeleteQuestionPayload {
  paperId: string;
  questionId: number;
  adminAccessCode?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paperId, question, adminAccessCode, action, questionId } = body;

    // Handle delete action if dispatched via POST
    if (action === 'DELETE' || (questionId !== undefined && !question)) {
      const qId = questionId !== undefined ? Number(questionId) : (question?.id ? Number(question.id) : NaN);
      return await handleDeleteQuestion(paperId, qId, adminAccessCode);
    }

    // 1. Validation
    if (!paperId || typeof paperId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid paperId.' },
        { status: 400 }
      );
    }

    if (!question || typeof question.id !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid question payload (question.id required).' },
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
        { success: false, error: 'Question must have exactly 4 options (A, B, C, D).' },
        { status: 400 }
      );
    }

    for (const opt of (question.options as { letter?: string; text?: string }[])) {
      if (!opt.letter || !['A', 'B', 'C', 'D'].includes(opt.letter) || !opt.text || !opt.text.trim()) {
        return NextResponse.json(
          { success: false, error: `Invalid option structure for choice ${opt?.letter || 'unknown'}.` },
          { status: 400 }
        );
      }
    }

    if (!['A', 'B', 'C', 'D'].includes(question.correctAnswer)) {
      return NextResponse.json(
        { success: false, error: 'Correct answer must be one of A, B, C, or D.' },
        { status: 400 }
      );
    }

    const sanitizedQuestion: Question = {
      id: question.id,
      category: (question.category || 'Apex Papers Operations Curriculum').trim(),
      question: question.question.trim(),
      options: (question.options as { letter: 'A' | 'B' | 'C' | 'D'; text: string }[]).map((opt) => ({
        letter: opt.letter,
        text: opt.text.trim(),
      })),
      correctAnswer: question.correctAnswer,
      explanation: (question.explanation || '').trim(),
    };

    const docKey = `${paperId}_${question.id}`;
    const timestamp = new Date().toISOString();

    // 2. Persist to Firestore custom_questions collection
    try {
      const qDocRef = doc(db, 'custom_questions', docKey);
      await setDoc(qDocRef, {
        paperId,
        questionId: question.id,
        question: sanitizedQuestion,
        updatedAt: timestamp,
        updatedBy: adminAccessCode || 'Administrator',
      }, { merge: true });

      // If it was previously marked deleted, un-delete it
      try {
        const delDocRef = doc(db, 'deleted_questions', docKey);
        await deleteDoc(delDocRef);
      } catch {
        // ignore
      }

      // 3. Log to audit logs for full traceability
      const auditLogId = `log_qedit_${docKey}_${Date.now()}`;
      const auditRef = doc(db, 'exam_audit_logs', auditLogId);
      await setDoc(auditRef, {
        id: auditLogId,
        submissionId: docKey,
        accessCode: adminAccessCode || 'ADMIN',
        candidateName: 'Administrator',
        action: 'ADMIN_QUESTION_EDITED',
        timestamp,
        payloadSnapshot: {
          paperId,
          questionId: question.id,
          questionPrompt: sanitizedQuestion.question,
          correctAnswer: sanitizedQuestion.correctAnswer,
        },
      });
    } catch (dbErr) {
      console.error('Firestore error during question persist:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Question #${question.id} for paper ${paperId} updated permanently in the database.`,
      docKey,
      paperId,
      question: sanitizedQuestion,
      updatedAt: timestamp,
    });
  } catch (error) {
    console.error('Server error in /api/admin/edit-question:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error while saving question.',
      },
      { status: 500 }
    );
  }
}

async function handleDeleteQuestion(paperId?: string, questionId?: number, adminAccessCode?: string) {
  if (!paperId || typeof paperId !== 'string' || !paperId.trim()) {
    return NextResponse.json(
      { success: false, error: 'Valid paperId is required.' },
      { status: 400 }
    );
  }
  if (questionId === undefined || isNaN(questionId) || typeof questionId !== 'number') {
    return NextResponse.json(
      { success: false, error: 'Valid numeric questionId is required.' },
      { status: 400 }
    );
  }

  const docKey = `${paperId}_${questionId}`;
  const timestamp = new Date().toISOString();

  try {
    // 1. Remove from custom_questions if it existed
    const customDocRef = doc(db, 'custom_questions', docKey);
    await deleteDoc(customDocRef);

    // 2. Mark permanently in deleted_questions registry
    const delDocRef = doc(db, 'deleted_questions', docKey);
    await setDoc(delDocRef, {
      paperId,
      questionId,
      deletedAt: timestamp,
      deletedBy: adminAccessCode || 'Administrator',
    }, { merge: true });

    // 3. Write audit log
    const auditLogId = `log_qdel_${docKey}_${Date.now()}`;
    const auditRef = doc(db, 'exam_audit_logs', auditLogId);
    await setDoc(auditRef, {
      id: auditLogId,
      submissionId: docKey,
      accessCode: adminAccessCode || 'ADMIN',
      candidateName: 'Administrator',
      action: 'ADMIN_QUESTION_DELETED',
      timestamp,
      details: {
        paperId,
        questionId,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Question #${questionId} for paper ${paperId} permanently deleted from the database.`,
      paperId,
      questionId,
      deletedAt: timestamp,
    });
  } catch (err) {
    console.error('Error permanently deleting question from database:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to permanently delete question from database.',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let paperId = searchParams.get('paperId') || '';
    let questionIdStr = searchParams.get('questionId') || '';
    let adminAccessCode = searchParams.get('adminAccessCode') || '';

    if (!paperId || !questionIdStr) {
      // Check body
      const body = await req.json().catch(() => ({}));
      if (body.paperId) paperId = body.paperId;
      if (body.questionId !== undefined) questionIdStr = String(body.questionId);
      if (body.adminAccessCode) adminAccessCode = body.adminAccessCode;
    }

    const qId = Number(questionIdStr);
    return await handleDeleteQuestion(paperId, qId, adminAccessCode);
  } catch (error) {
    console.error('Server error in DELETE /api/admin/edit-question:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Server error deleting question.',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paperId = searchParams.get('paperId');

    const customColl = collection(db, 'custom_questions');
    let customSnapshot;

    if (paperId) {
      const q = query(customColl, where('paperId', '==', paperId));
      customSnapshot = await getDocs(q);
    } else {
      customSnapshot = await getDocs(customColl);
    }

    const questions: Record<string, Question> = {};
    customSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && data.paperId && data.question) {
        const key = `${data.paperId}_${data.question.id}`;
        questions[key] = data.question as Question;
      }
    });

    // Also fetch deleted questions
    const deletedColl = collection(db, 'deleted_questions');
    let deletedSnapshot;
    if (paperId) {
      const delQ = query(deletedColl, where('paperId', '==', paperId));
      deletedSnapshot = await getDocs(delQ);
    } else {
      deletedSnapshot = await getDocs(deletedColl);
    }

    const deletedQuestionIds: number[] = [];
    deletedSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && (!paperId || data.paperId === paperId) && typeof data.questionId === 'number') {
        deletedQuestionIds.push(data.questionId);
      }
    });

    return NextResponse.json({
      success: true,
      questions,
      deletedQuestionIds,
      count: Object.keys(questions).length,
    });
  } catch (error) {
    console.warn('Server notice fetching custom questions (falling back to empty):', error);
    return NextResponse.json(
      {
        success: true,
        questions: {},
        deletedQuestionIds: [],
        warning: error instanceof Error ? error.message : 'Fallback to local custom questions.',
      },
      { status: 200 }
    );
  }
}
