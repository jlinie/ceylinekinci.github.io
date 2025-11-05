import CardsSection from "@/components/CardsSection";
import { getEntries } from "@/lib/content";

export default async function ProjectsPage() {
  const posts = await getEntries("projects");
  const items = posts.map(p => ({
    slug: `/projects/${p.slug}`,
    title: p.meta.title,
    cover: p.meta.cover,
    summary: p.meta.summary,
  }));
  return (
    <CardsSection
      title="Projects"
      intro="Selected works & experiments."
      items={items}
      bg="#000"
      toneClass="text-white"
    />
  );
}