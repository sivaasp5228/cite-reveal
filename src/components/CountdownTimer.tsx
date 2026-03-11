import { motion } from "framer-motion";

const CountdownTimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 1.2, 
        ease: "easeOut",
        staggerChildren: 0.1
      }}
      className="glass-card-gold px-8 py-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl sm:text-5xl font-display font-bold text-gold-gradient gold-glow-text"
      >
        Coming Soon
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: 1
        }}
        className="w-16 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-3"
      />
    </motion.div>
  );
};

export default CountdownTimer;
