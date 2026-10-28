import { useId } from "react";
import type { StudioTheme } from "./studio-data";
import styles from "./studio.module.css";

interface StudioDaylightProps {
  theme: StudioTheme;
  ready: boolean;
  lightsOn: boolean;
  reducedMotion: boolean;
}

export default function StudioDaylight({
  theme,
  ready,
  lightsOn,
  reducedMotion,
}: StudioDaylightProps) {
  const id = useId().replace(/:/g, "");
  const isDay = theme === "day";

  return (
    <g pointerEvents="none" aria-hidden="true">
      <defs>
        <filter id={`${id}-soft-edge`}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <mask
          id={`${id}-moon-area`}
          maskUnits="userSpaceOnUse"
          x="642"
          y="390"
          width="65"
          height="67"
        >
          <ellipse
            cx="674"
            cy="423"
            rx="26"
            ry="27"
            fill="white"
            filter={`url(#${id}-soft-edge)`}
          />
        </mask>
        <clipPath id={`${id}-sky`}>
          <path d="M644 357Q682 370 708 401L708 464L644 475Z" />
        </clipPath>
        <radialGradient id={`${id}-sun-glow`}>
          <stop stopColor="#fff2bb" stopOpacity=".85" />
          <stop offset=".45" stopColor="#ffcd7b" stopOpacity=".4" />
          <stop offset="1" stopColor="#ffb658" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-sun`}>
          <stop stopColor="#fffef1" />
          <stop offset="1" stopColor="#ffe2a1" />
        </radialGradient>
        <filter
          id={`${id}-dawn-feather`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="65" />
        </filter>
        <mask
          id={`${id}-dawn`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1536"
          height="1024"
        >
          <circle
            cx="590"
            cy="490"
            fill="white"
            filter={reducedMotion ? undefined : `url(#${id}-dawn-feather)`}
            className={styles.daylightReveal}
            r={isDay ? 1800 : 0}
          />
        </mask>
      </defs>
      <image
        href="/studio/window-night.webp"
        width="1536"
        height="1024"
        mask={`url(#${id}-moon-area)`}
      />
      <g
        className={styles.daylightLayer}
        mask={`url(#${id}-dawn)`}
        data-daylight="room"
      >
        <image
          href={ready ? "/studio/daylight.webp" : undefined}
          width="1536"
          height="1024"
        />
        <image
          href={ready ? "/studio/daylight-off.webp" : undefined}
          width="1536"
          height="1024"
          className={styles.lightsOff}
          opacity={lightsOn ? 0 : 1}
        />
      </g>
      <g clipPath={`url(#${id}-sky)`}>
        <g className={styles.moon} data-celestial="moon">
          <path
            d="M680 404C700 425 678 450 656 435C677 440 692 420 680 404Z"
            fill="#f8ebff"
          />
        </g>
        <g className={styles.sun} data-celestial="sun">
          <circle cx="675" cy="423" r="49" fill={`url(#${id}-sun-glow)`} />
          <circle cx="675" cy="423" r="17" fill={`url(#${id}-sun)`} />
        </g>
      </g>
    </g>
  );
}
