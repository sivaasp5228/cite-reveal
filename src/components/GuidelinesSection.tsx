import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Clock, Code, Upload } from "lucide-react";

const guidelines = [
  { icon: Users, title: "Team Size", detail: "3-4 members per team" },
  { icon: Clock, title: "Timeline", detail: "Coming Soon" },
  { icon: Code, title: "Technologies", detail: "Any language, framework, or cloud platform" },
  { icon: Upload, title: "Submission", detail: "Coming Soon" },
];

const GuidelinesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="guidelines" className="py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-gold-gradient">Hackathon Guidelines</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guidelines.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="relative overflow-hidden rounded-xl p-6 transition-all duration-500 group border-gold-glow border-gold-glow-hover"
              style={{ background: "linear-gradient(135deg, hsl(0 72% 41% / 0.08), hsl(0 0% 8% / 0.9))" }}
            >
              <g.icon className="text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-display font-bold text-foreground text-lg mb-1">{g.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{g.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Animated Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1, 0.98],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-gold-gradient gold-glow-text">
              Prototype is important that PPT
            </h3>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mt-4 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
