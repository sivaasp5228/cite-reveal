import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProblemSection from "@/components/ProblemSection";
import GuidelinesSection from "@/components/GuidelinesSection";
import TimelineSection from "@/components/TimelineSection";
import CoordinatorSection from "@/components/CoordinatorSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProblemSection />
      <GuidelinesSection />
      <TimelineSection />
      <CoordinatorSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
