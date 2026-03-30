"use client";
import { useBreakpoint } from "../hooks/useBreakpoint";

// ── SECTION HEADING ────────────────────────────────────────────────────────────
export function SectionHeading({ eyebrow, title, accent }) {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{ marginBottom:isMobile?32:52,textAlign:"center" }}>
      <div style={{ color:"#00d4ff",fontSize:11,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,marginBottom:10 }}>{eyebrow}</div>
      <h2 style={{ fontFamily:"Syne, sans-serif",fontSize:isMobile?"clamp(24px,6vw,34px)":"clamp(28px,3.5vw,44px)",fontWeight:800,color:"#fff",lineHeight:1.1 }}>
        {title}{" "}
        <span style={{ background:"linear-gradient(135deg,#00d4ff,#7b2ff7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{accent}</span>
      </h2>
    </div>
  );
}