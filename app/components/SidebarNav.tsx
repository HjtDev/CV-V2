'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SECTIONS = [
  { id: 'hero',        labelEn: 'Home',        labelFa: 'خانه' },
  { id: 'foundations', labelEn: 'Foundations',  labelFa: 'زیرساخت' },
  { id: 'experience',  labelEn: 'Experience',   labelFa: 'تجربه' },
  { id: 'projects',    labelEn: 'Work',         labelFa: 'نمونه‌کار' },
  { id: 'contact',     labelEn: 'Contact',      labelFa: 'تماس' },
];

export default function SidebarNav() {
  const { lang, dir } = useLanguage();
  const [visible, setVisible]               = useState(false);
  const [active, setActive]                 = useState('hero');
  const [hovered, setHovered]               = useState<string | null>(null);

  // Show only after scrolling past the hero
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.25 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const isRtl = dir === 'rtl';
  const xOffset = isRtl ? 16 : -16;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="sidebar"
          initial={{ opacity: 0, x: xOffset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: xOffset }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-label="Section navigation"
          className="fixed top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-5"
          style={isRtl ? { right: 28 } : { left: 28 }}
        >
          {/* Track line */}
          <div
            className="absolute inset-y-0 w-px"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, transparent, rgba(58,74,67,0.6) 20%, rgba(58,74,67,0.6) 80%, transparent)',
            }}
          />

          {SECTIONS.map(({ id, labelEn, labelFa }) => {
            const isActive = active === id;
            const label    = lang === 'fa' ? labelFa : labelEn;

            return (
              <div
                key={id}
                className="relative z-10 flex items-center"
                style={{ flexDirection: isRtl ? 'row-reverse' : 'row', gap: 12 }}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Dot */}
                <motion.button
                  onClick={() => scrollTo(id)}
                  aria-label={label}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="relative flex items-center justify-center"
                  style={{ width: 16, height: 16 }}
                >
                  {/* Active ring */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        key="ring"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute rounded-full"
                        style={{
                          width: 16,
                          height: 16,
                          border: '1.5px solid rgba(0,255,194,0.5)',
                          boxShadow: '0 0 8px rgba(0,255,194,0.3)',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.span
                    animate={{
                      width:  isActive ? 8 : 6,
                      height: isActive ? 8 : 6,
                      backgroundColor: isActive ? '#00ffc2' : '#3a4a43',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="block rounded-full"
                    style={isActive ? { boxShadow: '0 0 6px rgba(0,255,194,0.7)' } : {}}
                  />
                </motion.button>

                {/* Tooltip */}
                <AnimatePresence>
                  {hovered === id && (
                    <motion.div
                      initial={{ opacity: 0, x: isRtl ? 6 : -6, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: isRtl ? 6 : -6, scale: 0.95 }}
                      transition={{ duration: 0.14 }}
                      className="absolute glass px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
                      style={isRtl ? { right: 24 } : { left: 24 }}
                    >
                      <span className="label text-on-surface text-[11px]">{label}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
