import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section 
      className={cn(
        "relative py-12 sm:py-16 md:py-24",
        "min-h-[calc(100vh-5rem)]",
        "flex items-center",
        className
      )} 
      {...props}
    >
      {children}
    </section>
  );
}