import React from 'react';

export const MapStyles: React.FC = () => {
  return (
    <style>{`
      .mapboxgl-ctrl-group {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        overflow: hidden;
      }
      .mapboxgl-ctrl-group button {
        width: 40px;
        height: 40px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .mapboxgl-ctrl-group button:last-child {
        border-bottom: none;
      }
      .mapboxgl-popup {
        max-width: 300px;
      }
      .mapboxgl-popup-content {
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 16px;
        color: white;
      }
    `}</style>
  );
};