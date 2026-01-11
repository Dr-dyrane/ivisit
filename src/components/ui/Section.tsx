import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <section 
        ref={ref}
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
);

Section.displayName = 'Section';