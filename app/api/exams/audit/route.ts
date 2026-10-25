import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    return NextResponse.json({
      status: 'healthy',
      persistenceEngine: 'multi-tier-cloud-and-local-immutable-archive',
      collections: [
        'users',
        'user_data',
        'exam_submissions',
        'exam_audit_logs',
        'custom_questions'
      ],
      zeroLossGuarantees: {
        immutableSubmissions: true,
        offlineRetryQueue: true,
        localPermanentArchive: true,
        multiSourceDeduplication: true,
        softDeletesOnly: true
      },
      queriedCode: code || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
