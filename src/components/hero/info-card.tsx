"use client";

import { useTranslation } from "react-i18next";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./studio.module.css";

export default function InfoCard() {
  const { t } = useTranslation();
  return (
    <div className={styles.introCard}>
      <p className={styles.introRole}>{t("hero.role")}</p>
      <p className={styles.introName}>{t("hero.introduction")}</p>
      <p className={styles.introDescription}>{t("hero.description")}</p>
      <a href="#projetos" className={styles.projectsLink}>
        {t("hero.projects")}
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
      <a href="#contato" className={styles.conversationLink}>
        {t("hero.contact")}
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
