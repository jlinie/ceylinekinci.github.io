"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Item = { src: string; href: string; x: number; y: number; w: number; h: number };


const INITIAL_ITEMS: Item[] = [
  {
    "src": "/pic1.jpeg",
    "href": "/projects/p1",
    "x": 14.351744475188077,
    "y": 15.967604914322276,
    "w": 300,
    "h": 300
  },
  {
    "src": "/pic2.png",
    "href": "/projects/p2",
    "x": 55.659716570818865,
    "y": 46.421937989483915,
    "w": 340,
    "h": 280
  },
  {
    "src": "/pic3.jpeg",
    "href": "/journal/j1",
    "x": 69.52749181676793,
    "y": 16.71328990917488,
    "w": 300,
    "h": 320
  },
  {
    "src": "/pic4.png",
    "href": "/research/r1",
    "x": 38.38920593261719,
    "y": 16.31825263864301,
    "w": 320,
    "h": 300
  },
  {
    "src": "/pic5.png",
    "href": "/projects/p3",
    "x": 89.45295545789931,
    "y": 33.796394987059344,
    "w": 340,
    "h": 320
  },
  {
    "src": "/pic6.png",
    "href": "/projects/p4",
    "x": 75.73076036241319,
    "y": 76.33467801098753,
    "w": 300,
    "h": 300
  },
  {
    "src": "/pic8.png",
    "href": "/contacts",
    "x": 52.54596286349826,
    "y": 90.66062137998384,
    "w": 320,
    "h": 280
  },
  {
    "src": "/pic9.png",
    "href": "/projects/p4",
    "x": 16.538419370298033,
    "y": 90.64219808343597,
    "w": 300,
    "h": 300
  },
  {
    "src": "/pic11.jpeg",
    "href": "/projects/p1",
    "x": 32.365397700557004,
    "y": 67.04225587140164,
    "w": 300,
    "h": 300
  },
  {
    "src": "/pic12.jpeg",
    "href": "/projects/p1",
    "x": 7.100474039713542,
    "y": 53.76413279566271,
    "w": 300,
    "h": 300
  }

];
export default function ParallaxWall({
  scaleX = 3, // tuval genişliği: 3× viewport
  scaleY = 2, // tuval yüksekliği: 2× viewport
  initialItems = INITIAL_ITEMS,
}: {
  scaleX?: number;
  scaleY?: number;
  initialItems?: Item[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // === LAYOUT STATE (edit mode’da güncellenecek) ===
  const [items, setItems] = useState<Item[]>(initialItems);

  // hover büyütme
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // kamera/pan hesapları
  const target = useRef({ x: 0, y: 0 });   // -0.5..+0.5
  const current = useRef({ x: 0, y: 0 });
  const limits = useRef({ maxX: 0, maxY: 0 });
  const rafRef = useRef<number | null>(null);

  // === EDIT MODE ===
  const [edit, setEdit] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{dx: number; dy: number}>({dx:0, dy:0});

  // tuval boyutuna göre pan limitlerini hesapla
  useEffect(() => {
    const canvasW = window.innerWidth * scaleX;
    const canvasH = window.innerHeight * scaleY;
    limits.current.maxX = Math.max(0, (canvasW - window.innerWidth) / 2);
    limits.current.maxY = Math.max(0, (canvasH - window.innerHeight) / 2);
  }, [scaleX, scaleY]);

  // kamera hareketi (mouse’la pan)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth - 0.5;
      target.current.y = e.clientY / window.innerHeight - 0.5;
    };
    const speed = 0.12;
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * speed;
      current.current.y += (target.current.y - current.current.y) * speed;
      const tx = -current.current.x * 2 * limits.current.maxX;
      const ty = -current.current.y * 2 * limits.current.maxY;
      if (containerRef.current) containerRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // hotkeys: E → edit toggle, S → save JSON (edit açıkken)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e") {
        setEdit(v => !v);
      }
      if (edit && (e.key.toLowerCase() === "s")) {
        e.preventDefault();
        console.log("%cUpdated layout JSON ↓", "color:#0a0");
        console.log(JSON.stringify(items, null, 2));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edit, items]);

  // edit’te sürükleme: mouse down/up/move
  useEffect(() => {
    if (!edit) return;
    const canvasEl = containerRef.current!;
    const onMouseMove = (e: MouseEvent) => {
      if (dragIdx === null) return;
      const rect = canvasEl.getBoundingClientRect();
      // canvas içi piksel koordinat
      const px = e.clientX - rect.left - dragOffset.dx;
      const py = e.clientY - rect.top - dragOffset.dy;
      // yüzdeye çevir (tuval geniş/yüksekliği)
      const canvasW = rect.width;
      const canvasH = rect.height;
      const xPct = (px / canvasW) * 100;
      const yPct = (py / canvasH) * 100;
      setItems(prev => prev.map((it, i) => i === dragIdx
        ? { ...it, x: clamp(xPct, 0, 100), y: clamp(yPct, 0, 100) }
        : it
      ));
    };
    const onMouseUp = () => { setDragIdx(null); };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [edit, dragIdx, dragOffset]);

  // edit’te boyutlandırma: ok tuşları (⇧ ile 10px)
  useEffect(() => {
    if (!edit) return;
    const onKey = (e: KeyboardEvent) => {
      if (dragIdx === null) return;
      const step = e.shiftKey ? 10 : 2;
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
      setItems(prev => prev.map((it, i) => {
        if (i !== dragIdx) return it;
        if (e.key === "ArrowLeft")  return { ...it, w: Math.max(40, it.w - step) };
        if (e.key === "ArrowRight") return { ...it, w: it.w + step };
        if (e.key === "ArrowUp")    return { ...it, h: Math.max(40, it.h - step) };
        if (e.key === "ArrowDown")  return { ...it, h: it.h + step };
        return it;
      }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edit, dragIdx]);

  // Canvas’a tıklayınca sürükleme offset’ini ayarla
  const beginDrag = (i: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!edit) return;
    e.preventDefault(); // edit’te linke gitme
    const a = e.currentTarget;
    const rect = a.getBoundingClientRect();
    setDragIdx(i);
    setDragOffset({ dx: e.clientX - rect.left, dy: e.clientY - rect.top });
  };

  return (
  <div className="relative h-screen w-screen overflow-hidden bg-[#FDF5E8]">
    {/* üstte edit bar (sadece edit açıkken) */}
    {edit && (
      <div className="pointer-events-auto fixed left-1/2 top-4 z-12000 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs text-white backdrop-blur">
        <span className="opacity-80">
          Edit Mode — sürükle: yer değiştir · ok tuşları: boyut (⇧ ile ×5) ·
          <button
            className="ml-2 underline"
            onClick={() => { console.log(JSON.stringify(items, null, 2)); }}
          >
            Save JSON (console)
          </button>
        </span>
      </div>
    )}

    {/* büyük tuval */}
    <div
      ref={containerRef}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform ${edit ? "pointer-events-auto" : ""}`}
      style={{ width: `${scaleX * 100}vw`, height: `${scaleY * 100}vh` }}
    >
      {/* edit grid */}
      {edit && (
        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(0,0,0,0.06)_95%),linear-gradient(90deg,transparent_95%,rgba(0,0,0,0.06)_95%)] bg-size-[40px_40px] pointer-events-none" />
      )}

      {items.map((it, i) => (
        <a
          key={i}
          href={edit ? "#" : it.href}
          className={`absolute block overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 transition-transform duration-300 will-change-transform ${edit ? "cursor-grab" : ""}`}
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: it.w,
            height: it.h,
            transform: `translate(-50%, -50%) scale(${hoverIdx === i && !edit ? 1.06 : 1})`,
            pointerEvents: "auto",
          }}
          onMouseEnter={() => setHoverIdx(i)}
          onMouseLeave={() => setHoverIdx(null)}
          onMouseDown={(e) => beginDrag(i, e)}
          data-cursor="link"
        >
          {edit && <div className="pointer-events-none absolute inset-0 border-2 border-emerald-500/60" />}
          <Image src={it.src} alt="" fill className="object-cover" sizes="400px" />
        </a>
      ))}
    </div>

    {/* Edit toggle */}
    <button
      onClick={() => setEdit(v => !v)}
      className="fixed right-4 bottom-4 z-12000 rounded-full bg-black text-white px-3 py-2 text-xs opacity-70 hover:opacity-100"
    >
      {edit ? "Exit Edit (E)" : "Edit Layout (E)"}
    </button>
  </div>
);

}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
