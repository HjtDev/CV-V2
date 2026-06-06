'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Stagger, staggerItem } from './motion/Reveal';

type ExperienceSection = 'visuals' | 'custom' | 'delight';
interface ExperienceProps {
  sections?: ExperienceSection[];
  showHeader?: boolean;
  id?: string;
}
const ALL: ExperienceSection[] = ['visuals', 'custom', 'delight'];

export default function Experience({ sections = ALL, showHeader = true, id }: ExperienceProps) {
  const { t } = useLanguage();
  const exp = t.experience;
  const show = (s: ExperienceSection) => sections.includes(s);

  return (
    <div id={id} className="relative">
      {showHeader && (
        <div className="max-w-[1280px] mx-auto px-6 pt-32 pb-16 text-center">
          <Reveal>
            <p className="label text-on-surface-muted mb-3">{exp.heading}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{exp.sub}</h2>
          </Reveal>
        </div>
      )}

      {/* ── Visuals ── */}
      {show('visuals') && (
        <section className="relative overflow-hidden py-24 px-6">
          <motion.div
            className="section-blob w-[400px] h-[400px]"
            style={{ background: 'radial-gradient(circle, #bd00ff, transparent 70%)', opacity: 0.08, top: 0, right: 0 }}
            animate={{ x: [0, -18, 0], y: [0, 14, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <div className="inline-flex items-center gap-2 mb-4">
                <motion.span className="w-1.5 h-1.5 rounded-full bg-secondary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="label text-secondary text-[11px]">{exp.visuals.badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">{exp.visuals.heading}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed">{exp.visuals.body}</p>
            </Reveal>

            <Reveal direction="right">
              <motion.div
                className="glass-strong p-6 rounded-2xl"
                style={{ borderColor: 'rgba(189,0,255,0.15)' }}
                whileHover={{ borderColor: 'rgba(189,0,255,0.3)', boxShadow: '0 0 32px rgba(189,0,255,0.08)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center gap-3 glass px-4 py-3 rounded-xl"
                    whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #00ffc2, #bd00ff)' }} />
                    <div className="flex-1">
                      <div className="h-2 bg-on-surface/20 rounded mb-1.5 w-24" />
                      <div className="h-1.5 bg-on-surface/10 rounded w-16" />
                    </div>
                    <div className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                  </motion.div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { bg: 'rgba(189,0,255,0.05)', glow: 'rgba(189,0,255,0.4)' },
                      { bg: 'rgba(0,255,194,0.05)', glow: 'rgba(0,255,194,0.4)' },
                    ].map(({ bg, glow }, i) => (
                      <motion.div
                        key={i}
                        className="glass rounded-xl p-4 aspect-square flex items-center justify-center"
                        style={{ background: bg }}
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <motion.div
                          className="w-10 h-10 rounded-full"
                          style={{ background: `radial-gradient(circle, ${glow}, transparent)` }}
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2.5 + i, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="glass px-4 py-3 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <div className="h-2 bg-on-surface/20 rounded w-20" />
                      <div className="h-2 bg-secondary/40 rounded w-10" />
                    </div>
                    <div className="h-1.5 bg-surface-high rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #00ffc2, #bd00ff)' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '75%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Custom ── */}
      {show('custom') && (
        <section className="relative overflow-hidden py-24 px-6 bg-surface-low/30">
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left" className="order-2 md:order-1">
              <Stagger stagger={0.07} className="grid grid-cols-2 gap-4">
                {[
                  { icon: '✂️', label: exp.custom.feat1 },
                  { icon: '🔧', label: exp.custom.feat2 },
                  { icon: '📐', label: 'Pixel Perfect' },
                  { icon: '🎯', label: 'Goal-Driven' },
                ].map(({ icon, label }) => (
                  <motion.div
                    key={label}
                    variants={staggerItem}
                    whileHover={{ y: -5, scale: 1.05, borderColor: 'rgba(189,0,255,0.2)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="glass p-5 rounded-xl flex flex-col items-center gap-3 text-center"
                  >
                    <motion.span className="text-2xl" whileHover={{ rotate: 10, scale: 1.2 }} transition={{ duration: 0.25 }}>{icon}</motion.span>
                    <span className="label text-on-surface-muted text-[11px]">{label}</span>
                  </motion.div>
                ))}
              </Stagger>
            </Reveal>

            <Reveal direction="right" className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 mb-4">
                <motion.span className="w-1.5 h-1.5 rounded-full bg-secondary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                <span className="label text-secondary text-[11px]">{exp.custom.badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">{exp.custom.heading}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed">{exp.custom.body}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Delight ── */}
      {show('delight') && (
        <section className="relative overflow-hidden py-24 px-6">
          <motion.div
            className="section-blob w-[350px] h-[350px]"
            style={{ background: 'radial-gradient(circle, #ff7a00, transparent 70%)', opacity: 0.07, bottom: 0, left: '5%' }}
            animate={{ x: [0, 16, 0], y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <div className="inline-flex items-center gap-2 mb-4">
                <motion.span className="w-1.5 h-1.5 rounded-full bg-tertiary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
                <span className="label text-tertiary text-[11px]">{exp.delight.badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">{exp.delight.heading}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed">{exp.delight.body}</p>
            </Reveal>

            <Reveal direction="right">
              <div className="glass-strong p-8 rounded-2xl space-y-4" style={{ borderColor: 'rgba(255,122,0,0.1)' }}>
                {[
                  { label: 'Hover States', color: '#00ffc2' },
                  { label: 'Page Transitions', color: '#bd00ff' },
                  { label: 'Loading Indicators', color: '#ff7a00' },
                  { label: 'Micro-Interactions', color: '#00ffc2' },
                ].map(({ label, color }, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: color }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5 + i * 0.2, repeat: Infinity }}
                    />
                    <motion.div
                      className="flex-1 glass px-4 py-2.5 rounded-lg"
                      whileHover={{ borderColor: `${color}40`, x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="label text-on-surface-muted text-[11px]">{label}</span>
                    </motion.div>
                    <span className="label text-[10px] text-on-surface-muted">✓</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
