import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Code, Rocket } from "lucide-react";
const steps = [{
  number: "01",
  icon: Search,
  title: "Discovery",
  description: "Understanding your business goals, target audience, and project requirements."
}, {
  number: "02",
  icon: PenTool,
  title: "Design",
  description: "Creating wireframes and visual designs that align with your brand identity."
}, {
  number: "03",
  icon: Code,
  title: "Development",
  description: "Building responsive, performant websites with modern animations and clean code."
}, {
  number: "04",
  icon: Rocket,
  title: "Launch",
  description: "Thorough testing, optimization, and seamless deployment of your new site."
}];
const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section className="py-32 relative overflow-hidden bg-muted/30">
      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full -translate-y-1/2" />

      <div ref={ref} className="section-container relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="text-center mb-20">
          <span className="text-primary font-medium text-sm tracking-wide uppercase">WORKFLOW        </span>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 animated-underline ${isInView ? 'in-view' : ''}`}>My Process</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A structured approach to ensure every project is delivered with excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((step, index) => <motion.div key={step.number} initial={{
          opacity: 0,
          y: 40,
          scale: 0.9
        }} animate={isInView ? {
          opacity: 1,
          y: 0,
          scale: 1
        } : {}} transition={{
          delay: index * 0.15,
          duration: 0.6,
          ease: "easeOut"
        }} className="relative group">
              {/* Step card */}
              <div className="text-center">
                {/* Number badge */}
                <motion.div initial={{
              scale: 0
            }} animate={isInView ? {
              scale: 1
            } : {}} transition={{
              delay: 0.3 + index * 0.15,
              duration: 0.4,
              type: "spring"
            }} className="relative inline-flex items-center justify-center mb-6">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110" />
                  
                  {/* Icon container */}
                  <div className="relative w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Step number */}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Arrow indicator for mobile/tablet */}
              {index < steps.length - 1 && <div className="lg:hidden flex justify-center my-6">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                </div>}
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default ProcessSection;