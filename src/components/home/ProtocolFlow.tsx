import { useState, useRef } from 'react';
import { animated, useTransition } from '@react-spring/web';
import {
  Ambulance,
  Bed,
  MapPin,
  ShieldCheck,
  Activity,
  CheckCircle2,
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
  const sectionRef = useRef<HTMLElement>(null);

  const steps = mode === 'emergency' ? ambulanceSteps : bookingSteps;

  const transitions = useTransition(steps, {
    from: { opacity: 0, transform: 'translateX(20px)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(-20px)' },
    keys: (step) => `${mode}-${step.id}`,
    trail: 100,
  });

  return (
    <Section id="protocols" ref={sectionRef} className="min-h-screen flex items-center justify-center bg-transparent">
      <Container>
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Left Column: Info & Toggle */}
          <div className="lg:w-1/3 space-y-12 lg:sticky lg:top-32">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
                Command Flow<span className="text-primary">.</span>
              </h2>
              <p className="text-muted-foreground font-light text-xl leading-relaxed tracking-[-0.02em] max-w-md">
                Audited end-to-end synchronization between the mobile terminal and the global command grid.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row p-1 bg-secondary border border-border rounded-2xl sm:rounded-2xl gap-1 sm:gap-0">
              <button
                onClick={() => setMode('emergency')}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-6 rounded-xl text-xs sm:text-sm font-light uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all whitespace-nowrap ${mode === 'emergency' ? 'bg-background text-primary shadow-lg' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Ambulance className="h-4 w-4 sm:h-5 sm:w-5" />
                Ambulance SOS
              </button>
              <button
                onClick={() => setMode('booking')}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-6 rounded-xl text-xs sm:text-sm font-light uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all whitespace-nowrap ${mode === 'booking' ? 'bg-background text-primary shadow-lg' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Bed className="h-4 w-4 sm:h-5 sm:w-5" />
                Bed Booking
              </button>
            </div>

            <Card className="p-8 bg-primary/5 border-primary/20 rounded-3xl">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-primary text-white">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-light text-foreground text-sm uppercase tracking-[0.15em] mb-3">Real-time Persistence</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Every state change is synchronized with Supabase for real-time dispatch intelligence and visit history audit.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Flow Steps */}
          <div className="lg:w-2/3 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />

            <div className="space-y-16">
              {transitions((style, step, _, index) => (
                <animated.div style={style} className="relative flex flex-col md:flex-row gap-12">
                  {/* Icon Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 bg-background ${mode === 'emergency' ? 'border-primary/20 text-primary shadow-[0_0_20px_rgba(134,16,14,0.1)]' : 'border-accent/20 text-accent shadow-[0_0_20px_rgba(var(--accent),0.1)]'
                      }`}>
                      {step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-12 w-px bg-border md:hidden" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow pt-4">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-sm font-light text-muted-foreground/50 uppercase tracking-[0.15em]">Step 0{index + 1}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                      <span className={`text-sm font-light uppercase tracking-[0.15em] px-3 py-1 rounded-lg border ${mode === 'emergency' ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-accent/5 border-accent/20 text-accent'
                        }`}>
                        {step.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-6 tracking-tight uppercase">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8 max-w-xl">
                      {step.description}
                    </p>

                    {step.dbAction && (
                      <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-secondary/50 border border-border/50 font-mono text-sm text-muted-foreground/70 group hover:border-primary/30 transition-colors">
                        <Database className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                        {step.dbAction}
                      </div>
                    )}
                  </div>

                  {/* Progress Line for Desktop */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[39px] top-20 bottom-[-64px] w-px bg-border hidden md:block" />
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
