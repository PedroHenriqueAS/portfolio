"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { preloadImage } from "@/utils/preload-image";
import { CONTACT_BACKGROUNDS } from "@/utils/theme-assets";
import type { StudioMessage } from "@/i18n/resources";
import { DAYLIGHT_FRAMES, type StudioTheme } from "./studio-data";

export function useStudioTheme(setMessage: (message: StudioMessage) => void) {
  const [theme, setTheme] = useState<StudioTheme>("night");
  const [themeLoading, setThemeLoading] = useState(false);
  const [daylightReady, setDaylightReady] = useState(false);
  const mounted = useRef(true);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  async function toggleTheme() {
    if (themeLoading) return;
    if (theme === "day") {
      setTheme("night");
      setMessage("night");
      return;
    }
    setThemeLoading(true);
    try {
      await Promise.all(
        [...DAYLIGHT_FRAMES, ...Object.values(CONTACT_BACKGROUNDS)].map(
          preloadImage,
        ),
      );
      if (!mounted.current) return;
      setDaylightReady(true);
      setTheme("day");
      setMessage("day");
    } catch {
      if (mounted.current) setMessage("themeError");
    } finally {
      if (mounted.current) setThemeLoading(false);
    }
  }

  return { theme, themeLoading, daylightReady, toggleTheme };
}
