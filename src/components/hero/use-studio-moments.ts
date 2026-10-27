"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  CAT_FRAME,
  COFFEE_FRAMES,
  type CatPhase,
  type CoffeePhase,
} from "./studio-data";

const decodedImages = new Map<string, Promise<void>>();
function preload(src: string) {
  let pending = decodedImages.get(src);
  if (!pending) {
    const image = new Image();
    image.src = src;
    pending = image.decode().catch((error) => {
      decodedImages.delete(src);
      throw error;
    });
    decodedImages.set(src, pending);
  }
  return pending;
}

// Separate timelines let the cat react during a coffee break. Tokens also
// invalidate a pending image decode when the visitor leaves or starts typing.
export function useStudioMoments({
  reducedMotion,
  setMessage,
  playSound,
}: {
  reducedMotion: boolean;
  setMessage: (message: string) => void;
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
    setMessage("Preparando uma pausa para o café…");
    try {
      await Promise.all(COFFEE_FRAMES.map(preload));
      if (run !== coffeeRun.current) return;
      setMessage("Uma pausa para o café. As ideias também precisam respirar.");
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
            setMessage("Café tomado. Pronto para mais uma ideia.");
          },
          reducedMotion ? 1400 : 2700,
        ),
      );
    } catch {
      if (run !== coffeeRun.current) return;
      cancelCoffee();
      setMessage(
        "A cena do café não carregou. Clique na caneca para tentar novamente.",
      );
    }
  };

  const petCat = async () => {
    if (catBusy.current) return;
    catBusy.current = true;
    const run = ++catRun.current;
    setCat("loading");
    setMessage("Chamando nosso companheiro de estúdio…");
    try {
      await preload(CAT_FRAME);
      if (run !== catRun.current) return;
      setCat("awake");
      setMessage("Carinho recebido. Prrrr…");
      stopPurr.current = playSound("purr");
      catTimer.current = setTimeout(
        () => {
          clearCat();
          setCat("idle");
          setMessage("De volta à soneca. Vida boa por aqui.");
        },
        reducedMotion ? 1600 : 3200,
      );
    } catch {
      if (run !== catRun.current) return;
      clearCat();
      setCat("idle");
      setMessage(
        "A cena do gato não carregou. Clique nele para tentar novamente.",
      );
    }
  };

  return { coffee, cat, drinkCoffee, petCat, cancelCoffee, stopMoments };
}
