"use client";
import { useState, useEffect, useRef } from "react";

// ── TYPEWRITER HOOK ────────────────────────────────────────────────────────────
export function useTypewriter(words, speed = 90, loop = false) {
  const [text, setText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let timeout;

    const tick = () => {
      const fullText = words[currentIndex] ?? "";

      if (isDeleting) {
        currentText = fullText.slice(0, currentText.length - 1);
      } else {
        currentText = fullText.slice(0, currentText.length + 1);
      }

      setText(currentText);

      if (!isDeleting && currentText === fullText) {
        // wait before deleting or finishing
        if (!loop && currentIndex === words.length - 1) {
          return; // stop on final word
        }
        timeout = setTimeout(() => {
          isDeleting = true;
          tick();
        }, 1400);
        return;
      }

      if (isDeleting && currentText === "") {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % words.length;
      }

      const delay = isDeleting ? speed / 2 : speed;
      timeout = setTimeout(tick, delay);
    };

    tick();

    return () => clearTimeout(timeout);
  }, [words.join("\u0000"), speed, loop]);

  return text;
}