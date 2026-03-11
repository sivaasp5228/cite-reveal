import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPopup, setShowPopup] = useState(false);

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
            <button 
              onClick={() => setShowPopup(true)}
              className="btn-gold text-lg font-body"
            >
              Register Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />
          
          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative glass-card-gold p-8 max-w-md w-full"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-foreground hover:text-accent transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Content */}
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-accent mb-4">
                Registration Open Soon
              </h3>
              <p className="text-muted-foreground font-body text-sm sm:text-base">
                We're working hard to get the registration portal ready. Stay tuned for updates!
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="btn-gold mt-6"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default CTASection;
