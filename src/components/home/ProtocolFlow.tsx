import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, MapPinned, PhoneCall, Route } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { usePreviewBridge } from '../layout/marketing/PreviewBridgeProvider';
import { InteractiveFlow } from './transparency/InteractiveFlow';

export default function ProtocolFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [autoStartKey, setAutoStartKey] = useState(0);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);
  const { openPreviewBridge, previewCtaLabel } = usePreviewBridge();

  const flowHighlights = [
    {
      icon: <PhoneCall className="h-5 w-5 text-primary" />,
      label: 'Open',
      description: 'Start the live help screen without bouncing between steps.'
    },
    {
      icon: <MapPinned className="h-5 w-5 text-primary" />,
      label: 'Confirm',
      description: 'Share where help should start so the right team can move.'
    },
    {
      icon: <Route className="h-5 w-5 text-primary" />,
      label: 'Follow',
      description: 'See the route, the hospital, and the next move in one place.'
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
      label: 'Arrive',
      description: 'Reach real care with less delay and clearer coordination.'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || hasAutoStarted) return;
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAutoStarted) return;
        setAutoStartKey((current) => current + 1);
        setHasAutoStarted(true);
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [hasAutoStarted]);

  return (
    <Section id="how-it-works" ref={sectionRef} className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-transparent via-secondary/10 to-transparent py-16 sm:py-24 xl:min-h-screen">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20" />

      <Container className="relative z-10">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-background/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            How iVisit works
          </div>

          <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] text-foreground sm:text-6xl md:text-7xl">
            One calm flow when every minute matters.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl px-2 text-xl font-light leading-relaxed text-muted-foreground sm:text-2xl">
            Open iVisit, confirm your location, and move toward real help from one live screen.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <Button
              variant="accent"
              size="lg"
              onClick={openPreviewBridge}
              showOverlay={true}
              className="w-full rounded-full border-0 px-8 py-6 text-sm shadow-2xl shadow-primary/20 sm:w-auto"
            >
              <span>{previewCtaLabel}</span>
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Button>
            <p className="text-sm text-muted-foreground">Open the live iVisit app</p>
          </div>
        </div>

        <div className="w-full">
          <InteractiveFlow mode="emergency" autoStartKey={autoStartKey} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
