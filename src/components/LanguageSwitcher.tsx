import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

const options = [
  { code: "en" as const, label: "EN" },
  { code: "fr" as const, label: "FR" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-border/60 bg-background/70 p-1 backdrop-blur-sm">
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
            language === option.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={language === option.code}
          aria-label={`Switch language to ${option.label}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
