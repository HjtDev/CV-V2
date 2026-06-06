'use client';

import { useLanguage } from '../context/LanguageContext';

function FeatureChip({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg">
      <span className="text-primary text-sm">{icon}</span>
      <span className="label text-on-surface-muted text-[11px]">{label}</span>
    </div>
  );
}

function SectionBadge({ text, color = 'primary' }: { text: string; color?: 'primary' | 'secondary' }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span
        className={`w-1.5 h-1.5 rounded-full ${color === 'primary' ? 'bg-primary' : 'bg-secondary'}`}
      />
      <span className={`label text-[11px] ${color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
        {text}
      </span>
    </div>
  );
}

export default function Foundation() {
  const { t } = useLanguage();
  const f = t.foundations;

  return (
    <div id="foundations" className="relative">
      {/* Section title */}
      <div className="max-w-[1280px] mx-auto px-6 pt-32 pb-16 text-center">
        <p className="label text-on-surface-muted mb-3">{f.heading}</p>
        <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{f.sub}</h2>
      </div>

      {/* Security */}
      <section className="relative overflow-hidden py-24 px-6">
        <div
          className="section-blob w-[400px] h-[400px] opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', top: '0', right: '5%' }}
        />
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionBadge text={f.security.badge} />
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
              {f.security.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed mb-8">
              {f.security.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <FeatureChip icon="🔒" label={f.security.feat1} />
              <FeatureChip icon="✓" label={f.security.feat2} />
            </div>
          </div>
          <div className="glass-strong p-8 rounded-2xl glow-green">
            <div className="flex items-center justify-center mb-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                style={{ background: 'rgba(0,255,194,0.1)' }}
              >
                🛡️
              </div>
            </div>
            <div className="space-y-3">
              {['Encryption Layer', 'Firewall Rules', 'Intrusion Detection', 'Audit Logs'].map((item) => (
                <div key={item} className="flex items-center gap-3 glass px-4 py-2.5 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="label text-on-surface-muted text-[11px]">{item}</span>
                  <span className="ms-auto label text-primary text-[10px]">ACTIVE</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Auth */}
      <section className="relative overflow-hidden py-24 px-6 bg-surface-low/30">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="glass-strong p-8 rounded-2xl order-2 md:order-1">
            <div className="grid grid-cols-3 gap-3">
              {['passkey', 'OAuth', 'SOCIAL', 'MFA', 'JWT', 'RBAC'].map((item) => (
                <div
                  key={item}
                  className="glass rounded-xl p-4 flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">
                    {item === 'passkey' ? '🔑' : item === 'OAuth' ? '🔗' : item === 'SOCIAL' ? '👤' : item === 'MFA' ? '📱' : item === 'JWT' ? '🎫' : '🗂️'}
                  </span>
                  <span className="label text-on-surface-muted text-[10px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SectionBadge text={f.auth.badge} />
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
              {f.auth.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed mb-8">
              {f.auth.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <FeatureChip icon="🔑" label={f.auth.feat1} />
              <FeatureChip icon="🗂️" label={f.auth.feat2} />
            </div>
          </div>
        </div>
      </section>

      {/* Database */}
      <section className="relative overflow-hidden py-24 px-6">
        <div
          className="section-blob w-[350px] h-[350px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', bottom: '0', left: '10%' }}
        />
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionBadge text={f.database.badge} />
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
              {f.database.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed mb-8">
              {f.database.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <FeatureChip icon="⚡" label={f.database.feat1} />
              <FeatureChip icon="🔍" label={f.database.feat2} />
            </div>
          </div>
          <div className="glass-strong p-6 rounded-2xl font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="ms-2 label text-on-surface-muted text-[10px]">DATABASE_STATUS</span>
            </div>
            <div className="space-y-2">
              <p className="text-on-surface-muted text-xs"><span className="text-primary">SELECT</span> * <span className="text-secondary">FROM</span> users</p>
              <p className="text-on-surface-muted text-xs"><span className="text-primary">WHERE</span> status = <span className="text-tertiary">&apos;active&apos;</span></p>
              <p className="text-on-surface-muted text-xs"><span className="text-primary">ORDER BY</span> created_at <span className="text-secondary">DESC</span>;</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="label text-[10px] text-on-surface-muted">DATA_SYNC_STATUS</span>
                  <span className="label text-[10px] text-primary">100%</span>
                </div>
                <div className="mt-2 h-1.5 bg-surface-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative overflow-hidden py-24 px-6 bg-surface-low/30">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="glass-strong p-8 rounded-2xl order-2 md:order-1">
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '💳', label: f.integrations.feat1 },
                { icon: '✉️', label: f.integrations.feat2 },
                { icon: '📊', label: f.integrations.feat3 },
                { icon: '🔔', label: 'Webhooks' },
                { icon: '📦', label: 'Storage' },
                { icon: '🤖', label: 'AI / ML' },
              ].map(({ icon, label }) => (
                <div key={label} className="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary/20 transition-colors cursor-default">
                  <span className="text-2xl">{icon}</span>
                  <span className="label text-on-surface-muted text-[10px] text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SectionBadge text={f.integrations.badge} />
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
              {f.integrations.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">
              {f.integrations.body}
            </p>
          </div>
        </div>
      </section>

      {/* Scale */}
      <section className="relative overflow-hidden py-24 px-6">
        <div
          className="section-blob w-[400px] h-[400px] opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', top: '20%', right: '0' }}
        />
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <SectionBadge text={f.scale.badge} />
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{f.scale.heading}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-strong p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-on-surface mb-4">{f.scale.sub1}</h3>
              <p className="text-on-surface-muted leading-relaxed mb-6">{f.scale.body1}</p>
              <div className="space-y-3">
                {[10, 100, 1000, 10000].map((n) => (
                  <div key={n} className="flex items-center gap-3">
                    <span className="label text-[10px] text-on-surface-muted w-16">{n.toLocaleString()}</span>
                    <div className="flex-1 h-1.5 bg-surface-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all"
                        style={{ width: `${Math.min(100, (Math.log10(n) / 4) * 100)}%` }}
                      />
                    </div>
                    <span className="label text-[10px] text-primary">✓</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-strong p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-on-surface mb-4">{f.scale.sub2}</h3>
              <p className="text-on-surface-muted leading-relaxed mb-6">{f.scale.body2}</p>
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="label text-[11px] text-on-surface-muted">RESPONSE TIME</span>
                  <span className="label text-[11px] text-primary">&lt; 100ms</span>
                </div>
                <div className="h-16 flex items-end gap-1">
                  {[40, 30, 60, 25, 45, 20, 35, 15, 40, 20].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background: `rgba(0,255,194,${0.3 + (i / 10) * 0.4})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
