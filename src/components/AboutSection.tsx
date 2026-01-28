import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Palette, Smartphone, Zap, Settings } from "lucide-react";
import hugoProfile from "@/assets/hugo-profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const { t } = useLanguage();

  const services = [
    {
      icon: Monitor,
      title: t("about.service1.title"),
      description: t("about.service1.description")
    },
    {
      icon: Palette,
      title: t("about.service2.title"),
      description: t("about.service2.description")
    },
    {
      icon: Smartphone,
      title: t("about.service3.title"),
      description: t("about.service3.description")
    },
    {
      icon: Zap,
      title: t("about.service4.title"),
      description: t("about.service4.description")
    },
    {
      icon: Settings,
      title: t("about.service5.title"),
      description: t("about.service5.description")
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-3xl rounded-full" />

      <div ref={ref} className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-72 md:w-80 lg:w-96">
              {/* Animated glow behind image */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-3xl blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Profile image container */}
              <div className="profile-container aspect-square">
                <img
                  src={hugoProfile}
                  alt="Hugo Megardon - Freelance Web Designer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-primary font-medium text-sm tracking-wide uppercase">
              {t("about.label")}
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mt-4 mb-6 animated-underline ${isInView ? 'in-view' : ''}`}>
              {t("about.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("about.description")}
            </p>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-300 hover-bounce"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
