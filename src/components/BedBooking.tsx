import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from './ui/Container';
import SpecialtySelector from './bed-booking/SpecialtySelector';
import HospitalList from './bed-booking/HospitalList';
import { specialties, hospitals } from '../data/hospitals';
import Map from './Map';

export default function BedBooking() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('General Care');
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>([-74.006, 40.7128]);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  });

  const handleBookBed = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
    // Here you would typically integrate with a booking API
    console.log(`Bed booked at hospital ${hospitalId}`);
  };

  const mappableHospitals = hospitals.map(h => ({
    id: h.id,
    name: h.name,
    coordinates: [-74.006, 40.7128], // Example coordinates
    ambulances: 0,
    rating: h.rating,
    type: 'Standard' as const
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS4yMjY3NiAwQzEuOTEzNzQgMCAyLjQ1MzUxIDAuNTM5NzczIDIuNDUzNTEgMS4yMjY3NkMyLjQ1MzUxIDEuOTEzNzQgMS45MTM3NCAyLjQ1MzUxIDEuMjI2NzYgMi40NTM1MUMwLjUzOTc3MyAyLjQ1MzUxIDAgMS45MTM3NCAwIDEuMjI2NzZDMCAwLjUzOTc3MyAwLjUzOTc3MyAwIDEuMjI2NzYgMFoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]" />
      
      <div className="relative grid grid-cols-1 lg:grid-cols-3 h-screen">
        {/* Map Section */}
        <div className="lg:col-span-2 h-full bg-card/50 backdrop-blur-sm relative">
          <Map
            hospitals={mappableHospitals}
            selectedHospital={selectedHospital}
            userLocation={userLocation}
            onHospitalSelect={setSelectedHospital}
          />
        </div>

        {/* Booking Panel */}
        <animated.div style={fadeIn} className="h-full overflow-auto bg-card/50 backdrop-blur-sm border-l border-border">
          <Container className="p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">Book a Hospital Bed</h1>
              <p className="text-muted-foreground">Find and reserve a bed at nearby hospitals</p>
            </div>

            <SpecialtySelector
              specialties={specialties}
              selectedSpecialty={selectedSpecialty}
              onSelect={setSelectedSpecialty}
            />

            <HospitalList
              hospitals={hospitals}
              selectedSpecialty={selectedSpecialty}
              selectedHospital={selectedHospital}
              onHospitalSelect={setSelectedHospital}
              onBookBed={handleBookBed}
            />
          </Container>
        </animated.div>
      </div>
    </div>
  );
}