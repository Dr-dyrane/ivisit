import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hospital } from '../../types/hospital';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const hospitalIcon = new L.Icon({
  iconUrl: '/hospital-marker.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Static data for demo - using the same data for both views
const demoHospitals = [
  {
    id: '1',
    name: 'City General Hospital',
    coordinates: [6.5244, 3.3792], // Lagos coordinates
    rating: 4.8,
    distance: '0.5 km',
    availableBeds: 5,
    eta: '3 mins',
    type: 'Premium'
  },
  {
    id: '2',
    name: "St. Mary's Medical Center",
    coordinates: [6.5248, 3.3795], // 300m offset
    rating: 4.9,
    distance: '0.8 km',
    availableBeds: 3,
    eta: '5 mins',
    type: 'Premium'
  },
  {
    id: '3',
    name: 'Emergency Care Unit',
    coordinates: [6.5241, 3.3789], // 200m offset
    rating: 4.7,
    distance: '1.0 km',
    availableBeds: 7,
    eta: '6 mins',
    type: 'Standard'
  }
];

interface MapCenterProps {
  center: [number, number];
  zoom: number;
}

// Component to handle map center updates
function MapCenter({ center, zoom }: MapCenterProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);

    // Set map options for cleaner view
    map.setMinZoom(14); // Restrict minimum zoom
    map.setMaxZoom(18); // Restrict maximum zoom

    // Enable smooth zoom but disable other controls
    map.scrollWheelZoom.enable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();

    // Restrict pan bounds to approximately 1km around center
    const bounds = L.latLngBounds(
      L.latLng(center[0] - 0.005, center[1] - 0.005), // Reduced bounds for closer view
      L.latLng(center[0] + 0.005, center[1] + 0.005)
    );
    map.setMaxBounds(bounds);

    // Add circle to show 1km radius
    const circle = L.circle(center, {
      radius: 1000, // 1km in meters
      color: '#ef4444',
      fillColor: '#ef4444',
      fillOpacity: 0.025,
      weight: 1
    }).addTo(map);

    return () => {
      map.removeLayer(circle);
    };
  }, [center, zoom, map]);

  return null;
}

interface OpenStreetMapProps {
  hospitals?: Hospital[];
  selectedHospital: string | null;
  userLocation: [number, number] | null;
  onHospitalSelect?: (hospitalId: string) => void;
  mapType: 'ambulance' | 'hospital';
}

export default function OpenStreetMap({
  selectedHospital,
  userLocation,
  onHospitalSelect,
  mapType
}: OpenStreetMapProps) {
  const defaultLocation: [number, number] = [6.5244, 3.3792]; // Lagos coordinates
  const [currentLocation, setCurrentLocation] = useState<[number, number]>(defaultLocation);

  useEffect(() => {
    if (userLocation) {
      setCurrentLocation(userLocation);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          setCurrentLocation(defaultLocation);
        }
      );
    }
  }, [userLocation]);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={currentLocation}
        zoom={17} // Increased zoom level for closer view
        className="h-full w-full z-0"
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          className="map-tiles"
          maxZoom={19}
        />
        <MapCenter center={currentLocation} zoom={17} />

        {/* User Location Marker */}
        <Marker
          position={currentLocation}
          icon={new L.Icon({
            iconUrl: '/user-marker.svg',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          })}
        />


        {/* Hospital Markers */}
        {demoHospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={hospital.coordinates}
            icon={hospitalIcon}
            eventHandlers={{
              click: () => onHospitalSelect?.(hospital.id),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{hospital.name}</h3>
                <p className="text-sm text-gray-600">{hospital.distance}</p>
                <p className="text-sm text-gray-600">
                  {mapType === 'hospital' ?
                    `Available Beds: ${hospital.availableBeds}` :
                    `ETA: ${hospital.eta}`
                  }
                </p>
                <p className="text-sm text-gray-600">Type: {hospital.type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 z-[400] flex flex-col gap-2">
        <button
          onClick={() => window.location.reload()}
          className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Refresh Location"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Custom Styles */}
      <style>{`
        .leaflet-container {
          background: #f8fafc;
        }
        .dark .leaflet-container {
          background: #1e293b;
        }
        .map-tiles {
          filter: saturate(0.7) contrast(0.8) brightness(1.1);
        }
        .dark .map-tiles {
          filter: invert(1) hue-rotate(180deg) saturate(0.7) brightness(0.8) contrast(0.8);
        }
        .leaflet-control-container .leaflet-control {
          display: none;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
        }
        .dark .leaflet-popup-content-wrapper {
          background: rgba(30, 41, 59, 0.95);
          color: #fff;
        }
        .dark .leaflet-popup-content p {
          color: #cbd5e1;
        }
        @media (max-width: 768px) {
          .leaflet-container {
            height: 50vh !important;
          }
        }
      `}</style>
    </div>
  );
}