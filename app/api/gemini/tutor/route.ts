import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { question, userAnswer, correctAnswer, explanation } = await req.json();

    const isHintRequest = !userAnswer || userAnswer === 'HINT_REQUEST' || userAnswer === 'Not answered yet';

    const prompt = isHintRequest
      ? `You are a supportive and expert tutor for South African Grade 12 National Senior Certificate (NSC) examinations.
The student is currently working on the following question and needs a helpful hint and step-by-step guidance without giving away the full answer immediately.

Question: "${question}"
Subject Context / Topic Guidelines: "${explanation || 'Standard DBE Examination'}"

Provide a structured, encouraging response with:
1. **Key Concept**: The core Grade 12 syllabus principle or formula to recall.
2. **First Step / Clue**: A helpful guiding question or hint on how to begin.
3. **Common Pitfall to Avoid**: What students frequently mistake in this type of question.
Keep it concise, friendly, and empowering.`
      : `You are an expert tutor for South African Grade 12 National Senior Certificate (NSC) examinations.
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

    const MODELS_TO_TRY = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let responseText: string | null = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });

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
        feedback: `### DBE Marking Guideline\n\n**Correct Solution**: ${correctAnswer}\n\n**Methodology**: ${explanation || 'Refer to official DBE curriculum guidelines.'}`,
        isFallback: true,
      });
    }

    return NextResponse.json({
      success: true,
      feedback: responseText,
    });
  } catch (error) {
    console.error('Tutor error:', error);
    return NextResponse.json({ error: 'Failed to get tutoring feedback.' }, { status: 500 });
  }
}
