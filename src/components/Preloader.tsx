import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const INTRO_KEY = "hwd:intro";

type PreloaderProps = {
  onComplete: () => void;
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const finish = () => {
        window.sessionStorage.setItem(INTRO_KEY, "1");
        onComplete();
      };

      if (prefersReducedMotion()) {
        finish();
        return;
      }

      const counter = { value: 0 };

      const tl = gsap.timeline();
      tl.to(".preloader-name span", {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.035,
        ease: "power4.out",
      })
        .to(
          counter,
          {
            value: 100,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
              }
            },
          },
          "<0.1"
        )
        .to(".preloader-bar-fill", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, "<")
        .add(finish, "+=0.15")
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        })
        .set(rootRef.current, { display: "none" });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background"
      aria-hidden="true"
    >
      <p className="preloader-name overflow-hidden font-display text-2xl font-bold uppercase tracking-[0.25em] md:text-3xl">
        {"HUGO MEGARDON".split("").map((char, i) => (
          <span key={i} className="inline-block translate-y-full">
            {char === " " ? " " : char}
          </span>
        ))}
      </p>

      <div className="mt-8 h-px w-48 overflow-hidden bg-border md:w-64">
        <div className="preloader-bar-fill h-full w-full origin-left scale-x-0 bg-primary" />
      </div>

      <span
        ref={counterRef}
        className="mt-4 font-display text-sm font-medium tabular-nums tracking-[0.3em] text-muted-foreground"
      >
        000
      </span>
    </div>
  );
};

export default Preloader;
