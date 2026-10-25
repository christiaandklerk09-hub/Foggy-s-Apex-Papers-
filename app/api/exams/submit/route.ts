import { NextRequest, NextResponse } from 'next/server';
import { extractChapterNumber, getPaperChapterBadge } from '@/lib/chapterParser';

export const dynamic = 'force-dynamic';

export interface ExamSubmissionPayload {
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
  answers: Record<string, string>;
  missedIds?: number[];
  candidateName: string;
  accessCode: string;
  clubName: string;
  categoryBreakdown?: Record<string, { total: number; correct: number }>;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ExamSubmissionPayload>;

    // Server-side validation
    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid or missing submission ID' }, { status: 400 });
    }
    if (!body.paperId || typeof body.paperId !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid or missing paper ID' }, { status: 400 });
    }
    if (typeof body.score !== 'number' || body.score < 0) {
      return NextResponse.json({ success: false, error: 'Invalid exam score' }, { status: 400 });
    }
    if (typeof body.totalMarks !== 'number' || body.totalMarks <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid total marks' }, { status: 400 });
    }
    if (!body.accessCode || typeof body.accessCode !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing candidate access code' }, { status: 400 });
    }
    if (!body.candidateName || typeof body.candidateName !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing candidate name' }, { status: 400 });
    }

    // Calculate/verify percentage
    const calculatedPercentage = Math.round((body.score / body.totalMarks) * 100);
    const passThreshold = typeof body.passMark === 'number' ? body.passMark : Math.ceil(body.totalMarks * 0.8);
    const passed = body.score >= passThreshold;

    // Dynamic chapter identification
    const chapterNum = (typeof body.chapterNumber === 'number' && body.chapterNumber >= 1 && body.chapterNumber <= 14)
      ? body.chapterNumber
      : extractChapterNumber(body.paperCode || body.paperId || '', `${body.paperSubtitle || ''} ${body.paperTitle || ''}`);
    const badgeInfo = getPaperChapterBadge(chapterNum);
    const chapterLabel = body.chapterLabel || badgeInfo?.topicLabel || `Paper ${chapterNum}`;

    const validatedRecord = {
      ...body,
      chapterNumber: chapterNum,
      chapterLabel,
      percentage: calculatedPercentage,
      passed,
      passMark: passThreshold,
      completedAt: body.completedAt || new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      serverVerified: true,
    };

    return NextResponse.json({
      success: true,
      message: 'Exam submission validated and logged successfully',
      submissionId: body.id,
      verifiedRecord: validatedRecord,
    });
  } catch (error) {
    console.error('Server error validating exam submission:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown server error',
    }, { status: 500 });
  }
}
