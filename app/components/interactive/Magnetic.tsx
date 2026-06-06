'use client';

/**
 * Magnetic — element gently leans toward the cursor while hovering.
 * Great for CTA buttons and nav links.
 */

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  strength?: number;   // 0–1; how much it moves
  className?: string;
}

export default function Magnetic({ children, strength = 0.35, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - (rect.left + rect.width  / 2)) * strength,
      y: (e.clientY - (rect.top  + rect.height / 2)) * strength,
    });
  }, [strength]);

  const handleLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 22, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
