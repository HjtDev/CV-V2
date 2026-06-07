'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import OrbField, { ORBS_HERO } from './interactive/OrbField';

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Interactive mouse-repelling orbs */}
      <OrbField orbs={ORBS_HERO} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="label text-primary">{t.hero.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-8"
          style={{ letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
        >
          {t.hero.heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-on-surface-muted text-lg md:text-xl mb-12 max-w-[600px] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26, ease }}
        >
          {t.about.name} — {t.contact.role}
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease }}
        >
          <motion.button
            onClick={() => scrollTo('work')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg border border-primary/50 text-primary label hover:bg-primary/10 transition-colors duration-200 glow-green"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          >
            {t.hero.cta}
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.1, duration: 0.6 }}
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
