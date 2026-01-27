import React, { useRef, useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { InteractiveFlow } from './transparency/InteractiveFlow';
import { ShieldCheck, Zap, BedDouble, Ambulance } from 'lucide-react';

export default function ProtocolFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<'emergency' | 'bed'>('emergency');

  return (
    <Section id="protocols" ref={sectionRef} className="min-h-screen flex items-center justify-center bg-transparent py-24 relative overflow-hidden">

      {/* Background Ambience */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20 pointer-events-none transition-colors duration-1000 ${mode === 'bed' ? 'via-blue-500/5' : ''}`} />

      <Container className="relative z-10">
        <div className="text-center mb-12">
          {/* Tab Switcher */}
          <div className="inline-flex items-center bg-muted/50 dark:bg-muted/20 backdrop-blur-md p-1.5 rounded-full border border-border/50 mb-8 mx-auto shadow-lg relative z-20">
            <button
              onClick={() => setMode('emergency')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative group ${mode === 'emergency'
                ? 'bg-background text-foreground shadow-sm scale-100'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50 scale-95'
                }`}
            >
              <Ambulance className={`w-4 h-4 ${mode === 'emergency' ? 'text-destructive' : 'group-hover:text-destructive transition-colors'}`} />
              Ambulance Call
            </button>
            <button
              onClick={() => setMode('bed')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative group ${mode === 'bed'
                ? 'bg-background text-foreground shadow-sm scale-100'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50 scale-95'
                }`}
            >
              <BedDouble className={`w-4 h-4 ${mode === 'bed' ? 'text-blue-500' : 'group-hover:text-blue-500 transition-colors'}`} />
              Bed Booking
            </button>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-6 leading-[0.9]">
            {mode === 'emergency' ? (
              <>Instant<span className="text-destructive">.</span> Synchronized<span className="text-destructive">.</span></>
            ) : (
              <>Real-time<span className="text-blue-500">.</span> Allocation<span className="text-blue-500">.</span></>
            )}
          </h2>

          <p className="text-xl sm:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed h-[60px] flex items-center justify-center transition-opacity duration-300">
            {mode === 'emergency'
              ? "See how an ambulance request instantly alerts the Command Center."
              : "Watch a bed reservation map to hospital capacity in milliseconds."
            }
          </p>
        </div>

        {/* The Transparency Flow */}
        <div className="w-full">
          <InteractiveFlow mode={mode} />
        </div>

        {/* Technical Footer */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-border/10 pt-12">
          <div className="space-y-2">
            <div className="text-sm font-light text-muted-foreground uppercase tracking-widest">Latency</div>
            <div className="text-3xl font-black text-foreground flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              &lt; 50ms
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-light text-muted-foreground uppercase tracking-widest">Protocol</div>
            <div className="text-3xl font-black text-foreground">WebSocket</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-light text-muted-foreground uppercase tracking-widest">Security</div>
            <div className="text-3xl font-black text-foreground">AES-256</div>
          </div>
        </div>

      </Container>
    </Section>
  );
}
