"use client";
import Image from "next/image";
import Link from "next/link";
import type { CardItem } from "@/components/CardsSection";
import { colorForSlug, isLight } from "@/lib/palette";

export default function PostCard({ item }: { item: CardItem }) {
  // headerBg gelmişse onu, gelmemişse paletten slug'a göre rengi kullan
  const bg = item.headerBg ?? colorForSlug(item.slug);
  const light = isLight(bg);

  const titleClass = light ? "text-black/85" : "text-white";
  const btnBg = light ? "#111" : "#fff";
  const btnText = light ? "#fff" : "#111";

  return (
    <Link
      href={item.slug}
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

      <h3 className={`mt-4 text-xl font-semibold tracking-tight ${titleClass}`}>
        {item.title}
      </h3>

      <span
        className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium
                   transition-all duration-300 group-hover:px-5 group-hover:py-2.5"
        style={{ backgroundColor: btnBg, color: btnText }}
      >
        Go!
      </span>
    </Link>
  );
}
