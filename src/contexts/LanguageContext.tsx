import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const en = {
  // Navbar
  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.work": "Work",
  "nav.process": "Process",
  "nav.contact": "Contact",

  // Hero
  "hero.badge": "Freelance Web Designer",
  "hero.title1": "Modern Websites",
  "hero.title2": "Designed to Perform",
  "hero.description": "I design clean, modern, and high-performing websites for businesses that want to stand out.",
  "hero.cta.work": "View my work",
  "hero.cta.contact": "Get in touch",

  // About
  "about.label": "ABOUT",
  "about.title": "What I Do",
  "about.description": "I specialize in creating digital experiences that combine aesthetic excellence with strategic functionality. Every project is approached with precision and a deep understanding of what makes websites truly effective.",
  "about.service1.title": "Website Creation & Redesign",
  "about.service1.description": "Building modern websites from scratch or refreshing existing ones.",
  "about.service2.title": "Modern UI/UX Design",
  "about.service2.description": "Creating intuitive interfaces that users love to interact with.",
  "about.service3.title": "Responsive & Mobile-First",
  "about.service3.description": "Ensuring perfect display across all devices and screen sizes.",
  "about.service4.title": "Performance-Focused",
  "about.service4.description": "Optimized layouts that load fast and convert better.",
  "about.service5.title": "Business Tool Integration",
  "about.service5.description": "Seamless integration of forms, widgets, and custom tools.",

  // Skills
  "skills.label": "EXPERTISE",
  "skills.title": "Skills & Tools",
  "skills.description": "A combination of creative vision and technical excellence to deliver exceptional results.",
  "skills.skill1.title": "UI / UX Design",
  "skills.skill1.description": "Creating visually stunning and user-friendly interfaces.",
  "skills.skill2.title": "Web Design",
  "skills.skill2.description": "Crafting modern layouts that communicate your brand.",
  "skills.skill3.title": "Responsive Layouts",
  "skills.skill3.description": "Pixel-perfect designs on every screen size.",
  "skills.skill4.title": "Modern Animations",
  "skills.skill4.description": "Subtle motion that enhances user experience.",
  "skills.skill5.title": "Performance",
  "skills.skill5.description": "Fast-loading sites optimized for conversion.",
  "skills.skill6.title": "Clean Code",
  "skills.skill6.description": "Maintainable, scalable, and future-proof structure.",

  // Portfolio
  "portfolio.label": "PORTFOLIO",
  "portfolio.title": "Selected Work",
  "portfolio.description": "Showcasing projects that demonstrate quality, creativity, and attention to detail.",
  "portfolio.featured": "Featured Project",
  "portfolio.project1.title": "Mega AI Solutions",
  "portfolio.project1.description": "Corporate website showcasing digital and technical solutions with a modern design. Built with performance and user experience as top priorities.",
  "portfolio.project1.tag1": "Web Design",
  "portfolio.project1.tag2": "Corporate",
  "portfolio.project1.tag3": "Modern UI",
  "portfolio.cta": "View website",
  "portfolio.more": "More projects coming soon",

  // Process
  "process.label": "WORKFLOW",
  "process.title": "My Process",
  "process.description": "A structured approach to ensure every project is delivered with excellence.",
  "process.step1.title": "Discovery",
  "process.step1.description": "Understanding your business goals, target audience, and project requirements.",
  "process.step2.title": "Design",
  "process.step2.description": "Creating wireframes and visual designs that align with your brand identity.",
  "process.step3.title": "Development",
  "process.step3.description": "Building responsive, performant websites with modern animations and clean code.",
  "process.step4.title": "Launch",
  "process.step4.description": "Thorough testing, optimization, and seamless deployment of your new site.",

  // Contact
  "contact.title1": "Interested in working",
  "contact.title2": "together?",
  "contact.description": "Let's discuss your project and see how I can help bring your vision to life.",
  "contact.cta": "Get in touch",

  // Footer
  "footer.title": "Hugo Megardon",
  "footer.subtitle": "Freelance Web Designer",
  "footer.copyright": "All rights reserved.",
  "footer.about": "About",
  "footer.work": "Work",
  "footer.contact": "Contact",
};

// French translations
const fr: typeof en = {
  // Navbar
  "nav.about": "À propos",
  "nav.skills": "Compétences",
  "nav.work": "Réalisations",
  "nav.process": "Processus",
  "nav.contact": "Contact",

  // Hero
  "hero.badge": "Web Designer Freelance",
  "hero.title1": "Sites Web Modernes",
  "hero.title2": "Conçus pour Performer",
  "hero.description": "Je conçois des sites web épurés, modernes et performants pour les entreprises qui veulent se démarquer.",
  "hero.cta.work": "Voir mes réalisations",
  "hero.cta.contact": "Me contacter",

  // About
  "about.label": "À PROPOS",
  "about.title": "Ce que je fais",
  "about.description": "Je me spécialise dans la création d'expériences digitales qui allient excellence esthétique et fonctionnalité stratégique. Chaque projet est abordé avec précision et une compréhension approfondie de ce qui rend un site web vraiment efficace.",
  "about.service1.title": "Création & Refonte de Sites",
  "about.service1.description": "Création de sites modernes ou refonte de sites existants.",
  "about.service2.title": "Design UI/UX Moderne",
  "about.service2.description": "Création d'interfaces intuitives que les utilisateurs adorent.",
  "about.service3.title": "Responsive & Mobile-First",
  "about.service3.description": "Affichage parfait sur tous les appareils et tailles d'écran.",
  "about.service4.title": "Axé sur la Performance",
  "about.service4.description": "Mises en page optimisées pour un chargement rapide et une meilleure conversion.",
  "about.service5.title": "Intégration d'Outils Métiers",
  "about.service5.description": "Intégration fluide de formulaires, widgets et outils personnalisés.",

  // Skills
  "skills.label": "EXPERTISE",
  "skills.title": "Compétences & Outils",
  "skills.description": "Une combinaison de vision créative et d'excellence technique pour des résultats exceptionnels.",
  "skills.skill1.title": "Design UI / UX",
  "skills.skill1.description": "Création d'interfaces visuellement impressionnantes et conviviales.",
  "skills.skill2.title": "Web Design",
  "skills.skill2.description": "Création de mises en page modernes qui communiquent votre marque.",
  "skills.skill3.title": "Mises en Page Responsives",
  "skills.skill3.description": "Designs pixel-perfect sur toutes les tailles d'écran.",
  "skills.skill4.title": "Animations Modernes",
  "skills.skill4.description": "Mouvements subtils qui améliorent l'expérience utilisateur.",
  "skills.skill5.title": "Performance",
  "skills.skill5.description": "Sites rapides optimisés pour la conversion.",
  "skills.skill6.title": "Code Propre",
  "skills.skill6.description": "Structure maintenable, évolutive et pérenne.",

  // Portfolio
  "portfolio.label": "PORTFOLIO",
  "portfolio.title": "Réalisations",
  "portfolio.description": "Des projets qui démontrent qualité, créativité et souci du détail.",
  "portfolio.featured": "Projet Phare",
  "portfolio.project1.title": "Mega AI Solutions",
  "portfolio.project1.description": "Site corporate présentant des solutions digitales et techniques avec un design moderne. Construit avec la performance et l'expérience utilisateur comme priorités.",
  "portfolio.project1.tag1": "Web Design",
  "portfolio.project1.tag2": "Corporate",
  "portfolio.project1.tag3": "UI Moderne",
  "portfolio.cta": "Voir le site",
  "portfolio.more": "Plus de projets à venir",

  // Process
  "process.label": "MÉTHODOLOGIE",
  "process.title": "Mon Processus",
  "process.description": "Une approche structurée pour garantir l'excellence de chaque projet.",
  "process.step1.title": "Découverte",
  "process.step1.description": "Comprendre vos objectifs, votre audience cible et les exigences du projet.",
  "process.step2.title": "Design",
  "process.step2.description": "Création de maquettes et designs visuels alignés avec votre identité de marque.",
  "process.step3.title": "Développement",
  "process.step3.description": "Construction de sites responsives et performants avec animations modernes.",
  "process.step4.title": "Lancement",
  "process.step4.description": "Tests approfondis, optimisation et mise en ligne fluide de votre nouveau site.",

  // Contact
  "contact.title1": "Intéressé par une",
  "contact.title2": "collaboration ?",
  "contact.description": "Discutons de votre projet et voyons comment je peux donner vie à votre vision.",
  "contact.cta": "Me contacter",

  // Footer
  "footer.title": "Hugo Megardon",
  "footer.subtitle": "Web Designer Freelance",
  "footer.copyright": "Tous droits réservés.",
  "footer.about": "À propos",
  "footer.work": "Réalisations",
  "footer.contact": "Contact",
};

const translations = { en, fr };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
