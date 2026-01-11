import React from 'react';
import { Star, MapPin, Clock, Ambulance, ChevronRight } from 'lucide-react';
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
      className={`cursor-pointer transition-all duration-500 rounded-[2rem] p-6 ${
        isSelected 
          ? 'border-accent/50 bg-accent/5 shadow-[0_0_30px_rgba(134,16,14,0.1)]' 
          : 'hover:border-white/20'
      }`}
      onClick={() => onSelect(hospital.id)}
    >
      <div className="flex flex-col gap-6">
        <div className="relative group">
          <ImageWithFallback
            src={hospital.image}
            alt={hospital.name}
            className="w-full h-48 object-cover rounded-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
            {hospital.type}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{hospital.name}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <Star className="h-3 w-3 text-accent fill-current" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{hospital.rating} Rating</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-white">{hospital.price}</span>
              <p className="text-[10px] font-bold text-accent uppercase tracking-tighter">Base Rate</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <MapPin className="h-4 w-4 text-accent" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Distance</span>
                <span className="text-xs font-bold text-white">{hospital.distance}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <Clock className="h-4 w-4 text-accent" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Response</span>
                <span className="text-xs font-bold text-white">{hospital.eta}</span>
              </div>
            </div>
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
          className="w-full py-6 rounded-xl mt-6 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Ambulance className="h-5 w-5 animate-pulse" />
            <span className="font-black text-xs uppercase tracking-[0.2em]">Deploy Unit</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </Card>
  );
}