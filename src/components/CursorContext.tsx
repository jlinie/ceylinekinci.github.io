"use client";
import { createContext, useContext, useState, useMemo } from "react";

type CursorCtx = {
  color: string;
  setColor: (c: string) => void;
};
const Ctx = createContext<CursorCtx | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState<string>("#ffffff"); // varsayılan beyaz
  const value = useMemo(() => ({ color, setColor }), [color]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCursor() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCursor must be used within <CursorProvider>");
  return v;
}
