"use client";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { useTypewriter } from "../hooks/useTypewriter";
import { scrollTo } from "../lib/smoothScroll";
import { DATA } from "../lib/data";

// ── HERO ──────────────────────────────────────────────────────────────────────
export function Hero() {
  const typed = useTypewriter(["Full-Stack Developer","MERN Stack Engineer","AI Automation Developer","n8n Workflow Engineer","SaaS Builder","React.js Expert","API Architect"], 90, true);
  const { isMobile, isTablet } = useBreakpoint();
  const photoSize = isMobile ? 180 : isTablet ? 210 : 260;

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: isMobile ? "100px 20px 60px" : isTablet ? "110px 32px 70px" : "120px 60px 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* BG orbs */}
      <div style={{ position:"absolute",inset:0,pointerEvents:"none" }}>
        <div style={{ position:"absolute",top:"12%",left:"4%",width:isMobile?180:380,height:isMobile?180:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,0.11),transparent 70%)",animation:"float 8s ease-in-out infinite" }}/>
        <div style={{ position:"absolute",bottom:"12%",right:"4%",width:isMobile?180:420,height:isMobile?180:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(123,47,247,0.09),transparent 70%)",animation:"float 11s ease-in-out infinite reverse" }}/>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,212,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.025) 1px,transparent 1px)",backgroundSize:isMobile?"40px 40px":"60px 60px" }}/>
      </div>

      <div style={{
        maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", zIndex:1,
        display:"flex", alignItems:"center", gap: isMobile?0:isTablet?40:80,
        flexDirection: isMobile||isTablet ? "column-reverse" : "row",
        textAlign: isMobile||isTablet ? "center" : "left",
      }}>
        {/* ── TEXT ── */}
        <div style={{ flex:1, animation:"fadeUp 0.8s ease" }}>
          {/* Available badge */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",borderRadius:50,border:"1px solid rgba(0,212,255,0.3)",marginBottom:20,background:"rgba(0,212,255,0.05)" }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"pulseGlow 2s infinite" }}/>
            <span style={{ color:"#00d4ff",fontSize:11,fontWeight:600,letterSpacing:"0.1em" }}>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <h1 style={{ fontFamily:"Syne, sans-serif",fontSize:isMobile?"clamp(30px,8vw,40px)":isTablet?"clamp(34px,5vw,48px)":"clamp(40px,4vw,62px)",fontWeight:800,lineHeight:1.07,color:"#fff",marginBottom:10 }}>
            Bokka Naga<br/>
            <span style={{ background:"linear-gradient(135deg,#00d4ff,#7b2ff7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Venkatesh</span>
          </h1>

          <div style={{ fontSize:isMobile?16:isTablet?18:22,color:"#94a3b8",marginBottom:20,fontWeight:500,minHeight:30 }}>
            <span style={{ color:"#00d4ff" }}>{typed}</span>
            <span style={{ color:"#00d4ff",animation:"blink 1s step-end infinite" }}>|</span>
          </div>

          <p style={{ color:"#64748b",fontSize:isMobile?13:15,lineHeight:1.8,marginBottom:32,maxWidth:520,margin: isMobile||isTablet?"0 auto 32px":"0 0 32px" }}>
            {DATA.summary}
          </p>

          {/* Buttons */}
          <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom:28,justifyContent:isMobile||isTablet?"center":"flex-start" }}>
            <button onClick={() => scrollTo("contact")} className="btn-primary">Let's Connect →</button>
            <a href={DATA.github} target="_blank" rel="noopener noreferrer" className="btn-outline">⚡ GitHub</a>
          </div>

          {/* Social links */}
          <div style={{ display:"flex",gap:20,flexWrap:"wrap",justifyContent:isMobile||isTablet?"center":"flex-start" }}>
            {[
              { icon:"💼", label:"LinkedIn", url:DATA.linkedin },
              { icon:"🐙", label:"GitHub",   url:DATA.github },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex",alignItems:"center",gap:6,color:"#64748b",fontSize:13,textDecoration:"none",transition:"color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color="#00d4ff"}
                onMouseLeave={e => e.currentTarget.style.color="#64748b"}>
                <span>{s.icon}</span>{s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── PHOTO ── */}
        <div style={{ flexShrink:0,position:"relative",display:"flex",justifyContent:"center",alignItems:"center",animation:"fadeUp 1s ease 0.2s both" }}>
          <div style={{ position:"absolute",inset:-16,borderRadius:"50%",border:"1px solid rgba(0,212,255,0.18)",animation:"spin 22s linear infinite" }}/>
          <div style={{ position:"absolute",inset:-32,borderRadius:"50%",border:"1px dashed rgba(123,47,247,0.14)",animation:"spin 34s linear infinite reverse" }}/>
          {/* Orbit dot */}
          <div style={{ position:"absolute",inset:-22,borderRadius:"50%",animation:"spin 7s linear infinite",pointerEvents:"none" }}>
            <div style={{ position:"absolute",top:-1,left:"50%",width:9,height:9,marginLeft:-4.5,borderRadius:"50%",background:"#00d4ff",boxShadow:"0 0 14px #00d4ff" }}/>
          </div>

          <div style={{ width:photoSize,height:photoSize,borderRadius:"50%",background:"linear-gradient(135deg,#00d4ff,#7b2ff7)",padding:3,boxShadow:"0 0 50px rgba(0,212,255,0.28)" }}>
            <div style={{ width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",background:"#0d0d1f",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <img 
                src="https://res.cloudinary.com/dhik9tnvf/image/upload/v1774852898/Gemini_Generated_Image_7mjvvl7mjvvl7mjv_qdfum8.png"
                alt="NVB - Full-Stack Developer"
                style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%" }}
              />
            </div>
          </div>

          {/* Floating badges — desktop only */}
          {!isMobile && !isTablet && [
            { label:"React.js",emoji:"⚛️",top:-8,right:-40 },
            { label:"Node.js", emoji:"🟢",bottom:24,right:-52 },
            { label:"MongoDB", emoji:"🍃",bottom:-8,left:-40 },
            { label:"AWS EC2", emoji:"☁️",top:28,left:-52 },
          ].map((b,i) => (
            <div key={i} style={{
              position:"absolute",top:b.top,right:b.right,bottom:b.bottom,left:b.left,
              background:"rgba(8,8,20,0.93)",border:"1px solid rgba(0,212,255,0.24)",
              borderRadius:50,padding:"5px 13px",display:"flex",alignItems:"center",gap:5,
              fontSize:11,fontWeight:600,color:"#fff",backdropFilter:"blur(12px)",
              animation:`float ${4+i}s ease-in-out ${i*0.5}s infinite alternate`,
              whiteSpace:"nowrap",zIndex:10,
            }}><span>{b.emoji}</span>{b.label}</div>
          ))}
        </div>
      </div>
    </section>
  );
}