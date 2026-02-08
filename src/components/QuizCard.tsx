import { motion } from "framer-motion";
import { Clock, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Quiz } from "@/data/quizData";

interface QuizCardProps {
  quiz: Quiz;
  index: number;
}

const difficultyColors = {
  Easy: "text-success bg-success/10 border-success/30",
  Medium: "text-warning bg-warning/10 border-warning/30",
  Hard: "text-destructive bg-destructive/10 border-destructive/30",
};

const gradientStyles: Record<string, string> = {
  primary: "var(--gradient-primary)",
  secondary: "var(--gradient-secondary)",
  accent: "var(--gradient-accent)",
};

const QuizCard = ({ quiz, index }: QuizCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass-card group cursor-pointer overflow-hidden"
      onClick={() => navigate(`/quiz/${quiz.id}`)}
    >
      {/* Top gradient bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: gradientStyles[quiz.gradient] || gradientStyles.primary }}
      />

      <div className="p-6">
        {/* Icon and Category */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: `${gradientStyles[quiz.gradient] || gradientStyles.primary}`,
              opacity: 0.9,
            }}
          >
            {quiz.icon}
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              difficultyColors[quiz.difficulty]
            }`}
          >
            {quiz.difficulty}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors">
          {quiz.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{quiz.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="w-3.5 h-3.5" />
            <span>{quiz.questionCount} questions</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{quiz.estimatedTime}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Start Quiz
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard;
