'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// M and N in primary green, H in muted — creates visual rhythm without noise
const LETTERS = [
  { char: 'M', color: '#00ffc2' },
  { char: 'H', color: '#83958c' },
  { char: 'N', color: '#00ffc2' },
] as const;

// Jakub: opacity + translateY + blur = materializing enter
const letterVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function Preloader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const delay = prefersReduced === true ? 200 : 1700;
    const t = setTimeout(() => {
      document.body.style.overflow = '';
      setVisible(false);
    }, delay);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{ backgroundColor: '#131313' }}
          exit={
            prefersReduced === true
              ? { opacity: 0, transition: { duration: 0.15 } }
              // Curtain lifts: decisive ease-in-out, no bounce (Jakub production default)
              : { y: '-100%', transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          {/* Initials stagger — Jakub's enter recipe */}
          <div className="flex items-baseline gap-1" aria-hidden="true">
            {LETTERS.map(({ char, color }, i) => (
              <motion.span
                key={char}
                className="font-mono text-5xl font-bold tracking-widest"
                style={{ color }}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                transition={
                  prefersReduced === true
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        delay: i * 0.12,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }
                }
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Extending rule — scaleX from left, signals "loading" without a spinner */}
          <motion.div
            aria-hidden="true"
            className="mt-6 h-px"
            style={{
              backgroundColor: '#00ffc2',
              width: 48,
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.4 }}
            transition={
              prefersReduced === true
                ? { duration: 0 }
                : { duration: 0.65, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
