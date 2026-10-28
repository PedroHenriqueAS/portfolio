"use client";

import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";
import { useEffect, useState, type ReactNode } from "react";
import { resources } from "./resources";

const STORAGE_KEY = "portfolio-language";

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [i18n] = useState(() => {
    const instance = createInstance();
    void instance.init({
      resources,
      lng: "pt",
      fallbackLng: "pt",
      supportedLngs: ["pt", "en"],
      initAsync: false,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
    return instance;
  });

  useEffect(() => {
    const syncLanguage = () => {
      const language = i18n.resolvedLanguage === "en" ? "en" : "pt";
      document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
      document.title = i18n.t("meta.title");
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", i18n.t("meta.description"));
      try {
        localStorage.setItem(STORAGE_KEY, language);
      } catch {
        return;
      }
    };

    let savedLanguage: string | null = null;
    try {
      savedLanguage = localStorage.getItem(STORAGE_KEY);
    } catch {
      savedLanguage = null;
    }
    i18n.on("languageChanged", syncLanguage);
    if (savedLanguage === "en" || savedLanguage === "pt") {
      void i18n.changeLanguage(savedLanguage);
    } else {
      syncLanguage();
    }
    return () => {
      i18n.off("languageChanged", syncLanguage);
    };
  }, [i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
