"use client";

import { useTranslation } from "react-i18next";

import Image from "next/image";
import type { PortfolioProject } from "./projects-data";
import StorePreview from "./previews/store-preview";
import PokedexPreview from "./previews/pokedex-preview";
import KanbanPreview from "./previews/kanban-preview";
import styles from "./previews/previews.module.css";

const previews = {
  store: StorePreview,
  pokedex: PokedexPreview,
  kanban: KanbanPreview,
};

export default function ProjectPreview({
  project,
}: {
  project: PortfolioProject;
}) {
  const { t } = useTranslation();
  if (project.previewImage) {
    return (
      <Image
        src={project.previewImage}
        alt={t("projects.previewAlt", { title: project.title })}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className={styles.previewImage}
      />
    );
  }

  const Preview = project.preview ? previews[project.preview] : null;
  if (!Preview) {
    return (
      <div className={styles.placeholder}>
        <span>{project.category}</span>
        <strong>{project.title}</strong>
        <p>{t("projects.previewSoon")}</p>
      </div>
    );
  }

  return (
    <div
      className={styles.preview}
      role="img"
      aria-label={t("projects.previewLabel", { title: project.title })}
    >
      <div aria-hidden="true">
        <Preview />
      </div>
    </div>
  );
}
