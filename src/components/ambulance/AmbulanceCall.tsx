import { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Phone, Activity, Satellite, ShieldCheck, Target } from 'lucide-react';
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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
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
        <div className="flex-auto h-[50vh] md:h-[calc(100vh-5rem)] bg-card/20 backdrop-blur-md relative border-r border-border/50">
          <OpenStreetMap
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            userLocation={userLocation}
            onHospitalSelect={setSelectedHospital}
            mapType="ambulance"
          />
          
          {/* Tactical HUD Overlays for Map */}
          <div className="absolute top-6 left-6 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-none space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Tracking Active</span>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Signal Status</span>
                <span className="text-[10px] font-bold text-primary">ENCRYPTED</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Latency</span>
                <span className="text-[10px] font-bold text-primary">12ms</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-none">
            <div className="flex items-center gap-3">
              <Satellite className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">SATELLITE UPLINK: STABLE</span>
            </div>
          </div>
        </div>

        {/* Service Selection Panel */}
        <div className="w-full lg:w-[480px] overflow-auto bg-background/40 backdrop-blur-3xl border-t lg:border-t-0 border-border/50">
          <Container className="p-8 space-y-8">
            <EmergencyHeader />
            
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Command Protocol</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Emergency response units are on standby. Select a service tier to initiate rapid deployment.
              </p>
            </div>

            <ServiceTypeSelector
              selectedType={serviceType}
              onSelect={setServiceType}
            />

            {/* Emergency Call Button */}
            <button 
              onClick={() => window.location.href = 'tel:911'}
              className="group relative w-full overflow-hidden bg-primary text-white px-6 py-6 rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <Activity className="h-6 w-6 animate-pulse" />
              <span className="text-sm">INITIATE SOS</span>
            </button>

            {/* Available Services */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">Nearby Tactical Units</h3>
                </div>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-tighter">
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