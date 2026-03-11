import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Brain, Users } from "lucide-react";

const cards = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "Push boundaries with creative solutions to real-world challenges using cutting-edge technology.",
  },
  {
    icon: Brain,
    title: "AI-Driven Solutions",
    description: "Leverage artificial intelligence and machine learning to build impactful, intelligent systems.",
  },
  {
    icon: Users,
    title: "Collaborative Spirit",
    description: "Work in teams to combine diverse skills and perspectives into a single powerful solution.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-gold-gradient">About the Hackathon</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-body">
            CITE Hackathon 2026 is a premier innovation challenge that brings together the brightest student minds to solve pressing technological problems through creativity, collaboration, and code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card-gold p-8 border-gold-glow-hover transition-all duration-500 group"
            >
              <card.icon className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300" size={36} />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
