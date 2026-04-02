// ── SMOOTH SCROLL HELPER ───────────────────────────────────────────────────────
export function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 70;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
