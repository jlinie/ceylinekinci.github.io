import "server-only";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type MetaPost = {
  slug: string;
  title: string;
  category: "projects" | "research" | "journal";
  cover?: string;      
  headerBg?: string;
  date?: string;
  _filepath?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function getMetaByCategory(category: MetaPost["category"]): Promise<MetaPost[]> {
  const dir = path.join(CONTENT_DIR, category);
  let files: string[] = [];
  try {
    files = (await fs.readdir(dir))
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => path.join(dir, f));
  } catch {
    return [];
  }

  const metas: MetaPost[] = [];
  for (const fp of files) {
    const raw = await fs.readFile(fp, "utf8");
    const { data } = matter(raw);
    metas.push({
      slug: String(data.slug),
      title: String(data.title),
      category: data.category as MetaPost["category"],
      cover: data.cover ? String(data.cover) : undefined,
      headerBg: data.headerBg ? String(data.headerBg) : undefined,
      date: data.date ? String(data.date) : undefined,
      _filepath: fp,
    });
  }

  metas.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return metas;
}

export async function getPostSource(slug: string) {
  const cats: MetaPost["category"][] = ["projects", "research", "journal"];
  for (const c of cats) {
    const metas = await getMetaByCategory(c);
    const match = metas.find((m) => m.slug === slug);
    if (match?._filepath) {
      const raw = await fs.readFile(match._filepath, "utf8");
      const { content, data } = matter(raw);
      return {
        meta: match,
        mdx: content,
        headerBg: (data.headerBg as string | undefined) ?? match.headerBg,
        title: (data.title as string) ?? match.title,
      };
    }
  }
  return null;
}
