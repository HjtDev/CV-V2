'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import CursorSpotlight from '../../components/interactive/CursorSpotlight';
import { SiTelegram } from 'react-icons/si';
import { FaPhone } from 'react-icons/fa';

const EMAIL = 'm.h.nikoobakht@gmail.com';

export default function CVContact() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const cv = t.cv.contact;

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring' as const, duration: 0.55, bounce: 0, delay },
    },
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 px-6 max-w-[1280px] mx-auto overflow-hidden"
    >
      {/* Animated ambient blob */}
      <motion.div
        aria-hidden="true"
        className="section-blob w-[500px] h-[500px] opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', bottom: '-10%', left: '20%' }}
        animate={prefersReduced ? {} : { x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="glass border border-white/8 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">

        {/* Mouse glow on the whole card */}
        <CursorSpotlight color="rgba(0,255,194,0.05)" radius={380} />

        {/* Background static glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(0,255,194,0.07) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text + contact items ──────────────────────────── */}
          <div>
            <motion.p
              className="label text-primary mb-4"
              variants={prefersReduced ? undefined : fadeUp(0)}
              initial={prefersReduced ? false : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
            >
              {cv.badge}
            </motion.p>

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-on-surface mb-4"
              variants={prefersReduced ? undefined : fadeUp(0.08)}
              initial={prefersReduced ? false : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
            >
              {cv.heading}
            </motion.h2>

            <motion.p
              className="text-on-surface-variant leading-relaxed mb-10"
              variants={prefersReduced ? undefined : fadeUp(0.16)}
              initial={prefersReduced ? false : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
            >
              {cv.body}
            </motion.p>

            {/* Email row */}
            <motion.div
              className="space-y-5"
              variants={prefersReduced ? undefined : fadeUp(0.22)}
              initial={prefersReduced ? false : 'hidden'}
              animate={inView ? 'visible' : 'hidden'}
            >
              <button
                onClick={copyEmail}
                className="flex items-center gap-4 group w-full text-start"
                aria-label={`Copy email ${EMAIL}`}
              >
                <div className="w-12 h-12 rounded-full glass border border-white/8 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-200">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.svg
                        key="check"
                        className="w-4 h-4 text-primary"
                        viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ type: 'spring', duration: 0.3, bounce: 0.1 }}
                      >
                        <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="mail"
                        className="w-4 h-4 text-on-surface-variant group-hover:text-primary"
                        viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ type: 'spring', duration: 0.3, bounce: 0.1 }}
                      >
                        <rect x="1" y="3.5" width="14" height="9" rx="1.5" />
                        <path d="M1 5l7 5 7-5" strokeLinecap="round" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <p className="label text-outline text-[10px] uppercase mb-0.5">{cv.emailLabel}</p>
                  <p className="text-on-surface font-semibold group-hover:text-primary transition-colors" dir="ltr">
                    {EMAIL}
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass border border-white/8 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-on-surface-variant" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="8" cy="7" r="2.5" />
                    <path d="M8 1.5C5.015 1.5 2.5 4.015 2.5 7c0 4 5.5 8.5 5.5 8.5s5.5-4.5 5.5-8.5c0-2.985-2.515-5.5-5.5-5.5Z" />
                  </svg>
                </div>
                <div>
                  <p className="label text-outline text-[10px] uppercase mb-0.5">{cv.locationLabel}</p>
                  <p className="text-on-surface font-semibold">{cv.locationValue}</p>
                </div>
              </div>

              <a
                href="https://t.me/HjtDev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group w-full text-start"
              >
                <div className="w-12 h-12 rounded-full glass border border-white/8 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-200">
                  <SiTelegram className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden="true" />
                </div>
                <div>
                  <p className="label text-outline text-[10px] uppercase mb-0.5">{cv.telegramLabel}</p>
                  <p className="text-on-surface font-semibold group-hover:text-primary transition-colors" dir="ltr">@HjtDev</p>
                </div>
              </a>

              <a
                href="tel:+989385965775"
                className="flex items-center gap-4 group w-full text-start"
              >
                <div className="w-12 h-12 rounded-full glass border border-white/8 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-200">
                  <FaPhone className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden="true" />
                </div>
                <div>
                  <p className="label text-outline text-[10px] uppercase mb-0.5">{cv.phoneLabel}</p>
                  <p className="text-on-surface font-semibold group-hover:text-primary transition-colors" dir="ltr">{cv.phoneNumber}</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* ── Right: CTAs ──────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-4"
            variants={prefersReduced ? undefined : fadeUp(0.3)}
            initial={prefersReduced ? false : 'hidden'}
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Dark text on bright primary button — text-surface = #131313 */}
            <motion.div
              whileHover={prefersReduced ? {} : { boxShadow: '0 0 32px rgba(0,255,194,0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="rounded-2xl"
            >
              <Link
                href="/#contact"
                className="block w-full text-center px-8 py-4 bg-primary label font-bold rounded-2xl active:scale-[0.97] transition-transform duration-200"
                style={{ color: '#131313' }}
              >
                {cv.cta}
              </Link>
            </motion.div>
            <Link
              href="/"
              className="w-full text-center px-8 py-4 glass border border-white/10 label text-on-surface-variant hover:text-primary hover:border-primary/30 rounded-2xl active:scale-[0.97] transition-all duration-200"
            >
              {cv.backToPortfolio}
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
