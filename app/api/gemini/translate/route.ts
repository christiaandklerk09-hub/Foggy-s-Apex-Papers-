import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { generateFallbackTranslation } from '@/lib/translate-fallback';

// Lazy-initialized server-side Gemini client
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
  let targetLanguage = 'English';
  let questionText = '';
  let options: Array<{ letter: string; text: string }> = [];
  let explanation: string | undefined = undefined;

  try {
    const body = await req.json();
    targetLanguage = body.targetLanguage;
    questionText = body.questionText;
    options = body.options;
    explanation = body.explanation;

    if (!targetLanguage || !questionText || !Array.isArray(options)) {
      return NextResponse.json(
        { error: 'Missing targetLanguage, questionText, or options array.' },
        { status: 400 }
      );
    }

    const ai = getAiClient();
    if (!ai) {
      // Fallback translation if API key is not yet set
      const fallback = generateFallbackTranslation(targetLanguage, questionText, options, explanation);
      return NextResponse.json({
        success: true,
        targetLanguage,
        translatedQuestion: fallback.translatedQuestion,
        translatedOptions: fallback.translatedOptions,
        translatedExplanation: fallback.translatedExplanation,
        isFallback: true,
      });
    }

    const prompt = `You are a certified translator for Apex Papers Operations and water safety/first-aid examinations.
Translate the following multiple-choice lifeguard certification exam question and its option answers into ${targetLanguage}.
Keep rescue and safety terms accurate and natural in ${targetLanguage}.
Retain all option letters (A, B, C, D).

Original Question:
"${questionText}"

Options to translate:
${options.map((opt) => `${opt.letter}: ${opt.text}`).join('\n')}

${explanation ? `Explanation: "${explanation}"` : ''}
`;

    // Prioritize high-throughput flash models
    const MODELS_TO_TRY = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let lastError: unknown = null;
    let responseText: string | null = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                translatedQuestion: {
                  type: Type.STRING,
                  description: 'The translated question text',
                },
                translatedOptions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      letter: { type: Type.STRING, description: 'Option letter A, B, C, or D' },
                      text: { type: Type.STRING, description: 'The translated text for this option' },
                    },
                    required: ['letter', 'text'],
                  },
                  description: 'The translated options',
                },
                translatedExplanation: {
                  type: Type.STRING,
                  description: 'Translated explanation if provided',
                },
              },
              required: ['translatedQuestion', 'translatedOptions'],
            },
          },
        });

        if (response.text) {
          responseText = response.text;
          break; // Success!
        }
      } catch (err: unknown) {
        lastError = err;
        // Don't flood console with raw stack traces for expected rate-limit fallbacks
        const errMsg = err instanceof Error ? err.message : String(err);
        const isQuota = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('Quota exceeded');
        if (isQuota) {
          console.info(`Model ${modelName} reached rate limit, attempting secondary model...`);
        } else {
          console.warn(`Model ${modelName} error:`, errMsg.slice(0, 120));
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    if (!responseText) {
      // Graceful fallback when free tier rate limit is reached
      const fallback = generateFallbackTranslation(targetLanguage, questionText, options, explanation);
      return NextResponse.json({
        success: true,
        targetLanguage,
        translatedQuestion: fallback.translatedQuestion,
        translatedOptions: fallback.translatedOptions,
        translatedExplanation: fallback.translatedExplanation,
        isFallback: true,
      });
    }

    const parsed = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      targetLanguage,
      translatedQuestion: parsed.translatedQuestion,
      translatedOptions: parsed.translatedOptions,
      translatedExplanation: parsed.translatedExplanation || '',
    });
  } catch (error: unknown) {
    console.error('Translation error in /api/gemini/translate:', error);
    // Even on uncaught errors, provide fallback translation instead of 500 failure
    if (targetLanguage && questionText && Array.isArray(options)) {
      const fallback = generateFallbackTranslation(targetLanguage, questionText, options, explanation);
      return NextResponse.json({
        success: true,
        targetLanguage,
        translatedQuestion: fallback.translatedQuestion,
        translatedOptions: fallback.translatedOptions,
        translatedExplanation: fallback.translatedExplanation,
        isFallback: true,
      });
    }

    return NextResponse.json(
      { error: 'Translation service is temporarily busy. Please try again shortly.' },
      { status: 500 }
    );
  }
}

