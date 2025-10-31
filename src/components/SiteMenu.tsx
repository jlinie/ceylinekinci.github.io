"use client";
import { useEffect, useState } from "react";
import { useCursor } from "@/components/CursorContext"; 

const items = [
  { label: "Info", href: "/info", img:  "/icon1.jpeg" },
  { label: "Projects", href: "/projects",img:  "/icon4.jpeg"},
  { label: "Research", href: "/research" ,img:  "/icon3.jpeg"},
  { label: "Journal", href: "/journal",img:  "/ikon2.jpeg"}
];

export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const { setColor } = useCursor();

  useEffect(() => {
    if (open) {
      setColor("#C9B6FF");
      document.body.classList.add("overflow-hidden");
    } else {
      setColor("#ffffff");
      document.body.classList.remove("overflow-hidden");
    }
  }, [open, setColor]);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="fixed right-6 top-6 z-10000 h-12 w-12 rounded-full border border-black/10 bg-white/80 backdrop-blur hover:bg-white data-[open=true]:hidden dark:border-white/15 dark:bg-black/60 md:right-8 md:top-8"
        data-open={open}
        data-cursor="link"
      >
        <span className="sr-only">Open</span>
        <div className="mx-auto h-4 w-6">
          <div className="my-1 h-0.5 w-full bg-black dark:bg-white" />
          <div className="my-1 h-0.5 w-full bg-black dark:bg-white" />
          <div className="my-1 h-0.5 w-3/4 bg-black dark:bg-white" />
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-9998 bg-black text-white">
    <button
      onClick={() => setOpen(false)}
      aria-label="Close menu"
      className="absolute right-6 top-6 z-10001 h-12 w-12 rounded-full border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 md:right-8 md:top-8"
      data-cursor="link"
    >
      <div className="mx-auto h-4 w-4 rotate-45">
        <div className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-white" />
        <div className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-white" />
      </div>
    </button>

    <div className="mx-auto flex h-full max-w-6xl flex-col items-center px-6 md:px-10">
      <div className="flex w-full items-center justify-between pt-10">
        <div className="text-lg font-semibold tracking-tight">JLINIE</div>
      </div>

      <nav className="flex flex-1 items-center justify-center w-full">
  <ul className="w-full max-w-6xl">  
    {items.map((it, i) => (
      <li
        key={it.label}
        className={`
          group border-b border-white/10
          ${i === items.length - 1 ? "border-b-0" : ""}
        `}
      >
        <a
          href={it.href}
          data-cursor="link"
          className="
            flex flex-col items-center gap-4 py-6 md:gap-5 md:py-7
            transition-opacity duration-200
            opacity-60 group-hover:opacity-100
          "
        >
          <div className="flex items-center gap-5">
            <div className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-white/10">
              <img
                src={it.img}
                alt={it.label}
                className="
                  h-full w-full object-cover
                  transition-transform duration-700 ease-in-out
                  group-hover:scale-110 group-hover:rotate-360
                "
              />
            </div>


            <span
              className="
                font-semibold tracking-tight
                text-[clamp(2rem,6.5vw,4.5rem)]
                leading-none text-center
              "
            >
              {it.label}
            </span>
          </div>
        </a>
      </li>
    ))}
  </ul>-
</nav>


      <div className="grid w-full max-w-4xl gap-6 pb-10 text-sm text-zinc-300 md:grid-cols-3">
        <div className="text-center md:text-left"> Istanbul / TR</div>
        <div className="text-center">
          ceylinekinci@sabanciuniv.edu<br />+90 538 020 52 18
        </div>
        <div className="space-x-4 text-center md:text-right">
          <a
    href="https://www.linkedin.com/in/ceylin-ekinci/"
    className="underline"
    target="_blank"
    rel="noreferrer"
    data-cursor="link"
  >
    LinkedIn
  </a>
  <a
    href="https://github.com/jlinie"
    className="underline"
    target="_blank"
    rel="noreferrer"
    data-cursor="link"
  >
    GitHub
  </a>
        </div>
      </div>
    </div>
  </div>
)}


    </>
  );
}
