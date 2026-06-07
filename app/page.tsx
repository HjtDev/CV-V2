import Navbar from "./components/Navbar";
import SidebarNav from "./components/SidebarNav";
import Hero from "./components/Hero";
import Foundation from "./components/Foundation";
import AIEdge from "./components/AIEdge";
import Experience from "./components/Experience";
import Support from "./components/Support";
import Toolkit from "./components/Toolkit";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { getProjects, getSiteStatus } from "./lib/server-api";

export default async function Home() {
  const [projects, siteStatus] = await Promise.all([
    getProjects(),
    getSiteStatus(),
  ]);

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <SidebarNav />
      <Hero />

      {/* High-impact highlights — first things visitors should see */}
      <Foundation id="work" sections={['integrations', 'scale']} showHeader={false} />
      <AIEdge />
      <Experience sections={['visuals']} showHeader={false} />

      {/* Core backend foundations */}
      <Foundation id="foundations" sections={['security', 'auth', 'database']} showHeader />

      {/* Deeper experience sections */}
      <Experience id="experience" sections={['custom', 'delight']} showHeader />

      <Support />
      <Toolkit />
      <Projects projects={projects} />
      <Contact siteStatus={siteStatus} />
      <Footer />
    </main>
  );
}
