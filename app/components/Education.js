"use client";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { DATA } from "../lib/data";

// ── EDUCATION ─────────────────────────────────────────────────────────────────
export function Education() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile || isTablet ? "1fr" : "repeat(2,1fr)";
  return (
    <Section id="education">
      <SectionHeading eyebrow="Academic Background" title="My" accent="Education" />
      <div style={{ display:"grid",gridTemplateColumns:cols,gap:18 }}>
        {DATA.education.map((e,ei) => (
          <div key={ei} className="bnv-card" style={{ padding:isMobile?"22px":"30px",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,0.07),transparent)" }}/>
            <div style={{ fontSize:34,marginBottom:14 }}>{e.icon}</div>
            <h3 style={{ fontFamily:"Syne, sans-serif",fontWeight:800,color:"#fff",fontSize:isMobile?14:16,marginBottom:8,lineHeight:1.3 }}>{e.degree}</h3>
            <div style={{ color:"#00d4ff",fontSize:12,fontWeight:600,marginBottom:14,lineHeight:1.5 }}>{e.school}</div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{e.period}</span>
              <span style={{ background:"rgba(0,212,255,0.1)",border:"1px solid rgba(0,212,255,0.28)",borderRadius:50,padding:"3px 12px",color:"#00d4ff",fontSize:12,fontWeight:700 }}>{e.score}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}