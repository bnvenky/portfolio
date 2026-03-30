"use client";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { scrollTo } from "../lib/smoothScroll";
import { DATA } from "../lib/data";

// ── FOOTER ────────────────────────────────────────────────────────────────────
export function Footer() {
  const { isMobile } = useBreakpoint();
  return (
    <footer style={{ padding:isMobile?"22px 20px":"26px 60px",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
        <button onClick={() => scrollTo("about")} style={{ fontFamily:"Syne, sans-serif",fontWeight:800,fontSize:18,color:"#fff",background:"none",border:"none",cursor:"pointer",padding:0 }}>
          NVB<span style={{ color:"#00d4ff" }}>.</span>
        </button>
        <div style={{ color:"#334155",fontSize:12,textAlign:"center" }}>
          © 2025 Bokka Naga Venkatesh
        </div>
        <div style={{ display:"flex",gap:16 }}>
          {[
            { icon:"💼", url:DATA.linkedin },
            { icon:"🐙", url:DATA.github },
            { icon:"📧", url:`mailto:${DATA.email}` },
          ].map(s => (
            <a key={s.url} href={s.url} target={s.url.startsWith("mailto")?"_self":"_blank"} rel="noopener noreferrer"
              style={{ fontSize:20,textDecoration:"none",transition:"transform .2s,filter .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.filter="brightness(1.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.filter=""; }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}