import CardsSection from "@/components/CardsSection";
import { getMetaByCategory } from "@/lib/posts";

export default function ResearchPage() {
  const items = getMetaByCategory("research");
  return (
    <CardsSection
      title="Research"
      intro="Notes, process logs, and material tests."
      items={items}
      bg="#000"
      toneClass="text-white"
    />
  );
}
