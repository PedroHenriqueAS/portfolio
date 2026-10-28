"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  CAT_FRAME,
  COFFEE_FRAMES,
  type CatPhase,
  type CoffeePhase,
  type StudioTheme,
} from "./studio-data";
import { preloadImage } from "@/utils/preload-image";
import type { StudioMessage } from "@/i18n/resources";

// Separate timelines let the cat react during a coffee break. Tokens also
// invalidate a pending image decode when the visitor leaves or starts typing.
export function useStudioMoments({
  theme,
  reducedMotion,
  setMessage,
  playSound,
}: {
  theme: StudioTheme;
  reducedMotion: boolean;
  setMessage: (message: StudioMessage) => void;
  playSound: (sound: "cup" | "purr") => (() => void) | undefined;
}) {
  const [coffee, setCoffee] = useState<CoffeePhase>("idle");
  const [cat, setCat] = useState<CatPhase>("idle");
  const coffeeRun = useRef(0);
  const catRun = useRef(0);
  const coffeeBusy = useRef(false);
  const catBusy = useRef(false);
  const coffeeTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const catTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const stopPurr = useRef<(() => void) | undefined>(undefined);

  const clearCoffee = useCallback(() => {
    coffeeRun.current++;
    coffeeBusy.current = false;
    coffeeTimers.current.forEach(clearTimeout);
    coffeeTimers.current = [];
  }, []);
  const clearCat = useCallback(() => {
    catRun.current++;
    catBusy.current = false;
    clearTimeout(catTimer.current);
    stopPurr.current?.();
    stopPurr.current = undefined;
  }, []);
  const cancelCoffee = useCallback(() => {
    clearCoffee();
    setCoffee("idle");
  }, [clearCoffee]);
  const stopMoments = useCallback(() => {
    clearCoffee();
    clearCat();
    setCoffee("idle");
    setCat("idle");
  }, [clearCoffee, clearCat]);

  useEffect(
    () => () => {
      clearCoffee();
      clearCat();
    },
    [clearCoffee, clearCat],
  );

  const drinkCoffee = async () => {
    if (coffeeBusy.current) return;
    coffeeBusy.current = true;
    const run = ++coffeeRun.current;
    setCoffee("loading");
    setMessage("coffeePreparing");
    try {
      const frames =
        theme === "day"
          ? [
              ...COFFEE_FRAMES,
              "/studio/coffee-lift-day.webp",
              "/studio/coffee-sip-day.webp",
            ]
          : COFFEE_FRAMES;
      await Promise.all(frames.map(preloadImage));
      if (run !== coffeeRun.current) return;
      setMessage("coffeeDrinking");
      setCoffee(reducedMotion ? "sip" : "lift");
      if (!reducedMotion) {
        coffeeTimers.current.push(setTimeout(() => setCoffee("sip"), 420));
        coffeeTimers.current.push(setTimeout(() => setCoffee("return"), 2200));
      }
      coffeeTimers.current.push(
        setTimeout(
          () => {
            setCoffee("idle");
            coffeeBusy.current = false;
            coffeeTimers.current = [];
            playSound("cup");
            setMessage("coffeeDone");
          },
          reducedMotion ? 1400 : 2700,
        ),
      );
    } catch {
      if (run !== coffeeRun.current) return;
      cancelCoffee();
      setMessage("coffeeError");
    }
  };

  const petCat = async () => {
    if (catBusy.current) return;
    catBusy.current = true;
    const run = ++catRun.current;
    setCat("loading");
    setMessage("catCalling");
    try {
      await Promise.all(
        (theme === "day"
          ? [CAT_FRAME, "/studio/cat-awake-day.webp"]
          : [CAT_FRAME]
        ).map(preloadImage),
      );
      if (run !== catRun.current) return;
      setCat("awake");
      setMessage("catPet");
      stopPurr.current = playSound("purr");
      catTimer.current = setTimeout(
        () => {
          clearCat();
          setCat("idle");
          setMessage("catSleep");
        },
        reducedMotion ? 1600 : 3200,
      );
    } catch {
      if (run !== catRun.current) return;
      clearCat();
      setCat("idle");
      setMessage("catError");
    }
  };

  return { coffee, cat, drinkCoffee, petCat, cancelCoffee, stopMoments };
}
