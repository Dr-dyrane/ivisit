import React from 'react';
import { Bed, MapPin, Clock, Star, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Hospital } from '../../types/hospital';
import ImageWithFallback from '../ImageWithFallback';

interface HospitalCardProps {
  hospital: Hospital;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onBook: (id: string) => void;
}

export default function HospitalCard({ 
  hospital, 
  isSelected, 
  onSelect,
  onBook 
}: HospitalCardProps) {
  return (
    <div
      onClick={() => onSelect(hospital.id)}
      className={`relative group rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'bg-accent-500/10 ring-2 ring-accent-500/20 text-foreground' 
          : 'bg-card/30 hover:bg-card/50 backdrop-blur-sm text-foreground'
      }`}
    >
      <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-6">
        <ImageWithFallback
          src={hospital.image}
          alt={hospital.name}
          className="w-full sm:w-32 lg:w-full h-auto sm:h-24 lg:h-auto object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium text-foreground">{hospital.name}</h3>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-muted-foreground">{hospital.rating}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-accent-500" />
              <span className="text-sm text-muted-foreground">{hospital.distance}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-accent-500" />
              <span className="text-sm text-muted-foreground">Wait: {hospital.waitTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bed className="h-4 w-4 text-accent-500" />
              <span className="text-sm text-muted-foreground">{hospital.availableBeds} beds</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="accent"
        className="mt-4 w-full"
        onClick={(e) => {
          e.stopPropagation();
          onBook(hospital.id);
        }}
      >
        <div className="flex items-center justify-between w-full">
          <span>Book Bed</span>
          <ChevronRight className="h-5 w-5" />
        </div>
      </Button>
    </div>
  );
}