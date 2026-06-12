import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import megaAiLogo from "@/assets/mega-ai-logo.svg";
import helionovaLogo from "@/assets/helionova-logo.png";
import cblisLogo from "@/assets/cblis-logo.png";
import ybgLogo from "@/assets/ybg-logo.jpeg";
import in2dutchLogo from "@/assets/in2dutch-logo.svg";
import cbtLogo from "@/assets/cbt-logo.jpg";

type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
  featured?: boolean;
  logo?: string;
  logoWhiteBg?: boolean;
  heroVideo?: string;
  heroImage?: string;
};

/** Plays the card video only while it is on screen; videos stay preload=metadata. */
const ProjectMedia = ({ project }: { project: Project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  if (project.heroVideo) {
    return (
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        src={project.heroVideo}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  if (project.heroImage) {
    return (
      <img
        src={project.heroImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return null;
};

const PortfolioSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

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
            title: "HelioNova Energie",
            description:
              "Template pour entreprises solaires, pensé pour rassurer, convertir et valoriser une offre énergie propre.",
            link: "https://helionovaenergie.vercel.app/",
            tags: ["Template", "Solaire", "Landing page"],
            logo: helionovaLogo,
            heroVideo: "/hero-helionova.mp4",
          },
          {
            title: "In2Dutch",
            description:
              "Site vitrine pour une agence de traduction néerlandaise. Design épuré, orienté conversion, avec une identité visuelle forte et moderne.",
            link: "https://in2dutch.com/",
            tags: ["Web Design", "Traduction", "Landing page"],
            logo: in2dutchLogo,
            heroVideo: "/hero-in2dutch.mp4",
          },
          {
            title: "Cross Border Translation",
            description:
              "Site corporate pour une agence de traduction internationale. Conçu pour inspirer confiance et valoriser une expertise multilingue de haut niveau.",
            link: "https://www.crossbordertranslation.com/",
            tags: ["Web Design", "Corporate", "Traduction"],
            logo: cbtLogo,
            logoWhiteBg: true,
            heroImage: "/hero-cbt.png",
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
            title: "HelioNova Energie",
            description:
              "Template website for solar companies focused on trust, lead generation, and a clean energy visual identity.",
            link: "https://helionovaenergie.vercel.app/",
            tags: ["Template", "Solar", "Landing Page"],
            logo: helionovaLogo,
            heroVideo: "/hero-helionova.mp4",
          },
          {
            title: "In2Dutch",
            description:
              "Showcase website for a Dutch translation agency. Clean, conversion-focused design with a strong and modern visual identity.",
            link: "https://in2dutch.com/",
            tags: ["Web Design", "Translation", "Landing Page"],
            logo: in2dutchLogo,
            heroVideo: "/hero-in2dutch.mp4",
          },
          {
            title: "Cross Border Translation",
            description:
              "Corporate website for an international translation agency. Built to inspire trust and highlight high-level multilingual expertise.",
            link: "https://www.crossbordertranslation.com/",
            tags: ["Web Design", "Corporate", "Translation"],
            logo: cbtLogo,
            logoWhiteBg: true,
            heroImage: "/hero-cbt.png",
          },
        ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // As the next sticky card arrives, scale + dim the one beneath it
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const inner = card.querySelector(".project-card-inner");
        const dim = card.querySelector(".project-card-dim");
        gsap.to(inner, {
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          },
        });
        gsap.to(dim, {
          opacity: 0.65,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [language] }
  );

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-28 md:py-36">
      <span className="text-ghost pointer-events-none absolute -right-4 top-12 hidden select-none font-display text-[12rem] font-black leading-none lg:block">
        03
      </span>

      <div className="section-container relative z-10">
        <SectionHeading
          index="03"
          label="PORTFOLIO"
          align="center"
          title={language === "fr" ? "Projets Sélectionnés" : "Selected Work"}
          description={
            language === "fr"
              ? "Une sélection de projets qui mettent en avant la qualité, la créativité et le souci du détail."
              : "Showcasing projects that demonstrate quality, creativity, and attention to detail."
          }
        />

        <div className="relative mt-20 flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card sticky"
              style={{ top: `calc(88px + ${index * 16}px)` }}
            >
              <article className="project-card-inner relative h-[72vh] min-h-[520px] origin-top overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl">
                <ProjectMedia project={project} />

                {/* Legibility gradient over the media */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(2,6,10,0.92) 0%, rgba(2,6,10,0.55) 45%, rgba(2,6,10,0.25) 100%)",
                  }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-12">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      {project.logo ? (
                        <img
                          src={project.logo}
                          alt={`${project.title} logo`}
                          className="h-12 w-auto max-w-[180px] rounded-lg object-contain md:h-14"
                          style={
                            project.logoWhiteBg
                              ? { background: "rgba(255,255,255,0.92)", padding: "6px 12px", borderRadius: 10 }
                              : { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }
                          }
                        />
                      ) : (
                        <span className="text-2xl font-bold text-white">{project.title}</span>
                      )}
                      {project.featured && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/40 px-4 py-2 backdrop-blur-sm">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                          <span className="text-sm font-medium text-primary">
                            {language === "fr" ? "Projet phare" : "Featured Project"}
                          </span>
                        </span>
                      )}
                    </div>

                    <span className="text-ghost select-none font-display text-6xl font-black leading-none md:text-8xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                      {project.title}
                    </h3>

                    <p className="mt-4 max-w-2xl leading-relaxed text-white/85 md:text-lg">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="group/link mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(181_90%_52%/0.4)]"
                    >
                      {language === "fr" ? "Voir le site" : "View website"}
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>

                <div className="project-card-dim pointer-events-none absolute inset-0 z-20 bg-background opacity-0" />
              </article>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-muted-foreground">
          {language === "fr" ? "D'autres projets arrivent bientôt" : "More projects coming soon"}
        </p>
      </div>
    </section>
  );
};

export default PortfolioSection;
