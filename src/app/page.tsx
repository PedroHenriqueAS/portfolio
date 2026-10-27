import ContactSection from "@/components/contact/contact-section";
import HeroSection from "@/components/hero/hero-section";
import JourneySection from "@/components/journey/journey-section";
import ProjectsSection from "@/components/projects/projects-section";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <div className="mx-auto w-full min-w-0 max-w-[1440px]">
        <JourneySection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}
