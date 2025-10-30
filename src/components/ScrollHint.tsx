"use client";
import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const viewportBottom = scrollY + window.innerHeight;

      if (viewportBottom >= footerTop - 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = () =>
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={go}
      className="fixed left-1/2 bottom-8 z-9500 -translate-x-1/2 rounded-2xl bg-white px-4 py-2 text-sm text-zinc-600 shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-105"
    >
      Scroll
      <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
    </button>
  );
}
