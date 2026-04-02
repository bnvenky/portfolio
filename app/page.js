"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Project } from "./components/Project";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AiChat } from "./components/AiChat";

export default function Portfolio() {
  const pathname = usePathname();

  useEffect(() => {
    const slug = pathname?.replace("/", "") || "";
    if (slug) {
      const section = document.getElementById(slug);
      if (section) {
        const offset = 70;
        const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [pathname]);

  return (
    <div style={{ background: "#05050f", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Project />
      <Education />
      <Contact />
      <Footer />
      <AiChat />
    </div>
  );
}