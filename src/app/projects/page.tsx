import CardsSection from "@/components/CardsSection";
import { getMetaByCategory } from "@/lib/blog";

export default async function ProjectsPage() {
  const metas = await getMetaByCategory("projects");
  const items = metas.map(m => ({ ...m, slug: `/posts/${m.slug}` }));

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
