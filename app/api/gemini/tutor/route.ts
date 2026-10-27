import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const { question, userAnswer, correctAnswer, explanation, userQuery } = await req.json();

    const isHintRequest = !userAnswer || userAnswer === 'HINT_REQUEST' || userAnswer === 'Not answered yet';

    // Build intelligent DBE curriculum fallback
    const fallbackGuidance = isHintRequest
      ? `### 💡 Grade 12 DBE Concept & Strategy\n\n**Core Principle**: Recall the standard National Senior Certificate (NSC) DBE definition and formula relevant to this topic.\n\n**First Step**: Identify the given values and required output. ${explanation ? `Guidance from DBE Memo: *${explanation}*` : 'Break down multi-step calculations into individual steps.'}\n\n**Common Pitfall**: Watch out for unit conversions, percentage steps, or missing sign conventions!`
      : `### 📝 Official DBE Marking Guidelines\n\n**Correct Answer**: **${correctAnswer}**\n\n**Curriculum Rationale & Marking Steps**:\n${explanation ? explanation : 'Award method marks (M) for correct substitution, accuracy marks (A) for correct intermediate values, and final consistency marks (CA).'}\n\n*Review the steps above carefully to ensure maximum marks under the official DBE rubric.*`;

    const ai = getAiClient();
    if (!ai) {
      // Return instant fallback when API key is not configured or in local offline mode
      return NextResponse.json({
        success: true,
        feedback: fallbackGuidance,
        isFallback: true,
      });
    }

    let prompt = '';

    if (userQuery && typeof userQuery === 'string' && userQuery.trim().length > 0) {
      prompt = `You are a supportive, expert Grade 12 tutor for the South African National Senior Certificate (NSC) Department of Basic Education (DBE) examinations.
The student has asked you a specific follow-up question regarding their current exam problem.

Question: "${question}"
Correct Answer: "${correctAnswer}"
DBE Marking Guidelines / Memorandum: "${explanation || ''}"
${userAnswer && userAnswer !== 'HINT_REQUEST' ? `Student's previous answer: "${userAnswer}"` : ''}

Student's Question to You: "${userQuery}"

Provide a direct, patient, encouraging, and crystal-clear step-by-step response based on official DBE syllabus standards. Use clean formatting with bold section headers or bullet points.`;
    } else if (isHintRequest) {
      prompt = `You are a supportive and expert tutor for South African Grade 12 National Senior Certificate (NSC) examinations.
The student is currently working on the following question and needs a helpful hint and step-by-step guidance without giving away the full answer immediately.

Question: "${question}"
Subject Context / Topic Guidelines: "${explanation || 'Standard DBE Examination'}"

Provide a structured, encouraging response with:
1. **Key Concept**: The core Grade 12 syllabus principle or formula to recall.
2. **First Step / Clue**: A helpful guiding question or hint on how to begin.
3. **Common Pitfall to Avoid**: What students frequently mistake in this type of question.
Keep it concise, friendly, and empowering.`;
    } else {
      prompt = `You are an expert tutor for South African Grade 12 National Senior Certificate (NSC) examinations.
A student answered a question incorrectly and needs step-by-step guidance based on the official Department of Basic Education (DBE) memorandum.

Question: "${question}"
Student's Answer: "${userAnswer}"
Correct Answer: "${correctAnswer}"
Official DBE Marking Guidelines / Memorandum: "${explanation || ''}"

Please provide clear, encouraging step-by-step feedback:
1. **Where the Error Happened**: Explain kindly why the student's answer ("${userAnswer}") does not match the question requirements.
2. **DBE Syllabus Principle**: The key definition, formula, or curriculum rule being tested.
3. **Step-by-Step Solution**: Show the correct methodology step-by-step according to official DBE marking rubric codes (e.g., method marks M, accuracy marks A, consistency CA).
Keep the tone warm, clear, professional, and accessible to Grade 12 learners.`;
    }

    const MODELS_TO_TRY = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let responseText: string | null = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        // 10-second timeout per model attempt to keep the tutor responsive
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Tutor model timeout')), 10000)
        );

        const callPromise = ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });

        const response = await Promise.race([callPromise, timeoutPromise]);

        if (response.text) {
          responseText = response.text;
          break; // Success!
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        const isQuota = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED');
        if (isQuota) {
          console.info(`Model ${modelName} reached rate limit, attempting secondary model...`);
        } else {
          console.warn(`Model ${modelName} error:`, errMsg.slice(0, 100));
        }
      }
    }

    if (!responseText) {
      return NextResponse.json({
        success: true,
        feedback: fallbackGuidance,
        isFallback: true,
      });
    }

    return NextResponse.json({
      success: true,
      feedback: responseText,
    });
  } catch (error) {
    console.error('Tutor error:', error);
    // Never fail with 500 so the UI always has helpful guidance
    return NextResponse.json({
      success: true,
      feedback: `### 💡 Grade 12 DBE Guidance\n\n**Official DBE Memorandum**: Refer to the step-by-step curriculum requirements. Make sure to state all relevant formulas and intermediate steps for full marks.`,
      isFallback: true,
    });
  }
}

