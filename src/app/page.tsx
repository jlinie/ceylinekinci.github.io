import HeroWord from "@/components/HeroWord";
import ParallaxWall from "@/components/ParallaxWall";
import ScrollHint from "@/components/ScrollHint";
import IntroSection from "@/components/IntroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <HeroWord />
      <div className="relative z-9000">
        <ParallaxWall />
      </div>
      <ScrollHint />
      <IntroSection />
      <Footer />
    </main>
  );
}
