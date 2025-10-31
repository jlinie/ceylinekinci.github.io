import CardsSection from "@/components/CardsSection";
import { getMetaByCategory } from "@/lib/blog";

export default async function ResearchPage() {
  const metas = await getMetaByCategory("research");
  const items = metas.map(m => ({ ...m, href: `/research/${m.slug}` }));

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