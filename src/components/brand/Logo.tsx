interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md';
}

export default function Logo({ className = '', showWordmark = true, size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 24 : 32;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="32" x2="32" y2="0">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        {/* Three ascending rounded bars — tighter grouping, rounder corners */}
        <rect x="4" y="20" width="6" height="10" rx="3" fill="url(#logo-grad)" />
        <rect x="13" y="12" width="6" height="18" rx="3" fill="url(#logo-grad)" />
        <rect x="22" y="4" width="6" height="26" rx="3" fill="url(#logo-grad)" />
        {/* 4-point sparkle */}
        <path d="M29 0 L30.5 2 L32 3.5 L30.5 5 L29 7 L27.5 5 L26 3.5 L27.5 2Z" fill="#d97706" />
      </svg>
      {showWordmark && (
        <span className={`font-bold leading-none ${size === 'sm' ? 'text-lg' : 'text-xl'}`}>
          <span className="text-gradient-brand">Creati</span>
          <span className="text-foreground">Calc</span>
        </span>
      )}
    </span>
  );
}
