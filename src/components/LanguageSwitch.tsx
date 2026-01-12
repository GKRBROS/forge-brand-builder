import { Language } from "@/i18n/translations";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  currentLang: Language;
  onSwitch: (lang: Language) => void;
}

const LanguageSwitch = ({ currentLang, onSwitch }: LanguageSwitchProps) => {
  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1">
      <button
        type="button"
        onClick={() => onSwitch("en")}
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium transition-all",
          currentLang === "en"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onSwitch("ml")}
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium transition-all",
          currentLang === "ml"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        ML
      </button>
    </div>
  );
};

export default LanguageSwitch;
