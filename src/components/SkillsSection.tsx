import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Layout, Smartphone, Sparkles, Gauge, Code } from "lucide-react";
import { useLanguage } from "@/i18n";

const SkillsSection = () => {
  const ref = useRef(null);
  const { language } = useLanguage();
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const skills =
    language === "fr"
      ? [
          {
            icon: Palette,
            title: "Design UI / UX",
            description: "Interfaces esthetiques, claires et agreables a utiliser.",
          },
          {
            icon: Layout,
            title: "Web Design",
            description: "Mises en page modernes qui valorisent votre marque.",
          },
          {
            icon: Smartphone,
            title: "Responsive Layouts",
            description: "Designs precis sur tous les formats d'ecran.",
          },
          {
            icon: Sparkles,
            title: "Animations modernes",
            description: "Des mouvements subtils qui renforcent l'experience utilisateur.",
          },
          {
            icon: Gauge,
            title: "Performance",
            description: "Sites rapides et optimises pour mieux convertir.",
          },
          {
            icon: Code,
            title: "Code propre",
            description: "Structure maintenable, evolutive et durable.",
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

  return (
    <section className="py-32 relative overflow-hidden bg-muted/30">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 blur-3xl rounded-full" />

      <div ref={ref} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wide uppercase">
            {language === "fr" ? "EXPERTISE" : "EXPERTISE"}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 animated-underline ${isInView ? "in-view" : ""}`}>
            {language === "fr" ? "Competences & Outils" : "Skills & Tools"}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {language === "fr"
              ? "Une combinaison de vision creative et de rigueur technique pour livrer des resultats de haut niveau."
              : "A combination of creative vision and technical excellence to deliver exceptional results."}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group skill-card card-shine p-8 hover-lift cursor-default"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <skill.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {skill.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{skill.description}</p>

                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
