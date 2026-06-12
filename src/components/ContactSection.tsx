import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import { gsap, useGSAP, prefersReducedMotion, isFinePointer } from "@/lib/gsap";

const ContactSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".contact-reveal", {
        autoAlpha: 0,
        y: 48,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      // Magnetic CTA (desktop only)
      const wrap = magneticRef.current;
      if (!wrap || !isFinePointer()) return;

      const xTo = gsap.quickTo(wrap, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(wrap, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(dx * 0.3);
        yTo(dy * 0.3);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      const zone = wrap.parentElement!;
      zone.addEventListener("mousemove", onMove);
      zone.addEventListener("mouseleave", onLeave);
      return () => {
        zone.removeEventListener("mousemove", onMove);
        zone.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="contact-reveal font-display text-[clamp(2.4rem,7vw,5.5rem)] font-black uppercase leading-[1.02] tracking-tight">
            {language === "fr" ? "Envie de travailler" : "Interested in working"}
            <br />
            <span className="gradient-text">{language === "fr" ? "ensemble ?" : "together?"}</span>
          </h2>

          <p className="contact-reveal mx-auto mt-8 max-w-xl text-xl text-muted-foreground">
            {language === "fr"
              ? "Parlons de votre projet et voyons comment je peux donner vie à votre vision."
              : "Let's discuss your project and see how I can help bring your vision to life."}
          </p>

          <div className="contact-reveal mt-12 inline-block p-6">
            <div ref={magneticRef} className="inline-block">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="btn-glow group rounded-full bg-primary px-10 py-7 text-xl font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90"
                >
                  <span className="flex items-center gap-3">
                    {language === "fr" ? "Me contacter" : "Get in touch"}
                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
