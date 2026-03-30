"use client";
import { useState, useEffect } from "react";

// ── BREAKPOINT HOOK ────────────────────────────────────────────────────────────
export function useBreakpoint() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w };
}