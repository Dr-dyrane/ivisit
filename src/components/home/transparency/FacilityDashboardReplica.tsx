import { useEffect, useState } from 'react';
import {
    Users,
    Building2,
    CheckCircle2,
    Clock,
    Shield,
    BedDouble,
    Route
} from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

interface FacilityDashboardReplicaProps {
    isActive: boolean;
}

export function FacilityDashboardReplica({ isActive }: FacilityDashboardReplicaProps) {
    const [viewMode, setViewMode] = useState<'dashboard' | 'analytics'>('dashboard');
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
            const timer = setTimeout(() => {
                setViewMode('analytics');
            }, 2500);
            return () => clearTimeout(timer);
        } else {
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
        <div className="w-full h-full bg-slate-50 dark:bg-[#0B0F1A] p-6 rounded-3xl shadow-2xl overflow-hidden relative transition-colors duration-300 flex flex-col">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

            {/* Mac Controls */}
            <div className="absolute top-4 left-6 flex gap-2 z-30">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/5" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-black/5" />
                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-black/5" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8 pl-16 sm:pl-0 pt-2 relative z-20">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Provider coordination</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
                        <span className="text-[10px] text-slate-500 dark:text-muted-foreground font-black uppercase tracking-widest">
                            Metropolitan General
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                        {viewMode === 'analytics' ? 'Arrival status' : 'Live view'}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative flex-1">
                <div className={`absolute inset-0 grid grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${viewMode === 'dashboard' ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 pointer-events-none'}`}>

                    {/* Occupancy Card */}
                    <div className={`col-span-2 row-span-1 lg:row-span-2 rounded-[2rem] p-8 transition-all duration-500 flex flex-col justify-between shadow-none ${isActive ? 'bg-green-600 shadow-2xl text-white' : 'glass-card'
                        }`}>
                        <div className="flex justify-between items-start">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 ${isActive ? 'bg-white/20' : 'surface-2'}`}>
                                <Building2 className={`w-6 h-6 ${isActive ? 'text-white' : 'text-green-500'}`} />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {isActive && (
                                    <animated.div style={pulse} className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                                        READY
                                    </animated.div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="text-6xl sm:text-7xl font-bold tracking-tighter mb-1">3</div>
                            <p className={`text-sm font-medium transition-all duration-500 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>Incoming patients</p>

                            <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Triage</span>
                                    <span className="text-sm font-bold">2 ready</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Arrival</span>
                                    <span className="text-sm font-bold">1 en route</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] p-6 glass-card">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-8">
                            <BedDouble className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold tracking-tight">12</div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Beds ready now</p>
                    </div>

                    <div className="rounded-[2rem] p-6 glass-card">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-8">
                            <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold tracking-tight">4</div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Care team ready</p>
                    </div>

                    <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-[2rem] glass-card transition-colors">
                        <CheckCircle2 className="w-8 h-8 text-green-500 mb-2 transition-transform duration-500 group-hover/eff:scale-125" />
                        <span className="text-[10px] font-bold text-slate-500">Handoff ready</span>
                    </div>
                </div>

                <div className={`absolute inset-0 rounded-[2rem] glass-card transition-all duration-700 p-8 ${viewMode === 'analytics' ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-105 pointer-events-none'} ${isDarkMode ? 'bg-[#0B0F1A]/80' : 'bg-white/80'}`}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-green-500/20 rounded-xl animate-in zoom-in duration-500">
                            <Route className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="text-lg font-bold">Arrival readiness</h3>
                    </div>

                    <div className="space-y-6">
                        {[
                            { label: 'Responder notified', value: 'done', color: 'bg-green-500', width: '100%' },
                            { label: 'Bed team alerted', value: 'ready', color: 'bg-blue-500', width: '92%' },
                            { label: 'Arrival prep', value: '4 min', color: 'bg-amber-500', width: '84%' }
                        ].map((metric, i) => (
                            <div key={i} className="animate-in slide-in-from-left-4 duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">
                                    <span>{metric.label}</span>
                                    <span>{metric.value}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: viewMode === 'analytics' ? metric.width : '0%' }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span className="text-[10px] font-bold text-slate-500">Role-based provider access</span>
                        </div>
                        <Clock className="w-4 h-4 text-slate-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}
