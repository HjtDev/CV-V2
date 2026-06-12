'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import type { SiteStatus } from '../../lib/types';
import OrbField from '../../components/interactive/OrbField';
import type { OrbConfig } from '../../components/interactive/OrbField';

// Green-only orbs for CV hero — no purple secondary accent
const ORBS_CV: OrbConfig[] = [
  { x: 0.12, y: 0.28, size: 300, color: 'rgba(0,255,194,0.08)', blur: 60, repelRadius: 230, repelStrength: 150, returnSpeed: 0.05 },
  { x: 0.82, y: 0.60, size: 240, color: 'rgba(0,255,194,0.06)', blur: 50, repelRadius: 200, repelStrength: 120, returnSpeed: 0.045 },
  { x: 0.55, y: 0.88, size: 190, color: 'rgba(0,255,194,0.05)', blur: 42, repelRadius: 175, repelStrength: 90,  returnSpeed: 0.06 },
  { x: 0.90, y: 0.12, size: 150, color: 'rgba(0,255,194,0.04)', blur: 32, repelRadius: 150, repelStrength: 70,  returnSpeed: 0.04 },
];

interface Props {
  siteStatus?: SiteStatus | null;
}

const item = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring' as const, duration: 0.55, bounce: 0 },
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export default function CVHero({ siteStatus }: Props) {
  const { t, lang } = useLanguage();
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const cv = t.cv.hero;
  const lines = cv.headline.split('\n');

  const isAvailable = siteStatus?.is_available !== false;
  const statusText = siteStatus
    ? (lang === 'fa' ? siteStatus.status_text_fa : siteStatus.status_text)
    : cv.status;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100dvh] flex items-center pt-24 pb-16 px-6 overflow-hidden"
    >
      {/* Mouse-repelling orb field — same effect as main portfolio hero */}
      {!prefersReduced && <OrbField orbs={ORBS_CV} />}

      <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* ── Left: text ────────────────────────────────────────────── */}
        <motion.div
          className="md:col-span-6 order-2 md:order-1"
          variants={prefersReduced ? undefined : container}
          initial={prefersReduced ? false : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Badge */}
          <motion.div variants={prefersReduced ? undefined : item} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 label text-primary">
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                style={{ animation: prefersReduced ? 'none' : 'cvpulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
              />
              {cv.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            {lines.map((line, i) => (
              <motion.span
                key={i}
                variants={prefersReduced ? undefined : item}
                className={`block ${i === 0 ? 'text-on-surface' : 'text-primary'}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Body */}
          <motion.p
            variants={prefersReduced ? undefined : item}
            className="text-on-surface-muted text-base md:text-lg leading-relaxed mb-8 max-w-lg"
          >
            {cv.body}
          </motion.p>

          {/* Location + live status from backend */}
          <motion.div variants={prefersReduced ? undefined : item} className="flex flex-wrap gap-4 mb-10">
            <span className="label text-outline flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {cv.location}
            </span>
            <span className="label flex items-center gap-2" style={{ color: isAvailable ? '#00ffc2' : '#ff4444' }}>
              <motion.span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: isAvailable ? '#00ffc2' : '#ff4444' }}
                animate={prefersReduced ? {} : { scale: [1, 1.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              {statusText}
            </span>
          </motion.div>

          {/* CTAs — dark text on the bright button (text-surface = #131313) */}
          <motion.div variants={prefersReduced ? undefined : item} className={`flex flex-wrap gap-4${lang === 'fa' ? ' justify-end md:justify-start' : ''}`} dir="ltr">
            <Link
              href="/"
              className="px-7 py-3 border border-primary/30 glass label text-primary rounded-xl hover:bg-primary/5 hover:border-primary/60 active:scale-[0.97] transition-all duration-200"
            >
              {cv.viewWork}
            </Link>
            <motion.div
              whileHover={prefersReduced ? {} : { boxShadow: '0 0 28px rgba(0,255,194,0.35)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="rounded-xl"
            >
              <Link
                href="/#contact"
                className="block px-7 py-3 bg-primary label font-bold rounded-xl active:scale-[0.97] transition-transform duration-200"
                style={{ color: '#131313' }}
              >
                {cv.contact}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Right: portrait ───────────────────────────────────────── */}
        <motion.div
          className="md:col-span-6 order-1 md:order-2 flex justify-center md:justify-end"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', duration: 0.7, bounce: 0, delay: 0.1 }}
        >
          <div className="relative w-full max-w-[420px]">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl group">
              <img
                src="/profile.png"
                alt="Mohammad Hojjat Nikoobakht"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Floating years stat */}
            <motion.div
              className="absolute -bottom-4 -left-4 md:-left-8 glass border border-white/10 rounded-2xl p-4 shadow-2xl"
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', duration: 0.55, bounce: 0, delay: 0.5 }}
              style={prefersReduced ? {} : { animation: 'cvfloat 4s ease-in-out infinite' }}
            >
              <p className="label text-outline text-primary text-[10px] uppercase mb-1">{cv.yearsLabel}</p>
              <p className="font-bold text-2xl text-primary leading-none" style={{ fontVariantNumeric: 'tabular-nums' }} dir="ltr">
                {cv.yearsValue}
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes cvfloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
        @keyframes cvpulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </section>
  );
}
