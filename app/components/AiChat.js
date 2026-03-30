"use client";
import { useState, useEffect, useRef } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { DATA } from "../lib/data";

// ── AI CHATBOT ────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI assistant embedded on Bokka Naga Venkatesh's portfolio website. Your job is to answer visitor questions about him professionally, helpfully, and concisely (under 90 words per reply).

ABOUT VENKATESH:
- Full-Stack Developer (MERN Stack), Andhra Pradesh, India
- Email: bnvenkatesheee@gmail.com | Phone: 939-064-7752
- GitHub: github.com/bnvenky | LinkedIn: linkedin.com/in/venkatesh240

SKILLS: React.js, Next.js, React Native, Node.js, Express.js, GraphQL, JWT Auth, WebSocket, WebRTC, Tailwind CSS, Zustand, Vite, MongoDB, Mongoose, SQLite, JavaScript (ES6+), Python, SQL, Git, AWS EC2, GitHub Actions, CI/CD, GitHub Copilot, Claude Code, Cursor

EXPERIENCE:
1. Associate Software Developer @ Truleeinnovate Consulting Services (Nov 2024–Present)
   - UpInterview SaaS: 20+ REST APIs, 50+ form validations, Razorpay payments, JWT auth, 4+ modules
2. Software Dev Trainee @ NxtWave (Aug 2022–Jan 2024)
   - React.js, Node.js, MongoDB, Git projects

KEY PROJECT: UpInterview — Live SaaS recruitment platform
- Interview scheduling (3+ modes), 1000+ question bank, Razorpay webhooks, Kanban dashboard, mock interview matching

EDUCATION: B.Tech EEE (CGPA 7.8), Diploma EEE (76%)

STATUS: Open to full-time roles, freelance projects, and collaborations. Requires visa sponsorship for international roles.

Be friendly, professional. Use emojis sparingly. If asked about salary, say to discuss directly via email.`;

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role:"assistant", text:"Hi! 👋 I'm Venkatesh's AI assistant. Ask me anything about his skills, experience, availability, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiErr, setApiErr] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const { isMobile } = useBreakpoint();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, loading]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setApiErr("");
    setMsgs(m => [...m, { role:"user", text:q }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...msgs.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: q }
          ],
          systemPrompt: SYSTEM_PROMPT,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.reply) {
        setMsgs(m => [...m, { role:"assistant", text:data.reply }]);
        setSuggestions(data.suggestions || []);
      } else {
        throw new Error(data.error || "Empty response");
      }
    } catch (e) {
      const errorMsg = e.message || "Unable to connect to AI service";
      setApiErr("⚠️ " + errorMsg);
      setMsgs(m => [...m, { role:"assistant", text:`Sorry, I'm having trouble right now. Please reach out directly:\n📧 ${DATA.email}\n📱 ${DATA.phone}` }]);
      setSuggestions([]);
    }
    setLoading(false);
  };

  const handleSuggestion = async (q) => {
    if (loading) return;
    setApiErr("");
    setMsgs(m => [...m, { role:"user", text:q }]);
    setSuggestions([]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...msgs.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: q }
          ],
          systemPrompt: SYSTEM_PROMPT,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.reply) {
        setMsgs(m => [...m, { role:"assistant", text:data.reply }]);
        setSuggestions(data.suggestions || []);
      } else {
        throw new Error(data.error || "Empty response");
      }
    } catch (e) {
      const errorMsg = e.message || "Unable to connect to AI service";
      setApiErr("⚠️ " + errorMsg);
      setMsgs(m => [...m, { role:"assistant", text:`Sorry, I'm having trouble right now. Please reach out directly:\n📧 ${DATA.email}\n📱 ${DATA.phone}` }]);
      setSuggestions([]);
    }
    setLoading(false);
  };

  const chatW = isMobile ? "calc(100vw - 32px)" : 340;
  const chatH = isMobile ? 420 : 460;

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(o => !o)} title="Chat with AI assistant" style={{
        position:"fixed", bottom:24, right:24, zIndex:1000,
        width:58, height:58, borderRadius:"50%",
        background:"linear-gradient(135deg,#00d4ff,#7b2ff7)",
        border:"none", cursor:"pointer",
        boxShadow:"0 6px 28px rgba(0,212,255,0.45)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:24, transition:"transform .2s, box-shadow .2s",
        animation:"pulseGlow 3s infinite",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; e.currentTarget.style.boxShadow="0 10px 40px rgba(0,212,255,0.6)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 6px 28px rgba(0,212,255,0.45)"; }}>
        {open ? "✕" : "🤖"}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position:"fixed", bottom:94, right:24, zIndex:999,
          width:chatW, height:chatH, borderRadius:20,
          background:"rgba(7,7,18,0.98)", backdropFilter:"blur(24px)",
          border:"1px solid rgba(0,212,255,0.3)",
          boxShadow:"0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,212,255,0.08)",
          display:"flex", flexDirection:"column", overflow:"hidden",
        }}>
          {/* Header */}
          <div style={{ padding:"12px 16px", background:"linear-gradient(135deg,rgba(0,212,255,0.08),rgba(123,47,247,0.08))", borderBottom:"1px solid rgba(0,212,255,0.14)", display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#00d4ff,#7b2ff7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>🤖</div>
            <div style={{ flex:1 }}>
              <div style={{ color:"#fff",fontWeight:700,fontSize:14,fontFamily:"Syne, sans-serif" }}>NVB AI Assistant</div>
              <div style={{ color:"#00d4ff",fontSize:11,display:"flex",alignItems:"center",gap:4,marginTop:1 }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:"#22c55e",display:"inline-block" }}/>
                Ask me about Venkatesh
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,width:28,height:28,color:"#94a3b8",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:10 }}>
            {msgs.map((m,i) => (
              <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
                {m.role==="assistant" && (
                  <div style={{ width:24,height:24,borderRadius:"50%",background:"linear-gradient(135deg,#00d4ff,#7b2ff7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0,marginRight:7,marginTop:2 }}>🤖</div>
                )}
                <div style={{
                  maxWidth:"80%", padding:"10px 13px",
                  borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",
                  background:m.role==="user"?"linear-gradient(135deg,#00d4ff,#7b2ff7)":"rgba(255,255,255,0.07)",
                  color:"#fff", fontSize:13, lineHeight:1.6,
                  border:m.role==="assistant"?"1px solid rgba(255,255,255,0.08)":"none",
                  whiteSpace:"pre-wrap",
                }}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ width:24,height:24,borderRadius:"50%",background:"linear-gradient(135deg,#00d4ff,#7b2ff7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12 }}>🤖</div>
                <div style={{ display:"flex",gap:4,padding:"10px 13px",background:"rgba(255,255,255,0.07)",borderRadius:"16px 16px 16px 4px",border:"1px solid rgba(255,255,255,0.08)" }}>
                  {[0,1,2].map(i => <span key={i} style={{ width:7,height:7,borderRadius:"50%",background:"#00d4ff",display:"inline-block",animation:`bounce 0.9s ${i*0.18}s infinite` }}/>)}
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>

          {/* Quick suggestions */}
          {(msgs.length <= 1 || suggestions.length > 0) && (
            <div style={{ padding:"0 14px 10px",display:"flex",gap:6,flexWrap:"wrap" }}>
              {(suggestions.length > 0 ? suggestions : ["What are his skills?","Is he available?","Tell me about UpInterview","How to contact him?"]).map(q => (
                <button key={q} onClick={() => handleSuggestion(q)} style={{
                  background:"rgba(0,212,255,0.08)",border:"1px solid rgba(0,212,255,0.22)",
                  borderRadius:50,padding:"4px 10px",color:"#00d4ff",fontSize:11,
                  cursor:"pointer",fontFamily:"Manrope,sans-serif",transition:"all .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(0,212,255,0.18)"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(0,212,255,0.08)"}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",gap:8,flexShrink:0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); send(); } }}
              placeholder="Ask anything about Venkatesh…"
              style={{ flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(0,212,255,0.2)",borderRadius:12,padding:"9px 13px",color:"#fff",fontSize:13,outline:"none",transition:"border-color .2s",fontFamily:"Manrope,sans-serif" }}
              onFocus={e => e.target.style.borderColor="#00d4ff"}
              onBlur={e => e.target.style.borderColor="rgba(0,212,255,0.2)"}
            />
            <button onClick={send} disabled={loading||!input.trim()} title="Send" style={{
              width:38,height:38,borderRadius:12,border:"none",
              background:input.trim()?"linear-gradient(135deg,#00d4ff,#7b2ff7)":"rgba(255,255,255,0.06)",
              color:input.trim()?"#fff":"#64748b",fontSize:16,cursor:input.trim()?"pointer":"default",
              display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",flexShrink:0,
            }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}