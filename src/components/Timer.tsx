import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimerProps {
  timeLimit: number;
  isActive: boolean;
  onTimeUp: () => void;
}

const Timer = ({ timeLimit, isActive, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const progress = (timeLeft / timeLimit) * 100;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="flex items-center gap-3">
      {/* Circular timer */}
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            className="stroke-muted"
            strokeWidth="3"
          />
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            className={isUrgent ? "stroke-destructive" : "stroke-primary"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={150.8}
            strokeDashoffset={150.8 - (150.8 * progress) / 100}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-sm font-bold font-display ${
            isUrgent ? "text-destructive animate-timer-pulse" : "text-foreground"
          }`}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

export default Timer;
