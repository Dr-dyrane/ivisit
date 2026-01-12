import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Users, Rocket, Heart, ArrowRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/providers/ThemeContext';
import EarlyAccessForm from '@/components/early-access/EarlyAccessForm';

const benefits = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Access',
    description: 'Get immediate access to the iVisit platform. No waiting lists.'
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'Shape the Future',
    description: 'Your feedback directly influences feature development and priorities.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community First',
    description: 'Join our early adopters community and connect with like-minded health tech enthusiasts.'
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Lifetime Supporter Badge',
    description: 'Early supporters receive a special badge and recognition on the platform.'
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
    name: 'Supporter',
    price: '$10',
    period: 'one-time',
    description: 'Support the mission',
    features: [
      'Everything in Early Access',
      'Lifetime supporter badge',
      'Priority support',
      'Exclusive community access',
      'Early feature access'
    ],
    cta: 'Become a Supporter',
    variant: 'accent' as const,
    highlighted: true
  }
];

export default function EarlyAccessPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
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

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  const handleFreeCTA = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePaidCTA = () => {
    const gumroadLink = import.meta.env.VITE_GUMROAD_LINK;
    if (gumroadLink && gumroadLink !== 'https://gumroad.com/l/your-product-id') {
      window.open(gumroadLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section id="early-access-hero" ref={sectionRef} className="relative min-h-[calc(100vh-5rem)] flex items-center bg-transparent overflow-hidden group pt-20 md:pt-32">
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
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              🚀 Limited Time Offer
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.05em] text-foreground mb-8 leading-[0.85]">
              Join the iVisit<span className="text-primary"> Revolution</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 leading-relaxed font-normal">
              Be among the first to experience ultra-rapid medical dispatch. Early access subscribers shape the future of emergency healthcare delivery.
            </p>

            <EarlyAccessForm onSuccess={() => {}} />

            <p className="text-xs text-muted-foreground/60 mt-8">
              ✓ No credit card required for early access
              <br />
              ✓ Cancel anytime
              <br />
              ✓ 100% privacy-first approach
            </p>
          </animated.div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="py-20 md:py-32 bg-secondary/30" ref={formSectionRef}>
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 leading-tight">
              Why Join Early<span className="text-primary">?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Early access subscribers get exclusive benefits and help shape the platform's future.
            </p>
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, or support our mission to revolutionize emergency healthcare.
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
                    <h3 className="text-2xl font-black text-foreground mb-2">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
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
                    className="w-full rounded-xl"
                    onClick={tier.name === 'Early Access' ? handleFreeCTA : handlePaidCTA}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
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
              Ready to Be Part of the Change<span className="text-primary">?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of early adopters revolutionizing emergency healthcare. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="accent"
                size="lg"
                className="rounded-xl"
                onClick={handleFreeCTA}
              >
                Get Early Access
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/')}
                className="rounded-xl"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
