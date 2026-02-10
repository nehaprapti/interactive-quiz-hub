import { useState, useCallback, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { quizzes } from "@/data/quizData";
import { useAuth } from "@/contexts/AuthContext";
import QuizQuestionComponent from "@/components/QuizQuestion";
import ProgressBar from "@/components/ProgressBar";
import ScoreBoard from "@/components/ScoreBoard";
import ParticleBackground from "@/components/ParticleBackground";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const quiz = useMemo(() => quizzes.find((q) => q.id === quizId), [quizId]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [started, setStarted] = useState(false);

  // Submit score to backend when quiz finishes
  useEffect(() => {
    const submitScore = async () => {
      if (isFinished && quiz && token) {
        try {
          const API_URL = import.meta.env.VITE_API_URL ||
            (import.meta.env.MODE === 'production' ? `${window.location.origin}/api` : 'http://localhost:3000/api');
          await fetch(`${API_URL}/quiz/submit-score`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              quizId: quiz.id,
              quizTitle: quiz.title,
              score,
              totalQuestions: quiz.questions.length,
              correctAnswers,
              maxStreak,
              totalTime
            })
          });
        } catch (error) {
          console.error('Failed to submit score:', error);
        }
      }
    };

    submitScore();
  }, [isFinished, quiz, token, score, correctAnswers, maxStreak, totalTime]);

  const handleAnswer = useCallback(
    (selectedIndex: number, timeLeft: number) => {
      if (!quiz) return;

      const question = quiz.questions[currentQuestion];
      const isCorrect = selectedIndex === question.correctAnswer;

      const timeUsed = question.timeLimit - timeLeft;
      setTotalTime((prev) => prev + timeUsed);

      if (isCorrect) {
        const timeBonus = Math.round(timeLeft * 5);
        const streakBonus = streak >= 2 ? Math.round(question.points * 0.2) : 0;
        setScore((prev) => prev + question.points + timeBonus + streakBonus);
        setCorrectAnswers((prev) => prev + 1);
        setStreak((prev) => {
          const newStreak = prev + 1;
          setMaxStreak((ms) => Math.max(ms, newStreak));
          return newStreak;
        });
      } else {
        setStreak(0);
      }

      if (currentQuestion + 1 >= quiz.questions.length) {
        setIsFinished(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    },
    [quiz, currentQuestion, streak]
  );

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Quiz not found</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl font-semibold font-display text-primary-foreground glow-primary"
            style={{ background: "var(--gradient-primary)" }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />

      {/* Header */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-display font-semibold text-foreground">{quiz.title}</span>
        </div>
        {!isFinished && started && (
          <div className="text-sm font-bold font-display text-primary">
            {score} pts
          </div>
        )}
        {!started && <div />}
      </nav>

      <div className="relative z-10 px-4 py-8 max-w-4xl mx-auto">
        {!started ? (
          /* Start Screen */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6"
              style={{ background: "var(--gradient-primary)", opacity: 0.9 }}
            >
              {quiz.icon}
            </div>
            <h1 className="text-3xl font-bold font-display text-foreground mb-3">
              {quiz.title}
            </h1>
            <p className="text-muted-foreground mb-8">{quiz.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-3 text-center">
                <p className="text-lg font-bold font-display text-foreground">{quiz.questionCount}</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="glass-card p-3 text-center">
                <p className="text-lg font-bold font-display text-foreground">{quiz.estimatedTime}</p>
                <p className="text-xs text-muted-foreground">Time</p>
              </div>
              <div className="glass-card p-3 text-center">
                <p className="text-lg font-bold font-display text-foreground">{quiz.difficulty}</p>
                <p className="text-xs text-muted-foreground">Level</p>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full px-8 py-4 rounded-xl font-semibold font-display text-lg text-primary-foreground transition-all hover:scale-105 glow-primary"
              style={{ background: "var(--gradient-primary)" }}
            >
              🚀 Start Quiz
            </button>
          </motion.div>
        ) : isFinished ? (
          <ScoreBoard
            score={score}
            totalQuestions={quiz.questions.length}
            correctAnswers={correctAnswers}
            maxStreak={maxStreak}
            totalTime={totalTime}
            quizTitle={quiz.title}
          />
        ) : (
          <div>
            <div className="mb-8 max-w-2xl mx-auto">
              <ProgressBar current={currentQuestion} total={quiz.questions.length} />
            </div>
            <QuizQuestionComponent
              question={quiz.questions[currentQuestion]}
              questionIndex={currentQuestion}
              totalQuestions={quiz.questions.length}
              streak={streak}
              onAnswer={handleAnswer}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
