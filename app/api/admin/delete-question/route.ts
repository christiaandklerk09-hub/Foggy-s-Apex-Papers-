import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export interface DeleteQuestionPayload {
  paperId: string;
  questionId: number;
  adminAccessCode?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<DeleteQuestionPayload>;
    const { paperId, questionId, adminAccessCode } = body;

    if (!paperId || typeof paperId !== 'string' || !paperId.trim()) {
      return NextResponse.json(
        { success: false, error: 'Valid paperId is required.' },
        { status: 400 }
      );
    }

    if (questionId === undefined || isNaN(Number(questionId))) {
      return NextResponse.json(
        { success: false, error: 'Valid numeric questionId is required.' },
        { status: 400 }
      );
    }

    const qId = Number(questionId);
    const docKey = `${paperId}_${qId}`;
    const timestamp = new Date().toISOString();

    // 1. Remove from custom_questions collection
    try {
      const customDocRef = doc(db, 'custom_questions', docKey);
      await deleteDoc(customDocRef);
    } catch (e) {
      console.warn('Could not delete from custom_questions:', e);
    }

    // 2. Mark permanently in deleted_questions registry
    const delDocRef = doc(db, 'deleted_questions', docKey);
    await setDoc(delDocRef, {
      paperId,
      questionId: qId,
      deletedAt: timestamp,
      deletedBy: adminAccessCode || 'Administrator',
    }, { merge: true });

    // 3. Write audit log
    try {
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
          questionId: qId,
        },
      });
    } catch (auditErr) {
      console.warn('Could not write audit log for question deletion:', auditErr);
    }

    return NextResponse.json({
      success: true,
      message: `Question #${qId} for paper ${paperId} permanently deleted from the database.`,
      paperId,
      questionId: qId,
      deletedAt: timestamp,
    });
  } catch (error) {
    console.error('Server error in /api/admin/delete-question:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Server error while deleting question.',
      },
      { status: 500 }
    );
  }
}
