import { Instrument_Serif, Inter } from "next/font/google";
import JourneyTimeline from "./journey-timeline";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "900",
  display: "swap",
});

export default function JourneySection() {
  return (
    <section
      id="jornada"
      aria-labelledby="journey-heading"
      className="relative isolate mt-12 w-full min-w-0 scroll-mt-16 px-5 py-12 text-[#f5f1ff] sm:px-8 sm:py-16 lg:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,#6e32a309,transparent_70%)]" />
      <header className="mb-7 border-b border-[#48325f] pb-5 sm:mb-8">
        <p className="mb-3 font-mono text-xs tracking-[0.25em] text-[#c5b1ff]">
          02 / TRAJETÓRIA
        </p>
        <h2 id="journey-heading" className="text-[clamp(3rem,7.5vw,6.5rem)] leading-none tracking-[-0.05em]">
          <span className={`${inter.className} font-black`}>Minha </span>
          <span className={`${instrumentSerif.className} font-normal text-[#c5b1ff]`}>jornada.</span>
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[#c5b1ff]">
          <p className="text-base leading-relaxed sm:text-xl">
            Experiências que moldaram meu jeito de criar.
          </p>
          <p className="font-mono text-xs tracking-[0.2em]">2019 — HOJE</p>
        </div>
      </header>
      <JourneyTimeline />
    </section>
  );
}
