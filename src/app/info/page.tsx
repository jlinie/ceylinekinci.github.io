import { MDXRemote } from "next-mdx-remote/rsc";
import { getEntry } from "@/lib/content";
import Article from "@/components/Article";

export default function InfoPage() {
  return (
    <main className="p-16">
      <h1 className="text-4xl font-bold">Info</h1>
      <p>Merhaba!</p>
    </main>
  );
}
