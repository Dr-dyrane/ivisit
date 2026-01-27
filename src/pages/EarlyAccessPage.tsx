import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Crown, Star, Check, ArrowRight, Shield, Timer } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import EarlyAccessForm from '@/components/early-access/EarlyAccessForm';
import SEOHead from '@/components/seo/SEOHead';
import { supabase } from '@/lib/supabase';
import { submitSubscriber } from '@/lib/api/subscribers';
import { toast } from 'sonner';

const premiumBenefits = [
  {
    icon: <Crown className="h-5 w-5 text-yellow-500" />,
    title: 'VIP Support',
    description: 'Priority response time, dedicated support channel'
  },
  {
    icon: <Shield className="h-5 w-5 text-blue-500" />,
    title: 'Enhanced Security',
    description: 'Additional privacy features and data protection'
  },
  {
    icon: <Star className="h-5 w-5 text-purple-500" />,
    title: 'Beta Features',
    description: 'First access to new features before public release'
  },
  {
    icon: <Timer className="h-5 w-5 text-green-500" />,
    title: 'Lifetime Updates',
    description: 'All future premium features included forever'
  }
];

const pricingTiers = [
  {
    name: 'Early Access',
    price: 'Free',
    description: 'Get started with iVisit',
    features: [
      'Full platform access',
      'Emergency dispatch',
      'Bed booking',
      'Real-time tracking'
    ],
    cta: 'Join for Free',
    variant: 'outline' as const
  },
  {
    name: 'Premium Supporter',
    price: '$10',
    period: 'one-time',
    description: 'Limited Offer - Save 80%',
    originalPrice: '$50',
    features: [
      'Everything in Early Access',
      'Lifetime premium badge',
      'VIP priority support',
      'Exclusive community access',
      'Early feature access',
      'Enhanced privacy controls',
      'Lifetime updates',
      'Special recognition on platform'
    ],
    cta: 'Become Premium',
    variant: 'accent' as const,
    highlighted: true,
    limitedOffer: true
  }
];

export default function EarlyAccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [isPaid] = useState(searchParams.get('paid') === 'true');

  useEffect(() => {
    document.title = 'iVisit Early Access - Join the Revolution';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email) {
        try {
          const result = await submitSubscriber(session.user.email, 'free');
          if (result.success) {
            toast.success('Google Sign-In successful! You are now subscribed.');
            if (formSectionRef.current) {
              formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        } catch (error) {
          console.error('Error handling auth change:', error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkGoogleSignIn = async () => {
      if (searchParams.get('google') === 'success') {
        // We still keep this for backward compatibility or if onAuthStateChange is slow,
        // but clean up the URL regardless
        navigate('/early-access', { replace: true });
      }
    };

    checkGoogleSignIn();
  }, [searchParams, navigate]);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  const handleFreeCTA = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus the email input after scroll
      setTimeout(() => {
        const emailInput = document.getElementById('email-early-access') as HTMLInputElement;
        if (emailInput) {
          emailInput.focus();
        }
      }, 500);
    }
  };

  const handlePaidCTA = () => {
    const gumroadLink = import.meta.env.VITE_GUMROAD_LINK;
    if (gumroadLink && gumroadLink !== 'https://gumroad.com/l/your-product-id') {
      window.open(gumroadLink, '_blank');
    }
  };

  return (
    <>
      <SEOHead
        title="iVisit Premium Early Access | Limited Time Offer"
        description="Join iVisit premium early access and save 80%. Get lifetime premium features, VIP support, and exclusive benefits. Limited time offer - transform emergency healthcare."
        keywords="iVisit premium, early access, medical emergency app, VIP support, healthcare technology, emergency response, premium features"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Offer",
          "name": "iVisit Premium Early Access",
          "description": "Limited time offer for iVisit premium early access with lifetime benefits",
          "price": "10",
          "priceCurrency": "USD",
          "availability": "https://schema.org/LimitedAvailability",
          "validFrom": "2025-01-21",
          "priceValidUntil": "2025-02-28",
          "seller": {
            "@type": "Organization",
            "name": "iVisit",
            "url": "https://ivisit.ng"
          }
        }}
      />
      <div className="min-h-screen bg-background">
        {isPaid && (
          <div className="fixed top-0 left-0 right-0 z-40 bg-green-500/90 sm:bg-green-500/10 border-b border-green-500/30 backdrop-blur-none sm:backdrop-blur-sm shadow-lg sm:shadow-none">
            <div className="w-full mx-auto px-4 sm:px-6 py-2 sm:py-4 flex items-center gap-3 sm:gap-4">
              <Check className="h-5 w-5 sm:h-6 sm:w-6 text-white sm:text-green-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-base font-bold text-white sm:text-green-600">Payment Received!</p>
                <p className="text-[10px] sm:text-sm text-white/90 sm:text-green-600/70">Enjoy your Lifetime Supporter benefits.</p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <Section id="early-access-hero" ref={sectionRef} className={`relative min-h-screen flex items-center justify-center bg-transparent ${isPaid ? 'mt-20' : ''}`}>
          <Container className="relative z-10">
            <animated.div style={fadeIn} className="max-w-4xl mx-auto text-center">
              <div className="mb-16">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.08em] text-foreground mb-8 leading-[0.75]">
                  Join iVisit<span className="text-primary"> Premium</span>
                </h1>
              </div>

              <div className="max-w-2xl mx-auto mb-20">
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground leading-relaxed tracking-[-0.02em]">
                  Transform emergency healthcare with lifetime premium access.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <EarlyAccessForm onSuccess={() => { }} />
              </div>
            </animated.div>
          </Container>
        </Section>

        {/* Benefits Section */}
        <Section className="min-h-screen flex items-center justify-center bg-secondary/30" ref={formSectionRef}>
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
                  Why Choose Premium<span className="text-primary">?</span>
                </h2>
                <p className="text-xl sm:text-2xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed tracking-[-0.02em]">
                  Exclusive benefits for early supporters who shape the future of healthcare.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {premiumBenefits.map((benefit, index) => (
                  <animated.div
                    key={index}
                    style={fadeIn}
                    className="group"
                  >
                    <Card className="p-12 h-full rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 transition-all duration-500">
                      <div className="flex items-start gap-6">
                        <div className="p-4 rounded-2xl bg-background border border-border group-hover:scale-110 transition-transform duration-300">
                          {benefit.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                            {benefit.title}
                          </h3>
                          <p className="text-lg font-light text-muted-foreground leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </animated.div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Pricing Section */}
        <Section className="min-h-screen flex items-center justify-center">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
                  Choose Your Path<span className="text-primary">.</span>
                </h2>
                <p className="text-xl sm:text-2xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed tracking-[-0.02em]">
                  Start free or become a premium supporter with lifetime benefits.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {pricingTiers.map((tier, index) => (
                  <animated.div
                    key={index}
                    style={fadeIn}
                  >
                    <Card
                      className={`p-12 h-full rounded-3xl transition-all duration-500 flex flex-col ${tier.highlighted
                          ? 'border-primary/50 bg-primary/5 scale-[1.02]'
                          : 'bg-secondary/30 border-border'
                        }`}
                    >
                      <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl font-black text-foreground tracking-tight">
                            {tier.name}
                          </h3>
                          {tier.limitedOffer && (
                            <div className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-bold uppercase tracking-wider">
                              Limited
                            </div>
                          )}
                        </div>
                        <div className="flex items-baseline gap-3 mb-6">
                          {tier.originalPrice && (
                            <span className="text-xl text-muted-foreground line-through font-light">{tier.originalPrice}</span>
                          )}
                          <span className="text-5xl font-black text-foreground">{tier.price}</span>
                          {tier.period && <span className="text-lg text-muted-foreground font-light">{tier.period}</span>}
                        </div>
                        <p className="text-lg font-light text-muted-foreground leading-relaxed">
                          {tier.description}
                        </p>
                      </div>

                      <ul className="space-y-4 mb-12 flex-1">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-4">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-base font-light text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={tier.variant}
                        size="lg"
                        className="w-full rounded-2xl text-lg font-bold py-6 transition-all duration-300 hover:scale-[1.02]"
                        onClick={tier.name === 'Early Access' ? handleFreeCTA : handlePaidCTA}
                      >
                        <span className="sm:hidden">{tier.name === 'Early Access' ? 'Join Free' : 'Premium'}</span>
                        <span className="hidden sm:inline">{tier.cta}</span>
                        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0" />
                      </Button>
                      {tier.highlighted && (
                        <p className="text-sm text-center text-muted-foreground/60 mt-4 font-light">
                          ⚡ Limited time - Save 80%
                        </p>
                      )}
                    </Card>
                  </animated.div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section className="min-h-screen flex items-center justify-center bg-secondary/30">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
                Ready to Transform Healthcare<span className="text-primary">?</span>
              </h2>
              <p className="text-xl sm:text-2xl font-light text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed tracking-[-0.02em]">
                Join premium supporters and get lifetime benefits. Limited time offer.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="accent"
                  size="lg"
                  className="rounded-2xl text-lg font-bold py-6 px-12 transition-all duration-300 hover:scale-[1.02]"
                  onClick={handlePaidCTA}
                >
                  <span className="sm:hidden">Get Premium</span>
                  <span className="hidden sm:inline">Get Premium Access</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleFreeCTA}
                  className="rounded-2xl text-lg font-bold py-6 px-12 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="sm:hidden">Free Access</span>
                  <span className="hidden sm:inline">Start Free</span>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
