import React, { useState, useEffect, useRef } from 'react';
import { hospitals } from '../../data/hospitals';
import OpenStreetMap from '../map/OpenStreetMap';
import BookingPanel from './BookingPanel';
import { useBookingState } from './hooks/useBookingState';
import { useTheme } from '@/providers/ThemeContext';
import { Database, Layout } from 'lucide-react';

export default function BedBooking() {
  const {
    selectedSpecialty,
    selectedHospital,
    userLocation,
    handleSpecialtySelect,
    handleHospitalSelect,
    handleBookBed
  } = useBookingState();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-transparent relative overflow-hidden group">
      {/* Smarty Blur Background */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(var(--grid-color), 0.05)'}, transparent 80%)`,
        }}
      />

      <div className="relative flex flex-col lg:flex-row min-h-screen pt-20 z-10">
        {/* Map Section with HUD */}
        <div className="flex-auto h-[40vh] sm:h-[45vh] md:h-[calc(100vh-5rem)] bg-card/20 backdrop-blur-md relative border-b lg:border-b-0 lg:border-r border-border/50">
          <OpenStreetMap
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            userLocation={userLocation}
            onHospitalSelect={handleHospitalSelect}
            mapType="hospital"
          />

          {/* Tactical HUD Overlays */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-none space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Registry Query</span>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-wider">Sync</span>
                <span className="text-xs sm:text-sm font-bold text-primary">OPTIMAL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-wider">Coverage</span>
                <span className="text-xs sm:text-sm font-bold text-primary">GLOBAL</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-3">
              <Database className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Beds Secured</span>
            </div>
          </div>
        </div>

        {/* Booking Panel */}
        <div className="w-full lg:w-[480px] bg-background/40 backdrop-blur-3xl border-t border-border/50 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <div className="p-4 rounded-xl sm:rounded-2xl bg-primary/5 border border-primary/20 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Layout className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-primary">Bed Booking</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select specialty and facility to reserve a bed.
              </p>
            </div>

            <BookingPanel
              selectedSpecialty={selectedSpecialty}
              selectedHospital={selectedHospital}
              onSpecialtySelect={handleSpecialtySelect}
              onHospitalSelect={handleHospitalSelect}
              onBookBed={handleBookBed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}