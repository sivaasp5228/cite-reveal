import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  { date: "March 12", title: "Problem Statement Launch", description: "Challenge revealed to all participants" },
  { date: "NIL", title: "Development Phase", description: "build the user fiendly prototype matching the sustainability of the problem statements" },
  { date: "NIL", title: "PPT Submission Deadline", description: "Revealed soon" },
  { date: "NIL", title: "Final Hackathon", description: "Revealed soon" },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="py-24 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-gold-gradient">Hackathon Timeline</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-accent/20 sm:-translate-x-px" />

          <div className="space-y-12">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-1/2 mt-2 sm:mt-0 z-10 animate-pulse-gold" />

                <div className={`pl-10 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                  <div className="glass-card-gold p-5 border-gold-glow-hover transition-all duration-500">
                    <p className="text-accent font-body text-xs uppercase tracking-widest mb-1">{event.date}</p>
                    <h3 className="font-display font-bold text-foreground text-lg">{event.title}</h3>
                    <p className="text-muted-foreground text-sm font-body mt-1">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
