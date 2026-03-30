"use client";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { DATA } from "../lib/data";

// ── SKILLS ────────────────────────────────────────────────────────────────────
export function Skills() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";
  return (
    <Section id="skills" bg>
      <SectionHeading eyebrow="What I Work With" title="Technical" accent="Skills" />
      <div style={{ display:"grid",gridTemplateColumns:cols,gap:18 }}>
        {Object.entries(DATA.skills).map(([cat,items]) => (
          <div key={cat} className="bnv-card" style={{ padding:isMobile?"20px":"26px 22px" }}>
            <div style={{ fontFamily:"Syne, sans-serif",fontWeight:700,color:"#fff",fontSize:14,marginBottom:14 }}>{cat}</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>
              {items.map(s => <span key={s} className="skill-pill">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}