import { notFound } from "next/navigation";
import { getSlugs, getEntry } from "@/lib/content";
import Article from "@/components/Article";
import Mdx from "@/components/Mdx";

export async function generateStaticParams() {
  const slugs = await getSlugs("research");
  return slugs.map((s) => ({ slug: s }));
}

export default async function ResearchPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Next 16: params is a Promise
  try {
    const post = await getEntry("research", slug);
    return (
      <Article
        title={post.meta.title}
        headerBg={post.meta.cover}
        titleClass={post.meta.titleClass}
        bodyFont={post.meta.bodyFont}
        contentMaxWidth={post.meta.contentMaxWidth}
      >
        <Mdx source={post.content} imageClass={post.meta.imageClass} />
      </Article>
    );
  } catch {
    return notFound();
  }
}
