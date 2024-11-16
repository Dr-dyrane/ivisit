import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface OpenStreetMapProps {
  mapType: 'hospital';
}

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
  const defaultLocation: [number, number] = [6.5244, 3.3792]; // Lagos coordinates
  const [currentLocation, setCurrentLocation] = useState<[number, number]>(defaultLocation);
  const [hospitals, setHospitals] = useState<[number, number][]>([]);

  // Fetch user location and generate nearby hospitals
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setCurrentLocation(userCoords);

        // Generate 5 random hospital locations within a 5-mile radius
        const nearbyHospitals = Array.from({ length: 5 }, () =>
          getRandomCoordinates(userCoords, 5) // 5-mile radius
        );
        setHospitals(nearbyHospitals);
      },
      () => {
        setCurrentLocation(defaultLocation); // Fallback to default
      }
    );
  }, []);

  // Calculate bounds to include user's location and hospitals
  const allLocations = [currentLocation, ...hospitals];
  const bounds = L.latLngBounds(allLocations);

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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Fit map bounds */}
        <FitBounds bounds={bounds} />

        {/* User's current location */}
        <Marker
          position={currentLocation}
          icon={new L.Icon({
            iconUrl: '/user-marker.svg',
            iconSize: [30, 45],
            iconAnchor: [15, 45],
            popupAnchor: [1, -34],
          })}
        >
          <Popup>
            <div>
              <h3>You are here!</h3>
            </div>
          </Popup>
        </Marker>

        {/* Hospital markers */}
        {hospitals.map((coords, index) => (
          <Marker
            key={index}
            position={coords}
            icon={hospitalIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">Hospital #{index + 1}</h3>
                <p>Coordinates: {coords[0].toFixed(5)}, {coords[1].toFixed(5)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        .leaflet-container {
          background: #f8fafc;
        }
        .dark .leaflet-container {
          background: #1e293b;
        }
      `}</style>
    </div>
  );
}
