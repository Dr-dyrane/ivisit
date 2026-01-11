import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RefreshCcw } from 'lucide-react'; // Import Lucid icon
import { useTheme } from '@/providers/ThemeContext';

// Helper Function: Generate random coordinates within a radius
function getRandomCoordinates(baseCoordinates: [number, number], radiusInMiles: number): [number, number] {
  const radiusInKm = radiusInMiles * 1.60934;
  const earthRadiusKm = 6371;

  const lat = baseCoordinates[0];
  const lng = baseCoordinates[1];

  const randomRadius = Math.random() * radiusInKm;
  const randomAngle = Math.random() * 2 * Math.PI;

  const deltaLat = randomRadius / earthRadiusKm;
  const deltaLng = randomRadius / (earthRadiusKm * Math.cos((Math.PI * lat) / 180));

  const newLat = lat + deltaLat * Math.cos(randomAngle);
  const newLng = lng + deltaLng * Math.sin(randomAngle);

  return [newLat, newLng];
}

// Default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const hospitalIcon = new L.Icon({
  iconUrl: '/hospital-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ambulanceIcon = new L.Icon({
  iconUrl: '/ambulance-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const userIcon = new L.Icon({
  iconUrl: '/user-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


// Component to fit the map bounds
function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);

  return null;
}

export default function OpenStreetMap({ mapType }: OpenStreetMapProps) {
  const defaultLocation: [number, number] = [6.5244, 3.3792]; // Default to Lagos coordinates
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null); // Initial state set to null
  const [hospitals, setHospitals] = useState<{ name: string; coordinates: [number, number] }[]>([]);

  const { theme } = useTheme();

  // Fetch user location and generate nearby hospitals
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCurrentLocation(userCoords);

          // Generate 5 random hospital locations with names
          const hospitalNames = [
            'City General Hospital',
            'St. Mary\'s Medical Center',
            'Emergency Care Unit',
            'Central Health Clinic',
            'Greenfield Hospital',
          ];
          const nearbyHospitals = Array.from({ length: 5 }, (_, index) => ({
            name: hospitalNames[index] || 'Unnamed Hospital', // Default name if not available
            coordinates: getRandomCoordinates(userCoords, 25), // 25-mile radius
          }));
          setHospitals(nearbyHospitals);
        },
        () => {
          // In case of error, set to default location
          setCurrentLocation(defaultLocation);
        }
      );
    } else {
      // If geolocation is not supported, fall back to default location
      setCurrentLocation(defaultLocation);
    }
  }, []);

  // Ensure data is available before rendering the map
  if (!currentLocation || hospitals.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span>Loading map...</span>
      </div>
    );
  }

  // Calculate bounds to include user's location and hospitals
  const allLocations = [currentLocation, ...hospitals.map((h) => h.coordinates)];
  const bounds = L.latLngBounds(allLocations);

  // Function to reload the map (e.g., reset hospitals and re-center map)
  const handleReload = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCurrentLocation(userCoords);

          // Re-generate hospitals with new coordinates
          const nearbyHospitals = Array.from({ length: 5 }, (_, index) => ({
            name: `Hospital ${index + 1}`,
            coordinates: getRandomCoordinates(userCoords, 5), // 5-mile radius
          }));
          setHospitals(nearbyHospitals);
        }
      );
    }
  };

  // Map tile URLs for dark and light themes
  const tileLayerUrl = theme === 'dark'
    ? 'https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}' // Dark mode tile layer
    : 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'; // Light mode tile layer

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={currentLocation}
        zoom={16}
        className="h-full w-full z-0"
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom
      >

        <TileLayer
          url={tileLayerUrl}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          maxZoom={19}
        />

        {/* Fit map bounds */}
        <FitBounds bounds={bounds} />

        {/* User's current location */}
        <Marker
          position={currentLocation}
          icon={userIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-accent">Deployment Point</h3>
              <p className="text-sm">Your current tactical position</p>
            </div>
          </Popup>
        </Marker>

        {/* Hospital markers with names */}
        {hospitals.map((hospital, index) => {
          const { name, coordinates } = hospital;
          if (!coordinates || coordinates.length !== 2) {
            return null; // Skip rendering invalid data
          }

          return (
            <Marker key={index} position={coordinates} icon={index === 0 ? ambulanceIcon : hospitalIcon}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-primary">{name || 'Medical Facility'}</h3>
                  <p className="text-xs font-mono">
                    LOC: {coordinates[0].toFixed(5)}, {coordinates[1].toFixed(5)}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* CTA Button */}
      <button
        onClick={handleReload}
        className="absolute bottom-4 right-4 p-4 bg-accent-500 text-white rounded-full shadow-lg hover:bg-accent-600 transition-all duration-300"
        style={{ zIndex: 999 }}
      >
        <RefreshCcw size={16} /> {/* Lucid React Icon for refresh */}
      </button>

      <style>{`
        .leaflet-container {
          background: #0B0F1A;
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
        .leaflet-tile {
          filter: brightness(0.6) contrast(1.2);
        }
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: #121826 !important;
          color: white !important;
          border: 1px solid rgba(134, 16, 14, 0.3);
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}
