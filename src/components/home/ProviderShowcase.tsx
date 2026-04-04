import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BedDouble, Building2, ShieldCheck, Stethoscope, Workflow } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export default function ProviderShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1]);

  const features = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: 'Shared dispatch view',
      description: 'See incoming requests and care coordination in one place.'
    },
    {
      icon: <BedDouble className="w-6 h-6" />,
      title: 'Bed visibility',
      description: 'Track bed availability before patients arrive.'
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Care team coordination',
      description: 'Reduce phone-tag between dispatchers and facilities.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Secure provider access',
      description: 'Keep facility workflows role-based and controlled.'
    }
  ];

  return (
    <Section id="providers" ref={sectionRef} className="relative min-h-0 py-24 sm:py-32 lg:py-40 overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none opacity-50" />

      <Container>
        <motion.div style={{ opacity, scale }} className="relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-[0_16px_40px_rgba(134,16,14,0.08)]">
              <Building2 className="w-3.5 h-3.5" />
              For hospitals and providers
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.07em] text-foreground mb-8 leading-[0.88]">
              Coordinate incoming care <br className="hidden sm:block" />
              <span className="text-primary">with less friction.</span>
            </h2>

            <p className="text-xl sm:text-2xl font-light text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              iVisit also supports hospitals, clinics, and care teams that need a clearer handoff between dispatch, bed planning, and arrival coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group flex min-h-[260px] flex-col justify-between rounded-[32px] bg-background/[0.55] p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur-3xl transition-all duration-500 hover:scale-[1.01] dark:shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:p-10"
              >
                <div className="mb-8 inline-flex w-fit rounded-2xl bg-primary/10 p-5 text-primary shadow-[0_16px_40px_rgba(134,16,14,0.08)] transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                  {feature.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-lg font-light text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <Button
              variant="accent"
              size="lg"
              onClick={() => window.open('https://console.ivisit.ng/onboarding', '_blank')}
              showOverlay={true}
              className="w-full rounded-full border-0 px-12 py-8 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 sm:w-auto"
            >
              <div className="flex items-center gap-3">
                <span>Start Provider Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>

            <p className="max-w-2xl text-center text-sm text-muted-foreground">
              Provider onboarding is available for teams that want a clearer workflow for emergency response and facility coordination.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
