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
        {/* Bar 1: shortest — dark teal */}
        <path d="M4,30 L4,22 Q4,20 6,20 L9,20 Q11,20 11,22 L11,30Z" fill="#0f766e" />
        {/* Bar 2: medium — cyan */}
        <path d="M11,30 L11,13 Q11,11 13,11 L16,11 Q18,11 18,13 L18,30Z" fill="#06b6d4" />
        {/* Bar 3: tallest — amber accent */}
        <path d="M18,30 L18,5 Q18,3 20,3 L23,3 Q25,3 25,5 L25,30Z" fill="#d97706" />
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
