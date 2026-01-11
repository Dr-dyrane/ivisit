import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ambulance, Phone, Clock, Bed } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useTheme } from '@/providers/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const features = [
  {
    icon: <Phone className="h-5 w-5" />,
    text: "24/7 Response"
  },
  {
    icon: <Clock className="h-5 w-5" />,
    text: "5 min ETA"
  },
  {
    icon: <Bed className="h-5 w-5" />,
    text: "Instant Booking"
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  const { theme } = useTheme();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const images = {
    dark: 'https://images.pexels.com/photos/8942726/pexels-photo-8942726.jpeg',
    light: 'https://images.pexels.com/photos/6754179/pexels-photo-6754179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };

  const gradients = {
    dark: 'bg-gradient-to-t from-black/80 via-black/20 to-transparent',
    light: 'bg-gradient-to-t from-white/80 via-white/50 to-transparent',
  };

  const handleEmergency = () => {
    if (isAuthenticated) {
      navigate('/emergency');
    } else {
      navigate('/login', { state: { from: '/emergency' } });
    }
  };

  const handleBookBed = () => {
    if (isAuthenticated) {
      navigate('/book-bed');
    } else {
      navigate('/login', { state: { from: '/book-bed' } });
    }
  };
  return (
    <Section id="home" className="relative min-h-[calc(100vh-5rem)] flex items-center bg-transparent overflow-hidden">
      {/* Innovative Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <animated.div style={fadeIn} className="text-left sm:text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              System Active: Lagos Command
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] text-foreground mb-8 leading-[0.85]">
              iVisit<span className="text-primary">.</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-xl sm:mx-auto lg:mx-0 leading-relaxed font-normal">
              Ultra-rapid medical dispatch systems. Command-grade intervention within <span className="text-primary font-bold">5 minutes</span>.
            </p>

            <div className="flex flex-wrap gap-4 justify-start sm:justify-center lg:justify-start mb-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-secondary border border-border text-foreground backdrop-blur-xl transition-all hover:border-primary/50 group"
                >
                  <span className="text-primary group-hover:scale-110 transition-transform">{feature.icon}</span>
                  <span className='font-bold text-[10px] uppercase tracking-widest'>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center sm:flex-nowrap">
              <Button
                variant="accent"
                size="lg"
                onClick={handleEmergency}
                showOverlay={true}
                className="group px-8 rounded-2xl h-16 w-full sm:w-auto min-w-[200px]"
              >
                <div className="relative flex items-center gap-3">
                  <Ambulance className="w-6 h-6 animate-bounce" />
                  <span className="font-black tracking-[0.1em] text-base">LAUNCH DEMO</span>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleBookBed}
                showOverlay={true}
                className="group px-8 rounded-2xl h-16 border-border w-full sm:w-auto min-w-[200px]"
              >
                <div className="relative flex items-center gap-3">
                  <Bed className="w-6 h-6" />
                  <span className="font-bold tracking-widest text-foreground">RESERVE BED</span>
                </div>
              </Button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 opacity-80 hover:opacity-100 transition-opacity justify-start sm:justify-center lg:justify-start">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground whitespace-nowrap">Available Now:</span>
              <div className="flex gap-4 items-center">
                <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    className="h-10 w-auto"
                  />
                </a>
                <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-[58px] w-auto"
                  />
                </a>
              </div>
            </div>
          </animated.div>

          <animated.div style={fadeIn} className="relative hidden lg:block">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden moist-glass p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
              <img
                src={images[theme]}
                alt="Emergency Response Team"
                className="w-full h-full object-cover rounded-[2rem] grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* HUD Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl pointer-events-none" />
          </animated.div>
        </div>
      </Container>
    </Section>
  );
}