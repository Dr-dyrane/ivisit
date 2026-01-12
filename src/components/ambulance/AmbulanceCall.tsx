import { useState, useEffect, useRef } from 'react';
import { Activity, Satellite, ShieldCheck, Target } from 'lucide-react';
import { Container } from '../ui/Container';
import EmergencyHeader from './EmergencyHeader';
import { ServiceTypeSelector } from './ServiceTypeSelector';
import HospitalCard from './HospitalCard';
import OpenStreetMap from '../map/OpenStreetMap';
import { useTheme } from '@/providers/ThemeContext';

const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    distance: '0.5 km',
    eta: '3 mins',
    rating: 4.8,
    ambulances: 3,
    type: 'Premium',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=300&h=200',
    specialties: ['Emergency', 'General Care'],
    availableBeds: 5,
    waitTime: '10 mins'
  },
  {
    id: '2',
    name: "St. Mary's Medical Center",
    distance: '0.8 km',
    eta: '5 mins',
    rating: 4.9,
    ambulances: 2,
    type: 'Premium',
    price: '$180',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=300&h=200',
    specialties: ['Emergency', 'Cardiology'],
    availableBeds: 3,
    waitTime: '15 mins'
  },
  {
    id: '3',
    name: 'Emergency Care Unit',
    distance: '1.0 km',
    eta: '6 mins',
    rating: 4.7,
    ambulances: 4,
    type: 'Standard',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300&h=200',
    specialties: ['Emergency'],
    availableBeds: 7,
    waitTime: '5 mins'
  }
];

export default function AmbulanceCall() {
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<'Premium' | 'Standard'>('Premium');
  const [userLocation] = useState<[number, number] | null>(null);
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

  const handleEmergencyCall = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
    console.log(`Emergency service requested from hospital ${hospitalId}`);
  };

  const filteredHospitals = hospitals.filter(hospital => hospital.type === serviceType);

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
        {/* Map Section with HUD Overlays */}
        <div className="flex-auto h-[40vh] sm:h-[45vh] md:h-[calc(100vh-5rem)] bg-card/20 backdrop-blur-md relative border-b lg:border-b-0 lg:border-r border-border/50">
          <OpenStreetMap
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            userLocation={userLocation}
            onHospitalSelect={setSelectedHospital}
            mapType="ambulance"
          />
          
          {/* Tactical HUD Overlays for Map */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-none space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Live Tracking</span>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-wider">Signal</span>
                <span className="text-xs sm:text-sm font-bold text-primary">ENCRYPTED</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-wider">Latency</span>
                <span className="text-xs sm:text-sm font-bold text-primary">12ms</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-3">
              <Satellite className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Stable</span>
            </div>
          </div>
        </div>

        {/* Service Selection Panel */}
        <div className="w-full lg:w-[480px] overflow-auto bg-background/40 backdrop-blur-3xl border-t border-border/50">
          <Container className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <EmergencyHeader />
            
            <div className="p-4 rounded-xl sm:rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-primary">Emergency Protocol</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Response units are on standby. Select a service to deploy.
              </p>
            </div>

            <ServiceTypeSelector
              selectedType={serviceType}
              onSelect={setServiceType}
            />

            {/* Emergency Call Button */}
            <button 
              onClick={() => window.location.href = 'tel:911'}
              className="group relative w-full overflow-hidden bg-primary text-white px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 sm:gap-4 font-bold uppercase tracking-[0.15em] shadow-lg sm:shadow-2xl shadow-primary/20 active:scale-95 h-12 sm:h-14"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <Activity className="h-5 sm:h-6 w-5 sm:w-6 animate-pulse flex-shrink-0" />
              <span className="text-sm sm:text-base">Call SOS</span>
            </button>

            {/* Available Services */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">Nearby Units</h3>
                </div>
                <span className="text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase">
                  {filteredHospitals.length} Active
                </span>
              </div>

              <div className="space-y-4">
                {filteredHospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.id}
                    hospital={hospital}
                    isSelected={selectedHospital === hospital.id}
                    onSelect={setSelectedHospital}
                    onCall={handleEmergencyCall}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}