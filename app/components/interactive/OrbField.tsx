'use client';

/**
 * OrbField — circular blobs that physically repel from the mouse cursor.
 * Uses rAF + direct DOM mutation to stay off React's render cycle (60fps).
 * Gracefully degrades to a slow ambient float on touch devices.
 */

import { useRef, useEffect } from 'react';

export interface OrbConfig {
  /** 0–1 relative to container width */
  x: number;
  /** 0–1 relative to container height */
  y: number;
  size: number;
  color: string;
  blur: number;
  /** Pixel radius around the orb center that triggers repulsion */
  repelRadius: number;
  /** How far (px) the orb can be pushed from home at max force */
  repelStrength: number;
  /** 0–1: how quickly the orb returns home (lerp factor per frame) */
  returnSpeed: number;
}

export const ORBS_HERO: OrbConfig[] = [
  { x: 0.18, y: 0.35, size: 260, color: 'rgba(0,255,194,0.13)', blur: 50, repelRadius: 220, repelStrength: 160, returnSpeed: 0.055 },
  { x: 0.75, y: 0.60, size: 200, color: 'rgba(189,0,255,0.10)', blur: 45, repelRadius: 190, repelStrength: 130, returnSpeed: 0.045 },
  { x: 0.50, y: 0.82, size: 170, color: 'rgba(0,255,194,0.08)', blur: 38, repelRadius: 170, repelStrength: 100, returnSpeed: 0.065 },
  { x: 0.85, y: 0.18, size: 150, color: 'rgba(255,122,0,0.07)', blur: 32, repelRadius: 155, repelStrength: 90, returnSpeed: 0.04 },
  { x: 0.30, y: 0.70, size: 130, color: 'rgba(189,0,255,0.08)', blur: 28, repelRadius: 140, repelStrength: 80, returnSpeed: 0.06 },
];

export const ORBS_AI: OrbConfig[] = [
  { x: 0.20, y: 0.40, size: 180, color: 'rgba(189,0,255,0.12)', blur: 40, repelRadius: 180, repelStrength: 120, returnSpeed: 0.05 },
  { x: 0.72, y: 0.55, size: 150, color: 'rgba(0,255,194,0.08)', blur: 35, repelRadius: 160, repelStrength: 100, returnSpeed: 0.06 },
  { x: 0.50, y: 0.20, size: 120, color: 'rgba(189,0,255,0.09)', blur: 28, repelRadius: 140, repelStrength: 80, returnSpeed: 0.04 },
];

interface Props {
  orbs?: OrbConfig[];
  className?: string;
}

export default function OrbField({ orbs = ORBS_HERO, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const divRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const mouse       = useRef({ x: -2000, y: -2000 });
  const isTouch     = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // current position offsets relative to home (in px)
    const state = orbs.map(() => ({ ox: 0, oy: 0 }));
    let rafId = 0;

    const tick = () => {
      const rect = container.getBoundingClientRect();

      orbs.forEach((orb, i) => {
        const el = divRefs.current[i];
        if (!el) return;

        const homeX = orb.x * rect.width;
        const homeY = orb.y * rect.height;

        let targetOx = 0;
        let targetOy = 0;

        if (!isTouch.current) {
          // mouse position relative to container
          const mx = mouse.current.x - rect.left;
          const my = mouse.current.y - rect.top;

          const dx = mx - homeX;
          const dy = my - homeY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          if (dist < orb.repelRadius) {
            // quadratic falloff — strong near cursor, zero at boundary
            const t = (orb.repelRadius - dist) / orb.repelRadius;
            const force = t * t;
            targetOx = -(dx / dist) * force * orb.repelStrength;
            targetOy = -(dy / dist) * force * orb.repelStrength;
          }
        }

        // lerp toward target
        state[i].ox += (targetOx - state[i].ox) * orb.returnSpeed;
        state[i].oy += (targetOy - state[i].oy) * orb.returnSpeed;

        el.style.transform = `translate(${state[i].ox.toFixed(2)}px, ${state[i].oy.toFixed(2)}px)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    const onMove  = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onTouch = () => { isTouch.current = true; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchstart', onTouch, { once: true, passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          ref={el => { divRefs.current[i] = el; }}
          className="absolute rounded-full will-change-transform"
          style={{
            left:   `calc(${orb.x * 100}% - ${orb.size / 2}px)`,
            top:    `calc(${orb.y * 100}% - ${orb.size / 2}px)`,
            width:  orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
          }}
        />
      ))}
    </div>
  );
}
