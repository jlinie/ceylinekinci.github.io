import Article from "@/components/Article";
import { getEntry } from "@/lib/content";
import Mdx from "@/components/Mdx";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const post = await getEntry("info", "info");
  return {
    title: `${post.meta.title} — Ceylin`,
    description: post.meta.summary ?? "About / Info",
    openGraph: {
      title: post.meta.title,
      description: post.meta.summary,
      images: post.meta.cover ? [{ url: post.meta.cover }] : undefined,
    },
  };
}

export const dynamic = "error";

export default async function InfoPage() {
  const post = await getEntry("info", "info");
  return (
    <Article
      title={post.meta.title}
      headerBg={post.meta.cover ?? "#000"}
      toneClass={post.meta.cover ? "text-black" : "text-white"}
      titleClass={post.meta.titleClass}           
      bodyFont={post.meta.bodyFont}
      contentMaxWidth={post.meta.contentMaxWidth}
    >
      <Mdx
        source={post.content}
        imageClass={post.meta.imageClass}
      />
    </Article>
  );
}
