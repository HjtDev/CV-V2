'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import CursorSpotlight from '../../components/interactive/CursorSpotlight';

const tagVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(4px)' },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { type: 'spring' as const, duration: 0.45, bounce: 0.15 },
  },
};

export default function CVSkills() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const cv = t.cv.skills;

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 max-w-[1280px] mx-auto overflow-hidden">

      {/* Animated ambient blob */}
      <motion.div
        aria-hidden="true"
        className="section-blob w-[450px] h-[450px] opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', top: '20%', right: '-10%' }}
        animate={prefersReduced ? {} : { x: [0, -18, 0], y: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Header */}
      <motion.div
        className="mb-16"
        initial={prefersReduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ type: 'spring', duration: 0.55, bounce: 0 }}
      >
        <p className="label text-primary mb-3">{cv.badge}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-on-surface">{cv.heading}</h2>
      </motion.div>

      {/* 2×2 grid — glow appears only on hover for all 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cv.categories.map((cat, ci) => (
          <motion.div
            key={ci}
            className="relative overflow-hidden glass border border-white/8 rounded-2xl p-7 transition-colors duration-300 cursor-default"
            initial={prefersReduced ? false : { opacity: 0, y: 16, filter: 'blur(5px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{
              type: 'spring', duration: 0.55, bounce: 0,
              delay: prefersReduced ? 0 : 0.1 + ci * 0.12,
            }}
            whileHover={prefersReduced ? {} : {
              borderColor: 'rgba(0,255,194,0.28)',
              boxShadow: '0 0 28px rgba(0,255,194,0.06)',
            }}
          >
            {/* Mouse glow — same effect as Projects cards on main page */}
            <CursorSpotlight color="rgba(0,255,194,0.07)" radius={280} />

            {/* Category label */}
            <p className="label mb-5 text-primary relative z-10">{cat.name}</p>

            {/* Tag cloud — all neutral at rest, accent on hover */}
            <motion.div
              className="relative z-10 flex flex-wrap gap-2"
              variants={prefersReduced ? undefined : { visible: { transition: { staggerChildren: 0.04 } }, hidden: {} }}
              initial={prefersReduced ? false : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
            >
              {cat.tags.map((tag, ti) => (
                <motion.span
                  key={ti}
                  variants={prefersReduced ? undefined : tagVariants}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.03] text-on-surface-variant hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-default"
                  whileHover={prefersReduced ? {} : { scale: 1.05 }}
                  whileTap={prefersReduced ? {} : { scale: 0.97 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
