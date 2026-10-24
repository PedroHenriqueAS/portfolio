"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { journeySteps } from "./journey-data";
import JourneyPanel from "./journey-panel";

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeToViewport(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

export default function JourneyTimeline() {
  const [selection, setSelection] = useState({ index: 0, direction: 1 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeToViewport,
    getDesktopSnapshot,
    () => false,
  );
  const { index: activeIndex, direction } = selection;
  const total = journeySteps.length;
  const step = journeySteps[activeIndex];
  const panelId = `${id}-panel`;
  const progress = total > 1 ? activeIndex / (total - 1) : 0;

  function selectStep(index: number) {
    const nextIndex = Math.max(0, Math.min(index, total - 1));
    if (nextIndex === activeIndex) return;
    setSelection({
      index: nextIndex,
      direction: nextIndex > activeIndex ? 1 : -1,
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextIndex: number;
    const previousKey = isDesktop ? "ArrowUp" : "ArrowLeft";
    const nextKey = isDesktop ? "ArrowDown" : "ArrowRight";

    switch (event.key) {
      case previousKey:
        nextIndex = (activeIndex - 1 + total) % total;
        break;
      case nextKey:
        nextIndex = (activeIndex + 1) % total;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = total - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectStep(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  if (!step) return null;

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(16rem,0.36fr)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
      <div className="min-w-0">
        <div
          role="tablist"
          aria-label="Etapas da jornada"
          aria-orientation={isDesktop ? "vertical" : "horizontal"}
          className="relative isolate grid grid-cols-[repeat(var(--journey-step-count),minmax(0,1fr))] lg:grid-cols-1"
          style={{ "--journey-step-count": total } as CSSProperties}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-8 right-[calc(50%/var(--journey-step-count))] left-[calc(50%/var(--journey-step-count))] h-0.5 bg-[#48395f] lg:inset-y-12 lg:right-auto lg:left-10 lg:h-auto lg:w-0.5"
          >
            <motion.div
              className="h-full w-full origin-left bg-linear-to-r from-[#c5a0ff] to-[#942bff] shadow-[0_0_12px_#a855f755] lg:origin-top lg:bg-linear-to-b"
              initial={false}
              animate={{ scaleX: isDesktop ? 1 : progress, scaleY: isDesktop ? progress : 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {journeySteps.map((item, index) => {
            const isActive = index === activeIndex;
            const isReached = index <= activeIndex;

            return (
              <button
                key={item.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                id={`${id}-step-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                aria-label={`${String(index + 1).padStart(2, "0")}. ${item.title}, ${item.period}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectStep(index)}
                onKeyDown={handleKeyDown}
                className="group relative flex h-16 min-w-0 cursor-pointer items-center justify-center rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[#c5b1ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#100d18] lg:h-24 lg:justify-start lg:gap-5 lg:px-4"
              >
                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    layoutId={`${id}-active-step`}
                    className="absolute inset-0 rounded-xl bg-[#b078ff]/10 ring-1 ring-inset ring-[#b078ff]/5"
                    transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 35 }}
                  />
                )}
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                  className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors motion-reduce:transition-none lg:size-12 lg:text-lg ${
                    isActive
                      ? "border-[#a65bff] bg-linear-to-br from-[#b25cff] to-[#791bfa] text-white shadow-[0_0_24px_#8b2cf540]"
                      : isReached
                        ? "border-[#c5b1ff] bg-[#100d18] text-[#f5f1ff] group-hover:border-white"
                        : "border-[#716087] bg-[#100d18] text-[#c0afd8] group-hover:border-[#c5b1ff]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <span className="relative hidden min-w-0 lg:block">
                  <span className={`block text-base leading-snug font-semibold xl:text-lg ${isReached ? "text-[#f5f1ff]" : "text-[#bba9d6]"}`}>
                    {item.title}
                  </span>
                  <span className={`mt-2 block font-mono text-xs tracking-wider ${isActive ? "text-[#c998ff]" : "text-[#ad98ce]"}`}>
                    {item.period}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-[#ad98ce] lg:mt-7 lg:pl-4 lg:text-left lg:before:mb-3 lg:before:block lg:before:h-px lg:before:w-7 lg:before:bg-[#b079ec]">
          Selecione uma etapa da jornada.
        </p>
      </div>

      <JourneyPanel
        step={step}
        activeIndex={activeIndex}
        total={total}
        direction={direction}
        id={panelId}
        labelledBy={`${id}-step-${step.id}`}
        onPrevious={() => selectStep(activeIndex - 1)}
        onNext={() => selectStep(activeIndex + 1)}
      />
    </div>
  );
}
