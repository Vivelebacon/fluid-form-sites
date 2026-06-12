import { useRef } from "react";
import { Monitor, Palette, Smartphone, Zap, Settings } from "lucide-react";
import { useLanguage } from "@/i18n";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import hugoProfile from "@/assets/hugo-profile.jpg";

const AboutSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const services =
    language === "fr"
      ? [
          {
            icon: Monitor,
            title: "Création et refonte de sites",
            description: "Création de sites modernes depuis zéro ou refonte de sites existants.",
          },
          {
            icon: Palette,
            title: "Design UI/UX moderne",
            description: "Interfaces intuitives et efficaces que les utilisateurs aiment parcourir.",
          },
          {
            icon: Smartphone,
            title: "Responsive et mobile first",
            description: "Affichage impeccable sur tous les écrans et tous les appareils.",
          },
          {
            icon: Zap,
            title: "Orienté performance",
            description: "Mises en page optimisées pour charger vite et mieux convertir.",
          },
          {
            icon: Settings,
            title: "Intégration d'outils business",
            description: "Intégration fluide de formulaires, widgets et outils personnalisés.",
          },
        ]
      : [
          {
            icon: Monitor,
            title: "Website Creation & Redesign",
            description: "Building modern websites from scratch or refreshing existing ones.",
          },
          {
            icon: Palette,
            title: "Modern UI/UX Design",
            description: "Creating intuitive interfaces that users love to interact with.",
          },
          {
            icon: Smartphone,
            title: "Responsive & Mobile-First",
            description: "Ensuring perfect display across all devices and screen sizes.",
          },
          {
            icon: Zap,
            title: "Performance-Focused",
            description: "Optimized layouts that load fast and convert better.",
          },
          {
            icon: Settings,
            title: "Business Tool Integration",
            description: "Seamless integration of forms, widgets, and custom tools.",
          },
        ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Parallax drift inside the portrait frame
      gsap.fromTo(
        ".about-photo img",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-photo",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.from(".about-photo-frame", {
        clipPath: "inset(12% 12% 12% 12% round 24px)",
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-photo", start: "top 78%", once: true },
      });

      gsap.from(".about-copy", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-copy", start: "top 84%", once: true },
      });

      // Per-row triggers: each row is fully lit by the time it is in view
      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          x: -32,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <span className="text-ghost pointer-events-none absolute -right-4 top-12 hidden select-none font-display text-[12rem] font-black leading-none lg:block">
        01
      </span>

      <div className="section-container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="about-photo relative flex justify-center lg:col-span-5 lg:justify-start">
            <div className="about-photo-frame profile-container aspect-[4/5] w-72 md:w-80 lg:w-full lg:max-w-md">
              <img
                src={hugoProfile}
                alt={language === "fr" ? "Hugo Megardon - Web Designer Freelance" : "Hugo Megardon - Freelance Web Designer"}
                className="h-full w-full scale-110 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-background/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground backdrop-blur-md">
                Hugo Megardon
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              index="01"
              label={language === "fr" ? "À PROPOS" : "ABOUT"}
              title={language === "fr" ? "Ce Que Je Fais" : "What I Do"}
            />

            <p className="about-copy mt-8 text-lg leading-relaxed text-muted-foreground">
              {language === "fr"
                ? "Je crée des expériences digitales qui combinent exigence esthétique et efficacité stratégique. Chaque projet est traité avec précision et une vraie compréhension de ce qui rend un site performant."
                : "I specialize in creating digital experiences that combine aesthetic excellence with strategic functionality. Every project is approached with precision and a deep understanding of what makes websites truly effective."}
            </p>

            <div className="service-list mt-10">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  data-cursor-hover
                  className="service-row group flex items-start gap-5 border-b border-white/5 py-5 transition-all duration-300 first:border-t hover:translate-x-2 hover:border-primary/30"
                >
                  <span className="mt-1 w-8 shrink-0 font-display text-sm font-semibold text-primary/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
