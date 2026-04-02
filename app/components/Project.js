"use client";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { DATA } from "../lib/data";

// ── PROJECT ───────────────────────────────────────────────────────────────────
export function Project() {
  const { isMobile, isTablet } = useBreakpoint();
  const projects = DATA.projects || [DATA.project];
  const cols = "1fr"; // stack projects vertically, one per row

  return (
    <Section id="project" bg>
      <SectionHeading eyebrow="Key Project" title="Featured" accent="Work" />
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 20 }}>
        {projects.map((p, idx) => (
          <div
            key={`${p.name}-${idx}`}
            style={{
              background: "rgba(0,212,255,0.02)",
              border: "1px solid rgba(0,212,255,0.22)",
              borderRadius: 24,
              padding: isMobile ? "22px" : "44px",
              position: "relative",
              overflow: "hidden",
              transition: "border-color .3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.22)")}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(0,212,255,0.06),transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, color: "#fff" }}>
                    {p.name}
                  </h3>
                  {p.status && (
                    <span style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.38)", borderRadius: 50, padding: "3px 12px", color: "#22c55e", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulseGlow 2s infinite" }} />
                      {p.status}
                    </span>
                  )}
                </div>
                <div style={{ color: "#94a3b8", fontSize: isMobile ? 13 : 15 }}>{p.tagline}</div>
              </div>
            </div>

            {p.live && (
              <div style={{ marginBottom: 18 }}>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", padding: "8px 14px", fontSize: 13, fontWeight: 700, color: "#0f172a", background: "#00d4ff", borderRadius: 8, textDecoration: "none", boxShadow: "0 6px 14px rgba(0,212,255,0.28)" }}
                >
                  View Live App
                </a>
              </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {p.stack?.map((s) => (
                <span key={s} style={{ padding: "5px 13px", borderRadius: 50, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.22)", color: "#00d4ff", fontSize: 12, fontWeight: 600 }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12 }}>
              {p.bullets?.map((b, bi) => (
                <div key={bi} className="bnv-card" style={{ padding: "13px 15px", display: "flex", gap: 10, borderRadius: 14 }}>
                  <span style={{ color: "#00d4ff", flexShrink: 0 }}>✦</span>
                  <span style={{ color: "#94a3b8", fontSize: isMobile ? 13 : 14, lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}