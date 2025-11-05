import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getSlugs, getEntry } from "@/lib/content";
import Article from "@/components/Article";

export async function generateStaticParams() {
  const slugs = await getSlugs("projects");
  return slugs.map(s => ({ slug: s }));
}

export default async function ProjectPost({
  params,
}: {
  params: Promise<{ slug: string }>;   
}) {
  const { slug } = await params;       
  try {
    const post = await getEntry("projects", slug);
    return (
      <Article title={post.meta.title} headerBg={post.meta.cover}>
        <MDXRemote source={post.content} />
      </Article>
    );
  } catch {
    return notFound();
  }
}
