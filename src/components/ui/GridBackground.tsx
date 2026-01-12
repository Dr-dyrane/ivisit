import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeContext';

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showMask?: boolean;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ 
  children, 
  className = '', 
  showMask = true 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!showMask) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
      containerRef.current.style.setProperty('--mask-opacity', theme === 'dark' ? '1' : '0.4');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showMask]);

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen bg-background overflow-hidden ${className}`}
    >
      <div 
        className={`fixed inset-0 grid-background pointer-events-none ${showMask ? 'grid-mask opacity-100' : 'opacity-0'} transition-opacity duration-700`}
        style={{ 
          zIndex: 0 
        }}
      />
      {/* <div className="noise-overlay" /> */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
