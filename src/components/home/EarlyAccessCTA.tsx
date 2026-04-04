import { useRef } from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import ExpoMark from '../ui/ExpoMark';
import EarlyAccessForm from '../early-access/EarlyAccessForm';
import { usePreviewBridge } from '../layout/marketing/PreviewBridgeProvider';

export default function EarlyAccessCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openPreviewBridge, previewCtaLabel } = usePreviewBridge();

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  return (
    <Section id="updates" ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/20 to-background py-16 sm:py-24">
      <Container className="relative z-10">
        <animated.div style={fadeIn} className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-start">
            <div className="text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Get started</p>
              <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.05em] text-foreground leading-[0.95]">
                Keep iVisit within reach when you need it.
              </h2>
              <p className="mt-6 max-w-2xl text-lg sm:text-xl font-light text-muted-foreground leading-relaxed lg:max-w-3xl">
                Open the iVisit preview on your phone and keep the app ready when you need it.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:items-center sm:justify-center lg:items-start lg:justify-start">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={openPreviewBridge}
                  showOverlay={true}
                className="w-full rounded-full border-0 px-8 py-6 text-sm shadow-2xl shadow-primary/20 sm:w-auto"
              >
                <div className="flex items-center justify-center gap-3">
                  <ExpoMark tone="light" className="h-6 w-6" />
                    <span>{previewCtaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
                <p className="text-sm text-muted-foreground">
                  Early preview access
                </p>
              </div>
            </div>

            <Card className="rounded-[2rem] bg-background/60 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:p-8">
              <div className="flex items-center gap-3 text-foreground">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Get early access updates</h3>
                  <p className="text-sm text-muted-foreground">We will email you when access expands.</p>
                </div>
              </div>

              <div className="mt-6">
                <EarlyAccessForm variant="compact" />
              </div>

              <div className="mt-8 space-y-3 rounded-2xl bg-secondary/25 px-4 py-4 text-sm text-muted-foreground">
                <a href="mailto:support@ivisit.ng" className="flex items-center gap-3 transition-colors hover:text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  support@ivisit.ng
                </a>
                <a href="tel:+19517284218" className="flex items-center gap-3 transition-colors hover:text-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  +1 951 728 4218
                </a>
              </div>
            </Card>
          </div>
        </animated.div>
      </Container>
    </Section>
  );
}
