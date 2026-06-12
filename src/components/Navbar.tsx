import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import { useNavigate } from "react-router-dom";
import { scrollToId, scrollToTop } from "@/hooks/useSmoothScroll";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { label: language === "fr" ? "À propos" : "About", id: "about" },
    { label: language === "fr" ? "Compétences" : "Skills", id: "skills" },
    { label: language === "fr" ? "Projets" : "Work", id: "portfolio" },
    { label: language === "fr" ? "Processus" : "Process", id: "process" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      // Hide when scrolling down past the hero, reveal on scroll up
      setIsHidden(y > 600 && y > lastScrollY.current);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    scrollToId(id);
  };

  const goToContact = () => {
    setIsMobileMenuOpen(false);
    navigate("/contact");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isHidden && !isMobileMenuOpen ? -110 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "border-b border-white/5 bg-background/75 py-4 backdrop-blur-xl" : "bg-transparent py-6"
        }`}
      >
        <div className="section-container">
          <nav className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                scrollToTop();
              }}
              className="font-display text-xl font-extrabold tracking-tight transition-colors hover:text-primary"
            >
              Hugo<span className="text-primary">.</span>
            </a>

            <div className="hidden items-center justify-self-center md:flex">
              <div className="flex items-center gap-10 lg:gap-12">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.id)}
                    className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                ))}
                <LanguageSwitcher />
              </div>
            </div>

            <div className="hidden justify-self-end md:flex">
              <Button
                onClick={goToContact}
                className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
              >
                Contact
              </Button>
            </div>

            <button
              className="justify-self-end p-2 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={language === "fr" ? "Ouvrir le menu" : "Toggle menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="fixed inset-x-0 top-[72px] z-40 border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="section-container py-6">
              <div className="flex flex-col gap-4">
                <div className="pb-2">
                  <LanguageSwitcher />
                </div>
                {navLinks.map((link, index) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-baseline gap-3 py-2 text-left text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="font-display text-xs font-semibold text-primary/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={goToContact}
                  className="mt-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
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
