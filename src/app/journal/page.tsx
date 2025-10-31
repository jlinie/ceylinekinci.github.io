import CardsSection from "@/components/CardsSection";
import { getMetaByCategory } from "@/lib/blog";

export default async function JournalPage() {
  const metas = await getMetaByCategory("journal");
  const items = metas.map(m => ({ ...m, href: `/journal/${m.slug}` }));

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
