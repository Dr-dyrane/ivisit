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
    <div className="min-h-screen bg-transparent">
      <div className="relative flex flex-col lg:flex-row min-h-screen pt-20">
        {/* Map Section */}
        <div className="flex-auto h-[50vh] md:h-[calc(100vh-5rem)] bg-card/20 backdrop-blur-md relative border-r border-white/5">
          <OpenStreetMap
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            userLocation={userLocation}
            onHospitalSelect={handleHospitalSelect}
            mapType="hospital"
          />
        </div>

        {/* Booking Panel */}
        <div className="w-full lg:w-[450px] bg-background/80 backdrop-blur-xl border-t lg:border-t-0 border-white/10 overflow-auto">
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