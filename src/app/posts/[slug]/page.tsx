import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostSource } from "@/lib/blog";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const data = await getPostSource(params.slug);
  if (!data) return <div className="p-10">Not found.</div>;

  const { mdx, headerBg, title } = data;

  return (
    <>
      <header className="relative z-0 pt-24 pb-16" style={{ background: headerBg ?? "#fff" }}>
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        </div>
      </header>

      <main className="bg-white text-black">
        <article className="prose prose-zinc max-w-3xl px-6 py-10 mx-auto">
          <MDXRemote source={mdx} />
        </article>
      </main>
    </>
  );
}
