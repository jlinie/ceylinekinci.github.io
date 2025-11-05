import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type MdxMeta = {
  title: string;
  date?: string;
  summary?: string;
  cover?: string;   
  tags?: string[];
};

const ROOT = process.cwd();
function dirFor(section: "projects" | "research" | "journal" | "info") {
  return path.join(ROOT, "content", section);
}

export async function getSlugs(section: Parameters<typeof dirFor>[0]) {
  const files = await fs.readdir(dirFor(section));
  return files.filter(f => f.endsWith(".mdx") || f.endsWith(".md"))
              .map(f => f.replace(/\.mdx?$/, ""));
}

export async function getEntry(section: Parameters<typeof dirFor>[0], slug: string) {
  const full = path.join(dirFor(section), `${slug}.mdx`);
  const raw = await fs.readFile(full, "utf8");
  const { content, data } = matter(raw);
  return { slug, meta: data as MdxMeta, content };
}

export async function getEntries(section: Parameters<typeof dirFor>[0]) {
  const slugs = await getSlugs(section);
  const arr = await Promise.all(slugs.map(s => getEntry(section, s)));
  // en yeni üstte
  return arr.sort((a,b) => (b.meta.date || "").localeCompare(a.meta.date || ""));
}
