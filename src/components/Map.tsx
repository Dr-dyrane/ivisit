import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapMarker } from './map/MapMarker';
import { MapControls } from './map/MapControls';
import { MapStyles } from './map/MapStyles';
import { MAPBOX_ACCESS_TOKEN, mapConfig } from '../config/mapbox';

interface Hospital {
  id: string;
  name: string;
  coordinates: [number, number];
  ambulances: number;
  rating: number;
  type: 'Premium' | 'Standard';
}

interface MapProps {
  hospitals: Hospital[];
  selectedHospital: string | null;
  userLocation: [number, number] | null;
  onHospitalSelect?: (hospitalId: string) => void;
}

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default function Map({ hospitals, selectedHospital, userLocation, onHospitalSelect }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initializeMap = async () => {
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: mapConfig.style,
          center: userLocation || mapConfig.defaultCenter,
          zoom: mapConfig.defaultZoom,
          pitch: mapConfig.defaultPitch,
          bearing: mapConfig.defaultBearing,
          antialias: true
        });

        map.current.addControl(
          new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true
          })
        );

        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          })
        );

        map.current.on('style.load', () => {
          setMapLoaded(true);
          add3DBuildings();
          addTerrainAndSky();
        });

        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      Object.values(markers.current).forEach(marker => marker.remove());
      if (userMarker.current) userMarker.current.remove();
      if (map.current) map.current.remove();
    };
  }, []);

  const add3DBuildings = () => {
    if (!map.current?.isStyleLoaded()) return;

    try {
      map.current.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 14,
        'paint': {
          'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'height'],
            0, '#090909',
            50, '#1a1a1a',
            100, '#2a2a2a',
            200, '#3a3a3a'
          ],
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });
    } catch (error) {
      console.error('Error adding 3D buildings:', error);
    }
  };

  const addTerrainAndSky = () => {
    if (!map.current?.isStyleLoaded()) return;

    try {
      map.current.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });
    } catch (error) {
      console.error('Error adding sky layer:', error);
    }
  };

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    hospitals.forEach((hospital) => {
      const el = document.createElement('div');
      const markerComponent = <MapMarker type="hospital" isSelected={selectedHospital === hospital.id} />;
      ReactDOM.render(markerComponent, el);

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat(hospital.coordinates)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        onHospitalSelect?.(hospital.id);
      });

      markers.current[hospital.id] = marker;
    });
  }, [hospitals, selectedHospital, mapLoaded]);

  useEffect(() => {
    if (!map.current || !mapLoaded || !userLocation) return;

    if (userMarker.current) {
      userMarker.current.remove();
    }

    const el = document.createElement('div');
    const markerComponent = <MapMarker type="user" />;
    ReactDOM.render(markerComponent, el);

    userMarker.current = new mapboxgl.Marker(el)
      .setLngLat(userLocation)
      .addTo(map.current);

    const radius = 2;
    const options = { steps: 64, units: 'kilometers' as const };
    const circle = turf.circle(userLocation, radius, options);

    const source = map.current.getSource('radius') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData(circle);
    } else {
      map.current.addSource('radius', {
        type: 'geojson',
        data: circle
      });

      map.current.addLayer({
        id: 'radius-fill',
        type: 'fill',
        source: 'radius',
        paint: {
          'fill-color': '#ef4444',
          'fill-opacity': 0.05
        }
      });

      map.current.addLayer({
        id: 'radius-border',
        type: 'line',
        source: 'radius',
        paint: {
          'line-color': '#ef4444',
          'line-width': 2,
          'line-opacity': 0.3,
          'line-dasharray': [2, 2]
        }
      });
    }

    map.current.flyTo({
      center: userLocation,
      zoom: 15,
      duration: 2000
    });
  }, [userLocation, mapLoaded]);

  useEffect(() => {
    if (!map.current || !mapLoaded || !selectedHospital || !userLocation) return;

    const hospital = hospitals.find(h => h.id === selectedHospital);
    if (!hospital) return;

    const getRoute = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${hospital.coordinates[0]},${hospital.coordinates[1]}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
        );
        const data = await response.json();

        if (!data.routes?.[0]?.geometry) {
          console.error('No route found');
          return;
        }

        const route = data.routes[0].geometry;
        const source = map.current!.getSource('route') as mapboxgl.GeoJSONSource;

        if (source) {
          source.setData({
            type: 'Feature',
            properties: {},
            geometry: route
          });
        } else {
          map.current!.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route
            }
          });

          map.current!.addLayer({
            id: 'route-line',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#ef4444',
              'line-width': 4,
              'line-gradient': [
                'interpolate',
                ['linear'],
                ['line-progress'],
                0, '#ef4444',
                1, '#f87171'
              ]
            }
          });
        }

        const bounds = new mapboxgl.LngLatBounds()
          .extend(hospital.coordinates)
          .extend(userLocation);

        map.current!.fitBounds(bounds, {
          padding: 100,
          duration: 1000
        });
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    getRoute();
  }, [selectedHospital, hospitals, userLocation, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      <MapControls
        emergencyMode={emergencyMode}
        onEmergencyToggle={() => setEmergencyMode(!emergencyMode)}
      />
      <MapStyles />
    </div>
  );
}