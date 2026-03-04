import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { label: language === "fr" ? "À propos" : "About", href: "#about" },
    { label: language === "fr" ? "Compétences" : "Skills", href: "#skills" },
    { label: language === "fr" ? "Projets" : "Work", href: "#portfolio" },
    { label: language === "fr" ? "Processus" : "Process", href: "#process" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const goToContact = () => {
    setIsMobileMenuOpen(false);
    navigate("/contact");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4 bg-background/80 backdrop-blur-lg border-b border-border/50" : "py-6 bg-transparent"
        }`}
      >
        <div className="section-container">
          <nav className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-xl font-bold hover:text-primary transition-colors"
            >
              Hugo<span className="text-primary">.</span>
            </a>

            <div className="hidden md:flex items-center justify-self-center">
              <div className="flex items-center gap-10 lg:gap-12">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.label}
                  </button>
                ))}
                <LanguageSwitcher />
              </div>
            </div>

            <div className="hidden md:flex justify-self-end">
              <Button onClick={goToContact} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
                Contact
              </Button>
            </div>

            <button
              className="md:hidden p-2 justify-self-end"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={language === "fr" ? "Ouvrir le menu" : "Toggle menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="section-container py-6">
              <div className="flex flex-col gap-4">
                <div className="pb-2">
                  <LanguageSwitcher />
                </div>
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                  >
                    {link.label}
                  </button>
                ))}
                <Button onClick={goToContact} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-2">
                  Contact
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
