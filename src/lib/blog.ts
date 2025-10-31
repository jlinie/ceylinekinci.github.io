import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Category = "projects" | "research" | "journal";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type MetaPost = {
  slug: string;
  title: string;
  cover?: string;
  headerBg?: string;
  category: Category;
  date?: string;
  _filepath?: string;
};

function readFile(fp: string) {
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

export async function getMetaByCategory(category: Category): Promise<MetaPost[]> {
  const dir = path.join(CONTENT_ROOT, category);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));
  return files.map(f => {
    const fp = path.join(dir, f);
    const { data } = readFile(fp);
    const slug = path.basename(f, ".mdx");
    return {
      slug,
      title: data.title ?? slug,
      cover: data.cover,
      headerBg: data.headerBg,
      category,
      date: data.date,
      _filepath: fp,
    } satisfies MetaPost;
  });
}

export async function getPostByCategoryAndSlug(category: Category, slug: string) {
  const fp = path.join(CONTENT_ROOT, category, `${slug}.mdx`);
  const { data, content } = readFile(fp);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      cover: data.cover,
      headerBg: data.headerBg,
      category,
      date: data.date,
      _filepath: fp,
    } as MetaPost,
    mdx: content,
  };
}

export async function getSlugsByCategory(category: Category): Promise<string[]> {
  const metas = await getMetaByCategory(category);
  return metas.map(m => m.slug);
}
