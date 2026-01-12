import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

export function Card({ 
  children, 
  variant = 'default', 
  className, 
  ...props 
}: CardProps) {
  const variants = {
    default: "bg-background/20 backdrop-blur-3xl transition-all duration-500 hover:bg-background/30",
    glass: "moist-glass transition-all duration-500"
  };

  return (
    <div 
      className={cn(
        "rounded-[2.5rem] p-4 md:p-8",
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}