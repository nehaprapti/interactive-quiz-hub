import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import type { QuizQuestion as QuizQuestionType } from "@/data/quizData";
import Timer from "./Timer";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
  totalQuestions: number;
  streak: number;
  onAnswer: (selectedIndex: number, timeLeft: number) => void;
}

const optionLabels = ["A", "B", "C", "D"];
const optionGradients = [
  "var(--gradient-primary)",
  "var(--gradient-secondary)",
  "var(--gradient-accent)",
  "linear-gradient(135deg, hsl(45 95% 55%) 0%, hsl(35 90% 50%) 100%)",
];

const QuizQuestionComponent = ({
  question,
  questionIndex,
  streak,
  onAnswer,
}: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(question.timeLimit);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setShowResult(true);
    setTimerActive(false);

    setTimeout(() => {
      onAnswer(index, currentTimeLeft);
      setSelected(null);
      setShowResult(false);
      setTimerActive(true);
    }, 1500);
  };

  const handleTimeUp = useCallback(() => {
    if (selected !== null) return;
    setTimerActive(false);
    setSelected(-1);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(-1, 0);
      setSelected(null);
      setShowResult(false);
      setTimerActive(true);
    }, 1500);
  }, [selected, onAnswer]);

  const getOptionClass = (index: number) => {
    if (!showResult) {
      return selected === index ? "selected" : "";
    }
    if (index === question.correctAnswer) return "correct";
    if (index === selected && index !== question.correctAnswer) return "wrong";
    return "opacity-50";
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id + "-" + questionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Header with timer and streak */}
        <div className="flex items-center justify-between mb-6">
          <Timer
            timeLimit={question.timeLimit}
            isActive={timerActive}
            onTimeUp={handleTimeUp}
            onChange={setCurrentTimeLeft}
          />

          <div className="flex items-center gap-3">
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/30"
              >
                <Flame className="w-4 h-4 text-warning" />
                <span className="text-sm font-bold text-warning">{streak}x</span>
              </motion.div>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">{question.points} pts</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          className="glass-card p-6 md:p-8 mb-6"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-bold font-display text-foreground text-center leading-relaxed">
            {question.question}
          </h2>
        </motion.div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className={`quiz-option text-left flex items-center gap-3 ${getOptionClass(index)}`}
              onClick={() => handleSelect(index)}
              disabled={selected !== null}
              whileTap={selected === null ? { scale: 0.97 } : {}}
            >
              <span
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{
                  background: optionGradients[index],
                  color: "white",
                }}
              >
                {optionLabels[index]}
              </span>
              <span className="text-sm md:text-base font-medium">{option}</span>
            </motion.button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showResult && question.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/50"
            >
              <p className="text-sm text-muted-foreground">
                💡 {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizQuestionComponent;
