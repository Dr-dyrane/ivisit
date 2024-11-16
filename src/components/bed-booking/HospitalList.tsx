import React from 'react';
import HospitalCard from './HospitalCard';
import { Hospital } from '../../types/hospital';

interface HospitalListProps {
  hospitals: Hospital[];
  selectedSpecialty: string;
  selectedHospital: string | null;
  onHospitalSelect: (id: string) => void;
  onBookBed: (id: string) => void;
}

export default function HospitalList({
  hospitals,
  selectedSpecialty,
  selectedHospital,
  onHospitalSelect,
  onBookBed
}: HospitalListProps) {
  const filteredHospitals = hospitals.filter(
    hospital => hospital.specialties.includes(selectedSpecialty)
  );

  return (
    <div className="space-y-4">
      {filteredHospitals.map((hospital) => (
        <HospitalCard
          key={hospital.id}
          hospital={hospital}
          isSelected={selectedHospital === hospital.id}
          onSelect={onHospitalSelect}
          onBook={onBookBed}
        />
      ))}
    </div>
  );
}