import { JSX } from "react";

export type Post = {
  slug: string; 
  title: string;
  cover: string;
  headerBg?: string;
  category: "projects" | "research" | "journal";
  content: () => JSX.Element;
};

export type MetaPost = Omit<Post, "content">;

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}

export function getMetaByCategory(category: Post["category"]) {
  return posts
    .filter((p) => p.category === category)
    .map(({ content, ...meta }) => meta);
}

export const posts: Post[] = [
  {
    slug: "/projects/p1",
    title: "Poster Series",
    cover: "/pic1.jpeg",
    headerBg: "#FFF1B5",
    category: "projects",
    content: () => (
      <>
        <p>
          Açıklama
        </p>
        <img src="/pic1.jpeg" alt="Poster" className="my-6 rounded-xl" />
        <p>
          açıklama2
        </p>
      </>
    ),
  },
  {
    slug: "/projects/p2",
    title: "Typeface Study",
    cover: "/pic2.png",
    headerBg: "#C1DBE8",
    category: "projects",
    content: () => (
      <>
        <p>devam</p>
        <img src="/pic2.png" alt="Typeface" className="my-6 rounded-xl" />
        <p>açıklamalar</p>
      </>
    ),
  },
  {
    slug: "/journal/j1",
    title: "Booklet",
    cover: "/pic3.jpeg",
    headerBg: "#FFE5CB",
    category: "journal",
    content: () => (
      <>
        <p>tasarım gelebilir</p>
        <img src="/pic3.jpeg" alt="Booklet" className="my-6 rounded-xl" />
        <p>notes</p>
      </>
    ),
  },
];
