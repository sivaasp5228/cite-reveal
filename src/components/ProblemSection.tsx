import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, FileText, CheckCircle, Sparkles } from "lucide-react";

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="py-24 sm:py-32 px-4 red-gradient-bg">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="uppercase tracking-[0.3em] text-accent text-xs mb-4 font-body">The Challenge</p>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-gold-gradient">Problem Statements</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card-gold p-8 mb-8 sm:p-12"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-accent mb-6">
            Problem Statement 1: Smart College Infrastructure Ticketing & Resolution System
          </h3>
          
          <h4 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4">
            Problem Statement
          </h4>
          <p className="text-muted-foreground font-body leading-relaxed mb-6 text-sm sm:text-base">
            Design and develop a Smart College Infrastructure Ticketing & Resolution System that enables authorized users to raise service tickets with photo/video proof and ensures:
          </p>
          <a href="/PS 1.pdf" target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 inline-block">View Problem Statement 1</a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card-gold p-8 mb-8 sm:p-12"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-accent mb-6">
            Problem Statement 2: Intelligent Faculty Workload & Timetable Allocat on System
          </h3>
          
          <h4 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4">
            Problem Statement
          </h4>
          <p className="text-muted-foreground font-body leading-relaxed mb-6 text-sm sm:text-base">
            Design and develop an Automated Faculty Workload & Timetable Allocation System that maps faculty to allocated subjects and generates a conflict-free, institution-compliant timetable for the entire college while satisfying workload rules, lab constraints, departmental policies, and institutional priorities. 
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-6 text-sm sm:text-base">
            The system must support both UG and PG scheduling structures and ensure intelligent workload balancing. 
          </p>
          <a href="/PS 2.pdf" target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 inline-block">View Problem Statement 2</a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
