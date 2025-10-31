import CardsSection from "@/components/CardsSection";
import { getMetaByCategory } from "@/lib/posts";

export default function JournalPage() {
  const items = getMetaByCategory("journal");
  return (
    <CardsSection
      title="Journal"
      intro="Trips, observations, and visual notes."
      items={items}
      bg="#000"
      toneClass="text-white"
    />
  );
}
