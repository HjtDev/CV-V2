'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './motion/Reveal';

const SKILL_ICONS: Record<string, string> = {
  'HTML': '🌐', 'CSS': '🎨', 'Tailwind': '💨', 'Docker': '🐳',
  'Compose': '🧩', 'Django': '🐍', 'Next.js': '▲', 'Git': '📌',
  'GitHub': '🐙', 'CI/CD': '🔄',
};

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, delay: i * 0.06, ease: easing },
  }),
};

export default function Toolkit() {
  const { t } = useLanguage();
  const tk = t.toolkit;

  return (
    <section className="relative overflow-hidden py-32 px-6 bg-surface-low/20">
      <motion.div
        className="section-blob w-[500px] h-[500px] opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', top: '50%', right: '-10%' }}
        animate={{ x: [0, -20, 0], y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="label text-primary text-[11px]">{tk.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{tk.heading}</h2>
          </Reveal>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {tk.skills.map((skill, i) => (
            <motion.div
              key={skill}
              custom={i}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.05, boxShadow: '0 0 20px rgba(0,255,194,0.15)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="glass p-5 rounded-xl flex flex-col items-center gap-3 cursor-default"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <motion.span
                className="text-3xl"
                whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.35 }}
              >
                {SKILL_ICONS[skill] ?? '⚙️'}
              </motion.span>
              <span className="label text-on-surface-muted text-[11px] group-hover:text-primary transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
