import React from 'react';
import { Shield, Lock, FileCheck, Eye } from 'lucide-react';

const signals = [
  {
    icon: <Shield className="h-5 w-5" />,
    label: "HIPAA Compliant",
    description: "Enterprise-grade data protection"
  },
  {
    icon: <Lock className="h-5 w-5" />,
    label: "End-to-End Encrypted",
    description: "AES-256 protocol security"
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    label: "Audited Protocols",
    description: "Zero-fail medical standards"
  },
  {
    icon: <Eye className="h-5 w-5" />,
    label: "Privacy First",
    description: "No third-party data sharing"
  }
];

export default function TrustSignals() {
  return (
    <div className="py-12 border-y border-border/50 bg-secondary/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {signals.map((signal, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3 group">
              <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:scale-110 transition-transform duration-500">
                {signal.icon}
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-1">
                  {signal.label}
                </h4>
                <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider opacity-60">
                  {signal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
