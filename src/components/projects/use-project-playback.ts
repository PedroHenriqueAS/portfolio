"use client";

import { useEffect, useRef, useState } from "react";
import type { PortfolioProject } from "./projects-data";

export const PLAYBACK_LABELS = {
  playing: "projects.playback.playing",
  paused: "projects.playback.paused",
  loading: "projects.playback.loading",
  empty: "projects.playback.empty",
} as const;
export type Playback = keyof typeof PLAYBACK_LABELS;
const TAPE_LOAD_DELAY_MS = 650;

export function useProjectPlayback(
  projects: readonly PortfolioProject[],
  reducedMotion: boolean,
) {
  const [loadedId, setLoadedId] = useState<string | null>(
    projects[0]?.id ?? null,
  );
  const [playback, setPlayback] = useState<Playback>(
    projects.length ? "playing" : "empty",
  );
  const shelfRef = useRef<HTMLDivElement>(null);
  const loadTimer = useRef<number | null>(null);
  const activeIndex = projects.findIndex((project) => project.id === loadedId);
  const project = projects[activeIndex] ?? null;

  useEffect(
    () => () => {
      if (loadTimer.current !== null) window.clearTimeout(loadTimer.current);
    },
    [],
  );
  function clearLoadTimer() {
    if (loadTimer.current !== null) {
      window.clearTimeout(loadTimer.current);
      loadTimer.current = null;
    }
  }

  function loadTape(id: string) {
    const index = projects.findIndex((item) => item.id === id);
    if (index < 0) return;
    const shelf = shelfRef.current;
    const tape = shelf?.children.item(index);
    if (
      shelf &&
      tape instanceof HTMLElement &&
      shelf.scrollWidth > shelf.clientWidth
    ) {
      shelf.scrollTo({
        left:
          shelf.scrollLeft +
          tape.getBoundingClientRect().left -
          shelf.getBoundingClientRect().left -
          (shelf.clientWidth - tape.offsetWidth) / 2,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
    clearLoadTimer();
    setLoadedId(id);
    if (id === loadedId || reducedMotion) {
      setPlayback("playing");
      return;
    }
    setPlayback("loading");
    loadTimer.current = window.setTimeout(() => {
      setPlayback("playing");
      loadTimer.current = null;
    }, TAPE_LOAD_DELAY_MS);
  }

  function ejectTape() {
    clearLoadTimer();
    setLoadedId(null);
    setPlayback("empty");
  }

  function navigate(direction: -1 | 1) {
    if (!projects.length) return;
    if (activeIndex < 0) {
      const index = direction === 1 ? 0 : projects.length - 1;
      loadTape(projects[index].id);
      return;
    }
    const index = (activeIndex + direction + projects.length) % projects.length;
    loadTape(projects[index].id);
  }

  function togglePlayback() {
    if (!project || playback === "loading") return;
    setPlayback((current) => (current === "playing" ? "paused" : "playing"));
  }

  return {
    loadedId,
    playback,
    project,
    activeIndex,
    shelfRef,
    loadTape,
    ejectTape,
    navigate,
    togglePlayback,
  };
}
