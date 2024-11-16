import React from 'react';
import { Stethoscope } from 'lucide-react';

interface SpecialtySelectorProps {
  specialties: string[];
  selectedSpecialty: string;
  onSelect: (specialty: string) => void;
}

export default function SpecialtySelector({ 
  specialties, 
  selectedSpecialty, 
  onSelect 
}: SpecialtySelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {specialties.map((specialty) => (
        <button
          key={specialty}
          onClick={() => onSelect(specialty)}
          className={`p-4 rounded-xl border transition-all duration-300 ${
            selectedSpecialty === specialty
              ? 'bg-accent-500/10 border-accent-500/20 text-foreground dark:text-white'
              : 'bg-card hover:bg-card/80 border-border text-foreground dark:text-white hover:border-accent-500/20'
          }`}
        >
          <Stethoscope className={`h-5 w-5 mb-2 ${
            selectedSpecialty === specialty ? 'text-accent-500' : 'text-muted-foreground'
          }`} />
          <span className="text-sm font-medium">{specialty}</span>
        </button>
      ))}
    </div>
  );
}