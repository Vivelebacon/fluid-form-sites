import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const HeroSection = () => {
  const navigate = useNavigate();
  const [canRenderSpline, setCanRenderSpline] = useState(false);
  const [isSplineVisible, setIsSplineVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);
  const rafRef = useRef<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 24, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 24, mass: 0.6 });

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
    setIsFinePointer(!isCoarsePointer);

    if (!enableSpline) {
      setIsSplineVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setIsSplineVisible(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleHeroMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!canRenderSpline || !isFinePointer) return;
    if (rafRef.current !== null) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    rafRef.current = window.requestAnimationFrame(() => {
      mouseX.set(x);
      mouseY.set(y);
      rafRef.current = null;
    });
  };

  const resetHeroMouseOffset = () => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative min-h-[120vh] md:min-h-[130vh] flex items-center justify-center overflow-hidden animated-gradient"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={resetHeroMouseOffset}
    >
      {/* Enhanced parallax gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]"
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]"
          animate={{
            x: [0, -60, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-primary/8 blur-[60px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Additional subtle orb */}
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] rounded-full bg-primary/6 blur-[70px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid overlay with parallax */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {canRenderSpline && isSplineVisible ? (
        <motion.div
          className="absolute inset-x-0 top-8 -bottom-20 z-[6] translate-y-2 md:translate-y-10 will-change-transform"
          style={{ x: springX, y: springY }}
        >
          <Suspense fallback={<div className="h-full w-full" />}>
            <Spline scene="https://prod.spline.design/qLLBTAGjsewH6gkR/scene.splinecode" />
          </Suspense>
        </motion.div>
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
