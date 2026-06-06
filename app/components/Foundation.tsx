'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Stagger, staggerItem } from './motion/Reveal';

type FoundationSection = 'security' | 'auth' | 'database' | 'integrations' | 'scale';
interface FoundationProps {
  sections?: FoundationSection[];
  showHeader?: boolean;
  id?: string;
}
const ALL: FoundationSection[] = ['security', 'auth', 'database', 'integrations', 'scale'];

function Chip({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 glass px-3 py-2 rounded-lg"
      whileHover={{ y: -2, borderColor: 'rgba(0,255,194,0.25)' }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-primary text-sm">{icon}</span>
      <span className="label text-on-surface-muted text-[11px]">{label}</span>
    </motion.div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-primary"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="label text-primary text-[11px]">{text}</span>
    </div>
  );
}

function AmbientBlob({ color, style, xRange = [0, 20, 0], yRange = [0, -15, 0], duration = 9 }: {
  color: string; style: React.CSSProperties; xRange?: number[]; yRange?: number[]; duration?: number;
}) {
  return (
    <motion.div
      className="section-blob w-[380px] h-[380px]"
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)`, opacity: 0.07, ...style }}
      animate={{ x: xRange, y: yRange }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function Foundation({ sections = ALL, showHeader = true, id }: FoundationProps) {
  const { t } = useLanguage();
  const f = t.foundations;
  const show = (s: FoundationSection) => sections.includes(s);

  return (
    <div id={id} className="relative">
      {showHeader && (
        <div className="max-w-[1280px] mx-auto px-6 pt-32 pb-16 text-center">
          <Reveal>
            <p className="label text-on-surface-muted mb-3">{f.heading}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{f.sub}</h2>
          </Reveal>
        </div>
      )}

      {/* ── Security ── */}
      {show('security') && (
        <section className="relative overflow-hidden py-24 px-6">
          <AmbientBlob color="#00ffc2" style={{ top: 0, right: '5%' }} />
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <Badge text={f.security.badge} />
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">{f.security.heading}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed mb-8">{f.security.body}</p>
              <div className="flex flex-wrap gap-3">
                <Chip icon="🔒" label={f.security.feat1} />
                <Chip icon="✓" label={f.security.feat2} />
              </div>
            </Reveal>

            <Reveal direction="right">
              <motion.div
                className="glass-strong p-8 rounded-2xl"
                whileHover={{ boxShadow: '0 0 40px rgba(0,255,194,0.12)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                    style={{ background: 'rgba(0,255,194,0.1)' }}
                    animate={{ boxShadow: ['0 0 0px rgba(0,255,194,0.1)', '0 0 24px rgba(0,255,194,0.3)', '0 0 0px rgba(0,255,194,0.1)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🛡️
                  </motion.div>
                </div>
                <Stagger stagger={0.08}>
                  {['Encryption Layer', 'Firewall Rules', 'Intrusion Detection', 'Audit Logs'].map((item) => (
                    <motion.div key={item} variants={staggerItem} className="flex items-center gap-3 glass px-4 py-2.5 rounded-lg mb-2 last:mb-0">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary shrink-0"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 1.5 }}
                      />
                      <span className="label text-on-surface-muted text-[11px]">{item}</span>
                      <span className="ms-auto label text-primary text-[10px]">ACTIVE</span>
                    </motion.div>
                  ))}
                </Stagger>
              </motion.div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Auth ── */}
      {show('auth') && (
        <section className="relative overflow-hidden py-24 px-6 bg-surface-low/30">
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left" className="order-2 md:order-1">
              <motion.div className="glass-strong p-8 rounded-2xl">
                <Stagger stagger={0.07} className="grid grid-cols-3 gap-3">
                  {[
                    { k: 'passkey', e: '🔑' }, { k: 'OAuth', e: '🔗' }, { k: 'SOCIAL', e: '👤' },
                    { k: 'MFA', e: '📱' }, { k: 'JWT', e: '🎫' }, { k: 'RBAC', e: '🗂️' },
                  ].map(({ k, e }) => (
                    <motion.div
                      key={k}
                      variants={staggerItem}
                      whileHover={{ y: -4, scale: 1.06, borderColor: 'rgba(0,255,194,0.2)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="glass rounded-xl p-4 flex flex-col items-center gap-2"
                    >
                      <span className="text-2xl">{e}</span>
                      <span className="label text-on-surface-muted text-[10px]">{k}</span>
                    </motion.div>
                  ))}
                </Stagger>
              </motion.div>
            </Reveal>

            <Reveal direction="right" className="order-1 md:order-2">
              <Badge text={f.auth.badge} />
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">{f.auth.heading}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed mb-8">{f.auth.body}</p>
              <div className="flex flex-wrap gap-3">
                <Chip icon="🔑" label={f.auth.feat1} />
                <Chip icon="🗂️" label={f.auth.feat2} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Database ── */}
      {show('database') && (
        <section className="relative overflow-hidden py-24 px-6">
          <AmbientBlob color="#00ffc2" style={{ bottom: 0, left: '10%' }} xRange={[0, -16, 0]} yRange={[0, 12, 0]} duration={11} />
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <Badge text={f.database.badge} />
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">{f.database.heading}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed mb-8">{f.database.body}</p>
              <div className="flex flex-wrap gap-3">
                <Chip icon="⚡" label={f.database.feat1} />
                <Chip icon="🔍" label={f.database.feat2} />
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="glass-strong p-6 rounded-2xl font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-primary/70" />
                  <span className="ms-2 label text-on-surface-muted text-[10px]">DATABASE_STATUS</span>
                </div>
                <Stagger stagger={0.12} className="space-y-2">
                  {[
                    <><span className="text-primary">SELECT</span> * <span className="text-secondary">FROM</span> users</>,
                    <><span className="text-primary">WHERE</span> status = <span className="text-tertiary">&apos;active&apos;</span></>,
                    <><span className="text-primary">ORDER BY</span> created_at <span className="text-secondary">DESC</span>;</>,
                  ].map((line, i) => (
                    <motion.p key={i} variants={staggerItem} className="text-on-surface-muted text-xs">{line}</motion.p>
                  ))}
                </Stagger>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="label text-[10px] text-on-surface-muted">DATA_SYNC_STATUS</span>
                    <span className="label text-[10px] text-primary">100%</span>
                  </div>
                  <div className="h-1.5 bg-surface-high rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Integrations ── */}
      {show('integrations') && (
        <section className="relative overflow-hidden py-24 px-6 bg-surface-low/30">
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left" className="order-2 md:order-1">
              <motion.div className="glass-strong p-8 rounded-2xl">
                <Stagger stagger={0.06} className="grid grid-cols-3 gap-4">
                  {[
                    { icon: '💳', label: f.integrations.feat1 },
                    { icon: '✉️', label: f.integrations.feat2 },
                    { icon: '📊', label: f.integrations.feat3 },
                    { icon: '🔔', label: f.integrations.feat4 },
                    { icon: '📦', label: f.integrations.feat5 },
                    { icon: '🤖', label: f.integrations.feat6 },
                  ].map(({ icon, label }) => (
                    <motion.div
                      key={icon}
                      variants={staggerItem}
                      whileHover={{ y: -5, scale: 1.08, borderColor: 'rgba(0,255,194,0.25)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="glass rounded-xl p-4 flex flex-col items-center gap-2 cursor-default"
                    >
                      <motion.span
                        className="text-2xl"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                      >{icon}</motion.span>
                      <span className="label text-on-surface-muted text-[10px] text-center">{label}</span>
                    </motion.div>
                  ))}
                </Stagger>
              </motion.div>
            </Reveal>

            <Reveal direction="right" className="order-1 md:order-2">
              <Badge text={f.integrations.badge} />
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">{f.integrations.heading}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed">{f.integrations.body}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Scale ── */}
      {show('scale') && (
        <section className="relative overflow-hidden py-24 px-6">
          <AmbientBlob color="#00ffc2" style={{ top: '20%', right: 0 }} xRange={[0, -18, 0]} yRange={[0, 14, 0]} duration={10} />
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <Reveal>
                <Badge text={f.scale.badge} />
                <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{f.scale.heading}</h2>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Reveal direction="left">
                <div className="glass-strong p-8 rounded-2xl h-full">
                  <h3 className="text-xl font-bold text-on-surface mb-4">{f.scale.sub1}</h3>
                  <p className="text-on-surface-muted leading-relaxed mb-6">{f.scale.body1}</p>
                  <div className="space-y-3">
                    {[10, 100, 1000, 10000].map((n, i) => (
                      <div key={n} className="flex items-center gap-3">
                        <span className="label text-[10px] text-on-surface-muted w-16">{n.toLocaleString()}</span>
                        <div className="flex-1 h-1.5 bg-surface-high rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min(100, (Math.log10(n) / 4) * 100)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: i * 0.12, ease: 'easeOut' }}
                          />
                        </div>
                        <motion.span
                          className="label text-[10px] text-primary"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.12 + 0.7 }}
                        >✓</motion.span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right">
                <div className="glass-strong p-8 rounded-2xl h-full">
                  <h3 className="text-xl font-bold text-on-surface mb-4">{f.scale.sub2}</h3>
                  <p className="text-on-surface-muted leading-relaxed mb-6">{f.scale.body2}</p>
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="label text-[11px] text-on-surface-muted">{f.scale.responseTimeLabel}</span>
                      <motion.span
                        className="label text-[11px] text-primary"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      >&lt; 100ms</motion.span>
                    </div>
                    <div className="h-16 flex items-end gap-1">
                      {[40, 30, 60, 25, 45, 20, 35, 15, 40, 20].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t"
                          style={{ background: `rgba(0,255,194,${0.25 + (i / 10) * 0.45})` }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
