import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import SpecialtySelector from './SpecialtySelector';
import HospitalList from './HospitalList';
import { specialties, hospitals } from '../../data/hospitals';
import OpenStreetMap from '../map/OpenStreetMap';
import BookingHeader from './BookingHeader';
import BookingPanel from './BookingPanel';
import { useBookingState } from './hooks/useBookingState';
import { useTheme } from '@/providers/ThemeContext';
import { Activity, ShieldCheck, Database, Layout } from 'lucide-react';

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

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  });

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
        <div className="flex-auto h-[50vh] md:h-[calc(100vh-5rem)] bg-card/20 backdrop-blur-md relative border-r border-border/50">
          <OpenStreetMap
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            userLocation={userLocation}
            onHospitalSelect={handleHospitalSelect}
            mapType="hospital"
          />

          {/* Tactical HUD Overlays */}
          <div className="absolute top-6 left-6 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-none space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Logistics Query Active</span>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Registry Sync</span>
                <span className="text-[10px] font-bold text-blue-400">OPTIMAL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Coverage</span>
                <span className="text-[10px] font-bold text-blue-400">GLOBAL</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-none">
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Bed Availability: Secured</span>
            </div>
          </div>
        </div>

        {/* Booking Panel */}
        <div className="w-full lg:w-[480px] bg-background/40 backdrop-blur-3xl border-t lg:border-t-0 border-border/50 overflow-auto">
          <div className="p-8 space-y-8">
            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Layout className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Logistics Protocol</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Hospital bed registry synchronized. Select medical specialty and facility to initiate reservation.
              </p>
            </div>

            <BookingPanel
              fadeIn={fadeIn}
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