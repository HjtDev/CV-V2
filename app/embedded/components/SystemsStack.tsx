'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Reveal } from '../../components/motion/Reveal';
import CursorSpotlight from '../../components/interactive/CursorSpotlight';

const FEAT_ICONS = [
  // PLC / industrial
  <svg key="plc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M7 10h2v4H7zM11 10h2v4h-2zM15 10h2v4h-2z" />
    <path d="M3 9h18M3 15h18" strokeWidth="0.8" opacity="0.5" />
  </svg>,
  // Network / Modbus
  <svg key="mod" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
    <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
    <path d="M12 7v3M10.3 17l-3.8-5.5M13.7 17l3.8-5.5" />
  </svg>,
  // HMI display
  <svg key="hmi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 20h8M12 18v2" />
    <path d="M6 9h4M6 12h6M6 15h3" />
    <rect x="14" y="9" width="4" height="4" rx="1" fill="currentColor" opacity="0.25" />
  </svg>,
];

const FEAT_COLORS = ['#00ffc2', '#bd00ff', '#ff7a00'];

export default function SystemsPLC() {
  const { t } = useLanguage();
  const plc = t.systems.plc;

  return (
    <section id="plc" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="section-blob w-[600px] h-[600px]"
        style={{ background: 'radial-gradient(circle, #bd00ff, transparent 70%)', opacity: 0.05, bottom: '5%', right: '-10%' }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">

        {/* Header */}
        <Reveal direction="up" className="text-center mb-6">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <motion.span className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#bd00ff' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="label" style={{ color: '#bd00ff' }}>{plc.badge}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4"
            style={{ letterSpacing: '-0.025em' }}>
            {plc.heading}
          </h2>
          <p className="text-on-surface-muted text-lg max-w-[620px] mx-auto leading-relaxed mb-8">
            {plc.body}
          </p>

          {/* Live in production badge */}
          <Reveal direction="up" delay={0.15}>
            <div className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full">
              <motion.span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: '#00ffc2', boxShadow: '0 0 10px rgba(0,255,194,0.8)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="label text-[11px] text-on-surface-muted">{plc.shippedLabel}:</span>
              <span className="label text-[11px] text-primary">{plc.shippedValue}</span>
            </div>
          </Reveal>
        </Reveal>

        {/* Ladder logic animation strip */}
        <Reveal direction="up" delay={0.1} className="mb-16">
          <div className="relative h-16 overflow-hidden rounded-xl glass mx-auto max-w-[700px]">
            <div className="absolute inset-0 flex items-center px-6 gap-0">
              {/* Power rails */}
              <div className="w-1.5 h-full" style={{ background: 'linear-gradient(to bottom, transparent, #00ffc2, transparent)', opacity: 0.4 }} />
              {/* Rungs */}
              <div className="flex-1 flex flex-col justify-around py-3 px-4 gap-2">
                {[0, 1].map((rung) => (
                  <div key={rung} className="flex items-center gap-3">
                    <div className="flex-1 h-px" style={{ background: 'rgba(0,255,194,0.25)' }} />
                    {/* Contact symbols */}
                    <motion.div
                      className="w-5 h-5 border rounded-sm flex items-center justify-center"
                      style={{ borderColor: 'rgba(0,255,194,0.5)', background: 'rgba(0,255,194,0.05)' }}
                      animate={{ borderColor: ['rgba(0,255,194,0.3)', 'rgba(0,255,194,0.9)', 'rgba(0,255,194,0.3)'] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: rung * 0.4 }}
                    >
                      <span className="text-[7px] text-primary font-bold">—|</span>
                    </motion.div>
                    <div className="flex-1 h-px" style={{ background: 'rgba(0,255,194,0.25)' }} />
                    {/* Coil symbol */}
                    <motion.div
                      className="w-5 h-5 border rounded-full flex items-center justify-center"
                      style={{ borderColor: 'rgba(189,0,255,0.5)', background: 'rgba(189,0,255,0.05)' }}
                      animate={{ borderColor: ['rgba(189,0,255,0.3)', 'rgba(189,0,255,0.9)', 'rgba(189,0,255,0.3)'] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: rung * 0.4 + 0.5 }}
                    >
                      <span className="text-[7px]" style={{ color: '#bd00ff' }}>()</span>
                    </motion.div>
                    <div className="w-4 h-px" style={{ background: 'rgba(0,255,194,0.25)' }} />
                  </div>
                ))}
              </div>
              {/* Right power rail */}
              <div className="w-1.5 h-full" style={{ background: 'linear-gradient(to bottom, transparent, #00ffc2, transparent)', opacity: 0.4 }} />
            </div>
            {/* Scanning line */}
            <motion.div
              className="absolute top-0 bottom-0 w-0.5 rounded"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,255,194,0.6), transparent)' }}
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
            />
            <p className="absolute bottom-1.5 right-3 label text-[8px] text-on-surface-muted opacity-40">LADDER DIAGRAM</p>
          </div>
        </Reveal>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plc.feat.map((feat, i) => (
            <Reveal key={i} direction="up" delay={i * 0.12} className="h-full">
              <motion.div
                className="relative glass-strong rounded-2xl p-8 flex flex-col gap-5 overflow-hidden h-full"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                whileHover={{ y: -4, borderColor: `${FEAT_COLORS[i]}4d`, boxShadow: `0 0 36px ${FEAT_COLORS[i]}0d` }}
                transition={{ duration: 0.28 }}
              >
                <CursorSpotlight color={`${FEAT_COLORS[i]}07`} radius={220} />

                {/* Icon */}
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center relative z-10"
                  style={{
                    background: `${FEAT_COLORS[i]}10`,
                    color: FEAT_COLORS[i],
                    border: `1px solid ${FEAT_COLORS[i]}25`,
                  }}
                  animate={{ boxShadow: [`0 0 0px ${FEAT_COLORS[i]}00`, `0 0 18px ${FEAT_COLORS[i]}30`, `0 0 0px ${FEAT_COLORS[i]}00`] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {FEAT_ICONS[i]}
                </motion.div>

                <div className="relative z-10">
                  <h3 className="font-bold text-on-surface text-lg mb-3 leading-tight">{feat.name}</h3>
                  <p className="text-on-surface-muted text-sm leading-relaxed">{feat.body}</p>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${FEAT_COLORS[i]}, transparent)` }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '55%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
