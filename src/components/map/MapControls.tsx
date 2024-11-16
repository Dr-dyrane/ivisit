import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MapControlsProps {
  emergencyMode: boolean;
  onEmergencyToggle: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  emergencyMode,
  onEmergencyToggle,
}) => {
  return (
    <button
      onClick={onEmergencyToggle}
      className={`absolute bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300 ${
        emergencyMode
          ? 'bg-red-600 animate-pulse'
          : 'bg-white hover:bg-red-50'
      }`}
    >
      <AlertCircle className={`w-8 h-8 ${emergencyMode ? 'text-white' : 'text-red-600'}`} />
    </button>
  );
};