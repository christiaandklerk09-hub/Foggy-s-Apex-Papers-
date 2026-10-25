import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { studentWorking, questionData } = await req.json();

    if (!studentWorking || !questionData) {
      return Response.json(
        { error: 'Missing studentWorking or questionData' },
        { status: 400 }
      );
    }

    const questionText = questionData.text || questionData.question || 'Mathematical question';
    const correctAnswer = String(questionData.correctAnswer || '').trim();
    const explanation = String(questionData.explanation || '').trim();
    
    // Extract acceptable answers from steps if available
    const acceptableAnswers: string[] = [];
    if (Array.isArray(questionData.steps)) {
      questionData.steps.forEach((step: any) => {
        if (step.expectedAnswer) acceptableAnswers.push(String(step.expectedAnswer));
        if (Array.isArray(step.acceptableAnswers)) {
          step.acceptableAnswers.forEach((ans: any) => acceptableAnswers.push(String(ans)));
        }
      });
    }
    if (correctAnswer) acceptableAnswers.push(correctAnswer);

    // Call Gemini with strict marking instructions
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are a strict official South African Department of Basic Education (DBE) National Senior Certificate (NSC) Mathematical Literacy examiner.

QUESTION:
${questionText}

OFFICIAL MEMORANDUM CORRECT ANSWER:
${correctAnswer}

ACCEPTED VARIATIONS:
${acceptableAnswers.join(', ') || correctAnswer}

OFFICIAL EXPLANATION & METHOD:
${explanation}

STUDENT SUBMISSION:
"${studentWorking}"

STRICT MARKING RULES:
1. "final_answer_correct": Set to TRUE ONLY IF the student's calculated numerical answer or stated value matches the official memorandum answer or one of the acceptable variations.
2. If the student entered random words, arbitrary numbers, incorrect calculations, or incomplete thoughts, "final_answer_correct" MUST BE FALSE.
3. "formula_correct": Set to TRUE ONLY IF the student wrote a valid mathematical formula or method step appropriate for this specific question.
4. "marks_awarded": 0 if completely wrong. 1 mark if method is correct but calculation error. Total marks (usually 2) ONLY if final answer is correct.
5. "feedback": A concise, constructive 1-sentence guidance message explaining the error or confirming correctness.

Respond ONLY with valid JSON in this schema:
{
  "formula_correct": boolean,
  "final_answer_correct": boolean,
  "feedback": "string",
  "marks_awarded": number
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        const parsed = JSON.parse(response.text || '{}');
        return Response.json({
          formula_correct: Boolean(parsed.formula_correct),
          final_answer_correct: Boolean(parsed.final_answer_correct),
          feedback: parsed.feedback || (parsed.final_answer_correct ? 'Correct answer!' : 'Incorrect answer. Check your calculation.'),
          marks_awarded: typeof parsed.marks_awarded === 'number' ? parsed.marks_awarded : (parsed.final_answer_correct ? 2 : 0)
        });
      } catch (aiErr) {
        console.warn('Gemini evaluation API error, using strict deterministic validator:', aiErr);
      }
    }

    // STRICT DETERMINISTIC VALIDATION FALLBACK
    // Strip units, currency symbols, and whitespace
    const cleanStudent = studentWorking
      .toLowerCase()
      .replace(/[r$€£]/g, '')
      .replace(/\s+/g, '')
      .replace(/,/g, '.');

    // Extract numbers from student working
    const studentNumbers = cleanStudent.match(/-?\d+(?:\.\d+)?/g)?.map(Number) || [];
    const lastStudentNum = studentNumbers.length > 0 ? studentNumbers[studentNumbers.length - 1] : null;

    let isMatched = false;

    // Check against acceptable answers specifically
    for (const acc of acceptableAnswers) {
      const cleanAcc = String(acc).toLowerCase().replace(/[r$€£]/g, '').replace(/\s+/g, '').replace(/,/g, '.');
      
      // Text equality check (e.g. "Electricity", "Limpopo")
      if (cleanStudent.includes(cleanAcc) || cleanAcc.includes(cleanStudent)) {
        if (cleanStudent.length >= 3 && cleanAcc.length >= 3) {
          isMatched = true;
          break;
        }
      }

      // Numeric check
      const accNum = parseFloat(cleanAcc.match(/-?\d+(?:\.\d+)?/)?.[0] || '');
      if (!isNaN(accNum) && lastStudentNum !== null) {
        if (Math.abs(lastStudentNum - accNum) < 0.05) {
          isMatched = true;
          break;
        }
      }
    }

    // Has method step
    const hasMethod = (studentNumbers.length >= 2) || /[+\-*\/×÷=]/.test(studentWorking);

    return Response.json({
      formula_correct: hasMethod && isMatched,
      final_answer_correct: isMatched,
      feedback: isMatched
        ? 'Correct! Your answer matches the official DBE memorandum.'
        : 'Incorrect. Please check your steps or consult the AI Tutor.',
      marks_awarded: isMatched ? 2 : (hasMethod ? 1 : 0)
    });
  } catch (error: any) {
    console.error('Fatal evaluation route error:', error);
    return Response.json({
      formula_correct: false,
      final_answer_correct: false,
      feedback: 'Could not evaluate answer. Please try again.',
      marks_awarded: 0
    });
  }
}
