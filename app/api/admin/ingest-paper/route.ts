import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build-admin',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are an expert South African educational data architect and OCR specialist. Your task is to process a Department of Basic Education (DBE) Grade 12 NSC past paper and its official marking guidelines (memo), extracting the content into a strict, structured JSON array.
EXTRACTION RULES:
 * Granularity: Treat every numbered sub-question (e.g., 1.1.1, 1.1.2) as a distinct object within the sub_questions array of its parent question document.
 * Layout Mapping: Intelligently assign the layout_type: text_split, ledger_table, media_split, calc_stepper, or essay_rubric.
 * Attachment Handling: If a question references an Annexure, Table, or text passage, extract that specific context into the attachments array. If it is a purely visual diagram, use the placeholder [REQUIRES_IMAGE_URL] in the content field.
 * Rubric Micro-Stepping (CRITICAL): Break the memo's solution down into sequential rubric steps, assigning the exact mark allocation (ticks) for each micro-step as shown in the memo.
 * Math & LaTeX: Convert all mathematical expressions, units, and formulas into standard LaTeX. Use $ for inline math and $$ for block equations.`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const paperFile = formData.get('paper') as File | null;
    const memoFile = formData.get('memo') as File | null;

    if (!paperFile) {
      return NextResponse.json({ error: 'Missing question paper file' }, { status: 400 });
    }

    const paperBuffer = Buffer.from(await paperFile.arrayBuffer());
    const parts: any[] = [
      { text: 'Process these DBE Grade 12 NSC past paper and marking memo files into a valid JSON array.' },
      { inlineData: { mimeType: paperFile.type || 'application/pdf', data: paperBuffer.toString('base64') } },
    ];

    if (memoFile) {
      const memoBuffer = Buffer.from(await memoFile.arrayBuffer());
      parts.push({
        inlineData: { mimeType: memoFile.type || 'application/pdf', data: memoBuffer.toString('base64') },
      });
    }

    const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    let responseText: string | null = null;
    let lastErr: any = null;

    for (const model of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [{ role: 'user', parts }],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
          },
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (e) {
        lastErr = e;
        console.warn(`Admin ingest model ${model} error:`, e);
      }
    }

    if (!responseText) {
      throw new Error(`AI extraction failed: ${lastErr?.message || String(lastErr)}`);
    }

    let cleaned = responseText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
    }

    const questionData = JSON.parse(cleaned);
    const documents = Array.isArray(questionData) ? questionData : [questionData];

    // Batch write to Firestore
    for (const docData of documents) {
      const docId = docData.id || `NSC_INGEST_${Date.now()}`;
      docData.id = docId;
      try {
        await setDoc(doc(db, 'questions', docId), docData, { merge: true });
      } catch (dbErr) {
        console.warn('Firestore setDoc warning:', dbErr);
      }
    }

    return NextResponse.json({ success: true, count: documents.length, data: documents });
  } catch (error: any) {
    console.error('Ingestion error:', error);
    return NextResponse.json({ error: error?.message || 'Ingestion failed' }, { status: 500 });
  }
}
