import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Cpu, Globe, Presentation } from "lucide-react";

const criteria = [
  { icon: Zap, title: "Innovation", weight: "30%", description: "Originality and creativity of the solution" },
  { icon: Cpu, title: "Technical Implementation", weight: "30%", description: "Code quality, architecture, and AI integration" },
  { icon: Globe, title: "Impact", weight: "20%", description: "Real-world applicability and scalability" },
  { icon: Presentation, title: "Presentation", weight: "20%", description: "Clarity of demo, documentation, and pitch" },
];

const EvaluationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="evaluation" className="py-24 sm:py-32 px-4 red-gradient-bg">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-gold-gradient">Evaluation Criteria</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="glass-card-gold p-6 text-center border-gold-glow-hover transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border border-accent/30 group-hover:border-accent/60 transition-colors">
                <c.icon className="text-accent group-hover:scale-110 transition-transform" size={28} />
              </div>
              <h3 className="font-display font-bold text-foreground text-lg">{c.title}</h3>
              <div className="text-accent font-display text-2xl font-bold my-2">{c.weight}</div>
              <p className="text-muted-foreground font-body text-sm">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvaluationSection;
