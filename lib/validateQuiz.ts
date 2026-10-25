export interface QuizOption {
  text: string;
}

export interface QuizItem {
  id: string;
  question: string;
  options: QuizOption[];
  correctIndex: number;
}

export function validateQuizData(data: any): QuizItem[] {
  if (!Array.isArray(data)) {
    console.warn("Quiz data is not an array:", data);
    return [];
  }

  return data.filter((item) => {
    if (
      typeof item.id !== 'string' ||
      typeof item.question !== 'string' ||
      !Array.isArray(item.options) ||
      item.options.length < 2 ||
      typeof item.correctIndex !== 'number' ||
      item.correctIndex < 0 ||
      item.correctIndex >= item.options.length
    ) {
      console.warn("Malformed quiz item detected and skipped:", item);
      return false;
    }
    return true;
  });
}
