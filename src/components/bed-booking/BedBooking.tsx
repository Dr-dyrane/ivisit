import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import SpecialtySelector from './SpecialtySelector';
import HospitalList from './HospitalList';
import { specialties, hospitals } from '../../data/hospitals';
import OpenStreetMap from '../map/OpenStreetMap';
import BookingHeader from './BookingHeader';
import BookingPanel from './BookingPanel';
import { useBookingState } from './hooks/useBookingState';

export default function BedBooking() {
  const {
    selectedSpecialty,
    selectedHospital,
    userLocation,
    handleSpecialtySelect,
    handleHospitalSelect,
    handleBookBed
  } = useBookingState();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  });

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
            onHospitalSelect={handleHospitalSelect}
            mapType="hospital"
          />
        </div>

        {/* Booking Panel */}
        <div className="w-full lg:w-[400px]">
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
  );
}