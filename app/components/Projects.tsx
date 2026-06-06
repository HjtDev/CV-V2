'use client';

import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const proj = t.projects;

  return (
    <section id="projects" className="relative overflow-hidden py-32 px-6">
      <div
        className="section-blob w-[400px] h-[400px] opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #bd00ff, transparent 70%)', top: '10%', left: '-5%' }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="label text-primary text-[11px]">{proj.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{proj.heading}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {proj.items.map((project, i) => (
            <article
              key={project.name}
              className="glass-strong p-8 rounded-2xl group hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient accent corner */}
              <div
                className="absolute top-0 end-0 w-32 h-32 opacity-10 rounded-bl-full"
                style={{ background: i === 0 ? 'radial-gradient(circle, #00ffc2, transparent)' : 'radial-gradient(circle, #bd00ff, transparent)' }}
              />

              <div className="relative z-10">
                {/* Status chip */}
                <div className="inline-flex items-center gap-1.5 glass px-3 py-1 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="label text-primary text-[10px]">{project.status}</span>
                </div>

                <h3 className="text-2xl font-bold text-on-surface mb-3">{project.name}</h3>
                <p className="text-on-surface-muted leading-relaxed mb-6">{project.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="label text-[10px] glass px-3 py-1 rounded-full text-on-surface-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
