'use client';

import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background blobs */}
      <div
        className="section-blob w-[600px] h-[600px] opacity-10"
        style={{
          background: 'radial-gradient(circle, #00ffc2, transparent 70%)',
          top: '10%',
          left: '-10%',
        }}
      />
      <div
        className="section-blob w-[500px] h-[500px] opacity-10"
        style={{
          background: 'radial-gradient(circle, #bd00ff, transparent 70%)',
          bottom: '10%',
          right: '-5%',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="label text-primary">{t.hero.badge}</span>
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-8"
          style={{ letterSpacing: '-0.02em' }}
        >
          {t.hero.heading}
        </h1>

        {/* Subtitle */}
        <p className="text-on-surface-muted text-lg md:text-xl mb-12 max-w-[600px] mx-auto leading-relaxed">
          Mohammad Hojjat Nikoobakht — Full Stack Developer
        </p>

        {/* CTA */}
        <button
          onClick={() => scrollTo('foundations')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg border border-primary/50 text-primary label hover:bg-primary/10 transition-all duration-300 glow-green"
        >
          {t.hero.cta}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="label text-on-surface-muted text-[10px]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>
  );
}
