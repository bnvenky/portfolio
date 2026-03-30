"use client";
import { useState, useEffect } from "react";

// ── COUNTER HOOK ───────────────────────────────────────────────────────────────
export function useCounter(target, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target);
    if (isNaN(num)) return;
    let s = null;
    const step = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor(p * num));
      if (p < 1) requestAnimationFrame(step);
      else setCount(num);
    };
    requestAnimationFrame(step);
  }, [start]);
  return count;
}