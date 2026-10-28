"use client";

import { useTranslation } from "react-i18next";

import { instrumentSerif, inter } from "@/utils/fonts";
import ProjectsPlayer from "./projects-player";
import styles from "./projects.module.css";

export default function ProjectsSection() {
  const { t } = useTranslation();
  return (
    <section
      id="projetos"
      aria-labelledby="projects-heading"
      className={styles.section}
    >
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>{t("projects.eyebrow")}</p>
        <h2 id="projects-heading" className={styles.heading}>
          <span className={inter.className}>{t("projects.title")} </span>
          <span className={instrumentSerif.className}>
            {t("projects.titleAccent")}
          </span>
        </h2>
        <div className={styles.headerBottom}>
          <p>{t("projects.subtitle")}</p>
          <span>{t("projects.archive")}</span>
        </div>
      </header>
      <ProjectsPlayer />
    </section>
  );
}
