import { STUDIO_CODE, type StudioScreen } from "./studio-data";
import { MONITOR_SIZE } from "./monitor-perspective";
import styles from "./studio.module.css";

interface StudioMonitorProps {
  screen: StudioScreen;
  progress: number;
  typing: boolean;
}

export default function StudioMonitor({
  screen,
  progress,
  typing,
}: StudioMonitorProps) {
  const codeLines = STUDIO_CODE.slice(0, progress).split("\n");
  return (
    <svg
      viewBox={`0 0 ${MONITOR_SIZE.width} ${MONITOR_SIZE.height}`}
      {...MONITOR_SIZE}
      fontFamily="monospace"
      aria-hidden="true"
    >
      <rect
        {...MONITOR_SIZE}
        fill={screen === "preview" ? "#171023" : "#100d1b"}
      />
      <path d="M0 0H224V15H0Z" fill="#30203e" />
      <circle cx="8" cy="7" r="1.8" fill="#f787a2" />
      <circle cx="14" cy="7" r="1.8" fill="#ead58f" />
      <circle cx="20" cy="7" r="1.8" fill="#a0d6bd" />
      <text x="33" y="9" fill="#d4bde8" fontSize="5.2">
        {screen === "code"
          ? "studio.tsx"
          : screen === "preview"
            ? "localhost / preview"
            : "pedro / terminal"}
      </text>
      {screen === "code" && (
        <>
          <path d="M0 15H22V160H0Z" fill="#191323" />
          {codeLines.map((line, index) => (
            <g key={index}>
              <text x="8" y={26 + index * 8.8} fill="#77628e" fontSize="5.6">
                {index + 1}
              </text>
              <text
                x="28"
                y={26 + index * 8.8}
                fill={
                  index === 0 || index === 6
                    ? "#cf9aff"
                    : index === 1 || index === 2
                      ? "#bfe6cf"
                      : "#d8c7ed"
                }
                fontSize="6.1"
                xmlSpace="preserve"
              >
                {line}
              </text>
            </g>
          ))}
          {typing && (
            <rect
              x={28 + (codeLines.at(-1)?.length ?? 0) * 3.66}
              y={20 + (codeLines.length - 1) * 8.8}
              width="3.8"
              height="7"
              fill="#dec0ff"
              className={styles.cursor}
            />
          )}
          <path d="M0 137H224V160H0Z" fill="#36204d" />
          <text x="9" y="145" fill="#dac6ed" fontSize="5">
            {typing ? "● digitando..." : "✓ pronto para criar"}
          </text>
        </>
      )}
      {screen === "preview" && (
        <>
          <text x="14" y="32" fontSize="8" fontWeight="700" fill="#f5efff">
            pedro<tspan fill="#ba78ff">.dev</tspan>
          </text>
          <text x="14" y="54" fontSize="13" fontWeight="700" fill="#f5efff">
            Ideias que
          </text>
          <text x="14" y="70" fontSize="13" fontStyle="italic" fill="#c6a0ed">
            ganham vida.
          </text>
          <rect x="14" y="81" width="72" height="15" rx="4" fill="#852beb" />
          <text x="21" y="91" fontSize="5.5" fill="white">
            Explorar projetos ↗
          </text>
          {[14, 80, 146].map((x, index) => (
            <g key={x}>
              <rect
                x={x}
                y="109"
                width="57"
                height="36"
                rx="4"
                fill={["#34234c", "#282541", "#352039"][index]}
                stroke="#67457d"
                strokeWidth=".5"
              />
              <path
                d={`M${x + 8} 119h25m-25 7h39m-39 7h19`}
                stroke="#a67cc5"
                strokeWidth="2"
              />
            </g>
          ))}
        </>
      )}
      {screen === "terminal" && (
        <>
          {[
            "$ npm run create",
            "",
            "✓ ideias conectadas",
            "✓ detalhes refinados",
            "✓ experiência pronta",
            "",
            "Built with curiosity.",
            "",
            "$ vamos criar algo? _",
          ].map((line, index) => (
            <text
              key={index}
              x="12"
              y={30 + index * 11}
              fontSize="6.8"
              fill={line.startsWith("✓") ? "#a4dfbd" : "#cdb2e7"}
            >
              {line}
            </text>
          ))}
        </>
      )}
    </svg>
  );
}
