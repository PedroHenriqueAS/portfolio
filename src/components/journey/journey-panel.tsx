"use client";

import { useTranslation } from "react-i18next";

import { formatSequenceNumber } from "@/utils/format-sequence-number";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { JourneyStep } from "./journey-data";

type JourneyPanelProps = {
  step: JourneyStep;
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  direction: number;
  id: string;
  labelledBy: string;
};

export default function JourneyPanel({
  step,
  activeIndex,
  total,
  onPrevious,
  onNext,
  direction,
  id,
  labelledBy,
}: JourneyPanelProps) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const chapter = formatSequenceNumber(activeIndex + 1);
  const chapters = formatSequenceNumber(total);

  return (
    <section
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      tabIndex={0}
      className="@container relative min-w-0 overflow-hidden rounded-2xl border border-[var(--accent)]/20 bg-[var(--surface)] p-5 text-[var(--foreground)] [overflow-wrap:anywhere] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)] sm:p-8 lg:p-7 xl:p-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-3">
        <span className="absolute top-0 left-0 size-3 rounded-tl border-t border-l border-[var(--accent)]" />
        <span className="absolute top-0 right-0 size-3 rounded-tr border-t border-r border-[var(--accent)]" />
        <span className="absolute bottom-0 left-0 size-3 rounded-bl border-b border-l border-[var(--accent)]" />
        <span className="absolute right-0 bottom-0 size-3 rounded-br border-r border-b border-[var(--accent)]" />
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key={step.id}
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: direction * 14, filter: "blur(4px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
          className="relative"
        >
          <header className="flex min-w-0 flex-col gap-4 @min-[38rem]:flex-row @min-[38rem]:items-start @min-[38rem]:justify-between @min-[38rem]:gap-6">
            <div className="min-w-0">
              <h3 className="text-2xl leading-tight font-bold tracking-[-0.035em] text-[var(--foreground)] sm:text-3xl xl:text-4xl">
                {step.role}
              </h3>
              <p className="mt-1.5 text-lg leading-snug font-medium text-[var(--accent)] sm:text-xl xl:text-2xl">
                {step.title}
              </p>
            </div>
            <div className="min-w-0 text-[var(--accent)] @min-[38rem]:shrink-0 @min-[38rem]:pt-1 @min-[38rem]:text-right">
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.15em] uppercase sm:text-xs">
                {step.detailedPeriod ?? step.period}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed">{step.category}</p>
            </div>
          </header>

          <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)] sm:text-base xl:text-lg">
            {step.description}
          </p>

          <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 border-y border-[var(--accent)]/20 py-5 @min-[32rem]:grid-cols-2 @min-[32rem]:gap-6 xl:gap-8">
            {[
              { title: t("journey.deliveries"), items: step.deliveries },
              { title: t("journey.learnings"), items: step.learnings },
            ].map((group, index) => (
              <section
                key={group.title}
                className={`min-w-0 ${index === 1 ? "border-t border-[var(--accent)]/20 pt-5 @min-[32rem]:border-t-0 @min-[32rem]:border-l @min-[32rem]:pt-0 @min-[32rem]:pl-6 xl:pl-8" : ""}`}
              >
                <h4 className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase sm:text-xs">
                  {group.title}
                </h4>
                <ul className="mt-3 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <h5 className="text-base leading-snug font-semibold text-[var(--foreground)] sm:text-lg">
                        {item.title}
                      </h5>
                      <p className="mt-0.5 text-sm leading-relaxed text-[var(--text-soft)] sm:text-base">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="pt-4">
            <h4 className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase sm:text-xs">
              {t("common.technologies")}
            </h4>
            <ul
              aria-label={t("common.technologiesLabel")}
              className="mt-3 flex flex-wrap gap-2.5"
            >
              {step.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-[var(--accent)]/70 px-4 py-1.5 text-xs leading-normal text-[var(--text-soft)]"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </section>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-5 border-t border-[var(--accent)]/20 pt-4">
        <div
          role="progressbar"
          aria-label={t("journey.stage")}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={activeIndex + 1}
          aria-valuetext={t("journey.chapter", {
            current: activeIndex + 1,
            total,
            title: step.title,
          })}
          className="flex min-w-0 items-center gap-3"
        >
          <div aria-hidden="true" className="flex gap-1.5">
            {Array.from({ length: total }, (_, index) => (
              <span
                key={index}
                className={`h-1.5 w-5 rounded-full transition-colors duration-300 motion-reduce:transition-none sm:w-6 ${index <= activeIndex ? "bg-[var(--accent-strong)]" : "bg-[var(--accent)]/20"}`}
              />
            ))}
          </div>
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-[11px] text-[var(--accent)]"
          >
            {t("common.pagination", { current: chapter, total: chapters })}
          </span>
        </div>

        <div className="flex w-full gap-2 sm:w-auto [&>button]:flex-1 sm:[&>button]:flex-none">
          <button
            type="button"
            onClick={onPrevious}
            disabled={activeIndex === 0}
            className="min-h-11 cursor-pointer rounded-xl border border-[var(--accent)]/70 px-4 text-xs font-medium text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent motion-reduce:transition-none sm:px-5 sm:text-sm"
          >
            {t("common.previous")}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={activeIndex === total - 1}
            className="min-h-11 cursor-pointer rounded-xl border border-[var(--accent-strong)] bg-[var(--button-start)] px-4 text-xs font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--button-end)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[var(--button-start)] motion-reduce:transition-none sm:px-5 sm:text-sm"
          >
            {t("journey.next")}
          </button>
        </div>
      </div>
    </section>
  );
}
