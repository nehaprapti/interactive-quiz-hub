import { motion } from "framer-motion";
import { Zap, Users, Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Interactive Quizzes</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Challenge Your
          <br />
          <span className="gradient-text">Knowledge</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Dive into exciting quizzes with real-time scoring, streak bonuses, and
          interactive challenges. Compete, learn, and have fun!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => {
              document.getElementById("quizzes")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold font-display text-primary-foreground transition-all duration-300 hover:scale-105 glow-primary"
            style={{ background: "var(--gradient-primary)" }}
          >
            Start Playing
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold font-display border border-border/50 bg-muted/50 text-foreground transition-all duration-300 hover:border-secondary/50 hover:bg-muted"
          >
            <Trophy className="w-5 h-5 text-secondary" />
            Leaderboard
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: Users, label: "Players", value: "2.4K+" },
            { icon: Zap, label: "Questions", value: "500+" },
            { icon: Trophy, label: "Quizzes", value: "50+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted mb-2">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xl font-bold font-display text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
