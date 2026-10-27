"use client";

import { formatSequenceNumber } from "@/utils/format-sequence-number";
import { useId } from "react";
import type { PortfolioProject } from "./projects-data";
import styles from "./projects.module.css";

export default function Cassette({
  project,
  number,
  playing = false,
}: {
  project: PortfolioProject;
  number: number;
  playing?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 320 172"
      fill="none"
      aria-hidden="true"
      className={styles.cassette}
    >
      <defs>
        <linearGradient
          id={`${id}-case`}
          x1="160"
          y1="2"
          x2="160"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4e3c65" />
          <stop offset=".18" stopColor="#2d233e" />
          <stop offset=".8" stopColor="#191321" />
          <stop offset="1" stopColor="#100d17" />
        </linearGradient>
        <linearGradient
          id={`${id}-label`}
          x1="90"
          y1="28"
          x2="225"
          y2="135"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f1dcff" />
          <stop offset="1" stopColor={project.accent} />
        </linearGradient>
        <linearGradient
          id={`${id}-window`}
          x1="160"
          y1="47"
          x2="160"
          y2="116"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#100a1c" />
          <stop offset=".5" stopColor="#54336e" />
          <stop offset="1" stopColor="#251a38" />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="314" height="163" rx="13" fill="#09070d" />
      <rect
        x="4"
        y="3"
        width="312"
        height="155"
        rx="12"
        fill={`url(#${id}-case)`}
        stroke="#76558f"
        strokeWidth="2"
      />
      <rect
        x="10"
        y="9"
        width="300"
        height="142"
        rx="8"
        stroke="#9e79b9"
        strokeOpacity=".25"
      />
      <path d="M39 24H281L298 127H22L39 24Z" fill="#171020" stroke="#5f4775" />
      <rect
        x="27"
        y="44"
        width="266"
        height="74"
        rx="35"
        fill={`url(#${id}-window)`}
        stroke="#9263b3"
      />
      {[75, 245].map((cx) => (
        <g key={cx}>
          <circle
            cx={cx}
            cy="81"
            r="29"
            fill="#a884c6"
            fillOpacity=".22"
            stroke="#bb8cde"
          />
          <circle cx={cx} cy="81" r="23" stroke="#6e4b88" strokeWidth="5" />
          <g
            className={playing ? styles.spinningReel : undefined}
            style={{ transformOrigin: `${cx}px 81px` }}
          >
            <circle
              cx={cx}
              cy="81"
              r="12"
              fill="#1d132a"
              stroke="#ba8fda"
              strokeWidth="3"
            />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <path
                key={angle}
                d={`M${cx} 68V74`}
                stroke="#d4adee"
                strokeWidth="3"
                transform={`rotate(${angle} ${cx} 81)`}
              />
            ))}
          </g>
        </g>
      ))}
      <rect
        x="91"
        y="27"
        width="138"
        height="108"
        rx="5"
        fill="#110a1c"
        stroke="#836293"
        strokeWidth="3"
      />
      <rect
        x="96"
        y="32"
        width="128"
        height="98"
        rx="3"
        fill={`url(#${id}-label)`}
      />
      <path d="M102 38H218M102 123H218" stroke="#624879" strokeOpacity=".35" />
      <rect x="103" y="42" width="27" height="17" rx="2" fill="#3d1d57" />
      <text
        x="116.5"
        y="55"
        textAnchor="middle"
        fill="#f3e8ff"
        fontSize="13"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
      >
        {formatSequenceNumber(number)}
      </text>
      <text
        x="137"
        y="55"
        fill="#442457"
        fontSize="10"
        fontWeight="800"
        fontFamily="monospace"
      >
        VHS / HI-FI
      </text>
      <text
        x="103"
        y="83"
        fill="#21102d"
        fontSize="22"
        fontWeight="900"
        letterSpacing="-.8"
        fontFamily="Arial, sans-serif"
        textLength={project.title.length > 10 ? 114 : undefined}
        lengthAdjust="spacingAndGlyphs"
      >
        {project.title}
      </text>
      <text
        x="103"
        y="98"
        fill="#533566"
        fontSize="5.8"
        fontWeight="700"
        letterSpacing=".5"
        fontFamily="monospace"
      >
        {project.tapeLabel}
      </text>
      <path
        d="M103 108H171M103 113H171M103 118H147"
        stroke="#8a66a0"
        strokeOpacity=".6"
      />
      <path
        d="M193 108H216M193 112H216M193 116H216"
        stroke="#422853"
        strokeWidth="2"
      />
      <path
        d="M65 139H255L265 157H55L65 139Z"
        fill="#241a31"
        stroke="#4d385f"
      />
      <path d="M96 145H224M92 150H228" stroke="#100b17" strokeWidth="2" />
      {[
        [17, 18],
        [303, 18],
        [17, 140],
        [303, 140],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill="#0b0811" stroke="#705584" />
          <path d={`M${x - 2} ${y + 2}L${x + 2} ${y - 2}`} stroke="#8c6c9c" />
        </g>
      ))}
    </svg>
  );
}
