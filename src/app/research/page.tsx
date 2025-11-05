import CardsSection from "@/components/CardsSection";
import { getEntries } from "@/lib/content";

export default async function ResearchPage() {
  const posts = await getEntries("research");
  const items = posts.map(p => ({
    slug: `/research/${p.slug}`,
    title: p.meta.title,
    cover: p.meta.cover,
    summary: p.meta.summary,
  }));
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