import React from 'react';
import { Star, MapPin, Clock, Ambulance, ChevronRight, Bed, Waves, Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';
import { Button } from '../ui/Button';

export default function HospitalCard({
  hospital,
  isSelected,
  onSelect,
  onCall
}: HospitalCardProps) {
  return (
    <Card
      className={`group cursor-pointer transition-all duration-500 rounded-3xl p-4 sm:p-6 border-border/50 bg-background/20 backdrop-blur-3xl overflow-hidden relative ${
        isSelected 
          ? 'ring-2 ring-primary border-transparent shadow-[0_0_40px_rgba(var(--primary),0.1)]' 
          : 'hover:border-primary/30'
      }`}
      onClick={() => onSelect(hospital.id)}
    >
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex gap-4 sm:gap-6 items-start">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
            <ImageWithFallback
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {hospital.type}
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-tight">{hospital.name}</h3>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-primary tabular-nums">{hospital.price}</span>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-tight">Est. Cost</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-primary fill-current" />
                <span className="text-xs font-bold text-foreground">{hospital.rating}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-primary/60" />
                <span className="text-xs font-semibold text-muted-foreground">{hospital.waitTime} Wait</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-xl border border-border/50">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="text-xs font-bold text-foreground tabular-nums">{hospital.distance}</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-xl border border-border/50">
                <Clock className="h-3 w-3 text-primary" />
                <span className="text-xs font-bold text-foreground tabular-nums">{hospital.eta} ETA</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-secondary/10 border border-border/50 group-hover:border-primary/20 transition-all">
            <Bed className="h-4 w-4 text-primary mb-1" />
            <span className="text-sm font-bold text-foreground">{hospital.availableBeds}</span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Beds</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-secondary/10 border border-border/50 group-hover:border-primary/20 transition-all">
            <Ambulance className="h-4 w-4 text-primary mb-1" />
            <span className="text-sm font-bold text-foreground">{hospital.ambulances}</span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Units</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-secondary/10 border border-border/50 group-hover:border-primary/20 transition-all">
            <Waves className="h-4 w-4 text-primary mb-1" />
            <span className="text-sm font-bold text-foreground">Stable</span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Comms</span>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <Button 
          variant="accent"
          showOverlay={true}
          onClick={(e) => {
            e.stopPropagation();
            onCall(hospital.id);
          }}
          className="w-full py-5 rounded-2xl mt-6 group/btn shadow-xl shadow-primary/20 font-bold"
        >
          <div className="flex items-center justify-center gap-3 w-full">
            <span className="text-sm uppercase tracking-wider">Request Emergency Pickup</span>
            <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </Button>
      )}

      {/* Tactical Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/20 rounded-tl-[2.5rem] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/20 rounded-br-[2.5rem] pointer-events-none" />
    </Card>
  );
}