import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import QuizCard from "@/components/QuizCard";
import ParticleBackground from "@/components/ParticleBackground";
import { quizzes } from "@/data/quizData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold font-display text-foreground">QuizArena</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">Explore • Compete • Learn</span>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection />

      {/* Quiz Grid */}
      <section id="quizzes" className="relative z-10 px-6 pb-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
            Choose Your <span className="gradient-text-secondary">Challenge</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Pick a category and test your expertise. Every quiz is a new adventure!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz, index) => (
            <QuizCard key={quiz.id} quiz={quiz} index={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 QuizArena. Challenge yourself daily.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">About</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
