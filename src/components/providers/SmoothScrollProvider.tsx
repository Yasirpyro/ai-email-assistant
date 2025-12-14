import { createContext, useContext, type ReactNode } from "react";
import { useSmoothScroll, getLenis } from "@/hooks/use-smooth-scroll";
import type Lenis from "lenis";

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      lock?: boolean;
    }
  ) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const smoothScroll = useSmoothScroll();

  return (
    <SmoothScrollContext.Provider value={smoothScroll}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScrollContext() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error(
      "useSmoothScrollContext must be used within a SmoothScrollProvider"
    );
  }
  return context;
}

// Re-export getLenis for direct access
export { getLenis };
