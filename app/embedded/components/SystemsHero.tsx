'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import OrbField from '../../components/interactive/OrbField';
import CircuitSVG from '../../components/interactive/CircuitSVG';
import type { OrbConfig } from '../../components/interactive/OrbField';

const ORBS_SYSTEMS: OrbConfig[] = [
  { x: 0.08, y: 0.28, size: 260, color: 'rgba(0,255,194,0.12)', blur: 52, repelRadius: 220, repelStrength: 155, returnSpeed: 0.05 },
  { x: 0.88, y: 0.55, size: 200, color: 'rgba(0,225,171,0.09)', blur: 44, repelRadius: 190, repelStrength: 130, returnSpeed: 0.04 },
  { x: 0.50, y: 0.88, size: 170, color: 'rgba(189,0,255,0.07)', blur: 38, repelRadius: 170, repelStrength: 108, returnSpeed: 0.062 },
  { x: 0.22, y: 0.72, size: 140, color: 'rgba(0,255,194,0.09)', blur: 32, repelRadius: 148, repelStrength: 88, returnSpeed: 0.055 },
  { x: 0.74, y: 0.15, size: 125, color: 'rgba(255,122,0,0.06)', blur: 28, repelRadius: 132, repelStrength: 76, returnSpeed: 0.045 },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function SystemsHero() {
  const { t } = useLanguage();
  const h = t.systems.hero;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <OrbField orbs={ORBS_SYSTEMS} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Circuit decorations */}
      <div className="absolute top-0 right-0 w-[520px] h-[380px] overflow-hidden hidden lg:block">
        <CircuitSVG className="w-full h-full" opacity={0.13} />
      </div>
      <div className="absolute bottom-0 left-0 w-[360px] h-[260px] overflow-hidden hidden lg:block"
        style={{ transform: 'scaleX(-1) scaleY(-1)' }}>
        <CircuitSVG className="w-full h-full" opacity={0.07} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[860px] mx-auto text-center">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <motion.span className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="label text-primary">{h.badge}</span>
        </motion.div>

        {/* Status chip */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20"
            style={{ background: 'rgba(0,255,194,0.04)' }}>
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: '#00ffc2', boxShadow: '0 0 8px rgba(0,255,194,0.8)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="label text-primary text-[10px]">{h.statusOnline}</span>
          </div>
        </motion.div>

        {/* Heading — second line gets outline treatment */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-[82px] font-extrabold leading-[1.08] text-on-surface mb-7 whitespace-pre-line"
          style={{ letterSpacing: '-0.025em' }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease }}
        >
          {h.headline.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span style={{ WebkitTextStroke: '1.5px rgba(0,255,194,0.65)', color: 'transparent' }}>
                  {line}
                </span>
              ) : line}
            </span>
          ))}
        </motion.h1>

        {/* Body */}
        <motion.p
          className="text-on-surface-muted text-lg md:text-xl mb-10 max-w-[620px] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease }}
        >
          {h.body}
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="flex justify-center gap-10 mb-12"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease }}
        >
          {[
            { label: h.statsYearsLabel,    value: h.statsYearsValue    },
            { label: h.statsProjectsLabel, value: h.statsProjectsValue },
            { label: h.statsStackLabel,    value: h.statsStackValue    },
          ].map(({ label, value }, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-primary" style={{ letterSpacing: '-0.02em' }}>
                {value}
              </div>
              <div className="label text-on-surface-muted text-[10px] mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.46, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          dir="ltr"
        >
          <motion.button
            onClick={() => scrollTo('iot')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg border border-primary/50 text-primary label hover:bg-primary/10 transition-colors duration-200 glow-green"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          >
            {h.cta}
            <motion.svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>

          <Link
            href="/cv"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/15 label text-on-surface-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
          >
            {h.viewCV}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="label text-on-surface-muted text-[10px]">SCROLL</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
