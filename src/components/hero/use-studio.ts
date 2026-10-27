"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  SCREEN_LABELS,
  STUDIO_CODE,
  STUDIO_SCREENS,
  type StudioScreen,
} from "./studio-data";
import { useStudioSound } from "./use-studio-sound";
import { useStudioMoments } from "./use-studio-moments";

export function useStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const [lightsOn, setLightsOn] = useState(true);
  const [exploring, setExploring] = useState(false);
  const [typing, setTyping] = useState(false);
  const [progress, setProgress] = useState(STUDIO_CODE.length);
  const [screen, setScreen] = useState<StudioScreen>("code");
  const [message, setMessage] = useState(
    "Explore a luminária, o monitor, a caneca e o gato.",
  );
  const reducedMotion = Boolean(useReducedMotion());
  const { soundEnabled, soundError, toggleSound, playSound, stopSounds } =
    useStudioSound();
  const { coffee, cat, drinkCoffee, petCat, cancelCoffee, stopMoments } =
    useStudioMoments({ reducedMotion, setMessage, playSound });

  useEffect(() => {
    if (!typing) return;
    let tick = 0;
    const timer = window.setInterval(
      () => {
        tick++;
        const nextProgress = reducedMotion
          ? STUDIO_CODE.length
          : Math.min(STUDIO_CODE.length, tick * 4);
        setProgress(nextProgress);
        playSound("key");
        if (nextProgress === STUDIO_CODE.length) {
          window.clearInterval(timer);
          setTyping(false);
          setMessage("Código pronto. Clique no monitor para ver o resultado.");
          playSound("done");
        }
      },
      reducedMotion ? 350 : 90,
    );
    return () => window.clearInterval(timer);
  }, [typing, reducedMotion, playSound]);

  useEffect(() => {
    const stop = () => {
      setExploring(false);
      stopMoments();
      stopSounds();
      if (typing) {
        setTyping(false);
        setMessage(
          "Digitação pausada. Clique no personagem para começar novamente.",
        );
      }
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [typing, stopMoments, stopSounds]);

  const toggleLight = () => {
    setLightsOn(!lightsOn);
    setMessage(
      lightsOn
        ? "Luminária apagada. Só o brilho da cidade e do monitor."
        : "Luminária acesa. Vamos criar.",
    );
    playSound("switch");
  };
  const toggleTyping = () => {
    cancelCoffee();
    if (typing) {
      setTyping(false);
      setMessage("Pausa para uma ideia.");
    } else {
      setScreen("code");
      setProgress(reducedMotion ? STUDIO_CODE.length : 0);
      setTyping(true);
      setMessage("Transformando ideias em código…");
      playSound("key");
    }
  };
  const takeCoffeeBreak = () => {
    setTyping(false);
    void drinkCoffee();
  };
  const cycleScreen = () => {
    const next =
      STUDIO_SCREENS[
        (STUDIO_SCREENS.indexOf(screen) + 1) % STUDIO_SCREENS.length
      ];
    setTyping(false);
    setScreen(next);
    setProgress(STUDIO_CODE.length);
    setMessage(`Monitor: ${SCREEN_LABELS[next]}.`);
    playSound("screen");
  };
  const closeExplorer = () => {
    setExploring(false);
    exploreRef.current?.focus();
  };
  const toggleExplorer = () => setExploring((current) => !current);
  const scene = {
    lightsOn,
    typing,
    progress,
    screen,
    exploring,
    reducedMotion,
    coffee,
    cat,
    onLight: toggleLight,
    onTyping: toggleTyping,
    onScreen: cycleScreen,
    onCoffee: takeCoffeeBreak,
    onCat: petCat,
  };

  return {
    sectionRef,
    exploreRef,
    soundEnabled,
    soundError,
    message,
    scene,
    toggleSound,
    toggleExplorer,
    closeExplorer,
  };
}
