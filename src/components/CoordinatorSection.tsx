import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Star } from "lucide-react";

const mentors = [
  {
    name: "Mr.K.Naveenraj",
    role: "Developer CITE",
    department: "KPR College of Arts Science and Research",
    email: "naveenraja.k@kprcas.ac.in",
    phone: "+91 99655 05269",
    image: "/mentor3.jpeg"
  },
  {
    name: "Mr.N.Ganapathi Ram",
    role: "Coordinator CITE",
    department: "KPR College of Arts Science and Research",
    email: "ganapathiram.n@kprcas.ac.in",
    phone: "+91 98765 12345",
    image: "/mentor1.jpeg"
  },
  {
    name: "Mr.K.Praveenraja",
    role: "Developer CITE",
    department: "KPR College of Arts Science and Research",
    email: "praveenraja.k@kprcas.ac.in",
    phone: "+91 93605 90863",
    image: "/mentor2.jpeg"
  }
];

const CoordinatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="coordinators" className="py-24 sm:py-32 px-4 red-gradient-bg">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-accent text-xs mb-4 font-body">Guidance & Support</p>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-gold-gradient">Hackathon Coordinators</h2>
          <p className="mt-4 text-muted-foreground font-body text-base sm:text-lg max-w-2xl mx-auto">
            Our experienced Coordinators are here to guide you throughout your hackathon journey
          </p>
        </motion.div>

        {/* Mentors Section */}
        <div className="flex justify-center">
          {mentors.map((mentor, i) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + i * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="glass-card-gold p-8 max-w-sm w-full border-gold-glow-hover transition-all duration-500"
            >
              {/* Mentor Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
                className="relative mb-6"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-accent/30 shadow-xl">
                  <motion.img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <Star className="text-accent" size={24} fill="currentColor" />
                </motion.div>
              </motion.div>

              {/* Mentor Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
              >
                <h3 className="font-display font-bold text-foreground text-xl mb-2">{mentor.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="text-accent" size={16} fill="currentColor" />
                  <p className="text-accent font-body text-sm font-medium">{mentor.role}</p>
                </div>
                <p className="text-muted-foreground font-body text-xs mb-4">{mentor.department}</p>

                {/* Contact Info */}
                <div className="space-y-2 text-left">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Mail size={14} className="shrink-0" />
                    <span className="text-xs truncate">{mentor.email}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Phone size={14} className="shrink-0" />
                    <span className="text-xs">{mentor.phone}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-6 max-w-2xl mx-auto">
            <p className="text-muted-foreground font-body text-sm">
              <span className="text-accent font-medium">Need Help?</span> Feel free to reach out to our mentors for assistance with registration, technical queries, or guidance throughout the hackathon journey.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoordinatorSection;
