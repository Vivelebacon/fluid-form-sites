import { useRef } from "react";
import { Palette, Layout, Smartphone, Sparkles, Gauge, Code } from "lucide-react";
import { useLanguage } from "@/i18n";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

const SkillsSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const skills =
    language === "fr"
      ? [
          {
            icon: Palette,
            title: "Design UI / UX",
            description: "Interfaces esthétiques, claires et agréables à utiliser.",
          },
          {
            icon: Layout,
            title: "Web Design",
            description: "Mises en page modernes qui valorisent votre marque.",
          },
          {
            icon: Smartphone,
            title: "Responsive Layouts",
            description: "Designs précis sur tous les formats d'écran.",
          },
          {
            icon: Sparkles,
            title: "Animations modernes",
            description: "Des mouvements subtils qui renforcent l'expérience utilisateur.",
          },
          {
            icon: Gauge,
            title: "Performance",
            description: "Sites rapides et optimisés pour mieux convertir.",
          },
          {
            icon: Code,
            title: "Code propre",
            description: "Structure maintenable, évolutive et durable.",
          },
        ]
      : [
          {
            icon: Palette,
            title: "UI / UX Design",
            description: "Creating visually stunning and user-friendly interfaces.",
          },
          {
            icon: Layout,
            title: "Web Design",
            description: "Crafting modern layouts that communicate your brand.",
          },
          {
            icon: Smartphone,
            title: "Responsive Layouts",
            description: "Pixel-perfect designs on every screen size.",
          },
          {
            icon: Sparkles,
            title: "Modern Animations",
            description: "Subtle motion that enhances user experience.",
          },
          {
            icon: Gauge,
            title: "Performance",
            description: "Fast-loading sites optimized for conversion.",
          },
          {
            icon: Code,
            title: "Clean Code",
            description: "Maintainable, scalable, and future-proof structure.",
          },
        ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Per-card triggers: every card reaches full luminosity as it enters the viewport
      gsap.utils.toArray<HTMLElement>(".skill-item").forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 40,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card/40 py-28 md:py-36">
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <span className="text-ghost pointer-events-none absolute -left-4 top-12 hidden select-none font-display text-[12rem] font-black leading-none lg:block">
        02
      </span>

      <div className="section-container relative z-10">
        <SectionHeading
          index="02"
          label="EXPERTISE"
          align="center"
          title={language === "fr" ? "Compétences & Outils" : "Skills & Tools"}
          description={
            language === "fr"
              ? "Une combinaison de vision créative et de rigueur technique pour livrer des résultats de haut niveau."
              : "A combination of creative vision and technical excellence to deliver exceptional results."
          }
        />

        <div className="skill-grid mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.title}
              data-cursor-hover
              className="skill-item group relative overflow-hidden rounded-xl border border-white/5 bg-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_hsl(181_90%_52%/0.15)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <skill.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-primary">
                {skill.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{skill.description}</p>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
