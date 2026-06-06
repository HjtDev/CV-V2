'use client';

import { useLanguage } from '../context/LanguageContext';

const SKILL_ICONS: Record<string, string> = {
  'HTML': '🌐',
  'CSS': '🎨',
  'Tailwind': '💨',
  'Docker': '🐳',
  'Compose': '🧩',
  'Django': '🐍',
  'Next.js': '▲',
  'Git': '📌',
  'GitHub': '🐙',
  'CI/CD': '🔄',
};

export default function Toolkit() {
  const { t } = useLanguage();
  const tk = t.toolkit;

  return (
    <section className="relative overflow-hidden py-32 px-6 bg-surface-low/20">
      <div
        className="section-blob w-[500px] h-[500px] opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', top: '50%', right: '-10%', transform: 'translateY(-50%)' }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="label text-primary text-[11px]">{tk.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface">{tk.heading}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {tk.skills.map((skill) => (
            <div
              key={skill}
              className="glass p-5 rounded-xl flex flex-col items-center gap-3 group hover:border-primary/30 hover:glow-green transition-all duration-300 cursor-default"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {SKILL_ICONS[skill] ?? '⚙️'}
              </span>
              <span className="label text-on-surface-muted text-[11px] group-hover:text-primary transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
