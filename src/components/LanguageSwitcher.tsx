import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded transition-colors ${
          language === "en"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-muted-foreground/50">|</span>
      <button
        onClick={() => setLanguage("fr")}
        className={`px-2 py-1 rounded transition-colors ${
          language === "fr"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Passer en français"
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
