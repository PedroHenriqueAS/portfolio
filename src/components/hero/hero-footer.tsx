import { MapPin, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import styles from "./studio.module.css";

interface HeroFooterProps {
  lightsOn: boolean;
  soundEnabled: boolean;
  exploring: boolean;
  exploreRef: RefObject<HTMLButtonElement | null>;
  onLight: () => void;
  onSound: () => void;
  onExplore: () => void;
  children: ReactNode;
}

export default function HeroFooter({
  lightsOn,
  soundEnabled,
  exploring,
  exploreRef,
  onLight,
  onSound,
  onExplore,
  children,
}: HeroFooterProps) {
  return (
    <footer className={styles.footer}>
      {children}
      <p className={styles.location}>
        <MapPin className="shrink-0 text-purple-400" /> São Paulo, SP | desde
        2019
      </p>
      <div className={styles.controls}>
        <button
          ref={exploreRef}
          type="button"
          className={styles.exploreButton}
          aria-expanded={exploring}
          aria-controls={exploring ? "studio-explorer" : undefined}
          onClick={onExplore}
        >
          Explore o estúdio
        </button>
        <button
          type="button"
          className={styles.controlButton}
          aria-label={lightsOn ? "Apagar luz" : "Acender luz"}
          aria-pressed={lightsOn}
          onClick={onLight}
        >
          {lightsOn ? (
            <Sun size={18} aria-hidden="true" />
          ) : (
            <Moon size={18} aria-hidden="true" />
          )}{" "}
          Luz
        </button>
        <button
          type="button"
          className={styles.controlButton}
          aria-label={soundEnabled ? "Desativar som" : "Ativar som"}
          aria-pressed={soundEnabled}
          onClick={onSound}
        >
          {soundEnabled ? (
            <Volume2 size={18} aria-hidden="true" />
          ) : (
            <VolumeX size={18} aria-hidden="true" />
          )}{" "}
          Som
        </button>
      </div>
    </footer>
  );
}
