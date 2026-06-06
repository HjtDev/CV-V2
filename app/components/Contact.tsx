'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './motion/Reveal';
import CursorSpotlight from './interactive/CursorSpotlight';

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass =
    'w-full glass px-4 py-3.5 rounded-xl text-on-surface placeholder-on-surface-muted outline-none bg-transparent text-sm transition-all duration-200 focus:border-primary/40';

  return (
    <section id="contact" className="relative overflow-hidden py-32 px-6">
      <motion.div
        className="section-blob w-[500px] h-[500px]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', opacity: 0.07, bottom: 0, right: 0 }}
        animate={{ x: [0, -20, 0], y: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <Reveal direction="left">
            {/* Profile */}
            <div className="flex items-center gap-5 mb-10">
              <div className="relative shrink-0">
                <motion.div
                  className="w-20 h-20 rounded-2xl overflow-hidden"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(0,255,194,0.3)' }}
                >
                  <Image
                    src="/profile.png"
                    alt="Mohammad Hojjat Nikoobakht"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </motion.div>
                <motion.span
                  className="absolute -bottom-1 -end-1 w-4 h-4 rounded-full bg-primary border-2 border-surface"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-2">
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                  <span className="label text-primary text-[11px]">{c.badge}</span>
                </div>
                <p className="text-on-surface font-semibold leading-tight">{t.about.name}</p>
                <p className="label text-on-surface-muted text-[11px] mt-0.5">{c.role}</p>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">{c.heading}</h2>
            <p className="text-on-surface-muted text-lg leading-relaxed mb-10">{c.body}</p>

            <div className="space-y-4">
              {[
                { label: c.locationLabel, value: c.locationValue, mono: true },
                { label: c.statusLabel, value: c.statusValue, pulse: true },
              ].map(({ label, value, pulse }, i) => (
                <motion.div
                  key={label}
                  className="glass p-5 rounded-xl"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ borderColor: 'rgba(0,255,194,0.2)', x: 4 }}
                >
                  <p className="label text-on-surface-muted text-[10px] mb-1">{label}</p>
                  <div className="flex items-center gap-2">
                    {pulse && (
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    )}
                    <p className="label text-primary">{value}</p>
                  </div>
                </motion.div>
              ))}

              <div className="flex gap-3 pt-2">
                {[
                  { icon: '🐙', label: 'GitHub', href: 'https://github.com' },
                  { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com' },
                ].map(({ icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-5 py-3 rounded-xl label text-on-surface-muted text-[11px] flex items-center gap-2"
                    whileHover={{ y: -3, borderColor: 'rgba(0,255,194,0.3)', color: '#00ffc2' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    <span>{icon}</span> {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right">
            <motion.div
              className="glass-strong p-8 rounded-2xl"
              whileHover={{ borderColor: 'rgba(0,255,194,0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <CursorSpotlight color="rgba(0,255,194,0.05)" radius={260} />
              <p className="label text-on-surface-muted text-[11px] mb-6 relative z-10">{c.formHeading}</p>

              <div className="relative z-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(0,255,194,0.1)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, boxShadow: ['0 0 0px rgba(0,255,194,0)', '0 0 32px rgba(0,255,194,0.3)', '0 0 0px rgba(0,255,194,0)'] }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    ✓
                  </motion.div>
                  <motion.p
                    className="label text-primary"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    MESSAGE_SENT
                  </motion.p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { type: 'text', placeholder: c.namePlaceholder },
                    { type: 'email', placeholder: c.emailPlaceholder },
                  ].map(({ type, placeholder }) => (
                    <motion.input
                      key={placeholder}
                      type={type}
                      required
                      placeholder={placeholder}
                      className={inputClass}
                      whileFocus={{ borderColor: 'rgba(0,255,194,0.4)', boxShadow: '0 0 0 1px rgba(0,255,194,0.15)' }}
                    />
                  ))}
                  <motion.textarea
                    required
                    rows={5}
                    placeholder={c.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                    whileFocus={{ borderColor: 'rgba(0,255,194,0.4)', boxShadow: '0 0 0 1px rgba(0,255,194,0.15)' }}
                  />
                  <motion.button
                    type="submit"
                    className="w-full py-4 rounded-xl label text-sm font-semibold text-surface"
                    style={{ background: 'linear-gradient(135deg, #00ffc2, #00e1ab)' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(0,255,194,0.35)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    {c.submit}
                  </motion.button>
                </form>
              )}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
