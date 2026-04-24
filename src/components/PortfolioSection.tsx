import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import megaAiLogo from "@/assets/mega-ai-logo.png";
import helionovaLogo from "@/assets/helionova-logo.png";
import floMArtisteLogo from "@/assets/flom-artiste-logo.png";
import cblisLogo from "@/assets/cblis-logo.png";
import ybgLogo from "@/assets/ybg-logo.jpeg";

type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
  featured?: boolean;
  logo?: string;
  heroVideo?: string;
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
            heroVideo: "/hero-megaai.mp4",
          },
          {
            title: "CBLIS",
            description:
              "Plateforme professionnelle pour la gestion des informations de laboratoire et des échantillons. Conçue pour les professionnels de la santé avec une intégration fluide des flux de travail.",
            link: "https://www.cblis.com/",
            tags: ["Web Design", "Santé", "Enterprise"],
            logo: cblisLogo,
            heroVideo: "/hero-cblis.mp4",
          },
          {
            title: "Your Bali Getaway",
            description:
              "Site touristique offrant des expériences de vacances haut de gamme à Bali. Design moderne optimisé pour les conversions de réservations.",
            link: "https://www.yourbaligetaway.com/",
            tags: ["Web Design", "Tourisme", "E-commerce"],
            logo: ybgLogo,
            heroVideo: "/hero-ybg.mp4",
          },
          {
            title: "Flo-M Artiste",
            description:
              "Landing page d'artiste avec une présentation immersive, idéale pour mettre en avant l'univers, le style et l'image de marque.",
            link: "https://flomartiste.vercel.app/",
            tags: ["Artiste", "Landing page", "Branding"],
            logo: floMArtisteLogo,
            heroVideo: "/hero-flom.mp4",
          },
          {
            title: "HelioNova Energie",
            description:
              "Template pour entreprises solaires, pensé pour rassurer, convertir et valoriser une offre énergie propre.",
            link: "https://helionovaenergie.vercel.app/",
            tags: ["Template", "Solaire", "Landing page"],
            logo: helionovaLogo,
            heroVideo: "/hero-helionova.mp4",
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
            heroVideo: "/hero-megaai.mp4",
          },
          {
            title: "CBLIS",
            description:
              "Professional platform for laboratory information and sample management. Designed with healthcare professionals in mind for seamless workflow integration.",
            link: "https://www.cblis.com/",
            tags: ["Web Design", "Healthcare", "Enterprise"],
            logo: cblisLogo,
            heroVideo: "/hero-cblis.mp4",
          },
          {
            title: "Your Bali Getaway",
            description:
              "Hospitality and travel website offering premium Bali vacation experiences. Modern design optimized for tourism and booking conversions.",
            link: "https://www.yourbaligetaway.com/",
            tags: ["Web Design", "Travel", "E-commerce"],
            logo: ybgLogo,
            heroVideo: "/hero-ybg.mp4",
          },
          {
            title: "Flo-M Artiste",
            description:
              "Artist landing page built to showcase personality, atmosphere, and a strong visual presence.",
            link: "https://flomartiste.vercel.app/",
            tags: ["Artist", "Landing Page", "Branding"],
            logo: floMArtisteLogo,
            heroVideo: "/hero-flom.mp4",
          },
          {
            title: "HelioNova Energie",
            description:
              "Template website for solar companies focused on trust, lead generation, and a clean energy visual identity.",
            link: "https://helionovaenergie.vercel.app/",
            tags: ["Template", "Solar", "Landing Page"],
            logo: helionovaLogo,
            heroVideo: "/hero-helionova.mp4",
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
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-center gap-3 sm:gap-6">
            <span className="text-primary font-medium text-sm tracking-wide uppercase shrink-0">PORTFOLIO</span>
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
              <div className="relative rounded-2xl overflow-hidden portfolio-shine hover-lift card-shine" style={{ minHeight: "280px" }}>
                {/* Hero video background */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ zIndex: 0 }}
                >
                  <source src={project.heroVideo} type="video/mp4" />
                </video>

                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    zIndex: 1,
                    background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.30) 100%)",
                  }}
                />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" style={{ zIndex: 2 }} />

                {/* Content */}
                <div className="relative p-8 md:p-12" style={{ zIndex: 3 }}>
                  <div className="flex items-center gap-4 mb-6">
                    {project.logo ? (
                      <div className="flex h-14 items-center justify-start overflow-hidden rounded-xl bg-white/90 px-3 py-2">
                        <img
                          src={project.logo}
                          alt={`${project.title} logo`}
                          className="h-full w-auto max-w-[160px] object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-white">{project.title}</span>
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

                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-lg mb-8 max-w-2xl leading-relaxed text-white/85">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}
                      >
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

                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-[100px]" style={{ zIndex: 2 }} />
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
