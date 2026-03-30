"use client";
import { useState } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { DATA } from "../lib/data";

// ── CONTACT ───────────────────────────────────────────────────────────────────
export function Contact() {
  const [form, setForm] = useState({ name:"",email:"",msg:"" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile || isTablet ? "1fr" : "1fr 1fr";

  const contacts = [
    { icon:"📧", label:"Email",    value:DATA.email,    url:`mailto:${DATA.email}`,    color:"#00d4ff" },
    { icon:"📱", label:"Phone",    value:DATA.phone,    url:`tel:${DATA.phoneRaw}`,    color:"#a78bfa" },
    { icon:"💼", label:"LinkedIn", value:"linkedin.com/in/venkatesh240", url:DATA.linkedin, color:"#0ea5e9" },
    { icon:"🐙", label:"GitHub",   value:"github.com/bnvenky",           url:DATA.github,   color:"#e2e8f0" },
  ];

  const handleSend = () => {
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) {
      setErr("Please fill in all fields."); return;
    }
    setErr("");

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const bodyText = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.msg}`;
    const body = encodeURIComponent(bodyText);

    // Fallback: open email client with prefilling
    window.open(`mailto:${DATA.email}?subject=${subject}&body=${body}`, "_blank");

    // Also open WhatsApp chat link to your phone number
    const whatsappText = encodeURIComponent(`New lead from portfolio website:\n\n${bodyText}`);
    const phone = DATA.phoneRaw.replace(/[^0-9]/g, "");
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${whatsappText}`, "_blank");

    setSent(true);
  };

  return (
    <Section id="contact" bg>
      <SectionHeading eyebrow="Get In Touch" title="Let's Work" accent="Together" />
      <div style={{ display:"grid",gridTemplateColumns:cols,gap:isMobile?24:44 }}>
        {/* Left */}
        <div>
          <p style={{ color:"#94a3b8",fontSize:isMobile?14:15,lineHeight:1.85,marginBottom:28 }}>
            I'm open to full-time roles, freelance projects, and exciting collaborations. If you have an opportunity that matches my skills, I'd love to hear from you!
          </p>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            {contacts.map(c => (
              <a key={c.label} href={c.url} target={c.url.startsWith("mailto")||c.url.startsWith("tel") ? "_self" : "_blank"} rel="noopener noreferrer" className="contact-link">
                <div style={{ width:42,height:42,borderRadius:12,background:`${c.color}18`,border:`1px solid ${c.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{c.icon}</div>
                <div style={{ flex:1,overflow:"hidden" }}>
                  <div style={{ color:"#64748b",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>{c.label}</div>
                  <div style={{ color:"#fff",fontSize:isMobile?12:13,fontWeight:600,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{c.value}</div>
                </div>
                <span style={{ color:c.color,fontSize:16,flexShrink:0 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bnv-card" style={{ padding:isMobile?"22px":"34px" }}>
          {sent ? (
            <div style={{ textAlign:"center",padding:"32px 0" }}>
              <div style={{ fontSize:52,marginBottom:14 }}>🎉</div>
              <h3 style={{ fontFamily:"Syne, sans-serif",color:"#fff",fontWeight:800,fontSize:20 }}>Message Sent!</h3>
              <p style={{ color:"#94a3b8",marginTop:8,fontSize:14 }}>I'll get back to you within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({name:"",email:"",msg:""}); }} className="btn-outline" style={{ marginTop:20,fontSize:13,padding:"9px 20px" }}>Send Another</button>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily:"Syne, sans-serif",fontWeight:800,color:"#fff",fontSize:18,marginBottom:22 }}>Send a Message</h3>
              {err && <div style={{ color:"#f87171",fontSize:13,marginBottom:14,padding:"8px 12px",background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.2)",borderRadius:8 }}>{err}</div>}
              {[{k:"name",label:"Your Name",type:"text",ph:"Raj Kumar"},{k:"email",label:"Email Address",type:"email",ph:"raj@company.com"}].map(f => (
                <div key={f.k} style={{ marginBottom:14 }}>
                  <label style={{ color:"#94a3b8",fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:7 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.k]}
                    onChange={e => setForm(p => ({...p,[f.k]:e.target.value}))}
                    style={{ width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"11px 14px",color:"#fff",fontSize:14,transition:"border-color .2s" }} />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ color:"#94a3b8",fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:7 }}>Message</label>
                <textarea rows={isMobile?4:5} placeholder="I'd like to discuss a project…" value={form.msg}
                  onChange={e => setForm(p => ({...p,msg:e.target.value}))}
                  style={{ width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"11px 14px",color:"#fff",fontSize:14,resize:"vertical",transition:"border-color .2s" }} />
              </div>
              <button onClick={handleSend} className="btn-primary" style={{ width:"100%",border:"none",padding:"13px",fontSize:15 }}>
                Send Message 🚀
              </button>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}