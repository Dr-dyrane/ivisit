import React from 'react';
import { Check, X, Zap, Shield, Clock, Map } from 'lucide-react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';

const features = [
  {
    name: "Average Dispatch ETA",
    legacy: "20-30 Minutes",
    ivisit: "5 Minutes",
    icon: <Clock className="h-4 w-4" />
  },
  {
    name: "GPS Tracking Precision",
    legacy: "Cellular Tower Triangulation",
    ivisit: "High-Precision Satellite (GNSS)",
    icon: <Map className="h-4 w-4" />,
    highlight: true
  },
  {
    name: "Network Uptime",
    legacy: "95.5% (Terrestrial)",
    ivisit: "99.9% (Satellite Failover)",
    icon: <Zap className="h-4 w-4" />
  },
  {
    name: "Medical Data Audit",
    legacy: "Manual Paperwork",
    ivisit: "Real-time Blockchain Sync",
    icon: <Shield className="h-4 w-4" />
  }
];

export default function StrategicAdvantage() {
  return (
    <Section id="advantage" className="bg-secondary/20 relative overflow-hidden py-32">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <Container>
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-6">
            Strategic Comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6">
            Command-Grade vs. Legacy<span className="text-primary">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-light">
            When minutes determine outcomes, legacy systems are a liability. iVisit operates on a different tactical frequency.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative grid grid-cols-1 md:grid-cols-3 items-center p-8 rounded-3xl border transition-all duration-500 ${
                  feature.highlight 
                  ? 'bg-primary/5 border-primary/20 shadow-[0_0_40px_rgba(134,16,14,0.05)] scale-[1.02] z-10' 
                  : 'bg-background border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className={`p-2 rounded-lg ${feature.highlight ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}>
                    {feature.icon}
                  </div>
                  <span className="font-black text-xs sm:text-sm uppercase tracking-widest text-foreground">{feature.name}</span>
                </div>
                
                <div className="flex flex-col md:items-center space-y-1 opacity-50 mb-4 md:mb-0">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-tighter">Legacy System</span>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <X className="h-4 w-4 text-destructive" />
                    {feature.legacy}
                  </div>
                </div>

                <div className="flex flex-col md:items-end space-y-1">
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-tighter ${feature.highlight ? 'text-primary' : 'text-primary/70'}`}>iVisit Command</span>
                  <div className="flex items-center gap-2 text-sm font-black text-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {feature.ivisit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">
            AUDITED PERFORMANCE METRICS • 2024 OPERATIONAL CYCLE
          </p>
        </div>
      </Container>
    </Section>
  );
}
