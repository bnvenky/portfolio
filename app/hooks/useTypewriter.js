"use client";
import { useState, useEffect, useRef } from "react";

// ── TYPEWRITER HOOK ────────────────────────────────────────────────────────────
export function useTypewriter(words, speed = 90) {
  const [text, setText] = useState("");
  const stateRef = useRef({ wi: 0, ci: 0, del: false });
  useEffect(() => {
    const tick = () => {
      const { wi, ci, del } = stateRef.current;
      const cur = words[wi];
      if (!del) {
        const next = cur.slice(0, ci + 1);
        setText(next);
        if (ci + 1 === cur.length) {
          setTimeout(() => { stateRef.current.del = true; }, 1600);
        } else {
          stateRef.current.ci = ci + 1;
        }
      } else {
        const next = cur.slice(0, ci - 1);
        setText(next);
        if (ci - 1 === 0) {
          stateRef.current = { wi: (wi + 1) % words.length, ci: 0, del: false };
        } else {
          stateRef.current.ci = ci - 1;
        }
      }
    };
    const id = setInterval(tick, stateRef.current.del ? speed / 2 : speed);
    return () => clearInterval(id);
  }, []);
  return text;
}