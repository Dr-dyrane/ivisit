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
      icon: <Ambulance className="h-6 sm:h-8 w-6 sm:w-8" />,
      title: "Emergency Response",
      description: "24/7 rapid emergency medical response. GPS-tracked command."
    },
    {
      icon: <HeartPulse className="h-6 sm:h-8 w-6 sm:w-8" />,
      title: "Urgent Care",
      description: "Immediate care for medical needs with high-priority dispatch."
    },
    {
      icon: <Bed className="h-6 sm:h-8 w-6 sm:w-8" />,
      title: "Bed Booking",
      description: "Reserve hospital beds in advance with real-time availability."
    },
    {
      icon: <Stethoscope className="h-6 sm:h-8 w-6 sm:w-8" />,
      title: "General Check-ups",
      description: "Comprehensive health assessments for preventive care."
    }
  ];

  return (
    <div id="services" className="min-h-screen flex items-center justify-center bg-transparent relative z-10">
      <animated.div style={fadeIn} className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
              Strategic Services<span className="text-primary">.</span>
            </h2>
            <p className="text-xl sm:text-2xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed tracking-[-0.02em]">
              Deploying medical intelligence and rapid response protocols across the metropolitan area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-12 rounded-3xl group cursor-default transition-all duration-500 hover:scale-[1.02] bg-background/20 backdrop-blur-3xl"
              >
                <div className="relative z-10">
                  <div className="mb-8 inline-flex p-6 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6 tracking-tight">{service.title}</h3>
                  <p className="text-lg font-light text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </animated.div>
    </div>
  );
}