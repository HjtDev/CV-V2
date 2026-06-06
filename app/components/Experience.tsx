'use client';

import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  const exp = t.experience;

  return (
    <div id="experience" className="relative">
      {/* Section header */}
      <div className="max-w-[1280px] mx-auto px-6 pt-32 pb-16 text-center">
        <p className="label text-on-surface-muted mb-3">{exp.heading}</p>
        <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{exp.sub}</h2>
      </div>

      {/* Visuals */}
      <section className="relative overflow-hidden py-24 px-6">
        <div
          className="section-blob w-[400px] h-[400px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #bd00ff, transparent 70%)', top: '0', right: '0' }}
        />
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="label text-secondary text-[11px]">{exp.visuals.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
              {exp.visuals.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">{exp.visuals.body}</p>
          </div>
          <div className="glass-strong p-6 rounded-2xl" style={{ borderColor: 'rgba(189,0,255,0.15)' }}>
            {/* Mock UI */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 glass px-4 py-3 rounded-xl">
                <div className="w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #00ffc2, #bd00ff)' }} />
                <div className="flex-1">
                  <div className="h-2 bg-on-surface/20 rounded mb-1.5 w-24" />
                  <div className="h-1.5 bg-on-surface/10 rounded w-16" />
                </div>
                <div className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs">✓</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-4 aspect-square flex items-center justify-center" style={{ background: 'rgba(189,0,255,0.05)' }}>
                  <div className="w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(189,0,255,0.4), transparent)' }} />
                </div>
                <div className="glass rounded-xl p-4 aspect-square flex items-center justify-center" style={{ background: 'rgba(0,255,194,0.05)' }}>
                  <div className="w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,255,194,0.4), transparent)' }} />
                </div>
              </div>
              <div className="glass px-4 py-3 rounded-xl">
                <div className="flex justify-between mb-2">
                  <div className="h-2 bg-on-surface/20 rounded w-20" />
                  <div className="h-2 bg-secondary/40 rounded w-10" />
                </div>
                <div className="h-1.5 bg-surface-high rounded-full overflow-hidden">
                  <div className="h-full w-3/4 rounded-full" style={{ background: 'linear-gradient(90deg, #00ffc2, #bd00ff)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom */}
      <section className="relative overflow-hidden py-24 px-6 bg-surface-low/30">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="glass-strong p-8 rounded-2xl order-2 md:order-1 grid grid-cols-2 gap-4">
            {[
              { icon: '✂️', label: exp.custom.feat1 },
              { icon: '🔧', label: exp.custom.feat2 },
              { icon: '📐', label: 'Pixel Perfect' },
              { icon: '🎯', label: 'Goal-Driven' },
            ].map(({ icon, label }) => (
              <div key={label} className="glass p-5 rounded-xl flex flex-col items-center gap-3 text-center">
                <span className="text-2xl">{icon}</span>
                <span className="label text-on-surface-muted text-[11px]">{label}</span>
              </div>
            ))}
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="label text-secondary text-[11px]">{exp.custom.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
              {exp.custom.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">{exp.custom.body}</p>
          </div>
        </div>
      </section>

      {/* Delight */}
      <section className="relative overflow-hidden py-24 px-6">
        <div
          className="section-blob w-[350px] h-[350px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #ff7a00, transparent 70%)', bottom: '0', left: '5%' }}
        />
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              <span className="label text-tertiary text-[11px]">{exp.delight.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
              {exp.delight.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">{exp.delight.body}</p>
          </div>
          <div className="glass-strong p-8 rounded-2xl space-y-4" style={{ borderColor: 'rgba(255,122,0,0.1)' }}>
            {[
              { label: 'Hover States', delay: '0ms', color: '#00ffc2' },
              { label: 'Page Transitions', delay: '100ms', color: '#bd00ff' },
              { label: 'Loading Indicators', delay: '200ms', color: '#ff7a00' },
              { label: 'Micro-Interactions', delay: '300ms', color: '#00ffc2' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-4">
                <div
                  className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                  style={{ background: color }}
                />
                <div className="flex-1 glass px-4 py-2.5 rounded-lg">
                  <span className="label text-on-surface-muted text-[11px]">{label}</span>
                </div>
                <span className="label text-[10px] text-on-surface-muted">✓</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
