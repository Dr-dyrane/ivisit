import React from 'react';
import { animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import SpecialtySelector from './SpecialtySelector';
import HospitalList from './HospitalList';
import BookingHeader from './BookingHeader';
import { specialties, hospitals } from '../../data/hospitals';

interface BookingPanelProps {
  fadeIn: any;
  selectedSpecialty: string;
  selectedHospital: string | null;
  onSpecialtySelect: (specialty: string) => void;
  onHospitalSelect: (hospitalId: string) => void;
  onBookBed: (hospitalId: string) => void;
}

export default function BookingPanel({
  fadeIn,
  selectedSpecialty,
  selectedHospital,
  onSpecialtySelect,
  onHospitalSelect,
  onBookBed
}: BookingPanelProps) {
  return (
    <animated.div style={fadeIn} className="h-full overflow-auto bg-card/50 backdrop-blur-sm border-l border-border">
      <Container className="p-6 space-y-8">
        <BookingHeader />
        
        <SpecialtySelector
          specialties={specialties}
          selectedSpecialty={selectedSpecialty}
          onSelect={onSpecialtySelect}
        />

        <HospitalList
          hospitals={hospitals}
          selectedSpecialty={selectedSpecialty}
          selectedHospital={selectedHospital}
          onHospitalSelect={onHospitalSelect}
          onBookBed={onBookBed}
        />
      </Container>
    </animated.div>
  );
}