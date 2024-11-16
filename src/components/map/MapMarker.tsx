import React from 'react';

interface MapMarkerProps {
  type: 'hospital' | 'user';
  isSelected?: boolean;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ type, isSelected }) => {
  if (type === 'hospital') {
    return (
      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform-gpu transition-all duration-300 hover:scale-110 border-2 ${
        isSelected ? 'border-red-500' : 'border-red-600/50'
      }">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-20"></div>
          <svg className="w-6 h-6 text-red-500 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 16V8M16 12h8M4 4v16M2 8h4M2 16h4M12 4v16M10 8h4M10 16h4" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-blue-500 rounded-full blur-md animate-pulse"></div>
      <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg relative z-10"></div>
    </div>
  );
};