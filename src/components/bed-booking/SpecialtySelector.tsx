import React from 'react';
import { Stethoscope, HeartPulse, Activity, Bone, Dna, Brain, CheckCircle2 } from 'lucide-react';

export default function SpecialtySelector({ 
  specialties, 
  selectedSpecialty, 
  onSelect 
}: SpecialtySelectorProps) {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'emergency': return <Activity className="h-5 w-5" />;
      case 'cardiology': return <HeartPulse className="h-5 w-5" />;
      case 'orthopedics': return <Bone className="h-5 w-5" />;
      case 'neurology': return <Brain className="h-5 w-5" />;
      case 'pediatrics': return <Dna className="h-5 w-5" />;
      default: return <Stethoscope className="h-5 w-5" />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {specialties.map((specialty) => (
        <button
          key={specialty}
          onClick={() => onSelect(specialty)}
          className={`relative p-4 rounded-3xl border transition-all duration-300 group/btn overflow-hidden ${
            selectedSpecialty === specialty
              ? 'bg-blue-500/10 border-blue-500 shadow-[0_8px_30px_rgba(59,130,246,0.1)]'
              : 'bg-background/40 border-border/50 hover:border-blue-500/30 backdrop-blur-sm'
          }`}
        >
          {selectedSpecialty === specialty && (
            <div className="absolute top-0 right-0 p-3">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
            </div>
          )}
          
          <div className="flex flex-col items-start gap-3 relative z-10">
            <div className={`p-3 rounded-2xl transition-all duration-300 ${
              selectedSpecialty === specialty ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-secondary/50 text-muted-foreground'
            }`}>
              {getIcon(specialty)}
            </div>
            
            <div className="text-left">
              <h3 className={`text-sm font-bold tracking-tight mb-0.5 ${
                selectedSpecialty === specialty ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {specialty}
              </h3>
              <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wide">Available Units</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}