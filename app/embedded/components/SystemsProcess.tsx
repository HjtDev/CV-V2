'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Reveal } from '../../components/motion/Reveal';
import CursorSpotlight from '../../components/interactive/CursorSpotlight';

const CARD_COLORS = ['#00ffc2', '#bd00ff', '#ff7a00'];

const CARD_ICONS = [
  // Embedded mindset — chip with lightning
  <svg key="embed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
    <rect x="7" y="7" width="10" height="10" rx="1.5" />
    <path d="M9 7V5M12 7V4M15 7V5M9 17v2M12 17v3M15 17v2M7 9H5M7 12H3M7 15H5M17 9h2M17 12h4M17 15h2" />
  </svg>,
  // Systems that ship — rocket/launch
  <svg key="ship" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
    <path d="M12 2C12 2 7 6 7 13v2l-2 3h10l-2-3v-2c0-7-5-11-1-11z" /><circle cx="12" cy="10" r="2" />
    <path d="M9 20c0 1.1.9 2 2 2h2a2 2 0 002-2" />
  </svg>,
  // Full-stack bridge — two nodes connected
  <svg key="full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
    <rect x="2" y="8" width="6" height="8" rx="1.5" /><rect x="16" y="8" width="6" height="8" rx="1.5" />
    <path d="M8 12h8" /><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" opacity="0.3" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
];

export default function SystemsIntegration() {
  const { t } = useLanguage();
  const int = t.systems.integration;

  return (
    <section id="integration" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="section-blob w-[600px] h-[600px]"
        style={{ background: 'radial-gradient(circle, rgba(0,255,194,1), transparent 70%)', opacity: 0.04, top: '10%', left: '20%' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">

        {/* Header */}
        <Reveal direction="up" className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="label text-primary">{int.badge}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6"
            style={{ letterSpacing: '-0.025em' }}>
            {int.heading}
          </h2>
          <p className="text-on-surface-muted text-lg max-w-[640px] mx-auto leading-relaxed">
            {int.body}
          </p>
        </Reveal>

        {/* Three feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { heading: int.p1heading, body: int.p1body, color: CARD_COLORS[0], icon: CARD_ICONS[0] },
            { heading: int.p2heading, body: int.p2body, color: CARD_COLORS[1], icon: CARD_ICONS[1] },
            { heading: int.p3heading, body: int.p3body, color: CARD_COLORS[2], icon: CARD_ICONS[2] },
          ].map(({ heading, body, color, icon }, i) => (
            <Reveal key={i} direction="up" delay={i * 0.12}>
              <motion.div
                className="relative glass-strong rounded-2xl p-8 h-full flex flex-col gap-5 overflow-hidden"
                whileHover={{ y: -4, borderColor: `${color}30`, boxShadow: `0 0 36px ${color}0d` }}
                transition={{ duration: 0.28 }}
              >
                <CursorSpotlight color={`${color}07`} radius={220} />

                {/* Icon */}
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center relative z-10"
                  style={{ background: `${color}10`, color, border: `1px solid ${color}25` }}
                  animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 18px ${color}30`, `0 0 0px ${color}00`] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                >
                  {icon}
                </motion.div>

                <div className="relative z-10 flex-1">
                  <h3 className="font-bold text-on-surface text-xl mb-3 leading-tight">{heading}</h3>
                  <p className="text-on-surface-muted text-sm leading-relaxed">{body}</p>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '55%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA hint — "Ready to Interface?" */}
        <Reveal direction="up" delay={0.2} className="text-center mt-24">
          <p className="label text-on-surface-muted text-[11px] mb-4">READY TO INTERFACE?</p>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg border border-primary/40 label text-primary hover:bg-primary/10 transition-colors duration-200 glow-green"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          >
            SEND_PACKET
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
