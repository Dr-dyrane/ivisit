import { useEffect, useRef, useState, useMemo } from 'react';

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
    const [mapInstance, setMapInstance] = useState<any>(null);
    const markersRef = useRef<any[]>([]);

    const mapStyles = useMemo(() => isDarkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE, [isDarkMode]);

    useEffect(() => {
        let isCancelled = false;

        const initMap = () => {
            if (mapRef.current && window.google && !mapInstance && !isCancelled) {
                const map = new window.google.maps.Map(mapRef.current, {
                    center,
                    zoom,
                    styles: mapStyles,
                    backgroundColor: isDarkMode ? '#0B0F1A' : '#ffffff',
                    disableDefaultUI: true,
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    gestureHandling: 'cooperative',
                });
                setMapInstance(map);
            }
        };

        const checkAndLoad = () => {
            if (window.google) {
                initMap();
                return;
            }

            if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
                const script = document.createElement('script');
                const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                script.async = true;
                script.defer = true;
                document.body.appendChild(script);
            }

            // Polling for google object to be available (robust against script state)
            const interval = setInterval(() => {
                if (window.google) {
                    clearInterval(interval);
                    if (!isCancelled) initMap();
                }
            }, 100);

            return () => clearInterval(interval);
        };

        checkAndLoad();

        return () => {
            isCancelled = true;
        };
    }, []); // Only run on mount

    // Handle Prop Updates Efficiently
    useEffect(() => {
        if (mapInstance) {
            mapInstance.panTo(center);
            mapInstance.setZoom(zoom);
        }
    }, [mapInstance, center, zoom]);

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
            mapInstance.setOptions({
                styles: mapStyles,
                backgroundColor: isDarkMode ? '#0B0F1A' : '#ffffff'
            });
        }
    }, [mapInstance, mapStyles, isDarkMode]);

    return <div ref={mapRef} className={`w-full h-full rounded-[inherit] overflow-hidden ${isDarkMode ? 'bg-[#0B0F1A]' : 'bg-white'} ${className}`} />;
}
