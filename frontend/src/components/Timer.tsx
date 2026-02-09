import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimerProps {
  timeLimit: number;
  isActive: boolean;
  onTimeUp: () => void;
  onChange?: (timeLeft: number) => void;
}

const Timer = ({ timeLimit, isActive, onTimeUp, onChange }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev <= 1 ? 0 : prev - 1;

        // Notify parent of time change
        if (onChange) {
          onChange(newTime);
        }

        if (newTime === 0) {
          clearInterval(interval);
          onTimeUp();
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp, onChange]);

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
          className={`absolute inset-0 flex items-center justify-center text-sm font-bold font-display ${isUrgent ? "text-destructive animate-timer-pulse" : "text-foreground"
            }`}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

export default Timer;
