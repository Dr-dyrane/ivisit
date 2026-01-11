import { useState } from 'react';
import { useSpring } from '@react-spring/web';
import { Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import EmergencyHeader from './EmergencyHeader';
import { ServiceTypeSelector } from './ServiceTypeSelector';
import HospitalCard from './HospitalCard';
import OpenStreetMap from '../map/OpenStreetMap';

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

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  });

  const handleEmergencyCall = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
    // Here you would typically integrate with a real emergency service API
    console.log(`Emergency service requested from hospital ${hospitalId}`);
  };

  const filteredHospitals = hospitals.filter(hospital => hospital.type === serviceType);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="relative flex flex-col lg:flex-row min-h-screen pt-20">
        {/* Map Section */}
        <div className="flex-auto h-[50vh] md:h-[calc(100vh-5rem)] bg-card/20 backdrop-blur-md relative border-r border-white/5">
          <OpenStreetMap
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            userLocation={userLocation}
            onHospitalSelect={setSelectedHospital}
            mapType="ambulance"
          />
        </div>

        {/* Service Selection Panel */}
        <div className="w-full lg:w-[450px] overflow-auto bg-background/80 backdrop-blur-xl border-t lg:border-t-0 border-white/10">
          <Container className="p-8 space-y-8">
            <EmergencyHeader />
            
            <ServiceTypeSelector
              selectedType={serviceType}
              onSelect={setServiceType}
            />

            {/* Emergency Call Button */}
            <button 
              onClick={() => window.location.href = 'tel:911'}
              className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 font-bold uppercase tracking-widest shadow-lg shadow-accent/20"
            >
              <Phone className="h-6 w-6 animate-pulse" />
              <span>SOS TRANSMISSION</span>
            </button>

            {/* Available Services */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-muted-foreground">
                <h3 className="font-medium">Available Services</h3>
                <span className="text-sm">{filteredHospitals.length} nearby</span>
              </div>

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
          </Container>
        </div>
      </div>
    </div>
  );
}