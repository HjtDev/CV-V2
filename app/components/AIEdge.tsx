'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Stagger, staggerItem } from './motion/Reveal';
import OrbField, { ORBS_AI } from './interactive/OrbField';

export default function AIEdge() {
  const { t, dir } = useLanguage();
  const ai = t.aiEdge;

  const features = [
    { icon: '⚙️', label: ai.feat1 },
    { icon: '⚡', label: ai.feat2 },
    { icon: '🧠', label: ai.feat3 },
  ];

  const nodeLabels = ['INPUT', 'ANALYSIS', 'OPTIMIZATION', 'OUTPUT'];

  return (
    <section className="relative overflow-hidden py-32 px-6">
      {/* Interactive orbs */}
      <OrbField orbs={ORBS_AI} />

      {/* Central pulsing blob */}
      <motion.div
        className="section-blob w-[700px] h-[700px]"
        style={{
          background: 'radial-gradient(circle, #bd00ff, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.07, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="max-w-[720px] mx-auto text-center mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-secondary"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span className="label text-secondary text-[11px]">{ai.badge}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-on-surface mb-6 leading-[1.15]">
              {ai.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">{ai.body}</p>
          </Reveal>
        </div>

        {/* Feature cards */}
        <Stagger stagger={0.1} delay={0.05} className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map(({ icon, label }, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{
                y: -8,
                borderColor: 'rgba(189,0,255,0.25)',
                boxShadow: '0 16px 40px rgba(189,0,255,0.12)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="glass-strong p-8 rounded-2xl text-center"
              style={{ borderColor: 'rgba(189,0,255,0.08)' }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: 'rgba(189,0,255,0.1)' }}
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                {icon}
              </motion.div>
              <p className="label text-on-surface-muted text-[11px] leading-relaxed">{label}</p>
            </motion.div>
          ))}
        </Stagger>

        {/* Neural process visualization */}
        <Reveal>
          <div className="glass rounded-2xl p-8 overflow-hidden relative">
            {/* Animated scan line */}
            <motion.div
              className="absolute inset-y-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(189,0,255,0.3), transparent)' }}
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            <div className="label text-on-surface-muted text-[10px] mb-6">{ai.visualizationLabel}</div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              {nodeLabels.map((node, i) => (
                <div key={node} className="flex items-center gap-3">
                  <motion.div
                    className="glass px-4 py-2 rounded-lg"
                    style={{ borderColor: i === nodeLabels.length - 1 ? 'rgba(189,0,255,0.35)' : 'rgba(255,255,255,0.07)' }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.18, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ borderColor: 'rgba(189,0,255,0.4)', y: -2 }}
                  >
                    <span className="label text-[10px] text-on-surface-muted">{node}</span>
                  </motion.div>

                  {i < nodeLabels.length - 1 && (
                    <motion.div
                      className="flex items-center gap-0.5"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.18 + 0.15 }}
                    >
                      <motion.div
                        className="h-px"
                        style={{ background: 'linear-gradient(90deg, rgba(189,0,255,0.4), rgba(189,0,255,0.2))', width: 24 }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <span className="text-secondary/50 text-xs">{dir === 'rtl' ? '◀' : '▶'}</span>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Pulsing nodes row */}
            <div className="flex justify-center gap-3 mt-6">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#bd00ff' }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
