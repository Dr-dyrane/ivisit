import { animated } from '@react-spring/web';
import SpecialtySelector from './SpecialtySelector';
import HospitalList from './HospitalList';
import BookingHeader from './BookingHeader';
import { specialties, hospitals } from '../../data/hospitals';
import { ShieldCheck, Target } from 'lucide-react';

export default function BookingPanel({
  fadeIn,
  selectedSpecialty,
  selectedHospital,
  onSpecialtySelect,
  onHospitalSelect,
  onBookBed
}: BookingPanelProps) {
  return (
    <animated.div style={fadeIn} className="h-full relative z-10">
      <div className="space-y-10">
        <BookingHeader />
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 ml-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Specialty Protocol</label>
          </div>
          <SpecialtySelector
            specialties={specialties}
            selectedSpecialty={selectedSpecialty}
            onSelect={onSpecialtySelect}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between ml-1 mb-2">
            <div className="flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-blue-500" />
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Facility Selection</label>
            </div>
            <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded uppercase tracking-tighter">
              {hospitals.filter(h => !selectedSpecialty || h.specialties.includes(selectedSpecialty)).length} Active Units
            </span>
          </div>
          <HospitalList
            hospitals={hospitals}
            selectedSpecialty={selectedSpecialty}
            selectedHospital={selectedHospital}
            onHospitalSelect={onHospitalSelect}
            onBookBed={onBookBed}
          />
        </div>
      </div>
    </animated.div>
  );
}