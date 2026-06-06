import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Foundation from "./components/Foundation";
import AIEdge from "./components/AIEdge";
import Experience from "./components/Experience";
import Toolkit from "./components/Toolkit";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <Hero />
      <Foundation />
      <AIEdge />
      <Experience />
      <Toolkit />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
