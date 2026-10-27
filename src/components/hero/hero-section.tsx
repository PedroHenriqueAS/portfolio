import Navbar from "../navbar";
import HeroTitle from "./hero-title";
import InfoCard from "./info-card";
import HeroStudio from "./hero-studio";

export default function HeroSection() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/studio/lights-on.webp"
        fetchPriority="high"
      />
      <HeroStudio
        header={<Navbar />}
        title={<HeroTitle />}
        intro={<InfoCard />}
      />
    </>
  );
}
