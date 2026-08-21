import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";

const Index = () => {
  // Preloader runs once per session; repeat visits go straight to the hero intro
  const [introDone, setIntroDone] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem("hwd:intro") === "1"
  );

  useSmoothScroll();

  useEffect(() => {
    if (introDone) ScrollTrigger.refresh();
  }, [introDone]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {!introDone && <Preloader onComplete={() => setIntroDone(true)} />}
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />
      <main>
        <HeroSection ready={introDone} />
        <Marquee />
        <AboutSection />
        <section id="skills">
          <SkillsSection />
        </section>
        <PortfolioSection />
        <TestimonialsSection />
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
