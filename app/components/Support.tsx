'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Stagger, staggerItem } from './motion/Reveal';

const FEATURES = ['feat1', 'feat2', 'feat3', 'feat4'] as const;
const FEATURE_COLORS = ['#00ffc2', '#bd00ff', '#ff7a00', '#00ffc2'];

export default function Support() {
  const { t } = useLanguage();
  const s = t.support;

  return (
    <section className="relative overflow-hidden py-24 px-6 bg-surface-low/30">
      <motion.div
        className="section-blob w-[420px] h-[420px]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', opacity: 0.06, top: '10%', left: '-5%' }}
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: stat cards */}
        <Reveal direction="left" className="order-2 md:order-1">
          <div className="glass-strong p-8 rounded-2xl space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              {(['uptime', 'response'] as const).map((key) => {
                const label = key === 'uptime' ? s.uptimeLabel : s.responseLabel;
                const value = key === 'uptime' ? s.uptimeValue : s.responseValue;
                const color = key === 'uptime' ? '#00ffc2' : '#bd00ff';
                return (
                  <motion.div
                    key={key}
                    className="glass rounded-xl p-5 flex flex-col gap-2"
                    whileHover={{ y: -4, borderColor: `${color}33` }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    <motion.div
                      className="text-2xl font-extrabold"
                      style={{ color }}
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      {value}
                    </motion.div>
                    <span className="label text-on-surface-muted text-[10px]">{label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Features list */}
            <Stagger stagger={0.08} className="space-y-3">
              {FEATURES.map((key, i) => (
                <motion.div
                  key={key}
                  variants={staggerItem}
                  className="flex items-center gap-3 glass px-4 py-3 rounded-lg"
                  whileHover={{ x: 4, borderColor: `${FEATURE_COLORS[i]}33` }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: FEATURE_COLORS[i] }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.8 + i * 0.2, repeat: Infinity }}
                  />
                  <span className="label text-on-surface-muted text-[11px]">{s[key]}</span>
                  <span className="ms-auto label text-primary text-[10px]">✓</span>
                </motion.div>
              ))}
            </Stagger>

            {/* Online pulse */}
            <div className="flex items-center gap-3 pt-2">
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-primary shrink-0"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span className="label text-primary text-[11px]">ONLINE NOW</span>
            </div>
          </div>
        </Reveal>

        {/* Right: text */}
        <Reveal direction="right" className="order-1 md:order-2">
          <div className="inline-flex items-center gap-2 mb-4">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="label text-primary text-[11px]">{s.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
            {s.heading}
          </h2>
          <p className="text-on-surface-muted text-lg leading-relaxed">{s.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
