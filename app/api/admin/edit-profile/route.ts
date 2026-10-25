import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { getUserDocId, sanitizeProfile, UserProfile } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export interface EditProfilePayload {
  accessCodeOrId: string;
  name: string;
  club?: string;
  adminAccessCode?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<EditProfilePayload>;
    const { accessCodeOrId, name, club, adminAccessCode } = body;

    // 1. Validation
    if (!accessCodeOrId || typeof accessCodeOrId !== 'string' || !accessCodeOrId.trim()) {
      return NextResponse.json(
        { success: false, error: 'Candidate access code or ID is required.' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Candidate name cannot be empty.' },
        { status: 400 }
      );
    }

    const cleanInput = accessCodeOrId.trim().toUpperCase();
    const canonicalId = getUserDocId(cleanInput);
    const timestamp = new Date().toISOString();

    // 2. Fetch existing user document if available
    let existingProfile: Partial<UserProfile> = {};
    try {
      const userRef = doc(db, 'users', canonicalId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        existingProfile = userSnap.data() as Partial<UserProfile>;
      } else {
        // Try fallback query by accessCode
        const usersColl = collection(db, 'users');
        const q = query(usersColl, where('accessCode', '==', cleanInput));
        const snap = await getDocs(q);
        if (!snap.empty) {
          existingProfile = snap.docs[0].data() as Partial<UserProfile>;
        }
      }
    } catch (e) {
      console.warn('Could not read existing user doc before update:', e);
    }

    const updatedProfile: UserProfile = sanitizeProfile({
      ...existingProfile,
      id: canonicalId,
      accessCode: existingProfile.accessCode || cleanInput,
      name: name.trim(),
      club: club !== undefined && club.trim() ? club.trim() : (existingProfile.club || 'Apex Papers Operations'),
      lastLoginAt: timestamp,
      updatedAt: timestamp,
    }, canonicalId);

    // 3. Persist to Firestore /users/{canonicalId}
    try {
      const userDocRef = doc(db, 'users', canonicalId);
      await setDoc(userDocRef, updatedProfile, { merge: true });

      // 4. Update progress document in /user_data/{canonicalId}
      const progressRef = doc(db, 'user_data', canonicalId);
      const progressSnap = await getDoc(progressRef);
      let existingExamHistory: Record<string, unknown>[] = [];
      let savedSessions: Record<string, unknown> = {};

      if (progressSnap.exists()) {
        const pData = progressSnap.data();
        savedSessions = pData?.savedSessions || {};
        if (Array.isArray(pData?.examHistory)) {
          existingExamHistory = pData.examHistory.map((attempt: Record<string, unknown>) => ({
            ...attempt,
            candidateName: updatedProfile.name,
            clubName: updatedProfile.club,
          }));
        }
      }

      await setDoc(progressRef, {
        userId: canonicalId,
        profile: updatedProfile,
        savedSessions,
        examHistory: existingExamHistory,
        updatedAt: timestamp,
      }, { merge: true });

      // 5. Update /exam_submissions to guarantee candidate's previous certificates reflect new name
      try {
        const submissionsColl = collection(db, 'exam_submissions');
        const subQ = query(submissionsColl, where('accessCode', '==', updatedProfile.accessCode));
        const subSnap = await getDocs(subQ);
        const updatePromises: Promise<void>[] = [];

        subSnap.forEach((subDoc) => {
          updatePromises.push(
            setDoc(doc(db, 'exam_submissions', subDoc.id), {
              candidateName: updatedProfile.name,
              clubName: updatedProfile.club,
              updatedAt: timestamp,
            }, { merge: true })
          );
        });

        await Promise.allSettled(updatePromises);
      } catch (subErr) {
        console.warn('Non-blocking: could not update exam submissions sub-collection:', subErr);
      }

      // 6. Write to /exam_audit_logs
      const auditId = `log_pedit_${canonicalId}_${Date.now()}`;
      await setDoc(doc(db, 'exam_audit_logs', auditId), {
        id: auditId,
        submissionId: canonicalId,
        accessCode: updatedProfile.accessCode,
        candidateName: updatedProfile.name,
        action: 'ADMIN_PROFILE_EDITED',
        timestamp,
        payloadSnapshot: {
          updatedName: updatedProfile.name,
          updatedClub: updatedProfile.club,
          adminAccessCode: adminAccessCode || 'ADMIN',
        },
      });
    } catch (dbErr) {
      console.error('Firestore error during profile persist:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Profile for candidate "${updatedProfile.name}" (${updatedProfile.accessCode}) updated permanently in the database.`,
      profile: updatedProfile,
      canonicalId,
      updatedAt: timestamp,
    });
  } catch (error) {
    console.error('Server error in /api/admin/edit-profile:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error while saving candidate profile.',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code') || searchParams.get('id');

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Access code or ID query parameter required.' },
        { status: 400 }
      );
    }

    const canonicalId = getUserDocId(code);
    const userDocRef = doc(db, 'users', canonicalId);
    const snap = await getDoc(userDocRef);

    if (snap.exists()) {
      return NextResponse.json({
        success: true,
        profile: snap.data(),
      });
    }

    return NextResponse.json(
      { success: false, error: 'Profile not found.' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Server error fetching candidate profile:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch candidate profile.',
      },
      { status: 500 }
    );
  }
}
