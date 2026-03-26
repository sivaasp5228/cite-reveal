import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="register" className="py-24 sm:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-background to-background" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-6xl font-display font-black text-gold-gradient gold-glow-text leading-tight">
            Ready to Innovate?
          </h2>
          <p className="mt-6 text-muted-foreground font-body text-base sm:text-lg max-w-xl mx-auto">
            Join hundreds of student innovators and showcase your skills at the most prestigious hackathon of the year.
          </p>
          <div className="mt-10">
            <button className="btn-gold text-lg font-body">
              Coming Soon
            </button>
          </div>
        </motion.div>
      </div>

      </section>
  );
};

export default CTASection;
