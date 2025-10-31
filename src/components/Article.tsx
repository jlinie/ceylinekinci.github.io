"use client";
import type { ReactNode } from "react";
import clsx from "clsx";

export default function Article({
  title,
  headerBg = "#F8F8F8",
  children,
  className,
}: {
  title: string;
  headerBg?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={clsx("min-h-screen bg-white text-black", className)}>
      <header className="relative">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[220px] md:h-[260px]"
          style={{ backgroundColor: headerBg }}
          aria-hidden
        />
        <div className="mx-auto max-w-4xl px-6 pt-28 md:pt-36">
          <h1 className="text-4xl/tight md:text-6xl/tight font-extrabold tracking-tight">
            {title}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <div className="prose prose-zinc max-w-none prose-img:rounded-xl prose-img:shadow-md">
          {children}
        </div>
      </div>
    </article>
  );
}
