import { Language } from "@/i18n/translations";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  currentLang: Language;
  onSwitch: (lang: Language) => void;
}

const LanguageSwitch = ({ currentLang, onSwitch }: LanguageSwitchProps) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-muted rounded-full p-1 sm:p-2">
      <button
        type="button"
        onClick={() => onSwitch("en")}
        className={cn(
          "px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg md:text-xl font-semibold transition-all",
          currentLang === "en"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => onSwitch("ml")}
        className={cn(
          "px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg md:text-xl font-semibold transition-all",
          currentLang === "ml"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Malayalam
      </button>
    </div>
  );
};

export default LanguageSwitch;
