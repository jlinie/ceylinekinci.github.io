import CardsSection from "@/components/CardsSection";
import { getEntries } from "@/lib/content";

export default async function JournalPage() {
  const posts = await getEntries("journal");
  const items = posts.map(p => ({
    slug: `/journal/${p.slug}`,
    title: p.meta.title,
    cover: p.meta.cover,
    summary: p.meta.summary,
  }));
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