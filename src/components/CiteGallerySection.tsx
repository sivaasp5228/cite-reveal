import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Users, X } from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "TEAM HYDRO EYE",
    description: "Secured FIRST PLACE in RVSCAS Young Innovators Hackathon",
    image: "/rvsclg.jpeg",
    year: "2026",
    category: "Hackathon",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 2, 
    title: "TEAM INNOVATRIX",
    description: "Got shortlisted in 36 hrs National Level Hackathon conducted Karpagam Academy of Higher Education",
    image: "/hacksprint.jpg",
    year: "2026",
    category: "Hackathon",
    color: "from-yellow-500 to-orange-500"
  }
];

const CiteGallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 bg-gradient-to-b from-background via-background/95 to-primary/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-accent text-xs mb-4 font-body">Our Legacy</p>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-gold-gradient gold-glow-text mb-6">
            CITE Gallery
          </h2>
          <p className="mt-4 text-muted-foreground font-body text-base sm:text-lg max-w-3xl mx-auto">
            Celebrating our journey of innovation, excellence, and transformative impact in technology education and research
          </p>
        </motion.div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => {
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="glass-card-gold p-4 sm:p-6 lg:p-8 h-full border-gold-glow-hover transition-all duration-500">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-500`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    className="inline-block mb-4"
                  >
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                      {achievement.category}
                    </span>
                  </motion.div>

                  {/* Achievement Image with Animation */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.1 + 0.4,
                      ease: "easeOut"
                    }}
                    className="mb-6 relative overflow-hidden rounded-lg cursor-pointer"
                    onMouseEnter={() => setHoveredImage(achievement.image)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <motion.img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Floating Particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-accent rounded-full"
                        animate={{
                          x: [0, Math.random() * 40 - 20],
                          y: [0, -20],
                          opacity: [1, 0],
                          scale: [1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                        style={{
                          top: '50%',
                          left: '50%',
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                  >
                    <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                      {achievement.description}
                    </p>
                    
                    {/* Year Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">
                        {achievement.year}
                      </span>
                      <motion.div
                        className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star className="text-accent" size={14} fill="currentColor" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full rounded-lg bg-gradient-to-t from-accent/5 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
          </motion.div>
          <p className="mt-4 text-sm text-muted-foreground font-body">
            Building Tomorrow's Innovation Today
          </p>
        </motion.div>
      </div>

      {/* Image Popup */}
      {hoveredImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onMouseLeave={() => setHoveredImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-7xl max-h-[85vh] sm:max-w-4xl sm:max-h-[90vh] w-full mx-4 sm:mx-auto"
            onMouseEnter={() => setHoveredImage(hoveredImage)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img
              src={hoveredImage}
              alt="Achievement full view"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Close button */}
            <button
              onClick={() => setHoveredImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>
            
            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/50 text-white rounded-lg backdrop-blur-sm">
              <p className="text-sm">Hover over the image to keep it open</p>
              <p className="text-xs opacity-75">Move cursor away to close</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default CiteGallerySection;
