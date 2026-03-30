"use client";

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