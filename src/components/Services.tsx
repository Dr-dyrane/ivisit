import React from 'react';
import { Ambulance, HeartPulse, Stethoscope, Bed } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

export default function Services() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  const services = [
    {
      icon: <Ambulance className="h-8 w-8" />,
      title: "Emergency Response",
      description: "24/7 rapid emergency medical response."
    },
    {
      icon: <HeartPulse className="h-8 w-8" />,
      title: "Urgent Care",
      description: "Immediate care for medical needs."
    },
    {
      icon: <Bed className="h-8 w-8" />,
      title: "Bed Booking",
      description: "Reserve hospital beds in advance."
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "General Check-ups",
      description: "Comprehensive health assessments."
    }
  ];

  return (
    <div id="services" className="py-24 bg-background">
      <animated.div style={fadeIn} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Expert care when you need it most
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-accent-500/10 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative h-full bg-card backdrop-blur-sm p-8 rounded-3xl border border-border">
                <div className="text-accent-500">{service.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-muted-foreground">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </animated.div>
    </div>
  );
}