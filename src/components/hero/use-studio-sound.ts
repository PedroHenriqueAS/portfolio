"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  createStudioAudio,
  playStudioAudio,
  stopStudioAudio,
  type StudioAudio,
  type StudioSound,
} from "./studio-audio";

export function useStudioSound() {
  const engine = useRef<StudioAudio | null>(null);
  const enabled = useRef(false);
  const mounted = useRef(true);
  const activation = useRef(0);
  const invalidateActivation = useCallback(() => ++activation.current, []);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundError, setSoundError] = useState("");

  const stopSounds = useCallback(() => {
    if (engine.current) stopStudioAudio(engine.current);
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      invalidateActivation();
      enabled.current = false;
      stopSounds();
      const current = engine.current;
      engine.current = null;
      if (current && current.context.state !== "closed")
        void current.context.close().catch(() => {});
    };
  }, [stopSounds, invalidateActivation]);

  const playSound = useCallback((sound: StudioSound) => {
    const current = engine.current;
    if (
      !enabled.current ||
      !current ||
      current.context.state !== "running" ||
      document.hidden
    )
      return;
    return playStudioAudio(current, sound);
  }, []);

  const toggleSound = useCallback(async () => {
    const request = invalidateActivation();
    enabled.current = !enabled.current;
    setSoundError("");
    if (!enabled.current) {
      stopSounds();
      if (engine.current)
        engine.current.master.gain.setValueAtTime(
          0,
          engine.current.context.currentTime,
        );
      setSoundEnabled(false);
      return;
    }
    try {
      if (!engine.current) {
        engine.current = createStudioAudio();
      }
      const { context, master } = engine.current;
      await context.resume();
      if (
        !mounted.current ||
        !enabled.current ||
        request !== activation.current
      )
        return;
      master.gain.setValueAtTime(0.32, context.currentTime);
      setSoundEnabled(true);
      playSound("screen");
    } catch {
      if (!mounted.current || request !== activation.current) return;
      enabled.current = false;
      setSoundEnabled(false);
      setSoundError("Não foi possível ativar o som. Tente novamente.");
    }
  }, [playSound, stopSounds, invalidateActivation]);

  return { soundEnabled, soundError, toggleSound, playSound, stopSounds };
}
