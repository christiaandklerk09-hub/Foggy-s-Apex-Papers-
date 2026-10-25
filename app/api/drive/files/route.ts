import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ error: 'Missing Authorization Bearer token' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || "trashed = false";
    const pageSize = searchParams.get('pageSize') || '25';
    const pageToken = searchParams.get('pageToken') || '';

    const params = new URLSearchParams({
      q: query,
      pageSize,
      fields: 'nextPageToken, files(id, name, mimeType, size, webViewLink, webContentLink, createdTime, modifiedTime, parents, description)',
      orderBy: 'modifiedTime desc',
    });

    if (pageToken) {
      params.set('pageToken', pageToken);
    }

    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
      headers: { Authorization: token },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Google Drive files:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
