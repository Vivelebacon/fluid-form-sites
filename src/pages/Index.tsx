import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <section id="skills">
          <SkillsSection />
        </section>
        <PortfolioSection />
        <section id="process">
          <ProcessSection />
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
