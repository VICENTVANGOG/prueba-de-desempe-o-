import React, { createContext, useEffect, useState } from "react";
import en from "./locale/en"; 
import es from "./locale/es"; 

interface Translation {
  [key: string]: string | Translation; 
}

interface I18nContextValue {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string; 
}

export const I18nContext = createContext<I18nContextValue | null>(null);

const supportedLanguages = ["en", "es"];
const defaultLanguage = "en";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(defaultLanguage);

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    const browserLang = navigator.language.split("-")[0];

    if (storedLang && supportedLanguages.includes(storedLang)) {
      setLanguage(storedLang);
    } else if (supportedLanguages.includes(browserLang)) {
      setLanguage(browserLang);
    } else {
      setLanguage(defaultLanguage);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  const translations: { [key in string]: Translation } = {
    en,
    es,
  };

  const t = (key: string): string => {
    const keys = key.toString().split(".");
    let value: Translation | undefined = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k] as Translation; 
      } else {
        return ""; 
      }
    }

    return typeof value === "string" ? value : ""; 
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
