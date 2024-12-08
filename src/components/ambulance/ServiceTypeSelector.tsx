import React from 'react';
import { Shield } from 'lucide-react';

export function ServiceTypeSelector({ selectedType, onSelect }: ServiceTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(['Premium', 'Standard'] as const).map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`p-4 rounded-xl border transition-all duration-300 ${
            selectedType === type
              ? 'bg-accent-500/10 border-accent-500/20 text-foreground dark:text-white'
              : 'bg-card hover:bg-card/80 border-border text-foreground dark:text-white hover:border-accent-500/20'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Shield className={`h-5 w-5 ${
              selectedType === type ? 'text-accent-500' : 'text-muted-foreground'
            }`} />
            {type === 'Premium' && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-500/10 text-accent-500">
                Recommended
              </span>
            )}
          </div>
          <h3 className="text-lg font-medium">{type}</h3>
          <p className="text-sm text-muted-foreground">
            {type === 'Premium' 
              ? 'Priority response, specialized care'
              : 'Basic emergency response'
            }
          </p>
        </button>
      ))}
    </div>
  );
}