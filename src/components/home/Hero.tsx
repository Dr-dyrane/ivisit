import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ambulance, Phone, Clock, Bed } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useTheme } from '@/providers/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const features = [
  {
    icon: <Phone className="h-5 w-5" />,
    text: "24/7 Response"
  },
  {
    icon: <Clock className="h-5 w-5" />,
    text: "5 min ETA"
  },
  {
    icon: <Bed className="h-5 w-5" />,
    text: "Instant Booking"
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [liveStats, setLiveStats] = useState({ eta: 4.8, units: 34, uptime: '99.9%' });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        eta: +(4.5 + Math.random() * 0.5).toFixed(1),
        units: Math.floor(30 + Math.random() * 10)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const { theme } = useTheme();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const images = {
    dark: 'https://images.pexels.com/photos/8942726/pexels-photo-8942726.jpeg',
    light: 'https://images.pexels.com/photos/6754179/pexels-photo-6754179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };

  const gradients = {
    dark: 'bg-gradient-to-t from-black/80 via-black/20 to-transparent',
    light: 'bg-gradient-to-t from-white/80 via-white/50 to-transparent',
  };

  const handleEmergency = () => {
    if (isAuthenticated) {
      navigate('/emergency');
    } else {
      navigate('/login', { state: { from: '/emergency' } });
    }
  };

  const handleBookBed = () => {
    navigate('/early-access');
  };
  return (
    <Section id="home" ref={sectionRef} className="relative min-h-[calc(100vh-5rem)] flex items-center bg-transparent overflow-hidden group">
      {/* Smarty Blur Background */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(var(--grid-color), 0.05)'}, transparent 80%)`,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          maskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black, transparent 80%)`,
        }}
      >
        <div className={`absolute inset-0 backdrop-blur-[3px] ${theme === 'dark' ? 'bg-white/[0.01]' : 'bg-primary/[0.02]'} `} />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Innovative Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <Container className="relative z-10">
        {/* System Heartbeat Ticker */}
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 sm:gap-6 border-b border-border/50 pb-6 sm:pb-8">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Active
            </div>
            <div className="flex gap-4 sm:gap-8">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider opacity-60">ETA</span>
                <span className="text-sm sm:text-base font-bold text-foreground tabular-nums">{liveStats.eta}m</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider opacity-60">Units</span>
                <span className="text-sm sm:text-base font-bold text-foreground tabular-nums">{liveStats.units}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider opacity-60">Satellite</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider opacity-60">Ready</span>
            </div>
            <div className="px-3 py-1 rounded border border-border/50 bg-secondary/50">
              <span className="text-xs font-bold text-foreground tabular-nums">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} UTC</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <animated.div style={fadeIn} className="text-left sm:text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] text-foreground mb-8 leading-[0.85]">
              iVisit<span className="text-primary">.</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-xl sm:mx-auto lg:mx-0 leading-relaxed font-normal">
              Ultra-rapid medical dispatch systems. Command-grade intervention within <span className="text-primary font-bold">5 minutes</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center sm:flex-nowrap w-full">
              <div className="relative group w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handleEmergency}
                  showOverlay={true}
                  className="px-4 sm:px-8 rounded-xl sm:rounded-2xl w-full sm:w-auto min-w-[160px] sm:min-w-[220px]"
                >
                  <div className="relative flex items-center gap-2 sm:gap-3">
                    <Ambulance className="w-5 sm:w-6 h-5 sm:h-6 animate-pulse flex-shrink-0" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="sm:hidden font-semibold tracking-[0.02em] text-xs">Call</span>
                      <span className="hidden sm:inline font-bold tracking-[0.05em] text-base">Call Ambulance</span>
                      <span className="hidden sm:inline text-xs font-semibold opacity-70 tracking-wider">No signup</span>
                    </div>
                  </div>
                </Button>
                <div className="absolute top-full mt-1.5 sm:mt-3 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 sm:top-auto sm:-bottom-5 whitespace-nowrap hidden sm:block">
                  <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                    Live demo
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={handleBookBed}
                showOverlay={true}
                className="group px-4 sm:px-8 rounded-xl sm:rounded-2xl border-border w-full sm:w-auto min-w-[140px] sm:min-w-[200px]"
              >
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <Bed className="w-5 sm:w-6 h-5 sm:h-6 flex-shrink-0" />
                  <span className="sm:hidden font-semibold tracking-[0.02em] text-xs">Reserve</span>
                  <span className="hidden sm:inline font-bold tracking-[0.05em] text-base">Reserve Bed</span>
                </div>
              </Button>
            </div>
          </animated.div>

          <animated.div style={fadeIn} className="relative hidden lg:block">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden moist-glass p-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
              <img
                src={images[theme]}
                alt="Emergency Response Team"
                className="w-full h-full object-cover rounded-[2rem] grayscale-[0.5] hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
            </div>
            {/* Minimalist HUD Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-primary/40 rounded-tr-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-primary/40 rounded-bl-3xl pointer-events-none" />
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-primary/60 pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-primary/60 pointer-events-none" />
          </animated.div>
        </div>

        {/* Features Strip */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-border/50 pt-8 sm:pt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm group hover:border-primary/30 transition-all"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                {feature.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-foreground">
                  {feature.text}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider opacity-60">
                  Available
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}