"use client";

import { formatSequenceNumber } from "@/utils/format-sequence-number";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Cassette from "./cassette";
import ProjectDetails from "./project-details";
import ProjectPlayerStage from "./project-player-stage";
import { projects } from "./projects-data";
import { PLAYBACK_LABELS, useProjectPlayback } from "./use-project-playback";
import { useTapeDrag } from "./use-tape-drag";
import styles from "./projects.module.css";

export default function ProjectsPlayer() {
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
  const stateLabel = PLAYBACK_LABELS[playback];

  return (
    <div className={styles.experience}>
      <p className="sr-only" role="status">
        {project
          ? `${project.title}. ${stateLabel}. Fita ${activeIndex + 1} de ${projects.length}.`
          : "Fita ejetada. Selecione ou arraste outra fita para o tocador."}
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
        <h3 className={styles.eyebrow}>ESCOLHA UMA FITA</h3>
        <div>
          <span>
            {project ? formatSequenceNumber(activeIndex + 1) : "--"} /{" "}
            {formatSequenceNumber(projects.length)}
          </span>
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={!projects.length}
            aria-label="Projeto anterior"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            disabled={!projects.length}
            aria-label="Próximo projeto"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={shelfRef}
        className={styles.shelf}
        role="group"
        aria-label="Fitas de projetos"
      >
        {projects.map((item, index) => {
          const isLoaded = item.id === loadedId;
          return (
            <button
              key={item.id}
              type="button"
              draggable={false}
              aria-label={`${isLoaded ? "Reproduzir" : "Carregar"} fita ${item.title}`}
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
                  <small>NO APARELHO</small>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className={styles.shelfFooter}>
        <p id="tape-instructions">
          <span className={styles.pointerInstructions}>
            Arraste uma fita até o aparelho ou clique para reproduzir.
          </span>
          <span className={styles.touchInstructions}>
            Toque para reproduzir. Deslize para ver as fitas ou arraste até o
            tocador.
          </span>
          <span className="sr-only">
            {" "}
            Use Tab e Enter para selecionar. Escape cancela o arraste.
          </span>
        </p>
        <div className={styles.pagination} aria-hidden="true">
          {projects.map((item) => (
            <span key={item.id} data-active={item.id === loadedId} />
          ))}
        </div>
        <span className={styles.collectionLabel}>UMA FITA, UMA HISTÓRIA.</span>
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
