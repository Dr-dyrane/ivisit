import React from 'react';
import { Bed, MapPin, Clock, Star, ChevronRight, Activity, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function HospitalCard({ 
  hospital, 
  isSelected, 
  onSelect,
  onCall 
}: HospitalCardProps) {
  return (
    <div
      onClick={() => onSelect(hospital.id)}
      className={`group relative rounded-3xl p-6 cursor-pointer transition-all duration-500 border-border/50 bg-background/20 backdrop-blur-3xl overflow-hidden ${
        isSelected 
          ? 'ring-2 ring-blue-500 border-transparent shadow-[0_0_40px_rgba(59,130,246,0.1)]' 
          : 'hover:border-blue-500/30'
      }`}
    >
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex gap-6 items-start">
          <div className="relative w-24 h-24 flex-shrink-0">
            <ImageWithFallback
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-all duration-700"
            />
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-tight">{hospital.name}</h3>
              <div className="flex items-center gap-1.5 bg-blue-500/10 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 text-blue-500 fill-current" />
                <span className="text-xs font-bold text-blue-500">{hospital.rating}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">{hospital.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">{hospital.waitTime} Wait</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border/50">
                <Bed className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-bold text-foreground">{hospital.availableBeds} Beds</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <ShieldCheck className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-bold text-blue-500 uppercase tracking-tight text-[10px]">Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {hospital.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 text-xs font-semibold uppercase tracking-tight rounded-lg bg-secondary/30 text-muted-foreground border border-border/50"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {isSelected && (
        <Button
          variant="accent"
          className="mt-6 w-full py-5 rounded-2xl group/btn bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 font-bold"
          onClick={(e) => {
            e.stopPropagation();
            onCall(hospital.id);
          }}
        >
          <div className="flex items-center justify-center gap-3 w-full">
            <span className="text-sm uppercase tracking-wider">Confirm Bed Allocation</span>
            <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </Button>
      )}

      {/* Tactical Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-500/10 rounded-tl-[2.5rem] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-500/10 rounded-br-[2.5rem] pointer-events-none" />
    </div>
  );
}