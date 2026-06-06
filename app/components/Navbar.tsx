'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Logo = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ffc2" />
        <stop offset="100%" stopColor="#bd00ff" />
      </linearGradient>
    </defs>
    <path d="M30 20 L70 20 L70 80 L30 80 Z" fill="none" stroke="url(#logo-g)" strokeWidth="4" strokeLinejoin="round" />
    <path d="M20 40 L40 40 L40 60 L20 60 Z" fill="url(#logo-g)" />
    <path d="M60 40 L80 40 L80 60 L60 60 Z" fill="url(#logo-g)" />
    <path d="M40 50 L60 50" stroke="url(#logo-g)" strokeWidth="2" />
  </svg>
);

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: t.nav.foundations, id: 'foundations' },
    { label: t.nav.experience, id: 'experience' },
    { label: t.nav.work, id: 'projects' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group shrink-0"
          aria-label="Go to top"
        >
          <div className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,255,194,0.6)]">
            <Logo />
          </div>
          <span className="label text-on-surface-muted group-hover:text-primary transition-colors">
            M.H.N
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="label text-on-surface-muted hover:text-primary transition-colors relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="glass flex items-center gap-0.5 px-3 py-1.5 rounded-full">
            <button
              onClick={() => setLang('en')}
              className={`label px-2 py-0.5 rounded-full transition-all duration-200 ${
                lang === 'en'
                  ? 'text-primary bg-primary/10'
                  : 'text-on-surface-muted hover:text-on-surface'
              }`}
            >
              EN
            </button>
            <span className="text-outline/60 text-xs">|</span>
            <button
              onClick={() => setLang('fa')}
              className={`label px-2 py-0.5 rounded-full transition-all duration-200 ${
                lang === 'fa'
                  ? 'text-primary bg-primary/10'
                  : 'text-on-surface-muted hover:text-on-surface'
              }`}
            >
              FA
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden glass p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-px bg-on-surface transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
              <span className={`block h-px bg-on-surface transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-on-surface transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/5 mt-3 mx-4 rounded-xl overflow-hidden">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full text-start px-6 py-4 label text-on-surface-muted hover:text-primary hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
