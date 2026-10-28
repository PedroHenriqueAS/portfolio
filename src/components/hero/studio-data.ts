export const STUDIO_CODE = [
  "const studio = {",
  '  name: "Pedro Andrade",',
  '  craft: "front-end",',
  "  details: true,",
  "};",
  "",
  "function createExperience() {",
  "  return ideas.map(build);",
  "}",
  "",
  "createExperience();",
].join("\n");

export const STUDIO_SCREENS = ["code", "preview", "terminal"] as const;
export type StudioScreen = (typeof STUDIO_SCREENS)[number];
export const SCREEN_LABELS = {
  code: "studio.screens.code",
  preview: "studio.screens.preview",
  terminal: "studio.screens.terminal",
} as const satisfies Record<StudioScreen, string>;

export const STUDIO_TARGETS = {
  window: { x: 465, y: 350, width: 248, height: 312 },
  character: { x: 835, y: 453, width: 280, height: 300 },
  monitor: { x: 1018, y: 445, width: 228, height: 190 },
  lamp: { x: 1247, y: 500, width: 102, height: 108 },
  coffee: { x: 1162, y: 632, width: 76, height: 76 },
  cat: { x: 606, y: 660, width: 174, height: 104 },
};
export const TYPING_DISPLACEMENT = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
  <defs>
    <radialGradient id="press"><stop stop-color="rgb(128,255,128)"/><stop offset="1" stop-color="rgb(128,128,128)"/></radialGradient>
    <radialGradient id="release"><stop stop-color="rgb(128,0,128)"/><stop offset="1" stop-color="rgb(128,128,128)"/></radialGradient>
  </defs>
  <rect width="1536" height="1024" fill="rgb(128,128,128)"/>
  <ellipse cx="1079" cy="649" rx="24" ry="20" fill="url(#press)"/>
  <ellipse cx="1044" cy="642" rx="16" ry="12" fill="url(#release)"/>
  <ellipse cx="1061" cy="678" rx="20" ry="25" fill="url(#release)"/>
</svg>`)}`;

export const CAT_DISPLACEMENT = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024">
  <defs><radialGradient id="ear"><stop stop-color="rgb(128,0,128)"/><stop offset="1" stop-color="rgb(128,128,128)"/></radialGradient></defs>
  <rect width="1536" height="1024" fill="rgb(128,128,128)"/>
  <ellipse cx="701" cy="678" rx="10" ry="16" fill="url(#ear)"/>
  <ellipse cx="746" cy="675" rx="10" ry="16" fill="url(#ear)"/>
  <ellipse cx="657" cy="696" rx="34" ry="23" fill="url(#ear)"/>
</svg>`)}`;

export type CoffeePhase = "idle" | "loading" | "lift" | "sip" | "return";
export type CatPhase = "idle" | "loading" | "awake";
export const COFFEE_FRAMES = [
  "/studio/coffee-lift.webp",
  "/studio/coffee-sip.webp",
  "/studio/coffee-lift-off.webp",
  "/studio/coffee-sip-off.webp",
];
export const CAT_FRAME = "/studio/cat-awake.webp";

export type StudioTheme = "night" | "day";
export const DAYLIGHT_FRAMES = [
  "/studio/window-night.webp",
  "/studio/daylight.webp",
  "/studio/daylight-off.webp",
  "/studio/coffee-lift-day.webp",
  "/studio/coffee-sip-day.webp",
  "/studio/cat-awake-day.webp",
];
