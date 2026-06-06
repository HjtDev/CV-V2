'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32 px-6">
      <div
        className="section-blob w-[500px] h-[500px] opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', bottom: '0', right: '0' }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="label text-primary text-[11px]">{c.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-[1.15]">
              {c.heading}
            </h2>
            <p className="text-on-surface-muted text-lg leading-relaxed mb-10">{c.body}</p>

            <div className="space-y-4">
              <div className="glass p-5 rounded-xl">
                <p className="label text-on-surface-muted text-[10px] mb-1">{c.locationLabel}</p>
                <p className="label text-primary">{c.locationValue}</p>
              </div>
              <div className="glass p-5 rounded-xl">
                <p className="label text-on-surface-muted text-[10px] mb-1">{c.statusLabel}</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="label text-primary">{c.statusValue}</p>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-5 py-3 rounded-xl label text-on-surface-muted text-[11px] hover:text-primary hover:border-primary/30 transition-all duration-300 flex items-center gap-2"
                >
                  <span>🐙</span> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-5 py-3 rounded-xl label text-on-surface-muted text-[11px] hover:text-primary hover:border-primary/30 transition-all duration-300 flex items-center gap-2"
                >
                  <span>💼</span> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-strong p-8 rounded-2xl">
            <p className="label text-on-surface-muted text-[11px] mb-6">{c.formHeading}</p>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl glow-green" style={{ background: 'rgba(0,255,194,0.1)' }}>
                  ✓
                </div>
                <p className="label text-primary">MESSAGE_SENT</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder={c.namePlaceholder}
                    className="w-full glass px-4 py-3.5 rounded-xl text-on-surface placeholder-on-surface-muted outline-none focus:border-primary/40 transition-colors bg-transparent text-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder={c.emailPlaceholder}
                    className="w-full glass px-4 py-3.5 rounded-xl text-on-surface placeholder-on-surface-muted outline-none focus:border-primary/40 transition-colors bg-transparent text-sm"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={5}
                    placeholder={c.messagePlaceholder}
                    className="w-full glass px-4 py-3.5 rounded-xl text-on-surface placeholder-on-surface-muted outline-none focus:border-primary/40 transition-colors bg-transparent text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl label text-sm font-semibold text-surface transition-all duration-300 hover:opacity-90 hover:glow-green"
                  style={{ background: 'linear-gradient(135deg, #00ffc2, #00e1ab)' }}
                >
                  {c.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
