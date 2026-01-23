import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export default function EarlyAccessCTA() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  return (
    <Section id="early-access-cta" ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background">
      <Container className="relative z-10">
        <animated.div style={fadeIn} className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
            Be First to Shape the<span className="text-primary"> Future</span>
          </h2>

          <div className="max-w-3xl mx-auto mb-20">
            <p className="text-xl sm:text-2xl font-light text-muted-foreground leading-relaxed tracking-[-0.02em]">
              Join our early access community and get exclusive benefits, priority support, and a lifetime supporter badge. Shape the future of emergency medical dispatch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/early-access')}
              showOverlay={true}
              className="px-12 rounded-2xl text-lg font-bold py-6 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                <span>CLAIM EARLY ACCESS</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
            <p className="text-lg font-light text-muted-foreground">
              Free & Premium options available
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-black text-primary mb-4">∞</div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Lifetime Access</p>
            </div>
            <div>
              <div className="text-4xl font-black text-accent mb-4">⚡</div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Priority Support</p>
            </div>
            <div>
              <div className="text-4xl font-black text-foreground mb-4">🏆</div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Supporter Badge</p>
            </div>
          </div>
        </animated.div>
      </Container>
    </Section>
  );
}
