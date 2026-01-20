import { useParams, useNavigate } from "react-router-dom";
import { translations, Language, Translations } from "@/i18n/translations";

export const useLanguage = () => {
  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();

  const currentLang: Language = (lang === "en" || lang === "ml") ? lang : "ml";
  const t: Translations = translations[currentLang];

  const switchLanguage = (newLang: Language) => {
    navigate(`/${newLang}`);
  };

  return {
    lang: currentLang,
    t,
    switchLanguage,
  };
};
