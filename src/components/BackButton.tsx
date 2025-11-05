"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUi } from "./UiContext";

export default function BackButton() {
  const pathname = usePathname();
  const { isMenuOpen } = useUi();
  const isHome = pathname === "/";

  if (isHome || isMenuOpen) return null;

  return (
    <Link
      href="/"
      aria-label="Go back"
      className="fixed left-4 top-4 z-11000 rounded-full border border-black/20 bg-white/80 px-3 py-2 backdrop-blur hover:bg-white"
    >
      ← 
    </Link>
  );
}