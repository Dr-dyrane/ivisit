import { animated } from '@react-spring/web';
import { Container } from '../ui/Container';
import SpecialtySelector from './SpecialtySelector';
import HospitalList from './HospitalList';
import BookingHeader from './BookingHeader';
import { specialties, hospitals } from '../../data/hospitals';


export default function BookingPanel({
  fadeIn,
  selectedSpecialty,
  selectedHospital,
  onSpecialtySelect,
  onHospitalSelect,
  onBookBed
}: BookingPanelProps) {
  return (
    <animated.div style={fadeIn} className="h-full overflow-auto bg-background/60 backdrop-blur-3xl border-l border-white/5 relative z-10">
      <Container className="p-8 space-y-10">
        <BookingHeader />
        
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent ml-2">Operation Mode</label>
          <SpecialtySelector
            specialties={specialties}
            selectedSpecialty={selectedSpecialty}
            onSelect={onSpecialtySelect}
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent ml-2">Facility Selection</label>
          <HospitalList
            hospitals={hospitals}
            selectedSpecialty={selectedSpecialty}
            selectedHospital={selectedHospital}
            onHospitalSelect={onHospitalSelect}
            onBookBed={onBookBed}
          />
        </div>
      </Container>
    </animated.div>
  );
}