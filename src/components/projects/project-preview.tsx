"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import type { PortfolioProject } from "./projects-data";
import PokedexPreview from "./previews/pokedex-preview";
import KanbanPreview from "./previews/kanban-preview";
import styles from "./previews/previews.module.css";

const previews = {
  pokedex: PokedexPreview,
  kanban: KanbanPreview,
};

function PreviewVideo({
  video,
  label,
  playing,
}: {
  video: NonNullable<PortfolioProject["previewVideo"]>;
  label: string;
  playing: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    if (playing && visible) {
      element.play().catch(() => {});
    } else {
      element.pause();
    }
  }, [playing, visible]);

  return (
    <video
      ref={videoRef}
      className={styles.previewImage}
      poster={video.poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}

export default function ProjectPreview({
  project,
  playing,
}: {
  project: PortfolioProject;
  playing: boolean;
}) {
  const { t } = useTranslation();
  if (project.previewVideo) {
    return (
      <PreviewVideo
        video={project.previewVideo}
        label={t("projects.previewAlt", { title: project.title })}
        playing={playing}
      />
    );
  }

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
      <div
        aria-hidden="true"
        className={project.inDevelopment ? styles.blurred : undefined}
      >
        <Preview />
      </div>
      {project.inDevelopment && (
        <div className={styles.comingSoon}>
          <span>{t("projects.inDevelopment")}</span>
          <strong>{t("projects.comingSoon")}</strong>
        </div>
      )}
    </div>
  );
}
