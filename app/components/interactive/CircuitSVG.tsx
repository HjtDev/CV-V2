'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
  opacity?: number;
}

const STATIC_TRACES = [
  // Top rail segments
  "M 40 50 L 160 50",
  "M 220 50 L 340 50",
  "M 380 50 L 440 50",
  // Vertical drops
  "M 100 50 L 100 130",
  "M 220 50 L 220 110",
  "M 340 50 L 340 130",
  "M 440 50 L 440 130",
  // Mid rail
  "M 40 130 L 100 130",
  "M 100 130 L 220 130",
  "M 220 130 L 340 130",
  "M 340 130 L 440 130",
  // Inner verticals
  "M 160 130 L 160 210",
  "M 280 130 L 280 210",
  // Lower rail
  "M 40 210 L 160 210",
  "M 160 210 L 280 210",
  "M 280 210 L 440 210",
  // Bottom drops
  "M 80 210 L 80 290",
  "M 200 210 L 200 290",
  "M 360 210 L 360 290",
  // Bottom stubs
  "M 40 290 L 80 290",
  "M 80 290 L 200 290",
  "M 200 290 L 280 290",
  "M 280 290 L 360 290",
  "M 360 290 L 440 290",
];

const SPARKS = [
  { d: "M 40 50 L 340 50 L 340 130 L 160 130 L 160 210 L 440 210", delay: 0,   dur: 4.5 },
  { d: "M 440 50 L 100 50 L 100 130 L 280 130 L 280 210 L 80 210 L 80 290 L 360 290", delay: 1.2, dur: 5.5 },
  { d: "M 40 130 L 440 130 L 440 210 L 200 210 L 200 290 L 40 290", delay: 2.4, dur: 5 },
  { d: "M 220 50 L 220 110 L 340 130 L 360 210 L 360 290 L 280 290", delay: 0.7, dur: 4 },
];

const NODES = [
  [40,50],[100,50],[220,50],[340,50],[440,50],
  [40,130],[100,130],[160,130],[220,130],[280,130],[340,130],[440,130],
  [40,210],[160,210],[280,210],[440,210],[80,210],[200,210],[360,210],
  [80,290],[200,290],[280,290],[360,290],[440,290],
];

export default function CircuitSVG({ className = '', opacity = 0.14 }: Props) {
  return (
    <svg
      viewBox="0 0 480 340"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* IC chip outlines */}
      <rect x="160" y="38" width="60" height="24" rx="3" stroke="#00ffc2" strokeWidth="0.8" opacity="0.5" />
      <rect x="100" y="118" width="60" height="24" rx="3" stroke="#00ffc2" strokeWidth="0.8" opacity="0.5" />
      <rect x="280" y="198" width="80" height="24" rx="3" stroke="#00ffc2" strokeWidth="0.8" opacity="0.5" />

      {/* Static trace substrate */}
      {STATIC_TRACES.map((d, i) => (
        <path key={i} d={d} stroke="#00ffc2" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      ))}

      {/* Animated sparks */}
      {SPARKS.map(({ d, delay, dur }, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#00ffc2"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="18 1800"
          animate={{ strokeDashoffset: [200, -1800] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'linear', delay }}
        />
      ))}

      {/* Junction pads */}
      {NODES.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="#00ffc2"
          animate={{ opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: 2 + (i % 4) * 0.4, repeat: Infinity, delay: (i * 0.18) % 2 }}
        />
      ))}

      {/* Glow layer on sparks */}
      {SPARKS.map(({ d, delay, dur }, i) => (
        <motion.path
          key={`glow-${i}`}
          d={d}
          stroke="#00ffc2"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="18 1800"
          opacity={0.12}
          animate={{ strokeDashoffset: [200, -1800] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'linear', delay }}
        />
      ))}
    </svg>
  );
}
