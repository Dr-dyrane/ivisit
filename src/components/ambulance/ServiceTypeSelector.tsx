import React from 'react';
import { Shield, Zap, Diamond, CheckCircle2 } from 'lucide-react';

interface ServiceTypeSelectorProps {
  selectedType: 'Premium' | 'Standard';
  onSelect: (type: 'Premium' | 'Standard') => void;
}

export function ServiceTypeSelector({ selectedType, onSelect }: ServiceTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(['Premium', 'Standard'] as const).map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`relative p-5 rounded-2xl border transition-all duration-500 overflow-hidden group/btn ${
            selectedType === type
              ? 'bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.1)]'
              : 'bg-secondary/20 border-border/50 hover:border-primary/20'
          }`}
        >
          {selectedType === type && (
            <div className="absolute top-0 right-0 p-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
          )}
          
          <div className="flex flex-col items-start gap-3 relative z-10">
            <div className={`p-2 rounded-xl transition-colors duration-500 ${
              selectedType === type ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
            }`}>
              {type === 'Premium' ? <Diamond className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
            </div>
            
            <div className="text-left">
              <h3 className={`text-sm font-black uppercase tracking-[0.2em] mb-1 ${
                selectedType === type ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {type === 'Premium' ? 'Elite Tier' : 'Standard'}
              </h3>
              <p className="text-[10px] font-bold text-muted-foreground/60 leading-tight uppercase tracking-widest">
                {type === 'Premium' 
                  ? 'Priority Uplink • < 5min'
                  : 'Basic Dispatch • < 15min'
                }
              </p>
            </div>
          </div>

          <div className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ${
            selectedType === type ? 'w-full' : 'w-0 group-hover/btn:w-1/3'
          }`} />
        </button>
      ))}
    </div>
  );
}