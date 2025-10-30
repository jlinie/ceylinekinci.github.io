// src/app/page.tsx
import HeroWord from "@/components/HeroWord";
import ParallaxWall from "@/components/ParallaxWall";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <HeroWord />
      {/* görseller yazının üstünde dursun */}
      <div className="relative z-10">
        <ParallaxWall />
      </div>
    </main>
  );
}
