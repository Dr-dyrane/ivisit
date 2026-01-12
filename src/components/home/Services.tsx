import React from 'react';
import { Ambulance, HeartPulse, Stethoscope, Bed } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../ui/Card';

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
      description: "24/7 rapid emergency medical response. GPS-tracked command."
    },
    {
      icon: <HeartPulse className="h-8 w-8" />,
      title: "Urgent Care",
      description: "Immediate care for medical needs with high-priority dispatch."
    },
    {
      icon: <Bed className="h-8 w-8" />,
      title: "Bed Booking",
      description: "Reserve hospital beds in advance with real-time availability."
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "General Check-ups",
      description: "Comprehensive health assessments for preventive care."
    }
  ];

  return (
    <div id="services" className="py-20 sm:py-32 bg-transparent relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <animated.div style={fadeIn} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-24">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Core Operations
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6">
            Strategic Services<span className="text-primary">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-light px-4">
            Deploying medical intelligence and rapid response protocols across the metropolitan area.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 sm:p-10 rounded-[2.5rem] group cursor-default transition-all duration-500 hover:scale-[1.02] bg-background/20 backdrop-blur-3xl"
            >
              <div className="relative z-10">
                <div className="mb-10 inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light text-sm">{service.description}</p>
              </div>
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-xl" />
              </div>
            </Card>
          ))}
        </div>
      </animated.div>
    </div>
  );
}