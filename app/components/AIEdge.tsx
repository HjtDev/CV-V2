'use client';

import { useLanguage } from '../context/LanguageContext';

export default function AIEdge() {
  const { t } = useLanguage();
  const ai = t.aiEdge;

  const features = [
    { icon: '⚙️', label: ai.feat1 },
    { icon: '⚡', label: ai.feat2 },
    { icon: '🧠', label: ai.feat3 },
  ];

  return (
    <section className="relative overflow-hidden py-32 px-6">
      {/* Background */}
      <div
        className="section-blob w-[600px] h-[600px] opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #bd00ff, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="max-w-[720px] mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="label text-secondary text-[11px]">{ai.badge}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-on-surface mb-6 leading-[1.15]">
            {ai.heading}
          </h2>
          <p className="text-on-surface-muted text-lg leading-relaxed">{ai.body}</p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon, label }, i) => (
            <div
              key={i}
              className="glass-strong p-8 rounded-2xl text-center hover:border-secondary/20 transition-all duration-300 group"
              style={{ borderColor: 'rgba(189,0,255,0.1)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: 'rgba(189,0,255,0.1)' }}
              >
                {icon}
              </div>
              <p className="label text-on-surface-muted text-[11px] leading-relaxed group-hover:text-on-surface transition-colors">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Neural network visual */}
        <div className="mt-16 glass rounded-2xl p-8 overflow-hidden relative">
          <div className="label text-on-surface-muted text-[10px] mb-6">NEURAL_PROCESS_VISUALIZATION</div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {['INPUT', 'ANALYSIS', 'OPTIMIZATION', 'OUTPUT'].map((node, i) => (
              <div key={node} className="flex items-center gap-4">
                <div
                  className="glass px-4 py-2 rounded-lg"
                  style={{ borderColor: i === 3 ? 'rgba(189,0,255,0.3)' : 'rgba(255,255,255,0.07)' }}
                >
                  <span className="label text-[10px] text-on-surface-muted">{node}</span>
                </div>
                {i < 3 && (
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-px bg-gradient-to-r from-secondary/40 to-secondary/20" />
                    <span className="text-secondary/40 text-xs">▶</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
