'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ACCENTS = ['primary', 'outline', 'primary', 'primary', 'outline'] as const;

interface NodeProps {
  item: { period: string; degree: string; school: string; detail: string };
  i: number;
  isPrimary: boolean;
  isRight: boolean;
  isFa: boolean;
  prefersReduced: boolean | null;
  sectionInView: boolean;
  activated: boolean;
  onVisible: (index: number) => void;
}

function TimelineNode({ item, i, isPrimary, isRight, isFa, prefersReduced, sectionInView, activated, onVisible }: NodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  /*
   * Track when this node enters the scroll-spotlight zone.
   * once:false so re-entry is detected (needed for the up-direction case).
   */
  const inZone = useInView(nodeRef, { once: false, margin: '-35% 0px -35% 0px' });
  const prevInZone = useRef(false);

  useEffect(() => {
    if (inZone && !prevInZone.current) {
      onVisible(i);
    }
    prevInZone.current = inZone;
  }, [inZone, i, onVisible]);

  const isGlowing = activated && !prefersReduced;

  const dotClass = isGlowing
    ? 'border-primary bg-surface shadow-[0_0_16px_rgba(0,255,194,0.7)]'
    : isPrimary
      ? 'border-primary/30 bg-surface'
      : 'border-white/20 bg-surface';

  const cardBorderClass = isGlowing ? 'border-primary/40' : 'border-white/8';
  const periodClass     = isGlowing ? 'text-primary' : 'text-outline';
  const schoolClass     = isGlowing ? 'text-primary/70' : 'text-outline/60';

  const dot = (
    <motion.div
      className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-all duration-300 ${dotClass}`}
      initial={prefersReduced ? false : { scale: 0 }}
      animate={sectionInView ? { scale: isGlowing ? 1.22 : 1 } : {}}
      transition={{ type: 'spring', duration: 0.4, bounce: 0.3, delay: 0.2 + i * 0.18 }}
    />
  );

  const card = (
    <div className={`glass border rounded-2xl p-6 w-full transition-all duration-300 ${cardBorderClass}`}>
      <span className={`label block mb-2 transition-colors duration-300 ${periodClass}`}>
        {item.period}
      </span>
      <h3 className="font-bold text-on-surface text-base mb-1">{item.degree}</h3>
      <p className={`label mb-3 transition-colors duration-300 ${schoolClass}`}>{item.school}</p>
      <p className="text-on-surface-variant text-sm leading-relaxed">{item.detail}</p>
    </div>
  );

  return (
    <motion.div
      ref={nodeRef}
      initial={prefersReduced ? false : {
        opacity: 0,
        x: isRight ? -16 : 16,
        filter: 'blur(4px)',
      }}
      animate={sectionInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{
        type: 'spring', duration: 0.6, bounce: 0,
        delay: prefersReduced ? 0 : 0.15 + i * 0.18,
      }}
    >
      {/* Mobile: FA → dot left, EN → dot right (flex-row-reverse) */}
      <div className={`flex items-start gap-3 md:hidden${!isFa ? ' flex-row-reverse' : ''}`}>
        <div className="shrink-0 w-[14px] flex justify-center pt-[3px] relative z-10">
          {dot}
        </div>
        <div className="flex-1 min-w-0">
          {card}
        </div>
      </div>

      {/* Desktop: alternating left / right with dot at exact center */}
      <div className="hidden md:flex items-center">
        <div className="flex-1 flex items-center justify-end pe-8">
          {isRight
            ? <span className={`label transition-colors duration-300 ${periodClass}`}>{item.period}</span>
            : card
          }
        </div>
        <div className="relative z-10 shrink-0 mx-1">{dot}</div>
        <div className="flex-1 flex items-center ps-8">
          {isRight
            ? card
            : <span className={`label transition-colors duration-300 ${periodClass}`}>{item.period}</span>
          }
        </div>
      </div>
    </motion.div>
  );
}

export default function CVEducation() {
  const { t, lang } = useLanguage();
  const isFa = lang === 'fa';
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const cv = t.cv.education;

  // Permanent activation state — once a node is activated, it never un-glows
  const [activated, setActivated] = useState<boolean[]>(() => cv.items.map(() => false));

  // Track scroll direction without triggering re-renders
  const scrollDirRef = useRef<'down' | 'up'>('down');

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      scrollDirRef.current = window.scrollY >= lastY ? 'down' : 'up';
      lastY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /*
   * Called by each TimelineNode when it enters the active viewport band.
   * Scrolling DOWN → activate only that node.
   * Scrolling UP   → activate ALL nodes at once.
   */
  const handleNodeVisible = useCallback((index: number) => {
    setActivated(prev => {
      if (scrollDirRef.current === 'up') {
        if (prev.every(v => v)) return prev; // already all lit — skip re-render
        return prev.map(() => true);
      }
      if (prev[index]) return prev; // already activated — skip re-render
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  return (
    <section id="education" ref={ref} className="relative py-28 px-6 max-w-[1280px] mx-auto overflow-hidden">

      {/* Animated ambient blob */}
      <motion.div
        aria-hidden="true"
        className="section-blob w-[380px] h-[380px] opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #00ffc2, transparent 70%)', top: '10%', right: '-6%' }}
        animate={prefersReduced ? {} : { x: [0, -12, 0], y: [0, 10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Section header */}
      <motion.div
        className="mb-16"
        initial={prefersReduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ type: 'spring', duration: 0.55, bounce: 0 }}
      >
        <p className="label text-primary mb-3">{cv.badge}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-on-surface">{cv.heading}</h2>
      </motion.div>

      {/*
        dir="ltr" prevents RTL page direction from flipping left/right positions.
        The timeline is a visual design element — centered in both languages.
      */}
      <div className="relative max-w-2xl mx-auto" dir="ltr">

        {/* Vertical line — mobile FA: left rail */}
        {isFa && (
          <motion.div
            aria-hidden="true"
            className="md:hidden absolute left-[7px] -translate-x-1/2 top-0 w-px origin-top"
            style={{ background: 'linear-gradient(180deg, rgba(0,255,194,0.5) 0%, rgba(0,255,194,0.06) 100%)', height: '100%' }}
            initial={prefersReduced ? false : { scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
        )}
        {/* Vertical line — mobile EN: right rail */}
        {!isFa && (
          <motion.div
            aria-hidden="true"
            className="md:hidden absolute right-[7px] translate-x-1/2 top-0 w-px origin-top"
            style={{ background: 'linear-gradient(180deg, rgba(0,255,194,0.5) 0%, rgba(0,255,194,0.06) 100%)', height: '100%' }}
            initial={prefersReduced ? false : { scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
        )}
        {/* Vertical line — desktop: always centered */}
        <motion.div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px origin-top"
          style={{ background: 'linear-gradient(180deg, rgba(0,255,194,0.5) 0%, rgba(0,255,194,0.06) 100%)', height: '100%' }}
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        />

        <div className="space-y-14">
          {cv.items.map((item, i) => (
            <TimelineNode
              key={i}
              item={item}
              i={i}
              isPrimary={ACCENTS[i] === 'primary'}
              isRight={i % 2 === 0}
              isFa={isFa}
              prefersReduced={prefersReduced}
              sectionInView={inView}
              activated={activated[i] ?? false}
              onVisible={handleNodeVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
