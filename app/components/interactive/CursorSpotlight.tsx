'use client';

/**
 * CursorSpotlight — a soft radial gradient that follows the cursor
 * within its parent container. Place as a child with absolute positioning.
 */

import { useRef, useEffect, useState } from 'react';

interface Props {
  color?: string;
  radius?: number;
}

export default function CursorSpotlight({
  color  = 'rgba(0,255,194,0.06)',
  radius = 320,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const parent = ref.current?.parentElement as HTMLElement | null;
    if (!parent) return;

    // Ensure parent has position context
    const prevPosition = parent.style.position;
    if (!prevPosition || prevPosition === 'static') {
      parent.style.position = 'relative';
    }

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const onLeave = () => setPos({ x: -9999, y: -9999 });

    parent.addEventListener('mousemove', onMove, { passive: true });
    parent.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
      style={{
        background: `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, ${color}, transparent)`,
        zIndex: 0,
      }}
    />
  );
}
