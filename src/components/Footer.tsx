import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/i18n";
import { scrollToId, scrollToTop } from "@/hooks/useSmoothScroll";

const Footer = () => {
  const { language } = useLanguage();

  const links = [
    { label: language === "fr" ? "À propos" : "About", id: "about" },
    { label: language === "fr" ? "Projets" : "Work", id: "portfolio" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="section-container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold">
              Hugo Megardon<span className="text-primary">.</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {language === "fr" ? "Web Designer Freelance" : "Freelance Web Designer"}
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            (c) {new Date().getFullYear()} {language === "fr" ? "Tous droits réservés." : "All rights reserved."}
          </p>

          <nav className="flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToId(link.id)}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </button>
            ))}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label={language === "fr" ? "Retour en haut" : "Back to top"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
