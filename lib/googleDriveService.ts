import { ExamAttempt } from '@/types/quiz';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  iconLink?: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  createdTime?: string;
  modifiedTime?: string;
  parents?: string[];
  description?: string;
}

export interface DriveAboutInfo {
  user: {
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  };
  storageQuota?: {
    limit?: string;
    usage?: string;
    usageInDrive?: string;
    usageInDriveTrash?: string;
  };
}

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_BASE = 'https://www.googleapis.com/upload/drive/v3';

/**
 * Fetch Google Drive user details and storage quota
 */
export async function getDriveAbout(accessToken: string): Promise<DriveAboutInfo> {
  const url = `${DRIVE_API_BASE}/about?fields=user(displayName,emailAddress,photoLink),storageQuota`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to fetch Drive account info (${res.status}): ${errorBody}`);
  }

  return res.json();
}

/**
 * List files and folders from Google Drive
 */
export async function listDriveFiles(
  accessToken: string,
  options: {
    query?: string;
    folderId?: string;
    pageSize?: number;
    pageToken?: string;
    orderBy?: string;
  } = {}
): Promise<{ files: DriveFileItem[]; nextPageToken?: string }> {
  const { folderId, pageSize = 30, pageToken, orderBy = 'folder,modifiedTime desc' } = options;
  
  let q = "trashed = false";
  if (folderId) {
    q += ` and '${folderId}' in parents`;
  }
  if (options.query) {
    q += ` and (name contains '${options.query.replace(/'/g, "\\'")}' or fullText contains '${options.query.replace(/'/g, "\\'")}')`;
  }

  const params = new URLSearchParams({
    q,
    pageSize: String(pageSize),
    orderBy,
    fields: 'nextPageToken, files(id, name, mimeType, size, iconLink, thumbnailLink, webViewLink, webContentLink, createdTime, modifiedTime, parents, description)',
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const res = await fetch(`${DRIVE_API_BASE}/files?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to list files from Drive (${res.status}): ${errorBody}`);
  }

  return res.json();
}

/**
 * Get or create the dedicated folder "Apex Papers - Matric Exam Archive" in Drive
 */
export async function getOrCreateApexPapersFolder(accessToken: string): Promise<string> {
  const folderName = 'Apex Papers - Matric Exam Archive';
  const q = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  
  const searchRes = await fetch(`${DRIVE_API_BASE}/files?q=${encodeURIComponent(q)}&fields=files(id, name)`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (searchRes.ok) {
    const data = await searchRes.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
  }

  // Create folder
  return createDriveFolder(accessToken, folderName, undefined, 'Dedicated archive for Apex Papers Grade 12 practice exams, mock tests, and progress transcripts');
}

/**
 * Create a new folder on Google Drive
 */
export async function createDriveFolder(
  accessToken: string,
  folderName: string,
  parentFolderId?: string,
  description?: string
): Promise<string> {
  const metadata: Record<string, any> = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }
  if (description) {
    metadata.description = description;
  }

  const res = await fetch(`${DRIVE_API_BASE}/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create folder in Google Drive: ${errorText}`);
  }

  const data = await res.json();
  return data.id;
}

/**
 * Upload a text or JSON file using multipart upload
 */
export async function uploadDriveFile(
  accessToken: string,
  options: {
    name: string;
    mimeType: string;
    content: string;
    parentFolderId?: string;
    description?: string;
  }
): Promise<DriveFileItem> {
  const { name, mimeType, content, parentFolderId, description } = options;

  const metadata: Record<string, any> = {
    name,
    mimeType,
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }
  if (description) {
    metadata.description = description;
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelimiter;

  const res = await fetch(
    `${DRIVE_UPLOAD_BASE}/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,webContentLink,createdTime,modifiedTime`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to upload file to Google Drive (${res.status}): ${errorBody}`);
  }

  return res.json();
}

/**
 * Download file content text from Google Drive
 */
export async function downloadDriveFileText(accessToken: string, fileId: string): Promise<string> {
  const res = await fetch(`${DRIVE_API_BASE}/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to download file content (${res.status}): ${errorBody}`);
  }

  return res.text();
}

/**
 * Delete a file from Google Drive (Requires user confirmation before invoking)
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  const res = await fetch(`${DRIVE_API_BASE}/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok && res.status !== 204) {
    const errorBody = await res.text();
    throw new Error(`Failed to delete file from Google Drive (${res.status}): ${errorBody}`);
  }
}

/**
 * Generate and upload a standardized exam transcript report to Google Drive
 */
export async function exportExamTranscriptToDrive(
  accessToken: string,
  attempt: ExamAttempt,
  candidateName?: string
): Promise<DriveFileItem> {
  const folderId = await getOrCreateApexPapersFolder(accessToken);
  const dateFormatted = new Date(attempt.completedAt || Date.now()).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const student = candidateName || attempt.candidateName || 'Candidate';
  const fileName = `Apex_Transcript_${attempt.paperCode.replace(/\s+/g, '_')}_${student.replace(/\s+/g, '_')}_${Date.now()}.txt`;
  
  // Format human-readable transcript
  const transcriptContent = `========================================================================
APEX PAPERS - OFFICIAL GRADE 12 EXAMINATION PRACTICE TRANSCRIPT
========================================================================
Candidate Name     : ${student}
Student Code       : ${attempt.accessCode || 'N/A'}
School / Center    : ${attempt.clubName || 'Apex High School'}
Subject / Paper    : ${attempt.paperTitle} (${attempt.paperCode})
Paper Subtitle     : ${attempt.paperSubtitle}
Curriculum Stage   : Grade 12 National Senior Certificate (NSC) Prep
Exam Date          : ${dateFormatted}
Duration Elapsed   : ${attempt.timeElapsed ? `${Math.floor(attempt.timeElapsed / 60)}m ${attempt.timeElapsed % 60}s` : 'Standard Timer'}

------------------------------------------------------------------------
EXAM OUTCOME & GRADING
------------------------------------------------------------------------
Score Achieved     : ${attempt.score} / ${attempt.totalMarks} marks
Percentage         : ${attempt.percentage}%
Outcome Status     : ${attempt.passed ? 'PASSED (Achieved Standard ≥ 80%)' : 'REQUIRES REMEDIATION (< 80%)'}
Passing Mark Req   : ${attempt.passMark} / ${attempt.totalMarks} marks (80%)

------------------------------------------------------------------------
TOPIC & CATEGORY PERFORMANCE BREAKDOWN
------------------------------------------------------------------------
${
  attempt.categoryBreakdown
    ? Object.entries(attempt.categoryBreakdown)
        .map(([cat, stats]) => {
          const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
          return `* ${cat.padEnd(35)} : ${stats.correct}/${stats.total} (${pct}%) [${pct >= 80 ? 'MASTERY' : 'REVIEW'}]`;
        })
        .join('\n')
    : 'No granular breakdown recorded.'
}

------------------------------------------------------------------------
RECORD INTEGRITY & VERIFICATION
------------------------------------------------------------------------
Attempt ID         : ${attempt.id}
Archived Timestamp : ${new Date().toISOString()}
Storage Medium     : Google Drive Apex Papers Archive
Platform           : Apex Papers Examination Engine v2.0
========================================================================
`;

  return uploadDriveFile(accessToken, {
    name: fileName,
    mimeType: 'text/plain',
    content: transcriptContent,
    parentFolderId: folderId,
    description: `Official practice exam transcript for ${student} - ${attempt.paperTitle} (${attempt.paperCode})`,
  });
}

/**
 * Backup student study progress and attempt history to Google Drive as JSON
 */
export async function backupStudyProgressToDrive(
  accessToken: string,
  progressData: any,
  candidateName?: string
): Promise<DriveFileItem> {
  const folderId = await getOrCreateApexPapersFolder(accessToken);
  const student = candidateName || 'Candidate';
  const fileName = `Apex_Papers_Backup_${student.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;

  const jsonContent = JSON.stringify(
    {
      app: 'Apex Papers',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      studentName: student,
      data: progressData,
    },
    null,
    2
  );

  return uploadDriveFile(accessToken, {
    name: fileName,
    mimeType: 'application/json',
    content: jsonContent,
    parentFolderId: folderId,
    description: `Apex Papers study progress, attempt history, and custom questions backup for ${student}`,
  });
}
