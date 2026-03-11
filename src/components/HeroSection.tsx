import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />

      <ParticleBackground />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[0.4em] text-accent text-xs sm:text-sm mb-6 font-body font-medium">
            Centre for Innovation and Talent Empowerment
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-9xl font-display font-black text-gold-gradient mt-12 gold-glow-text leading-tight"
        >
          CITE Hackathon
          <span className="block text-3xl sm:text-5xl lg:text-7xl mt-2 text-foreground">2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-2xl text-muted-foreground mt-6 tracking-widest font-body font-light"
        >
          Innovate &bull; Build &bull; Transform
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#problem" className="btn-gold text-base sm:text-lg font-body">View Problem Statement</a>
          <a href="#register" className="btn-red text-base sm:text-lg font-body">Register Now</a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="text-accent/50" size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
