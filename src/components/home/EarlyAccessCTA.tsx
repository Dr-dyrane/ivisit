import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useTheme } from '@/providers/ThemeContext';

export default function EarlyAccessCTA() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  return (
    <Section id="early-access-cta" ref={sectionRef} className="relative py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-background group overflow-hidden">
      {/* Smarty Blur Background */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(var(--grid-color), 0.05)'}, transparent 80%)`,
        }}
      />

      {/* Background Orbs */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <Container className="relative z-10">
        <animated.div style={fadeIn} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Limited Early Access Available
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.05em] text-foreground mb-6 leading-[0.85]">
            Be First to Shape the<span className="text-primary"> Future</span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join our early access community and get exclusive benefits, priority support, and a lifetime supporter badge. Shape the future of emergency medical dispatch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/early-access')}
              showOverlay={true}
              className="px-8 rounded-2xl h-14 shadow-lg shadow-primary/20"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-black tracking-[0.1em]">CLAIM EARLY ACCESS</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
            <p className="text-sm text-muted-foreground">
              ✓ Free & Paid options available
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-primary mb-2">∞</div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Lifetime Access</p>
            </div>
            <div>
              <div className="text-3xl font-black text-accent mb-2">⚡</div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Priority Support</p>
            </div>
            <div>
              <div className="text-3xl font-black text-foreground mb-2">🏆</div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Supporter Badge</p>
            </div>
          </div>
        </animated.div>
      </Container>
    </Section>
  );
}
