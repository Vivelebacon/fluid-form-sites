import { lazy, Suspense, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { scrollToId } from "@/hooks/useSmoothScroll";

const ThreeHero = lazy(() => import("@/components/ThreeHero"));

type HeroSectionProps = {
  ready: boolean;
};

const HeroSection = ({ ready }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      const headline = headlineRef.current;
      if (!headline || !ready) return;

      headline.classList.add("split-ready");

      if (reduced) {
        gsap.set(".hero-stagger", { clearProps: "all" });
        return;
      }

      const split = new SplitText(headline, {
        type: "lines,chars",
        linesClass: "split-line-mask",
      });

      // background-clip:text does not survive char-splitting: re-apply per char
      split.chars.forEach((char) => {
        if ((char as HTMLElement).closest(".gradient-line")) {
          (char as HTMLElement).classList.add("gradient-text");
        }
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(split.chars, {
        yPercent: 118,
        rotate: 4,
        duration: 1.1,
        stagger: 0.016,
      })
        .from(".hero-stagger", { autoAlpha: 0, y: 28, duration: 0.9, stagger: 0.12 }, "-=0.65")
        .from(".hero-scroll-hint", { autoAlpha: 0, duration: 0.8 }, "-=0.3");

      // Slow parallax exit while scrolling into the next section
      gsap.to(".hero-content", {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 35%",
          scrub: true,
        },
      });

      return () => split.revert();
    },
    { scope: sectionRef, dependencies: [ready, language, reduced] }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {!reduced && (
        <Suspense fallback={null}>
          <ThreeHero />
        </Suspense>
      )}

      {/* Vignette + bottom fade into the page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 55%, hsl(216 30% 4% / 0.85) 100%)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="hero-content section-container relative z-10 flex flex-col items-center pb-24 pt-32 text-center">
        <span className="hero-stagger inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/40 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {language === "fr" ? "Web Designer Freelance" : "Freelance Web Designer"}
        </span>

        <h1
          ref={headlineRef}
          data-split
          className="mt-8 font-display text-[clamp(2.8rem,9vw,7.5rem)] font-black uppercase leading-[0.96] tracking-tight"
        >
          {language === "fr" ? "Sites Web Modernes" : "Modern Websites"}
          <br />
          <span className="gradient-line">
            {language === "fr" ? "Conçus pour performer" : "Designed to Perform"}
          </span>
        </h1>

        <p className="hero-stagger mx-auto mt-8 max-w-2xl text-lg font-light text-muted-foreground md:text-2xl">
          {language === "fr"
            ? "Je crée des sites web propres, modernes et performants pour les entreprises qui veulent se démarquer."
            : "I design clean, modern, and high-performing websites for businesses that want to stand out."}
        </p>

        <div className="hero-stagger mt-12 flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={() => scrollToId("portfolio")}
            className="btn-glow rounded-full bg-primary px-8 py-6 text-lg font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90"
          >
            {language === "fr" ? "Voir mes projets" : "View my work"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/contact")}
            className="btn-glow rounded-full border-muted-foreground/30 px-8 py-6 text-lg font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:bg-transparent hover:text-foreground"
          >
            {language === "fr" ? "Me contacter" : "Get in touch"}
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("about")}
        className="hero-scroll-hint absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-3 text-muted-foreground transition-colors hover:text-primary"
        aria-label={language === "fr" ? "Descendre à la section suivante" : "Scroll to next section"}
      >
        <ArrowDown className={`h-6 w-6 ${reduced ? "" : "animate-bounce"}`} />
      </button>
    </section>
  );
};

export default HeroSection;
