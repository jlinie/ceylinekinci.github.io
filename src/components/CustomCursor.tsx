"use client";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/components/CursorContext"; 

export default function CustomCursor() {
  const { color } = useCursor();

  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;
  if (isCoarse) return null;

  const rafRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const [visible, setVisible] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
  const shownRef = { current: false };
  const onMove = (e: MouseEvent) => {
    target.current.x = e.clientX;
    target.current.y = e.clientY;
    setVisible((v) => {
      if (!v) return true;
      return v; 
    });
  };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setIsDown(true);
    const onUp = () => setIsDown(false);
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el?.closest?.(
        'a,button,[role="button"],input,textarea,select,[data-cursor="link"]'
      );
      setIsHover(Boolean(isInteractive));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);

    const speed = 0.35; 
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * speed;
      current.current.y += (target.current.y - current.current.y) * speed;
      const t = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      if (cursorRef.current) cursorRef.current.style.transform = t;
      if (dotRef.current) dotRef.current.style.transform = t;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const outerScale = isDown ? 0.8 : isHover ? 1.8 : 1;
  const outerOpacity = visible ? 1 : 0;
  const dotScale = isDown ? 0.6 : isHover ? 0.8 : 1;
  const dotOpacity = visible ? 1 : 0;
const isLoadingScreen =
  typeof window !== "undefined" &&
  document.body.classList.contains("loading-active");

const finalOuterOpacity = isLoadingScreen ? 0 : outerOpacity;
const finalDotOpacity = isLoadingScreen ? 0 : dotOpacity;
  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-9999 -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference transition-[opacity,transform] duration-150 will-change-transform"
        style={{
          width: 36,
          height: 36,
          opacity: finalOuterOpacity,
          borderColor: color,
          transform: `translate3d(${current.current.x}px, ${current.current.y}px, 0) scale(${outerScale})`,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-9999 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[opacity,transform,background-color] duration-150 will-change-transform"
        style={{
          width: 6,
          height: 6,
          opacity: finalOuterOpacity,
          backgroundColor: color,
          transform: `translate3d(${current.current.x}px, ${current.current.y}px, 0) scale(${dotScale})`,
        }}
      />
    </>
  );
}
