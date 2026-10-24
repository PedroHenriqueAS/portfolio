import HeroFooter from "@/components/hero/hero-footer";
import HeroTitle from "@/components/hero/hero-title";
import InfoCard from "@/components/hero/info-card";
import JourneySection from "@/components/journey/journey-section";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex h-dvh w-full justify-center bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/hero.png')",
  }}>
      <div className="w-[1440px]">
        <Navbar />
        <HeroTitle />
        <InfoCard />
        <HeroFooter />
        <JourneySection />
      </div>
    </div>
  );
}
