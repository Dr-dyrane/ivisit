import { useState } from 'react';

export function useBookingState() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('General Care');
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>([-74.006, 40.7128]);

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSelectedHospital(null);
  };

  const handleHospitalSelect = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
  };

  const handleBookBed = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
    // Here you would typically integrate with a booking API
    console.log(`Bed booked at hospital ${hospitalId}`);
  };

  return {
    selectedSpecialty,
    selectedHospital,
    userLocation,
    handleSpecialtySelect,
    handleHospitalSelect,
    handleBookBed
  };
}