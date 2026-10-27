import { formatSequenceNumber } from "@/utils/format-sequence-number";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CircleArrowDown,
  Pause,
  Play,
  StepForward,
  Videotape as Tape,
} from "lucide-react";
import Cassette from "./cassette";
import ProjectPreview from "./project-preview";
import type { PortfolioProject } from "./projects-data";
import { PLAYBACK_LABELS, type Playback } from "./use-project-playback";
import styles from "./projects.module.css";

interface ProjectPlayerStageProps {
  playerRef: RefObject<HTMLDivElement | null>;
  project: PortfolioProject | null;
  playback: Playback;
  activeIndex: number;
  total: number;
  reducedMotion: boolean;
  isDragging: boolean;
  isOverPlayer: boolean;
  onTogglePlayback: () => void;
  onEject: () => void;
}

export default function ProjectPlayerStage({
  playerRef,
  project,
  playback,
  activeIndex,
  total,
  reducedMotion,
  isDragging,
  isOverPlayer,
  onTogglePlayback,
  onEject,
}: ProjectPlayerStageProps) {
  const stateLabel = PLAYBACK_LABELS[playback];
  const tapeNumber = formatSequenceNumber(activeIndex + 1);
  const displayLabel = {
    empty: "NO TAPE",
    loading: "LOAD",
    paused: `PAUSE ${tapeNumber}`,
    playing: `PLAY ${tapeNumber}`,
  }[playback];

  return (
    <div
      ref={playerRef}
      className={`${styles.playerStage} ${isOverPlayer ? styles.dropActive : ""}`}
      data-player-drop-zone="true"
      role="group"
      aria-label="Tocador VHS: solte uma fita aqui"
      aria-describedby="tape-instructions"
    >
      <div className={styles.playerMeta}>
        <span>
          <span
            className={styles.statusLight}
            data-playing={playback === "playing"}
          />
          {stateLabel}
        </span>
        <span>
          FITA {project ? formatSequenceNumber(activeIndex + 1) : "--"} /{" "}
          {formatSequenceNumber(total)}
        </span>
      </div>
      <div className={styles.screenFrame}>
        <div className={styles.browserBar} aria-hidden="true">
          <i />
          <i />
          <i />
          <span>
            {project
              ? `${project.title.toLowerCase()} / preview`
              : "has video / standby"}
          </span>
        </div>
        <div className={styles.screenViewport} data-playback={playback}>
          <AnimatePresence initial={false}>
            {project ? (
              <motion.div
                key={project.id}
                className={styles.previewLayer}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.4 }}
              >
                <ProjectPreview project={project} />
              </motion.div>
            ) : (
              <div key="empty" className={styles.emptyScreen}>
                <Tape aria-hidden="true" />
                <strong>
                  APERTE O PLAY
                  <br />
                  NA PRÓXIMA IDEIA.
                </strong>
                <span>INSIRA UMA FITA PARA COMEÇAR</span>
              </div>
            )}
          </AnimatePresence>
          <div aria-hidden="true" className={styles.scanlines} />
          {playback === "loading" && (
            <div className={styles.loadingScreen} aria-hidden="true">
              <span>
                ▶ CARREGANDO FITA {formatSequenceNumber(activeIndex + 1)}
              </span>
              <div />
            </div>
          )}
          {playback === "paused" && (
            <span className={styles.pauseBadge}>
              <Pause size={12} aria-hidden="true" /> PAUSE
            </span>
          )}
        </div>
      </div>
      <div className={styles.deck}>
        <div className={styles.deckBrand} aria-hidden="true">
          <span>HAS / VIDEO</span>
          <i />
          <small>HI-FI STEREO</small>
        </div>
        <div className={styles.tapeSlot} aria-hidden="true">
          <span className={styles.slotLabel}>VHS · INSERT TAPE</span>
          <AnimatePresence initial={false}>
            {project && (
              <motion.div
                key={project.id}
                className={styles.insertedTape}
                initial={reducedMotion ? false : { y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={styles.insertedTapeSurface}>
                  <Cassette
                    project={project}
                    number={activeIndex + 1}
                    playing={playback === "playing"}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={styles.deckControls}>
          <span className={styles.digitalDisplay} aria-hidden="true">
            {displayLabel}
          </span>
          <button
            type="button"
            onClick={onTogglePlayback}
            disabled={!project || playback === "loading"}
            aria-label={
              playback === "paused"
                ? "Reproduzir apresentação"
                : "Pausar apresentação"
            }
          >
            {playback === "playing" ? (
              <Pause aria-hidden="true" />
            ) : (
              <Play aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={onEject}
            disabled={!project}
            aria-label="Ejetar fita"
          >
            <StepForward className={styles.ejectIcon} aria-hidden="true" />
          </button>
        </div>
      </div>
      {isDragging && (
        <div className={styles.dropPrompt} aria-hidden="true">
          <CircleArrowDown />
          <span>
            {isOverPlayer ? "SOLTE PARA DAR PLAY" : "ARRASTE ATÉ O TOCADOR"}
          </span>
        </div>
      )}
    </div>
  );
}
