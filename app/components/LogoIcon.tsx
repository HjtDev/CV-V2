export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffc2" />
          <stop offset="100%" stopColor="#bd00ff" />
        </linearGradient>
      </defs>
      <path d="M30 20 L70 20 L70 80 L30 80 Z" fill="none" stroke="url(#logo-gradient)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M20 40 L40 40 L40 60 L20 60 Z" fill="url(#logo-gradient)" />
      <path d="M60 40 L80 40 L80 60 L60 60 Z" fill="url(#logo-gradient)" />
      <path d="M40 50 L60 50" stroke="url(#logo-gradient)" strokeWidth="2" />
    </svg>
  );
}
