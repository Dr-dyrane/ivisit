import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Mail, Crown, Star, Check, ArrowRight, Search, X, Zap, Rocket, Users, Heart, Shield, Timer } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/providers/ThemeContext';
import EarlyAccessForm from '@/components/early-access/EarlyAccessForm';
import SEOHead from '@/components/seo/SEOHead';
import { supabase } from '@/lib/supabase';
import { submitSubscriber } from '@/lib/api/subscribers';
import { toast } from 'sonner';

const benefits = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Access',
    description: 'No waiting lists. Start using iVisit right now.'
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'Shape the Future',
    description: 'Your feedback drives our development roadmap.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community First',
    description: 'Connect with early adopters in healthcare tech.'
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Lifetime Badge',
    description: 'Special supporter badge and platform recognition.'
  }
];

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
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPaid] = useState(searchParams.get('paid') === 'true');

  useEffect(() => {
    document.title = 'iVisit Early Access - Join the Revolution';
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkGoogleSignIn = async () => {
      if (searchParams.get('google') === 'success') {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.email) {
            const result = await submitSubscriber(session.user.email, 'free');
            if (result.success) {
              toast.success('Google Sign-In successful! You are now subscribed.');
              // Scroll to form section after successful Google sign-in
              setTimeout(() => {
                if (formSectionRef.current) {
                  formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 1000);
            }
          }
        } catch (error) {
          console.error('Error handling Google sign-in redirect:', error);
        } finally {
          // Clean up URL parameters
          navigate('/early-access', { replace: true });
        }
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
      <Section id="early-access-hero" ref={sectionRef} className={`relative min-h-[calc(100vh-5rem)] flex items-center bg-transparent overflow-hidden group pt-20 md:pt-32 ${isPaid ? 'mt-20' : ''}`}>
        {/* Smarty Blur Background */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(var(--grid-color), 0.05)'}, transparent 80%)`,
          }}
        />

        {/* Background Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

        <Container className="relative z-10">
          <animated.div style={fadeIn} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Timer className="h-3 w-3 animate-pulse" />
              Limited Time - 80% OFF
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.05em] text-foreground mb-8 leading-[0.85]">
              Join iVisit<span className="text-primary"> Premium</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed font-normal">
              Transform emergency healthcare. Get <span className="text-primary font-bold">lifetime premium access</span> at 80% off.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="outline"
                size="lg"
                onClick={handleFreeCTA}
                className="flex-1 rounded-2xl text-base font-bold border-border/50 bg-background/50 hover:bg-background transition-all duration-200"
              >
                Start Free
              </Button>
              
              <Button
                variant="accent"
                size="lg"
                onClick={handlePaidCTA}
                className="flex-1 rounded-2xl text-base font-bold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-200"
              >
                Get Premium Access
              </Button>
            </div>

            <EarlyAccessForm onSuccess={() => {}} />

            <p className="text-xs text-muted-foreground/60 mt-8">
              ✓ No credit card required for basic early access
              <br />
              ✓ Premium offer ends February 28, 2025
              <br />
              ✓ 30-day money-back guarantee
            </p>
          </animated.div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="py-20 md:py-32 bg-secondary/30" ref={formSectionRef}>
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 leading-tight">
              Why Choose Premium<span className="text-primary">?</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Exclusive benefits for early supporters. Limited time offer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {premiumBenefits.map((benefit, index) => (
              <animated.div
                key={index}
                style={fadeIn}
                className="group"
              >
                <Card className="p-6 h-full rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-background border border-border group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </animated.div>
            ))}
          </div>

          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground mb-6 leading-tight">
              Standard Benefits<span className="text-primary">.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <animated.div
                key={index}
                style={fadeIn}
                className="group"
              >
                <Card className="p-8 h-full rounded-3xl bg-background border-border hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </animated.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pricing Section */}
      <Section className="py-20 md:py-32">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 leading-tight">
              Choose Your Path<span className="text-primary">.</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Start free or become a paid supporter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <animated.div
                key={index}
                style={fadeIn}
              >
                <Card
                  className={`p-8 h-full rounded-3xl transition-all duration-300 flex flex-col ${
                    tier.highlighted
                      ? 'border-primary/50 bg-primary/5 scale-[1.02]'
                      : 'bg-secondary/30 border-border'
                  }`}
                >
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-black text-foreground">
                        {tier.name}
                      </h3>
                      {tier.limitedOffer && (
                        <div className="px-2 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
                          Limited
                        </div>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      {tier.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">{tier.originalPrice}</span>
                      )}
                      <span className="text-4xl font-black text-foreground">{tier.price}</span>
                      {tier.period && <span className="text-sm text-muted-foreground">{tier.period}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.variant}
                    size="lg"
                    className="w-full rounded-xl text-sm sm:text-base font-semibold sm:font-bold"
                    onClick={tier.name === 'Early Access' ? handleFreeCTA : handlePaidCTA}
                  >
                    <span className="sm:hidden">{tier.name === 'Early Access' ? 'Join Free' : 'Premium'}</span>
                    <span className="hidden sm:inline">{tier.cta}</span>
                    <ArrowRight className="h-4 w-4 ml-1 sm:ml-2 flex-shrink-0" />
                  </Button>
                  {tier.highlighted && (
                    <p className="text-xs text-center text-muted-foreground/60 mt-3">
                      ⚡ Limited time - Save 80%
                    </p>
                  )}
                </Card>
              </animated.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 md:py-32 bg-secondary/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 leading-tight">
              Ready to Transform Healthcare<span className="text-primary">?</span>
            </h2>
            <p className="text-base text-muted-foreground mb-8">
              Join premium supporters and get lifetime benefits. Limited time offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                variant="accent"
                size="lg"
                className="rounded-xl text-sm sm:text-base font-semibold sm:font-bold"
                onClick={handlePaidCTA}
              >
                <span className="sm:hidden">Get Premium</span>
                <span className="hidden sm:inline">Get Premium Access</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleFreeCTA}
                className="rounded-xl text-sm sm:text-base font-semibold sm:font-bold"
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
