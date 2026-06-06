# Graph Report - .  (2026-06-06)

## Corpus Check
- Corpus is ~40,469 words - fits in a single context window. You may not need a graph.

## Summary
- 141 nodes · 188 edges · 17 communities (8 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.9)
- Token cost: 20,201 input · 1,619 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Section Animation Components|Section Animation Components]]
- [[_COMMUNITY_App Layout & Language Detection|App Layout & Language Detection]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Page Composition & Contact|Page Composition & Contact]]
- [[_COMMUNITY_Core Runtime Dependencies|Core Runtime Dependencies]]
- [[_COMMUNITY_Dev & Build Tooling|Dev & Build Tooling]]
- [[_COMMUNITY_Hero & OrbField Physics|Hero & OrbField Physics]]
- [[_COMMUNITY_Project Config & Branding|Project Config & Branding]]
- [[_COMMUNITY_Magnetic Interaction|Magnetic Interaction]]
- [[_COMMUNITY_Tilt Card Interaction|Tilt Card Interaction]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_SVG Asset File|SVG Asset: File]]
- [[_COMMUNITY_SVG Asset Globe|SVG Asset: Globe]]
- [[_COMMUNITY_Profile Photo|Profile Photo]]
- [[_COMMUNITY_SVG Asset Window|SVG Asset: Window]]

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 21 edges
2. `compilerOptions` - 16 edges
3. `Reveal()` - 7 edges
4. `scripts` - 5 edges
5. `Stagger()` - 4 edges
6. `staggerItem` - 4 edges
7. `Translations` - 4 edges
8. `Next.js Framework` - 3 edges
9. `AIEdge()` - 2 edges
10. `Contact()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Logo` --references--> `Next.js Framework`  [INFERRED]
  public/next.svg → README.md
- `Vercel Logo` --references--> `Vercel Platform`  [INFERRED]
  public/vercel.svg → README.md
- `Next.js Agent Rules` --conceptually_related_to--> `Next.js Framework`  [INFERRED]
  AGENTS.md → README.md
- `AIEdge()` --calls--> `useLanguage()`  [EXTRACTED]
  app/components/AIEdge.tsx → app/context/LanguageContext.tsx
- `Experience()` --calls--> `useLanguage()`  [EXTRACTED]
  app/components/Experience.tsx → app/context/LanguageContext.tsx

## Import Cycles
- None detected.

## Communities (17 total, 9 thin omitted)

### Community 0 - "Section Animation Components"
Cohesion: 0.10
Nodes (20): AIEdge(), ALL, Experience(), ExperienceProps, ExperienceSection, ALL, Foundation(), FoundationProps (+12 more)

### Community 1 - "App Layout & Language Detection"
Cohesion: 0.15
Nodes (14): detectLangFromAcceptHeader(), inter, metadata, RootLayout(), spaceMono, vazirmatn, FA_TIMEZONES, Lang (+6 more)

### Community 2 - "TypeScript Configuration"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 3 - "Page Composition & Contact"
Cohesion: 0.16
Nodes (8): Contact(), Footer(), Navbar(), Projects(), SECTIONS, SidebarNav(), useLanguage(), Props

### Community 4 - "Core Runtime Dependencies"
Cohesion: 0.14
Nodes (13): dependencies, framer-motion, next, react, react-dom, name, private, scripts (+5 more)

### Community 5 - "Dev & Build Tooling"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 6 - "Hero & OrbField Physics"
Cohesion: 0.29
Nodes (5): Hero(), OrbConfig, ORBS_AI, ORBS_HERO, Props

### Community 7 - "Project Config & Branding"
Cohesion: 0.29
Nodes (7): Next.js Agent Rules, Claude Configuration, Next.js Logo, Vercel Logo, Next.js Framework, Resume Site Project, Vercel Platform

## Knowledge Gaps
- **71 isolated node(s):** `ExperienceSection`, `ExperienceProps`, `ALL`, `FoundationSection`, `FoundationProps` (+66 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLanguage()` connect `Page Composition & Contact` to `Section Animation Components`, `App Layout & Language Detection`, `Hero & OrbField Physics`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev & Build Tooling` to `Core Runtime Dependencies`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `ExperienceSection`, `ExperienceProps`, `ALL` to the rest of the system?**
  _71 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Section Animation Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09788359788359788 - nodes in this community are weakly interconnected._
- **Should `App Layout & Language Detection` be split into smaller, more focused modules?**
  _Cohesion score 0.14736842105263157 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Core Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._