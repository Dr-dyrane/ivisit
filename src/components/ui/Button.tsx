import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

export function Button({ 
  variant = 'default', 
  size = 'md', 
  className, 
  children,
  as = 'button',
  href,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden";
  
  const variants = {
    default: "bg-primary-900 text-white hover:bg-primary-800",
    outline: "border-2 border-primary-700 text-white hover:bg-primary-800/50",
    ghost: "text-primary-200 hover:text-white hover:bg-primary-800/50",
    accent: "bg-accent-600 text-white hover:bg-accent-500"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg"
  };

  const Component = as === 'a' ? 'a' : 'button';

  return (
    <Component
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        "rounded-full",
        className
      )}
      {...(as === 'a' ? { href } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}