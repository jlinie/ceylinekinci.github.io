"use client";
import { createContext, useContext, useState } from "react";

type UiState = { isMenuOpen: boolean; setMenuOpen: (v: boolean) => void };
const Ctx = createContext<UiState | null>(null);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return <Ctx.Provider value={{ isMenuOpen, setMenuOpen }}>{children}</Ctx.Provider>;
}

export function useUi() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}