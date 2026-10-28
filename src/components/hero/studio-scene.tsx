"use client";

import { useTranslation } from "react-i18next";

import { useId } from "react";
import {
  Cat,
  Coffee,
  Keyboard,
  Lightbulb,
  Monitor,
  Sun,
  Moon,
} from "lucide-react";
import {
  CAT_FRAME,
  type CatPhase,
  type CoffeePhase,
  CAT_DISPLACEMENT,
  STUDIO_TARGETS,
  TYPING_DISPLACEMENT,
  type StudioScreen,
  type StudioTheme,
} from "./studio-data";
import {
  MONITOR_PATH,
  MONITOR_SIZE,
  MONITOR_TRANSFORM,
} from "./monitor-perspective";
import StudioMonitor from "./studio-monitor";
import StudioDaylight from "./studio-daylight";
import styles from "./studio.module.css";

export interface StudioSceneProps {
  theme: StudioTheme;
  themeLoading: boolean;
  daylightReady: boolean;
  lightsOn: boolean;
  typing: boolean;
  progress: number;
  screen: StudioScreen;
  exploring: boolean;
  reducedMotion: boolean;
  coffee: CoffeePhase;
  cat: CatPhase;
  compact?: boolean;
  onLight: () => void;
  onTheme: () => void;
  onTyping: () => void;
  onScreen: () => void;
  onCoffee: () => void;
  onCat: () => void;
}

export default function StudioScene({
  theme,
  themeLoading,
  daylightReady,
  lightsOn,
  typing,
  progress,
  screen,
  exploring,
  reducedMotion,
  coffee,
  cat,
  compact = false,
  onLight,
  onTheme,
  onTyping,
  onScreen,
  onCoffee,
  onCat,
}: StudioSceneProps) {
  const { t } = useTranslation();
  const id = useId().replace(/:/g, "");
  const animateHands = typing && !reducedMotion;
  const drinking = coffee !== "idle" && coffee !== "loading";
  const coffeeImages = (pose: "lift" | "sip") => (
    <>
      <image href={`/studio/coffee-${pose}.webp`} width="1536" height="1024" />
      <image
        href={`/studio/coffee-${pose}-off.webp`}
        width="1536"
        height="1024"
        opacity={lightsOn ? 0 : 1}
        className={styles.lightsOff}
      />
      <image
        href={daylightReady ? `/studio/coffee-${pose}-day.webp` : undefined}
        width="1536"
        height="1024"
        className={styles.daylightLayer}
      />
    </>
  );
  const targets = [
    {
      name: "window",
      box: STUDIO_TARGETS.window,
      label: theme === "day" ? t("studio.windowNight") : t("studio.windowDay"),
      short: themeLoading
        ? t("studio.dawn")
        : theme === "day"
          ? t("studio.goodNight")
          : t("studio.goodMorning"),
      icon: theme === "day" ? Moon : Sun,
      action: onTheme,
      pressed: theme === "day",
    },
    {
      name: "character",
      box: STUDIO_TARGETS.character,
      label: typing ? t("studio.stopTyping") : t("studio.characterTyping"),
      short: typing ? t("studio.pause") : t("studio.type"),
      icon: Keyboard,
      action: onTyping,
      pressed: typing,
    },
    {
      name: "monitor",
      box: STUDIO_TARGETS.monitor,
      label: t("studio.monitorChange"),
      short: t("studio.changeScreen"),
      icon: Monitor,
      action: onScreen,
      pressed: undefined,
    },
    {
      name: "lamp",
      box: STUDIO_TARGETS.lamp,
      label: lightsOn ? t("studio.lampOff") : t("studio.lampOn"),
      short: lightsOn ? t("studio.lightOff") : t("studio.lightOn"),
      icon: Lightbulb,
      action: onLight,
      pressed: lightsOn,
    },
    {
      name: "coffee",
      box: STUDIO_TARGETS.coffee,
      label: t("studio.characterCoffee"),
      short:
        coffee === "loading"
          ? t("studio.coffeePreparing")
          : drinking
            ? t("studio.coffeeBreak")
            : t("studio.drinkCoffee"),
      icon: Coffee,
      action: onCoffee,
      pressed: undefined,
    },
    {
      name: "cat",
      box: STUDIO_TARGETS.cat,
      label: t("studio.catPet"),
      short: cat === "awake" ? t("studio.purr") : t("studio.petCat"),
      icon: Cat,
      action: onCat,
      pressed: undefined,
    },
  ];

  return (
    <svg
      viewBox="0 0 1536 1024"
      preserveAspectRatio={compact ? "xMidYMid meet" : "xMidYMid slice"}
      className={styles.scene}
      aria-label={compact ? undefined : t("studio.sceneLabel")}
      aria-hidden={compact || undefined}
      data-exploring={exploring}
      data-theme={theme}
      data-studio-scene={compact ? "preview" : "main"}
    >
      <defs>
        <clipPath id={`${id}-screen`}>
          <path d={MONITOR_PATH} />
        </clipPath>
        <filter id={`${id}-feather`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter
          id={`${id}-purr`}
          x="585"
          y="640"
          width="210"
          height="145"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={CAT_DISPLACEMENT}
            x="0"
            y="0"
            width="1536"
            height="1024"
            result="movement"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="movement"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            {cat === "awake" && !reducedMotion && (
              <animate
                attributeName="scale"
                values="0;3;0;-1;0"
                dur="1.4s"
                repeatCount="indefinite"
              />
            )}
          </feDisplacementMap>
        </filter>
        <mask
          id={`${id}-coffee-area`}
          maskUnits="userSpaceOnUse"
          x="940"
          y="525"
          width="305"
          height="220"
        >
          <rect
            x="955"
            y="533"
            width="193"
            height="209"
            rx="12"
            fill="white"
            filter={`url(#${id}-feather)`}
          />
          <rect
            x="1164"
            y="638"
            width="69"
            height="64"
            rx="10"
            fill="white"
            filter={`url(#${id}-feather)`}
          />
        </mask>
        <mask
          id={`${id}-cat`}
          maskUnits="userSpaceOnUse"
          x="575"
          y="640"
          width="225"
          height="150"
        >
          <ellipse
            cx="690"
            cy="711"
            rx="98"
            ry="61"
            fill="white"
            filter={`url(#${id}-feather)`}
          />
        </mask>
        <mask
          id={`${id}-coffee-sip`}
          maskUnits="userSpaceOnUse"
          x="975"
          y="530"
          width="90"
          height="90"
        >
          <path
            d="M984 545Q1007 536 1027 545L1026 550Q1035 548 1039 554L1044 556Q1052 564 1053 576L1051 596L1053 609L1031 611L1015 588L985 587Z"
            fill="white"
            filter={`url(#${id}-feather)`}
          />
        </mask>
        <filter
          id={`${id}-typing`}
          x="0"
          y="0"
          width="1536"
          height="1024"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={TYPING_DISPLACEMENT}
            x="0"
            y="0"
            width="1536"
            height="1024"
            result="movement"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="movement"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            {animateHands && (
              <animate
                attributeName="scale"
                values="0;6;-4;5;0"
                dur="0.26s"
                repeatCount="indefinite"
              />
            )}
          </feDisplacementMap>
        </filter>
      </defs>
      <g
        aria-hidden="true"
        filter={animateHands ? `url(#${id}-typing)` : undefined}
      >
        <image href="/studio/lights-on.webp" width="1536" height="1024" />
        <image
          href="/studio/lights-off.webp"
          width="1536"
          height="1024"
          className={styles.lightsOff}
          opacity={lightsOn ? 0 : 1}
        />
        <StudioDaylight
          theme={theme}
          ready={daylightReady}
          lightsOn={lightsOn}
          reducedMotion={reducedMotion}
        />
      </g>
      {drinking && (
        <g
          aria-hidden="true"
          pointerEvents="none"
          mask={`url(#${id}-coffee-area)`}
        >
          {coffeeImages("lift")}
          <g className={styles.coffeePose} opacity={coffee === "sip" ? 1 : 0}>
            {coffeeImages("sip")}
          </g>
        </g>
      )}
      <g
        aria-hidden="true"
        clipPath={`url(#${id}-screen)`}
        pointerEvents="none"
      >
        <path
          d={MONITOR_PATH}
          fill={screen === "preview" ? "#171023" : "#100d1b"}
        />
        <foreignObject x="0" y="0" width="1536" height="1024">
          <div
            className={styles.monitorPlane}
            style={{ ...MONITOR_SIZE, transform: MONITOR_TRANSFORM }}
          >
            <StudioMonitor
              screen={screen}
              progress={progress}
              typing={typing}
            />
          </div>
        </foreignObject>
      </g>
      <g aria-hidden="true" pointerEvents="none">
        {drinking && (
          <g
            mask={`url(#${id}-coffee-sip)`}
            className={styles.coffeePose}
            opacity={coffee === "sip" ? 1 : 0}
          >
            {coffeeImages("sip")}
          </g>
        )}
        {cat === "awake" && (
          <g mask={`url(#${id}-cat)`} className={styles.catAwake}>
            <image
              href={CAT_FRAME}
              width="1536"
              height="1024"
              filter={reducedMotion ? undefined : `url(#${id}-purr)`}
            />
            <image
              href={daylightReady ? "/studio/cat-awake-day.webp" : undefined}
              width="1536"
              height="1024"
              className={styles.daylightLayer}
              filter={reducedMotion ? undefined : `url(#${id}-purr)`}
            />
          </g>
        )}
        {!drinking && (
          <g
            className={styles.steam}
            fill="none"
            stroke="#e7cfff"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <path d="M1185 638q-5-7 0-14t0-14" />
            <path d="M1197 640q5-7 0-14t0-14" />
          </g>
        )}
        {cat === "awake" && (
          <g transform="translate(742 641)" className={styles.catAffection}>
            <path d="M0 3C-9-5-14 5 0 14C14 5 9-5 0 3Z" fill="#d9b1ff" />
            <text
              x="15"
              y="10"
              fill="#e3c8fa"
              fontSize="10"
              fontFamily="monospace"
            >
              {t("studio.catBadge")}
            </text>
          </g>
        )}
        {drinking && (
          <g transform="translate(903 427)" className={styles.typingBadge}>
            <rect
              width="106"
              height="22"
              rx="11"
              fill="#151020"
              stroke="#c1a2df"
              strokeWidth=".7"
            />
            <text
              x="12"
              y="14.5"
              fontSize="9"
              fontFamily="monospace"
              fill="#eee2ff"
            >
              {t("studio.coffeeBadge")}
            </text>
          </g>
        )}
      </g>
      {typing && (
        <g
          aria-hidden="true"
          transform="translate(903 427)"
          className={styles.typingBadge}
        >
          <rect
            width="103"
            height="22"
            rx="11"
            fill="#151020"
            stroke="#a67ddd"
            strokeWidth=".7"
          />
          <circle cx="12" cy="11" r="3" fill="#b5edcf" />
          <text
            x="22"
            y="14.5"
            fontSize="9"
            fontFamily="monospace"
            fill="#eee2ff"
          >
            {t("studio.typingBadge")}
          </text>
        </g>
      )}
      {!compact &&
        targets.map(
          ({ name, box, label, short, icon: Icon, action, pressed }) => (
            <foreignObject key={name} {...box} overflow="visible">
              <button
                type="button"
                className={`${styles.hotspot} ${name === "monitor" ? styles.monitor : name === "character" ? styles.character : name === "window" ? styles.window : ""}`}
                aria-label={label}
                aria-pressed={pressed}
                disabled={name === "window" && themeLoading}
                aria-busy={name === "window" ? themeLoading : undefined}
                aria-disabled={
                  name === "coffee"
                    ? coffee !== "idle"
                    : name === "cat"
                      ? cat !== "idle"
                      : undefined
                }
                tabIndex={exploring ? 0 : -1}
                onClick={action}
                data-studio-target={name}
              >
                <span className={styles.hotspotMark}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className={styles.hotspotLabel}>{short}</span>
              </button>
            </foreignObject>
          ),
        )}
    </svg>
  );
}
