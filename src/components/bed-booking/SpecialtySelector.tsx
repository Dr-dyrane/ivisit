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
          className={`relative p-4 rounded-2xl border transition-all duration-500 group/btn overflow-hidden ${
            selectedSpecialty === specialty
              ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
              : 'bg-secondary/20 border-border/50 hover:border-blue-500/20'
          }`}
        >
          {selectedSpecialty === specialty && (
            <div className="absolute top-0 right-0 p-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            </div>
          )}
          
          <div className="flex flex-col items-start gap-3 relative z-10">
            <div className={`p-2 rounded-xl transition-colors duration-500 ${
              selectedSpecialty === specialty ? 'bg-blue-500 text-white' : 'bg-secondary text-muted-foreground'
            }`}>
              {getIcon(specialty)}
            </div>
            
            <div className="text-left">
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                selectedSpecialty === specialty ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {specialty}
              </h3>
              <div className="flex items-center gap-1.5">
                <div className={`w-1 h-1 rounded-full ${selectedSpecialty === specialty ? 'bg-blue-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
                <span className="text-[8px] font-bold text-muted-foreground/50 uppercase tracking-widest">Protocol Active</span>
              </div>
            </div>
          </div>

          <div className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-500 ${
            selectedSpecialty === specialty ? 'w-full' : 'w-0 group-hover/btn:w-1/3'
          }`} />
        </button>
      ))}
    </div>
  );
}