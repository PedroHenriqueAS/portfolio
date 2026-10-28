"use client";

import { useTranslation } from "react-i18next";

import type { ReactNode } from "react";
import HeroFooter from "./hero-footer";
import StudioScene from "./studio-scene";
import StudioExplorer from "./studio-explorer";
import { useStudio } from "./use-studio";
import styles from "./studio.module.css";

interface HeroStudioProps {
  header: ReactNode;
  title: ReactNode;
  intro: ReactNode;
}

export default function HeroStudio({ header, title, intro }: HeroStudioProps) {
  const { t } = useTranslation();
  const {
    sectionRef,
    exploreRef,
    soundEnabled,
    soundError,
    message,
    scene,
    toggleSound,
    toggleExplorer,
    closeExplorer,
  } = useStudio();
  const { lightsOn, exploring, typing, screen, coffee, cat } = scene;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label={t("hero.label")}
      className={styles.hero}
      data-theme={scene.theme}
      data-lights={lightsOn ? "on" : "off"}
      data-typing={typing}
      data-screen={screen}
      data-sound={soundEnabled}
      data-coffee={coffee}
      data-cat={cat}
      onKeyDown={(event) => {
        if (event.key === "Escape" && exploring) {
          event.preventDefault();
          closeExplorer();
        }
      }}
    >
      <div className={styles.sceneLayer}>
        <StudioScene {...scene} />
      </div>
      <div className={styles.readability} aria-hidden="true" />
      <div className={styles.content}>
        {header}
        <div className={styles.body}>
          {title}
          {intro}
          <HeroFooter
            theme={scene.theme}
            themeLoading={scene.themeLoading}
            lightsOn={lightsOn}
            soundEnabled={soundEnabled}
            exploring={exploring}
            exploreRef={exploreRef}
            onLight={scene.onLight}
            onTheme={scene.onTheme}
            onSound={toggleSound}
            onExplore={toggleExplorer}
          >
            {exploring && (
              <StudioExplorer
                scene={scene}
                message={soundError || message}
                onClose={closeExplorer}
              />
            )}
          </HeroFooter>
          {soundError && !exploring && (
            <p className={styles.soundError}>{soundError}</p>
          )}
          <p className="sr-only" role="status" aria-live="polite">
            {soundError || message}
          </p>
        </div>
      </div>
    </section>
  );
}
