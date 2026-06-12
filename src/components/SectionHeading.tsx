import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

/** Editorial section header: ghost index, micro label, display title. */
const SectionHeading = ({ index, label, title, description, align = "left" }: SectionHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current!.children, {
        autoAlpha: 0,
        y: 44,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  const centered = align === "center";

  return (
    <div ref={ref} className={centered ? "flex flex-col items-center text-center" : ""}>
      <div className="flex items-center gap-4">
        <span className="font-display text-sm font-semibold tracking-widest text-primary">/{index}</span>
        <span className="h-px w-10 bg-primary/40" />
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">{label}</span>
      </div>

      <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight md:text-6xl">{title}</h2>

      {description && (
        <p className={`mt-5 max-w-2xl text-base text-muted-foreground md:text-lg ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
