import { instrumentSerif, inter } from "@/utils/fonts";

export default function HeroTitle() {
  return (
    <h1 className="text-center mt-3">
      <span
        className={`${inter.className}
          block
          text-[clamp(2.5rem,8.5vw,8rem)]
          max-[360px]:text-[2rem]
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
          max-[360px]:text-[3rem]
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
