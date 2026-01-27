import { useEffect, useState } from 'react';
import {
    Activity,
    MapPin,
    Clock,
    CheckCircle2,
    BedDouble,
    Building2,
    Users,
    Shield
} from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { GoogleMapEmbed } from '../../ui/GoogleMapEmbed';

interface DesktopDashboardReplicaProps {
    isActive: boolean;
    mode: 'emergency' | 'bed';
}

export function DesktopDashboardReplica({ isActive, mode }: DesktopDashboardReplicaProps) {
    // Animation for the "Live" counter
    const [count, setCount] = useState(0);
    const [viewMode, setViewMode] = useState<'dashboard' | 'map'>('dashboard');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const isBed = mode === 'bed';
    const primaryColor = isBed ? 'bg-blue-600' : 'bg-destructive';

    // Coordinates
    const incidentLocation = { lat: 40.7128, lng: -74.0060 }; // NYC
    const unitLocation = { lat: 40.7150, lng: -74.0080 };

    useEffect(() => {
        if (isActive) {
            setCount(1);
            // Phase 2 Transition: Switch to Map after 2.0s (slightly faster)
            // We use a state that doesn't reset immediately if isActive flickers off briefly in parent
            const timer = setTimeout(() => {
                setViewMode('map');
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setCount(0);
            setViewMode('dashboard');
        }
    }, [isActive]);

    const pulse = useSpring({
        from: { opacity: 0.5 },
        to: { opacity: 1 },
        loop: { reverse: true },
        config: { duration: 1500 },
        pause: !isActive
    });

    return (
        <div className="w-full h-full bg-slate-50 dark:bg-background/95 p-6 rounded-3xl border border-slate-200 dark:border-border/50 shadow-2xl overflow-hidden relative transition-colors duration-300">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-20 transition-all duration-500">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground">
                        {isBed ? 'Admissions Grid' : 'Command Center'}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isActive
                            ? `${primaryColor} shadow-[0_0_8px_currentColor] animate-pulse`
                            : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'}`}
                        />
                        <span className="text-sm text-slate-500 dark:text-muted-foreground font-medium uppercase tracking-wider">
                            {isActive ? (isBed ? 'Booking Request' : 'Critical Alert') : 'System Nominal'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-white/50 dark:bg-secondary/20 rounded-xl border border-slate-200 dark:border-border shadow-sm text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-widest backdrop-blur-sm">
                        {viewMode === 'map' ? 'LIVE TRACKING' : 'USA HQ'}
                    </div>
                </div>
            </div>

            {/* Content Container with Crossfade */}
            <div className="relative w-full h-[360px]">

                {/* View 1: Bento Grid Dashboard */}
                <div className={`absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 transform ${viewMode === 'dashboard' ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 pointer-events-none z-0'
                    }`}>

                    {/* Live Activity Card (Primary) */}
                    <div className={`col-span-1 md:col-span-2 row-span-2 rounded-[2rem] p-8 relative overflow-hidden transition-all duration-500 group ${isActive
                        ? `${primaryColor} text-white shadow-xl`
                        : (isDarkMode
                            ? 'bg-white/5 border-white/10 backdrop-blur-md'
                            : 'bg-white/50 border-white/40 backdrop-blur-md shadow-sm')
                        }`}>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-muted/10'
                                    }`}>
                                    {isBed ? (
                                        <BedDouble className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                                    ) : (
                                        <Activity className={`w-6 h-6 ${isActive ? 'text-white' : 'text-destructive'}`} />
                                    )}
                                </div>
                                {isActive && (
                                    <animated.div style={pulse} className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm text-white">
                                        New
                                    </animated.div>
                                )}
                            </div>

                            <div>
                                <div className={`text-7xl font-semibold tracking-tighter mb-2 transition-all duration-500 ${isActive ? 'text-white' : 'text-slate-900 dark:text-foreground'}`}>
                                    {count}
                                </div>
                                <p className={`text-lg font-medium transition-colors ${isActive ? 'text-white/80' : 'text-slate-500 dark:text-muted-foreground'}`}>
                                    {isBed ? 'Pending Admissions' : 'Active Emergencies'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Metric Card */}
                    <div className={`col-span-1 rounded-[2rem] p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300 border ${isBed ? 'hover:border-blue-500/30' : 'hover:border-red-500/30'
                        } ${isDarkMode
                            ? 'bg-white/5 border-white/10 backdrop-blur-md'
                            : 'bg-white/50 border-white/40 backdrop-blur-md shadow-sm'
                        }`}>
                        <div className="flex justify-between items-start mb-12">
                            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-foreground mb-1">
                                {isActive ? '0.2' : '4.2'}<span className="text-slate-500 dark:text-muted-foreground text-xl ml-1">min</span>
                            </div>
                            <p className="text-slate-500 dark:text-muted-foreground font-medium">Avg Response</p>
                        </div>
                    </div>

                    {/* Tertiary Metric Card */}
                    <div className={`col-span-1 rounded-[2rem] p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300 border ${isBed ? 'hover:border-blue-500/30' : 'hover:border-blue-400/30'
                        } ${isDarkMode
                            ? 'bg-white/5 border-white/10 backdrop-blur-md'
                            : 'bg-white/50 border-white/40 backdrop-blur-md shadow-sm'
                        }`}>
                        <div className="flex justify-between items-start mb-12">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                                {isBed ? <Building2 className="w-6 h-6 text-blue-500" /> : <MapPin className="w-6 h-6 text-blue-500" />}
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-foreground mb-1">
                                Live
                            </div>
                            <p className="text-slate-500 dark:text-muted-foreground font-medium">{isBed ? 'Capacity Map' : 'Global Map'}</p>
                        </div>
                    </div>

                    {/* Efficiency Card */}
                    <div className={`col-span-1 border rounded-[2rem] p-6 flex flex-col justify-center items-center text-center ${isDarkMode
                        ? 'bg-white/5 border-white/10 backdrop-blur-md'
                        : 'bg-white/50 border-white/40 backdrop-blur-md shadow-sm'
                        }`}>
                        <CheckCircle2 className="w-8 h-8 text-slate-400 mb-3" />
                        <p className="text-slate-500 dark:text-muted-foreground text-sm font-medium">System efficiency at 98%</p>
                    </div>

                </div>

                {/* View 2: Phase 2 Pro Map View */}
                {/* Fixed: Moved z-index logic to ensure it sits on top when active */}
                <div className={`absolute inset-0 rounded-[2rem] overflow-hidden border transition-all duration-700 transform ${viewMode === 'map' ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-105 pointer-events-none z-0'
                    } ${isDarkMode ? 'border-border/50 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>

                    {/* Pro Map Background */}
                    <div className="absolute inset-0 z-0">
                        <GoogleMapEmbed
                            isDarkMode={isDarkMode}
                            center={incidentLocation}
                            zoom={14}
                            markers={[
                                { ...incidentLocation, title: "Incident" },
                                { ...unitLocation, title: "Unit 402" }
                            ]}
                            className="w-full h-full"
                        />
                    </div>

                    {/* Overlay UI */}
                    <div className={`absolute top-6 left-6 backdrop-blur-md border p-4 rounded-xl shadow-xl ${isDarkMode ? 'bg-[#0B0F1A]/15 border-white/5' : 'bg-white/15 border-white/20'
                        }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${primaryColor} rounded-lg flex items-center justify-center`}>
                                {isBed ? <BedDouble className="w-5 h-5 text-white" /> : <Shield className="w-5 h-5 text-white" />}
                            </div>
                            <div>
                                <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{isBed ? 'Reservation Confirmed' : 'Incident Located'}</div>
                                <div className={`text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>LAT: 40.7128 • LNG: -74.0060</div>
                            </div>
                        </div>
                    </div>

                    <div className={`absolute bottom-6 right-6 backdrop-blur-md border p-4 rounded-xl shadow-xl w-64 ${isDarkMode ? 'bg-[#0B0F1A]/15 border-white/5' : 'bg-white/15 border-white/20'
                        }`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className={`text-xs uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Nearest Unit</span>
                            <span className="text-green-500 text-xs font-bold">CONNECTED</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                                }`}>
                                <Users className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                            </div>
                            <div>
                                <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Unit 402</div>
                                <div className="text-slate-500 text-xs">ETA: <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>4 min</span></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
