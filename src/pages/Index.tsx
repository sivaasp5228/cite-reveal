import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProblemSection from "@/components/ProblemSection";
import GuidelinesSection from "@/components/GuidelinesSection";
import TimelineSection from "@/components/TimelineSection";
import CoordinatorSection from "@/components/CoordinatorSection";
import CiteGallerySection from "@/components/CiteGallerySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import AnnouncementPopup from "@/components/AnnouncementPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementPopup />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProblemSection />
      <GuidelinesSection />
      <TimelineSection />
      <CoordinatorSection />
      <CiteGallerySection />
      <CTASection />
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
