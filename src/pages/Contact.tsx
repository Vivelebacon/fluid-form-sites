import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  projectType: z.string().optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
  // Honeypot field
  website: z.string().max(0, "Bot detected").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  "New Website",
  "Website Redesign",
  "Landing Page",
  "E-commerce",
  "Web Application",
  "Other",
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.website) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Using Formspree for form submission
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || "Not provided",
          projectType: data.projectType || "Not specified",
          message: data.message,
          _subject: `New inquiry — HugoWebDesign.com — ${data.name}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 py-6 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="section-container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </motion.div>

      <div className="pt-32 pb-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left side - Header & Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Let's work
                <br />
                <span className="gradient-text">together</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Ready to bring your vision to life? I'd love to hear about your project. 
                Fill out the form and I'll get back to you within 24 hours.
              </p>

              {/* Contact info sidebar */}
              <div className="space-y-6 p-6 rounded-2xl bg-muted/30 border border-border/50">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Direct Contact
                </h3>
                <a
                  href="mailto:contact@hugowebdesign.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">contact@hugowebdesign.com</span>
                </a>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-12 rounded-3xl bg-muted/30 border border-border/50 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Message Sent!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thanks! I'll get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitStatus("idle")}
                    variant="outline"
                    className="rounded-full"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 md:p-12 rounded-3xl bg-muted/30 border border-border/50 space-y-6"
                >
                  {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3"
                >
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <p className="text-sm text-destructive">
                        Something went wrong. Please try again or email me directly.
                      </p>
                    </motion.div>
                  )}

                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    {...register("website")}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Email row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="John Doe"
                        className={cn(
                          "h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors",
                          errors.name && "border-destructive focus:border-destructive"
                        )}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@company.com"
                        className={cn(
                          "h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors",
                          errors.email && "border-destructive focus:border-destructive"
                        )}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Company <span className="text-muted-foreground text-xs">(optional)</span>
                    </Label>
                    <Input
                      id="company"
                      {...register("company")}
                      placeholder="Your company name"
                      className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Project Type <span className="text-muted-foreground text-xs">(optional)</span>
                    </Label>
                    <Select onValueChange={(value) => setValue("projectType", value)}>
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Tell me about your project, goals, and timeline..."
                      rows={5}
                      className={cn(
                        "rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors resize-none",
                        errors.message && "border-destructive focus:border-destructive"
                      )}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 btn-glow"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    I typically respond within 24 hours.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
