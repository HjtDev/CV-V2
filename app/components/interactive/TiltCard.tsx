'use client';

/**
 * TiltCard — 3D perspective tilt that follows the cursor inside the element.
 * Wraps any content; adds a glare overlay at the cursor's reflection point.
 */

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;   // max degrees
  glareOpacity?: number;
  scaleOnHover?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  glareOpacity = 0.07,
  scaleOnHover = 1.02,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]   = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;   // 0–1
    const ny = (e.clientY - rect.top)  / rect.height;  // 0–1
    setTilt({ rx: (ny - 0.5) * -maxTilt * 2, ry: (nx - 0.5) * maxTilt * 2 });
    setGlare({ x: nx * 100, y: ny * 100 });
  }, [maxTilt]);

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry, scale: hovered ? scaleOnHover : 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.6 }}
      style={{ transformStyle: 'preserve-3d', perspective: 900 }}
      className={`relative ${className}`}
    >
      {children}

      {/* Glare */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 overflow-hidden"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 55%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
