import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ambulance, ArrowUpRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import SEOHead from '../seo/SEOHead';
import PremiumFloatingCTA from './PremiumFloatingCTA';
import { getAppDownloadLink } from '@/constants/appLinks';

export default function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const sectionRef = useRef<HTMLElement>(null);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const handleEmergency = () => {
    if (isAuthenticated) {
      navigate('/emergency');
    } else {
      window.open(getAppDownloadLink('expo-preview'), '_blank');
    }
  };

  return (
    <>
      <SEOHead
        title="iVisit — Emergency Medical Dispatch & Facility Command OS"
        description="Ultra-rapid emergency medical dispatch for citizens and a unified Command OS for healthcare facilities. Get ambulance response within 5 minutes and optimize facility operations."
        keywords="emergency medical services, ambulance dispatch, hospital command os, medical emergency, nigeria healthcare, facility management, medical coordination, emergency response"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "iVisit",
          "url": "https://ivisit.ng",
          "logo": "https://ivisit.ng/logo.png",
          "description": "Ultra-rapid emergency medical dispatch for citizens and a unified Command OS for healthcare facilities.",
          "sameAs": ["https://ivisit.ng"],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+234-800-000-0000",
            "contactType": "emergency",
            "availableLanguage": ["English"],
            "hoursAvailable": "24/7"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Nigeria"
          },
          "serviceType": [
            "Emergency Medical Services",
            "Ambulance Services",
            "Hospital Bed Booking",
            "Medical Coordination",
            "Facility Management OS"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "iVisit Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Emergency Ambulance Dispatch",
                  "description": "Rapid ambulance dispatch with 5-minute response time"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Facility Command OS",
                  "description": "Unified operating system for healthcare facility management"
                }
              }
            ]
          }
        }}
      />
      <Section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-transparent">
        <Container className="relative z-10">
          <animated.div style={fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[16rem] font-black tracking-[-0.08em] text-foreground mb-12 leading-[0.75] select-none">
              iVisit<span className="text-primary italic">.</span>
            </h1>

            <div className="max-w-4xl mx-auto mb-20">
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground leading-relaxed tracking-[-0.02em] px-4">
                Ultra-rapid response for <span className="text-foreground font-black">Citizens</span>. <br className="" />
                Unified infrastructure for <span className="text-primary font-black">Facilities</span>.
              </p>

              <div className="mt-10 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                  <span>5-MINUTE ETA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span>REAL-TIME TRIAGE</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto px-6 sm:px-0">
              <Button
                variant="accent"
                size="lg"
                onClick={handleEmergency}
                showOverlay={true}
                className="w-full sm:w-auto px-10 rounded-full text-xs sm:text-sm font-black uppercase tracking-[0.2em] py-7 transition-all duration-500 hover:scale-[1.05] active:scale-95 shadow-2xl shadow-primary/20 whitespace-nowrap"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                    <Ambulance className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <span>Try Live Beta</span>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('/early-access', '_blank')}
                showOverlay={true}
                className="w-full sm:w-auto px-10 rounded-full text-xs sm:text-sm font-black uppercase tracking-[0.2em] py-7 transition-all duration-500 hover:scale-[1.05] active:scale-95 backdrop-blur-md border border-border/50 bg-secondary/10 dark:bg-white/5 whitespace-nowrap"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>Get Priority Access</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </div>
              </Button>

              {/* Testing program link - commented out for closed testing
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://play.google.com/apps/testing/com.dyrane.ivisit', '_blank')}
                showOverlay={true}
                className="w-full sm:w-auto px-10 rounded-full text-xs sm:text-sm font-black uppercase tracking-[0.2em] py-7 transition-all duration-500 hover:scale-[1.05] active:scale-95 backdrop-blur-md border border-border/50 bg-secondary/10 dark:bg-white/5 whitespace-nowrap"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>Join Testing</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </div>
              </Button>
              */}
            </div>
          </animated.div>
        </Container>
      </Section>
      <PremiumFloatingCTA />
    </>
  );
}