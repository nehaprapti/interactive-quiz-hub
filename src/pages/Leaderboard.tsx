import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Crown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

interface LeaderboardEntry {
  username: string;
  fullName: string;
  quizTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  maxStreak: number;
  accuracy: number;
  completedAt: string;
}

const rankIcons: Record<number, JSX.Element> = {
  1: <Crown className="w-5 h-5 text-warning" />,
  2: <Medal className="w-5 h-5 text-muted-foreground" />,
  3: <Medal className="w-5 h-5 text-primary" />,
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await fetch(`${API_URL}/api/quiz/leaderboard`);
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);
  const sortedTopThree = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

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
          <span className="text-sm font-display font-semibold text-foreground">QuizArena</span>
        </div>
        <div />
      </nav>

      <div className="relative z-10 px-4 py-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "var(--gradient-secondary)" }}
          >
            <Trophy className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Top scores from all quizzes</p>
        </motion.div>

        {leaderboard.length === 0 ? (
          <div className="text-center glass-card p-8">
            <p className="text-muted-foreground">No scores yet. Be the first to complete a quiz!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length >= 3 && (
              <div className="flex items-end justify-center gap-3 mb-10">
                {sortedTopThree.map((player, idx) => {
                  if (!player) return null;
                  const rank = leaderboard.indexOf(player) + 1;
                  const isFirst = rank === 1;
                  return (
                    <motion.div
                      key={rank}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className={`glass-card p-4 text-center ${isFirst ? "pb-8" : "pb-6"}`}
                      style={{ width: isFirst ? 140 : 120 }}
                    >
                      <div className="text-3xl mb-2">
                        {rank === 1 ? "🏆" : rank === 2 ? "🥈" : "🥉"}
                      </div>
                      {rankIcons[rank]}
                      <p className="text-sm font-bold font-display text-foreground mt-1 truncate">
                        {player.fullName}
                      </p>
                      <p className="text-lg font-bold font-display gradient-text">{player.score}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{player.quizTitle}</p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Full List */}
            <div className="space-y-2">
              {leaderboard.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="glass-card flex items-center gap-4 p-4 hover:border-primary/30 transition-colors"
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-display ${i + 1 <= 3
                      ? "text-primary-foreground"
                      : "text-muted-foreground bg-muted"
                      }`}
                    style={
                      i + 1 <= 3
                        ? { background: "var(--gradient-primary)" }
                        : undefined
                    }
                  >
                    {i + 1}
                  </span>

                  <span className="text-xl">
                    {i === 0 ? "🏆" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🎯"}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{entry.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {entry.quizTitle} • {entry.correctAnswers}/{entry.totalQuestions} • {entry.maxStreak}x streak
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold font-display text-primary">{entry.score}</p>
                    <p className="text-xs text-muted-foreground">{entry.accuracy}%</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
