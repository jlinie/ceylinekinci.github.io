"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Item = { src: string; href: string; x: number; y: number; w: number; h: number };


const INITIAL_ITEMS: Item[] = [
  {
    "src": "/pic1.png",
    "href": "/journal/j3",
    "x": 27.963550708912038,
    "y": 18.680914517106682,
    "w": 300,
    "h": 300
  },
  {
    "src": "/pic2.png",
    "href": "/projects/p2",
    "x": 50.49844812463831,
    "y": 43.25609629964593,
    "w": 300,
    "h": 500
  },
  {
    "src": "/pic3.jpg",
    "href": "/journal/j1",
    "x": 69.52749181676793,
    "y": 16.71328990917488,
    "w": 300,
    "h": 320
  },
  {
    "src": "/pic5.png",
    "href": "/research/r1",
    "x": 43.66780687319037,
    "y": 12.776454681246152,
    "w": 320,
    "h": 300
  },
  {
    "src": "/pic6.png",
    "href": "/projects/p3",
    "x": 83.64355892881379,
    "y": 35.37417256773399,
    "w": 340,
    "h": 320
  },
  {
    "src": "/pic7.png",
    "href": "/projects/p4",
    "x": 68.8117246274595,
    "y": 52.62737556044104,
    "w": 300,
    "h": 200
  },
  {
    "src": "/pic8.png",
    "href": "/contacts",
    "x": 46.113366021050346,
    "y": 88.66665093182343,
    "w": 320,
    "h": 380
  },
  {
    "src": "/pic9.png",
    "href": "/projects/p14",
    "x": 26.33809972692419,
    "y": 91.44747879704819,
    "w": 300,
    "h": 500
  },
  {
    "src": "/pic10.jpeg",
    "href": "/projects/p1",
    "x": 35.72991861625724,
    "y": 61.91858752020474,
    "w": 300,
    "h": 300
  },
  {
    "src": "/pic11.png",
    "href": "/projects/p1",
    "x": 20.298292371961807,
    "y": 54.64958604333437,
    "w": 300,
    "h": 300
  },
  {
    "src": "/pic12.png",
    "href": "/journal/j2",
    "x": 60.00319869429976,
    "y": 78.78129705419681,
    "w": 300,
    "h": 300
  }
];
export default function ParallaxWall({
  scaleX = 3, 
  scaleY = 2, 
  initialItems = INITIAL_ITEMS,
}: {
  scaleX?: number;
  scaleY?: number;
  initialItems?: Item[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [items, setItems] = useState<Item[]>(initialItems);

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const target = useRef({ x: 0, y: 0 });   
  const current = useRef({ x: 0, y: 0 });
  const limits = useRef({ maxX: 0, maxY: 0 });
  const rafRef = useRef<number | null>(null);

  const [edit, setEdit] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{dx: number; dy: number}>({dx:0, dy:0});

  useEffect(() => {
    const canvasW = window.innerWidth * scaleX;
    const canvasH = window.innerHeight * scaleY;
    limits.current.maxX = Math.max(0, (canvasW - window.innerWidth) / 2);
    limits.current.maxY = Math.max(0, (canvasH - window.innerHeight) / 2);
  }, [scaleX, scaleY]);

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

  useEffect(() => {
    if (!edit) return;
    const canvasEl = containerRef.current!;
    const onMouseMove = (e: MouseEvent) => {
      if (dragIdx === null) return;
      const rect = canvasEl.getBoundingClientRect();
      const px = e.clientX - rect.left - dragOffset.dx;
      const py = e.clientY - rect.top - dragOffset.dy;
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

  const beginDrag = (i: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!edit) return;
    e.preventDefault(); 
    const a = e.currentTarget;
    const rect = a.getBoundingClientRect();
    setDragIdx(i);
    setDragOffset({ dx: e.clientX - rect.left, dy: e.clientY - rect.top });
  };
const showEdit = process.env.NODE_ENV !== "production"; 
  return (
  <div className="relative h-screen w-screen overflow-hidden bg-white">

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

    <div
      ref={containerRef}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform ${edit ? "pointer-events-auto" : ""}`}
      style={{ width: `${scaleX * 100}vw`, height: `${scaleY * 100}vh` }}
    >
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

  </div>
);

}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
