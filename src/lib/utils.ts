import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

export function getMapboxStaticImageUrl(lng: number, lat: number, zoom: number, width: number, height: number) {
  return `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${lng},${lat},${zoom},0/${width}x${height}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
}