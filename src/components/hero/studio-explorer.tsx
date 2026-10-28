"use client";

import { useTranslation } from "react-i18next";

import { useEffect, useRef } from "react";
import {
  Cat,
  Coffee,
  Keyboard,
  Monitor,
  Square,
  Sun,
  Moon,
  X,
} from "lucide-react";
import StudioScene, { type StudioSceneProps } from "./studio-scene";
import { SCREEN_LABELS } from "./studio-data";
import styles from "./studio.module.css";

interface StudioExplorerProps {
  scene: StudioSceneProps;
  message: string;
  onClose: () => void;
}

export default function StudioExplorer({
  scene,
  message,
  onClose,
}: StudioExplorerProps) {
  const { t } = useTranslation();
  const closeExploreRef = useRef<HTMLButtonElement>(null);
  const { typing, screen, coffee, cat, onTyping, onScreen, onCoffee, onCat } =
    scene;
  useEffect(() => {
    closeExploreRef.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div
      id="studio-explorer"
      className={styles.explorer}
      role="group"
      aria-label={t("studio.controls")}
    >
      <div className={styles.explorerHeading}>
        <div>
          <span>{t("studio.backstage")}</span>
          <h2>{t("studio.exploreHeading")}</h2>
        </div>
        <button
          ref={closeExploreRef}
          type="button"
          onClick={onClose}
          aria-label={t("studio.closeControls")}
        >
          <X size={18} />
        </button>
      </div>
      <div className={styles.scenePreview}>
        <StudioScene {...scene} compact />
      </div>
      <p className={styles.explorerHint}>
        <span className={styles.desktopHint}>{t("studio.desktopHint")} </span>
        <span className={styles.mobileHint}>{t("studio.mobileHint")} </span>
      </p>
      <div className={styles.explorerActions}>
        <button
          type="button"
          className={styles.themeAction}
          onClick={scene.onTheme}
          aria-pressed={scene.theme === "day"}
          aria-busy={scene.themeLoading}
          disabled={scene.themeLoading}
        >
          {scene.theme === "day" ? <Moon size={18} /> : <Sun size={18} />}
          <span>
            {scene.themeLoading
              ? t("studio.dawn")
              : scene.theme === "day"
                ? t("studio.bringNight")
                : t("studio.bringSun")}
          </span>
        </button>
        <button type="button" onClick={onTyping} aria-pressed={typing}>
          {typing ? <Square size={16} /> : <Keyboard size={18} />}
          <span>{typing ? t("studio.pause") : t("studio.type")}</span>
        </button>
        <button type="button" onClick={onScreen}>
          <Monitor size={18} />
          <span>
            {t("studio.changeScreen")}
            <small>{t(SCREEN_LABELS[screen])}</small>
          </span>
        </button>
        <button
          type="button"
          onClick={onCoffee}
          aria-disabled={coffee !== "idle"}
          aria-busy={coffee === "loading"}
          data-studio-action="coffee"
        >
          <Coffee size={18} />
          <span>
            {coffee === "loading"
              ? t("studio.coffeePreparing")
              : coffee !== "idle"
                ? t("studio.coffeeBreak")
                : t("studio.drinkCoffee")}
          </span>
        </button>
        <button
          type="button"
          onClick={onCat}
          aria-disabled={cat !== "idle"}
          aria-busy={cat === "loading"}
          data-studio-action="cat"
        >
          <Cat size={18} />
          <span>
            {cat === "loading"
              ? t("studio.callingCat")
              : cat === "awake"
                ? t("studio.purr")
                : t("studio.petCat")}
          </span>
        </button>
      </div>
      <p className={styles.explorerStatus}>{message}</p>
    </div>
  );
}
