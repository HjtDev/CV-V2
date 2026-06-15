'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './motion/Reveal';
import CursorSpotlight from './interactive/CursorSpotlight';
import { SiGithub, SiTelegram } from 'react-icons/si';
import { FaLinkedinIn, FaPhone } from 'react-icons/fa';
import { api } from '../lib/api';
import type { SiteStatus } from '../lib/types';

type Props = { siteStatus?: SiteStatus | null };

export default function Contact({ siteStatus }: Props) {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const [submitted, setSubmitted]     = useState(false);
  const [error, setError]             = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [loading, setLoading]         = useState(false);

  const statusValue = siteStatus
    ? (lang === 'fa' ? siteStatus.status_text_fa : siteStatus.status_text)
    : c.statusValue;

  const isAvailable = siteStatus?.is_available !== false;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      await api.post('/api/v1/contact/', data);
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 429) {
        setRateLimited(true);
        setTimeout(() => setRateLimited(false), 60_000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full glass px-4 py-3.5 rounded-xl text-on-surface placeholder-on-surface-muted outline-none bg-transparent text-sm';

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

          {/* Left — info */}
          <Reveal direction="left">
            {/* Profile row */}
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
                {/* Availability dot — green = available, red = not */}
                <motion.span
                  className="absolute -bottom-1 -end-1 w-4 h-4 rounded-full border-2 border-surface"
                  style={{ background: isAvailable ? '#00ffc2' : '#ff4444' }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-2">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
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
                { label: c.locationLabel, value: c.locationValue, pulse: false },
                { label: c.statusLabel,   value: statusValue,     pulse: true  },
              ].map(({ label, value, pulse }, i) => (
                <motion.div
                  key={label}
                  className="glass p-5 rounded-xl"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
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
                        className="w-2 h-2 rounded-full"
                        style={{ background: isAvailable ? '#00ffc2' : '#ff4444' }}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    )}
                    <p className="label text-primary">{value}</p>
                  </div>
                </motion.div>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                {([
                  { Icon: SiGithub,   label: c.github,   href: 'https://github.com/HjtDev' },
                  { Icon: FaLinkedinIn, label: c.linkedin,  href: 'https://www.linkedin.com/in/mohammad-hojjat-nikoobakht-807aaa301?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
                  { Icon: SiTelegram, label: c.telegram,  href: 'https://t.me/HjtDev' },
                  { Icon: FaPhone,    label: c.phone,     href: 'tel:+989385965775' },
                ] as const).map(({ Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-5 py-3 rounded-xl label text-on-surface-muted text-[11px] flex items-center gap-2"
                    style={{ borderColor: 'rgba(255,255,255,0.07)', color: '#83958c' }}
                    whileHover={{ y: -3, borderColor: 'rgba(0,255,194,0.3)', color: '#00ffc2' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal direction="right">
            <motion.div
              className="glass-strong p-8 rounded-2xl"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
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
                      animate={{
                        scale: 1,
                        boxShadow: ['0 0 0px rgba(0,255,194,0)', '0 0 32px rgba(0,255,194,0.3)', '0 0 0px rgba(0,255,194,0)'],
                      }}
                      transition={{
                        scale: { type: 'spring', stiffness: 300, damping: 20 },
                        boxShadow: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    >
                      ✓
                    </motion.div>
                    <motion.p
                      className="label text-primary"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {c.sent}
                    </motion.p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {(error || rateLimited) && (
                      <motion.div
                        className="flex items-center gap-3 px-4 py-3 rounded-xl"
                        style={{ background: rateLimited ? 'rgba(255,170,0,0.08)' : 'rgba(255,68,68,0.08)', border: `1px solid ${rateLimited ? 'rgba(255,170,0,0.2)' : 'rgba(255,68,68,0.2)'}` }}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-base">{rateLimited ? '⏱' : '✕'}</span>
                        <p className="label text-[11px]" style={{ color: rateLimited ? '#ffaa00' : '#ff4444' }}>
                          {rateLimited ? c.rateLimited : c.sendError}
                        </p>
                      </motion.div>
                    )}
                    <motion.input
                      name="name"
                      type="text"
                      required
                      placeholder={c.namePlaceholder}
                      className={inputClass}
                      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                      whileFocus={{ borderColor: 'rgba(0,255,194,0.4)', boxShadow: '0 0 0 1px rgba(0,255,194,0.15)' }}
                    />
                    <motion.input
                      name="email"
                      type="email"
                      required
                      placeholder={c.emailPlaceholder}
                      className={inputClass}
                      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                      whileFocus={{ borderColor: 'rgba(0,255,194,0.4)', boxShadow: '0 0 0 1px rgba(0,255,194,0.15)' }}
                    />
                    <motion.textarea
                      name="message"
                      required
                      rows={5}
                      placeholder={c.messagePlaceholder}
                      className={`${inputClass} resize-none`}
                      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                      whileFocus={{ borderColor: 'rgba(0,255,194,0.4)', boxShadow: '0 0 0 1px rgba(0,255,194,0.15)' }}
                    />
                    <motion.button
                      type="submit"
                      disabled={loading || rateLimited}
                      className="w-full py-4 rounded-xl label text-sm font-semibold text-surface disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #00ffc2, #00e1ab)' }}
                      whileHover={loading ? {} : { scale: 1.02, boxShadow: '0 0 24px rgba(0,255,194,0.35)' }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    >
                      {loading
                        ? (lang === 'fa' ? 'در حال ارسال...' : 'Sending...')
                        : c.submit}
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
