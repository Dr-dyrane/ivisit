import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import SEOHead from '../seo/SEOHead';
import { usePreviewBridge } from '../layout/marketing/PreviewBridgeProvider';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openPreviewBridge, previewCtaLabel } = usePreviewBridge();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <>
      <SEOHead
        title="iVisit | Emergency Medical Help, Faster"
        description="Request emergency medical response, check hospital bed availability, and share live location with iVisit."
        keywords="emergency medical response, ambulance request, hospital bed booking, urgent care coordination, live location sharing"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'iVisit',
          url: 'https://ivisit.ng',
          logo: 'https://ivisit.ng/logo.png',
          description:
            'iVisit helps people request emergency medical response, check hospital bed availability, and share live location from one place.',
          sameAs: ['https://ivisit.ng'],
          applicationCategory: 'HealthApplication',
          operatingSystem: 'iOS, Android',
          serviceType: [
            'Emergency medical response',
            'Hospital bed booking',
            'Live location sharing',
          ],
        }}
      />
      <Section
        id="home"
        ref={sectionRef}
        className="relative flex min-h-screen items-center justify-center bg-transparent py-16 sm:py-20"
      >
        <Container className="relative z-10">
          <animated.div style={fadeIn} className="mx-auto max-w-5xl text-center">
            <div className="mx-auto max-w-4xl">
              <p className="text-base font-black uppercase tracking-[0.2em] text-foreground/55">iVisit</p>
              <h1 className="mt-4 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                Get help fast when something feels wrong.
              </h1>
              <p className="mt-6 px-2 text-lg font-light leading-relaxed tracking-[-0.02em] text-muted-foreground sm:px-6 sm:text-xl md:text-2xl">
                Request help, find a hospital, and share your location in seconds.
              </p>
            </div>

            <div className="mt-10 flex w-full justify-center px-2 sm:px-0">
              <Button
                variant="accent"
                size="lg"
                onClick={openPreviewBridge}
                showOverlay={true}
                className="w-full min-w-[18rem] rounded-full border-0 px-8 py-7 text-sm font-black uppercase tracking-[0.15em] shadow-2xl shadow-primary/20 sm:w-auto"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>{previewCtaLabel}</span>
                  <ArrowRight className="h-4 w-4 opacity-70" />
                </div>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Open on web, phone, or tablet
            </p>
          </animated.div>
        </Container>
      </Section>
    </>
  );
}
