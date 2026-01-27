import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Phone, MapPin, Navigation2, Activity, ChevronRight, User } from 'lucide-react';
import { GoogleMapEmbed } from '../../ui/GoogleMapEmbed';

interface DriverAppReplicaProps {
    isActive: boolean;
}

interface DetailCardProps {
    label: string;
    val: string;
    icon: React.ReactNode;
}

export function DriverAppReplica({ isActive }: DriverAppReplicaProps) {
    const [status, setStatus] = useState<'IDLE' | 'EN_ROUTE' | 'ON_SCENE' | 'TRANSPORTING'>('IDLE');
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

    useEffect(() => {
        if (isActive) {
            setStatus('EN_ROUTE');
            const t1 = setTimeout(() => setStatus('ON_SCENE'), 4000);
            const t2 = setTimeout(() => setStatus('TRANSPORTING'), 8000);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        } else setStatus('IDLE');
    }, [isActive]);

    return (
        <div className={`flex flex-col h-full relative overflow-hidden font-sans rounded-[inherit] transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-slate-100'}`}>

            {/* 1. IMMERSIVE MAP LAYER */}
            <div className={`absolute inset-0 z-0 transition-all duration-1000 ${status !== 'IDLE' ? 'brightness-[0.5] scale-110' : 'brightness-100 scale-100'}`}>
                <GoogleMapEmbed
                    isDarkMode={isDarkMode}
                    center={{ lat: 6.4549, lng: 3.4267 }}
                    zoom={15}
                    className={`w-full h-full transition-all duration-1000 ${isDarkMode ? 'grayscale-[0.2]' : 'grayscale-0'}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-transparent ${isDarkMode ? 'to-black/60' : 'to-black/20'}`} />
            </div>

            {/* 2. TOP NAVIGATION (Dynamic Island Style) */}
            <AnimatePresence>
                {status !== 'IDLE' && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        className="relative z-20 px-4 pt-10"
                    >
                        <div className="apple-material-thick rounded-[32px] p-4 flex gap-2 flex-wrap items-center justify-between shadow-2xl border border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Navigation2 className="w-6 h-6 text-white fill-current" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/80">450 Meters</p>
                                    <h3 className={`font-bold text-sm tracking-tight leading-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Ozumba Mbadiwe</h3>
                                </div>
                            </div>
                            <div className="pr-2 text-right">
                                <div className={`text-2xl font-black tabular-nums ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>4<span className="text-sm ml-0.5 opacity-50">m</span></div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. CENTER SEARCH STATE (Optimized Radar) */}
            {status === 'IDLE' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        <div className={`w-24 h-24 rounded-full apple-material-thick border border-primary/20 flex items-center justify-center relative z-10 shadow-glow ${isDarkMode ? '' : 'bg-white/50'}`}>
                            <Activity className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center px-12">
                        <h1 className={`text-5xl font-black tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Searching</h1>
                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/40' : 'text-slate-500/60'}`}>Waiting for Dispatch</p>
                    </motion.div>
                </div>
            )}

            {/* 4. NATIVE BOTTOM SHEET (Zero-Bleed Mobile) */}
            <div className={`mt-auto relative z-30 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${status === 'IDLE' ? 'translate-y-[85%]' : 'translate-y-0'}`}>
                <div className={`apple-material-thick rounded-t-[44px] md:rounded-[44px] pb-10 pt-4 px-0 shadow-2xl border-t border-white/5`}>

                    {/* Handle */}
                    <div className={`w-12 h-1.5 rounded-full mx-auto mb-8 ${isDarkMode ? 'bg-white/10' : 'bg-slate-300'}`} />

                    {/* Content Wrapper */}
                    <div className="px-8">
                        {/* Header: Priority Indicator */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.5)]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Priority Code Red</span>
                                </div>
                                <h2 className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Emergency</h2>
                            </div>
                            {/* <div className="w-14 h-14 rounded-full apple-bubble flex items-center justify-center shadow-inner">
                                <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>98%</span>
                            </div> */}
                        </div>

                        {/* Bento Details Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <DetailCard label="Patient" val="#288 • Resp" icon={<User className="text-blue-500" />} />
                            <DetailCard label="Pickup" val="Vict. Island" icon={<MapPin className="text-emerald-500" />} />
                        </div>

                        {/* Tactical Main Button */}
                        <button className={`w-full py-6 rounded-[24px] apple-button-vibrant flex items-center justify-center gap-4 mb-6 shadow-xl ${status === 'EN_ROUTE' ? 'bg-blue-600' :
                            status === 'ON_SCENE' ? 'bg-red-600' : 'bg-emerald-600'
                            }`}>
                            <span className="text-white font-black text-xs tracking-[0.3em]">
                                {status === 'EN_ROUTE' && "Confirm Arrival"}
                                {status === 'ON_SCENE' && "Begin Transport"}
                                {status === 'TRANSPORTING' && "Complete Trip"}
                            </span>
                            <ChevronRight className="w-4 h-4 text-white/50" />
                        </button>

                        {/* iOS Bottom Utility Bar */}
                        <div className="flex items-center justify-around pt-2">
                            {[Phone, Activity, Navigation].map((Icon, i) => (
                                <button key={i} className="w-14 h-14 rounded-2xl apple-bubble flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 group">
                                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Helper Component for Inner Cards */
function DetailCard({ label, val, icon }: DetailCardProps) {
    return (
        <div className="apple-bubble p-5 space-y-3 transition-transform active:scale-95">
            <div className="flex items-center gap-2 opacity-40">
                {icon}
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{label}</span>
            </div>
            <div className="text-lg font-bold tracking-tight truncate text-foreground">{val}</div>
        </div>
    );
}