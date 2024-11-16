export interface Hospital {
  id: string;
  name: string;
  distance: string;
  specialties: string[];
  availableBeds: number;
  rating: number;
  waitTime: string;
  image: string;
  eta?: string;
  ambulances?: number;
  type?: 'Premium' | 'Standard';
  price?: string;
}