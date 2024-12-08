import React from 'react';
import { Star, MapPin, Clock, Ambulance, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function HospitalCard({
  hospital,
  isSelected,
  onSelect,
  onCall
}: HospitalCardProps) {
  return (
    <Card
      className={`cursor-pointer ${
        isSelected 
          ? 'ring-2 ring-accent-500 bg-accent-500/10' 
          : 'hover:bg-accent-500/5'
      }`}
      onClick={() => onSelect(hospital.id)}
    >
      <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-4">
        <ImageWithFallback
          src={hospital.image}
          alt={hospital.name}
          className="w-full sm:w-1/3 lg:w-full h-auto object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-medium text-foreground">{hospital.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-muted-foreground">{hospital.rating}</span>
              </div>
            </div>
            <span className="text-lg font-medium text-foreground">{hospital.price}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-accent-500" />
              <span className="text-sm text-muted-foreground">{hospital.distance}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-accent-500" />
              <span className="text-sm text-muted-foreground">ETA: {hospital.eta}</span>
            </div>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onCall(hospital.id);
          }}
          className="w-full bg-accent-600 text-white px-4 py-3 rounded-lg hover:bg-accent-500 transition-all duration-300 flex items-center justify-between mt-4"
        >
          <div className="flex items-center space-x-2">
            <Ambulance className="h-5 w-5" />
            <span className="font-medium">Request Now</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </Card>
  );
}