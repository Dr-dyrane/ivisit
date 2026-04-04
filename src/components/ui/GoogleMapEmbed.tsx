import { useEffect, useRef, useState, useMemo } from 'react';

type GoogleMapPosition = { lat: number; lng: number };
type GoogleMapStyle = Array<Record<string, unknown>>;

interface GoogleMapOptions {
    center: GoogleMapPosition;
    zoom: number;
    styles: GoogleMapStyle;
    backgroundColor: string;
    disableDefaultUI: boolean;
    zoomControl: boolean;
    streetViewControl: boolean;
    mapTypeControl: boolean;
    fullscreenControl: boolean;
    gestureHandling: 'cooperative';
}

interface GoogleMapInstance {
    panTo: (center: GoogleMapPosition) => void;
    setZoom: (zoom: number) => void;
    setOptions: (options: Partial<Pick<GoogleMapOptions, 'styles' | 'backgroundColor'>>) => void;
}

interface GoogleMarkerOptions {
    position: GoogleMapPosition;
    map: GoogleMapInstance;
    title?: string;
    icon?: string;
}

interface GoogleMarkerInstance {
    setMap: (map: GoogleMapInstance | null) => void;
}

interface GoogleMapsAPI {
    maps: {
        Map: new (element: HTMLElement, options: GoogleMapOptions) => GoogleMapInstance;
        Marker: new (options: GoogleMarkerOptions) => GoogleMarkerInstance;
    };
}

declare global {
    interface Window {
        google?: GoogleMapsAPI;
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

const DARK_MAP_STYLE: GoogleMapStyle = [
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

const LIGHT_MAP_STYLE: GoogleMapStyle = [
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
    const [isGoogleReady, setIsGoogleReady] = useState(() => Boolean(window.google));
    const [mapInstance, setMapInstance] = useState<GoogleMapInstance | null>(null);
    const markersRef = useRef<GoogleMarkerInstance[]>([]);

    const mapStyles = useMemo(() => isDarkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE, [isDarkMode]);

    useEffect(() => {
        if (window.google) {
            setIsGoogleReady(true);
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

        const intervalId = window.setInterval(() => {
            if (window.google) {
                window.clearInterval(intervalId);
                setIsGoogleReady(true);
            }
        }, 100);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const googleMaps = window.google?.maps;
        if (!mapRef.current || !googleMaps || mapInstance || !isGoogleReady) {
            return;
        }

        const map = new googleMaps.Map(mapRef.current, {
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
    }, [center, isDarkMode, isGoogleReady, mapInstance, mapStyles, zoom]);

    // Handle Prop Updates Efficiently
    useEffect(() => {
        if (mapInstance) {
            mapInstance.panTo(center);
            mapInstance.setZoom(zoom);
        }
    }, [mapInstance, center, zoom]);

    // Update markers when markers prop changes
    useEffect(() => {
        const googleMaps = window.google?.maps;
        if (mapInstance && googleMaps) {
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = markers.map((markerData) => (
                new googleMaps.Marker({
                    position: { lat: markerData.lat, lng: markerData.lng },
                    map: mapInstance,
                    title: markerData.title,
                    icon: markerData.icon,
                })
            ));

            return () => {
                markersRef.current.forEach(marker => marker.setMap(null));
                markersRef.current = [];
            };
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
