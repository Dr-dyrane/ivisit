import React, { useState, useEffect, useCallback } from 'react';
import { Crown, ArrowRight, Zap, X } from 'lucide-react';

export default function PremiumFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Show after user has engaged, not just time-based
    const timer = setTimeout(() => {
      if (!hasBeenShown) {
        setIsVisible(true);
        setHasBeenShown(true);
      }
    }, 8000); // 8 seconds - balanced timing

    return () => clearTimeout(timer);
  }, [hasBeenShown]);

  const handleUpgrade = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open('/early-access', '_blank');
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 md:bottom-8 md:right-8 pointer-events-auto">
      <div
        className="relative group cursor-pointer max-w-sm mx-auto sm:max-w-none"
        onClick={handleUpgrade}
      >
        {/* Amazing glassmorphism background */}
        <div className="absolute inset-0 bg-black/8 backdrop-blur-lg sm:backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl shadow-black/10" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 via-orange-500/8 to-transparent rounded-2xl sm:rounded-3xl" />

        {/* Content */}
        <div className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Icon with subtle animation */}
            <div className="flex-shrink-0">
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500/15 to-orange-500/8">
                <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 animate-pulse" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-foreground font-black text-xs sm:text-sm mb-0.5 sm:mb-1">
                Premium Access
              </h4>

              <p className="text-muted-foreground text-[10px] sm:text-xs mb-2 sm:mb-3 leading-tight sm:leading-relaxed">
                Get lifetime access for just <span className="font-bold text-foreground">$10</span>
                <span className="hidden sm:inline"><br /></span>
                <span className="inline sm:hidden"> — </span>
                (Save $40 - 80% OFF)
              </p>

              <button
                onClick={handleUpgrade}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-[10px] sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/25 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                Get Access Now
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Amazing hover glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-secondary/80 hover:bg-secondary shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-white/10 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-50 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
