import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'accent' | 'shimmer';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
  showOverlay?: boolean;
}

export function Button({ 
  variant = 'default', 
  size = 'md', 
  className, 
  children,
  as = 'button',
  href,
  showOverlay = false,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-[0.15em] transition-all duration-500 ease-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden active:scale-95";
  
  const variants = {
    default: "bg-secondary border border-border text-foreground hover:bg-muted",
    outline: "border border-border text-foreground hover:bg-secondary",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
    accent: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(134,16,14,0.3)] border border-border",
    shimmer: "bg-background border border-border text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
  };

  const sizes = {
    sm: "h-10 sm:h-11 px-4 text-sm",
    md: "h-12 sm:h-13 px-6 text-base",
    lg: "h-13 sm:h-14 px-10 text-base sm:text-lg"
  };

  const Component = as === 'a' ? 'a' : 'button';

  return (
    <Component
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        "rounded-2xl",
        className
      )}
      {...(as === 'a' ? { href } : {})}
      {...props}
    >
      {showOverlay && (
        <div className="absolute inset-0 w-0 bg-primary/20 transition-all duration-500 ease-out group-hover:w-full pointer-events-none" />
      )}
      <div className="relative z-10 flex items-center gap-2">
        {children}
      </div>
    </Component>
  );
}