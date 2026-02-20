import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [canRenderSpline, setCanRenderSpline] = useState(false);
  const [isSplineVisible, setIsSplineVisible] = useState(false);
  const [is3DEnabled, setIs3DEnabled] = useState(false);

  const scrollToWork = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToContact = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 900px)").matches;
    const isLowCpu = navigator.hardwareConcurrency <= 4;
    const saveDataEnabled = connection.connection?.saveData === true;

    const enableSpline = !prefersReducedMotion && !isCoarsePointer && !isSmallScreen && !isLowCpu && !saveDataEnabled;
    setCanRenderSpline(enableSpline);

    if (!enableSpline || !is3DEnabled) {
      setIsSplineVisible(false);
      return;
    }
    const scheduleVisible = () => {
      const timer = window.setTimeout(() => setIsSplineVisible(true), 900);
      return () => window.clearTimeout(timer);
    };

    if ("requestIdleCallback" in window) {
      const idleId = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
        () => setIsSplineVisible(true)
      );
      const fallbackCleanup = scheduleVisible();
      return () => {
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
        fallbackCleanup();
      };
    }

    return scheduleVisible();
  }, [is3DEnabled]);

  return (
    <section className="relative min-h-[120vh] md:min-h-[130vh] flex items-center justify-center overflow-hidden animated-gradient">
      {/* Enhanced parallax gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[85px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[320px] w-[320px] rounded-full bg-primary/5 blur-[70px]" />
        <div className="absolute top-1/2 right-1/3 h-[260px] w-[260px] rounded-full bg-primary/8 blur-[55px]" />
        <div className="absolute bottom-1/3 left-1/3 h-[220px] w-[220px] rounded-full bg-primary/6 blur-[60px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {canRenderSpline && isSplineVisible ? (
        <div className="absolute inset-x-0 top-8 -bottom-20 z-[6] translate-y-2 md:translate-y-10">
          <iframe
            src="https://my.spline.design/qLLBTAGjsewH6gkR/"
            title="Hero 3D background"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-x-0 top-8 -bottom-20 z-[6] translate-y-2 md:translate-y-10 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent" />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="relative z-20 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block px-4 py-2 mb-8 text-sm font-medium text-primary border border-primary/30 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Freelance Web Designer
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Modern Websites
            <br />
            <span className="gradient-text">Designed to Perform</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I design clean, modern, and high-performing websites for businesses
            that want to stand out.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {!is3DEnabled && canRenderSpline && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIs3DEnabled(true)}
                className="group relative overflow-hidden px-8 py-6 text-lg font-medium rounded-full border-primary/30 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 btn-glow"
              >
                Enable 3D background
              </Button>
            )}
            <Button
              size="lg"
              onClick={scrollToWork}
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 btn-glow"
            >
              <span className="relative z-10">View my work</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={goToContact}
              className="group relative overflow-hidden px-8 py-6 text-lg font-medium rounded-full border-muted-foreground/30 text-foreground hover:bg-transparent hover:border-muted-foreground/30 hover:text-foreground transition-all duration-300 btn-glow"
            >
              Get in touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
