"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const SUFFIXES = ["dev", "has"] as const;
const SWAP_INTERVAL_MS = 5_000;

export default function AnimatedLogo() {
  const [suffixIndex, setSuffixIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeIndex = shouldReduceMotion ? 0 : suffixIndex;

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setSuffixIndex((current) => (current + 1) % SUFFIXES.length);
      }
    }, SWAP_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <span className="inline-flex text-2xl font-extrabold tracking-tighter whitespace-nowrap">
      <span className="sr-only">Pedrohas</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        <span>Pedro</span>
        <span className="inline-flex overflow-y-clip">
          {Array.from(SUFFIXES[0], (_, letterIndex) => (
            <span key={letterIndex} className="inline-grid [perspective:400px]">
              {SUFFIXES.map((suffix, wordIndex) => {
                const isActive = wordIndex === activeIndex;

                return (
                  <motion.span
                    key={suffix}
                    className={`[grid-area:1/1] ${wordIndex === 1 ? "text-[var(--logo-accent,var(--accent))]" : ""}`}
                    initial={false}
                    animate={{
                      y: isActive ? "0%" : wordIndex === 0 ? "-110%" : "110%",
                      rotateX: isActive ? 0 : wordIndex === 0 ? 45 : -45,
                      opacity: isActive ? 1 : 0,
                      filter: isActive ? "blur(0px)" : "blur(4px)",
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.55,
                            delay: letterIndex * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  >
                    {suffix[letterIndex]}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
