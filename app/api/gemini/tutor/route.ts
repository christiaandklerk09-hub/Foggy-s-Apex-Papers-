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

    if (!question || !userAnswer || !correctAnswer) {
      return NextResponse.json({ error: 'Missing required information.' }, { status: 400 });
    }

    const prompt = `You are a supportive and expert tutor for South African Grade 12 National Senior Certificate (NSC) examinations.
The student just answered a question incorrectly or needs guidance.

Question: "${question}"
Student's Answer: "${userAnswer}"
Correct Answer: "${correctAnswer}"
Official DBE Marking Guidelines / Explanation: "${explanation}"

Please explain why the student's answer was incorrect in a kind, helpful way, and guide them on the correct methodology and concepts based on the official DBE memorandum. Keep it concise, professional, and encouraging.`;

    const MODELS_TO_TRY = ['gemini-2.0-flash', 'gemini-1.5-flash'];
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
        feedback: `It looks like I'm having trouble connecting right now, but here is a quick note: The correct answer is "${correctAnswer}". ${explanation}`,
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
