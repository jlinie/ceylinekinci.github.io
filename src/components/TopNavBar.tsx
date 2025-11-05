"use client";
import { useState } from "react";
import { useUi } from "@/components/UiContext";

const items = [
  { label: "Info", href: "/info" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Journal", href: "/journal" },
];

export default function TopNavBar() {
  const [hover, setHover] = useState<number | null>(null);
  const { isMenuOpen } = useUi();
  if (isMenuOpen) return null;

  return (
    <nav className="fixed left-1/2 top-6 z-13000 -translate-x-1/2" onMouseLeave={() => setHover(null)} aria-label="Primary">
      <div className="flex items-center gap-1 rounded-full border border-black/5 bg-[#C1DBE8]/15 px-3 py-2 backdrop-blur-xl backdrop-saturate-150 shadow-md">
        {items.map((it, i) => {
          const isHover = hover === i;
          const basis = hover === null ? "auto" : isHover ? "160px" : "96px";
          return (
            <a
              key={it.label}
              href={it.href}
              onMouseEnter={() => setHover(i)}
              data-cursor="link"
              className="group relative flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out text-black/70 hover:text-black"
              style={{ flexBasis: basis }}
            >
              <span
                className={`mr-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700 transition-all duration-300 ${
                  isHover ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                aria-hidden
              />
              <span className="whitespace-nowrap">{it.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
