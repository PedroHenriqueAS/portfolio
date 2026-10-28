"use client";

import { useTranslation } from "react-i18next";

import { formatSequenceNumber } from "@/utils/format-sequence-number";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Cassette from "./cassette";
import ProjectDetails from "./project-details";
import ProjectPlayerStage from "./project-player-stage";
import { getProjects } from "./projects-data";
import { PLAYBACK_LABELS, useProjectPlayback } from "./use-project-playback";
import { useTapeDrag } from "./use-tape-drag";
import styles from "./projects.module.css";

export default function ProjectsPlayer() {
  const { t } = useTranslation();
  const projects = getProjects(t);
  const reducedMotion = Boolean(useReducedMotion());
  const {
    loadedId,
    playback,
    project,
    activeIndex,
    shelfRef,
    loadTape,
    ejectTape,
    navigate,
    togglePlayback,
  } = useProjectPlayback(projects, reducedMotion);
  const { playerRef, dragging, isOverPlayer, dragX, dragY, getTapeHandlers } =
    useTapeDrag({ loadedId, onLoad: loadTape });
  const draggedProject = projects.find(
    (item) => item.id === dragging?.projectId,
  );
  const stateLabel = t(PLAYBACK_LABELS[playback]);

  return (
    <div className={styles.experience}>
      <p className="sr-only" role="status">
        {project
          ? t("projects.tapeStatus", {
              title: project.title,
              state: stateLabel,
              current: activeIndex + 1,
              total: projects.length,
            })
          : t("projects.ejected")}
      </p>
      <div className={styles.showcase}>
        <span className={styles.cornerTopLeft} aria-hidden="true" />
        <span className={styles.cornerTopRight} aria-hidden="true" />
        <span className={styles.cornerBottomLeft} aria-hidden="true" />
        <span className={styles.cornerBottomRight} aria-hidden="true" />
        <ProjectPlayerStage
          playerRef={playerRef}
          project={project}
          playback={playback}
          activeIndex={activeIndex}
          total={projects.length}
          reducedMotion={reducedMotion}
          isDragging={Boolean(dragging)}
          isOverPlayer={isOverPlayer}
          onTogglePlayback={togglePlayback}
          onEject={ejectTape}
        />
        <AnimatePresence initial={false}>
          <motion.div
            key={project?.id ?? "empty"}
            className={styles.detailsWrapper}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            <ProjectDetails project={project} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.shelfHeading}>
        <h3 className={styles.eyebrow}>{t("projects.chooseTape")}</h3>
        <div>
          <span>
            {project ? formatSequenceNumber(activeIndex + 1) : "--"} /{" "}
            {formatSequenceNumber(projects.length)}
          </span>
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={!projects.length}
            aria-label={t("projects.previous")}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            disabled={!projects.length}
            aria-label={t("projects.next")}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={shelfRef}
        className={styles.shelf}
        role="group"
        aria-label={t("projects.tapesLabel")}
      >
        {projects.map((item, index) => {
          const isLoaded = item.id === loadedId;
          return (
            <button
              key={item.id}
              type="button"
              draggable={false}
              aria-label={t(
                isLoaded ? "projects.playTape" : "projects.loadTape",
                { title: item.title },
              )}
              aria-pressed={isLoaded}
              aria-describedby="tape-instructions"
              data-tape-id={item.id}
              className={`${styles.tapeButton} ${isLoaded ? styles.tapeLoaded : ""} ${dragging?.projectId === item.id ? styles.tapeDragging : ""}`}
              {...getTapeHandlers(item.id)}
            >
              <Cassette project={item} number={index + 1} />
              {isLoaded && (
                <span className={styles.loadedOverlay} aria-hidden="true">
                  <span>
                    <Play size={16} />
                  </span>
                  <strong>{item.title}</strong>
                  <small>{t("projects.loaded")}</small>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className={styles.shelfFooter}>
        <p id="tape-instructions">
          <span className={styles.pointerInstructions}>
            {t("projects.pointerHint")}
          </span>
          <span className={styles.touchInstructions}>
            {t("projects.touchHint")}
          </span>
          <span className="sr-only"> {t("projects.keyboardHint")} </span>
        </p>
        <div className={styles.pagination} aria-hidden="true">
          {projects.map((item) => (
            <span key={item.id} data-active={item.id === loadedId} />
          ))}
        </div>
        <span className={styles.collectionLabel}>
          {t("projects.collection")}
        </span>
      </div>

      {dragging &&
        draggedProject &&
        createPortal(
          <motion.div
            className={styles.dragGhost}
            aria-hidden="true"
            style={{ x: dragX, y: dragY, width: dragging.width }}
            initial={{ rotate: -6, scale: 1.03 }}
            animate={{
              rotate: isOverPlayer ? 0 : -6,
              scale: isOverPlayer ? 0.92 : 1.03,
            }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
          >
            <Cassette
              project={draggedProject}
              number={projects.indexOf(draggedProject) + 1}
            />
          </motion.div>,
          document.body,
        )}
    </div>
  );
}
