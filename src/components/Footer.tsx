import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm md:grid-cols-3">
        <div className="text-center md:text-left">{site.location}</div>
        <div className="text-center">
          {site.email}<br />{site.phone}
        </div>
        <div className="space-x-4 text-center md:text-right">
          {site.socials.map(s => (
            <a key={s.label} className="underline" href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
