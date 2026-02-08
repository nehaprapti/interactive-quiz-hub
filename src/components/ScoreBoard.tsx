import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Flame, Clock, ArrowRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

interface ScoreBoardProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  maxStreak: number;
  totalTime: number;
  quizTitle: string;
}

const ScoreBoard = ({
  score,
  totalQuestions,
  correctAnswers,
  maxStreak,
  totalTime,
  quizTitle,
}: ScoreBoardProps) => {
  const navigate = useNavigate();
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const grade = useMemo(() => {
    if (percentage >= 90) return { label: "Legendary!", emoji: "🏆", color: "text-warning" };
    if (percentage >= 70) return { label: "Great Job!", emoji: "🌟", color: "text-primary" };
    if (percentage >= 50) return { label: "Good Effort!", emoji: "👍", color: "text-secondary" };
    return { label: "Keep Trying!", emoji: "💪", color: "text-muted-foreground" };
  }, [percentage]);

  useEffect(() => {
    if (percentage >= 70) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#f97316", "#14b8a6", "#8b5cf6"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#f97316", "#14b8a6", "#8b5cf6"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [percentage]);

  const stats = [
    { icon: Target, label: "Accuracy", value: `${percentage}%`, color: "text-primary" },
    { icon: Flame, label: "Max Streak", value: `${maxStreak}x`, color: "text-warning" },
    { icon: Clock, label: "Total Time", value: `${totalTime}s`, color: "text-secondary" },
    { icon: Trophy, label: "Score", value: `${score}`, color: "text-accent" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto text-center"
    >
      {/* Grade */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="mb-6"
      >
        <span className="text-6xl">{grade.emoji}</span>
      </motion.div>

      <motion.h1
        className={`text-3xl md:text-4xl font-bold font-display mb-2 ${grade.color}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {grade.label}
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {quizTitle} — {correctAnswers}/{totalQuestions} correct
      </motion.p>

      {/* Score Ring */}
      <motion.div
        className="relative w-40 h-40 mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" className="stroke-muted" strokeWidth="8" />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            className="stroke-primary"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={439.8}
            initial={{ strokeDashoffset: 439.8 }}
            animate={{ strokeDashoffset: 439.8 - (439.8 * percentage) / 100 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold font-display text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground">points</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="glass-card p-4"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
            <p className="text-lg font-bold font-display text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold font-display border border-border/50 bg-muted/50 text-foreground transition-all hover:bg-muted"
        >
          <RotateCcw className="w-4 h-4" />
          Retry Quiz
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold font-display text-primary-foreground transition-all hover:scale-105 glow-primary"
          style={{ background: "var(--gradient-primary)" }}
        >
          More Quizzes
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ScoreBoard;
