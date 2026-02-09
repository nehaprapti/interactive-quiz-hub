import quizJsonData from '../../data/quiz.json';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  points: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionCount: number;
  estimatedTime: string;
  gradient: string;
  questions: QuizQuestion[];
}

// Transform the JSON data into our Quiz format
function transformQuizData(): Quiz[] {
  const quizData = quizJsonData.quiz;

  // Create a quiz for each round
  return quizData.rounds.map((round, roundIndex) => {
    // Transform questions from JSON format to app format
    const transformedQuestions: QuizQuestion[] = round.questions.map((q, index) => {
      // Convert options object {A: "...", B: "...", C: "...", D: "..."} to array
      const optionsArray = Object.values(q.options);

      // Find the correct answer index (convert letter to index: A=0, B=1, C=2, D=3)
      const correctAnswerIndex = q.correct_answer.charCodeAt(0) - 'A'.charCodeAt(0);

      return {
        id: index + 1,
        question: q.question,
        options: optionsArray,
        correctAnswer: correctAnswerIndex,
        timeLimit: 15, // Default time limit
        points: 100, // Default points
        explanation: undefined,
      };
    });

    // Determine difficulty based on round number
    const difficulties: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Hard"];
    const difficulty = difficulties[Math.min(roundIndex, 2)];

    // Determine gradient based on round index
    const gradients = ["primary", "secondary", "accent"];
    const gradient = gradients[roundIndex % 3];

    // Create icons for different rounds
    const icons = ["🤖", "🎓", "⚡"];
    const icon = icons[roundIndex % 3];

    // Calculate estimated time (1 question ≈ 30 seconds)
    const estimatedMinutes = Math.ceil(transformedQuestions.length * 0.5);

    return {
      id: `ai-quiz-round-${round.round_number}`,
      title: round.round_name,
      description: `${quizData.title} - ${round.round_name}`,
      icon: icon,
      category: "AI & Technology",
      difficulty: difficulty,
      questionCount: transformedQuestions.length,
      estimatedTime: `${estimatedMinutes} min`,
      gradient: gradient,
      questions: transformedQuestions,
    };
  });
}

export const quizzes: Quiz[] = transformQuizData();
