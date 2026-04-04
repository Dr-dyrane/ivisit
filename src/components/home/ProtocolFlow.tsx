import { useEffect, useRef, useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { InteractiveFlow } from './transparency/InteractiveFlow';
import { Ambulance, BedDouble, Building2, CheckCircle2, MapPinned, PhoneCall, Route } from 'lucide-react';

export default function ProtocolFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<'emergency' | 'bed' | 'facility'>('emergency');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [autoStartKey, setAutoStartKey] = useState(0);

  const flowHighlights = [
    {
      icon: <PhoneCall className="w-5 h-5 text-primary" />,
      label: 'Request',
      description: 'Start help fast.'
    },
    {
      icon: <MapPinned className="w-5 h-5 text-primary" />,
      label: 'Share',
      description: 'Send your location.'
    },
    {
      icon: <Route className="w-5 h-5 text-primary" />,
      label: 'Track',
      description: 'Follow the response.'
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
      label: 'Coordinate',
      description: 'Prepare the next step.'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || hasInteracted) return;
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasInteracted) return;
        setAutoStartKey(1);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [hasInteracted]);

  const handleModeChange = (nextMode: 'emergency' | 'bed' | 'facility') => {
    setHasInteracted(true);
    setMode(nextMode);
  };

  return (
    <Section id="how-it-works" ref={sectionRef} className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-transparent via-secondary/10 to-transparent py-12 sm:py-24 xl:min-h-screen">
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20 pointer-events-none transition-colors duration-1000 ${mode === 'bed' ? 'via-blue-500/5' : mode === 'facility' ? 'via-emerald-500/5' : ''}`} />

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <div className="mb-6 inline-flex items-center rounded-full bg-background/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            Live app preview
          </div>
          <div className="relative z-20 mx-auto mb-8 grid max-w-3xl grid-cols-1 items-center gap-2 rounded-2xl bg-muted/[0.65] p-2 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-md dark:bg-muted/30 dark:shadow-[0_24px_60px_rgba(0,0,0,0.24)] md:rounded-full sm:grid-cols-3">
            <button
              onClick={() => handleModeChange('emergency')}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-[20px] md:rounded-full text-sm font-bold transition-all duration-300 relative group ${mode === 'emergency'
                ? 'scale-100 bg-background text-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
            >
              <Ambulance className={`w-4 h-4 ${mode === 'emergency' ? 'text-destructive' : 'group-hover:text-destructive transition-colors'}`} />
              Emergency help
            </button>
            <button
              onClick={() => handleModeChange('bed')}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-[20px] md:rounded-full text-sm font-bold transition-all duration-300 relative group ${mode === 'bed'
                ? 'scale-100 bg-background text-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
            >
              <BedDouble className={`w-4 h-4 ${mode === 'bed' ? 'text-blue-500' : 'group-hover:text-blue-500 transition-colors'}`} />
              Bed booking
            </button>
            <button
              onClick={() => handleModeChange('facility')}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-[20px] md:rounded-full text-sm font-bold transition-all duration-300 relative group ${mode === 'facility'
                ? 'scale-100 bg-background text-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
            >
              <Building2 className={`w-4 h-4 ${mode === 'facility' ? 'text-emerald-500' : 'group-hover:text-emerald-500 transition-colors'}`} />
              Facilities
            </button>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-6 leading-[0.9]">
            How it works
          </h2>

          <p className="text-xl sm:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed min-h-[84px] flex items-center justify-center transition-opacity duration-300 px-2">
            {mode === 'emergency'
              ? 'Request, share, track, and coordinate.'
              : mode === 'bed'
                ? 'See bed availability before you move.'
                : 'See how care teams coordinate incoming patients more clearly.'
            }
          </p>
        </div>

        <div className="w-full">
          <InteractiveFlow mode={mode} autoStartKey={autoStartKey} />
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {flowHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.75rem] bg-background/60 px-6 py-6 text-left shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
            >
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-foreground">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
