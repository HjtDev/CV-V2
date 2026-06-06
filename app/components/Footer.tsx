'use client';

import { useLanguage } from '../context/LanguageContext';

const Logo = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="footer-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ffc2" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#bd00ff" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    <path d="M30 20 L70 20 L70 80 L30 80 Z" fill="none" stroke="url(#footer-g)" strokeWidth="4" strokeLinejoin="round" />
    <path d="M20 40 L40 40 L40 60 L20 60 Z" fill="url(#footer-g)" />
    <path d="M60 40 L80 40 L80 60 L60 60 Z" fill="url(#footer-g)" />
    <path d="M40 50 L60 50" stroke="url(#footer-g)" strokeWidth="2" />
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6">
            <Logo />
          </div>
          <span className="label text-on-surface-muted text-[11px]">{f.copy}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="label text-on-surface-muted text-[11px] hover:text-primary transition-colors"
          >
            {f.github}
          </a>
          <span className="text-outline/40">·</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="label text-on-surface-muted text-[11px] hover:text-primary transition-colors"
          >
            {f.linkedin}
          </a>
        </div>
      </div>
    </footer>
  );
}
