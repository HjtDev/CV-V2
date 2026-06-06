'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './motion/Reveal';
import TiltCard from './interactive/TiltCard';
import CursorSpotlight from './interactive/CursorSpotlight';
import type { Project } from '../lib/types';

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  const { t, lang } = useLanguage();
  const proj = t.projects;

  return (
    <section id="projects" className="relative overflow-hidden py-32 px-6">
      <motion.div
        className="section-blob w-[400px] h-[400px] opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #bd00ff, transparent 70%)', top: '10%', left: '-5%' }}
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              />
              <span className="label text-primary text-[11px]">{proj.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{proj.heading}</h2>
          </Reveal>
        </div>

        {projects.length === 0 ? (
          <Reveal>
            <p className="text-center text-on-surface-muted label text-[11px]">— —</p>
          </Reveal>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => {
              const name   = lang === 'fa' && project.name_fa   ? project.name_fa   : project.name;
              const desc   = lang === 'fa' && project.description_fa ? project.description_fa : project.description;
              const status = proj.status[project.status];

              return (
                <Reveal key={project.id} delay={i * 0.12} direction="up">
                  <TiltCard maxTilt={6} glareOpacity={0.06} className="h-full">
                    <motion.article
                      className="glass-strong p-8 rounded-2xl relative overflow-hidden h-full flex flex-col"
                      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                      whileHover={{
                        borderColor: 'rgba(0,255,194,0.18)',
                        boxShadow: '0 0 32px rgba(0,255,194,0.08)',
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <CursorSpotlight
                        color={i % 2 === 0 ? 'rgba(0,255,194,0.07)' : 'rgba(189,0,255,0.07)'}
                        radius={200}
                      />

                      {/* Gradient corner */}
                      <motion.div
                        className="absolute top-0 end-0 w-40 h-40 rounded-bl-full"
                        style={{
                          background: i % 2 === 0
                            ? 'radial-gradient(circle, rgba(0,255,194,0.12), transparent)'
                            : 'radial-gradient(circle, rgba(189,0,255,0.12), transparent)',
                          opacity: 0.6,
                        }}
                        whileHover={{ opacity: 1, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative z-10 flex flex-col flex-1">
                        {/* Status chip */}
                        <div className="inline-flex items-center gap-1.5 glass px-3 py-1 rounded-full mb-6 self-start">
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                          />
                          <span className="label text-primary text-[10px]">{status}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-on-surface mb-3">{name}</h3>
                        <p className="text-on-surface-muted leading-relaxed mb-6 flex-1">{desc}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, j) => (
                            <motion.span
                              key={tag}
                              className="label text-[10px] glass px-3 py-1 rounded-full text-on-surface-muted"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + j * 0.07, duration: 0.3 }}
                              whileHover={{ color: '#00ffc2', borderColor: 'rgba(0,255,194,0.3)' }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* External links */}
                        {(project.url || project.github_url) && (
                          <div className="flex gap-3 mt-auto pt-2">
                            {project.url && (
                              <motion.a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="label text-[10px] text-primary glass px-4 py-2 rounded-lg flex items-center gap-1.5"
                                whileHover={{ y: -2, borderColor: 'rgba(0,255,194,0.4)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                              >
                                ↗ {lang === 'fa' ? 'مشاهده' : 'Visit'}
                              </motion.a>
                            )}
                            {project.github_url && (
                              <motion.a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="label text-[10px] text-on-surface-muted glass px-4 py-2 rounded-lg flex items-center gap-1.5"
                                whileHover={{ y: -2, color: '#00ffc2', borderColor: 'rgba(0,255,194,0.3)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                              >
                                ⌥ GitHub
                              </motion.a>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
