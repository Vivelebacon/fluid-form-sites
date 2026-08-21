import { useRef } from "react";
import { Quote } from "lucide-react";
import { useLanguage } from "@/i18n";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import cbtLogo from "@/assets/cbt-logo-real.png";
import cblisLogo from "@/assets/cblis-logo.png";
import in2dutchLogo from "@/assets/in2dutch-logo.svg";
import ybgLogo from "@/assets/ybg-logo-transparent.png";

type Testimonial = {
  quote: string[];
  name: string;
  role: string;
  initials: string;
  brands: { src: string; alt: string; size: string }[];
};

// Per-logo heights: these files have very different aspect ratios, so a single
// height would leave the square marks looking like stamps next to the wide ones.
const brands = [
  { src: cbtLogo, alt: "Cross Border Translation", size: "h-5" },
  { src: cblisLogo, alt: "CBLIS", size: "h-12" },
  { src: in2dutchLogo, alt: "IN2DUTCH", size: "h-5" },
  { src: ybgLogo, alt: "Your Bali Getaway", size: "h-14" },
];

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials: Testimonial[] =
    language === "fr"
      ? [
          {
            quote: [
              "J'ai travaillé avec Hugo sur quatre sites : Cross Border Translation, CBLIS, IN2DUTCH et Your Bali Getaway. Chacun d'eux est ressorti meilleur que ce que j'avais avant, y compris des sites que j'avais déjà payés à d'autres.",
              "La première chose, c'est qu'ils sont beaux. Épurés, modernes, professionnels. Ils ressemblent beaucoup plus aux entreprises que je veux présenter en ligne. Mais surtout, tout fonctionne. Ils sont rapides, ils s'affichent correctement sur mobile, les formulaires arrivent bien, et je n'ai rien eu qui casse au hasard après la mise en ligne.",
              "Sur Your Bali Getaway, Hugo a aussi construit un CMS pour que je puisse modifier moi-même les textes, les photos, les informations des villas, tout ce qui a besoin d'être mis à jour. J'apprécie vraiment de ne plus avoir à contacter quelqu'un et à payer pour le moindre petit changement.",
              "Le SEO faisait aussi partie du projet dès le départ, ce n'est pas quelque chose qui a été ajouté après.",
              "Le plus important pour moi, c'est qu'Hugo comprend aussi le business derrière le site. Il ne fait pas juste quelque chose de joli. Il faut que ça fonctionne vraiment pour l'entreprise, et c'est le cas. Je le recommande sans hésiter.",
            ],
            name: "Joel van Valkenhoef",
            role: "Fondateur : Cross Border Translation, CBLIS, IN2DUTCH, Your Bali Getaway",
            initials: "JV",
            brands,
          },
        ]
      : [
          {
            quote: [
              "I've worked with Hugo on four websites now, Cross Border Translation, CBLIS, IN2DUTCH and Your Bali Getaway. Every one of them came out better than what I had before, including websites I had already paid people to build.",
              "The first thing is just that they look good. Clean, modern, professional. They feel much more like the kind of companies I actually want to present online. But also, everything works. They're fast, they work properly on mobile, the forms come through, and I haven't had things randomly breaking after launch.",
              "With Your Bali Getaway, Hugo also built a CMS so I can just go in myself and change text, photos, villa information, whatever needs updating. I really like not having to contact someone and pay for every little change.",
              "SEO was also part of the build from the beginning, not something added afterwards.",
              "I think the main thing for me is that Hugo understands the business behind the website as well. He's not just making something that looks nice. It needs to actually work for the business, and it does. I'd definitely recommend him.",
            ],
            name: "Joel van Valkenhoef",
            role: "Founder: Cross Border Translation, CBLIS, IN2DUTCH, Your Bali Getaway",
            initials: "JV",
            brands,
          },
        ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".testimonial-card", {
        autoAlpha: 0,
        y: 56,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testimonial-card", start: "top 88%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [language] }
  );

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-28 md:py-36">
      <span className="text-ghost pointer-events-none absolute -left-4 top-12 hidden select-none font-display text-[12rem] font-black leading-none lg:block">
        04
      </span>

      <div className="section-container relative z-10">
        <SectionHeading
          index="04"
          label={language === "fr" ? "TÉMOIGNAGES" : "TESTIMONIALS"}
          align="center"
          title={language === "fr" ? "Ce Qu'en Disent Mes Clients" : "What Clients Say"}
          description={
            language === "fr"
              ? "Des sites qui ne sont pas seulement beaux : ils tiennent la route, ils restent modifiables et ils travaillent pour le business."
              : "Sites that do not only look good. They hold up, they stay editable, and they work for the business."
          }
        />

        {testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            data-cursor-hover
            className="testimonial-card group relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-card p-8 transition-colors duration-300 hover:border-primary/30 md:mt-20 md:p-14"
          >
            <Quote
              className="pointer-events-none absolute -left-3 -top-3 h-24 w-24 rotate-180 md:-left-5 md:-top-5 text-primary/10 md:h-40 md:w-40"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
              <blockquote className="space-y-5">
                {testimonial.quote.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className={
                      index === 0
                        ? "font-display text-xl font-semibold leading-relaxed text-foreground md:text-2xl"
                        : "leading-relaxed text-muted-foreground md:text-lg"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </blockquote>

              <footer className="flex flex-col gap-6 border-t border-white/10 pt-8 lg:justify-center lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-bold text-primary">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold leading-tight">{testimonial.name}</p>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    {language === "fr" ? "4 sites livrés" : "4 sites delivered"}
                  </p>
                  <div className="mt-5 grid grid-cols-4 gap-4 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-6">
                    {testimonial.brands.map((brand) => (
                      <div key={brand.alt} className="flex h-14 items-center">
                        <img
                          src={brand.src}
                          alt={brand.alt}
                          loading="lazy"
                          className={`${brand.size} w-auto max-w-full object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-90`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
