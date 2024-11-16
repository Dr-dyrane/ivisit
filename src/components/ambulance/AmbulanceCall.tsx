import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import EmergencyHeader from './EmergencyHeader';
import { ServiceTypeSelector } from './ServiceTypeSelector';
import HospitalCard from './HospitalCard';
import { Hospital } from '../../types/hospital';
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
    <div className="min-h-screen mt-20 bg-background">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS4yMjY3NiAwQzEuOTEzNzQgMCAyLjQ1MzUxIDAuNTM5NzczIDIuNDUzNTEgMS4yMjY3NkMyLjQ1MzUxIDEuOTEzNzQgMS45MTM3NCAyLjQ1MzUxIDEuMjI2NzYgMi40NTM1MUMwLjUzOTc3MyAyLjQ1MzUxIDAgMS45MTM3NCAwIDEuMjI2NzZDMCAwLjUzOTc3MyAwLjUzOTc3MyAwIDEuMjI2NzYgMFoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]" />
      
      <div className="relative flex flex-col lg:flex-row h-screen">
        {/* Map Section */}
        <div className="flex-1 h-[50vh] lg:h-full bg-card/50 backdrop-blur-sm relative">
          <OpenStreetMap
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            userLocation={userLocation}
            onHospitalSelect={setSelectedHospital}
            mapType="ambulance"
          />
        </div>

        {/* Service Selection Panel */}
        <div className="w-full lg:w-[400px] overflow-auto bg-card/50 backdrop-blur-sm border-l border-border">
          <Container className="p-6 space-y-6">
            <EmergencyHeader />
            
            <ServiceTypeSelector
              selectedType={serviceType}
              onSelect={setServiceType}
            />

            {/* Emergency Call Button */}
            <button 
              onClick={() => window.location.href = 'tel:911'}
              className="w-full bg-accent-600 hover:bg-accent-500 text-white dark:text-white px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
            >
              <Phone className="h-5 w-5" />
              <span>Call Emergency (911)</span>
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