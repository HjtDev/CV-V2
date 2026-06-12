'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import LogoIcon from '../../components/LogoIcon';

export default function CVNav() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.cv.navPortfolio, href: '/' },
    { label: t.cv.navContact,   href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Back to portfolio">
          <LogoIcon className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,255,194,0.6)]" />
          <span className="label text-on-surface-muted group-hover:text-primary transition-colors">M.H.N</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="label text-on-surface-muted hover:text-primary transition-colors relative group">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="glass flex items-center gap-0.5 px-3 py-1.5 rounded-full">
            {(['en', 'fa'] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-0.5">
                {i > 0 && <span className="text-outline/60 text-xs">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`label px-2 py-0.5 rounded-full transition-all duration-200 ${
                    lang === l ? 'text-primary bg-primary/10' : 'text-on-surface-muted hover:text-on-surface'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
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

      {/* Mobile menu — solid bg so it's readable over any content */}
      {mobileOpen && (
        <div className="md:hidden border border-white/8 mt-3 mx-4 rounded-xl overflow-hidden shadow-2xl" style={{ background: '#131313' }}>
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block w-full text-start px-6 py-4 label text-on-surface-muted hover:text-primary hover:bg-white/5 transition-colors ${i < navLinks.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
