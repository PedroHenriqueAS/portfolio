"use client";

import { useTranslation } from "react-i18next";

import {
  Lightbulb,
  LightbulbOff,
  MapPin,
  Moon,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { ReactNode, RefObject } from "react";
import type { StudioTheme } from "./studio-data";
import styles from "./studio.module.css";

interface HeroFooterProps {
  theme: StudioTheme;
  themeLoading: boolean;
  lightsOn: boolean;
  soundEnabled: boolean;
  exploring: boolean;
  exploreRef: RefObject<HTMLButtonElement | null>;
  onLight: () => void;
  onTheme: () => void;
  onSound: () => void;
  onExplore: () => void;
  children: ReactNode;
}

export default function HeroFooter({
  theme,
  themeLoading,
  lightsOn,
  soundEnabled,
  exploring,
  exploreRef,
  onLight,
  onTheme,
  onSound,
  onExplore,
  children,
}: HeroFooterProps) {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      {children}
      <p className={styles.location}>
        <MapPin className={styles.locationIcon} /> {t("hero.location")}
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
          {t("studio.explore")}
        </button>
        <button
          type="button"
          className={`${styles.controlButton} ${styles.themeButton}`}
          aria-label={
            theme === "day" ? t("studio.enableNight") : t("studio.enableDay")
          }
          aria-pressed={theme === "day"}
          aria-busy={themeLoading}
          disabled={themeLoading}
          onClick={onTheme}
        >
          <span className={styles.themeIcon} aria-hidden="true">
            <Moon size={17} className={styles.nightIcon} />
            <Sun size={18} className={styles.dayIcon} />
          </span>
          {themeLoading
            ? t("studio.dawn")
            : t(theme === "day" ? "studio.themeDay" : "studio.themeNight")}
        </button>
        <button
          type="button"
          className={styles.controlButton}
          aria-label={lightsOn ? t("studio.lightOff") : t("studio.lightOn")}
          aria-pressed={lightsOn}
          onClick={onLight}
        >
          {lightsOn ? (
            <Lightbulb size={18} aria-hidden="true" />
          ) : (
            <LightbulbOff size={18} aria-hidden="true" />
          )}{" "}
          {t("studio.light")}
        </button>
        <button
          type="button"
          className={styles.controlButton}
          aria-label={soundEnabled ? t("studio.soundOff") : t("studio.soundOn")}
          aria-pressed={soundEnabled}
          onClick={onSound}
        >
          {soundEnabled ? (
            <Volume2 size={18} aria-hidden="true" />
          ) : (
            <VolumeX size={18} aria-hidden="true" />
          )}{" "}
          {t("studio.sound")}
        </button>
      </div>
    </footer>
  );
}
