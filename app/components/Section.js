"use client";
import { useInView } from "../hooks/useInView";
import { useBreakpoint } from "../hooks/useBreakpoint";

// ── SECTION WRAPPER ────────────────────────────────────────────────────────────
export function Section({ id, children, bg = false }) {
  const [ref, vis] = useInView();
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 60;
  return (
    <section id={id} ref={ref} style={{
      padding: isMobile ? "56px 0" : "80px 0",
      background: bg ? "rgba(255,255,255,0.012)" : "transparent",
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:`0 ${px}px` }}>
        {children}
      </div>
    </section>
  );
}