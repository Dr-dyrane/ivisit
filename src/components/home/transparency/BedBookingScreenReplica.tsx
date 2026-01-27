import { useState, useEffect } from 'react';
import { Search, Star } from 'lucide-react'; // Removing BedDouble if unused
import { GoogleMapEmbed } from '../../ui/GoogleMapEmbed';

interface BedBookingScreenReplicaProps {
    onBook: () => void;
    isActive: boolean;
    mode?: 'booking' | 'emergency';
}

export function BedBookingScreenReplica({ onBook, isActive }: BedBookingScreenReplicaProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            // Check if 'dark' class is present on html element
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Auto-reset when parent flow finishes
    useEffect(() => {
        if (!isActive) {
            setSelectedHospital(null);
            setSearchTerm('');
        }
    }, [isActive]);

    const handleBook = (hospitalId: string) => {
        if (!selectedHospital) {
            setSelectedHospital(hospitalId);
            // Simulate API delay
            setTimeout(() => {
                onBook();
            }, 800);
        }
    };

    const hospitals = [
        { id: 'h1', name: "St. Mary's General", dist: '1.2mi', rating: '4.9', wait: '15 min', price: '$$$', lat: 37.7749, lng: -122.4194 },
        { id: 'h2', name: "City Trauma Center", dist: '3.4mi', rating: '4.8', wait: '45 min', price: '$$', lat: 37.7849, lng: -122.4094 },
        { id: 'h3', name: "Westside Clinic", dist: '5.1mi', rating: '4.7', wait: '20 min', price: '$$', lat: 37.7649, lng: -122.4294 },
    ];

    const markers = hospitals.map(h => ({
        lat: h.lat,
        lng: h.lng,
        title: h.name
    }));

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F1A] relative overflow-hidden font-sans transition-colors duration-500 rounded-[inherit]">

            {/* Fullscreen Google Map - Rounded */}
            <div className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden">
                <GoogleMapEmbed
                    isDarkMode={isDarkMode}
                    center={{ lat: 37.7750, lng: -122.4180 }}
                    zoom={15}
                    markers={markers}
                    className="w-full h-full"
                />
            </div>

            {/* Floating Search Bar - Low Opacity Glass (15%) */}
            <div className="absolute top-[60px] left-4 right-4 z-20">
                <div className="relative shadow-xl shadow-black/5">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Determine availability..."
                        className={`w-full h-12 pl-11 pr-4 rounded-2xl backdrop-blur-md border text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-all font-medium
                            ${isDarkMode
                                ? 'bg-[#1E293B]/15 border-white/10 text-white placeholder:text-slate-400'
                                : 'bg-white/15 border-white/20 text-slate-900 placeholder:text-slate-500'
                            }
                        `}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Bottom Sheet - Ultra Low Opacity Glass (15%) */}
            <div className={`absolute bottom-0 left-0 right-0 h-[50%] rounded-t-[36px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-10 flex flex-col px-4 border-t transition-colors duration-500 backdrop-blur-md
                ${isDarkMode ? 'bg-[#0B0F1A]/15 border-white/5' : 'bg-white/15 border-white/20'}
            `}>
                {/* Drag Handle */}
                <div className={`w-12 h-1.5 rounded-full mx-auto mt-1.5 mb-6 opacity-30 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />

                <div className="mb-4 flex justify-between items-end relative">
                    <div>
                        <h2 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Capacity Grid</h2>
                        <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mt-1">Real-time Availability</p>
                    </div>
                    {/* Blinking Live Status */}
                    <div className="pb-1">
                        <div className="w-2.5 h-2.5 absolute right-0 top-0 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
                    </div>
                </div>

                {/* Hospital List - Transparent Cards & Hidden Scrollbar */}
                <div className="flex-1 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:hidden no-scrollbar pb-4 pr-1">
                    {hospitals.map((hospital) => (
                        <div
                            key={hospital.id}
                            onClick={() => handleBook(hospital.id)}
                            className={`p-4 rounded-[28px] border transition-all duration-300 cursor-pointer active:scale-[0.98] relative overflow-hidden group backdrop-blur-sm ${selectedHospital === hospital.id
                                ? (isDarkMode
                                    ? 'bg-[#1E293B]/40 border-red-500/50 shadow-lg shadow-red-900/20'
                                    : 'bg-white/40 border-red-500/50 shadow-lg shadow-red-500/10')
                                : 'bg-transparent border-transparent hover:bg-white/5'
                                }`}
                        >
                            {/* Card Content */}
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    {/* Title */}
                                    <h3 className={`font-extrabold text-lg tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        {hospital.name}
                                    </h3>
                                    {/* Rating Row */}
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{hospital.rating}</span>
                                        <span className="text-xs text-slate-500">• {hospital.dist}</span>
                                    </div>
                                </div>
                                <div className={`px-3 py-1.5 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100/50 border-white/20'}`}>
                                    <span className={`text-xs font-black ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{hospital.price}</span>
                                </div>
                            </div>

                            {/* Stat Pills */}
                            <div className="flex gap-2 mb-2">
                                <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${isDarkMode ? 'bg-black/20' : 'bg-white/30'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${selectedHospital === hospital.id ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                                    <span className={`text-[10px] font-bold uppercase tracking-wide ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                        {selectedHospital === hospital.id ? 'Reserving' : 'Available'}
                                    </span>
                                </div>
                                <div className={`px-3 py-1.5 rounded-xl ${isDarkMode ? 'bg-black/20' : 'bg-white/30'}`}>
                                    <span className={`text-[10px] font-bold uppercase tracking-wide ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                        Wait: {hospital.wait}
                                    </span>
                                </div>
                            </div>

                            {/* Selection Effect */}
                            {selectedHospital === hospital.id && (
                                <div className="absolute inset-0 bg-red-500/5 flex items-center justify-center backdrop-blur-[1px]">
                                    <div className="bg-red-600 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 animate-in zoom-in duration-200">
                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span className="text-xs font-black text-white uppercase tracking-wide">Securing Bed</span>
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
