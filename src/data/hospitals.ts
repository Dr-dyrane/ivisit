export const specialties = [
  'General Care',
  'Emergency',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Oncology'
] as const;

export const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    distance: '0.5 km',
    specialties: ['General Care', 'Emergency', 'Cardiology'],
    availableBeds: 5,
    rating: 4.8,
    waitTime: '10 mins',
    eta: '3 mins',
    ambulances: 3,
    type: 'Premium',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '2',
    name: "St. Mary's Medical Center",
    distance: '0.8 km',
    specialties: ['General Care', 'Neurology', 'Pediatrics'],
    availableBeds: 3,
    rating: 4.9,
    waitTime: '15 mins',
    eta: '5 mins',
    ambulances: 2,
    type: 'Premium',
    price: '$180',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '3',
    name: 'Emergency Care Unit',
    distance: '1.0 km',
    specialties: ['Emergency', 'Orthopedics', 'General Care'],
    availableBeds: 7,
    rating: 4.7,
    waitTime: '5 mins',
    eta: '6 mins',
    ambulances: 4,
    type: 'Standard',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1626315869436-d6781ba69d6f?auto=format&fit=crop&q=80&w=300&h=200'
  }
];