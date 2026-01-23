import { Check, X, Zap, Shield, Clock, Map } from 'lucide-react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';

const features = [
  {
    name: "Average Dispatch ETA",
    legacy: "20-30 Minutes",
    ivisit: "5 Minutes",
    icon: <Clock className="h-5 w-5" />
  },
  {
    name: "GPS Tracking Precision",
    legacy: "Cellular Tower Triangulation",
    ivisit: "High-Precision Satellite (GNSS)",
    icon: <Map className="h-5 w-5" />,
    highlight: true
  },
  {
    name: "Network Uptime",
    legacy: "95.5% (Terrestrial)",
    ivisit: "99.9% (Satellite Failover)",
    icon: <Zap className="h-5 w-5" />
  },
  {
    name: "Medical Data Audit",
    legacy: "Manual Paperwork",
    ivisit: "Real-time Blockchain Sync",
    icon: <Shield className="h-5 w-5" />
  }
];

export default function StrategicAdvantage() {
  return (
    <Section id="advantage" className="min-h-screen flex items-center justify-center bg-secondary/20">
      <Container>
        <div className="text-center mb-24">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
            Command-Grade vs<span className="text-primary"> Legacy</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl font-light text-muted-foreground leading-relaxed tracking-[-0.02em]">
            When minutes determine outcomes, legacy systems are a liability. iVisit operates on a different tactical frequency.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative grid grid-cols-1 md:grid-cols-3 items-center p-12 rounded-3xl border transition-all duration-500 ${
                  feature.highlight 
                  ? 'bg-primary/5 border-primary/20 shadow-[0_0_40px_rgba(134,16,14,0.05)] scale-[1.02] z-10' 
                  : 'bg-background border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-6 mb-6 md:mb-0">
                  <div className={`p-3 rounded-xl ${feature.highlight ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}>
                    {feature.icon}
                  </div>
                  <span className="font-light text-sm uppercase tracking-[0.15em] text-foreground">{feature.name}</span>
                </div>
                
                <div className="flex flex-col md:items-center space-y-2 opacity-50 mb-6 md:mb-0">
                  <span className="text-sm font-light uppercase tracking-[0.1em]">Legacy System</span>
                  <div className="flex items-center gap-3 text-base font-light">
                    <X className="h-5 w-5 text-destructive" />
                    {feature.legacy}
                  </div>
                </div>

                <div className="flex flex-col md:items-end space-y-2">
                  <span className={`text-sm font-light uppercase tracking-[0.1em] ${feature.highlight ? 'text-primary' : 'text-primary/70'}`}>iVisit Command</span>
                  <div className="flex items-center gap-3 text-base font-black text-foreground">
                    <Check className="h-5 w-5 text-primary" />
                    {feature.ivisit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex justify-center">
          <p className="text-sm font-light uppercase tracking-[0.3em] text-muted-foreground opacity-50">
            AUDITED PERFORMANCE METRICS • 2024 OPERATIONAL CYCLE
          </p>
        </div>
      </Container>
    </Section>
  );
}
