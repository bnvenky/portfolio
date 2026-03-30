"use client";
import { useCounter } from "../hooks/useCounter";

// ── STAT CARD ─────────────────────────────────────────────────────────────────
export function StatCard({ val, label, icon, start }) {
  const num = useCounter(val, 1600, start);
  const isNum = !isNaN(parseInt(val));
  const suffix = val.replace(/[0-9]/g, "");
  return (
    <div className="bnv-card" style={{ textAlign:"center",padding:"22px 14px",flex:1,minWidth:110 }}>
      <div style={{ fontSize:26,marginBottom:8 }}>{icon}</div>
      <div style={{ fontSize:30,fontWeight:800,fontFamily:"Syne, sans-serif",background:"linear-gradient(135deg,#00d4ff,#7b2ff7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1 }}>
        {isNum ? num + suffix : val}
      </div>
      <div style={{ color:"#64748b",fontSize:12,marginTop:6,fontWeight:500 }}>{label}</div>
    </div>
  );
}