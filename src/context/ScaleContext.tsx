"use client";

import { createContext, useContext, useState } from "react";

export type ScaleValue = 0.8 | 0.9 | 1 | 1.1;

export const SCALE_OPTIONS: ScaleValue[] = [0.8, 0.9, 1, 1.1];

type ScaleContextType = {
  scale: ScaleValue;
  setScale: (s: ScaleValue) => void;
};

const ScaleContext = createContext<ScaleContextType | null>(null);

export function ScaleProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<ScaleValue>(1);
  return (
    <ScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </ScaleContext.Provider>
  );
}

export function useScale() {
  const ctx = useContext(ScaleContext);
  if (!ctx) throw new Error("useScale must be used inside ScaleProvider");
  return ctx;
}
