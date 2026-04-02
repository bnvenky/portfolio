"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { scrollTo } from "../lib/smoothScroll";
import { DATA } from "../lib/data";

// ── NAVBAR ────────────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const order = ["about", "skills", "experience", "project", "education", "contact"];
      let current = "about";
      for (let i = 0; i < order.length; i++) {
        const el = document.getElementById(order[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 80) {
          current = order[i];
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About",      id: "about" },
    { label: "Skills",     id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Project",    id: "project" },
    { label: "Education",  id: "education" },
    { label: "Contact",    id: "contact" },
  ];

  const router = useRouter();

  const handleNav = (id) => {
    setActive(id);
    const path = `/${id}`;
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        padding: scrolled ? "10px 24px" : "18px 24px",
        background: scrolled ? "rgba(5,5,15,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
        transition: "all 0.4s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <button onClick={() => handleNav("about")} style={{
          fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, color: "#fff",
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          NVB<span style={{ color: "#00d4ff" }}>.</span>
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: isTablet ? 18 : 30 }}>
            {links.map(l => (
              <button key={l.id} onClick={() => handleNav(l.id)} className="nav-a"
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "Manrope, sans-serif",
                  color: active === l.id ? "#00d4ff" : "#cbd5e1",
                  borderBottom: active === l.id ? "2px solid #00d4ff" : "2px solid transparent",
                  padding: "8px 6px",
                  fontWeight: active === l.id ? 700 : 500,
                  transition: "all 0.2s",
                }}>
                {l.label}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!isMobile && (
            <a href={`mailto:${DATA.email}`} className="btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>
              Hire Me
            </a>
          )}
          {/* Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)",
              borderRadius: 10, width: 42, height: 42, cursor: "pointer",
              color: "#00d4ff", fontSize: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 290,
          background: "rgba(5,5,15,0.99)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
          padding: "16px 24px 24px",
          display: "flex", flexDirection: "column", gap: 2,
        }}>
          {links.map(l => (
            <button key={l.id} onClick={() => handleNav(l.id)} style={{
              background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)",
              color: active === l.id ? "#00d4ff" : "#94a3b8", fontSize: 16, textAlign: "left",
              padding: "13px 0", cursor: "pointer", fontFamily: "Manrope, sans-serif", fontWeight: active === l.id ? 700 : 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
            onMouseLeave={e => e.currentTarget.style.color = active === l.id ? "#00d4ff" : "#94a3b8"}>
              {l.label}
            </button>
          ))}
          <a href={`mailto:${DATA.email}`} className="btn-primary" style={{ marginTop: 16, textAlign: "center" }}>
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}