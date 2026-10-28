"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./navbar.module.css";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const english = i18n.resolvedLanguage === "en";

  return (
    <button
      type="button"
      className={styles.languageButton}
      aria-label={t("nav.switchLanguage")}
      title={t("nav.switchLanguage")}
      onClick={() => {
        void i18n.changeLanguage(english ? "pt" : "en");
      }}
    >
      <Languages size={16} aria-hidden="true" />
      <span aria-hidden="true">{english ? "EN" : "PT"}</span>
    </button>
  );
}
