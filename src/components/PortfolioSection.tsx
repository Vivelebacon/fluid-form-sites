import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Eye, SunMedium, Sparkles } from "lucide-react";
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
  thumbnail: "mega" | "solar" | "artist";
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
              "Site corporate présentant des solutions digitales et techniques avec une direction visuelle moderne et orientée performance.",
            link: "https://megaaisolutions.com/",
            tags: ["Web Design", "Corporate", "UI moderne"],
            featured: true,
            logo: megaAiLogo,
            thumbnail: "mega",
          },
          {
            title: "HelioNova Energie",
            description:
              "Template pour entreprises solaires, pensé pour rassurer, convertir et valoriser une offre énergie propre.",
            link: "https://helionovaenergie.vercel.app/",
            tags: ["Template", "Solaire", "Landing page"],
            thumbnail: "solar",
          },
          {
            title: "Flo-M Artiste",
            description:
              "Landing page d'artiste avec une présentation immersive, idéale pour mettre en avant l'univers, le style et l'image de marque.",
            link: "https://flomartiste.vercel.app/",
            tags: ["Artiste", "Landing page", "Branding"],
            thumbnail: "artist",
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
            thumbnail: "mega",
          },
          {
            title: "HelioNova Energie",
            description:
              "Template website for solar companies focused on trust, lead generation, and a clean energy visual identity.",
            link: "https://helionovaenergie.vercel.app/",
            tags: ["Template", "Solar", "Landing Page"],
            thumbnail: "solar",
          },
          {
            title: "Flo-M Artiste",
            description:
              "Artist landing page built to showcase personality, atmosphere, and a strong visual presence.",
            link: "https://flomartiste.vercel.app/",
            tags: ["Artist", "Landing Page", "Branding"],
            thumbnail: "artist",
          },
        ];

  const renderThumbnail = (project: Project) => {
    if (project.thumbnail === "mega") {
      return (
        <div className="h-52 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 flex items-center justify-center">
          <img src={megaAiLogo} alt="Mega AI Solutions thumbnail" className="max-h-20 w-auto opacity-95" />
        </div>
      );
    }

    if (project.thumbnail === "solar") {
      return (
        <div className="h-52 rounded-2xl border border-white/10 bg-gradient-to-br from-amber-200 via-orange-300 to-orange-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.7),transparent_35%)]" />
          <div className="relative h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-950/80">
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">HelioNova</span>
              <SunMedium className="w-8 h-8" />
            </div>
            <div className="flex items-end gap-3">
              <div className="h-12 w-20 rounded-md bg-slate-950/75" />
              <div className="h-14 w-24 rounded-md bg-slate-950/80" />
              <div className="h-10 w-16 rounded-md bg-slate-950/70" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-52 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-50 via-zinc-200 to-zinc-900 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.95),transparent_35%)]" />
        <div className="relative h-full flex items-center justify-center">
          <div className="absolute inset-x-10 inset-y-6 rounded-[2rem] border border-white/40 bg-white/40 backdrop-blur-sm" />
          <Eye className="relative z-10 w-24 h-24 text-zinc-900" />
          <Sparkles className="absolute right-10 top-8 w-5 h-5 text-zinc-700" />
        </div>
      </div>
    );
  };

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
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-center gap-3 sm:gap-6">
            <span className="text-primary font-medium text-sm tracking-wide uppercase shrink-0">
              {language === "fr" ? "PORTFOLIO" : "PORTFOLIO"}
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold animated-underline ${isInView ? "in-view" : ""}`}>
              {language === "fr" ? "Projets Sélectionnés" : "Selected Work"}
            </h2>
          </div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {language === "fr"
              ? "Une sélection de projets qui mettent en avant la qualité, la créativité et le souci du détail."
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
                  <div className="mb-8">
                    {renderThumbnail(project)}
                  </div>

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
          {language === "fr" ? "D'autres projets arrivent bientôt" : "More projects coming soon"}
        </motion.p>
      </div>
    </section>
  );
};

export default PortfolioSection;
