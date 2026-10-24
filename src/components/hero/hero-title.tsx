import { Inter } from "next/font/google";
import { Instrument_Serif } from "next/font/google";

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

export default function HeroTitle() {
  return (
    <h1 className="text-center mt-3">
      <span
        className={`${inter.className}
          block
          text-[clamp(2.5rem,8.5vw,8rem)]
          font-black
          leading-[0.9]
          tracking-[-0.055em]
          text-[#F5F1FF]
        `}
      >
        Criatividade em
      </span>

      <span
        className={`${instrumentSerif.className}
          block
          -mt-[0.04em]
          text-[clamp(3.5rem,12vw,11.3rem)]
          font-normal
          italic
          leading-[0.9]
          tracking-[-0.04em]
          text-[#C5B1FF]
        `}
      >
        cada interação.
      </span>
    </h1>
  );
}
