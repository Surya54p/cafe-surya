import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import MenuHighlightSection from "@/components/MenuHighlightSection";
import LocationSection from "@/components/LocationSection";
import CtaSection from "@/components/CtaSection";

export default function HomePage() {
  return (
    <main className="min-h-screen text-gray-800">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <MenuHighlightSection />
      <LocationSection />
      <CtaSection />
    </main>
  );
}
