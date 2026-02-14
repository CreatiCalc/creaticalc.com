interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border border-border bg-background p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
