import React, { useEffect, useRef, useState } from 'react';

// Add type declaration for window.google to avoid TS errors
declare global {
    interface Window {
        google: any;
    }
}

interface Marker {
    lat: number;
    lng: number;
    title?: string;
    icon?: string; // URL to custom icon or default pin
}

interface GoogleMapEmbedProps {
    isDarkMode: boolean;
    center: { lat: number; lng: number };
    zoom?: number;
    markers?: Marker[];
    className?: string;
}

const DARK_MAP_STYLE = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }], // Hide generic POI labels
    },
    {
        featureType: "poi.medical",
        elementType: "geometry",
        stylers: [{ color: "#d63031", visibility: "on" }], // Highlight hospitals
    },
    {
        featureType: "poi.medical",
        elementType: "labels",
        stylers: [{ visibility: "on" }], // Show hospital labels
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "transit",
        stylers: [{ visibility: "off" }], // Hide transit to reduce clutter
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
];

const LIGHT_MAP_STYLE = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.medical",
        stylers: [{ visibility: "on", color: "#d63031" }],
    },
    {
        featureType: "transit",
        stylers: [{ visibility: "off" }],
    },
];

export function GoogleMapEmbed({ isDarkMode, center, zoom = 14, markers = [], className = '' }: GoogleMapEmbedProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<any>(null); // use any to avoid TS issues
    const markersRef = useRef<any[]>([]);

    useEffect(() => {
        // Load Google Maps Script if not already loaded
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            script.onload = initMap;
        } else {
            initMap();
        }

        function initMap() {
            if (mapRef.current && !mapInstance && window.google) {
                const map = new window.google.maps.Map(mapRef.current, {
                    center,
                    zoom,
                    styles: isDarkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE,
                    disableDefaultUI: true, // Clean look
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                });
                setMapInstance(map);
            }
        }
    }, [mapInstance, center, zoom, isDarkMode]);

    // Update markers when markers prop changes
    useEffect(() => {
        if (mapInstance && window.google) {
            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];

            // Add new markers
            markers.forEach(markerData => {
                const marker = new window.google.maps.Marker({
                    position: { lat: markerData.lat, lng: markerData.lng },
                    map: mapInstance,
                    title: markerData.title,
                    icon: markerData.icon,
                });
                markersRef.current.push(marker);
            });
        }
    }, [mapInstance, markers]);

    // Update style dynamically
    useEffect(() => {
        if (mapInstance) {
            mapInstance.setOptions({ styles: isDarkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE });
        }
    }, [mapInstance, isDarkMode]);

    return <div ref={mapRef} className={`w-full h-full rounded-[inherit] overflow-hidden ${className}`} />;
}
