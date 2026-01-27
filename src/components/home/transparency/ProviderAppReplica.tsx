import { useEffect, useState } from 'react';
import {
    Users,
    Shield,
    Stethoscope,
    Search,
    ChevronRight,
    CheckCircle2,
    Calendar,
    ArrowUpRight
} from 'lucide-react';

interface ProviderAppReplicaProps {
    isActive: boolean;
}

export function ProviderAppReplica({ isActive }: ProviderAppReplicaProps) {
    const [currentTime, setCurrentTime] = useState(new Date());
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
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F1A] font-sans transition-colors duration-500 rounded-[inherit]">
            {/* iOS Style Status Bar */}
            <div className="h-10 px-6 flex justify-between items-center bg-transparent relative z-20">
                <span className="text-sm font-bold">{currentTime.getHours()}:{currentTime.getMinutes().toString().padStart(2, '0')}</span>
                <div className="flex gap-1.5 items-center">
                    <div className="w-4 h-2 rounded-[2px] border border-current opacity-40" />
                    <div className="w-3 h-3 rounded-full bg-current opacity-40" />
                </div>
            </div>

            {/* App Header */}
            <div className="px-6 pt-2 pb-6 flex items-center justify-between relative z-20">
                <div>
                    <h1 className="text-2xl font-black tracking-tight leading-none mb-1">Dr. Tunde</h1>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">On Shift • On-Call</span>
                    </div>
                </div>
                <div className="w-12 h-12 rounded-2xl surface-raised flex items-center justify-center border border-border/50">
                    <Users className="w-6 h-6 text-slate-400" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 mb-6">
                <div className="h-12 w-full glass-card rounded-2xl flex items-center px-4 gap-3 border-border/50">
                    <Search className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-400 text-sm font-medium">Search patients...</span>
                </div>
            </div>

            {/* Triage Queue */}
            <div className="px-6 overflow-hidden flex-1 flex flex-col pt-2 relative z-20">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Triage Queue (4)</h2>
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                </div>

                <div className="space-y-4">
                    {[
                        { name: 'Patient #882', time: '2m ago', type: 'Emergency', priority: 'Critical', color: 'text-red-500' },
                        { name: 'Patient #885', time: '12m ago', type: 'Admission', priority: 'Stable', color: 'text-blue-500' },
                        { name: 'Patient #888', time: '24m ago', type: 'Referral', priority: 'Awaiting', color: 'text-amber-500' }
                    ].map((item, i) => (
                        <div key={i} className={`p-4 rounded-2xl glass-card border border-border/30 flex items-center justify-between transition-all duration-500 ${i === 0 && isActive ? 'ring-2 ring-green-500 scale-[1.02] shadow-xl' : ''
                            }`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.priority === 'Critical' ? 'bg-red-500/10' : 'bg-slate-500/10'
                                    }`}>
                                    <Shield className={`w-5 h-5 ${item.priority === 'Critical' ? 'text-red-500' : 'text-slate-500'}`} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type} • {item.time}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.priority}</span>
                                {i === 0 && isActive ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 animate-pulse" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className={`mt-auto px-8 py-6 rounded-t-[32px] border-t flex justify-between items-center backdrop-blur-md ${isDarkMode ? 'bg-[#1E293B]/30 border-white/5' : 'bg-white/30 border-white/30'
                }`}>
                <div className="flex flex-col items-center gap-1.5 text-green-500">
                    <Stethoscope className="w-6 h-6" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Triage</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-slate-400">
                    <Calendar className="w-6 h-6" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Admit</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-slate-400">
                    <Shield className="w-6 h-6" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Secure</span>
                </div>
            </div>
        </div>
    );
}
