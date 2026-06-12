import { useLanguage } from "@/i18n";

const ITEMS = {
  en: ["UI / UX Design", "Web Design", "Responsive Layouts", "Modern Animations", "Performance", "Clean Code"],
  fr: ["Design UI / UX", "Web Design", "Responsive Layouts", "Animations modernes", "Performance", "Code propre"],
};

/** Infinite scrolling skill strip between hero and about. */
const Marquee = () => {
  const { language } = useLanguage();
  const items = ITEMS[language];

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-card/30 py-5" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="px-6 font-display text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground md:text-base">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
