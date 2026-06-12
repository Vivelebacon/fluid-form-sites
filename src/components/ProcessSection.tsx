import { useRef } from "react";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import { useLanguage } from "@/i18n";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

const ProcessSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const steps =
    language === "fr"
      ? [
          {
            number: "01",
            icon: Search,
            title: "Découverte",
            description: "Comprendre vos objectifs business, votre audience et les besoins du projet.",
          },
          {
            number: "02",
            icon: PenTool,
            title: "Design",
            description: "Créer des wireframes et une direction visuelle cohérente avec votre marque.",
          },
          {
            number: "03",
            icon: Code,
            title: "Développement",
            description: "Construire des sites responsives, performants et propres techniquement.",
          },
          {
            number: "04",
            icon: Rocket,
            title: "Lancement",
            description: "Tester, optimiser et mettre en ligne votre nouveau site de façon fluide.",
          },
        ]
      : [
          {
            number: "01",
            icon: Search,
            title: "Discovery",
            description: "Understanding your business goals, target audience, and project requirements.",
          },
          {
            number: "02",
            icon: PenTool,
            title: "Design",
            description: "Creating wireframes and visual designs that align with your brand identity.",
          },
          {
            number: "03",
            icon: Code,
            title: "Development",
            description: "Building responsive, performant websites with modern animations and clean code.",
          },
          {
            number: "04",
            icon: Rocket,
            title: "Launch",
            description: "Thorough testing, optimization, and seamless deployment of your new site.",
          },
        ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the track horizontally
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".process-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: true,
          },
        });
      });

      // Mobile / reduced motion: simple staggered reveal
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".process-panel", {
          autoAlpha: 0,
          y: 44,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 82%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card/40">
      <div className="flex flex-col py-28 md:py-36 lg:h-screen lg:justify-center lg:py-0">
        <div className="section-container w-full">
          <SectionHeading
            index="04"
            label="WORKFLOW"
            title={language === "fr" ? "Mon Processus" : "My Process"}
            description={
              language === "fr"
                ? "Une approche structurée pour garantir un résultat solide à chaque projet."
                : "A structured approach to ensure every project is delivered with excellence."
            }
          />
        </div>

        <div
          ref={trackRef}
          className="mt-14 flex flex-col gap-8 px-6 lg:mt-20 lg:w-max lg:flex-row lg:gap-10 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+2rem))] lg:pr-[12vw]"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              data-cursor-hover
              className="process-panel group relative shrink-0 overflow-hidden rounded-3xl border border-white/5 bg-card p-8 transition-colors duration-300 hover:border-primary/30 md:p-12 lg:w-[30rem]"
            >
              <span className="text-ghost pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-black leading-none transition-all duration-500 group-hover:-translate-y-1 md:text-[9rem]">
                {step.number}
              </span>

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                <h3 className="mt-8 font-display text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-container mt-12 hidden w-full lg:block">
          <div className="h-px w-full overflow-hidden bg-border">
            <div className="process-progress h-full w-full origin-left scale-x-0 bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
