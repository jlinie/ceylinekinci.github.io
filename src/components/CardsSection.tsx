"use client";

import PostCard from "@/components/PostCard";

export type CardItem = {
  slug: string;          
  title: string;
  cover?: string;
  headerBg?: string;
  summary?: string;
};

export default function CardsSection({
  title,
  intro,
  items,
  bg = "#000",
  toneClass = "text-white",
  compact,
}: {
  title: string;
  intro?: string;
  items: CardItem[];
  bg?: string;
  toneClass?: string;
  compact?: boolean;
}) {
  const padY = compact ? "py-28" : "py-32";
  const gap = compact ? "gap-5" : "gap-6";
  const mtGrid = compact ? "mt-8" : "mt-10";

  return (
    <section className={`${toneClass} min-h-screen`} style={{ background: bg }}>
      <div className={`mx-auto w-full max-w-6xl px-6 ${padY}`}>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">{title}</h1>
        {intro && <p className="max-w-2xl text-base/relaxed opacity-80">{intro}</p>}

        <div className={`grid ${mtGrid} grid-cols-1 ${gap} sm:grid-cols-2 lg:grid-cols-3`}>
          {items.map((it) => (
            <PostCard key={it.slug} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}
