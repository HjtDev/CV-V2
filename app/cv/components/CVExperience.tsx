'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

function AnimatedYears({ target, reduced }: { target: number; reduced: boolean | null }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(Math.min(v, target)).toString());
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (reduced) { setDisplay(String(target)); return; }
    const controls = animate(count, target, { duration: 1.6, ease: 'easeOut' });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [reduced, target]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span dir="ltr">{display}</span>;
}

export default function CVExperience() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const cv = t.cv.experience;

  const fadeUp = {
    hidden: { opacity: 0, y: 14, filter: 'blur(5px)' },
    visible: (d: number) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring' as const, duration: 0.55, bounce: 0, delay: d },
    }),
  };

  return (
    <section id="experience" ref={ref} className="relative py-28 px-6 max-w-[1280px] mx-auto overflow-hidden">

      {/* Animated ambient blob */}
      <motion.div
        aria-hidden="true"
        className="section-blob w-[420px] h-[420px] opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', bottom: '0%', left: '-8%' }}
        animate={prefersReduced ? {} : { x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Header */}
      <motion.div
        className="mb-16"
        custom={0}
        variants={prefersReduced ? undefined : fadeUp}
        initial={prefersReduced ? false : 'hidden'}
        animate={inView ? 'visible' : 'hidden'}
      >
        <p className="label text-primary mb-3">{cv.badge}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-on-surface">{cv.heading}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

        {/* ── Left: compact counter + body + highlights ──────────────── */}
        <div className="md:col-span-8 space-y-6">

          {/* Compact years counter badge */}
          <motion.div
            custom={0.06}
            variants={prefersReduced ? undefined : fadeUp}
            initial={prefersReduced ? false : 'hidden'}
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className="inline-flex items-baseline gap-2 glass border border-white/10 px-3 py-1.5 rounded-xl">
              <span
                className="text-xl font-bold text-primary"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {inView ? <AnimatedYears target={5} reduced={prefersReduced} /> : '0'}
              </span>
              <span className="label text-outline text-[11px]">{t.cv.hero.yearsLabel}</span>
            </span>
          </motion.div>

          <motion.div
            className="w-10 h-px bg-white/10"
            custom={0.1}
            variants={prefersReduced ? undefined : fadeUp}
            initial={prefersReduced ? false : 'hidden'}
            animate={inView ? 'visible' : 'hidden'}
          />

          <motion.p
            className="text-on-surface-variant text-base leading-relaxed"
            custom={0.15}
            variants={prefersReduced ? undefined : fadeUp}
            initial={prefersReduced ? false : 'hidden'}
            animate={inView ? 'visible' : 'hidden'}
          >
            {cv.body}
          </motion.p>

          <ul className="space-y-3">
            {cv.highlights.map((h, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-on-surface-variant text-sm"
                custom={prefersReduced ? 0 : 0.2 + i * 0.1}
                variants={prefersReduced ? undefined : fadeUp}
                initial={prefersReduced ? false : 'hidden'}
                animate={inView ? 'visible' : 'hidden'}
              >
                <span
                  className="mt-1 shrink-0 w-4 h-4 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                </span>
                {h}
              </motion.li>
            ))}
          </ul>

          {/* See My Projects */}
          <motion.div
            custom={prefersReduced ? 0 : 0.2 + cv.highlights.length * 0.1}
            variants={prefersReduced ? undefined : fadeUp}
            initial={prefersReduced ? false : 'hidden'}
            animate={inView ? 'visible' : 'hidden'}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 label text-primary hover:gap-3 transition-all duration-200"
            >
              {cv.seeProjects}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Right: freelance role card ─────────────────────────────── */}
        <motion.div
          className="md:col-span-4"
          custom={0.1}
          variants={prefersReduced ? undefined : fadeUp}
          initial={prefersReduced ? false : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="glass border border-white/8 rounded-3xl p-8 flex flex-col gap-6">
            <div>
              <p className="label text-outline text-[10px] uppercase mb-3">{cv.badge}</p>
              <p className="font-bold text-on-surface text-lg leading-snug mb-2">{cv.freelanceTitle}</p>
              <p className="label text-primary/70">{cv.freelancePeriod}</p>
            </div>
            <div className="border-t border-white/8 pt-4">
              <p className="label text-outline text-[10px] uppercase">{cv.remote}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
