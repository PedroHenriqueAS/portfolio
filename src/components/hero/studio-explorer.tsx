"use client";

import { useEffect, useRef } from "react";
import { Cat, Coffee, Keyboard, Monitor, Square, X } from "lucide-react";
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
      aria-label="Controles do estúdio"
    >
      <div className={styles.explorerHeading}>
        <div>
          <span>SEU PASSE PARA OS BASTIDORES</span>
          <h2>Explore o estúdio.</h2>
        </div>
        <button
          ref={closeExploreRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar controles do estúdio"
        >
          <X size={18} />
        </button>
      </div>
      <div className={styles.scenePreview}>
        <StudioScene {...scene} compact />
      </div>
      <p className={styles.explorerHint}>
        <span className={styles.desktopHint}>
          Toque nos objetos da cena ou experimente por aqui.
        </span>
        <span className={styles.mobileHint}>
          Use os controles para interagir com o estúdio.
        </span>
      </p>
      <div className={styles.explorerActions}>
        <button type="button" onClick={onTyping} aria-pressed={typing}>
          {typing ? <Square size={16} /> : <Keyboard size={18} />}
          <span>{typing ? "Pausar" : "Digitar"}</span>
        </button>
        <button type="button" onClick={onScreen}>
          <Monitor size={18} />
          <span>
            Trocar tela<small>{SCREEN_LABELS[screen]}</small>
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
              ? "Preparando…"
              : coffee !== "idle"
                ? "Pausa pro café"
                : "Tomar café"}
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
              ? "Chamando…"
              : cat === "awake"
                ? "Prrrr…"
                : "Fazer carinho"}
          </span>
        </button>
      </div>
      <p className={styles.explorerStatus}>{message}</p>
    </div>
  );
}
