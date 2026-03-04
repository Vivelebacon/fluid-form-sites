import { motion } from "framer-motion";
import { useLanguage } from "@/i18n";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">Hugo Megardon</p>
            <p className="text-sm text-muted-foreground">
              {language === "fr" ? "Web Designer Freelance" : "Freelance Web Designer"}
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            (c) {new Date().getFullYear()} {language === "fr" ? "Tous droits reserves." : "All rights reserved."}
          </p>

          <nav className="flex items-center gap-8">
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
              {language === "fr" ? "A propos" : "About"}
            </a>
            <a href="#portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
              {language === "fr" ? "Projets" : "Work"}
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
              {language === "fr" ? "Contact" : "Contact"}
            </a>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
