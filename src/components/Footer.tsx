import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

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
          {/* Name */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">
              {t("footer.title")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("footer.subtitle")}
            </p>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
            >
              {t("footer.about")}
            </a>
            <a
              href="#portfolio"
              className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
            >
              {t("footer.work")}
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
            >
              {t("footer.contact")}
            </a>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
