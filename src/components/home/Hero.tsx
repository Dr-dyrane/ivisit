import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ambulance } from 'lucide-react';
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
      window.open(getAppDownloadLink('production'), '_blank');
    }
  };

  return (
    <>
      <SEOHead
        title="iVisit — Emergency Medical Dispatch | 5-Minute Response Time"
        description="Ultra-rapid emergency medical dispatch and coordination platform. Get ambulance response within 5 minutes across Nigeria. Real-time tracking, instant booking, 24/7 availability."
        keywords="emergency medical services, ambulance dispatch, 5 minute response, hospital booking, medical emergency, nigeria healthcare, rapid response, medical coordination, emergency response"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "iVisit",
          "url": "https://ivisit.ng",
          "logo": "https://ivisit.ng/logo.png",
          "description": "Ultra-rapid emergency medical dispatch and coordination platform with 5-minute response time across Nigeria.",
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
            "Medical Coordination"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Emergency Medical Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Emergency Ambulance Dispatch",
                  "description": "Rapid ambulance dispatch for medical emergencies with 5-minute response time"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Hospital Bed Booking",
                  "description": "Real-time hospital bed availability and booking system"
                }
              }
            ]
          }
        }}
      />
      <Section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-transparent">
        <Container className="relative z-10">
          <animated.div style={fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.08em] text-foreground mb-12 leading-[0.75]">
              iVisit<span className="text-primary">.</span>
            </h1>

            <div className="max-w-3xl mx-auto mb-20">
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground leading-relaxed tracking-[-0.02em]">
                Ultra-rapid medical dispatch systems. Command-grade intervention within <span className="text-primary font-bold">5 minutes</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
              <Button
                variant="accent"
                size="lg"
                onClick={handleEmergency}
                showOverlay={true}
                className="w-full sm:w-auto px-6 sm:px-8 rounded-2xl text-base sm:text-lg font-bold py-6 transition-all duration-300 hover:scale-[1.02] whitespace-nowrap"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                    <Ambulance className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  </div>
                  <span>Try Live Beta</span>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('/early-access', '_blank')}
                showOverlay={true}
                className="w-full sm:w-auto px-6 sm:px-8 rounded-2xl text-base sm:text-lg font-bold py-6 transition-all duration-300 hover:scale-[1.02] whitespace-nowrap"
              >
                <span>Get Priority Access</span>
              </Button>
            </div>
          </animated.div>
        </Container>
      </Section>
      <PremiumFloatingCTA />
    </>
  );
}