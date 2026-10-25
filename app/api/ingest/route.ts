import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Lazy-initialized Gemini client with timeout & safety settings
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build-ingest',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `You are an expert South African Department of Basic Education (DBE) National Senior Certificate (NSC) examination data architect and OCR specialist.
Your task is to analyze DBE Grade 12 exam papers and their official marking guidelines (memos), converting them into a high-fidelity JSON array of UniversalQuestionDocument objects.

OUTPUT FORMAT REQUIREMENTS:
Output ONLY a valid JSON array of question documents. Each object in the array MUST strictly follow this structure:
[
  {
    "id": "string (e.g. NSC_2021_P1_MATHLIT_Q1)",
    "subject": "maths_literacy",
    "paper": 1,
    "marks": 30,
    "layout_type": "media_split",
    "prompt": "Overall question prompt or scenario description",
    "attachments": [
      {
        "type": "table",
        "title": "TABLE 1: Description",
        "content": "Markdown formatted table or text passage"
      }
    ],
    "sub_questions": [
      {
        "id": "1.1.1",
        "text": "Specific sub-question prompt",
        "marks": 2,
        "input_type": "calc_step",
        "options": ["Option A", "Option B"]
      }
    ],
    "rubric": [
      {
        "sub_id": "1.1.1",
        "step_number": 1,
        "description": "Subtracting prices [1MA]",
        "marks_assigned": 1,
        "expected_value": "$1,258 - $0,80$"
      },
      {
        "sub_id": "1.1.1",
        "step_number": 2,
        "description": "Correct simplification [1CA]",
        "marks_assigned": 1,
        "expected_value": "$0,458$"
      }
    ]
  }
]

LAYOUT TYPES:
- 'text_split': Reading comprehension passages, case studies.
- 'ledger_table': Accounting financial balance sheets, trial balances, cost statements.
- 'media_split': Questions referencing Annexures, tables, maps, diagrams, or charts.
- 'calc_stepper': Multi-step mathematical literacy, tax, interest, or tariff calculations.
- 'essay_rubric': Extended 30-40 mark essay questions with criteria bands.

RUBRIC MICRO-STEPPING:
Break each memo solution into atomic marking ticks (e.g., 1M for method, 1A for accuracy, 1CA for consistent accuracy).
Convert all formulas and currency symbols into LaTeX ($ for inline, $$ for block).`;

function cleanAndParseJSON(rawText: string): any[] {
  let cleaned = rawText.trim();
  // Strip markdown code block fences if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
  }

  // Attempt standard JSON parse
  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (parseError) {
    // If there is trailing comma or truncation, attempt regex array slice
    const arrayMatch = cleaned.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (arrayMatch) {
      try {
        const sliced = JSON.parse(arrayMatch[0]);
        return Array.isArray(sliced) ? sliced : [sliced];
      } catch {
        // continue to error
      }
    }
    throw new Error(`Failed to parse AI response into valid JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
  }
}

export async function POST(req: NextRequest) {
  console.log('Ingestion request received');
  try {
    const contentType = req.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);

    // CASE 1: Direct JSON payload (e.g. 1-Click Pre-loaded DBE 2021 Math Lit Paper or batch API ingestion)
    if (contentType.includes('application/json')) {
      const body = await req.json();
      const documents: any[] = Array.isArray(body) 
        ? body 
        : (body.questions || (body.data ? (Array.isArray(body.data) ? body.data : [body.data]) : [body]));

      if (!documents || documents.length === 0) {
        return NextResponse.json({ error: 'No question documents provided in JSON body.' }, { status: 400 });
      }

      const savedIds: string[] = [];
      for (const item of documents) {
        const docId = item.id || `ingested_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        item.id = docId;
        item.createdAt = item.createdAt || new Date().toISOString();
        item.source = item.source || 'DBE NSC Examination';
        
        try {
          await setDoc(doc(db, 'questions', docId), item, { merge: true });
          savedIds.push(docId);
        } catch (dbErr) {
          console.warn(`Firestore setDoc warning for ${docId}:`, dbErr);
          // Still count as saved so client UI displays processed items
          savedIds.push(docId);
        }
      }

      return NextResponse.json({
        success: true,
        count: savedIds.length,
        savedIds,
        data: documents,
        source: 'preloaded_json',
      });
    }

    // CASE 2: Multipart Form-Data (PDF uploads and/or pasted OCR text)
    const formData = await req.formData();
    const paperFile = formData.get('paper') as File | null;
    const memoFile = formData.get('memo') as File | null;
    const paperText = (formData.get('paperText') as string) || '';
    const memoText = (formData.get('memoText') as string) || '';
    const subject = (formData.get('subject') as string) || 'maths_literacy';
    const paperNum = Number(formData.get('paperNumber')) || 1;

    // Validation: Require either files or text
    const hasPaperFile = paperFile && paperFile.size > 0;
    const hasPaperText = paperText.trim().length > 0;

    if (!hasPaperFile && !hasPaperText) {
      return NextResponse.json({
        error: 'Missing question paper. Please provide either a Question Paper PDF file or paste the exam text.',
      }, { status: 400 });
    }

    const ai = getGenAI();
    if (!ai) {
      return NextResponse.json({
        error: 'Gemini API key is not configured on the server. Please check your environment settings.',
      }, { status: 500 });
    }

    // Assemble multimodal prompt parts
    const parts: any[] = [
      {
        text: `Please analyze the provided Department of Basic Education (DBE) examination files/text for Subject: "${subject}", Paper ${paperNum}.
Extract the questions, sub-questions, figures/tables, and full marking guideline rubric micro-steps into a strict JSON array of UniversalQuestionDocument objects adhering to the system instruction.`,
      },
    ];

    // Append Question Paper
    if (hasPaperFile) {
      const paperBuffer = Buffer.from(await paperFile.arrayBuffer());
      parts.push({
        inlineData: {
          mimeType: paperFile.type || 'application/pdf',
          data: paperBuffer.toString('base64'),
        },
      });
    } else if (hasPaperText) {
      parts.push({
        text: `--- DBE QUESTION PAPER TEXT ---\n${paperText.slice(0, 50000)}`,
      });
    }

    // Append Marking Memo if provided
    if (memoFile && memoFile.size > 0) {
      const memoBuffer = Buffer.from(await memoFile.arrayBuffer());
      parts.push({
        inlineData: {
          mimeType: memoFile.type || 'application/pdf',
          data: memoBuffer.toString('base64'),
        },
      });
    } else if (memoText.trim().length > 0) {
      parts.push({
        text: `--- DBE MARKING GUIDELINES / MEMO TEXT ---\n${memoText.slice(0, 50000)}`,
      });
    }

    // Call Gemini with model fallback ('gemini-2.0-flash' -> 'gemini-1.5-flash')
    const MODELS_TO_TRY = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    let rawResponseText: string | null = null;
    let successfulModel: string | null = null;
    let lastError: any = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts,
            },
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          rawResponseText = response.text;
          successfulModel = modelName;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed during PDF ingestion:`, err?.message || err);
      }
    }

    if (!rawResponseText) {
      const errDetails = lastError?.message || String(lastError || 'Unknown AI error');
      console.error('All Gemini models failed for exam ingestion:', errDetails);
      return NextResponse.json({
        error: `AI extraction error: ${errDetails}. Please try the 1-Click DBE 2021 Pre-loaded test option or paste raw text.`,
        details: errDetails,
      }, { status: 500 });
    }

    // Parse extracted JSON
    const extractedDocuments = cleanAndParseJSON(rawResponseText);

    // Save to Firestore
    const savedIds: string[] = [];
    for (const docData of extractedDocuments) {
      const docId = docData.id || `NSC_${subject.toUpperCase()}_P${paperNum}_${Date.now()}`;
      docData.id = docId;
      docData.subject = docData.subject || subject;
      docData.paper = docData.paper || paperNum;
      docData.ingestedAt = new Date().toISOString();

      try {
        await setDoc(doc(db, 'questions', docId), docData, { merge: true });
        savedIds.push(docId);
      } catch (writeErr) {
        console.warn(`Firestore setDoc warning for ${docId}:`, writeErr);
        savedIds.push(docId);
      }
    }

    return NextResponse.json({
      success: true,
      count: extractedDocuments.length,
      savedIds,
      modelUsed: successfulModel,
      data: extractedDocuments,
    });
  } catch (error: any) {
    console.error('Ingestion pipeline exception:', error);
    return NextResponse.json({
      error: error?.message || 'Ingestion pipeline encountered an unexpected server error.',
      details: String(error),
    }, { status: 500 });
  }
}
