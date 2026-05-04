import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("bgd_lang") || "ro");

  useEffect(() => {
    localStorage.setItem("bgd_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || translations.ro;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
