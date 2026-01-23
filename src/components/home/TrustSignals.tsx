import { Shield, Lock, FileCheck, Eye } from 'lucide-react';

const signals = [
  {
    icon: <Shield className="h-6 w-6" />,
    label: "HIPAA Compliant",
    description: "Enterprise-grade data protection"
  },
  {
    icon: <Lock className="h-6 w-6" />,
    label: "End-to-End Encrypted",
    description: "AES-256 protocol security"
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    label: "Audited Protocols",
    description: "Zero-fail medical standards"
  },
  {
    icon: <Eye className="h-6 w-6" />,
    label: "Privacy First",
    description: "No third-party data sharing"
  }
];

export default function TrustSignals() {
  return (
    <div className="py-24 border-y border-border/30 bg-secondary/20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {signals.map((signal, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-6 group">
              <div className="p-4 rounded-2xl bg-primary/5 text-primary group-hover:scale-110 transition-transform duration-500">
                {signal.icon}
              </div>
              <div>
                <h4 className="text-sm font-light text-foreground mb-2 tracking-[0.1em] uppercase">
                  {signal.label}
                </h4>
                <p className="text-xs text-muted-foreground font-light tracking-wide opacity-70">
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
