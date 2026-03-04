import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import megaAiLogo from "@/assets/mega-ai-logo.png";

type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
  featured?: boolean;
  logo?: string;
};

const PortfolioSection = () => {
  const ref = useRef(null);
  const { language } = useLanguage();
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const projects: Project[] =
    language === "fr"
      ? [
          {
            title: "Mega AI Solutions",
            description:
              "Site corporate presentant des solutions digitales et techniques avec une direction visuelle moderne et orientee performance.",
            link: "https://megaaisolutions.com/",
            tags: ["Web Design", "Corporate", "UI moderne"],
            featured: true,
            logo: megaAiLogo,
          },
          {
            title: "HelioNova Energie",
            description:
              "Template pour entreprises solaires, pense pour rassurer, convertir et valoriser une offre energie propre.",
            link: "https://helionovaenergie.vercel.app/",
            tags: ["Template", "Solaire", "Landing page"],
          },
          {
            title: "Flo Martiste",
            description:
              "Landing page d'artiste avec une presentation immersive, ideale pour mettre en avant l'univers, le style et l'image de marque.",
            link: "https://flomartiste.vercel.app/",
            tags: ["Artiste", "Landing page", "Branding"],
          },
        ]
      : [
          {
            title: "Mega AI Solutions",
            description:
              "Corporate website showcasing digital and technical solutions with a modern design. Built with performance and user experience as top priorities.",
            link: "https://megaaisolutions.com/",
            tags: ["Web Design", "Corporate", "Modern UI"],
            featured: true,
            logo: megaAiLogo,
          },
          {
            title: "HelioNova Energie",
            description:
              "Template website for solar companies focused on trust, lead generation, and a clean energy visual identity.",
            link: "https://helionovaenergie.vercel.app/",
            tags: ["Template", "Solar", "Landing Page"],
          },
          {
            title: "Flo Martiste",
            description:
              "Artist landing page built to showcase personality, atmosphere, and a strong visual presence.",
            link: "https://flomartiste.vercel.app/",
            tags: ["Artist", "Landing Page", "Branding"],
          },
        ];

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-3xl rounded-full" />

      <div ref={ref} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wide uppercase">
            {language === "fr" ? "PORTFOLIO" : "PORTFOLIO"}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 animated-underline ${isInView ? "in-view" : ""}`}>
            {language === "fr" ? "Projets Selectionnes" : "Selected Work"}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {language === "fr"
              ? "Une selection de projets qui mettent en avant la qualite, la creativite et le souci du detail."
              : "Showcasing projects that demonstrate quality, creativity, and attention to detail."}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.15 + index * 0.12,
                duration: 0.7,
                ease: "easeOut",
              }}
              className="group relative"
            >
              <div className="relative glass-card rounded-2xl overflow-hidden portfolio-shine hover-lift card-shine">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    {project.logo ? (
                      <img src={project.logo} alt={`${project.title} logo`} className="h-10 w-auto rounded-lg opacity-90" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {project.title.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    {project.featured && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.35 + index * 0.1, duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm font-medium text-primary">
                          {language === "fr" ? "Projet phare" : "Featured Project"}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button
                      size="lg"
                      className="group/btn relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_30px_hsl(185,55%,45%,0.4)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {language === "fr" ? "Voir le site" : "View website"}
                        <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </span>
                    </Button>
                  </a>
                </div>

                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-[100px]" />
              </div>

              <div className="absolute inset-0 -z-10 bg-primary/20 blur-3xl rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-muted-foreground mt-12"
        >
          {language === "fr" ? "D'autres projets arrivent bientot" : "More projects coming soon"}
        </motion.p>
      </div>
    </section>
  );
};

export default PortfolioSection;
