import { useEffect, useState } from 'react';
import { Phone, Shield, User } from 'lucide-react';
import { GoogleMapEmbed } from '../../ui/GoogleMapEmbed'; // Adjust path if needed

interface AmbulanceMapScreenReplicaProps {
    isActive: boolean;
}

export function AmbulanceMapScreenReplica({ isActive }: AmbulanceMapScreenReplicaProps) {
    const [eta, setEta] = useState(12);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Simple check for dark mode class on document
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Simulate ETA countdown
    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setEta(prev => Math.max(1, prev - 1));
            }, 2000);
            return () => clearInterval(interval);
        } else {
            setEta(12);
        }
    }, [isActive]);

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F1A] relative overflow-hidden font-sans transition-colors duration-500 rounded-[inherit]">
            {/* Fullscreen Google Map - Rounded to match container */}
            <div className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden">
                <GoogleMapEmbed
                    isDarkMode={isDarkMode}
                    center={{ lat: 37.7749, lng: -122.4194 }}
                    zoom={14}
                    markers={[
                        { lat: 37.7749, lng: -122.4194, title: "Your Location" }, // User
                        { lat: 37.7760, lng: -122.4220, title: "Ambulance" }   // Ambulance
                    ]}
                    className="w-full h-full opacity-100"
                />
            </div>

            {/* Bottom Sheet - Ultra Low Opacity Glass (15%) with Light Blur (sm) */}
            <div className={`absolute bottom-0 left-0 right-0 h-[55%] rounded-t-[36px] border-t p-6 z-10 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-colors duration-500 backdrop-blur-sm
                ${isDarkMode ? 'bg-[#0B0F1A]/15 border-white/5' : 'bg-white/15 border-white/20'}
            `}>

                {/* Drag Handle */}
                <div className={`w-12 h-1.5 rounded-full mx-auto mb-8 opacity-40 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />

                {/* Status Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-[20px] bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/20 backdrop-blur-md">
                        <Shield className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                            <span className="text-[10px] font-black tracking-widest text-red-600 uppercase">Dispatched</span>
                        </div>
                        <h2 className={`text-xl font-black tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Ambulance #402
                        </h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Advanced Life Support</p>
                    </div>
                </div>

                {/* Main ETA Display */}
                <div className="flex items-baseline gap-1 mb-8">
                    <span className={`text-7xl font-black tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {eta}
                    </span>
                    <span className="text-2xl font-bold text-slate-500">min</span>
                    <div className="ml-auto flex flex-col items-end">
                        <div className="px-3 py-1 bg-green-500/20 rounded-lg border border-green-500/20 mb-1 backdrop-blur-md">
                            <span className="text-[10px] font-black text-green-600 uppercase">Traffic Clear</span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">Fastest Route</span>
                    </div>
                </div>

                {/* Driver Card */}
                <div className={`mt-auto rounded-[28px] p-2 flex items-center justify-between border backdrop-blur-md ${isDarkMode ? 'bg-[#1E293B]/30 border-white/5' : 'bg-white/30 border-white/30'
                    }`}>
                    <div className="flex items-center gap-3 pl-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isDarkMode ? 'bg-slate-700/50 border-white/10' : 'bg-white/50 border-white/40 shadow-sm'
                            }`}>
                            <User className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                        </div>
                        <div>
                            <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                John Paramedic
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-amber-500 text-xs text-[10px]">★</span>
                                <span className="text-xs text-slate-400 font-bold">4.9</span>
                            </div>
                        </div>
                    </div>

                    {/* Call Button */}
                    <div className="w-12 h-12 rounded-[20px] bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-900/20 cursor-pointer hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5 fill-current" />
                    </div>
                </div>

            </div>
        </div>
    );
}
