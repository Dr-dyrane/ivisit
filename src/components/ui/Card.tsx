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
    default: "bg-primary-900 border border-primary-800",
    glass: "bg-primary-900/50 backdrop-blur-sm border border-primary-800"
  };

  return (
    <div 
      className={cn(
        "rounded-xl p-6",
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}