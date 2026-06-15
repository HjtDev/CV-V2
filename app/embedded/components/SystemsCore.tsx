'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Reveal, Stagger, staggerItem } from '../../components/motion/Reveal';
import CursorSpotlight from '../../components/interactive/CursorSpotlight';

const LANG_COLORS: Record<number, string> = {
  0: '#00ffc2',
  1: '#00e1ab',
  2: '#bd00ff',
};

const HW_ICONS = [
  // STM32 — microchip
  <svg key="stm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <path d="M7 9H5M7 12H5M7 15H5M17 9h2M17 12h2M17 15h2M9 7V5M12 7V5M15 7V5M9 17v2M12 17v2M15 17v2" />
  </svg>,
  // ESP32 — wifi signal
  <svg key="esp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M5 12.5C5 9 8 6 12 6s7 3 7 6.5" /><path d="M8 14.5C8 12.5 9.8 11 12 11s4 1.5 4 3.5" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </svg>,
  // Raspberry Pi — linux/board
  <svg key="rpi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M8 6V4M12 6V4M16 6V4M8 18v2M12 18v2M16 18v2M4 9H2M4 13H2M20 9h2M20 13h2" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  // Arduino/AVR — circuit board
  <svg key="ard" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
    <rect x="3" y="8" width="18" height="8" rx="1.5" />
    <path d="M7 8V6M10 8V5M14 8V5M17 8V6" /><path d="M7 16v2M10 16v3M14 16v3M17 16v2" />
    <path d="M9 12h2M13 12h2" />
  </svg>,
];

export default function SystemsIoT() {
  const { t } = useLanguage();
  const iot = t.systems.iot;

  return (
    <section id="iot" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="section-blob w-[700px] h-[700px]"
        style={{ background: 'radial-gradient(circle, rgba(0,255,194,1), transparent 70%)', opacity: 0.04, top: 0, left: '-15%' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">

        {/* ── 01 // IOT_SYSTEMS ─────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">

          {/* Left */}
          <Reveal direction="left">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="label text-primary">{iot.badge}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-6 leading-[1.1]"
              style={{ letterSpacing: '-0.025em' }}>
              {iot.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed mb-10">{iot.body}</p>

            {/* Language stack */}
            <p className="label text-[10px] text-on-surface-muted mb-4">{iot.langBadge}</p>
            <div className="space-y-3">
              {([
                { label: iot.lang1, sub: iot.lang1sub, color: LANG_COLORS[0] },
                { label: iot.lang2, sub: iot.lang2sub, color: LANG_COLORS[1] },
                { label: iot.lang3, sub: iot.lang3sub, color: LANG_COLORS[2] },
              ] as const).map(({ label, sub, color }, i) => (
                <motion.div key={i}
                  className="flex items-center gap-4 glass p-4 rounded-xl"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ x: 4, borderColor: `${color}4d` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                  <div>
                    <span className="label text-[11px] font-bold" style={{ color }}>{label}</span>
                    <span className="label text-[10px] text-on-surface-muted ml-2">— {sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Right — animated circuit diagram decoration */}
          <Reveal direction="right">
            <div className="relative flex items-center justify-center h-full min-h-[300px]">
              {/* Animated MCU block diagram */}
              <svg viewBox="0 0 320 280" fill="none" className="w-full max-w-[320px] opacity-60" aria-hidden="true">
                {/* Central MCU */}
                <rect x="100" y="90" width="120" height="100" rx="6"
                  stroke="#00ffc2" strokeWidth="1.5" fill="rgba(0,255,194,0.04)" />
                <text x="160" y="130" textAnchor="middle" fill="#00ffc2"
                  fontSize="9" fontFamily="monospace" opacity="0.7">MCU</text>
                <text x="160" y="145" textAnchor="middle" fill="#00ffc2"
                  fontSize="7" fontFamily="monospace" opacity="0.5">CORE</text>

                {/* Left pins */}
                {[110, 128, 146, 164, 182].map((y, i) => (
                  <g key={i}>
                    <line x1="100" y1={y} x2="60" y2={y} stroke="#00ffc2" strokeWidth="1" opacity="0.4" />
                    <circle cx="60" cy={y} r="3" fill="#00ffc2" opacity="0.4" />
                  </g>
                ))}

                {/* Right pins */}
                {[110, 128, 146, 164, 182].map((y, i) => (
                  <g key={i}>
                    <line x1="220" y1={y} x2="260" y2={y} stroke="#00ffc2" strokeWidth="1" opacity="0.4" />
                    <circle cx="260" cy={y} r="3" fill="#00ffc2" opacity="0.4" />
                  </g>
                ))}

                {/* Top pins */}
                {[130, 160, 190].map((x, i) => (
                  <g key={i}>
                    <line x1={x} y1="90" x2={x} y2="50" stroke="#00ffc2" strokeWidth="1" opacity="0.4" />
                    <circle cx={x} cy="50" r="3" fill="#00ffc2" opacity="0.4" />
                  </g>
                ))}

                {/* Bottom pins */}
                {[130, 160, 190].map((x, i) => (
                  <g key={i}>
                    <line x1={x} y1="190" x2={x} y2="230" stroke="#00ffc2" strokeWidth="1" opacity="0.4" />
                    <circle cx={x} cy="230" r="3" fill="#00ffc2" opacity="0.4" />
                  </g>
                ))}

                {/* Animated data pulse on right pins */}
                {[110, 146, 182].map((y, i) => (
                  <motion.rect key={i}
                    x={220} y={y - 2} width={0} height={4} rx={2} fill="#00ffc2"
                    animate={{ x: [220, 260], width: [0, 36, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.4 + 0.3, ease: 'easeInOut' }}
                  />
                ))}

                {/* Animated data pulse on left pins (incoming) */}
                {[128, 164].map((y, i) => (
                  <motion.rect key={i}
                    x={60} y={y - 2} width={0} height={4} rx={2} fill="#bd00ff"
                    animate={{ x: [60, 100], width: [0, 36, 0], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.5 + 0.8, ease: 'easeInOut' }}
                  />
                ))}

                {/* Labels */}
                <text x="44" y="108" fill="#00e1ab" fontSize="6" fontFamily="monospace" opacity="0.6" textAnchor="end">UART</text>
                <text x="44" y="126" fill="#00e1ab" fontSize="6" fontFamily="monospace" opacity="0.6" textAnchor="end">SPI</text>
                <text x="44" y="144" fill="#00e1ab" fontSize="6" fontFamily="monospace" opacity="0.6" textAnchor="end">I2C</text>
                <text x="44" y="162" fill="#00e1ab" fontSize="6" fontFamily="monospace" opacity="0.6" textAnchor="end">ADC</text>
                <text x="44" y="180" fill="#00e1ab" fontSize="6" fontFamily="monospace" opacity="0.6" textAnchor="end">GPIO</text>
                <text x="276" y="108" fill="#00ffc2" fontSize="6" fontFamily="monospace" opacity="0.6">PWM</text>
                <text x="276" y="126" fill="#00ffc2" fontSize="6" fontFamily="monospace" opacity="0.6">DAC</text>
                <text x="276" y="144" fill="#00ffc2" fontSize="6" fontFamily="monospace" opacity="0.6">CAN</text>
                <text x="276" y="162" fill="#00ffc2" fontSize="6" fontFamily="monospace" opacity="0.6">USB</text>
                <text x="276" y="180" fill="#00ffc2" fontSize="6" fontFamily="monospace" opacity="0.6">ETH</text>
              </svg>
            </div>
          </Reveal>
        </div>

        {/* ── 02 // IOT_ARCHITECTURE ─────────────────────────────── */}
        <div className="mb-4">
          <Reveal direction="up">
            <div className="flex items-center gap-3 mb-10">
              <motion.span className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#00e1ab' }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
              />
              <span className="label text-[11px]" style={{ color: '#00e1ab' }}>{iot.hwBadge}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {iot.hw.map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 0.1} className="h-full">
                <motion.div
                  className="relative glass-strong rounded-xl p-6 flex flex-col gap-4 overflow-hidden h-full"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  whileHover={{ y: -4, borderColor: 'rgba(0,255,194,0.25)', boxShadow: '0 0 30px rgba(0,255,194,0.08)' }}
                  transition={{ duration: 0.25 }}
                >
                  <CursorSpotlight color="rgba(0,255,194,0.06)" radius={180} />

                  {/* Icon */}
                  <motion.div
                    className="w-9 h-9 rounded-lg flex items-center justify-center relative z-10"
                    style={{ background: 'rgba(0,255,194,0.08)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.2)' }}
                    animate={{ boxShadow: ['0 0 0px rgba(0,255,194,0)', '0 0 12px rgba(0,255,194,0.25)', '0 0 0px rgba(0,255,194,0)'] }}
                    transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {HW_ICONS[i]}
                  </motion.div>

                  <div className="relative z-10">
                    <h3 className="label text-[12px] font-bold text-on-surface mb-2">{item.name}</h3>
                    <p className="text-on-surface-muted text-xs leading-relaxed">{item.body}</p>
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1.5px] rounded-b-xl"
                    style={{ background: 'linear-gradient(90deg, #00ffc2, transparent)' }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '50%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
