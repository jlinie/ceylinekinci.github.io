"use client";
import Image from "next/image";
import Link from "next/link";
import type { CardItem } from "@/components/CardsSection";

export default function PostCard({ item }: { item: CardItem }) {
  const bg = item.headerBg ?? "#eee";

  return (
    <Link
      href={item.slug} // slug her zaman string → <Link> şikayet etmez
      className="group relative block rounded-3xl p-4 md:p-5 ring-1 ring-black/10
                 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-transform duration-300
                 hover:-translate-y-1 hover:scale-[1.02] will-change-transform"
      style={{ backgroundColor: bg }}
    >
      {item.cover && (
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={item.cover}
            alt=""
            width={1200}
            height={800}
            className="h-56 w-full object-cover transition-transform duration-500
                       group-hover:scale-105 group-hover:rotate-[1.5deg]"
            sizes="(min-width:1024px) 350px, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_-40px_60px_rgba(0,0,0,0.06)]" />
        </div>
      )}

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-black/80">
        {item.title}
      </h3>

      <span className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-all duration-300 group-hover:px-5 group-hover:py-2.5">
        Read!
      </span>
    </Link>
  );
}
