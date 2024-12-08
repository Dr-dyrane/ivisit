import HospitalCard from './HospitalCard';


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
          onCall={onBookBed}
        />
      ))}
    </div>
  );
}