import React, { useState } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';
import { 
  Ambulance, 
  Bed, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';

type FlowMode = 'emergency' | 'booking';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  dbAction?: string;
  status: string;
}

const ambulanceSteps: Step[] = [
  {
    id: '1',
    title: 'SOS Initiation',
    description: 'User triggers Emergency Mode. App fetches high-precision location and localizes nearby Command-grade hospitals.',
    icon: <Smartphone className="h-6 w-6" />,
    dbAction: 'INSERT public.emergency_requests (in_progress)',
    status: 'INITIATED'
  },
  {
    id: '2',
    title: 'Dispatch Confirmed',
    description: 'Hospital accepts request. Real-time routing is established. Emergency visit lifecycle moves to monitoring.',
    icon: <ShieldCheck className="h-6 w-6" />,
    dbAction: 'UPDATE public.visits (lifecycle: monitoring)',
    status: 'CONFIRMED'
  },
  {
    id: '3',
    title: 'Tactical Arrival',
    description: 'Ambulance reaches target coordinates. User must "Mark Arrived" to synchronize lifecycle state.',
    icon: <MapPin className="h-6 w-6" />,
    dbAction: 'UPDATE public.emergency_requests (arrived)',
    status: 'ARRIVED'
  },
  {
    id: '4',
    title: 'Mission Complete',
    description: 'Patient handover completed. Visit finalized and archived for medical records.',
    icon: <CheckCircle2 className="h-6 w-6" />,
    dbAction: 'UPDATE public.visits (completed)',
    status: 'COMPLETED'
  }
];

const bookingSteps: Step[] = [
  {
    id: '1',
    title: 'Reserve Mode',
    description: 'User enters Booking Mode. System filters for real-time bed availability and required medical specialties.',
    icon: <Bed className="h-6 w-6" />,
    dbAction: 'INSERT public.emergency_requests (in_progress)',
    status: 'INITIATED'
  },
  {
    id: '2',
    title: 'Bed Allocated',
    description: 'Resource confirmed. App generates unique Bed ID and ETA. Lifecycle state advances to monitoring.',
    icon: <ShieldCheck className="h-6 w-6" />,
    dbAction: 'UPDATE public.visits (lifecycle: confirmed)',
    status: 'RESERVED'
  },
  {
    id: '3',
    title: 'Occupancy Check',
    description: 'Patient arrives at facility. "Mark Occupied" triggers transition to active medical stay status.',
    icon: <Activity className="h-6 w-6" />,
    dbAction: 'UPDATE public.visits (lifecycle: occupied)',
    status: 'OCCUPIED'
  },
  {
    id: '4',
    title: 'Checkout',
    description: 'Medical stay concluded. Bed inventory updated automatically in global command grid.',
    icon: <CheckCircle2 className="h-6 w-6" />,
    dbAction: 'UPDATE public.emergency_requests (completed)',
    status: 'RELEASED'
  }
];

export default function ProtocolFlow() {
  const [mode, setMode] = useState<FlowMode>('emergency');
  const steps = mode === 'emergency' ? ambulanceSteps : bookingSteps;

  const transitions = useTransition(steps, {
    from: { opacity: 0, transform: 'translateX(20px)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(-20px)' },
    keys: (step) => `${mode}-${step.id}`,
    trail: 100,
  });

  return (
    <Section id="protocol" className="py-32 bg-transparent relative z-10 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column: Info & Toggle */}
          <div className="lg:w-1/3 space-y-8 sticky top-32">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Operational Lifecycle
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 leading-tight">
                Command Flow <br /> Protocols<span className="text-primary">.</span>
              </h2>
              <p className="text-muted-foreground font-light text-lg leading-relaxed">
                Audited end-to-end synchronization between the mobile terminal and the global command grid.
              </p>
            </div>

            <div className="flex p-1 bg-secondary border border-border rounded-2xl">
              <button
                onClick={() => setMode('emergency')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === 'emergency' ? 'bg-background text-primary shadow-lg' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Ambulance className="h-4 w-4" />
                Ambulance SOS
              </button>
              <button
                onClick={() => setMode('booking')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === 'booking' ? 'bg-background text-primary shadow-lg' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Bed className="h-4 w-4" />
                Bed Booking
              </button>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-primary text-white">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">Real-time Persistence</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every state change is synchronized with Supabase for real-time dispatch intelligence and visit history audit.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Flow Steps */}
          <div className="lg:w-2/3 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />
            
            <div className="space-y-12">
              {transitions((style, step, _, index) => (
                <animated.div style={style} className="relative flex flex-col md:flex-row gap-8">
                  {/* Icon Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 bg-background ${
                      mode === 'emergency' ? 'border-primary/20 text-primary shadow-[0_0_20px_rgba(134,16,14,0.1)]' : 'border-accent/20 text-accent shadow-[0_0_20px_rgba(var(--accent),0.1)]'
                    }`}>
                      {step.icon}
                    </div>
                    {index < steps.length - 1 && (
                       <div className="absolute top-16 left-1/2 -translate-x-1/2 h-12 w-px bg-border md:hidden" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow pt-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Step 0{index + 1}</span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border ${
                        mode === 'emergency' ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-accent/5 border-accent/20 text-accent'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight uppercase">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 max-w-xl">
                      {step.description}
                    </p>
                    
                    {step.dbAction && (
                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-secondary/50 border border-border/50 font-mono text-[10px] text-muted-foreground/70 group hover:border-primary/30 transition-colors">
                        <Database className="h-3 w-3 text-primary/50 group-hover:text-primary transition-colors" />
                        {step.dbAction}
                      </div>
                    )}
                  </div>

                  {/* Progress Line for Desktop */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[31px] top-16 bottom-[-48px] w-px bg-border hidden md:block" />
                  )}
                </animated.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
