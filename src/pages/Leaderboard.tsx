import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Crown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

const leaderboardData = [
  { rank: 1, name: "Alex Chen", score: 4850, quizzes: 12, streak: 8, avatar: "🦊" },
  { rank: 2, name: "Sarah Kim", score: 4200, quizzes: 10, streak: 6, avatar: "🐱" },
  { rank: 3, name: "Mike Ross", score: 3900, quizzes: 11, streak: 5, avatar: "🐺" },
  { rank: 4, name: "Emma Davis", score: 3650, quizzes: 9, streak: 4, avatar: "🦋" },
  { rank: 5, name: "James Lee", score: 3400, quizzes: 8, streak: 7, avatar: "🦅" },
  { rank: 6, name: "Lisa Wang", score: 3100, quizzes: 7, streak: 3, avatar: "🐬" },
  { rank: 7, name: "David Park", score: 2800, quizzes: 8, streak: 4, avatar: "🦁" },
  { rank: 8, name: "Nina Patel", score: 2500, quizzes: 6, streak: 3, avatar: "🦄" },
];

const rankIcons: Record<number, JSX.Element> = {
  1: <Crown className="w-5 h-5 text-warning" />,
  2: <Medal className="w-5 h-5 text-muted-foreground" />,
  3: <Medal className="w-5 h-5 text-primary" />,
};

const Leaderboard = () => {
  const navigate = useNavigate();

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
          <p className="text-muted-foreground">Top performers this week</p>
        </motion.div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-3 mb-10">
          {[1, 0, 2].map((idx) => {
            const player = leaderboardData[idx];
            const isFirst = player.rank === 1;
            return (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`glass-card p-4 text-center ${isFirst ? "pb-8" : "pb-6"}`}
                style={{ width: isFirst ? 140 : 120 }}
              >
                <div className="text-3xl mb-2">{player.avatar}</div>
                {rankIcons[player.rank]}
                <p className="text-sm font-bold font-display text-foreground mt-1 truncate">{player.name}</p>
                <p className="text-lg font-bold font-display gradient-text">{player.score}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </motion.div>
            );
          })}
        </div>

        {/* Full List */}
        <div className="space-y-2">
          {leaderboardData.map((player, i) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="glass-card flex items-center gap-4 p-4 hover:border-primary/30 transition-colors"
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-display ${
                  player.rank <= 3
                    ? "text-primary-foreground"
                    : "text-muted-foreground bg-muted"
                }`}
                style={
                  player.rank <= 3
                    ? { background: "var(--gradient-primary)" }
                    : undefined
                }
              >
                {player.rank}
              </span>

              <span className="text-xl">{player.avatar}</span>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.quizzes} quizzes • {player.streak}x streak</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold font-display text-primary">{player.score}</p>
                <p className="text-xs text-muted-foreground">pts</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
