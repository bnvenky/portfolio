"use client";
import { useInView } from "../hooks/useInView";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { StatCard } from "./StatCard";
import { DATA } from "../lib/data";

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
export function Experience() {
  const [sRef, sVis] = useInView();
  const { isMobile } = useBreakpoint();
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Career Journey" title="Work" accent="Experience" />
      {/* Stats */}
      <div ref={sRef} style={{ display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:14,marginBottom:48 }}>
        {DATA.stats.map(s => <StatCard key={s.label} {...s} start={sVis} />)}
      </div>
      {/* Timeline */}
      <div style={{ position:"relative",paddingLeft:isMobile?0:44 }}>
        {/* Vertical line — hide on mobile */}
        {!isMobile && (
          <div style={{ position:"absolute",left:16,top:8,bottom:8,width:2,background:"linear-gradient(to bottom,#00d4ff,#7b2ff7,transparent)",borderRadius:2 }}/>
        )}
        {DATA.experience.map((exp,ei) => (
          <div key={ei} style={{ position:"relative",marginBottom:32 }}>
            {/* Dot */}
            {!isMobile && (
              <div style={{ position:"absolute",left:-36,top:18,width:18,height:18,borderRadius:"50%",background:`linear-gradient(135deg,${exp.color},#7b2ff7)`,boxShadow:`0 0 16px ${exp.color}66`,zIndex:1 }}/>
            )}
            <div className="bnv-card" style={{ padding:isMobile?"20px":"28px 30px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:8 }}>
                <div>
                  <h3 style={{ fontFamily:"Syne, sans-serif",fontWeight:800,color:"#fff",fontSize:isMobile?15:18 }}>{exp.role}</h3>
                  <div style={{ color:exp.color,fontWeight:600,fontSize:13,marginTop:3 }}>{exp.company}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ background:`rgba(0,212,255,0.1)`,border:`1px solid ${exp.color}44`,borderRadius:50,padding:"3px 12px",color:exp.color,fontSize:11,fontWeight:700,whiteSpace:"nowrap" }}>{exp.period}</div>
                  <div style={{ color:"#64748b",fontSize:11,marginTop:5 }}>📍 {exp.location}</div>
                </div>
              </div>
              <ul style={{ listStyle:"none",padding:0,marginTop:16,display:"flex",flexDirection:"column",gap:8 }}>
                {exp.highlights.map((h,hi) => (
                  <li key={hi} style={{ display:"flex",gap:10,color:"#94a3b8",fontSize:isMobile?13:14,lineHeight:1.6 }}>
                    <span style={{ color:exp.color,flexShrink:0 }}>▸</span><span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}