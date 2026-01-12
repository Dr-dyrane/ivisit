import SpecialtySelector from './SpecialtySelector';
import HospitalList from './HospitalList';
import BookingHeader from './BookingHeader';
import { specialties, hospitals } from '../../data/hospitals';
import { ShieldCheck, Target } from 'lucide-react';

export default function BookingPanel({
  selectedSpecialty,
  selectedHospital,
  onSpecialtySelect,
  onHospitalSelect,
  onBookBed
}: BookingPanelProps) {
  return (
    <div className="h-full relative z-10">
      <div className="space-y-8 sm:space-y-10">
        <BookingHeader />
        
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 ml-1">
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <label className="text-xs sm:text-sm font-bold uppercase tracking-wide text-foreground">Medical Specialty</label>
          </div>
          <SpecialtySelector
            specialties={specialties}
            selectedSpecialty={selectedSpecialty}
            onSelect={onSpecialtySelect}
          />
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between ml-1 mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary flex-shrink-0" />
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wide text-foreground">Select Facility</label>
            </div>
            <span className="text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase">
              {hospitals.filter(h => !selectedSpecialty || h.specialties.includes(selectedSpecialty)).length} Active
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
    </div>
  );
}