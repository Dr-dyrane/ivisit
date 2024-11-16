import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ambulance, Phone, Clock, Bed } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { useTheme } from '@/context/ThemeContext';

const features = [
  {
    icon: <Phone className="h-5 w-5 text-accent-500" />,
    text: "24/7 Response"
  },
  {
    icon: <Clock className="h-5 w-5 text-accent-500" />,
    text: "5 min ETA"
  },
  {
    icon: <Bed className="h-5 w-5 text-accent-500" />,
    text: "Instant Booking"
  }
];

export default function Hero() {
  const navigate = useNavigate();

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

  return (
    <Section className="relative min-h-[calc(100vh-5rem)] flex items-center bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS4yMjY3NiAwQzEuOTEzNzQgMCAyLjQ1MzUxIDAuNTM5NzczIDIuNDUzNTEgMS4yMjY3NkMyLjQ1MzUxIDEuOTEzNzQgMS45MTM3NCAyLjQ1MzUxIDEuMjI2NzYgMi40NTM1MUMwLjUzOTc3MyAyLjQ1MzUxIDAgMS45MTM3NCAwIDEuMjI2NzZDMCAwLjUzOTc3MyAwLjUzOTc3MyAwIDEuMjI2NzYgMFoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <animated.div style={fadeIn} className="text-left sm:text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              iVisit
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Professional medical assistance within minutes.
            </p>

            <div className="flex flex-wrap gap-4 justify-start sm:justify-center lg:justify-start mb-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-secondary text-secondary-foreground"
                >
                  {feature.icon}
                  <span className='font-light'>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate('/emergency')}
                className="group relative overflow-hidden text-white dark:text-white"
              >
                <div className="absolute inset-0 w-3 bg-accent-400 transition-all duration-[250ms] ease-out group-hover:w-full rounded-full opacity-50"></div>
                <div className="relative flex items-center gap-2">
                  <Ambulance className="w-6 h-6" />
                  <span>SOS</span>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/book-bed')}
                className="group relative overflow-hidden text-foreground dark:text-white"
              >
                <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full rounded-full opacity-10"></div>
                <div className="relative flex items-center gap-2">
                  <Bed className="w-6 h-6" />
                  <span>Book Bed</span>
                </div>
              </Button>
            </div>
          </animated.div>

          <animated.div style={fadeIn} className="relative aspect-[4/3] lg:aspect-auto">
            <div className="relative h-full">
              <img
                src={images[theme]}
                alt="Emergency Response Team"
                className="w-full h-full object-cover object-center rounded-2xl"
              />
              <div
                className={`absolute inset-0 ${gradients[theme]} mix-blend-multiply rounded-2xl`}
              ></div>
            </div>
          </animated.div>
        </div>
      </Container>
    </Section>
  );
}